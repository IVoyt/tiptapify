import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, provide, ref } from 'vue'
import { fakeUploadEndpoint } from '@tiptapify/composables/fakeUploadEndpoint'
import { TIPTAPIFY_UPLOAD_KEY, useTiptapifyUpload } from '@tiptapify/composables/useTiptapifyUpload'
import { TiptapifyUploadOptions } from '@tiptapify/types/editor'

function withUpload(upload: TiptapifyUploadOptions | null) {
  let result!: ReturnType<typeof useTiptapifyUpload>
  const Probe = { setup: () => { result = useTiptapifyUpload(); return () => null } }
  createApp({ setup: () => { provide(TIPTAPIFY_UPLOAD_KEY, ref(upload)); return () => h(Probe) } })
    .mount(document.createElement('div'))

  return result
}

const context = (kind: 'image' | 'video', onProgress = vi.fn(), signal = new AbortController().signal) => ({ kind, onProgress, signal })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useTiptapifyUpload', () => {
  it('embeds an image as a base64 data URL when the editor has no upload endpoint', async () => {
    const { canUploadImage, canUploadVideo, upload, uploadFile } = withUpload(null)
    const onProgress = vi.fn()

    const { url } = await uploadFile(new File(['hi'], 'a.png', { type: 'image/png' }), context('image', onProgress))

    expect(canUploadImage.value).toBe(true)
    expect(canUploadVideo.value).toBe(false)
    expect(upload.value).toBeNull()
    expect(url).toBe('data:image/png;base64,aGk=')
    expect(onProgress).toHaveBeenLastCalledWith(1)
  })

  it('does not embed a video file: it needs the upload endpoint', async () => {
    const { uploadFile } = withUpload(null)

    await expect(uploadFile(new File(['v'], 'a.mp4', { type: 'video/mp4' }), context('video'))).rejects.toThrow()
  })

  it('stops reading the file when the upload is cancelled', async () => {
    const { uploadFile } = withUpload(null)
    const controller = new AbortController()
    controller.abort()

    await expect(uploadFile(new File(['hi'], 'a.png'), context('image', vi.fn(), controller.signal))).rejects.toThrow()
  })

  it('posts images and videos to the upload endpoint with its headers and gives the URL it answers', async () => {
    const requests = fakeUploadEndpoint(() => ({ status: 201, body: { url: 'https://cdn.example.com/clip.mp4' } }))
    const { canUploadVideo, upload, uploadFile } = withUpload({ endpoint: '/api/uploads', headers: { Authorization: 'Bearer t' } })
    const file = new File(['v'], 'clip.mp4', { type: 'video/mp4' })
    const onProgress = vi.fn()

    expect(await uploadFile(file, context('video', onProgress))).toEqual({ url: 'https://cdn.example.com/clip.mp4' })

    expect(canUploadVideo.value).toBe(true)
    expect(upload.value).toBeTypeOf('function')
    expect(requests).toHaveLength(1)
    expect(requests[0]).toMatchObject({ method: 'POST', url: '/api/uploads', headers: { Accept: 'application/json', Authorization: 'Bearer t' } })
    expect(requests[0].body.get('file')).toBeInstanceOf(File)
    expect((requests[0].body.get('file') as File).name).toBe('clip.mp4')
    expect(requests[0].body.get('kind')).toBe('video')
    expect(onProgress.mock.calls).toEqual([[0.5], [1]])
  })

  it('rejects with the error the endpoint answers, or with an empty message and the status', async () => {
    fakeUploadEndpoint(request => (request.body.get('kind') === 'image'
      ? { status: 413, body: { error: 'The file is too large.' } }
      : { status: 500, body: 'Internal Server Error' }))
    const { uploadFile } = withUpload({ endpoint: '/api/uploads' })

    await expect(uploadFile(new File(['hi'], 'a.png'), context('image'))).rejects.toThrow('The file is too large.')
    await expect(uploadFile(new File(['v'], 'a.mp4'), context('video'))).rejects.toMatchObject({ message: '', status: 500 })
  })

  it('rejects an answer without a url', async () => {
    fakeUploadEndpoint(() => ({ status: 200, body: { path: 'a.png' } }))
    const { uploadFile } = withUpload({ endpoint: '/api/uploads' })

    await expect(uploadFile(new File(['hi'], 'a.png'), context('image'))).rejects.toMatchObject({ message: '', status: 200 })
  })

  it('aborts the request when the upload is cancelled', async () => {
    const requests = fakeUploadEndpoint(() => ({ status: 200, body: { url: '/a.png' } }))
    const { uploadFile } = withUpload({ endpoint: '/api/uploads' })
    const controller = new AbortController()

    const pending = uploadFile(new File(['hi'], 'a.png'), context('image', vi.fn(), controller.signal))
    controller.abort()

    await expect(pending).rejects.toThrow('cancelled')
    expect(requests).toHaveLength(1)
  })
})
