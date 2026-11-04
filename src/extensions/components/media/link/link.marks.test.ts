import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { editorExtensions } from '@tiptapify/components/editorExtensions'

// jsdom has no ClipboardEvent, which a paste of the editor creates
globalThis.ClipboardEvent ??= class extends Event {
  clipboardData = null
} as never

let editor: Editor | null = null

function createEditor(content: string | Record<string, unknown> = '<p></p>') {
  editor = new Editor({ element: document.createElement('div'), content, extensions: editorExtensions('', false, []) })

  return editor
}

function markNames(): string[] {
  const names: string[] = []
  editor!.state.doc.descendants((node) => {
    node.marks.forEach(mark => names.push(mark.type.name))
  })

  return names
}

const anchors = () => (editor!.getHTML().match(/<a /g) ?? []).length

describe('one link mark', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('makes one link of a pasted URL, not a link inside a link', () => {
    createEditor()

    editor!.view.pasteText('https://www.w3schools.com/')

    expect(anchors()).toBe(1)
    expect(markNames()).toEqual(['link'])
  })

  it('reads a link of the saved HTML as one link', () => {
    createEditor('<p>Read <a href="https://example.com">this</a></p>')

    expect(anchors()).toBe(1)
    expect(markNames()).toEqual(['link'])
  })

  it('sets and removes links with the link mark', () => {
    createEditor('<p>Read this</p>')

    editor!.chain().setTextSelection({ from: 6, to: 10 }).setLink({ href: 'https://example.com' }).run()
    expect(markNames()).toEqual(['link'])

    editor!.chain().setTextSelection({ from: 6, to: 10 }).unsetLink().run()
    expect(markNames()).toEqual([])
  })

  it('loads the saved JSON of earlier versions (tiptapify_link marks) as one link', () => {
    const saved = {
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{
          type: 'text',
          text: 'site',
          marks: [
            { type: 'link', attrs: { href: 'https://example.com' } },
            { type: 'tiptapify_link', attrs: { href: 'https://example.com' } },
          ],
        }, {
          type: 'text',
          text: ' and old',
          marks: [{ type: 'tiptapify_link', attrs: { href: 'https://old.example.com', target: '_blank' } }],
        }],
      }],
    }

    createEditor(saved)
    expect(editor!.getHTML()).toBe('<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://example.com">site</a><a target="_blank" rel="noopener noreferrer nofollow" href="https://old.example.com"> and old</a></p>')
    expect(markNames().every(name => name === 'link')).toBe(true)

    editor!.commands.setContent(saved)
    expect(markNames().every(name => name === 'link')).toBe(true)
    expect(anchors()).toBe(2)
  })
})
