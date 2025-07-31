import { useAlignmentCenter } from "@tiptapify/composables/Toolbar/Alignment/useAlignmentCenter";
import { useAlignmentJustify } from "@tiptapify/composables/Toolbar/Alignment/useAlignmentJustify";
import { useAlignmentLeft } from "@tiptapify/composables/Toolbar/Alignment/useAlignmentLeft";
import { useAlignmentRight } from "@tiptapify/composables/Toolbar/Alignment/useAlignmentRight";

export function useAlignmentItems() {
  return {
    alignmentLeft: useAlignmentLeft(),
    alignmentCenter: useAlignmentCenter(),
    alignmentRight: useAlignmentRight(),
    alignmentJustify: useAlignmentJustify()
  }
}