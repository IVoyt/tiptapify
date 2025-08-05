import Link from "@tiptap/extension-link";

const name: string = 'link'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      showLink: () => ReturnType
    }
  }
}

export const TiptapifyLink = Link.extend({
  name,

  addCommands() {
    return {
      ...this.parent?.(),
      showLink: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
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