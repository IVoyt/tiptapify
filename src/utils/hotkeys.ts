import * as mdi from '@mdi/js'

export interface HotkeyPart {
  icon?: string
  label: string
}

/**
 * Detects whether the current platform is macOS (or an Apple mobile device).
 * Returns false in non-browser environments (SSR, tests).
 */
export function isMac (): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }

  return /mac|iphone|ipad|ipod/i.test(navigator.userAgent)
}

function partForKey (key: string, mac: boolean): HotkeyPart {
  const normalized = key.toLowerCase()

  if (normalized === 'mod') {
    return mac
      ? { label: 'Command', icon: `mdiSvg:${mdi.mdiAppleKeyboardCommand}` }
      : { label: 'Ctrl' }
  }
  if (normalized === 'shift') {
    return mac
      ? { label: 'Shift', icon: `mdiSvg:${mdi.mdiAppleKeyboardShift}` }
      : { label: 'Shift' }
  }
  if (normalized === 'alt') {
    return mac
      ? { label: 'Option', icon: `mdiSvg:${mdi.mdiAppleKeyboardOption}` }
      : { label: 'Alt' }
  }
  if (normalized === 'enter') {
    return mac
      ? { label: 'Enter', icon: `mdiSvg:${mdi.mdiKeyboardReturn}` }
      : { label: 'Enter' }
  }

  // numeric ranges in "1..6" format are rendered as "1–6"
  const range = normalized.match(/^(\d+)\.\.(\d+)$/)
  if (range) {
    return { label: `${range[1]}–${range[2]}` }
  }

  return { label: key.toUpperCase() }
}

/**
 * Converts a Tiptap-style shortcut string ("Mod-Shift-b", "Mod-Alt-1..6")
 * into display parts for the current platform. On macOS modifier keys
 * get their Apple keyboard glyphs (⌘ ⌥ ⇧ ⏎), on other platforms
 * everything is rendered as text.
 */
export function hotkeyParts (shortcut: string): HotkeyPart[] {
  const mac = isMac()

  return shortcut
    .split('-')
    .map(key => partForKey(key, mac))
}
