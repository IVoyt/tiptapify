export type MediaSize = { width: number | null, height: number | null }

// A positive whole number from a number field or an attribute, else null
export function toSize(value: unknown): number | null {
  const number = typeof value === 'number' ? value : parseFloat(String(value ?? ''))

  return Number.isFinite(number) && number > 0 ? Math.round(number) : null
}

/**
 * The size after one side changed: with a ratio (width / height) the other side follows it.
 */
export function resizeSide(size: MediaSize, side: keyof MediaSize, value: unknown, ratio: number | null): MediaSize {
  const changed = toSize(value)
  if (!ratio || !changed) {
    return { ...size, [side]: changed }
  }

  return side === 'width'
    ? { width: changed, height: toSize(changed / ratio) }
    : { width: toSize(changed * ratio), height: changed }
}

// The ratio (width / height) of a size with both sides, else the fallback
export function ratioOf(size: MediaSize, fallback: number): number {
  return size.width && size.height ? size.width / size.height : fallback
}
