import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { fontSizes } from "@tiptapify/constants/style";
import FontSize from "@tiptapify/extensions/components/FontSize.vue";
import { computed, inject, markRaw, Ref } from "vue";

export function useFontSize(fontMeasure: string) {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'font-size',
    tooltip: computed(() => t('style.fontSize')),
    icon: `mdiSvg:${mdi.mdiFormatSize}`,
    modelValue: false,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().unsetFontSize().run()),
      color: computed(() => {
        let color = ''
        for (const size of fontSizes) {
          if (editor.value.isActive('textStyle', { fontSize: `${size}${fontMeasure}` })) {
            color = 'primary'
            break;
          }
        }

        return color
      }),
    },
    component: markRaw(FontSize),
    componentProps: {
      sizes: fontSizes,
      measure: fontMeasure,
      fontSize: computed(() => {
        let fontSize = null
        for (const size of fontSizes) {
          if (editor.value.isActive('textStyle', { fontSize: `${size}${fontMeasure}` })) {
            fontSize = size
            break;
          }
        }

        return fontSize
      }),
    }
  }
}