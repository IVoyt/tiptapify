import { Extension } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export interface ImageSliderOptions {
  // How many images in a row make a slider; below 2 the extension does nothing
  minImages: number
  label: string
}

export type ImageRun = Array<{ from: number, to: number }>

const name = 'tiptapifyImageSlider'

/**
 * Runs of at least `minImages` top-level images with nothing between them.
 */
export function findImageRuns(doc: ProseMirrorNode, typeName: string, minImages: number): ImageRun[] {
  const runs: ImageRun[] = []
  let run: ImageRun = []

  const flush = () => {
    if (run.length >= minImages) {
      runs.push(run)
    }
    run = []
  }

  doc.forEach((node, offset) => {
    if (node.type.name !== typeName) {
      flush()

      return
    }

    run.push({ from: offset, to: offset + node.nodeSize })
  })
  flush()

  return runs
}

/**
 * Images in a row that a site shows as a slider: the editor lays them out as a numbered grid
 * (the `tiptapify-slide` classes) so the author sees the slider while writing.
 */
export const ImageSlider = Extension.create<ImageSliderOptions>({
  name,

  addOptions() {
    return {
      minImages: 0,
      label: 'Slider',
    }
  },

  addProseMirrorPlugins() {
    const { minImages, label } = this.options
    if (minImages < 2) {
      return []
    }

    const decorate = (doc: ProseMirrorNode) => DecorationSet.create(
      doc,
      findImageRuns(doc, 'image', minImages).flatMap(run => run.map(({ from, to }, index) => Decoration.node(from, to, {
        class: index === 0 ? 'tiptapify-slide tiptapify-slide--first' : 'tiptapify-slide',
        'data-slide-label': index === 0 ? `${label} · 1/${run.length}` : String(index + 1),
      }))),
    )

    return [
      new Plugin({
        key: new PluginKey(name),
        state: {
          init: (_, { doc }) => decorate(doc),
          apply: (tr, decorations) => (tr.docChanged ? decorate(tr.doc) : decorations),
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
