import { Extension } from '@tiptap/core'
import { selectedImageAttrs } from '@tiptapify/extensions/components/media/image/imageDialog'

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
            image: selectedImageAttrs(editor.state),
            editorId: editor.instanceId
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})