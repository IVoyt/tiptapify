/*
 * Record the normative skin baseline for 0.3.4.
 *
 * Measures the computed styles of every skin token dimension for the built-in
 * skins (default, pastel) in both Vuetify themes (light, dark) on the docs
 * playground (docs/examples/skins.md), via the shared in-page bundle
 * scripts/skin-baseline-bundle.js, and writes the fixture
 * src/skins/__fixtures__/skin-baseline.json.
 *
 * The fixture is the acceptance criterion for the skin CSS rewrite (spec
 * docs/superpowers/specs/2026-10-18-skins-design.md, "Normative baseline"):
 * every recorded value is canonical. It is recorded once on the base CSS and
 * must not change in 0.3.4 unless a deliberate visual change ships with a
 * changelog note.
 *
 * Prerequisites:
 *   1. pnpm docs:dev                       # vitepress on http://localhost:5173/tiptapify/
 *   2. a Chrome with CDP on :9222, e.g.    # any Chrome works, headless included:
 *      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *        --headless=new --remote-debugging-port=9222 --user-data-dir=/tmp/tiptapify-baseline about:blank &
 *   3. Node >= 21/22 for the global WebSocket this script uses (repo engines.node
 *      is >=18; the script is dev-only, not part of the shipped package).
 *   Note: headless Chrome under sandboxes/CI may need --no-sandbox --disable-gpu --disable-crash-reporter; docs dev binds [::1]:5173 when IPv4 :5173 is shadowed (OrbStack) — the script targets http://localhost:5173/… which resolves.
 *
 * Run: pnpm record:skin-baseline
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const CDP_HTTP = process.env.BASELINE_CDP ?? 'http://127.0.0.1:9222'
const PAGE_URL = process.env.BASELINE_URL ?? 'http://localhost:5173/tiptapify/examples/skins'
const OUT = resolve(HERE, '../src/skins/__fixtures__/skin-baseline.json')
const BUNDLE = resolve(HERE, 'skin-baseline-bundle.js')
const VIEWPORT = { width: 1280, height: 1024, deviceScaleFactor: 1 }

const SKINS = ['default', 'pastel'] as const
const APPEARANCES = ['light', 'dark'] as const

class CDP {
  private ws!: WebSocket
  private nextId = 1
  private pending = new Map<number, (v: any) => void>()
  session!: string

  async connect() {
    const info = await (await fetch(`${CDP_HTTP}/json/version`)).json()
    this.ws = new WebSocket(info.webSocketDebuggerUrl)
    await new Promise<void>((ok, err) => { this.ws.onopen = () => ok(); this.ws.onerror = () => err(new Error('CDP connect failed')) })
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(String(e.data))
      if (msg.id && this.pending.has(msg.id)) {
        const cb = this.pending.get(msg.id)!
        this.pending.delete(msg.id)
        cb(msg)
      }
    }
  }

  send(method: string, params: Record<string, unknown> = {}): Promise<any> {
    return new Promise((ok, err) => {
      const id = this.nextId++
      this.pending.set(id, (msg) => (msg.error ? err(new Error(`${method}: ${JSON.stringify(msg.error)}`)) : ok(msg.result)))
      this.ws.send(JSON.stringify({ id, method, params, sessionId: this.session }))
    })
  }

  async openPage(url: string) {
    const { targetId } = await this.send('Target.createTarget', { url: 'about:blank' })
    const { sessionId } = await this.send('Target.attachToTarget', { targetId, flatten: true })
    this.session = sessionId
    await this.send('Page.enable')
    await this.send('Runtime.enable')
    // Chrome >= ~140 requires `mobile` to be present on this call
    await this.send('Emulation.setDeviceMetricsOverride', { ...VIEWPORT, mobile: false })
    await this.send('Page.navigate', { url })
  }

  evaluate<T = any>(expression: string, awaitPromise = false): Promise<T> {
    return this.send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }).then((r) => {
      if (r.exceptionDetails) throw new Error(`page eval: ${r.exceptionDetails.exception?.description ?? r.exceptionDetails.text}`)
      return r.result.value as T
    })
  }

  async setAppearance(appearance: string) {
    await this.evaluate(`(() => { localStorage.setItem('vitepress-theme-appearance', ${JSON.stringify(appearance)}); location.reload(); return 1 })()`)
    for (let i = 0; i < 120; i++) {
      await new Promise((r) => setTimeout(r, 250))
      try {
        const bundle = readFileSync(BUNDLE, 'utf8')
        await this.evaluate(bundle)
        if (await this.evaluate('window.__tfBaseline ? window.__tfBaseline.ready() : false')) return
      } catch { /* page still reloading */ }
    }
    throw new Error(`editors not ready for appearance ${appearance}`)
  }

  close() { this.ws.close() }
}

async function main() {
  const cdp = new CDP()
  await cdp.connect()
  await cdp.openPage(PAGE_URL)
  await new Promise((r) => setTimeout(r, 1000))

  const matrix: Record<string, Record<string, unknown>> = {}
  for (const appearance of APPEARANCES) {
    await cdp.setAppearance(appearance)
    const themed = await cdp.evaluate('window.__tfBaseline.themeProbe()')
    const want = appearance === 'dark' ? themed.dark : themed.light
    if (!want) throw new Error(`vuetify theme not applied for appearance ${appearance}: ${JSON.stringify(themed)}`)
    const perSkin: Record<string, unknown> = {}
    for (const skin of SKINS) {
      perSkin[skin] = await cdp.evaluate(`window.__tfBaseline.record(${JSON.stringify(skin)})`, true)
    }
    matrix[appearance] = perSkin
  }

  const fixture = {
    // _meta strings/selectors/notes below are canonical — they mirror the
    // committed fixture verbatim; regeneration must only change recordedAt.
    _meta: {
      purpose: 'Normative skin baseline for 0.3.4 (docs/superpowers/specs/2026-10-18-skins-design.md). Computed styles of every token dimension for the built-in skins, measured on the base CSS (step 1, post-rename) before the token extraction. Acceptance criterion of the CSS rewrite: every recorded dimension must match. Recorded once; changes require a deliberate visual change + changelog note.',
      source: "docs/examples/skins.md playground (InteractiveEditor, variantBtn='elevated'), getComputedStyle via CDP",
      viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
      themes: 'light = tiptapifyLight, dark = tiptapifyDark; the docs playground mirrors the vitepress appearance into the vuetify theme',
      generatedBy: 'pnpm record:skin-baseline (scripts/record-skin-baseline.ts + scripts/skin-baseline-bundle.js)',
      recordedAt: new Date().toISOString(),
      selectors: {
        frame: '.tiptapify-frame',
        toolbar: '.tiptapify-toolbar .v-toolbar',
        items: '.tiptapify-toolbar-items',
        group: '.tiptapify-toolbar-group',
        divider: '.menu-divider',
        groupBtn: '.tiptapify-toolbar-group .v-btn',
        buttonsActive: '.tiptapify-toolbar .v-btn.bg-primary (bold selection)',
        bubble: '.bubble-menu (default) / .tiptapify-bubble-menu (pastel)',
        menu: '.v-overlay__content.tiptapify-menu > .v-list / > .v-list-item',
        menuActive: '.v-list-item--active',
        dialog: '.tiptapify-dialog (link dialog, teleported overlay)',
        image: '.tiptapify-image img / [data-resize-wrapper] / [data-resize-handle] (selected)',
        hover: 'CSSOM rule declarations resolved through an in-skin probe (raw value + resolved computed value)',
      },
      notes: [
        'dialog.gridColumnGap/gridRowGap: pastel measures 16px, default 24px. The dialog is teleported to the overlay root (no .tiptapify-skin-pastel ancestor), so the pastel gap rides the dialog\'s own modifier class, .tiptapify-dialog--pastel .tiptapify-dialog-grid — the same carrier every other pastel dialog rule uses. Re-measured on the fixed CSS: 16px in both themes (light and dark).',
        'menu.itemMinHeight/itemPadding of the default skin are the native Vuetify values (40px / 16px): the classic menu shape delegates those pixels to Vuetify (reachability contract).',
        'groupBtn/buttonsActive of the default skin are the native Vuetify elevated rendering (docs playground variantBtn=\'elevated\'); the library default variantBtn=\'flat\' has no shadow. Custom-toolbar playground passes variantBtn via prop; fixture is recorded on the playground defaults.',
        'frame.borderTopColor / handleBorderTopColor / bubble borderTopColor on default: border-color of a 0-width border (initial); the width is the token dimension.',
        'hover entries: value = declaration text from CSSOM (canonical contract), resolved = computed through a probe inside the theme-scoped toolbar.',
        'groups/groupBtn/buttonsActive of the default skin: 2026-10-18 owner-ratified VBtnGroup restoration for `groups: \'box\'` (0.3.2 structure: elevation-4 VBtnGroup, conditional tiptapify-btn-group--elevated under playground variantBtn=\'elevated\'). The token box keeps painting the group (32px, radius 4px, surface, elevation-2 triple — the group section is unchanged); the fields updated are the child-button structure: groupBtn.borderRadius is the joined first-child corner (4px 0 0 4px, native VBtnGroup joining), and groupBtn/buttonsActive boxShadow is none — the box owns the elevation, the joined children carry none. Pastel (groups: \'flat\') fields untouched: re-measured diffCount 0 on all 13 sections in both themes.',
      ],
    },
    ...matrix,
  }
  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify(fixture, null, 2) + '\n')
  await cdp.close()
  console.log(`baseline recorded: ${OUT}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
