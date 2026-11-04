import { LinkCardAttrs, LinkCardLayout } from '@tiptapify/extensions/components/media/linkCard'
import { TiptapifyLinkPreviewData, TiptapifyUpload } from '@tiptapify/types/editor'

export type MakeLinkCardOptions = {
  fetchPreview: (url: string, signal?: AbortSignal) => Promise<TiptapifyLinkPreviewData>,
  // The upload of the editor: the page image is stored with it, else the card links the page's own image
  upload: TiptapifyUpload | null,
  newTab?: boolean,
  layout?: LinkCardLayout,
  signal?: AbortSignal,
}

function fileName(url: string): string {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop() || '') || 'image'
  } catch {
    return 'image'
  }
}

/**
 * The page image stored with the editor's upload: a page may change or drop its image later. A browser
 * reads it only when the image host allows it (CORS); otherwise the card keeps the image link.
 */
async function storeImage(image: string, upload: TiptapifyUpload, signal?: AbortSignal): Promise<string> {
  try {
    const response = await fetch(image, { signal })
    if (!response.ok) {
      return image
    }

    const blob = await response.blob()
    const file = new File([blob], fileName(image), { type: blob.type })
    const { url } = await upload(file, { kind: 'image', onProgress: () => {}, signal: signal ?? new AbortController().signal })

    return url
  } catch {
    return image
  }
}

/**
 * A link card of a page: its OpenGraph data from the editor's endpoint, under the address the author typed.
 */
export async function makeLinkCard(url: string, options: MakeLinkCardOptions): Promise<LinkCardAttrs> {
  const preview = await options.fetchPreview(url, options.signal)
  const image = preview.image && options.upload ? await storeImage(preview.image, options.upload, options.signal) : preview.image

  return {
    href: url,
    title: preview.title ?? null,
    description: preview.description ?? null,
    image: image ?? null,
    siteName: preview.siteName ?? null,
    layout: options.layout ?? 'compact',
    newTab: options.newTab ?? true,
  }
}
