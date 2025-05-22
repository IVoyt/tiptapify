<script setup lang="ts">
import LinkDialog from "@tiptapify/components/extensions/components/LinkDialog.vue";
import { useEditor } from "@tiptapify/composable/useEditor";
import { computed, defineProps, ref } from 'vue'
import * as mdi from '@mdi/js'
import { useI18n } from "vue-i18n";

const props = defineProps({
  variant: String,
})

const { t } = useI18n();

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())

const toolbarLinkButton = ref(null)

const fonts = [
  {
    name: 'Inter',
    fontFamily: 'Inter'
  },
  {
    name: 'Comic Sans',
    fontFamily: 'Comic Sans MS, Comic Sans'
  },
  {
    name: 'Serif',
    fontFamily: 'serif'
  },
  {
    name: 'Monospace',
    fontFamily: 'monospace'
  },
  {
    name: 'Cursive',
    fontFamily: 'cursive'
  },
]

const fontSizes = [
  6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 48, 64, 96
]

const lineHeights = [
  1, 1.5, 2, 3, 4
]

const allMenuItems = ref([
  /**
   * todo
   *
   * font color, backgroundcolor
   * tables
   * unsetmarks, clearnodes
   * media (image, video)
   * unsetmarks, clearnodes
   */
  {
    name: 'heading',
    tooltip: 'style.heading',
    icon: 'FormatHeaderPound',
    modelValue: null,
    enabled: true,
    clearable: true,
    attrs: {
      click: () => editorInstance.value.chain().focus().setParagraph().run()
    },
    props: {
      color: computed(() => editorInstance.value.isActive('heading') ? 'primary' : ''),
    },
    children: [
      {
        name: 'H1',
        icon: 'FormatHeader1',
        enabled: true,
        props: {
          color: computed(() => {
            return editorInstance.value.isActive('heading', { level: 1 }) ? 'primary' : ''
          }),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 1 }).run()
        }
      },
      {
        name: 'H2',
        icon: 'FormatHeader2',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('heading', { level: 2 }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 2 }).run()
        }
      },
      {
        name: 'H3',
        icon: 'FormatHeader3',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('heading', { level: 3 }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 3 }).run()
        }
      },
      {
        name: 'H4',
        icon: 'FormatHeader4',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('heading', { level: 4 }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 4 }).run()
        }
      },
      {
        name: 'H5',
        icon: 'FormatHeader5',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('heading', { level: 5 }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 5 }).run()
        }
      },
      {
        name: 'H6',
        icon: 'FormatHeader6',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('heading', { level: 6 }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleHeading({ level: 6 }).run()
        }
      },
    ],
  },
  {
    name: 'font-family',
    tooltip: 'style.fontFamily',
    icon: 'FormatFont',
    modelValue: null,
    enabled: true,
    clearable: true,
    attrs: {
      click: () => editorInstance.value.chain().focus().unsetFontFamily().run()
    },
    children: fonts.map((font) => {
      return {
        name: font.name,
        icon: '',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('textStyle', { fontFamily: font.fontFamily }) ? 'primary' : ''),
          style: `font-family: ${font.fontFamily};`
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().setFontFamily(font.fontFamily).run()
        }
      }
    })
  },
  {
    name: 'font-size',
    tooltip: 'style.fontSize',
    icon: 'FormatSize',
    modelValue: computed(() => editorInstance.value.getAttributes('textStyle').fontSize || null),
    enabled: true,
    clearable: true,
    attrs: {
      click: () => editorInstance.value.chain().focus().unsetFontSize().run()
    },
    children: fontSizes.map((fontSize) => {
      return {
        name: `${fontSize}px`,
        icon: '',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('textStyle', { fontSizes: fontSize }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().setFontSize(`${fontSize}px`).run()
        }
      }
    })
  },
  {
    name: 'line-height',
    tooltip: 'style.lineHeight',
    icon: 'FormatLineHeight',
    modelValue: null,
    enabled: true,
    clearable: true,
    attrs: {
      click: () => editorInstance.value.chain().focus().unsetLineHeight().run()
    },
    children: lineHeights.map((lineHeight) => {
      return {
        name: lineHeight,
        icon: '',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('textStyle', { lineHeights: lineHeight }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().setLineHeight(lineHeight).run()
        }
      }
    })
  },
  {
    name: '|'
  },
  {
    name: 'bold',
    tooltip: 'format.bold',
    icon: 'FormatBold',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editorInstance.value.isActive('bold') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleBold().run()
    }
  },
  {
    name: 'italic',
    tooltip: 'format.italic',
    icon: 'FormatItalic',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editorInstance.value.isActive('italic') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleItalic().run()
    }
  },
  {
    name: 'strike',
    tooltip: 'format.strike',
    icon: 'FormatStrikethroughVariant',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editorInstance.value.isActive('strike') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleStrike().run()
    }
  },
  {
    name: 'underline',
    tooltip: 'format.underline',
    icon: 'FormatUnderline',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editorInstance.value.isActive('underline') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleUnderline().run()
    }
  },
  {
    name: 'highlight',
    tooltip: 'format.highlight',
    icon: 'Marker',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => editorInstance.value.isActive('highlight') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleHighlight().run()
    }
  },
  {
    name: '|'
  },
  {
    name: 'code',
    tooltip: 'format.code',
    icon: 'Xml',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleCode().run()),
      color: computed(() => editorInstance.value.isActive('code') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleCode().run()
    }
  },
  {
    name: 'codeblock_syntax',
    tooltip: 'format.codeblock_syntax',
    icon: 'CodeBlockBraces',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleCodeBlock().run()),
      color: computed(() => editorInstance.value.isActive('codeblock-lowlight') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleCodeBlock().run()
    }
  },
  {
    name: 'blockquote',
    tooltip: 'format.blockquote',
    icon: 'CommentQuote',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleBlockquote().run()),
      color: computed(() => editorInstance.value.isActive('blockquote') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleBlockquote().run()
    }
  },
  {
    name: '|'
  },
  {
    name: 'sup',
    tooltip: 'format.sup',
    icon: 'FormatSuperscript',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleSuperscript().run()),
      color: computed(() => editorInstance.value.isActive('superscript') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleSuperscript().run()
    }
  },
  {
    name: 'sub',
    tooltip: 'format.sub',
    icon: 'FormatSubscript',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleSubscript().run()),
      color: computed(() => editorInstance.value.isActive('subscript') ? 'primary' : ''),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().toggleSubscript().run()
    }
  },
  {
    name: '|'
  },
  {
    name: 'alignment',
    tooltip: 'alignment',
    icon: '',
    enabled: true,
    group: true,
    children: [
      {
        name: 'alignments.left',
        tooltip: 'alignments.left',
        icon: 'FormatAlignLeft',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('text-align', { align: 'left' }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleTextAlign('left').run()
        }
      },
      {
        name: 'alignments.center',
        tooltip: 'alignments.center',
        icon: 'FormatAlignCenter',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('text-align', { align: 'center' }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleTextAlign('center').run()
        }
      },
      {
        name: 'alignments.right',
        tooltip: 'alignments.right',
        icon: 'FormatAlignRight',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('text-align', { align: 'right' }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleTextAlign('right').run()
        }
      },
      {
        name: 'alignments.justify',
        tooltip: 'alignments.justify',
        icon: 'FormatAlignJustify',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('text-align', { align: 'justify' }) ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleTextAlign('justify').run()
        }
      },
    ]
  },
  {
    name: '|'
  },
  {
    name: 'list',
    tooltip: 'list',
    icon: 'FormatListGroup',
    enabled: true,
    group: true,
    children: [
      {
        name: 'lists.bullet',
        tooltip: 'lists.bullet',
        icon: 'FormatListBulleted',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('bulletList') ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleBulletList().run()
        }
      },
      {
        name: 'lists.numbered',
        tooltip: 'lists.numbered',
        icon: 'FormatListNumbered',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('orderedList') ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleOrderedList().run()
        }
      },
      {
        name: 'lists.task',
        tooltip: 'lists.task',
        icon: 'FormatListChecks',
        enabled: true,
        props: {
          color: computed(() => editorInstance.value.isActive('taskList') ? 'primary' : ''),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().toggleTaskList().run()
        }
      },
      {
        name: 'lists.indent',
        tooltip: 'lists.indent',
        icon: 'FormatIndentIncrease',
        enabled: true,
        props: {
          disabled: computed(() => !editorInstance.value.isActive('listItem')),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().sinkListItem().run()
        }
      },
      {
        name: 'lists.outdent',
        tooltip: 'lists.outdent',
        icon: 'FormatIndentDecrease',
        enabled: true,
        props: {
          disabled: computed(() => !editorInstance.value.isActive('listItem')),
        },
        attrs: {
          click: () => editorInstance.value.chain().focus().liftListItem().run()
        }
      },
    ]
  },
  {
    name: '|'
  },
  {
    name: 'format.link',
    tooltip: 'format.link',
    icon: computed(() => !editorInstance.value.isActive('link') ? 'Link' : 'LinkOff'),
    enabled: true,
    props: {
      color: computed(() => editorInstance.value.isActive('link') ? 'primary' : ''),
    },
    attrs: {
      click: computed(() => {
        return editorInstance.value.isActive('link')
            ? editorInstance.value.chain().focus().unsetLink().run
            : toolbarLinkButton.value?.open
      })
    }
  },
  {
    name: '|'
  },
  {
    name: 'undo',
    tooltip: 'action.undo',
    icon: 'Undo',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().undo().run()),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().undo().run()
    }
  },
  {
    name: 'redo',
    tooltip: 'action.redo',
    icon: 'Redo',
    enabled: true,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().redo().run()),
    },
    attrs: {
      click: () => editorInstance.value.chain().focus().redo().run()
    }
  },
  {
    name: '|'
  },
  {
    name: 'line',
    tooltip: 'format.line',
    icon: 'Minus',
    enabled: true,
    props: {},
    attrs: {
      click: () => editorInstance.value.chain().focus().setHorizontalRule().run()
    }
  },
  {
    name: 'break',
    tooltip: 'format.break',
    icon: 'FormatPageBreak',
    enabled: true,
    props: {},
    attrs: {
      click: () => editorInstance.value.chain().focus().setHardBreak().run()
    }
  },
])

function getIcon(icon: string) {
  return `${mdi[`mdi${icon}`]}`
}
</script>

<template>
  <div v-if="editor" class="d-flex flex-wrap gap-x-4 gap-y-2 tiptapify-menu">
    <template v-for="(menuItem, key) in allMenuItems" :key="key">
      <VDivider v-if="menuItem.name === '|'" vertical class="menu-divider" />

      <template v-else-if="menuItem.enabled">
        <template v-if="menuItem.children">
          <VBtnToggle v-if="menuItem.group" :variant="variant">
            <VBtn
                v-for="(item, key) of menuItem.children"
                v-bind="{ ...props, ...item.props}" v-on="item.attrs" size="32"
                :key="`${item.name}-${key}`"
            >
              <VTooltip :text="t(item.name)" location="top" activator="parent" />

              <VIcon v-if="item.icon" :icon="getIcon(item.icon)" size="small" />
              <span v-else class="menu-item-title">
                {{ t(menuItem.name) }}
              </span>
            </VBtn>
          </VBtnToggle>

          <VMenu v-else>
            <template #activator="{ props: menuProps }">
              <VBtn :variant="variant" v-bind="menuProps" size="32" class="menu-button">
                <VTooltip :text="t(menuItem.tooltip)" location="top" activator="parent" />

                <VIcon v-if="menuItem.icon" :icon="getIcon(menuItem.icon)" size="small" />
                <span v-else class="menu-item-title">
                  {{ t(menuItem.name) }}
                </span>
              </VBtn>
            </template>

            <VList v-model="menuItem.modelValue">
              <template v-for="(item, itemKey) in menuItem.children" :key="itemKey">
                <VListItem :value="item.name" density="compact" v-bind="item.props" v-on="item.attrs">
                  <VTooltip v-if="item.tooltip" :text="t(item.tooltip)" location="top" activator="parent" />

                  <VListItemTitle>
                    <VIcon v-if="item.icon" :icon="getIcon(item.icon)" size="small" />
                    <span v-else class="menu-item-title">
                      {{ t(item.name) }}
                    </span>
                  </VListItemTitle>
                </VListItem>
              </template>
            </VList>
          </VMenu>
        </template>

        <VBtn v-else :variant="variant" v-bind="menuItem.props" v-on="menuItem.attrs" class="menu-button" size="32">
          <VTooltip :text="t(menuItem.tooltip)" location="top" activator="parent" />

          <VIcon v-if="menuItem.icon" :icon="getIcon(menuItem.icon)" size="16" />
          <span v-else class="menu-item-title">
            {{ t(menuItem.name) }}
          </span>
        </VBtn>
      </template>
    </template>

    <LinkDialog ref="toolbarLinkButton" />
  </div>
</template>

<style lang="scss" scoped>
.tiptapify-menu {
  padding: 8px;
  border-bottom: var(--border);
}

:deep(.v-btn-group) {
  height: 32px !important;
}

.menu-item-title {
  font-size: 14px;
}

.menu-button {
  margin: 0 1px;
}

.v-divider.menu-divider {
  margin: 0 10px;
}
</style>
