import * as mdi from "@mdi/js";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/vue-3";
import { headingLevels, setHeadingLevels } from "@tiptapify/constants/style";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

interface MDIIcons {
  [key: string]: string
}
const mdiIcons = mdi as MDIIcons

export function useHeading(customHeadingLevels: Array<number> = []) {
  const { t } = useI18n();

  setHeadingLevels(customHeadingLevels)

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'heading',
    tooltip: computed(() => t('style.heading')),
    icon: `mdiSvg:${mdi.mdiFormatHeaderPound}`,
    modelValue: null,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('heading') || editor.value.isActive('paragraph') ? 'primary' : ''),
    },
    children: [
      {
        name: 'paragraph',
        tooltip: computed(() => t('style.paragraph')),
        // icon: mdiIcons['mdiFormatParagraph'],
        icon: `mdiSvg:${mdiIcons['mdiFormatParagraph']}`,
        noI18n: true,
        enabled: true,
        props: {
          color: computed(() => editor.value.isActive('paragraph') ? 'primary' : ''),
        },
        attrs: {
          click: () => editor.value.chain().focus().setParagraph().run()
        }
      }
    ].concat(
      headingLevels.value.map(level => {
        const headingLevel: Level = level as Level
        return {
          name: `H${level}`,
          tooltip: computed(() => t(`style.headings.h${level}`)),
          // icon: mdiIcons[`mdiFormatHeader${level}`],
          icon: `mdiSvg:${mdiIcons[`mdiFormatHeader${level}`]}`,
          noI18n: true,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('heading', {level: level}) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleHeading({level: headingLevel}).run()
          }
        }
      })
    )
  }
}