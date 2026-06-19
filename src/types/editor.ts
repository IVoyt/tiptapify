import { Editor } from '@tiptap/vue-3'

declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}

export { TiptapifyEditor }

export type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
export type variantFieldTypes = 'outlined' | 'plain' | 'filled' | 'solo' | 'solo-filled' | 'solo-inverted' | 'underlined' | undefined