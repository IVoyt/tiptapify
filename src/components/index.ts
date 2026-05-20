import { Editor, useEditor } from "@tiptap/vue-3";
import { editorExtensions } from "@tiptapify/components/editorExtensions";
import { toolbarSections } from "@tiptapify/types/toolbarTypes";
import { SlashCommandsConfig } from "@tiptapify/types/slashCommandsTypes";
import { ShallowRef } from "vue";

export function getTiptapEditor (
  content: any,
  placeholder: string,
  slashCommands: SlashCommandsConfig = true,
  customExtensions: toolbarSections,
  onUpdate: Function = () => {}
): ShallowRef<Editor | undefined> {
  const extensions = editorExtensions(placeholder, slashCommands, customExtensions)

  return useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => onUpdate()
  })
}