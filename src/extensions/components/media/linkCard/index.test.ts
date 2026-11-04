import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TiptapifyLink } from '@tiptapify/extensions/components/media/link'
import { applyLinkCard, LinkCard, selectedLinkCard } from '@tiptapify/extensions/components/media/linkCard'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Link, TiptapifyLink, Image, LinkCard],
  })

  return editor
}

const card = {
  href: 'https://news.example.com/a',
  title: 'Talks enter a new stage',
  description: 'The president named the terms',
  image: 'https://cdn.example.com/og.jpg',
  siteName: 'News',
  layout: 'compact',
  newTab: true,
}

const cardHtml = '<a class="tiptapify-link-card" data-link-card="compact" href="https://news.example.com/a" target="_blank" rel="noopener noreferrer">'
  + '<img class="tiptapify-link-card__image" src="https://cdn.example.com/og.jpg" alt="">'
  + '<span class="tiptapify-link-card__body">'
  + '<span class="tiptapify-link-card__site">News</span>'
  + '<span class="tiptapify-link-card__title">Talks enter a new stage</span>'
  + '<span class="tiptapify-link-card__description">The president named the terms</span>'
  + '</span></a>'

describe('link card node', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('is saved as one link with the image and the texts, so the whole card is clickable on a site', () => {
    createEditor('')
    editor!.commands.setContent({ type: 'doc', content: [{ type: 'linkCard', attrs: card }] })

    expect(editor!.getHTML()).toBe(cardHtml)
  })

  it('loads back from the saved HTML as a card, not as a link and an image', () => {
    createEditor(`<p>Before</p>${cardHtml}`)

    const node = editor!.state.doc.child(1)
    expect(node.type.name).toBe('linkCard')
    expect(node.attrs).toEqual(card)
  })

  it('leaves out what it does not have: no image for the text layout, no empty texts, the same tab', () => {
    createEditor('')
    editor!.commands.setContent({
      type: 'doc',
      content: [{ type: 'linkCard', attrs: { href: 'https://a.example', title: 'A', image: 'https://a.example/i.png', layout: 'text', newTab: false } }],
    })

    expect(editor!.getHTML()).toBe(
      '<a class="tiptapify-link-card" data-link-card="text" href="https://a.example">'
      + '<span class="tiptapify-link-card__body"><span class="tiptapify-link-card__title">A</span></span></a>',
    )
  })

  it('updates the selected card in place and inserts a new one otherwise', () => {
    createEditor(`<p>Text</p>${cardHtml}`)

    editor!.commands.setNodeSelection(6)
    const edited = selectedLinkCard(editor!)
    expect(edited?.title).toBe(card.title)

    applyLinkCard(editor!, { ...card, layout: 'large' }, true)
    expect(editor!.state.doc.childCount).toBe(2)
    expect(editor!.state.doc.child(1).attrs.layout).toBe('large')

    editor!.commands.setTextSelection(3)
    applyLinkCard(editor!, { ...card, title: 'Second' }, false)
    expect(editor!.state.doc.toJSON().content.filter((node: { type: string }) => node.type === 'linkCard')).toHaveLength(2)
  })

  it('opens the link dialog with the card on double click', () => {
    createEditor(cardHtml)
    const listener = vi.fn()
    window.addEventListener('tiptapify-show-link', listener)

    const { view } = editor!
    const handled = view.someProp('handleDoubleClickOn', handle => handle(view, 0, view.state.doc.nodeAt(0)!, 0, new MouseEvent('dblclick'), true))

    window.removeEventListener('tiptapify-show-link', listener)
    expect(handled).toBe(true)
    expect(listener.mock.calls[0][0].detail.card).toMatchObject({ href: card.href, title: card.title })
  })

  it('opens the link dialog with a card of the given address by showLinkCard', () => {
    createEditor('<p></p>')
    const listener = vi.fn()
    window.addEventListener('tiptapify-show-link', listener)

    editor!.commands.showLinkCard({ href: card.href, newTab: true })

    window.removeEventListener('tiptapify-show-link', listener)
    expect(listener.mock.calls[0][0].detail).toMatchObject({ card: null, draft: { href: card.href, newTab: true } })
  })

  it('does not open its link on a click while editing, so a click selects it and a double click edits it', () => {
    createEditor(cardHtml)
    const link = editor!.view.dom.querySelector('a[data-link-card]')!
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    link.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('opens its link in a read-only editor', () => {
    createEditor(cardHtml)
    editor!.setEditable(false)
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    editor!.view.dom.querySelector('a[data-link-card]')!.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(false)
  })

  it('is selected by a click, before the link mark selects its text (enableClickSelection)', () => {
    createEditor(`<p>Text</p>${cardHtml}`)
    const { view } = editor!
    const pos = 6

    const handled = view.someProp('handleClickOn', handle => handle(view, pos + 1, view.state.doc.nodeAt(pos)!, pos, new MouseEvent('click'), true))

    expect(handled).toBe(true)
    expect(editor!.state.selection.from).toBe(pos)
    expect(selectedLinkCard(editor!)?.href).toBe(card.href)
  })
})
