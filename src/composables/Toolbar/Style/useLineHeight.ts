import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { lineHeights } from "@tiptapify/constants/style";
import LineHeight from "@tiptapify/extensions/components/LineHeight.vue";
import { computed, inject, markRaw, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useLineHeight() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'line-height',
    tooltip: computed(() => t('style.lineHeight')),
    icon: `mdiSvg:${mdi.mdiFormatLineHeight}`,
    modelValue: null,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().unsetLineHeight().run()),
      color: computed(() => {
        let color = ''
        for (const height of lineHeights) {
          if (editor.value.isActive('textStyle', { lineHeight: height.toString() })) {
            color = 'primary'
            break;
          }
        }

        return color
      }),
    },
    component: markRaw(LineHeight),
    componentProps: {
      lineHeights,
      lineHeight: computed(() => {
        let lineHeight = null
        for (const height of lineHeights) {
          if (editor.value.isActive('textStyle', { lineHeight: height.toString() })) {
            lineHeight = height
            break;
          }
        }

        return lineHeight
      }),
    }
  }
}