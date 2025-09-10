import { BulletList } from "@tiptap/extension-list"

export const BulletListCircle = BulletList.extend({
  name: 'bulletListCircle',

  addAttributes() {
    return {
      class: {
        default: null,
        renderHTML: (attributes: any) => {
          return {
            class: `${attributes.class}`,
          }
        },
        parseHTML: (element: any) => element.getAttribute('class'),
      }
    }
  },

  addOptions() {
    return {
      itemTypeName: 'listItem',
      HTMLAttributes: {
        class: 'list-style-circle',
      },
      keepMarks: false,
      keepAttributes: false,
    }
  },

  parseHTML() {
    return [
      { tag: 'ul', class: 'list-style-circle' }
    ]
  },

  addCommands() {
    return {
      toggleBulletListCircle: () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain()
              .toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
              .updateAttributes('listItem', this.editor.getAttributes('textStyle'))
              .run()
          }
          return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
        },
    }
  }
})

export const BulletListSquare = BulletList.extend({
  name: 'bulletListSquare',

  addAttributes() {
    return {
      class: {
        default: null,
        renderHTML: (attributes: any) => {
          return {
            class: `${attributes.class}`,
          }
        },
        parseHTML: (element: any) => element.getAttribute('class'),
      }
    }
  },

  addOptions() {
    return {
      itemTypeName: 'listItem',
      HTMLAttributes: {
        class: 'list-style-square',
      },
      keepMarks: false,
      keepAttributes: false,
    }
  },

  parseHTML() {
    return [
      { tag: 'ul', class: 'list-style-square' }
    ]
  },

  addCommands() {
    return {
      toggleBulletListSquare: () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain()
              .toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
              .updateAttributes('listItem', this.editor.getAttributes('textStyle'))
              .run()
          }
          return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
        },
    }
  }
})