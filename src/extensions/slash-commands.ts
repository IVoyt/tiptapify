import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { VueRenderer, posToDOMRect } from '@tiptap/vue-3'
import { computePosition, flip, shift } from '@floating-ui/dom'
import { useLocale } from '@tiptapify/i18n'
import CommandsList from '@tiptapify/extensions/components/slashCommands/CommandsList.vue'
import PickerDialog from '@tiptapify/extensions/components/slashCommands/PickerDialog.vue'
import { PickerEventBus } from '@tiptapify/extensions/PickerEventBus'
import { defaultSlashCommandIds, slashCommandMap } from '@tiptapify/extensions/components/slashCommands/suggestion'
import { SlashCommandId } from '@tiptapify/types/slashCommandsTypes'

const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

export type SlashCommandsExtensionOptions = {
  suggestion?: {
    char?: string
    command?: ({ editor, range, props }: { editor: Editor, range: any, props: any }) => void
    allowedCommands?: SlashCommandId[]
    render?: () => any
  }
}

export default Extension.create<SlashCommandsExtensionOptions>(
  {
    name: 'slash-commands',

    addOptions() {
      return {
        suggestion: {
          char: '/',
          allowedCommands: defaultSlashCommandIds,
        },
      }
    },

    addProseMirrorPlugins() {
      const allowedCommands = this.options.suggestion?.allowedCommands ?? defaultSlashCommandIds
      const customCommand = this.options.suggestion?.command
      const char = this.options.suggestion?.char ?? '/'

      let component: VueRenderer | null = null
      let pickerComponent: VueRenderer | null = null

      const items = ({ query }: { query: string }) => {
        const lowerQuery = query.toLowerCase()
        return allowedCommands
          .map(id => {
            const cmd = slashCommandMap[id]
            if (cmd.isPicker) {
              return {
                ...cmd,
                id,
                pickerType: id === 'emoji' ? 'emoji' : 'charmap'
              }
            }
            return { ...cmd, id }
          })
          .filter((cmd: any) => {
            if (!query) return true
            return cmd.title.toLowerCase().includes(lowerQuery) || cmd.id.toLowerCase().includes(lowerQuery)
          })
          .slice(0, 20)
      }

      const closePicker = () => {
        if (pickerComponent) {
          pickerComponent.element.remove()
          pickerComponent.destroy()
          pickerComponent = null
        }
      }

      PickerEventBus.on('close', () => {
        closePicker()
      })

      const command = ({ editor, range, props }: { editor: Editor, range: any, props: any }) => {
        if (customCommand) {
          customCommand({ editor, range, props })
        } else if (props.command) {
          props.command({ editor, range })
        } else if (props.isPicker && props.pickerType) {
          editor.chain().focus().deleteRange(range).run()
          closePicker()

          const { t } = useLocale()

          pickerComponent = new VueRenderer(PickerDialog, {
            props: {
              editor,
              t,
              type: props.pickerType,
            },
            editor,
          })

          const element = pickerComponent.element as HTMLElement
          element.style.position = 'fixed'
          element.style.zIndex = '9999'
          element.style.inset = '0'
          element.style.display = 'flex'
          element.style.alignItems = 'center'
          element.style.justifyContent = 'center'

          document.body.appendChild(element)
        }
      }

      return [
        Suggestion({
          editor: this.editor,
          char,
          command,
          items,
          render: () => ({
            onStart: (props: any) => {
              component = new VueRenderer(CommandsList, {
                props,
                editor: props.editor,
              })

              if (!props.clientRect) {
                return
              }

              const element = component.element as HTMLElement
              element.style.position = 'absolute'

              document.body.appendChild(element)

              updatePosition(props.editor, element)
            },

            onUpdate: (props: any) => {
              if (component) {
                component.updateProps(props)
              }

              if (!props.clientRect) {
                return
              }

              const element = component?.element as HTMLElement | undefined
              if (element) {
                updatePosition(props.editor, element)
              }
            },

            onKeyDown: (props: any) => {
              if (props.event.key === 'Escape') {
                closePicker()
                return true
              }
              return component?.ref?.onKeyDown(props)
            },

            onExit: () => {
              closePicker()
              if (component) {
                component.destroy()
                const element = component.element as HTMLElement | null
                if (element?.parentNode) {
                  element.parentNode.removeChild(element)
                }
                component = null
              }
            },
          }),
        }),
      ]
    },
  })
