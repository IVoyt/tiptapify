import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useBullet() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('lists.bullet')),
    tooltip: computed(() => t('lists.bullet')),
    icon: `mdiSvg:${mdi.mdiFormatListBulleted}`,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('bulletList') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleBulletList().run()
    }
  }
}