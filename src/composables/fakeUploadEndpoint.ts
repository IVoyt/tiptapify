import { vi } from 'vitest'

// Tests only

export type FakeUploadRequest = {
  method: string,
  url: string,
  headers: Record<string, string>,
  body: FormData,
}

export type FakeUploadAnswer = { status: number, body: unknown }

/**
 * Replaces XMLHttpRequest with one that records each request and answers it on the next task: first half of
 * the upload progress, then `answer(request)`. Restored by `vi.unstubAllGlobals()`.
 */
export function fakeUploadEndpoint(answer: (request: FakeUploadRequest) => FakeUploadAnswer): FakeUploadRequest[] {
  const requests: FakeUploadRequest[] = []

  class FakeXMLHttpRequest {
    upload: { onprogress: ((event: { lengthComputable: boolean, loaded: number, total: number }) => void) | null } = { onprogress: null }
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    onabort: (() => void) | null = null
    status = 0
    responseText = ''
    private request: FakeUploadRequest = { method: '', url: '', headers: {}, body: new FormData() }
    private aborted = false

    open(method: string, url: string) {
      Object.assign(this.request, { method, url })
    }

    setRequestHeader(name: string, value: string) {
      this.request.headers[name] = value
    }

    send(body: FormData) {
      this.request.body = body
      requests.push(this.request)

      setTimeout(() => {
        if (this.aborted) {
          return
        }

        this.upload.onprogress?.({ lengthComputable: true, loaded: 1, total: 2 })
        const { status, body: response } = answer(this.request)
        this.status = status
        this.responseText = typeof response === 'string' ? response : JSON.stringify(response)
        this.onload?.()
      })
    }

    abort() {
      this.aborted = true
      this.onabort?.()
    }
  }

  vi.stubGlobal('XMLHttpRequest', FakeXMLHttpRequest)

  return requests
}
