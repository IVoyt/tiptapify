import { SlashCommand, SlashCommandId } from '@tiptapify/types/slashCommandsTypes'

export const slashCommandMap: Record<SlashCommandId, SlashCommand> = {
  h1: {
    title: 'H1',
    icon: 'FormatHeader1',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  h2: {
    title: 'H2',
    icon: 'FormatHeader2',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  h3: {
    title: 'H3',
    icon: 'FormatHeader3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    },
  },
  h4: {
    title: 'H4',
    icon: 'FormatHeader4',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
    },
  },
  h5: {
    title: 'H5',
    icon: 'FormatHeader5',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
    },
  },
  h6: {
    title: 'H6',
    icon: 'FormatHeader6',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 6 }).run()
    },
  },
  bulletList: {
    title: 'Bullet List',
    icon: 'FormatListBulleted',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  numberedList: {
    title: 'Numbered List',
    icon: 'FormatListNumbered',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  taskList: {
    title: 'Task List',
    icon: 'FormatListCheckbox',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run()
    },
  },
  code: {
    title: 'Code',
    icon: 'CodeTags',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCode().run()
    },
  },
  codeBlock: {
    title: 'Code Block',
    icon: 'CodeBracesBox',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
  quote: {
    title: 'Quote',
    icon: 'FormatQuoteClose',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  image: {
    title: 'Image',
    icon: 'Image',
    command: ({ editor, range }) => {
      const url = window.prompt('Enter image URL:')
      if (url) {
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
      }
    },
  },
  video: {
    title: 'Video',
    icon: 'Video',
    command: ({ editor, range }) => {
      const url = window.prompt('Enter YouTube video URL:')
      if (url) {
        editor.chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).run()
      }
    },
  },
  table: {
    title: 'Table',
    icon: 'Table',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    },
  },
  link: {
    title: 'Link',
    icon: 'Link',
    command: ({ editor, range }) => {
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('Enter link URL:', previousUrl)
      if (url === null) return
      if (url === '') {
        editor.chain().focus().deleteRange(range).extendMarkRange('link').unsetLink().run()
        return
      }
      editor.chain().focus().deleteRange(range).extendMarkRange('link').setLink({ href: url }).run()
    },
  },
  divider: {
    title: 'Divider',
    icon: 'Minus',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
  emoji: {
    title: 'Emoji',
    icon: 'Emoticon',
    isPicker: true,
  },
  specialChars: {
    title: 'Special Characters',
    icon: 'FormatText',
    isPicker: true,
  },
}

export const defaultSlashCommandIds: SlashCommandId[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'bulletList', 'numberedList', 'taskList',
  'code', 'codeBlock', 'quote',
  'image', 'video', 'table', 'link',
  'divider', 'emoji', 'specialChars'
]
