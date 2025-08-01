import * as mdi from "@mdi/js";
import Emoji from "@tiptapify/extensions/components/Emoji.vue";
import { computed, markRaw } from "vue";
import { useI18n } from "vue-i18n";

export function useEmoji() {
  const { t } = useI18n();

  return {
    name: computed(() => t('media.emoji')),
    tooltip: computed(() => t('media.emoji')),
    icon: `mdiSvg:${mdi.mdiEmoticon}`,
    enabled: true,
    component: markRaw(Emoji),
    props: {
      persistent: false,
      closeOnContentClick: false,
    }
  }
}