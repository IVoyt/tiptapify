import { Extension } from '@tiptap/core'

const name: string = 'tiptapifyImage'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tiptapifyImage: {
      showTiptapifyImage: () => ReturnType
    }
  }
}

export const TiptapifyImage = Extension.create({
  name,

  addCommands() {
    return {
      showTiptapifyImage: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
          detail: {
            image: editor.getAttributes('image')
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})