import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import StyleColor from "@tiptapify/extensions/components/StyleColor.vue";
import { computed, inject, markRaw, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useColor(theme: any) {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'color',
    tooltip: computed(() => t('style.color.text')),
    icon: `mdiSvg:${mdi.mdiFormatColorText}`,
    icon2: `mdiSvg:${mdi.mdiColorHelper}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
    },
    icon2Props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => {
        const defaultColor = theme.global.current.value.dark ? '#fff' : '#000'
        return editor.value.getAttributes('textStyle').color || defaultColor
      }),
      style: 'filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px);'
    },
    component: markRaw(StyleColor),
    componentProps: {
      fontColor: true,
      backgroundColor: false,
      color: computed(() => editor.value.getAttributes('textStyle').color || ''),
    }
  }
}