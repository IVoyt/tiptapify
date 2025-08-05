import { default as BoldButton } from "@tiptapify/extensions/components/format/bold/Button.vue";
import { default as ItalicButton } from "@tiptapify/extensions/components/format/italic/Button.vue";
import { default as UnderlineButton } from "@tiptapify/extensions/components/format/underline/Button.vue";
import { default as StrikeButton } from "@tiptapify/extensions/components/format/strike/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'format',
  group: true,
  components: [
    {
      name: 'bold',
      component: markRaw(BoldButton),
    },
    {
      name: 'italic',
      component: markRaw(ItalicButton),
    },
    {
      name: 'underline',
      component: markRaw(UnderlineButton),
    },
    {
      name: 'strike',
      component: markRaw(StrikeButton),
    },
  ]
}