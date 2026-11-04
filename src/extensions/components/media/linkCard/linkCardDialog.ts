import { Editor } from '@tiptap/core'
import { LinkCardAttrs, LinkCardLayout, selectedLinkCard } from '@tiptapify/extensions/components/media/linkCard'
import { LINK_MARK, linkAttrs, LinkForm, missingProtocol } from '@tiptapify/extensions/components/media/link/linkDialog'

export const LINK_CARD_LAYOUTS: LinkCardLayout[] = ['compact', 'large', 'text']

// What is wrong with the address of a card: no protocol (the author adds it, the dialog never guesses it),
// or not a complete http(s) address of a page
export type LinkCardAddressProblem = 'protocol' | 'invalid'

const schemeRegex = /^[a-z][a-z0-9+.-]*:/i

/**
 * A complete http(s) address of a page: only such an address is asked from the link preview endpoint.
 */
export function isLinkCardAddress(value: string): boolean {
  const href = (value ?? '').trim()

  if (!/^https?:\/\//i.test(href) || /\s/.test(href)) {
    return false
  }

  try {
    const { hostname } = new URL(href)

    return hostname === 'localhost' || /\.[a-z0-9-]{2,}$/i.test(hostname) || /^\d+(\.\d+){3}$/.test(hostname)
  } catch {
    return false
  }
}

export function linkCardAddressProblem(value: string): LinkCardAddressProblem | null {
  const href = (value ?? '').trim()

  if (!href || isLinkCardAddress(href)) {
    return null
  }

  return missingProtocol(href) || !schemeRegex.test(href) ? 'protocol' : 'invalid'
}

/**
 * A card displayed as a link again: the selected card becomes a paragraph with a link to its page, the
 * card's title (or the address) as the text, and the rel values and class of the link dialog if given.
 */
export function linkCardToLink(
  editor: Editor,
  card: Pick<LinkCardAttrs, 'href' | 'title' | 'newTab'> & Partial<Pick<LinkForm, 'rel' | 'cssClass'>>,
): boolean {
  if (!selectedLinkCard(editor)) {
    return false
  }

  const href = card.href.trim()
  const text = card.title?.trim() || href
  const attrs = linkAttrs({ href, text, newTab: card.newTab, rel: card.rel ?? [], cssClass: card.cssClass ?? '' })

  return editor.chain().focus().insertContent({
    type: 'paragraph',
    content: [{ type: 'text', text, marks: [{ type: LINK_MARK, attrs }] }],
  }).run()
}
