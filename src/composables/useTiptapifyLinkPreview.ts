import { InjectionKey, inject, ref, Ref, watch } from 'vue'
import { checkLinkPreview, fetchLinkPreview } from '@tiptapify/extensions/components/media/linkCard/linkPreview'
import { TiptapifyLinkPreviewData, TiptapifyLinkPreviewOptions } from '@tiptapify/types/editor'

export type TiptapifyLinkPreviewState = {
  options: Ref<TiptapifyLinkPreviewOptions | null>,
  // The endpoint answered the handshake: link cards can be made
  available: Ref<boolean>,
}

export const TIPTAPIFY_LINK_PREVIEW_KEY: InjectionKey<TiptapifyLinkPreviewState> = Symbol('tiptapifyLinkPreview')

/**
 * The `linkPreview` prop of the editor, checked by the handshake whenever its endpoint changes.
 */
export function createLinkPreviewState(options: Ref<TiptapifyLinkPreviewOptions | null>): TiptapifyLinkPreviewState {
  const available = ref(false)

  watch(() => options.value?.endpoint, async () => {
    const current = options.value
    available.value = false

    if (current?.endpoint) {
      const ok = await checkLinkPreview(current)
      // An answer for an endpoint changed meanwhile is stale
      if (options.value?.endpoint === current.endpoint) {
        available.value = ok
      }
    }
  }, { immediate: true })

  return { options, available }
}

/**
 * Link cards in the dialogs and the paste menu: whether they can be made, the data of a page, and a new
 * handshake for an endpoint that failed (asked when the link dialog opens: it may be up by now).
 */
export function useTiptapifyLinkPreview(): {
  available: Ref<boolean>,
  fetchPreview: (url: string, signal?: AbortSignal) => Promise<TiptapifyLinkPreviewData>,
  recheck: () => Promise<void>,
} {
  const { options, available } = inject(TIPTAPIFY_LINK_PREVIEW_KEY, { options: ref(null), available: ref(false) })

  function fetchPreview(url: string, signal?: AbortSignal): Promise<TiptapifyLinkPreviewData> {
    return options.value
      ? fetchLinkPreview(options.value, url, signal)
      : Promise.reject(new Error('The editor has no linkPreview endpoint'))
  }

  async function recheck(): Promise<void> {
    const current = options.value
    if (current?.endpoint && !available.value) {
      available.value = await checkLinkPreview(current, { recheckFailed: true })
    }
  }

  return { available, fetchPreview, recheck }
}
