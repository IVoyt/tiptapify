import { Editor } from '@tiptap/vue-3'

export type ColorKind = 'text' | 'highlight'

// `value: null` is the "Default" / "No highlight" cell that removes the color; `name` is a key under `style.color`
export type Swatch = { value: string | null, name: string }

export type GridPosition = { row: number, col: number }

export const RECENT_LIMIT = 8

const hues = ['red', 'orange', 'amber', 'green', 'teal', 'blue', 'purple', 'pink']

function hueRow(prefix: string, values: string[]): Swatch[] {
  return values.map((value, index) => ({ value, name: `names.${prefix}${hues[index]}` }))
}

// Rows of 8: text colors stay readable on a light page, highlights are pastel so black text stays readable on them
export const palettes: Record<ColorKind, Swatch[][]> = {
  text: [
    [
      { value: null, name: 'default' },
      { value: '#000000', name: 'names.black' },
      { value: '#404040', name: 'names.dark_grey' },
      { value: '#595959', name: 'names.grey' },
      { value: '#808080', name: 'names.medium_grey' },
      { value: '#a6a6a6', name: 'names.light_grey' },
      { value: '#d9d9d9', name: 'names.pale_grey' },
      { value: '#ffffff', name: 'names.white' },
    ],
    hueRow('dark_', ['#b91c1c', '#c2410c', '#a16207', '#15803d', '#0f766e', '#1d4ed8', '#7e22ce', '#be185d']),
    hueRow('', ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#a855f7', '#ec4899']),
  ],
  highlight: [
    [
      { value: null, name: 'no_highlight' },
      { value: '#ededed', name: 'names.pale_grey' },
      { value: '#d4d4d4', name: 'names.light_grey' },
    ],
    hueRow('light_', ['#fecaca', '#fed7aa', '#fde68a', '#bbf7d0', '#99f6e4', '#bfdbfe', '#e9d5ff', '#fbcfe8']),
    hueRow('', ['#fca5a5', '#fdba74', '#fcd34d', '#86efac', '#5eead4', '#93c5fd', '#d8b4fe', '#f9a8d4']),
  ],
}

/**
 * `#rgb` / `#rrggbb` (the `#` may be omitted, as copied from design tools) to lowercase `#rrggbb`, else null.
 */
export function normalizeHex(input: string | null | undefined): string | null {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(String(input ?? '').trim())
  if (!match) {
    return null
  }

  const digits = match[1].length === 3 ? match[1].replace(/./g, digit => digit + digit) : match[1]

  return `#${digits.toLowerCase()}`
}

// Colors pasted from other sites may be `rgb()` or names: those match only themselves
export function sameColor(a: string | null | undefined, b: string | null | undefined): boolean {
  const left = normalizeHex(a) ?? String(a ?? '').trim().toLowerCase()
  const right = normalizeHex(b) ?? String(b ?? '').trim().toLowerCase()

  return left === right
}

export function addRecent(list: string[], color: string, limit = RECENT_LIMIT): string[] {
  const hex = normalizeHex(color)
  if (!hex) {
    return list
  }

  return [hex, ...list.filter(item => item !== hex)].slice(0, limit)
}

function storage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function recentKey(kind: ColorKind): string {
  return `tiptapify:recent-colors:${kind}`
}

// Storage may be blocked (private mode, sandboxed iframe) or hold junk: the picker then starts without recent colors
export function loadRecent(kind: ColorKind): string[] {
  try {
    const stored = JSON.parse(storage()?.getItem(recentKey(kind)) ?? '[]')
    if (!Array.isArray(stored)) {
      return []
    }

    const colors = stored.map(item => normalizeHex(String(item))).filter((item): item is string => !!item)

    return [...new Set(colors)].slice(0, RECENT_LIMIT)
  } catch {
    return []
  }
}

export function saveRecent(kind: ColorKind, list: string[]): void {
  try {
    storage()?.setItem(recentKey(kind), JSON.stringify(list.slice(0, RECENT_LIMIT)))
  } catch {
    // remembered for this session only
  }
}

/**
 * The next swatch for an arrow / Home / End key in rows of different lengths, or null for other keys.
 * Left/right run through the rows like text, up/down keep the column where the row is long enough.
 */
export function moveInGrid(rowLengths: number[], position: GridPosition, key: string): GridPosition | null {
  const flat = rowLengths.flatMap((length, row) => Array.from({ length }, (_, col) => ({ row, col })))
  const index = flat.findIndex(cell => cell.row === position.row && cell.col === position.col)
  if (index === -1 || !flat.length) {
    return null
  }

  const rowAt = (row: number): GridPosition => ({ row, col: Math.min(position.col, rowLengths[row] - 1) })

  switch (key) {
    case 'ArrowRight':
      return flat[Math.min(index + 1, flat.length - 1)]
    case 'ArrowLeft':
      return flat[Math.max(index - 1, 0)]
    case 'ArrowDown':
      return position.row < rowLengths.length - 1 ? rowAt(position.row + 1) : position
    case 'ArrowUp':
      return position.row > 0 ? rowAt(position.row - 1) : position
    case 'Home':
      return { row: position.row, col: 0 }
    case 'End':
      return { row: position.row, col: rowLengths[position.row] - 1 }
    default:
      return null
  }
}

/**
 * Sets (or with null removes) the text or highlight color of the selection.
 * A preview (`history: false`) is left out of undo, so only applied colors become undo steps.
 */
export function writeColor(editor: Editor, kind: ColorKind, value: string | null, { history = true, focus = false } = {}): void {
  let chain = editor.chain()
  if (focus) {
    chain = chain.focus()
  }

  if (kind === 'text') {
    chain = value ? chain.setColor(value) : chain.unsetColor()
  } else {
    chain = value ? chain.setHighlight({ color: value }) : chain.unsetHighlight()
  }

  if (!history) {
    chain = chain.command(({ tr }) => {
      tr.setMeta('addToHistory', false)

      return true
    })
  }

  chain.run()
}
