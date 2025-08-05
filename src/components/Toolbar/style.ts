import { default as HeadingButton } from "@tiptapify/extensions/components/style/heading/Button.vue";
import { default as FontFamilyButton } from "@tiptapify/extensions/components/style/fontFamily/Button.vue";
import { default as FontSizeButton } from "@tiptapify/extensions/components/style/fontSize/Button.vue";
import { default as LineHeightButton } from "@tiptapify/extensions/components/style/lineHeight/Button.vue";
import { default as ColorButton } from "@tiptapify/extensions/components/style/color/Button.vue";
import { default as HighlightButton } from "@tiptapify/extensions/components/style/highlight/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'actions',
  group: true,
  components: [
    {
      name: 'heading',
      component: markRaw(HeadingButton),
    },
    {
      name: 'fontFamily',
      component: markRaw(FontFamilyButton),
    },
    {
      name: 'fontSize',
      component: markRaw(FontSizeButton),
    },
    {
      name: 'lineHeight',
      component: markRaw(LineHeightButton),
    },
    {
      name: 'textColor',
      component: markRaw(ColorButton),
    },
    {
      name: 'highlightColor',
      component: markRaw(HighlightButton),
    },
  ]
}