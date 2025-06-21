import ImageDialog from "@tiptapify/extensions/components/ImageDialog.vue";
import LinkDialog from "@tiptapify/extensions/components/LinkDialog.vue";
import PreviewDialog from "@tiptapify/extensions/components/PreviewDialog.vue";
import ShowSourceDialog from "@tiptapify/extensions/components/ShowSourceDialog.vue";
import { extensionsComponents } from "@tiptapify/types/overridable-extensions";
import { computed } from "vue";

export function getDefaultComponents(variantField: string): extensionsComponents {
  return {
    image: {
      component: ImageDialog,
      props: {
        variantField: computed(() => variantField).value,
      }
    },
    link: {
      component: LinkDialog,
      props: {
        variantField: computed(() => variantField).value,
      }
    },
    preview: {
      component: PreviewDialog,
    },
    showSource: {
      component: ShowSourceDialog,
      props: {
        variantField: computed(() => variantField).value,
      }
    }
  }
}