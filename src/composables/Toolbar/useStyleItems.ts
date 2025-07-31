import { useColor } from "@tiptapify/composables/Toolbar/Style/useColor";
import { useFontFamily } from "@tiptapify/composables/Toolbar/Style/useFontFamily";
import { useFontSize } from "@tiptapify/composables/Toolbar/Style/useFontSize";
import { useHeading } from "@tiptapify/composables/Toolbar/Style/useHeading";
import { useHighlight } from "@tiptapify/composables/Toolbar/Style/useHighlight";
import { useLineHeight } from "@tiptapify/composables/Toolbar/Style/useLineHeight";

export function useStyleItems(theme: any, fontMeasure: string, customHeadingLevels: Array<number> = []) {
  return {
    heading: useHeading(customHeadingLevels),
    fontFamily: useFontFamily(),
    fontSize: useFontSize(fontMeasure),
    lineHeight: useLineHeight(),
    highlight: useHighlight(theme),
    color: useColor(theme)
  }
}