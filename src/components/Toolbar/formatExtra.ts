import { default as SupButton } from "@tiptapify/extensions/components/formatExtra/sup/Button.vue";
import { default as SubButton } from "@tiptapify/extensions/components/formatExtra/sub/Button.vue";
import { default as CodeButton } from "@tiptapify/extensions/components/formatExtra/code/Button.vue";
import { default as CodeBlockButton } from "@tiptapify/extensions/components/formatExtra/codeBlock/Button.vue";
import { default as BlockquoteButton } from "@tiptapify/extensions/components/formatExtra/quote/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'formatExtra',
  group: true,
  components: [
    {
      name: 'sup',
      component: markRaw(SupButton),
    },
    {
      name: 'sub',
      component: markRaw(SubButton),
    },
    {
      name: 'code',
      component: markRaw(CodeButton),
    },
    {
      name: 'codeBlock',
      component: markRaw(CodeBlockButton),
    },
    {
      name: 'blockquote',
      component: markRaw(BlockquoteButton),
    },
  ]
}