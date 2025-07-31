import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useTask() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('lists.task')),
    tooltip: computed(() => t('lists.task')),
    icon: `mdiSvg:${mdi.mdiFormatListChecks}`,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('taskList') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleTaskList().run()
    }
  }
}