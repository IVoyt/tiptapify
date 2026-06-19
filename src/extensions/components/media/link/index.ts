import { CommandProps } from '@tiptap/core'
import Link from '@tiptap/extension-link'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tiptapify_link: {
      showLink: () => ReturnType
    }
  }
}

export const TiptapifyLink = Link.extend({
  name: 'tiptapify_link',

  addCommands() {
    return {
      ...this.parent?.(),
      showLink: () => ({ editor }: CommandProps) => {
        const event = new CustomEvent('tiptapify-show-link', {
          detail: {
            link: editor.getAttributes('link'),
            editorId: editor.instanceId
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})