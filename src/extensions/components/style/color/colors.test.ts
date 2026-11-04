import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Highlight } from '@tiptap/extension-highlight'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { UndoRedo } from '@tiptap/extensions'
import {
  addRecent,
  loadRecent,
  moveInGrid,
  normalizeHex,
  palettes,
  RECENT_LIMIT,
  sameColor,
  saveRecent,
  writeColor,
} from '@tiptapify/extensions/components/style/color/colors'

describe('palettes', () => {
  it('start with the cell that removes the color, then rows of at most 8 valid colors', () => {
    for (const rows of Object.values(palettes)) {
      expect(rows[0][0].value).toBeNull()

      const colors = rows.flat().slice(1).map(swatch => swatch.value)
      expect(colors.every(color => normalizeHex(color) === color)).toBe(true)
      expect(new Set(colors).size).toBe(colors.length)
      expect(rows.every(row => row.length <= 8)).toBe(true)
    }
  })

  it('name every swatch', () => {
    const names = Object.values(palettes).flat(2).map(swatch => swatch.name)

    expect(names.every(Boolean)).toBe(true)
    expect(names).toContain('default')
    expect(names).toContain('no_highlight')
    expect(names).toContain('names.dark_red')
  })
})

describe('normalizeHex', () => {
  it.each([
    ['#abc', '#aabbcc'],
    ['#AABBCC', '#aabbcc'],
    [' #0f0 ', '#00ff00'],
    ['1D4ED8', '#1d4ed8'],
  ])('reads %s as %s', (input, expected) => {
    expect(normalizeHex(input)).toBe(expected)
  })

  it.each(['', '#', '#ab', '#abcd', '#abcdeg', 'red', 'rgb(0, 0, 0)', null, undefined])('rejects %s', input => {
    expect(normalizeHex(input)).toBeNull()
  })
})

describe('sameColor', () => {
  it('compares hex colors in any notation and other colors as text', () => {
    expect(sameColor('#FFF', '#ffffff')).toBe(true)
    expect(sameColor('#fff', '#fffffe')).toBe(false)
    expect(sameColor('rgb(0, 0, 0)', 'RGB(0, 0, 0)')).toBe(true)
    expect(sameColor('rgb(0, 0, 0)', '#000000')).toBe(false)
  })
})

describe('recent colors', () => {
  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('puts the newest first without duplicates and keeps the limit', () => {
    let list: string[] = []
    for (let index = 0; index < RECENT_LIMIT + 2; index++) {
      list = addRecent(list, `#00000${index}`)
    }

    expect(list).toHaveLength(RECENT_LIMIT)
    expect(list[0]).toBe('#000009')
    expect(addRecent(list, '#000005')[0]).toBe('#000005')
    expect(addRecent(list, '#000005')).toHaveLength(RECENT_LIMIT)
    expect(addRecent(['#aabbcc'], '#ABC')).toEqual(['#aabbcc'])
    expect(addRecent(['#aabbcc'], 'nope')).toEqual(['#aabbcc'])
  })

  it('are remembered per kind', () => {
    saveRecent('text', ['#b91c1c', '#1d4ed8'])

    expect(loadRecent('text')).toEqual(['#b91c1c', '#1d4ed8'])
    expect(loadRecent('highlight')).toEqual([])
  })

  it('skip junk in storage', () => {
    localStorage.setItem('tiptapify:recent-colors:text', JSON.stringify(['#ABC', 'red', 42, '#aabbcc']))
    expect(loadRecent('text')).toEqual(['#aabbcc'])

    localStorage.setItem('tiptapify:recent-colors:text', '{broken')
    expect(loadRecent('text')).toEqual([])

    localStorage.setItem('tiptapify:recent-colors:text', '{"a":1}')
    expect(loadRecent('text')).toEqual([])
  })

  it('work without storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })

    expect(() => saveRecent('text', ['#000000'])).not.toThrow()
    expect(loadRecent('text')).toEqual([])
  })
})

describe('moveInGrid', () => {
  const rows = [3, 8, 8]

  it('runs left/right through the rows like text', () => {
    expect(moveInGrid(rows, { row: 0, col: 2 }, 'ArrowRight')).toEqual({ row: 1, col: 0 })
    expect(moveInGrid(rows, { row: 1, col: 0 }, 'ArrowLeft')).toEqual({ row: 0, col: 2 })
    expect(moveInGrid(rows, { row: 0, col: 0 }, 'ArrowLeft')).toEqual({ row: 0, col: 0 })
    expect(moveInGrid(rows, { row: 2, col: 7 }, 'ArrowRight')).toEqual({ row: 2, col: 7 })
  })

  it('keeps the column up/down where the row is long enough', () => {
    expect(moveInGrid(rows, { row: 1, col: 6 }, 'ArrowDown')).toEqual({ row: 2, col: 6 })
    expect(moveInGrid(rows, { row: 1, col: 6 }, 'ArrowUp')).toEqual({ row: 0, col: 2 })
    expect(moveInGrid(rows, { row: 0, col: 1 }, 'ArrowUp')).toEqual({ row: 0, col: 1 })
    expect(moveInGrid(rows, { row: 2, col: 1 }, 'ArrowDown')).toEqual({ row: 2, col: 1 })
  })

  it('jumps to the row ends with Home/End and ignores other keys', () => {
    expect(moveInGrid(rows, { row: 1, col: 4 }, 'Home')).toEqual({ row: 1, col: 0 })
    expect(moveInGrid(rows, { row: 1, col: 4 }, 'End')).toEqual({ row: 1, col: 7 })
    expect(moveInGrid(rows, { row: 1, col: 4 }, 'a')).toBeNull()
    expect(moveInGrid(rows, { row: 5, col: 0 }, 'ArrowRight')).toBeNull()
  })
})

describe('writeColor', () => {
  let editor: Editor

  function makeEditor(content: string): Editor {
    editor = new Editor({
      element: document.createElement('div'),
      content,
      extensions: [Document, Paragraph, Text, TextStyleKit, Highlight.configure({ multicolor: true }), UndoRedo],
    })
    editor.commands.selectAll()

    return editor
  }

  afterEach(() => editor?.destroy())

  it('sets and removes the text color', () => {
    makeEditor('<p>Hello</p>')

    writeColor(editor, 'text', '#b91c1c')
    expect(editor.getAttributes('textStyle').color).toBe('#b91c1c')

    writeColor(editor, 'text', null)
    expect(editor.getAttributes('textStyle').color).toBeFalsy()
  })

  it('sets and removes the highlight', () => {
    makeEditor('<p>Hello</p>')

    writeColor(editor, 'highlight', '#fde68a')
    expect(editor.getAttributes('highlight').color).toBe('#fde68a')

    writeColor(editor, 'highlight', null)
    expect(editor.isActive('highlight')).toBe(false)
  })

  it('keeps previews out of undo', () => {
    makeEditor('<p><span style="color: #1d4ed8">Hello</span></p>')

    writeColor(editor, 'text', '#b91c1c', { history: false })
    expect(editor.getAttributes('textStyle').color).toBe('#b91c1c')
    expect(editor.can().undo()).toBe(false)

    writeColor(editor, 'text', '#1d4ed8', { history: false })
    writeColor(editor, 'text', '#15803d')
    editor.commands.undo()
    expect(editor.getAttributes('textStyle').color).toBe('#1d4ed8')
  })
})
