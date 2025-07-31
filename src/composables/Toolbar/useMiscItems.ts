import { useBreak } from "@tiptapify/composables/Toolbar/Misc/useBreak";
import { useFormatClear } from "@tiptapify/composables/Toolbar/Misc/useFormatClear";
import { useInvisibleCharacters } from "@tiptapify/composables/Toolbar/Misc/useInvisibleCharacters";
import { useLine } from "@tiptapify/composables/Toolbar/Misc/useLine";
import { usePreview } from "@tiptapify/composables/Toolbar/Misc/usePreview";
import { useSource } from "@tiptapify/composables/Toolbar/Misc/useSource";

export function useMiscItems() {
  return {
    line: useLine(),
    break: useBreak(),
    source: useSource(),
    preview: usePreview(),
    formatClear: useFormatClear(),
    invisibleCharacters: useInvisibleCharacters(),
  }
}