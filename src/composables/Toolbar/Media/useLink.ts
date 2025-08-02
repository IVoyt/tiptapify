import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useLink() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('media.link')),
    tooltip: computed(() => t('media.link')),
    icon: computed(() => editor.value.isActive('tiptapifyLink') ? `mdiSvg:${mdi.mdiLinkOff}` : `mdiSvg:${mdi.mdiLink}`),
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('tiptapifyLink') ? 'primary' : ''),
      disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
    },
    attrs: {
      click: () => editor.value.commands.showLink()
    }
  }
}