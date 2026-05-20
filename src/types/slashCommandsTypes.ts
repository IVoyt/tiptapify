import { Editor } from '@tiptap/core'

export type SlashCommandCallback = (params: { editor: Editor, range: any }) => void

export type SlashCommand = {
  title: string
  icon: string
  command?: SlashCommandCallback
  isPicker?: boolean
}

export type SlashCommandId = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'bulletList' | 'numberedList' | 'taskList'
  | 'code' | 'codeBlock' | 'quote'
  | 'image' | 'video' | 'table' | 'link'
  | 'divider' | 'emoji' | 'specialChars'

export type SlashCommandsConfig = SlashCommandId[] | true | false
