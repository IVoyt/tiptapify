import { afterEach, describe, expect, it } from 'vitest'
import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TiptapifyImage } from '@tiptapify/extensions/components/media/image'
import { ImageWithCaption } from '@tiptapify/extensions/components/media/image/caption'
import {
  applyImage,
  ImageDialogAttrs,
  initialSizeMode,
  removeImage,
  resizeSide,
  selectedImageAttrs,
  sizeForMode,
  textColumnWidth,
  toSize,
} from '@tiptapify/extensions/components/media/image/imageDialog'

let editor: Editor | null = null

// A host attribute the dialog does not know, as hosts add with global attributes
const MediaId = Extension.create({
  name: 'mediaId',
  addGlobalAttributes() {
    return [{
      types: ['image'],
      attributes: {
        mediaId: {
          default: null,
          parseHTML: (element: HTMLElement) => element.getAttribute('data-media-id'),
          renderHTML: (attrs: Record<string, unknown>) => (attrs.mediaId ? { 'data-media-id': attrs.mediaId } : {}),
        },
      },
    }]
  },
})

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, TiptapifyImage, ImageWithCaption, MediaId],
  })

  return editor
}

function dialogAttrs(overrides: Partial<ImageDialogAttrs> = {}): ImageDialogAttrs {
  return { src: 'https://example.com/b.png', alt: 'Kyiv', title: null, width: null, height: null, align: null, ...overrides }
}

function images() {
  return editor!.getJSON().content!.filter(node => node.type === 'image')
}

describe('image dialog apply', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('updates the selected image in place, keeping the attributes the dialog does not change', () => {
    createEditor('<p>Before</p><img src="https://example.com/a.png" style="float: right" data-media-id="7">')
    editor!.commands.setNodeSelection(8)

    const applied = applyImage(editor!, dialogAttrs({ align: 'right', title: ' Kyiv at night ', width: 640, height: 480 }))

    expect(applied).toBe(true)
    expect(images()).toHaveLength(1)
    expect(images()[0].attrs).toMatchObject({
      src: 'https://example.com/b.png',
      alt: 'Kyiv',
      title: 'Kyiv at night',
      width: 640,
      height: 480,
      align: 'right',
      mediaId: '7',
    })
    expect(editor!.state.selection.from).toBe(8)
  })

  it('keeps the image align when the dialog sends it back unchanged', () => {
    createEditor('<img src="https://example.com/a.png" style="float: left">')
    editor!.commands.setNodeSelection(0)
    const current = selectedImageAttrs(editor!.state)!

    applyImage(editor!, dialogAttrs({ src: current.src as string, align: current.align as 'left' }))

    expect(images()[0].attrs!.align).toBe('left')
    expect(editor!.getHTML()).toContain('float: left')
  })

  it('stores the size as numbers', () => {
    createEditor('<img src="https://example.com/a.png">')
    editor!.commands.setNodeSelection(0)

    applyImage(editor!, dialogAttrs({ width: '640' as unknown as number, height: 359.6 }))

    expect(images()[0].attrs).toMatchObject({ width: 640, height: 360 })
  })

  it('inserts a new image when no image is selected', () => {
    createEditor('<p>Text</p>')
    editor!.commands.setTextSelection(5)

    const applied = applyImage(editor!, dialogAttrs({ alt: '  ', align: 'left', width: 320, height: 240 }))

    expect(applied).toBe(true)
    expect(images()).toHaveLength(1)
    expect(images()[0].attrs).toMatchObject({ src: 'https://example.com/b.png', alt: null, align: 'left', width: 320, height: 240 })
  })

  it('does nothing without a source', () => {
    createEditor('<p>Text</p>')

    expect(applyImage(editor!, dialogAttrs({ src: '  ' }))).toBe(false)
    expect(images()).toHaveLength(0)
  })

  it('removes the selected image only', () => {
    createEditor('<p>Text</p><img src="https://example.com/a.png">')

    editor!.commands.setTextSelection(2)
    expect(removeImage(editor!)).toBe(false)

    editor!.commands.setNodeSelection(6)
    expect(removeImage(editor!)).toBe(true)
    expect(images()).toHaveLength(0)
  })

  it('reads the attributes of the selected image only', () => {
    createEditor('<p>Text</p><img src="https://example.com/a.png" width="640">')

    editor!.commands.setTextSelection({ from: 1, to: editor!.state.doc.content.size })
    expect(selectedImageAttrs(editor!.state)).toBeNull()

    editor!.commands.setNodeSelection(6)
    expect(selectedImageAttrs(editor!.state)).toMatchObject({ src: 'https://example.com/a.png', width: 640 })
  })

  it('reads a node selection made by another copy of prosemirror-state', () => {
    createEditor('<p>Text</p><img src="https://example.com/a.png" width="640">')
    const { from, to } = editor!.state.selection
    const node = editor!.state.doc.nodeAt(6)
    const foreignSelection = { from, to, node }
    const state = { ...editor!.state, selection: foreignSelection } as unknown as Parameters<typeof selectedImageAttrs>[0]

    expect(selectedImageAttrs(state)).toMatchObject({ src: 'https://example.com/a.png', width: 640 })
  })

  it('sends the selected image to the dialog, or none to insert one', () => {
    createEditor('<p>Text</p><img src="https://example.com/a.png">')
    const details: Array<{ image: Record<string, unknown> | null }> = []
    const listener = (event: Event) => details.push((event as CustomEvent).detail)
    window.addEventListener('tiptapify-show-tiptapifyImage', listener)

    editor!.commands.setTextSelection(2)
    editor!.commands.showTiptapifyImage()
    editor!.commands.setNodeSelection(6)
    editor!.commands.showTiptapifyImage()
    window.removeEventListener('tiptapify-show-tiptapifyImage', listener)

    expect(details[0].image).toBeNull()
    expect(details[1].image).toMatchObject({ src: 'https://example.com/a.png' })
  })
})

describe('image dialog size', () => {
  it('reads sizes as positive whole numbers', () => {
    expect(toSize('640')).toBe(640)
    expect(toSize(359.6)).toBe(360)
    expect(toSize('')).toBeNull()
    expect(toSize(0)).toBeNull()
    expect(toSize(null)).toBeNull()
  })

  it('opens an image with a width as custom and one without as original', () => {
    expect(initialSizeMode({ width: 640, height: 480 })).toBe('custom')
    expect(initialSizeMode({ width: null })).toBe('original')
    expect(initialSizeMode(null)).toBe('original')
  })

  it('sizes the image to its natural size or to the text width in its ratio', () => {
    const natural = { width: 1600, height: 900 }

    expect(sizeForMode('original', natural, 720)).toEqual({ width: 1600, height: 900 })
    expect(sizeForMode('original', null, 720)).toEqual({ width: null, height: null })
    expect(sizeForMode('text', natural, 720)).toEqual({ width: 720, height: 405 })
    expect(sizeForMode('text', null, 720)).toEqual({ width: 720, height: null })
  })

  it('keeps the ratio when one side changes', () => {
    const size = { width: 1600, height: 900 }

    expect(resizeSide(size, 'width', '800', 16 / 9)).toEqual({ width: 800, height: 450 })
    expect(resizeSide(size, 'height', 450, 16 / 9)).toEqual({ width: 800, height: 450 })
    expect(resizeSide(size, 'width', 800, null)).toEqual({ width: 800, height: 900 })
    expect(resizeSide(size, 'width', '', 16 / 9)).toEqual({ width: null, height: 900 })
  })

  it('measures the text column without the editor padding', () => {
    const element = document.createElement('div')
    element.style.padding = '0 24px'
    Object.defineProperty(element, 'clientWidth', { value: 768 })

    expect(textColumnWidth(element)).toBe(720)
  })
})
