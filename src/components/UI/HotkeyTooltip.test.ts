import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import HotkeyTooltip from './HotkeyTooltip.vue'

const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

function mockUserAgent (userAgent: string) {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  })
}

function renderTooltip (label: string, hotkey: string): Promise<string> {
  const app = createSSRApp({
    render: () => h(HotkeyTooltip, { label, hotkey })
  })
  app.use(createVuetify())

  return renderToString(app)
}

describe('HotkeyTooltip', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders label and spelled-out hotkey on two lines on Windows', async () => {
    mockUserAgent(WIN_UA)
    const html = await renderTooltip('Bold', 'Mod-Shift-b')

    expect(html).toContain('t-hotkey-tooltip__label')
    expect(html).toContain('t-hotkey-tooltip__hotkey')
    expect(html).toContain('Bold')
    expect(html).toContain('Ctrl')
    expect(html).toContain('Shift')
    expect(html).toContain('>B</span>')
    expect(html).not.toContain('mdiSvg:')
  })

  it('renders the hotkey with icons on macOS without spelled-out names', async () => {
    mockUserAgent(MAC_UA)
    const html = await renderTooltip('Heading', 'Mod-Alt-1..6')

    expect(html).toContain('t-hotkey-tooltip__label')
    expect(html).toContain('t-hotkey-tooltip__hotkey')
    expect(html).toContain('Heading')
    expect(html).toContain('mdiSvg:')
    expect(html).toContain('1–6')
    expect(html).not.toContain('Ctrl')
    expect(html).not.toContain('>Command<')
    expect(html).not.toContain('>Option<')
  })

  it('renders Enter as an icon on macOS', async () => {
    mockUserAgent(MAC_UA)
    const html = await renderTooltip('Hard break', 'Mod-Enter')

    expect(html).toContain('mdiSvg:')
    expect(html).not.toContain('>Enter<')
  })
})
