import { Editor, useEditor } from "@tiptap/vue-3";
import { editorExtensions } from "@tiptapify/components/editorExtensions";
import { toolbarSections } from "@tiptapify/types/toolbarSections";
import { ShallowRef } from "vue";

export function getTiptapEditor (
  content: any,
  placeholder: string,
  slashCommands: boolean = true,
  customExtensions: toolbarSections
): ShallowRef<Editor | undefined> {
  const extensions = editorExtensions(placeholder, slashCommands, customExtensions)
  const editor: ShallowRef<Editor | undefined> = useEditor({
    content,
    extensions,
  })

  return editor
}