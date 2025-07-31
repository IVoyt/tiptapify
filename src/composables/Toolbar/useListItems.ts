import { useBullet } from "@tiptapify/composables/Toolbar/List/useBullet";
import { useIndent } from "@tiptapify/composables/Toolbar/List/useIndent";
import { useNumbered } from "@tiptapify/composables/Toolbar/List/useNumbered";
import { useOutdent } from "@tiptapify/composables/Toolbar/List/useOutdent";
import { useTask } from "@tiptapify/composables/Toolbar/List/useTask";

export function useListItems() {
  return {
    listBullet: useBullet(),
    listNumbered: useNumbered(),
    listTask: useTask(),
    listIndent: useIndent(),
    listOutdent: useOutdent()
  }
}