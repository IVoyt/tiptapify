import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Link } from '@tiptap/extension-link'
import { TiptapifyLink } from '@tiptapify/extensions/components/media/link'
import { LinkCard, LinkCardAttrs } from '@tiptapify/extensions/components/media/linkCard'
import {
  applyLink,
  formRel,
  getLinkContext,
  hasAdvancedValues,
  LinkForm,
  linkAttrs,
  linkToCard,
  missingProtocol,
  parseRel,
  removeLink,
  serializeRel,
  withProtocol,
  withNewTabRel,
} from '@tiptapify/extensions/components/media/link/linkDialog'

describe('missingProtocol', () => {
  it.each([
    'example.com',
    '  www.example.com/page?x=1#top ',
    'internal.com:21',
    'sub.example.co.uk:8080/path',
    'localhost:8080/admin',
    'intranet:3000',
  ])('%s needs a protocol', (href) => {
    expect(missingProtocol(href)).toBe(true)
  })

  it.each([
    'http://example.com',
    'HTTPS://example.com',
    'ftp://files.example.com',
    'smb://server/share',
    'mailto:user@example.com',
    'tel:+380441234567',
    '#anchor',
    '/relative/path',
    './page',
    '../page',
    '?query=1',
    'user@example.com',
    'word',
    '',
  ])('%s does not', (href) => {
    expect(missingProtocol(href)).toBe(false)
  })
})

describe('withProtocol', () => {
  it('puts the chosen protocol before the address', () => {
    expect(withProtocol(' internal.com:21 ', 'ftp')).toBe('ftp://internal.com:21')
    expect(withProtocol('intranet/wiki', 'http')).toBe('http://intranet/wiki')
  })
})

describe('rel helpers', () => {
  it('parses an attribute string and pasted lists', () => {
    expect(parseRel(' NoFollow  ugc,sponsored ')).toEqual(['nofollow', 'ugc', 'sponsored'])
    expect(parseRel(['nofollow', 'ugc, nofollow', ' Me '])).toEqual(['nofollow', 'ugc', 'me'])
    expect(parseRel(null)).toEqual([])
  })

  it('serializes to an attribute or null', () => {
    expect(serializeRel(['nofollow', 'NOFOLLOW', 'ugc'])).toBe('nofollow ugc')
    expect(serializeRel([])).toBeNull()
  })

  it('adds noopener noreferrer for a new tab only', () => {
    expect(withNewTabRel(['nofollow'], true)).toEqual(['nofollow', 'noopener', 'noreferrer'])
    expect(withNewTabRel(['noopener'], true)).toEqual(['noopener', 'noreferrer'])
    expect(withNewTabRel(['nofollow'], false)).toEqual(['nofollow'])
  })

  it('hides the values implied by a new tab in the form', () => {
    expect(formRel('noopener noreferrer nofollow', true)).toEqual(['nofollow'])
    expect(formRel('noopener nofollow', false)).toEqual(['noopener', 'nofollow'])
  })

  it('detects settings of the advanced section', () => {
    expect(hasAdvancedValues(['noopener', 'noreferrer'], '')).toBe(false)
    expect(hasAdvancedValues(['nofollow'], '')).toBe(true)
    expect(hasAdvancedValues([], ' btn ')).toBe(true)
  })

  it('builds mark attributes', () => {
    const form: LinkForm = { href: ' ftp://example.com ', text: '', newTab: false, rel: [], cssClass: ' ' }

    expect(linkAttrs(form)).toEqual({ href: 'ftp://example.com', target: null, rel: null, class: null })
    expect(linkAttrs({ ...form, newTab: true, rel: ['ugc'], cssClass: 'btn' }))
      .toEqual({ href: 'ftp://example.com', target: '_blank', rel: 'ugc noopener noreferrer', class: 'btn' })
  })
})

describe('apply logic', () => {
  let editor: Editor | null = null

  function createEditor(content: string) {
    editor = new Editor({
      element: document.createElement('div'),
      content,
      // The same pair of link extensions the editor registers
      extensions: [
        Document,
        Paragraph,
        Text,
        Link.configure({ openOnClick: false, enableClickSelection: true, defaultProtocol: 'https' }),
        TiptapifyLink.configure({ openOnClick: false, defaultProtocol: 'https' }),
      ],
    })

    return editor
  }

  function form(overrides: Partial<LinkForm> = {}): LinkForm {
    return { href: 'https://example.com', text: '', newTab: false, rel: [], cssClass: '', ...overrides }
  }
  it('never adds a protocol of its own: the address is saved as typed', () => {
    const ed = createEditor('<p>intranet</p>')
    ed.commands.setTextSelection({ from: 1, to: 9 })

    applyLink(ed, form({ href: ' ftp://internal.com:21/report.zip ', text: 'intranet' }), getLinkContext(ed))

    expect(ed.getHTML()).toContain('href="ftp://internal.com:21/report.zip"')
  })



  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('inserts the text with the link on an empty selection', () => {
    const ed = createEditor('<p>Hello world</p>')
    ed.commands.setTextSelection(7)
    const context = getLinkContext(ed)

    expect(context).toEqual({ active: false, attrs: {}, text: '' })
    expect(applyLink(ed, form({ text: 'site' }), context)).toBe(true)
    expect(ed.getHTML()).toBe('<p>Hello <a href="https://example.com">site</a>world</p>')

    // Typing right after the new link does not extend it
    ed.commands.insertContent(' ')
    expect(ed.getHTML()).toBe('<p>Hello <a href="https://example.com">site</a> world</p>')
  })

  it('uses the address as the text when both are empty', () => {
    const ed = createEditor('<p>Hello world</p>')
    ed.commands.setTextSelection(7)

    applyLink(ed, form(), getLinkContext(ed))

    expect(ed.getHTML()).toBe('<p>Hello <a href="https://example.com">https://example.com</a>world</p>')
  })

  it('sets only the mark when the selected text is unchanged', () => {
    const ed = createEditor('<p>Hello world</p>')
    ed.commands.setTextSelection({ from: 7, to: 12 })
    const context = getLinkContext(ed)

    expect(context.text).toBe('world')
    applyLink(ed, form({ text: 'world', newTab: true, rel: ['nofollow'] }), context)

    expect(ed.getHTML()).toBe(
      '<p>Hello <a target="_blank" rel="nofollow noopener noreferrer" href="https://example.com">world</a></p>',
    )
  })

  it('replaces the selection when the text is changed', () => {
    const ed = createEditor('<p>Hello world</p>')
    ed.commands.setTextSelection({ from: 7, to: 12 })
    const context = getLinkContext(ed)

    applyLink(ed, form({ text: 'there' }), context)

    expect(ed.getHTML()).toBe('<p>Hello <a href="https://example.com">there</a></p>')
  })

  it('updates the attributes of the link under the caret, keeping the others', () => {
    const ed = createEditor('<p>Go <a href="https://old.com" target="_blank" rel="noopener noreferrer" class="btn" title="Old">old site</a> now</p>')
    ed.commands.setTextSelection(6)
    const context = getLinkContext(ed)

    expect(context.active).toBe(true)
    expect(context.text).toBe('old site')
    expect(context.attrs).toMatchObject({ href: 'https://old.com', target: '_blank', class: 'btn' })

    applyLink(ed, form({ href: 'https://new.com', text: 'old site', newTab: false, rel: ['ugc'] }), context)

    expect(ed.getHTML()).toBe('<p>Go <a rel="ugc" href="https://new.com" title="Old">old site</a> now</p>')
  })

  it('replaces the text of the edited link', () => {
    const ed = createEditor('<p>Go <a href="https://old.com" title="Old">old site</a> now</p>')
    ed.commands.setTextSelection(6)
    const context = getLinkContext(ed)

    applyLink(ed, form({ href: 'https://old.com', text: 'new site' }), context)

    expect(ed.getHTML()).toBe('<p>Go <a href="https://old.com" title="Old">new site</a> now</p>')
  })

  it('removes the whole link under the caret', () => {
    const ed = createEditor('<p>Go <a href="https://old.com">old site</a> now</p>')
    ed.commands.setTextSelection(6)

    expect(removeLink(ed)).toBe(true)
    expect(ed.getHTML()).toBe('<p>Go old site now</p>')
  })
})

describe('linkToCard', () => {
  let editor: Editor | null = null

  const card: LinkCardAttrs = {
    href: 'https://example.com/page',
    title: 'Page',
    description: null,
    image: null,
    siteName: null,
    layout: 'compact',
    newTab: false,
  }

  function createEditor(content: string) {
    editor = new Editor({
      element: document.createElement('div'),
      content,
      extensions: [
        Document,
        Paragraph,
        Text,
        Link.configure({ openOnClick: false, enableClickSelection: true, defaultProtocol: 'https' }),
        TiptapifyLink.configure({ openOnClick: false, defaultProtocol: 'https' }),
        LinkCard,
      ],
    })

    return editor
  }

  function types(ed: Editor): string[] {
    const names: string[] = []
    ed.state.doc.forEach(node => names.push(node.type.name))

    return names
  }

  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('replaces the paragraph of a link that is its whole text', () => {
    const ed = createEditor('<p>Before</p><p><a href="https://example.com/page">Page</a></p><p>After</p>')
    ed.commands.setTextSelection(11)

    expect(linkToCard(ed, card, getLinkContext(ed))).toBe(true)

    expect(types(ed)).toEqual(['paragraph', 'linkCard', 'paragraph'])
    expect(ed.state.doc.child(1).attrs).toEqual(card)
    expect(ed.getHTML()).not.toContain('<p></p>')
  })

  it('replaces only the link inside a longer text, splitting the paragraph', () => {
    const ed = createEditor('<p>See <a href="https://example.com/page">Page</a> now</p>')
    ed.commands.setTextSelection(7)

    linkToCard(ed, card, getLinkContext(ed))

    expect(types(ed)).toEqual(['paragraph', 'linkCard', 'paragraph'])
    expect(ed.state.doc.child(0).textContent).toBe('See ')
    expect(ed.state.doc.child(2).textContent).toBe(' now')
  })

  it('takes the place of an empty paragraph, or of the selection', () => {
    const ed = createEditor('<p>One</p><p></p>')
    ed.commands.setTextSelection(6)

    linkToCard(ed, card, getLinkContext(ed))
    expect(types(ed)).toEqual(['paragraph', 'linkCard'])

    ed.commands.setContent('<p>Hello world</p>')
    ed.commands.setTextSelection({ from: 1, to: 12 })
    linkToCard(ed, card, getLinkContext(ed))
    expect(types(ed)).toEqual(['linkCard'])
  })
})
