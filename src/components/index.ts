import { Editor, useEditor } from "@tiptap/vue-3";
import { editorExtensions } from "@tiptapify/components/editorExtensions";
import { extensionComponents } from "@tiptapify/types/extensionComponents";
import { ShallowRef } from "vue";

export function getTiptapEditor (
  content: any,
  placeholder: string,
  slashCommands: boolean = true,
  customExtensions: extensionComponents
): ShallowRef<Editor | undefined> {
  const extensions = editorExtensions(placeholder, slashCommands, customExtensions)
  const editor: ShallowRef<Editor | undefined> = useEditor({
    content,
    extensions,
  })

  return editor
}