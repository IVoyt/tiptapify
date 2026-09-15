import { afterEach, describe, expect, it, vi } from 'vitest'
import { hotkeyParts, isMac } from './hotkeys'

const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const LINUX_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

function mockUserAgent (userAgent: string) {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  })
}

function expectIcon (part: { icon?: string }): void {
  expect(part.icon).toBeDefined()
  expect(part.icon).toContain('mdiSvg:')
}

describe('isMac', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns true for macOS user agent', () => {
    mockUserAgent(MAC_UA)
    expect(isMac()).toBe(true)
  })

  it('returns true for Apple mobile user agents', () => {
    mockUserAgent(IPHONE_UA)
    expect(isMac()).toBe(true)
  })

  it('returns false for Windows user agent', () => {
    mockUserAgent(WIN_UA)
    expect(isMac()).toBe(false)
  })

  it('returns false for Linux user agent', () => {
    mockUserAgent(LINUX_UA)
    expect(isMac()).toBe(false)
  })

  it('returns false when navigator is unavailable', () => {
    vi.stubGlobal('navigator', undefined)
    expect(isMac()).toBe(false)
  })
})

describe('hotkeyParts', () => {
  it('renders Mod as Ctrl text on Windows', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-b')).toEqual([
      { label: 'Ctrl' },
      { label: 'B' },
    ])
  })

  it('renders Mod as the Command icon on macOS', () => {
    mockUserAgent(MAC_UA)
    const parts = hotkeyParts('Mod-Shift-b')
    expect(parts).toHaveLength(3)
    expect(parts[0].label).toBe('Command')
    expectIcon(parts[0])
    expect(parts[1].label).toBe('Shift')
    expectIcon(parts[1])
    expect(parts[2]).toEqual({ label: 'B' })
  })

  it('renders Alt as text on Windows and Linux', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-Alt-c')).toEqual([
      { label: 'Ctrl' },
      { label: 'Alt' },
      { label: 'C' },
    ])
    mockUserAgent(LINUX_UA)
    expect(hotkeyParts('Mod-Alt-c')).toEqual([
      { label: 'Ctrl' },
      { label: 'Alt' },
      { label: 'C' },
    ])
  })

  it('renders Alt as the Option icon on macOS', () => {
    mockUserAgent(MAC_UA)
    const parts = hotkeyParts('Mod-Alt-c')
    expect(parts[0].label).toBe('Command')
    expectIcon(parts[0])
    expect(parts[1].label).toBe('Option')
    expectIcon(parts[1])
    expect(parts[2]).toEqual({ label: 'C' })
  })

  it('renders Enter as the return icon on macOS', () => {
    mockUserAgent(MAC_UA)
    const parts = hotkeyParts('Mod-Enter')
    expect(parts[0].label).toBe('Command')
    expectIcon(parts[0])
    expect(parts[1].label).toBe('Enter')
    expectIcon(parts[1])
  })

  it('renders Enter as text on Windows', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-Enter')).toEqual([
      { label: 'Ctrl' },
      { label: 'Enter' },
    ])
  })

  it('preserves modifier order', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-Shift-s')).toEqual([
      { label: 'Ctrl' },
      { label: 'Shift' },
      { label: 'S' },
    ])
  })

  it('keeps punctuation keys as is', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-,').map(part => part.label)).toEqual(['Ctrl', ','])
    expect(hotkeyParts('Mod-.').map(part => part.label)).toEqual(['Ctrl', '.'])
  })

  it('renders numeric ranges with a dash', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-Alt-1..6')).toEqual([
      { label: 'Ctrl' },
      { label: 'Alt' },
      { label: '1–6' },
    ])
  })

  it('renders digits as is', () => {
    mockUserAgent(WIN_UA)
    expect(hotkeyParts('Mod-Shift-8')).toEqual([
      { label: 'Ctrl' },
      { label: 'Shift' },
      { label: '8' },
    ])
  })
})
