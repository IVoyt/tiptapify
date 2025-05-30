import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { BulletList, OrderedList, ListItem, ListKeymap, TaskList, TaskItem } from '@tiptap/extension-list'
import { Selection, Focus, Placeholder, UndoRedo, Dropcursor, CharacterCount } from '@tiptap/extensions'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Heading } from '@tiptap/extension-heading'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import { Code } from '@tiptap/extension-code'
import { Blockquote } from '@tiptap/extension-blockquote'
import { HardBreak } from '@tiptap/extension-hard-break'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Typography } from '@tiptap/extension-typography'
import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { TableKit } from '@tiptap/extension-table'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'

import { Link } from '@tiptap/extension-link'
import CodeBlockComponent from '@tiptapify/components/CodeBlockComponent.vue'
import { ViewSource } from '@tiptapify/components/extensions/view-source'
import SlashCommands from '@tiptapify/components/extensions/slash-commands'
import suggestion from '@tiptapify/components/extensions/components/slashCommands/suggestion'

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from 'lowlight'

// create a lowlight instance
// using all available languages
const lowlight = createLowlight(common)

// or register specific languages
// const lowlight = createLowlight()
//
// import language example
// import ts from 'highlight.js/lib/languages/typescript'
//
// register language example
// lowlight.register('ts', ts)

export function editorExtensions (placeholder: string, slashCommands: boolean) {
  const extensions = [
    TextStyleKit,
    Document,
    Text,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Strike,
    Blockquote,
    OrderedList,
    BulletList,
    TaskList,
    TaskItem,
    ListItem,
    ListKeymap,
    HardBreak,
    HorizontalRule,
    Dropcursor,
    Typography,
    Underline,
    Highlight,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    Image,
    Superscript,
    Subscript,
    TableKit,
    Code,
    UndoRedo,
    Focus,
    CodeBlockLowlight
      .extend({
        addNodeView() {
          return VueNodeViewRenderer(CodeBlockComponent)
        },
      })
      .configure({ lowlight }),
    Selection.configure({
      className: 'selection',
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({ placeholder }),
    CharacterCount,
    ViewSource
  ]

  if (slashCommands) {
    extensions.push(SlashCommands.configure({ suggestion }))
  }

  return extensions
}