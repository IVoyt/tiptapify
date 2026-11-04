import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import { LinkCard } from '@tiptapify/extensions/components/media/linkCard'
import {
  isLinkCardAddress,
  linkCardAddressProblem,
  linkCardToLink,
} from '@tiptapify/extensions/components/media/linkCard/linkCardDialog'

let editor: Editor | null = null

const cardHtml = '<a class="tiptapify-link-card" data-link-card="compact" href="https://news.example.com/a" target="_blank" rel="noopener noreferrer">'
  + '<span class="tiptapify-link-card__body"><span class="tiptapify-link-card__title">Talks</span></span></a>'

function createEditor(content: string): Editor {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Link.configure({ openOnClick: false }), LinkCard],
  })

  return editor
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

describe('link card address', () => {
  it.each([
    'https://news.example.com/a?b=1#c',
    'http://example.org',
    'https://localhost:8080/page',
    'http://127.0.0.1/x',
  ])('takes the complete http(s) address %s', (address) => {
    expect(isLinkCardAddress(address)).toBe(true)
    expect(linkCardAddressProblem(address)).toBeNull()
  })

  it('asks for the protocol of an address without one and never adds it itself', () => {
    expect(linkCardAddressProblem('example.com/page')).toBe('protocol')
    expect(linkCardAddressProblem('localhost:8080')).toBe('protocol')
    expect(linkCardAddressProblem('example')).toBe('protocol')
    expect(isLinkCardAddress('example.com')).toBe(false)
  })

  it('rejects other protocols and incomplete addresses, and says nothing about an empty one', () => {
    expect(linkCardAddressProblem('ftp://example.com/file')).toBe('invalid')
    expect(linkCardAddressProblem('mailto:a@example.com')).toBe('invalid')
    expect(linkCardAddressProblem('https://exam')).toBe('invalid')
    expect(linkCardAddressProblem('https://exa mple.com')).toBe('invalid')
    expect(linkCardAddressProblem('  ')).toBeNull()
  })
})

describe('show a card as a link', () => {
  it('replaces the selected card with a paragraph linking its page under its title', () => {
    createEditor(`<p>Before</p>${cardHtml}<p>After</p>`)
    editor!.commands.setNodeSelection(8)

    expect(linkCardToLink(editor!, { href: 'https://news.example.com/a', title: 'Talks', newTab: true })).toBe(true)
    expect(editor!.getHTML()).toBe(
      '<p>Before</p><p><a target="_blank" rel="noopener noreferrer" href="https://news.example.com/a">Talks</a></p><p>After</p>',
    )
  })

  it('uses the address as the text of a card without a title and opens it in the same tab when asked', () => {
    createEditor(cardHtml)
    editor!.commands.setNodeSelection(0)

    linkCardToLink(editor!, { href: 'https://news.example.com/a', title: '  ', newTab: false })

    expect(editor!.getHTML()).toBe('<p><a href="https://news.example.com/a">https://news.example.com/a</a></p>')
  })

  it('does nothing without a selected card', () => {
    createEditor('<p>Text</p>')

    expect(linkCardToLink(editor!, { href: 'https://a.example', title: 'A', newTab: true })).toBe(false)
    expect(editor!.getHTML()).toBe('<p>Text</p>')
  })
})
