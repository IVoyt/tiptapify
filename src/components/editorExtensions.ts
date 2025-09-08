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
import { Youtube } from '@tiptap/extension-youtube'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { TableKit } from '@tiptap/extension-table'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { InvisibleCharacters } from '@tiptap/extension-invisible-characters'

import { TiptapifyLink } from '@tiptapify/extensions/components/media/link'
import { TiptapifyImage } from '@tiptapify/extensions/components/media/image'
import { TiptapifyVideo } from '@tiptapify/extensions/components/media/video'
import CodeBlockComponent from '@tiptapify/extensions/components/CodeBlockComponent.vue'
import { ViewSource } from '@tiptapify/extensions/components/misc/source'
import { Preview } from '@tiptapify/extensions/components/misc/preview'
import SlashCommands from '@tiptapify/extensions/slash-commands'
import suggestion from '@tiptapify/extensions/components/slashCommands/suggestion'
import { toolbarSections } from "@tiptapify/types/toolbarTypes";

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

export function editorExtensions (placeholder: string, slashCommands: boolean, customExtensions: toolbarSections) {
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
    Highlight.configure({ multicolor: true }),
    TiptapifyLink.configure({
      openOnClick: false,
      defaultProtocol: 'https'
    }),
    Image,
    Youtube.configure({
      controls: true,
      nocookie: true,
    }),
    TiptapifyImage,
    TiptapifyVideo,
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
    Selection.configure({ className: 'selection' }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder }),
    CharacterCount,
    ViewSource,
    InvisibleCharacters.configure({
      visible: false,
    }),
    Preview
  ]

  if (slashCommands) {
    extensions.push(SlashCommands.configure({ suggestion }))
  }

  if (customExtensions.length) {
    for (const customExtension of customExtensions) {
      if (typeof customExtension.extensions === 'undefined') {
        continue
      }
      for (const extension of customExtension.extensions) {
        extensions.push(extension)
      }
    }
  }

  return extensions
}