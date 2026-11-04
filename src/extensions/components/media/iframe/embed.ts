import { MediaSize, toSize } from '@tiptapify/utils/mediaSize'
import { isValidHref } from '@tiptapify/utils/validateHref'

export const ratioPresets = ['16:9', '4:3', '1:1'] as const

export type IframeSizeMode = 'responsive' | 'custom' | typeof ratioPresets[number]

/**
 * The iframe node attributes. `ratio` makes the iframe fill the text width: a preset (`16:9`) or `auto`
 * (responsive: the proportions of its width and height, else 16:9); without it the width and height are its size.
 */
export type IframeAttrs = {
  src: string
  title: string | null
  name: string | null
  allow: string | null
  sandbox: string | null
  loading: string | null
  allowfullscreen: boolean
  border: boolean
  ratio: string | null
  width: number | null
  height: number | null
}

// The attributes a pasted <iframe> code has
export type ParsedIframe = Partial<IframeAttrs> & { src: string }

export type EmbedInput =
  | { kind: 'empty' }
  | { kind: 'url', src: string }
  | { kind: 'code', iframe: ParsedIframe }
  | { kind: 'invalid_code' }

export type SrcError = 'required' | 'protocol' | 'invalid'

export type IframeSize = { mode: IframeSizeMode, width: number | null, height: number | null }

// Elements an embed code may wrap its iframe in (a responsive box); anything else is not a single iframe
const wrapperTags = new Set(['DIV', 'P', 'SPAN', 'FIGURE'])

const ratioRegex = /^(auto|\d+:\d+)$/

const borderStyle = 'border: 1px solid rgba(128, 128, 128, 0.5)'

// A size in pixels (`600`, `600px`); not a percentage, which `toSize` would read as pixels
export function pixelSize(value: unknown): number | null {
  return typeof value === 'number' || /^\s*\d+(\.\d+)?(px)?\s*$/i.test(String(value ?? '')) ? toSize(value) : null
}

export function parseRatio(value: string | null): string | null {
  return value && ratioRegex.test(value.trim()) ? value.trim() : null
}

// Whether the iframe shows a border: by its style, else by the deprecated `frameborder`; null when neither says
export function readBorder(element: HTMLElement): boolean | null {
  const { border, borderStyle, borderWidth } = element.style
  if (border || borderStyle || borderWidth) {
    return !['none', 'hidden'].includes(borderStyle) && parseFloat(borderWidth || border) !== 0 && border !== 'none'
  }

  const frameborder = element.getAttribute('frameborder')
  if (frameborder !== null) {
    return !['0', 'no'].includes(frameborder.trim().toLowerCase())
  }

  return null
}

function readText(element: Element, name: string): string | undefined {
  return element.getAttribute(name)?.trim() || undefined
}

function readIframe(element: HTMLIFrameElement): ParsedIframe {
  const iframe: ParsedIframe = { src: readText(element, 'src') ?? '' }
  const width = pixelSize(element.getAttribute('width'))
  const height = pixelSize(element.getAttribute('height'))
  if (width && height) {
    Object.assign(iframe, { width, height })
  }

  for (const name of ['title', 'name', 'allow', 'loading'] as const) {
    const value = readText(element, name)
    if (value) {
      iframe[name] = value
    }
  }

  // An empty sandbox is the strictest one, not a missing one
  if (element.hasAttribute('sandbox')) {
    iframe.sandbox = element.getAttribute('sandbox')!.trim()
  }

  iframe.allowfullscreen = element.hasAttribute('allowfullscreen')

  const border = readBorder(element)
  if (border !== null) {
    iframe.border = border
  }

  return iframe
}

// The iframe of an embed code that is a single iframe with an address (maybe in wrapper boxes), else null
function singleIframe(code: string): HTMLIFrameElement | null {
  // A parsed document is inert: its scripts do not run and nothing loads
  const doc = new DOMParser().parseFromString(code, 'text/html')
  const iframes = doc.body.querySelectorAll('iframe')
  if (iframes.length !== 1 || doc.head.childElementCount > 0) {
    return null
  }

  const iframe = iframes[0]
  const others = [...doc.body.querySelectorAll('*')].filter(element => element !== iframe)
  if (others.some(element => !wrapperTags.has(element.tagName) || !element.contains(iframe))) {
    return null
  }

  iframe.remove()

  return doc.body.textContent!.trim() === '' && readText(iframe, 'src') ? iframe : null
}

/**
 * The "Link or embed code" field: an address, or a pasted `<iframe …>` code read into its attributes.
 */
export function parseEmbedInput(value: string): EmbedInput {
  const text = value.trim()
  if (!text) {
    return { kind: 'empty' }
  }

  if (!text.startsWith('<')) {
    return { kind: 'url', src: text }
  }

  const iframe = singleIframe(text)

  return iframe ? { kind: 'code', iframe: readIframe(iframe) } : { kind: 'invalid_code' }
}

/**
 * An iframe needs a web address with its protocol, which is never guessed: an address without one
 * (`example.com/embed`, `//example.com/embed`) asks for it.
 */
export function srcError(src: string): SrcError | null {
  if (!src) {
    return 'required'
  }

  if (/^https?:\/\//i.test(src) && isValidHref(src)) {
    return null
  }

  const bare = src.replace(/^\/\//, '')
  // A scheme, not a host and a port (`localhost:8080`)
  const hasScheme = /^[a-z][a-z0-9+.-]*:(?!\d)/i.test(bare)

  return !hasScheme && isValidHref(`https://${bare}`) ? 'protocol' : 'invalid'
}

// The fields a parsed code filled, for the line under the field
export function parsedFields(iframe: ParsedIframe): Array<{ key: string, params?: Record<string, number> }> {
  const fields: Array<{ key: string, params?: Record<string, number> }> = [{ key: 'parsed_src' }]

  if (iframe.width && iframe.height) {
    fields.push({ key: 'parsed_size', params: { width: iframe.width, height: iframe.height } })
  }

  for (const name of ['title', 'name', 'allow', 'sandbox'] as const) {
    if (iframe[name] !== undefined) {
      fields.push({ key: `parsed_${name}` })
    }
  }

  if (iframe.loading === 'lazy') {
    fields.push({ key: 'parsed_loading' })
  }

  if (iframe.allowfullscreen) {
    fields.push({ key: 'parsed_fullscreen' })
  }

  return fields
}

/**
 * The dialog's size of a node: a ratio preset, responsive (its size gives the proportions) or custom.
 * A node with only a width and a height is custom; without a size it is responsive.
 */
export function sizeFromAttrs({ ratio, width, height }: Pick<IframeAttrs, 'ratio' | 'width' | 'height'>): IframeSize {
  const size = { width: pixelSize(width), height: pixelSize(height) }

  if (ratioPresets.includes(ratio as typeof ratioPresets[number])) {
    return { mode: ratio as IframeSizeMode, ...size }
  }

  return { mode: !ratio && size.width ? 'custom' : 'responsive', ...size }
}

// The node attributes of a size; responsive keeps the known size, for its proportions
export function sizeToAttrs(mode: IframeSizeMode, size: MediaSize, known: MediaSize): Pick<IframeAttrs, 'ratio' | 'width' | 'height'> {
  if (mode === 'custom') {
    return { ratio: null, ...size }
  }

  if (mode === 'responsive') {
    return known.width && known.height ? { ratio: 'auto', ...known } : { ratio: 'auto', width: null, height: null }
  }

  return { ratio: mode, width: null, height: null }
}

// The proportions a responsive or preset size renders in (`16 / 9`), null for a custom size
export function aspectRatio({ ratio, width, height }: Pick<IframeAttrs, 'ratio' | 'width' | 'height'>): string | null {
  if (ratio !== 'auto') {
    return ratio ? ratio.replace(':', ' / ') : null
  }

  const known = { width: pixelSize(width), height: pixelSize(height) }

  return known.width && known.height ? `${known.width} / ${known.height}` : '16 / 9'
}

/**
 * The inline style of the iframe, so a site shows it without the editor's styles or scripts: the
 * proportions of a size filling the text width, and the border (instead of the deprecated `frameborder`).
 */
export function iframeStyle(attrs: Pick<IframeAttrs, 'ratio' | 'width' | 'height' | 'border'>): string {
  const aspect = aspectRatio(attrs)
  const rules = aspect ? ['width: 100%', 'height: auto', `aspect-ratio: ${aspect}`] : []

  rules.push(attrs.border ? borderStyle : 'border: 0')

  return `${rules.join('; ')};`
}
