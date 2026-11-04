import { computed, ComputedRef, inject, InjectionKey, Ref, ref } from 'vue'
import { TiptapifyUpload, TiptapifyUploadContext, TiptapifyUploadOptions } from '@tiptapify/types/editor'

export const TIPTAPIFY_UPLOAD_KEY: InjectionKey<Ref<TiptapifyUploadOptions | null>> = Symbol('tiptapifyUpload')

function cancelled(): DOMException {
  return new DOMException('The upload was cancelled', 'AbortError')
}

/**
 * A picked image as a base64 data URL, for an editor without an upload endpoint.
 */
function readAsDataUrl(file: File, { onProgress, signal }: TiptapifyUploadContext): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(cancelled())

      return
    }

    const reader = new FileReader()
    reader.onprogress = event => event.lengthComputable && onProgress(event.loaded / event.total)
    reader.onload = () => {
      onProgress(1)
      resolve({ url: String(reader.result) })
    }
    reader.onerror = () => reject(reader.error ?? new Error('The file could not be read'))
    reader.onabort = () => reject(cancelled())
    signal.addEventListener('abort', () => reader.abort(), { once: true })
    reader.readAsDataURL(file)
  })
}

function parseJson(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * XMLHttpRequest, not fetch: it reports the progress of the upload itself. A failure carries the endpoint's
 * `error` as its message, else an empty one: the dialogs then show their own translated message.
 */
function sendToEndpoint(
  { endpoint, headers }: TiptapifyUploadOptions,
  file: File,
  { kind, onProgress, signal }: TiptapifyUploadContext,
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(cancelled())

      return
    }

    const request = new XMLHttpRequest()
    request.open('POST', endpoint)
    request.setRequestHeader('Accept', 'application/json')
    for (const [name, value] of Object.entries(headers ?? {})) {
      request.setRequestHeader(name, value)
    }

    request.upload.onprogress = event => event.lengthComputable && onProgress(event.loaded / event.total)
    request.onload = () => {
      const body = parseJson(request.responseText)
      if (request.status >= 200 && request.status < 300 && typeof body?.url === 'string' && body.url) {
        onProgress(1)
        resolve({ url: body.url })

        return
      }

      reject(Object.assign(new Error(typeof body?.error === 'string' ? body.error : ''), { status: request.status }))
    }
    request.onerror = () => reject(Object.assign(new Error(''), { status: 0 }))
    request.onabort = () => reject(cancelled())
    signal.addEventListener('abort', () => request.abort(), { once: true })

    const form = new FormData()
    form.append('file', file)
    form.append('kind', kind)
    request.send(form)
  })
}

/**
 * Files picked in the dialogs. With the `upload` endpoint of the editor they are sent to it and the document
 * keeps their URL. Without it an image (a video poster, the image of a link card) is embedded as base64, and
 * a video file can't be picked: a document would grow by its whole size.
 */
export function useTiptapifyUpload(): {
  // null without an upload endpoint
  upload: ComputedRef<TiptapifyUpload | null>,
  canUploadImage: ComputedRef<boolean>,
  canUploadVideo: ComputedRef<boolean>,
  uploadFile: TiptapifyUpload,
} {
  const options = inject(TIPTAPIFY_UPLOAD_KEY, ref(null))

  const upload = computed<TiptapifyUpload | null>(() => {
    const current = options.value

    return current?.endpoint ? (file, context) => sendToEndpoint(current, file, context) : null
  })

  function uploadFile(file: File, context: TiptapifyUploadContext): Promise<{ url: string }> {
    if (upload.value) {
      return upload.value(file, context)
    }

    if (context.kind === 'image') {
      return readAsDataUrl(file, context)
    }

    return Promise.reject(new Error('A video file needs the upload endpoint of the editor'))
  }

  return {
    upload,
    canUploadImage: computed(() => true),
    canUploadVideo: computed(() => upload.value !== null),
    uploadFile,
  }
}
