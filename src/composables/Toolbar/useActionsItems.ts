import { useRedo } from "@tiptapify/composables/Toolbar/Actions/useRedo";
import { useUndo } from "@tiptapify/composables/Toolbar/Actions/useUndo";

export function useActionsItems() {
  return {
    undo: useUndo(),
    redo: useRedo()
  }
}