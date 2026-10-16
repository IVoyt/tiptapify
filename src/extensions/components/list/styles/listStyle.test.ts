import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { editorExtensions } from '@tiptapify/components/editorExtensions'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({ element: document.createElement('div'), content, extensions: editorExtensions('', false, []) })

  return editor
}

describe('list styles', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('turns a paragraph into a numbered list with the chosen numbering', () => {
    createEditor('<p>one</p>')
    editor!.commands.setTextSelection(2)

    editor!.commands.setListStyle('orderedList', 'lower-roman')

    expect(editor!.getHTML()).toBe('<ol style="list-style-type: lower-roman;"><li><p>one</p></li></ol>')
  })

  it('changes the marker of an existing bullet list and resets it to the default', () => {
    createEditor('<ul><li><p>one</p></li></ul>')
    editor!.commands.setTextSelection(3)

    editor!.commands.setListStyle('bulletList', 'square')
    expect(editor!.getHTML()).toContain('<ul style="list-style-type: square;">')

    editor!.commands.setListStyle('bulletList', null)
    expect(editor!.getHTML()).toBe('<ul><li><p>one</p></li></ul>')
  })

  it('reads the list style TinyMCE saved', () => {
    createEditor('<ol style="list-style-type: upper-alpha;"><li><p>one</p></li></ol>')

    expect(editor!.getJSON().content![0].attrs).toMatchObject({ listStyleType: 'upper-alpha' })
  })
})
