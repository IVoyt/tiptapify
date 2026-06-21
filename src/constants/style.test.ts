import { describe, it, expect, beforeEach } from 'vitest'
import { setHeadingLevels, headingLevels, fontSizes, defaultFontSize, lineHeights, defaultLineHeight } from './style'

describe('style constants', () => {
  beforeEach(() => {
    headingLevels.value = [1, 2, 3, 4, 5, 6]
  })

  it('sets custom heading levels', () => {
    setHeadingLevels([2, 3, 4])
    expect(headingLevels.value).toEqual([2, 3, 4])
  })

  it('does not change heading levels on empty array', () => {
    setHeadingLevels([])
    expect(headingLevels.value).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('rejects levels below 1', () => {
    expect(() => setHeadingLevels([0])).toThrow('customHeadingLevels must be between 1 and 6')
  })

  it('rejects levels above 6', () => {
    expect(() => setHeadingLevels([7])).toThrow('customHeadingLevels must be between 1 and 6')
  })

  it('rejects any invalid level in a mixed array', () => {
    expect(() => setHeadingLevels([1, 2, 7])).toThrow('customHeadingLevels must be between 1 and 6')
  })

  it('has valid fontSizes constant', () => {
    expect(fontSizes).toContain(12)
    expect(fontSizes).toContain(6)
    expect(fontSizes).toContain(96)
  })

  it('has valid defaultFontSize', () => {
    expect(defaultFontSize).toBe(12)
  })

  it('has valid lineHeights constant', () => {
    expect(lineHeights).toContain(1)
    expect(lineHeights).toContain(4)
  })

  it('has valid defaultLineHeight', () => {
    expect(defaultLineHeight).toBe(1)
  })
})
