import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { fonts } from "@tiptapify/constants/style";
import FontFamily from "@tiptapify/extensions/components/FontFamily.vue";
import { computed, inject, markRaw, Ref } from "vue";

export function useFontFamily() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'font-family',
    tooltip: computed(() => t('style.fontFamily')),
    icon: `mdiSvg:${mdi.mdiFormatFont}`,
    modelValue: false,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().unsetFontFamily().run()),
      color: computed(() => {
        let color = ''
        for (const font in fonts) {
          if (editor.value.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
            color = 'primary'
            break;
          }
        }

        return color
      }),
    },
    component: markRaw(FontFamily),
    componentProps: {
      fonts: fonts,
      fontFamily: computed(() => {
        let fontFamily = ''
        for (const font in fonts) {
          if (editor.value.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
            fontFamily = fonts[font].fontFamily
            break;
          }
        }

        return fontFamily
      }),
    }
  }
}