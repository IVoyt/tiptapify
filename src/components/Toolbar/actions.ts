import { default as UndoButton } from '@tiptapify/extensions/components/actions/undo/Button.vue'
import { default as RedoButton } from '@tiptapify/extensions/components/actions/redo/Button.vue'
import { default as ResetButton } from '@tiptapify/extensions/components/actions/reset/Button.vue'
import { markRaw } from 'vue'

export default {
  section: 'actions',
  group: true,
  components: [
    {
      name: 'undo',
      component: markRaw(UndoButton),
    },
    {
      name: 'redo',
      component: markRaw(RedoButton),
    },
    {
      name: 'resetChanges',
      component: markRaw(ResetButton),
    }
  ]
}