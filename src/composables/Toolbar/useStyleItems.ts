import * as mdi from "@mdi/js";
import { Level } from "@tiptap/extension-heading";
import FontFamily from "@tiptapify/extensions/components/FontFamily.vue";
import FontSize from "@tiptapify/extensions/components/FontSize.vue";
import LineHeight from "@tiptapify/extensions/components/LineHeight.vue";
import { Editor } from "@tiptap/vue-3";
import StyleColor from "@tiptapify/extensions/components/StyleColor.vue";
import { computed, markRaw } from "vue";
import { useI18n } from "vue-i18n";
import {
  fonts,
  fontSizes,
  lineHeights,
  headingLevels,
  setHeadingLevels,
  defaultFontSize,
  defaultLineHeight
} from "@tiptapify/constants/style";

interface MDIIcons {
  [key: string]: string
}
const mdiIcons = mdi as MDIIcons

export function useStyleItems(editor: Editor, theme: any, fontMeasure: string, customHeadingLevels: Array<number> = []) {
  const { t } = useI18n();

  setHeadingLevels(customHeadingLevels)

  return {
    heading: {
      name: 'heading',
      tooltip: computed(() => t('style.heading')),
      icon: mdi.mdiFormatHeaderPound,
      modelValue: null,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('heading') || editor.isActive('paragraph') ? 'primary' : ''),
      },
      children: [
        {
          name: 'paragraph',
          tooltip: computed(() => t('style.paragraph')),
          icon: mdiIcons['mdiFormatParagraph'],
          noI18n: true,
          enabled: true,
          props: {
            color: computed(() => editor.isActive('paragraph') ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.chain().focus().setParagraph().run()
          }
        }
      ].concat(
        headingLevels.value.map(level => {
          const headingLevel: Level = level as Level
          return {
            name: `H${level}`,
            tooltip: computed(() => t(`style.headings.h${level}`)),
            icon: mdiIcons[`mdiFormatHeader${level}`],
            noI18n: true,
            enabled: true,
            props: {
              color: computed(() => editor.isActive('heading', { level: level }) ? 'primary' : ''),
            },
            attrs: {
              click: () => editor.chain().focus().toggleHeading({ level: headingLevel }).run()
            }
          }
        })
      )
    },
    fontFamily: {
      name: 'font-family',
      tooltip: computed(() => t('style.fontFamily')),
      icon: mdi.mdiFormatFont,
      modelValue: false,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().unsetFontFamily().run()),
        color: computed(() => {
          let color = ''
          for (const font in fonts) {
            if (editor.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
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
            if (editor.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
              fontFamily = fonts[font].fontFamily
              break;
            }
          }

          return fontFamily
        }),
      }
    },
    fontSize: {
      name: 'font-size',
      tooltip: computed(() => t('style.fontSize')),
      icon: mdi.mdiFormatSize,
      modelValue: false,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().unsetFontSize().run()),
        color: computed(() => {
          let color = ''
          for (const size of fontSizes) {
            if (editor.isActive('textStyle', { fontSize: `${size}${fontMeasure}` })) {
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
            if (editor.isActive('textStyle', { fontSize: `${size}${fontMeasure}` })) {
              fontSize = size
              break;
            }
          }

          return fontSize
        }),
      }
    },
    lineHeight: {
      name: 'line-height',
      tooltip: computed(() => t('style.lineHeight')),
      icon: mdi.mdiFormatLineHeight,
      modelValue: null,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().unsetLineHeight().run()),
        color: computed(() => {
          let color = ''
          for (const height of lineHeights) {
            if (editor.isActive('textStyle', { lineHeight: height.toString() })) {
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
            if (editor.isActive('textStyle', { lineHeight: height.toString() })) {
              lineHeight = height
              break;
            }
          }

          return lineHeight
        }),
      }
    },
    highlight: {
      name: 'highlight',
      tooltip: computed(() => t('style.color.highlight')),
      icon: mdi.mdiFormatColorFill,
      icon2: mdi.mdiColorHelper,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleHighlight().run()),
      },
      icon2Props: {
        disabled: computed(() => !editor.can().chain().focus().toggleHighlight().run()),
        color: computed(() => {
          const defaultColor = theme.global.current.value.dark ? '#fff' : '#000'
          return editor.getAttributes('highlight').color || defaultColor
        }),
        style: 'filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px);'
      },
      component: markRaw(StyleColor),
      componentProps: {
        fontColor: false,
        backgroundColor: true,
        color: computed(() => editor.getAttributes('highlight').color || ''),
      }
    },
    color: {
      name: 'color',
      tooltip: computed(() => t('style.color.text')),
      icon: mdi.mdiFormatColorText,
      icon2: mdi.mdiColorHelper,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleHighlight().run()),
      },
      icon2Props: {
        disabled: computed(() => !editor.can().chain().focus().toggleHighlight().run()),
        color: computed(() => {
          const defaultColor = theme.global.current.value.dark ? '#fff' : '#000'
          return editor.getAttributes('textStyle').color || defaultColor
        }),
        style: 'filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px);'
      },
      component: markRaw(StyleColor),
      componentProps: {
        fontColor: true,
        backgroundColor: false,
        color: computed(() => editor.getAttributes('textStyle').color || ''),
      }
    }
  }
}