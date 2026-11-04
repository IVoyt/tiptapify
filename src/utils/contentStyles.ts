/*
 * The look of the content the editor saves (link cards, captions, videos, embeds, task lists), described once
 * for the `contentStyles` prop: `inline` writes it into `style` attributes (inlineContentStyles), `classes`
 * leaves it to `tiptapify/content.css` (contentCss) around content in a `.tiptapify-content` element.
 * Colors are left to the site: muted text and borders use opacity, so they suit a light and a dark theme alike.
 * The editor parses its elements by attributes and classes only, so these styles are ignored on load.
 */

// No dependencies: the build imports this file to write dist/content.css

export type TiptapifyContentStyles = 'inline' | 'classes'

export type ContentRule = { selector: string, style: Record<string, string> }

export const CONTENT_CLASS = 'tiptapify-content'

const muted = '0.7'
const border = '1px solid rgba(128, 128, 128, 0.35)'
const responsive = { width: '100%', height: 'auto', 'aspect-ratio': '16 / 9' }

// In order: a later rule wins over an earlier one for the same property
export const contentRules: ContentRule[] = [
  // Link cards: compact (the image beside the texts, under them when narrow), large (image on top), text
  {
    selector: '.tiptapify-link-card',
    style: {
      display: 'flex',
      'flex-wrap': 'wrap',
      overflow: 'hidden',
      margin: '1rem 0',
      border,
      'border-radius': '10px',
      color: 'inherit',
      'text-decoration': 'none',
    },
  },
  {
    selector: '.tiptapify-link-card__image',
    // min-width 0: an image in a row would not shrink below its own width (an OpenGraph image is 1200px)
    style: { flex: '1 1 180px', 'min-width': '0', 'max-width': '100%', 'min-height': '100px', margin: '0', 'object-fit': 'cover' },
  },
  {
    selector: '.tiptapify-link-card__body',
    style: { display: 'flex', flex: '999 1 260px', 'flex-direction': 'column', gap: '4px', 'min-width': '0', padding: '12px 16px' },
  },
  { selector: '.tiptapify-link-card__site', style: { 'font-size': '0.8125em', opacity: muted } },
  { selector: '.tiptapify-link-card__title', style: { 'font-weight': '600', 'line-height': '1.35' } },
  {
    selector: '.tiptapify-link-card__description',
    style: {
      display: '-webkit-box',
      overflow: 'hidden',
      'font-size': '0.875em',
      'line-height': '1.45',
      opacity: muted,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '3',
    },
  },
  {
    selector: '.tiptapify-link-card[data-link-card="large"]',
    style: { 'flex-direction': 'column', 'flex-wrap': 'nowrap', 'max-width': '520px' },
  },
  {
    selector: '.tiptapify-link-card[data-link-card="large"] .tiptapify-link-card__image',
    style: { flex: 'none', width: '100%', height: 'auto', 'min-height': '0', 'aspect-ratio': '1.91 / 1' },
  },
  { selector: '.tiptapify-link-card[data-link-card="large"] .tiptapify-link-card__body', style: { flex: 'none' } },

  // Images with their caption under them: centered, or floated left or right with the text around them
  {
    selector: 'figure',
    style: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '4px',
      width: 'fit-content',
      'max-width': '100%',
      margin: '1rem auto',
    },
  },
  { selector: 'figure:not([data-align])', style: { 'align-items': 'center' } },
  { selector: 'figure img', style: { display: 'block', 'max-width': '100%', height: 'auto', margin: '0' } },
  { selector: 'figure figcaption', style: { 'font-size': '0.875em', opacity: muted, 'text-align': 'center' } },
  { selector: 'figure[data-align] figcaption', style: { 'text-align': 'start' } },
  {
    selector: 'figure[data-align="left"]',
    style: { float: 'left', 'max-width': '50%', margin: '0.25rem 1.25rem 1rem 0' },
  },
  {
    selector: 'figure[data-align="right"]',
    style: { float: 'right', 'max-width': '50%', margin: '0.25rem 0 1rem 1.25rem' },
  },

  // Videos and embeds: never wider than the text; without a size they fill its width at 16:9
  { selector: 'video', style: { display: 'block', 'max-width': '100%' } },
  { selector: 'video:not([width])', style: responsive },
  { selector: 'div[data-youtube-video] iframe', style: { display: 'block', 'max-width': '100%', border: '0' } },
  { selector: 'div[data-youtube-video] iframe:not([width])', style: responsive },
  { selector: '.iframe-wrapper iframe', style: { display: 'block', 'max-width': '100%' } },
  { selector: '.iframe-wrapper iframe[src^="https://player.vimeo.com/"]:not([width])', style: responsive },

  // Task lists: a checkbox beside each item instead of a bullet
  { selector: 'ul[data-type="taskList"]', style: { 'list-style': 'none', 'margin-left': '0', padding: '0' } },
  { selector: 'ul[data-type="taskList"] ul[data-type="taskList"]', style: { margin: '0' } },
  { selector: 'ul[data-type="taskList"] > li', style: { display: 'flex', 'align-items': 'flex-start' } },
  { selector: 'ul[data-type="taskList"] > li > label', style: { flex: '0 0 auto', 'margin-right': '0.5rem' } },
  { selector: 'ul[data-type="taskList"] > li > div', style: { flex: '1 1 auto' } },
  // The text of a task sits on the line of its checkbox: no default margin of the paragraph above it
  { selector: 'ul[data-type="taskList"] > li > div > p', style: { margin: '0' } },
]

function declarations(style: Record<string, string>): string {
  return Object.entries(style).map(([property, value]) => `${property}: ${value};`).join(' ')
}

/**
 * The rules as a stylesheet for the content inside `scope`. For a site the scope is wrapped in `:where()`, so
 * any rule of the site wins over these without `!important`; the editor keeps the scope's own weight.
 */
export function contentCss(scope = `.${CONTENT_CLASS}`, { weightless = true }: { weightless?: boolean } = {}): string {
  const prefix = weightless ? `:where(${scope})` : scope

  return contentRules.map(({ selector, style }) => `${prefix} ${selector} { ${declarations(style)} }`).join('\n') + '\n'
}

function parseStyle(style: string): Map<string, string> {
  const properties = new Map<string, string>()
  for (const declaration of style.split(';')) {
    const colon = declaration.indexOf(':')
    if (colon > 0) {
      properties.set(declaration.slice(0, colon).trim().toLowerCase(), declaration.slice(colon + 1).trim())
    }
  }

  return properties
}

/**
 * The content HTML with the rules written into its `style` attributes. Other properties an element has (the
 * float of an image) are kept and the rules' own are overwritten, so applying it twice changes nothing.
 * Without a DOM (server rendering) the HTML is returned as it is.
 */
export function inlineContentStyles(html: string): string {
  if (typeof document === 'undefined' || !html) {
    return html
  }

  // The content of a template is inert: no script runs and no image loads while the HTML is restyled
  const template = document.createElement('template')
  template.innerHTML = html
  const styles = new Map<Element, Map<string, string>>()

  for (const { selector, style } of contentRules) {
    for (const element of template.content.querySelectorAll(selector)) {
      const properties = styles.get(element) ?? parseStyle(element.getAttribute('style') ?? '')
      for (const [property, value] of Object.entries(style)) {
        properties.delete(property)
        properties.set(property, value)
      }
      styles.set(element, properties)
    }
  }

  for (const [element, properties] of styles) {
    element.setAttribute('style', [...properties].map(([property, value]) => `${property}: ${value};`).join(' '))
  }

  return template.innerHTML
}

/** The HTML the editor gives out: with the styles written in, or as it is for a site with content.css */
export function contentHTML(html: string, mode: TiptapifyContentStyles): string {
  return mode === 'inline' ? inlineContentStyles(html) : html
}
