import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import { LinkCard, LinkCardAttrs } from '@tiptapify/extensions/components/media/linkCard'
import {
  dismissPastedLink,
  LinkCardPaste,
  PASTE_CARD_MENU_CLASS,
  pastedLink,
  pastedLinkUrl,
  replacePastedLink,
} from '@tiptapify/extensions/components/media/linkCard/pasteCard'

const url = 'https://news.example.com/a?b=1'

const card: LinkCardAttrs = {
  href: url,
  title: 'Talks enter a new stage',
  description: null,
  image: null,
  siteName: 'News',
  layout: 'compact',
  newTab: true,
}

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.body.appendChild(document.createElement('div')),
    content,
    extensions: [Document, Paragraph, Text, Link.configure({ openOnClick: false }), LinkCard, LinkCardPaste],
  })

  return editor
}

// jsdom has no ClipboardEvent: a plain paste event stands for it
function paste(ed: Editor, text: string) {
  ed.view.pasteText(text, new Event('paste') as ClipboardEvent)
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

describe('pastedLinkUrl', () => {
  it.each([
    [url, url],
    ['  http://example.com  ', 'http://example.com'],
  ])('%s is one address', (text, expected) => {
    expect(pastedLinkUrl(text)).toBe(expected)
  })

  it.each([
    'example.com',
    'ftp://example.com/file',
    'mailto:user@example.com',
    'see https://example.com',
    'https://example.com https://example.org',
    'https://exa mple.com',
    '',
    null,
  ])('%s is not', (text) => {
    expect(pastedLinkUrl(text)).toBeNull()
  })
})

describe('the pasted link', () => {
  it('is pasted as usual (a link) and remembered when it is alone in an empty paragraph', () => {
    const ed = createEditor('<p>Before</p><p></p>')
    ed.commands.setTextSelection(9)

    paste(ed, url)

    expect(ed.getHTML()).toBe(`<p>Before</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="${url}">${url.replace('&', '&amp;')}</a></p>`)
    expect(pastedLink(ed.state)).toEqual({ url, from: 9, to: 9 + url.length, paragraphFrom: 8, paragraphTo: 10 + url.length })
  })

  it('is not remembered in a paragraph with text, or for text that is not one address', () => {
    const ed = createEditor('<p>Before</p><p></p>')
    ed.commands.setTextSelection(7)
    paste(ed, url)
    expect(pastedLink(ed.state)).toBeNull()

    ed.commands.setContent('<p></p>')
    ed.commands.setTextSelection(1)
    paste(ed, `see ${url}`)
    expect(pastedLink(ed.state)).toBeNull()

    ed.commands.setContent('<p></p>')
    ed.commands.setTextSelection(1)
    paste(ed, 'example.com')
    expect(pastedLink(ed.state)).toBeNull()
  })

  it('is forgotten on typing', () => {
    const ed = createEditor('<p></p>')
    paste(ed, url)

    ed.commands.insertContent(' ')

    expect(pastedLink(ed.state)).toBeNull()
  })

  it('is forgotten when the selection moves', () => {
    const ed = createEditor('<p>Before</p><p></p>')
    ed.commands.setTextSelection(9)
    paste(ed, url)

    ed.commands.setTextSelection(2)

    expect(pastedLink(ed.state)).toBeNull()
  })

  it('is forgotten on Esc and on dismiss', () => {
    const ed = createEditor('<p></p>')
    paste(ed, url)

    const escape = new KeyboardEvent('keydown', { key: 'Escape' })
    expect(ed.view.someProp('handleKeyDown', handler => handler(ed.view, escape))).toBe(true)
    expect(pastedLink(ed.state)).toBeNull()
    // Esc does nothing more without a pasted link
    expect(ed.view.someProp('handleKeyDown', handler => handler(ed.view, escape))).toBeFalsy()

    ed.commands.setContent('<p></p>')
    paste(ed, url)
    dismissPastedLink(ed)
    expect(pastedLink(ed.state)).toBeNull()
    expect(ed.getHTML()).toContain(`href="${url}"`)
  })

  it('is forgotten when the editor loses focus, but not to the paste menu', () => {
    const ed = createEditor('<p></p>')
    paste(ed, url)

    const menu = document.body.appendChild(document.createElement('div'))
    menu.className = PASTE_CARD_MENU_CLASS
    const button = menu.appendChild(document.createElement('button'))

    ed.view.dispatch(ed.state.tr.setMeta('blur', { event: new FocusEvent('blur', { relatedTarget: button }) }))
    expect(pastedLink(ed.state)?.url).toBe(url)

    ed.view.dispatch(ed.state.tr.setMeta('blur', { event: new FocusEvent('blur') }))
    expect(pastedLink(ed.state)).toBeNull()
    menu.remove()
  })

  it('follows its paragraph through changes before it', () => {
    const ed = createEditor('<p>Before</p><p></p>')
    ed.commands.setTextSelection(9)
    paste(ed, url)

    // An appended transaction (e.g. what the paste brings along) is not the author's change: the link stays
    ed.view.dispatch(ed.state.tr.insertText('Very ', 1).setMeta('appendedTransaction', ed.state.tr))

    expect(pastedLink(ed.state)?.paragraphFrom).toBe(13)
  })
})

describe('replacePastedLink', () => {
  it('replaces the paragraph of the pasted link with its card', () => {
    const ed = createEditor('<p>Before</p><p></p><p>After</p>')
    ed.commands.setTextSelection(9)
    paste(ed, url)

    expect(replacePastedLink(ed, card)).toBe(true)

    expect(ed.state.doc.childCount).toBe(3)
    expect(ed.state.doc.child(1).type.name).toBe('linkCard')
    expect(ed.state.doc.child(1).attrs).toEqual(card)
    expect(ed.state.doc.child(2).textContent).toBe('After')
    expect(pastedLink(ed.state)).toBeNull()
  })

  it('does nothing once the link is gone or for another address', () => {
    const ed = createEditor('<p></p>')
    paste(ed, url)

    expect(replacePastedLink(ed, { ...card, href: 'https://other.example.com' })).toBe(false)

    ed.commands.insertContent('x')
    expect(replacePastedLink(ed, card)).toBe(false)
    expect(ed.state.doc.child(0).type.name).toBe('paragraph')
  })
})
