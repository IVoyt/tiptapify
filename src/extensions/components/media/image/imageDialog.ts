import { Editor } from '@tiptap/core'
import { MediaSize, resizeSide, toSize } from '@tiptapify/utils/mediaSize'
import { EditorState, NodeSelection } from '@tiptap/pm/state'
import { ImageAlign } from '@tiptapify/extensions/components/media/image/caption'

export { resizeSide, toSize }

export type ImageSizeMode = 'original' | 'text' | 'custom'

export type ImageSize = MediaSize

export type NaturalSize = { width: number, height: number }

// The attributes the image dialog edits; any other attribute of the image is kept as it is
export type ImageDialogAttrs = {
  src: string,
  alt: string | null,
  title: string | null,
  width: number | null,
  height: number | null,
  align: ImageAlign | null,
}

const typeName = 'image'

/**
 * The attributes of the image selected as a node, or null when no image is selected (the dialog inserts one).
 */
export function selectedImageAttrs(state: EditorState): Record<string, unknown> | null {
  const { selection } = state
  if (!(selection instanceof NodeSelection) || selection.node.type.name !== typeName) {
    return null
  }

  return { ...selection.node.attrs }
}

/**
 * An image with a set width opens with its size as custom; one without a width is shown at its original size.
 */
export function initialSizeMode(attrs: Record<string, unknown> | null): ImageSizeMode {
  return toSize(attrs?.width) ? 'custom' : 'original'
}

/**
 * The width of the editor's text column: the editor content box without its horizontal padding.
 */
export function textColumnWidth(element: HTMLElement): number | null {
  const style = getComputedStyle(element)
  const width = element.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0)

  return toSize(width)
}

/**
 * The image size of a size mode other than custom: the natural size, or the text column width
 * with the height kept in the natural ratio.
 */
export function sizeForMode(mode: Exclude<ImageSizeMode, 'custom'>, natural: NaturalSize | null, textWidth: number | null): ImageSize {
  if (mode === 'original') {
    return natural ? { ...natural } : { width: null, height: null }
  }

  if (!textWidth) {
    return { width: null, height: null }
  }

  return { width: textWidth, height: natural ? toSize(textWidth * natural.height / natural.width) : null }
}

/**
 * Updates the selected image in place, so the attributes the dialog does not know survive; inserts one when none is selected.
 */
export function applyImage(editor: Editor, attrs: ImageDialogAttrs): boolean {
  const values = {
    ...attrs,
    src: attrs.src.trim(),
    alt: attrs.alt?.trim() || null,
    title: attrs.title?.trim() || null,
    width: toSize(attrs.width),
    height: toSize(attrs.height),
  }
  if (!values.src) {
    return false
  }

  if (selectedImageAttrs(editor.state)) {
    return editor.chain().focus().updateAttributes(typeName, values).run()
  }

  return editor.chain().focus().insertContent({ type: typeName, attrs: values }).run()
}

export function removeImage(editor: Editor): boolean {
  if (!selectedImageAttrs(editor.state)) {
    return false
  }

  return editor.chain().focus().deleteSelection().run()
}

/**
 * The natural size of an image, or null when it does not load.
 */
export function loadNaturalSize(src: string): Promise<NaturalSize | null> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image.naturalWidth && image.naturalHeight
      ? { width: image.naturalWidth, height: image.naturalHeight }
      : null)
    image.onerror = () => resolve(null)
    image.src = src
  })
}
