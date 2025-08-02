import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useVideo() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('media.video')),
    tooltip: computed(() => t('media.video')),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 12.5v-9l6 4.5z"/></svg>',
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('youtube') ? 'primary' : ''),
      disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
    },
    attrs: {
      click: () => editor.value.commands.showTiptapifyVideo()
    }
  }
}