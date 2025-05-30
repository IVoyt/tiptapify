import { computed, ComputedRef, Ref, ref } from "vue";
import * as mdi from '@mdi/js'
import { fonts } from './fonts'

interface MDIIcons {
  [key: string]: string
}
const mdiIcons = mdi as MDIIcons

interface ToolbarItemAttrs {
  [key: string]: Function | any
}

interface ToolbarItemProps {
  [key: string]: any
}

interface ToolbarItem {
  name: string|number,
  tooltip: string,
  icon: string|ComputedRef<string>,
  noI18n?: boolean,
  enabled: boolean,
  modelValue?: any,
  section?: string,
  group?: boolean,
  props?: ToolbarItemProps,
  attrs?: ToolbarItemAttrs,
  children?: ToolbarItem[],
}

export interface ToolbarItems {
  [key: string]: ToolbarItem
}

export interface ToolbarItemSections {
  [key: string]: ToolbarItems
}

export function toolbarItems(
  editor: any,
  fontMeasure: string,
  items: { list: Array<string>, exclude: boolean },
  customHeadingLevels: Array<number>,
  toolbarLinkButton: Ref,
): ToolbarItemSections {
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

  const allMenuItems: ToolbarItems = {
    /**
     * todo
     *
     * font color, backgroundcolor
     * tables
     * media (image, video)
     */
    heading: {
      name: 'heading',
      tooltip: 'style.heading',
      icon: mdi.mdiFormatHeaderPound,
      section: 'style',
      modelValue: null,
      enabled: true,
      attrs: {
        click: () => editor.value.chain().focus().setParagraph().run()
      },
      props: {
        color: computed(() => editor.value.isActive('heading') ? 'primary' : ''),
      },
      children: [
        {
          name: `paragraph`,
          tooltip: `style.paragraph`,
          icon: mdiIcons[`mdiFormatParagraph`],
          noI18n: true,
          enabled: true,
          props: {
            color: computed(() => {
              return editor.value.isActive('paragraph') ? 'primary' : ''
            }),
          },
          attrs: {
            click: () => editor.value.chain().focus().setParagraph().run()
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
              color: computed(() => {
                return editor.value.isActive('heading', { level }) ? 'primary' : ''
              }),
            },
            attrs: {
              click: () => editor.value.chain().focus().toggleHeading({ level }).run()
            }
          }
        })
      )
    },
    fontFamily: {
      name: 'font-family',
      tooltip: 'style.fontFamily',
      icon: mdi.mdiFormatFont,
      section: 'style',
      modelValue: null,
      enabled: true,
      attrs: {
        click: () => editor.value.chain().focus().unsetFontFamily().run()
      },
      children: fonts.map((font) => {
        return {
          name: font.name,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.value.isActive('textStyle', { fontFamily: font.fontFamily }) ? 'primary' : ''),
            style: `font-family: ${font.fontFamily};`
          },
          attrs: {
            click: () => editor.value.chain().focus().setFontFamily(font.fontFamily).run()
          }
        }
      })
    },
    fontSize: {
      name: 'font-size',
      tooltip: 'style.fontSize',
      icon: mdi.mdiFormatSize,
      section: 'style',
      modelValue: computed(() => editor.value.getAttributes('textStyle').fontSize || null),
      enabled: true,
      attrs: {
        click: () => editor.value.chain().focus().unsetFontSize().run()
      },
      children: fontSizes.map((fontSize) => {
        return {
          name: `${fontSize}${fontMeasure}`,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.value.isActive('textStyle', { fontSizes: fontSize }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().setFontSize(`${fontSize}${fontMeasure}`).run()
          }
        }
      })
    },
    lineHeight: {
      name: 'line-height',
      tooltip: 'style.lineHeight',
      icon: mdi.mdiFormatLineHeight,
      section: 'style',
      modelValue: null,
      enabled: true,
      attrs: {
        click: () => editor.value.chain().focus().unsetLineHeight().run()
      },
      children: lineHeights.map((lineHeight) => {
        return {
          name: lineHeight,
          tooltip: '',
          icon: '',
          enabled: true,
          noI18n: true,
          props: {
            color: computed(() => editor.value.isActive('textStyle', { lineHeights: lineHeight }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().setLineHeight(lineHeight).run()
          }
        }
      })
    },

    bold: {
      name: 'bold',
      tooltip: 'format.bold',
      icon: mdi.mdiFormatBold,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleBold().run()),
        color: computed(() => editor.value.isActive('bold') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleBold().run()
      }
    },
    italic: {
      name: 'italic',
      tooltip: 'format.italic',
      icon: mdi.mdiFormatItalic,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleItalic().run()),
        color: computed(() => editor.value.isActive('italic') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleItalic().run()
      }
    },
    strike: {
      name: 'strike',
      tooltip: 'format.strike',
      icon: mdi.mdiFormatStrikethroughVariant,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleStrike().run()),
        color: computed(() => editor.value.isActive('strike') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleStrike().run()
      }
    },
    underline: {
      name: 'underline',
      tooltip: 'format.underline',
      icon: mdi.mdiFormatUnderline,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleUnderline().run()),
        color: computed(() => editor.value.isActive('underline') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleUnderline().run()
      }
    },
    highlight: {
      name: 'highlight',
      tooltip: 'format.highlight',
      icon: mdi.mdiMarker,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
        color: computed(() => editor.value.isActive('highlight') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleHighlight().run()
      }
    },
    formatClear: {
      name: 'format clear',
      tooltip: 'format.formatClear',
      icon: mdi.mdiFormatClear,
      section: 'format',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().unsetAllMarks().run()),
      },
      attrs: {
        click: () => editor.value.chain().focus().unsetAllMarks().clearNodes().run()
      }
    },

    code: {
      name: 'code',
      tooltip: 'format.code',
      icon: mdi.mdiXml,
      section: 'format_extra',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleCode().run()),
        color: computed(() => editor.value.isActive('code') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleCode().run()
      }
    },
    codeBlock: {
      name: 'codeblock',
      tooltip: 'format.codeblock',
      icon: mdi.mdiCodeBlockTags,
      section: 'format_extra',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleCodeBlock().run()),
        color: computed(() => editor.value.isActive('codeBlock') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleCodeBlock().run()
      }
    },
    blockquote: {
      name: 'blockquote',
      tooltip: 'format.blockquote',
      icon: mdi.mdiCommentQuote,
      section: 'format_extra',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleBlockquote().run()),
        color: computed(() => editor.value.isActive('blockquote') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleBlockquote().run()
      }
    },

    sup: {
      name: 'sup',
      tooltip: 'format.sup',
      icon: mdi.mdiFormatSuperscript,
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleSuperscript().run()),
        color: computed(() => editor.value.isActive('superscript') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleSuperscript().run()
      }
    },
    sub: {
      name: 'sub',
      tooltip: 'format.sub',
      icon: mdi.mdiFormatSubscript,
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().toggleSubscript().run()),
        color: computed(() => editor.value.isActive('subscript') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.value.chain().focus().toggleSubscript().run()
      }
    },

    alignment: {
      name: 'alignment',
      tooltip: 'alignment',
      icon: '',
      section: 'alignment',
      enabled: true,
      group: true,
      children: [
        {
          name: 'alignments.left',
          tooltip: 'alignments.left',
          icon: mdi.mdiFormatAlignLeft,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('text-align', { align: 'left' }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleTextAlign('left').run()
          }
        },
        {
          name: 'alignments.center',
          tooltip: 'alignments.center',
          icon: mdi.mdiFormatAlignCenter,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('text-align', { align: 'center' }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleTextAlign('center').run()
          }
        },
        {
          name: 'alignments.right',
          tooltip: 'alignments.right',
          icon: mdi.mdiFormatAlignRight,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('text-align', { align: 'right' }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleTextAlign('right').run()
          }
        },
        {
          name: 'alignments.justify',
          tooltip: 'alignments.justify',
          icon: mdi.mdiFormatAlignJustify,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('text-align', { align: 'justify' }) ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleTextAlign('justify').run()
          }
        },
      ]
    },

    list: {
      name: 'list',
      tooltip: 'list',
      icon: mdi.mdiFormatListGroup,
      section: 'list',
      enabled: true,
      group: true,
      children: [
        {
          name: 'lists.bullet',
          tooltip: 'lists.bullet',
          icon: mdi.mdiFormatListBulleted,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('bulletList') ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleBulletList().run()
          }
        },
        {
          name: 'lists.numbered',
          tooltip: 'lists.numbered',
          icon: mdi.mdiFormatListNumbered,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('orderedList') ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleOrderedList().run()
          }
        },
        {
          name: 'lists.task',
          tooltip: 'lists.task',
          icon: mdi.mdiFormatListChecks,
          enabled: true,
          props: {
            color: computed(() => editor.value.isActive('taskList') ? 'primary' : ''),
          },
          attrs: {
            click: () => editor.value.chain().focus().toggleTaskList().run()
          }
        },
        {
          name: 'lists.indent',
          tooltip: 'lists.indent',
          icon: mdi.mdiFormatIndentIncrease,
          enabled: true,
          props: {
            disabled: computed(() => !editor.value.can().sinkListItem('listItem')),
            active: false,
          },
          attrs: {
            click: () => editor.value.chain().focus().sinkListItem('listItem').run()
          }
        },
        {
          name: 'lists.outdent',
          tooltip: 'lists.outdent',
          icon: mdi.mdiFormatIndentDecrease,
          enabled: true,
          props: {
            disabled: computed(() => !editor.value.can().liftListItem('listItem')),
            active: false,
          },
          attrs: {
            click: () => editor.value.chain().focus().liftListItem('listItem').run()
          }
        },
      ]
    },

    link: {
      name: 'format.link',
      tooltip: 'format.link',
      icon: computed(() => editor.value.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
      section: 'media',
      enabled: true,
      props: {
        color: computed(() => editor.value.isActive('link') ? 'primary' : ''),
        disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
      },
      attrs: {
        click: computed(() => {
          return editor.value.isActive('link')
            ? editor.value.chain().focus().unsetLink().run
            : toolbarLinkButton.value?.open
        })
      }
    },

    undo: {
      name: 'undo',
      tooltip: 'action.undo',
      icon: mdi.mdiUndo,
      section: 'actions',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().undo().run()),
      },
      attrs: {
        click: () => editor.value.chain().focus().undo().run()
      }
    },
    redo: {
      name: 'redo',
      tooltip: 'action.redo',
      icon: mdi.mdiRedo,
      section: 'actions',
      enabled: true,
      props: {
        disabled: computed(() => !editor.value.can().chain().focus().redo().run()),
      },
      attrs: {
        click: () => editor.value.chain().focus().redo().run()
      }
    },

    line: {
      name: 'line',
      tooltip: 'format.line',
      icon: mdi.mdiMinus,
      section: 'misc',
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.value.chain().focus().setHorizontalRule().run()
      }
    },
    break: {
      name: 'break',
      tooltip: 'format.break',
      icon: mdi.mdiFormatPageBreak,
      section: 'misc',
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.value.chain().focus().setHardBreak().run()
      }
    },
    source: {
      name: 'source',
      tooltip: 'misc.source',
      icon: mdi.mdiCodeTags,
      section: 'misc',
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.value.commands.showSource()
      }
    },
  }



  const pluginsList = Object.keys(allMenuItems)

  if (items.list.length) {
    items.list.forEach(item => {
      if (!pluginsList.includes(item)) {
        throw new Error(`Unknown plugin name: ${item}! Supported plugins: ${pluginsList.join(', ')}`)
      }
    })
  }

  const sections = {}
  const toolbarItems: { [key: string]: ToolbarItems } = {}
  pluginsList.forEach(key => {
    const item = allMenuItems[key]

    if (items.list.length) {
      item.enabled = items.list.includes(key)
      if (items.exclude) {
        item.enabled = !item.enabled
      }
    }
    const section = item.section ?? 'misc'
    if (typeof toolbarItems[section] === 'undefined') {
      sections[section] = 0
      toolbarItems[section] = {}
    }
    toolbarItems[section][key] = allMenuItems[key]
    if (allMenuItems[key].enabled) {
      sections[section]++
    }
  })

  Object.keys(sections).forEach(key => {
    if (sections[key] === 0) {
      delete toolbarItems[key]
    }
  })

  return toolbarItems
}