import { useImage } from "@tiptapify/composables/Toolbar/Media/useImage";
import { useLink } from "@tiptapify/composables/Toolbar/Media/useLink";
import { useVideo } from "@tiptapify/composables/Toolbar/Media/useVideo";
import { usePreview } from "@tiptapify/composables/Toolbar/Misc/usePreview";
import { useSource } from "@tiptapify/composables/Toolbar/Misc/useSource";
import ImageDialog from "@tiptapify/extensions/components/ImageDialog.vue";
import LinkDialog from "@tiptapify/extensions/components/LinkDialog.vue";
import PreviewDialog from "@tiptapify/extensions/components/PreviewDialog.vue";
import ShowSourceDialog from "@tiptapify/extensions/components/ShowSourceDialog.vue";
import VideoDialog from "@tiptapify/extensions/components/VideoDialog.vue";
import { extensionComponents } from "@tiptapify/types/extensionComponents";
import { ToolbarSections } from "@tiptapify/types/toolbarSections";
import { computed, markRaw } from "vue";

export function getDefaultComponents(variantField: string): extensionComponents {
  return {
    image: {
      component: markRaw(ImageDialog),
      componentProps: {
        variantField: computed(() => variantField).value,
      },
      section: ToolbarSections.media,
      name: useImage().name,
      tooltip: useImage().tooltip,
      icon: useImage().icon,
    },
    link: {
      component: markRaw(LinkDialog),
      componentProps: {
        variantField: computed(() => variantField).value,
      },
      section: ToolbarSections.media,
      name: useLink().name,
      tooltip: useLink().tooltip,
      icon: useLink().icon,
    },
    preview: {
      component: markRaw(PreviewDialog),
      section: ToolbarSections.misc,
      name: usePreview().name,
      tooltip: usePreview().tooltip,
      icon: usePreview().icon,
    },
    showSource: {
      component: markRaw(ShowSourceDialog),
      componentProps: {
        variantField: computed(() => variantField).value,
      },
      section: ToolbarSections.misc,
      name: useSource().name,
      tooltip: useSource().tooltip,
      icon: useSource().icon,
    },
    video: {
      component: markRaw(VideoDialog),
      componentProps: {
        variantField: computed(() => variantField).value,
      },
      section: ToolbarSections.media,
      name: useVideo().name,
      tooltip: useVideo().tooltip,
      icon: useVideo().icon,
    },
  }
}