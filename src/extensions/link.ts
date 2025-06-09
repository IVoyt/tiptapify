import Link from "@tiptap/extension-link";

const name: string = 'link'

export const TiptapifyLink = Link.extend({
  name,

  addCommands() {
    return {
      ...this.parent?.(),
      showLink: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
          detail: {
            link: editor.getAttributes('link')
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})