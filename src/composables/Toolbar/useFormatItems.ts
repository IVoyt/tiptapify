import { useBold } from "@tiptapify/composables/Toolbar/Format/useBold";
import { useItalic } from "@tiptapify/composables/Toolbar/Format/useItalic";
import { useStrike } from "@tiptapify/composables/Toolbar/Format/useStrike";
import { useUnderline } from "@tiptapify/composables/Toolbar/Format/useUnderline";

export function useFormatItems() {
  return {
    bold: useBold(),
    italic: useItalic(),
    underline: useUnderline(),
    strike: useStrike()
  }
}