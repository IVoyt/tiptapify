import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import StyleColor from "@tiptapify/extensions/components/StyleColor.vue";
import { computed, inject, markRaw, Ref } from "vue";

export function useHighlight(theme: any) {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'highlight',
    tooltip: computed(() => t('style.color.highlight')),
    icon: `mdiSvg:${mdi.mdiFormatColorFill}`,
    icon2: `mdiSvg:${mdi.mdiColorHelper}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
    },
    icon2Props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => {
        const defaultColor = theme.global.current.value.dark ? '#fff' : '#000'
        return editor.value.getAttributes('highlight').color || defaultColor
      }),
      style: 'filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px);'
    },
    component: markRaw(StyleColor),
    componentProps: {
      fontColor: false,
      backgroundColor: true,
      color: computed(() => editor.value.getAttributes('highlight').color || ''),
    }
  }
}