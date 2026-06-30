import { Editor, useEditor } from '@tiptap/vue-3'
import { editorExtensions } from '@tiptapify/components/editorExtensions'
import { toolbarSections } from '@tiptapify/types/toolbarTypes'
import { SlashCommandsConfig } from '@tiptapify/types/slashCommandsTypes'
import { ShallowRef } from 'vue'

export function getTiptapEditor (
  content: string|object,
  placeholder: string,
  slashCommands: SlashCommandsConfig = true,
  customExtensions: toolbarSections,
  limit: number | null = null,
  onUpdate: Function = () => {},
  onCreate?: (editor: Editor) => void,
): ShallowRef<Editor | undefined> {
  const extensions = editorExtensions(placeholder, slashCommands, customExtensions, limit)

  return useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => onUpdate(),
    onCreate: onCreate ? ({ editor }) => onCreate(editor as Editor) : undefined,
  })
}
