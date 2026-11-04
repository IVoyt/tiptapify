export type DiffSegment = {
  type: 'equal' | 'insert' | 'delete',
  text: string,
}

// Above this many LCS cells (≈ 1000 × 1000 changed words) the middle part is shown
// as a plain delete + insert instead of a word-level diff, to keep the dialog responsive
const MAX_CELLS = 1_000_000

function tokenize(text: string): string[] {
  return text.trim().match(/\S+\s*/g) ?? []
}

function word(token: string): string {
  return token.trimEnd()
}

/**
 * A word diff of `revised` against `original`: words with their trailing whitespace,
 * the longest common subsequence after the common prefix and suffix are cut off.
 * Adjacent segments of one type are merged; deletions come before insertions.
 */
export function diffWords(original: string, revised: string): DiffSegment[] {
  const a = tokenize(original)
  const b = tokenize(revised)
  const segments: DiffSegment[] = []

  function push(type: DiffSegment['type'], text: string) {
    const last = segments[segments.length - 1]
    if (last?.type === type) {
      last.text += text
    } else {
      segments.push({ type, text })
    }
  }

  // An equal word keeps the whitespace after it from either side, so a deletion
  // right after the last word of the revision does not stick to it
  function pushEqual(i: number, j: number) {
    push('equal', /\s$/.test(b[j]) ? b[j] : a[i])
  }

  let start = 0
  while (start < a.length && start < b.length && word(a[start]) === word(b[start])) {
    start++
  }

  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && word(a[endA - 1]) === word(b[endB - 1])) {
    endA--
    endB--
  }

  for (let k = 0; k < start; k++) {
    pushEqual(k, k)
  }

  const n = endA - start
  const m = endB - start

  if (n * m > MAX_CELLS) {
    a.slice(start, endA).forEach(token => push('delete', token))
    b.slice(start, endB).forEach(token => push('insert', token))
  } else {
    // lengths[i * (m + 1) + j]: the LCS length of a[start + i..endA) and b[start + j..endB)
    const lengths = new Uint32Array((n + 1) * (m + 1))
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        lengths[i * (m + 1) + j] = word(a[start + i]) === word(b[start + j])
          ? lengths[(i + 1) * (m + 1) + j + 1] + 1
          : Math.max(lengths[(i + 1) * (m + 1) + j], lengths[i * (m + 1) + j + 1])
      }
    }

    let i = 0
    let j = 0
    while (i < n && j < m) {
      if (word(a[start + i]) === word(b[start + j])) {
        pushEqual(start + i, start + j)
        i++
        j++
      } else if (lengths[(i + 1) * (m + 1) + j] >= lengths[i * (m + 1) + j + 1]) {
        push('delete', a[start + i++])
      } else {
        push('insert', b[start + j++])
      }
    }
    while (i < n) {
      push('delete', a[start + i++])
    }
    while (j < m) {
      push('insert', b[start + j++])
    }
  }

  for (let k = 0; k < a.length - endA; k++) {
    pushEqual(endA + k, endB + k)
  }

  return segments
}

/** How much longer (positive) or shorter (negative) `revised` is, in whole percent; null without an original */
export function changePercent(original: string, revised: string): number | null {
  const before = original.trim().length
  if (!before) {
    return null
  }

  return Math.round((revised.trim().length - before) / before * 100)
}

export function formatChangePercent(percent: number): string {
  if (percent > 0) {
    return `+${percent}%`
  }

  return percent < 0 ? `−${-percent}%` : '0%'
}
