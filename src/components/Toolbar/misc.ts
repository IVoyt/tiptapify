import { default as LineButton } from "@tiptapify/extensions/components/misc/line/Button.vue";
import { default as BreakButton } from "@tiptapify/extensions/components/misc/break/Button.vue";
import { default as PreviewButton } from "@tiptapify/extensions/components/misc/preview/Button.vue";
import { default as SourceButton } from "@tiptapify/extensions/components/misc/source/Button.vue";
import { default as InvisibleCharButton } from "@tiptapify/extensions/components/misc/invisibleChar/Button.vue";
import { default as FormatClearButton } from "@tiptapify/extensions/components/misc/formatClear/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'misc',
  group: true,
  components: [
    {
      name: 'line',
      component: markRaw(LineButton),
    },
    {
      name: 'pagebreak',
      component: markRaw(BreakButton),
    },
    {
      name: 'source',
      component: markRaw(SourceButton),
    },
    {
      name: 'preview',
      component: markRaw(PreviewButton),
    },
    {
      name: 'formatClear',
      component: markRaw(FormatClearButton),
    },
    {
      name: 'invisibleChar',
      component: markRaw(InvisibleCharButton),
    },
  ]
}