import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useLine() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'line',
    tooltip: computed(() => t('format.line')),
    icon: `mdiSvg:${mdi.mdiMinus}`,
    enabled: true,
    props: {},
    attrs: {
      click: () => editor.value.chain().focus().setHorizontalRule().run()
    }
  }
}