import { Editor, Extension, JSONContent } from '@tiptap/core'
import { EditorState } from '@tiptap/pm/state'

const name = 'resetChanges'

declare module '@tiptap/core' {
  interface Storage {
    resetChanges: { initialContent: JSONContent | null }
  }
}

/**
 * Keeps the document the editor opened with, for resetChanges to return to: the document before its first change
 * (the create event comes later than the first changes can).
 */
export const ResetChanges = Extension.create({
  name,

  addStorage() {
    return { initialContent: null as JSONContent | null }
  },

  onTransaction({ transaction }) {
    if (this.storage.initialContent === null && transaction.docChanged) {
      this.storage.initialContent = transaction.before.toJSON()
    }
  },
})

const confirmKey = 'tiptapify:reset-changes:confirm'

// Storage may be blocked (private mode, sandboxed iframe): the reset then keeps asking
function storage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

/**
 * The user chose "Don't ask again" in the reset confirmation (kept in this browser).
 */
export function resetConfirmationOff(): boolean {
  try {
    return storage()?.getItem(confirmKey) === 'off'
  } catch {
    return false
  }
}

export function turnOffResetConfirmation(): void {
  try {
    storage()?.setItem(confirmKey, 'off')
  } catch {
    // The choice is not kept: the next reset asks again
  }
}

/**
 * Returns the document to the content the editor opened with and empties the undo and redo history,
 * so the reset itself cannot be undone.
 */
export function resetChanges(editor: Editor): boolean {
  const initialContent = editor.storage.resetChanges?.initialContent
  if (!initialContent) {
    return false
  }

  editor.commands.setContent(initialContent, { emitUpdate: true })

  const { state } = editor
  editor.view.updateState(EditorState.create({ schema: state.schema, doc: state.doc, plugins: state.plugins }))
  // An empty transaction re-renders what reads the history, as the undo and redo buttons
  editor.view.dispatch(editor.state.tr.setMeta('addToHistory', false))

  return true
}
