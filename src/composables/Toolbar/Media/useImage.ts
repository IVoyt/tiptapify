import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useImage() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('media.image')),
    tooltip: computed(() => t('media.image')),
    icon: `mdiSvg:${mdi.mdiImage}`,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('image') ? 'primary' : ''),
      disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
    },
    attrs: {
      click: () => editor.value.commands.showTiptapifyImage()
    }
  }
}