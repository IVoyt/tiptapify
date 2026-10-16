import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TiptapifyImage } from '@tiptapify/extensions/components/media/image'
import { ImageWithCaption } from '@tiptapify/extensions/components/media/image/caption'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [
      Document,
      Paragraph,
      Text,
      TiptapifyImage,
      ImageWithCaption.configure({
        resize: { enabled: true, alwaysPreserveAspectRatio: true },
        captionPlaceholder: 'Add a caption',
      }),
    ],
  })

  return editor
}

function caption(): HTMLInputElement {
  return editor!.view.dom.querySelector('.tiptapify-image-caption') as HTMLInputElement
}

function typeCaption(value: string) {
  caption().value = value
  caption().dispatchEvent(new Event('input'))
}

describe('image caption', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('shows the image title as the caption under the image', () => {
    createEditor('<img src="https://example.com/a.png" title="Kyiv at night">')

    expect(caption().value).toBe('Kyiv at night')
    expect(caption().placeholder).toBe('Add a caption')
  })

  it('saves the typed caption as the figure caption', () => {
    createEditor('<img src="https://example.com/a.png">')

    typeCaption('Kyiv at night')

    expect(editor!.getHTML()).toBe('<figure><img src="https://example.com/a.png"><figcaption>Kyiv at night</figcaption></figure>')
  })

  it('saves an image without a caption as a figure without figcaption', () => {
    createEditor('<img src="https://example.com/a.png" title="Kyiv at night">')

    typeCaption('  ')

    expect(editor!.getHTML()).toBe('<figure><img src="https://example.com/a.png"></figure>')
  })

  it('loads a figure with its caption and image attributes', () => {
    createEditor('<figure><img src="https://example.com/a.png" alt="Kyiv" width="640"><figcaption> Kyiv at night </figcaption></figure>')

    expect(caption().value).toBe('Kyiv at night')
    expect(editor!.getJSON().content![0].attrs).toMatchObject({ src: 'https://example.com/a.png', alt: 'Kyiv', width: 640, title: 'Kyiv at night' })
  })

  it('keeps consecutive figures as separate images', () => {
    createEditor('<figure><img src="https://example.com/a.png"></figure><figure><img src="https://example.com/b.png"></figure>')

    expect(editor!.getJSON().content!.map(node => node.type)).toEqual(['image', 'image'])
  })

  it('updates the caption when the title is changed elsewhere', () => {
    createEditor('<img src="https://example.com/a.png">')

    editor!.chain().setNodeSelection(0).updateAttributes('image', { title: 'From the dialog' }).run()

    expect(caption().value).toBe('From the dialog')
  })

  it('opens the image dialog for this image on double click', () => {
    createEditor('<p>text</p><img src="https://example.com/a.png" alt="Kyiv">')
    const listener = vi.fn()
    window.addEventListener('tiptapify-show-tiptapifyImage', listener)

    editor!.view.dom.querySelector('[data-resize-wrapper]')!.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))

    window.removeEventListener('tiptapify-show-tiptapifyImage', listener)
    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0].detail.image).toMatchObject({ src: 'https://example.com/a.png', alt: 'Kyiv' })
  })

  it('moves the cursor to the text after the image on Enter', () => {
    createEditor('<img src="https://example.com/a.png"><p>after</p>')

    caption().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    const { $from } = editor!.state.selection
    expect($from.parent.textContent).toBe('after')
  })

  it('floats the image with the align attribute', () => {
    createEditor('<img src="https://example.com/a.png" style="float: right">')
    const nodeView = editor!.view.nodeDOM(0) as HTMLElement

    expect(nodeView.dataset.align).toBe('right')
    expect(editor!.getHTML()).toBe('<figure><img src="https://example.com/a.png" style="float: right;"></figure>')

    editor!.chain().setNodeSelection(0).updateAttributes('image', { align: null }).run()

    expect(nodeView.dataset.align).toBeUndefined()
    expect(editor!.getHTML()).toBe('<figure><img src="https://example.com/a.png"></figure>')
  })
})
