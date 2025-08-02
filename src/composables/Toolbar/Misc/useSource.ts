import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useSource() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'source',
    tooltip: computed(() => t('misc.source')),
    icon: `mdiSvg:${mdi.mdiCodeTags}`,
    enabled: true,
    props: {},
    attrs: {
      click: () => editor.value.commands.showSource()
    }
  }
}