import { useBlockquote } from "@tiptapify/composables/Toolbar/FormatExtra/useBlockquote";
import { useCode } from "@tiptapify/composables/Toolbar/FormatExtra/useCode";
import { useCodeBlock } from "@tiptapify/composables/Toolbar/FormatExtra/useCodeBlock";
import { useSub } from "@tiptapify/composables/Toolbar/FormatExtra/useSub";
import { useSup } from "@tiptapify/composables/Toolbar/FormatExtra/useSup";

export function useFormatExtraItems() {
  return {
    sup: useSup(),
    sub: useSub(),
    code: useCode(),
    codeBlock: useCodeBlock(),
    blockquote: useBlockquote()
  }
}