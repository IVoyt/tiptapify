import { default as AlignmentLeftButton } from "@tiptapify/extensions/components/alignment/left/Button.vue";
import { default as AlignmentCenterButton } from "@tiptapify/extensions/components/alignment/center/Button.vue";
import { default as AlignmentRightButton } from "@tiptapify/extensions/components/alignment/right/Button.vue";
import { default as AlignmentJustifyButton } from "@tiptapify/extensions/components/alignment/justify/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'alignment',
  group: true,
  components: [
    {
      name: 'left',
      component: markRaw(AlignmentLeftButton),
    },
    {
      name: 'center',
      component: markRaw(AlignmentCenterButton),
    },
    {
      name: 'right',
      component: markRaw(AlignmentRightButton),
    },
    {
      name: 'justify',
      component: markRaw(AlignmentJustifyButton),
    },
  ]
}