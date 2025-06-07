import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { fonts } from "@tiptapify/components/Toolbar/fonts";
import { computed, ref } from "vue";

interface MDIIcons {
  [key: string]: string
}
const mdiIcons = mdi as MDIIcons

export function getStyleItems(editor: Editor, fontMeasure: string, customHeadingLevels: Array<number> = []) {
  const headingLevels = ref([1, 2, 3, 4, 5, 6])
  if (customHeadingLevels.length) {
    customHeadingLevels.forEach(level => {
      if (level <= 0 || level > 6) {
        throw new Error('customHeadingLevels must be between 1 and 6')
      }
    })

    headingLevels.value = customHeadingLevels
  }

  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 48, 64, 96]

  const lineHeights = [1, 1.5, 2, 3, 4]

  return {
    heading: {
      name: 'heading',
      tooltip: 'style.heading',
      icon: mdi.mdiFormatHeaderPound,
      modelValue: null,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('heading') || editor.isActive('paragraph') ? 'primary' : ''),
      },
      children: [
        {
          name: `paragraph`,
          tooltip: `style.paragraph`,
          icon: mdiIcons[`mdiFormatParagraph`],
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
          return {
            name: `H${level}`,
            tooltip: `style.headings.h${level}`,
            icon: mdiIcons[`mdiFormatHeader${level}`],
            noI18n: true,
            enabled: true,
            props: {
              color: computed(() => editor.isActive('heading', { level: level }) ? 'primary' : ''),
            },
            attrs: {
              click: () => editor.chain().focus().toggleHeading({ level }).run()
            }
          }
        })
      )
    },
    fontFamily: {
      name: 'font-family',
      tooltip: 'style.fontFamily',
      icon: mdi.mdiFormatFont,
      modelValue: false,
      enabled: true,
      attrs: {
        click: () => editor.chain().focus().unsetFontFamily().run()
      },
      children: fonts.map((font) => {
        return {
          name: font.name,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.isActive('textStyle', {fontFamily: font.fontFamily}) ? 'primary' : ''),
            style: `font-family: ${font.fontFamily};`
          },
          attrs: {
            click: () => editor.chain().focus().setFontFamily(font.fontFamily).run()
          }
        }
      })
    },
    fontSize: {
      name: 'font-size',
      tooltip: 'style.fontSize',
      icon: mdi.mdiFormatSize,
      modelValue: false,
      enabled: true,
      attrs: {
        click: () => editor.chain().focus().unsetFontSize().run()
      },
      children: fontSizes.map((fontSize) => {
        return {
          name: `${fontSize}${fontMeasure}`,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.isActive('textStyle', {fontSizes: fontSize}) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.chain().focus().setFontSize(`${fontSize}${fontMeasure}`).run()
          }
        }
      })
    },
    lineHeight: {
      name: 'line-height',
      tooltip: 'style.lineHeight',
      icon: mdi.mdiFormatLineHeight,
      modelValue: null,
      enabled: true,
      attrs: {
        click: () => editor.chain().focus().unsetLineHeight().run()
      },
      children: lineHeights.map((lineHeight) => {
        return {
          name: lineHeight,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.isActive('textStyle', {lineHeights: lineHeight}) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.chain().focus().setLineHeight(lineHeight.toString()).run()
          }
        }
      })
    }
  }
}