import { Extension } from '@tiptap/core'

const name: string = 'tiptapifyVideo'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tiptapifyVideo: {
      showTiptapifyVideo: () => ReturnType
    }
  }
}

export const TiptapifyVideo = Extension.create({
  name,

  addCommands() {
    return {
      showTiptapifyVideo: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
          detail: {
            video: editor.getAttributes('video'),
            editorId: editor.instanceId
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})