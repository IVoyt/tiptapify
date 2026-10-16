import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Gapcursor } from '@tiptap/extensions'
import { TiptapifyImage } from '@tiptapify/extensions/components/media/image'
import { ImageWithCaption } from '@tiptapify/extensions/components/media/image/caption'
import { findImageRuns, ImageSlider } from '@tiptapify/extensions/components/media/image/slider'

let editor: Editor | null = null

function createEditor(content: string, minImages = 3) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [
      Document,
      Paragraph,
      Text,
      Gapcursor,
      TiptapifyImage,
      ImageWithCaption.configure({ resize: { enabled: true, alwaysPreserveAspectRatio: true } }),
      ImageSlider.configure({ minImages, label: 'Slider' }),
    ],
  })

  return editor
}

const img = (name: string) => `<img src="https://example.com/${name}.png">`

function slideLabels(): Array<string | null> {
  return [...editor!.view.dom.querySelectorAll('.tiptapify-image')]
    .map(image => (image.classList.contains('tiptapify-slide') ? image.getAttribute('data-slide-label') : null))
}

describe('image slider', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('finds runs of images with nothing between them', () => {
    createEditor(`${img('a')}${img('b')}${img('c')}<p>text</p>${img('d')}${img('e')}`)

    expect(findImageRuns(editor!.state.doc, 'image', 2).map(run => run.length)).toEqual([3, 2])
    expect(findImageRuns(editor!.state.doc, 'image', 3).map(run => run.length)).toEqual([3])
  })

  it('numbers the slides of a run that reaches the minimum', () => {
    createEditor(`<p>text</p>${img('a')}${img('b')}${img('c')}${img('d')}<p>text</p>${img('e')}${img('f')}`)

    expect(slideLabels()).toEqual(['Slider · 1/4', '2', '3', '4', null, null])
  })

  it('uses the configured minimum', () => {
    createEditor(`${img('a')}${img('b')}<p>text</p>${img('c')}`, 2)

    expect(slideLabels()).toEqual(['Slider · 1/2', '2', null])
  })

  it('stops the slider when text splits the run', () => {
    createEditor(`${img('a')}${img('b')}${img('c')}`)
    editor!.chain().insertContentAt(editor!.state.doc.child(0).nodeSize, '<p>text</p>').run()

    expect(slideLabels()).toEqual([null, null, null])
  })

  it('keeps the slides while an image is selected', () => {
    createEditor(`${img('a')}${img('b')}${img('c')}`)
    editor!.commands.setNodeSelection(0)
    editor!.commands.focus()

    expect(slideLabels()).toEqual(['Slider · 1/3', '2', '3'])
  })

  it('does nothing when the minimum is below two', () => {
    createEditor(`${img('a')}${img('b')}${img('c')}`, 0)

    expect(slideLabels()).toEqual([null, null, null])
  })

  it('swaps a slide with the next and the previous one', () => {
    createEditor(`${img('a')}${img('b')}${img('c')}`)
    const sources = () => editor!.getJSON().content!.map(node => node.attrs!.src.slice(-5))

    editor!.commands.setNodeSelection(0)
    expect(editor!.commands.moveImage(1)).toBe(true)
    expect(sources()).toEqual(['b.png', 'a.png', 'c.png'])
    expect(editor!.getAttributes('image').src).toContain('a.png')

    expect(editor!.commands.moveImage(-1)).toBe(true)
    expect(sources()).toEqual(['a.png', 'b.png', 'c.png'])
  })

  it('does not move an image past the end of its run', () => {
    createEditor(`<p>text</p>${img('a')}${img('b')}`)
    const first = editor!.state.doc.child(0).nodeSize

    editor!.commands.setNodeSelection(first)

    expect(editor!.can().moveImage(-1)).toBe(false)
    expect(editor!.can().moveImage(1)).toBe(true)
  })
})
