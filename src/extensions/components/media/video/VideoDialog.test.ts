import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Youtube } from '@tiptap/extension-youtube'
import Iframe from '@tiptapify/extensions/components/media/iframe'
import { TiptapifyVideo } from '@tiptapify/extensions/components/media/video'
import VideoDialog from '@tiptapify/extensions/components/media/video/VideoDialog.vue'
import { VideoFile } from '@tiptapify/extensions/components/media/video/videoFile'
import { fakeUploadEndpoint } from '@tiptapify/composables/fakeUploadEndpoint'
import { TIPTAPIFY_UPLOAD_KEY } from '@tiptapify/composables/useTiptapifyUpload'
import { TiptapifyUploadOptions } from '@tiptapify/types/editor'

// jsdom has no `visualViewport`; Vuetify's overlay positioning reads it
if (!('visualViewport' in globalThis)) {
  ;(globalThis as Record<string, unknown>).visualViewport = {
    scale: 1,
    offsetLeft: 0,
    offsetTop: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
  }
}

let app: App | null = null
let editor: Editor | null = null

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

async function openDialog(content: string, upload: TiptapifyUploadOptions | null = null, selectFirst = false): Promise<HTMLElement> {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Youtube.configure({ nocookie: true }), Iframe, VideoFile, TiptapifyVideo],
  })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide(TIPTAPIFY_UPLOAD_KEY, ref(upload))

      return () => h(VideoDialog)
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  if (selectFirst) {
    editor.commands.setNodeSelection(0)
  }
  editor.commands.showTiptapifyVideo()
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-dialog')!
}

async function type(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
  await flush()
}

async function submit(card: HTMLElement) {
  card.querySelector('form')!.requestSubmit()
  await flush()
}

function buttonWithText(card: HTMLElement, text: string): HTMLButtonElement {
  return [...card.querySelectorAll('button')].find(button => button.textContent?.includes(text)) as HTMLButtonElement
}

afterEach(() => {
  vi.unstubAllGlobals()
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
})

describe('video dialog', () => {
  it('keeps the dialog open with an inline error for an unsupported link', async () => {
    const card = await openDialog('<p></p>')

    await type(card.querySelector('input')!, 'https://example.com/clip.html')
    await submit(card)

    expect(card.textContent).toContain('dialog.video.url_unsupported')
    expect(document.querySelector('.tiptapify-dialog')).not.toBeNull()
    expect(editor!.getHTML()).toBe('<p></p>')
  })

  it('inserts a responsive YouTube video starting at the link time', async () => {
    const card = await openDialog('<p></p>')

    await type(card.querySelector('input')!, 'https://youtu.be/dQw4w9WgXcQ?t=42')

    expect(card.textContent).toContain('YouTube')
    expect(card.querySelector<HTMLInputElement>('input[placeholder="0:00"]')!.value).toBe('0:42')

    await submit(card)

    const youtube = editor!.state.doc.firstChild!

    expect(youtube.type.name).toBe('youtube')
    expect(youtube.attrs).toMatchObject({ src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', start: 42, width: null, height: null })
  })

  it('keeps the custom size in its ratio until the lock is opened', async () => {
    const card = await openDialog('<p></p>')
    await type(card.querySelector('input')!, 'https://youtu.be/dQw4w9WgXcQ')
    buttonWithText(card, 'dialog.video.size_custom').click()
    await flush()

    const [width, height] = card.querySelectorAll<HTMLInputElement>('input[type="number"]')
    expect([width.value, height.value]).toEqual(['640', '360'])

    await type(width, '1280')
    expect(height.value).toBe('720')

    card.querySelector<HTMLButtonElement>('[aria-label="dialog.video.keep_ratio"]')!.click()
    await flush()
    await type(width, '800')
    expect(height.value).toBe('720')

    await submit(card)
    expect(editor!.getJSON().content!.find(node => node.type === 'youtube')!.attrs).toMatchObject({ width: 800, height: 720 })
  })

  it('inserts a link to a video file as a video node with the file options', async () => {
    const card = await openDialog('<p></p>')
    await type(card.querySelector('input')!, 'https://www.w3schools.com/tags/mov_bbb.mp4#t=5')

    expect(card.querySelector('.tiptapify-video-dialog__preview video')!.getAttribute('src')).toBe('https://www.w3schools.com/tags/mov_bbb.mp4#t=5')
    const loop = [...card.querySelectorAll('.v-checkbox')].find(box => box.textContent?.includes('dialog.video.loop'))!
    loop.querySelector('input')!.click()
    await flush()

    await submit(card)

    const video = editor!.getJSON().content!.find(node => node.type === 'video')!
    expect(video.attrs).toMatchObject({ src: 'https://www.w3schools.com/tags/mov_bbb.mp4', start: 5, controls: true, loop: true })
  })

  it('opens a video linked by its file address on the link tab, even without the upload', async () => {
    const card = await openDialog('<video src="https://www.w3schools.com/tags/mov_bbb.mp4#t=5" controls></video>', null, true)

    expect(card.querySelector<HTMLInputElement>('input')!.value).toBe('https://www.w3schools.com/tags/mov_bbb.mp4')
    expect(card.querySelector<HTMLInputElement>('input[placeholder="0:00"]')!.value).toBe('0:05')
  })

  it('offers the upload only when the editor has an upload endpoint', async () => {
    const card = await openDialog('<p></p>')

    expect(buttonWithText(card, 'dialog.video.source_upload')).toBeUndefined()
  })

  it('uploads a video file to the endpoint and inserts it as a video node', async () => {
    const requests = fakeUploadEndpoint(() => ({ status: 201, body: { url: 'https://cdn.example.com/clip.mp4' } }))
    const card = await openDialog('<p></p>', { endpoint: '/api/uploads' })

    buttonWithText(card, 'dialog.video.source_upload').click()
    await flush()

    const input = card.querySelector<HTMLInputElement>('input[accept="video/*"]')!
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'clip.mp4', { type: 'video/mp4' })] })
    input.dispatchEvent(new Event('change'))
    await new Promise(resolve => setTimeout(resolve))
    await flush()

    expect(requests).toHaveLength(1)
    expect(requests[0].body.get('kind')).toBe('video')
    expect(card.textContent).toContain('clip.mp4')

    await submit(card)

    expect(editor!.state.doc.firstChild!.type.name).toBe('video')
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ src: 'https://cdn.example.com/clip.mp4', controls: true, width: null })
  })

  it('shows the error the upload endpoint answers and inserts nothing', async () => {
    fakeUploadEndpoint(() => ({ status: 413, body: { error: 'The file is too large.' } }))
    const card = await openDialog('<p></p>', { endpoint: '/api/uploads' })

    buttonWithText(card, 'dialog.video.source_upload').click()
    await flush()

    const input = card.querySelector<HTMLInputElement>('input[accept="video/*"]')!
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'clip.mp4', { type: 'video/mp4' })] })
    input.dispatchEvent(new Event('change'))
    await new Promise(resolve => setTimeout(resolve))
    await flush()

    expect(card.querySelector('[role="alert"]')!.textContent).toContain('The file is too large.')

    await submit(card)

    expect(editor!.getHTML()).toBe('<p></p>')
  })

  it('edits the selected video in place, keeping the attributes it does not know', async () => {
    const card = await openDialog('<video src="/a.mp4" controls></video>', null, true)

    expect(card.textContent).toContain('dialog.video.title_edit')
    expect(card.querySelector<HTMLInputElement>('input')!.value).toBe('/a.mp4')

    const loop = [...card.querySelectorAll('.v-checkbox')].find(box => box.textContent?.includes('dialog.video.loop'))!
    loop.querySelector('input')!.click()
    await flush()
    await submit(card)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ src: '/a.mp4', controls: true, loop: true })
  })

  it('removes the selected video', async () => {
    const card = await openDialog('<video src="/a.mp4"></video><p>Text</p>', null, true)

    buttonWithText(card, 'dialog.remove').click()
    await flush()

    expect(editor!.getHTML()).toBe('<p>Text</p>')
  })
})
