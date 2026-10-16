import { Extension } from '@tiptap/core'

export type ListType = 'bulletList' | 'orderedList'

export interface ListStylePreset {
  // CSS `list-style-type`; null is the browser default (disc / decimal)
  value: string | null
  markers: [string, string, string]
}

export const bulletListStyles: ListStylePreset[] = [
  { value: null, markers: ['●', '●', '●'] },
  { value: 'circle', markers: ['○', '○', '○'] },
  { value: 'square', markers: ['■', '■', '■'] },
]

export const orderedListStyles: ListStylePreset[] = [
  { value: null, markers: ['1.', '2.', '3.'] },
  { value: 'lower-alpha', markers: ['a.', 'b.', 'c.'] },
  { value: 'lower-greek', markers: ['α.', 'β.', 'γ.'] },
  { value: 'lower-roman', markers: ['i.', 'ii.', 'iii.'] },
  { value: 'upper-alpha', markers: ['A.', 'B.', 'C.'] },
  { value: 'upper-roman', markers: ['I.', 'II.', 'III.'] },
]

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    listStyle: {
      // Turns the selection into a list of this type, if it is not one yet, with this marker style
      setListStyle: (listType: ListType, listStyleType: string | null) => ReturnType
    }
  }
}

/**
 * The marker style of bullet and numbered lists, saved as inline `list-style-type` the way TinyMCE
 * did, so lists styled there keep their style and every site renders it without extra CSS.
 */
export const ListStyle = Extension.create({
  name: 'listStyle',

  addGlobalAttributes() {
    return [
      {
        types: ['bulletList', 'orderedList'],
        attributes: {
          listStyleType: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.listStyleType || null,
            renderHTML: (attributes: Record<string, unknown>) => (
              attributes.listStyleType ? { style: `list-style-type: ${attributes.listStyleType}` } : {}
            ),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setListStyle: (listType: ListType, listStyleType: string | null) => ({ editor, chain }) => {
        const command = chain().focus()

        if (!editor.isActive(listType)) {
          if (listType === 'bulletList') {
            command.toggleBulletList()
          } else {
            command.toggleOrderedList()
          }
        }

        return command.updateAttributes(listType, { listStyleType }).run()
      },
    }
  },
})
