import * as mdi from "@mdi/js";
import Emoji from "@tiptapify/extensions/components/Emoji.vue";
import { computed, inject, markRaw } from "vue";

export function useEmoji() {
  const { t } = inject('tiptapifyI18n') as any

  return {
    name: computed(() => t('media.emoji.title')),
    tooltip: computed(() => t('media.emoji.title')),
    icon: `mdiSvg:${mdi.mdiEmoticon}`,
    enabled: true,
    component: markRaw(Emoji),
    props: {
      persistent: false,
      closeOnContentClick: false,
    }
  }
}