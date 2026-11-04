import { describe, expect, it } from 'vitest'
import { ratioOf, resizeSide, toSize } from '@tiptapify/utils/mediaSize'

describe('media size', () => {
  it('reads a size as a whole positive number', () => {
    expect(toSize('640')).toBe(640)
    expect(toSize(359.6)).toBe(360)
    expect(toSize('')).toBeNull()
    expect(toSize(-5)).toBeNull()
  })

  it('keeps the other side in the ratio when one side changes', () => {
    expect(resizeSide({ width: 640, height: 360 }, 'width', 1280, 16 / 9)).toEqual({ width: 1280, height: 720 })
    expect(resizeSide({ width: 640, height: 360 }, 'height', 450, 16 / 9)).toEqual({ width: 800, height: 450 })
    expect(resizeSide({ width: 640, height: 360 }, 'width', 800, null)).toEqual({ width: 800, height: 360 })
  })

  it('takes the ratio of the size, else of the fallback', () => {
    expect(ratioOf({ width: 400, height: 300 }, 16 / 9)).toBe(4 / 3)
    expect(ratioOf({ width: 400, height: null }, 16 / 9)).toBe(16 / 9)
  })
})
