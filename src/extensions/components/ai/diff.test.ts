import { describe, expect, it } from 'vitest'
import { changePercent, diffWords, formatChangePercent } from './diff'

function render(original: string, revised: string) {
  return diffWords(original, revised)
    .map(({ type, text }) => (type === 'equal' ? text : type === 'insert' ? `[+${text}]` : `[-${text}]`))
    .join('')
}

describe('diffWords', () => {
  it('marks a replaced word as a deletion followed by an insertion', () => {
    expect(render('the quick fox', 'the slow fox')).toBe('the [-quick ][+slow ]fox')
  })

  it('marks added and removed words', () => {
    expect(render('a b c', 'a c d')).toBe('a [-b ]c [+d]')
  })

  it('keeps the revised text when only the equal parts are joined with insertions', () => {
    const revised = 'Completely new wording here'
    const segments = diffWords('Some old text', revised)

    expect(segments.filter(s => s.type !== 'delete').map(s => s.text).join('')).toBe(revised)
    expect(segments.filter(s => s.type !== 'insert').map(s => s.text.trim()).join(' ')).toBe('Some old text')
  })

  it('keeps a space before a deleted last word', () => {
    expect(render('fox jumps', 'fox')).toBe('fox [-jumps]')
  })

  it('compares words regardless of the whitespace around them', () => {
    expect(diffWords('one\ntwo', ' one two ')).toEqual([{ type: 'equal', text: 'one two' }])
  })

  it('handles empty sides', () => {
    expect(diffWords('', 'new text')).toEqual([{ type: 'insert', text: 'new text' }])
    expect(diffWords('old', '')).toEqual([{ type: 'delete', text: 'old' }])
    expect(diffWords('', '')).toEqual([])
  })

  it('falls back to a whole delete and insert for a very large change', () => {
    const original = Array.from({ length: 1200 }, (_, i) => `a${i}`).join(' ')
    const revised = Array.from({ length: 1200 }, (_, i) => `b${i}`).join(' ')

    expect(diffWords(original, revised).map(s => s.type)).toEqual(['delete', 'insert'])
  })
})

describe('changePercent', () => {
  it('is the length change against the original in whole percent', () => {
    expect(changePercent('1234567890', '12345')).toBe(-50)
    expect(changePercent('abc', 'abcd')).toBe(33)
    expect(changePercent(' abc ', 'abc')).toBe(0)
  })

  it('is null without an original', () => {
    expect(changePercent('  ', 'text')).toBeNull()
  })

  it('formats with a sign', () => {
    expect(formatChangePercent(12)).toBe('+12%')
    expect(formatChangePercent(-8)).toBe('−8%')
    expect(formatChangePercent(0)).toBe('0%')
  })
})
