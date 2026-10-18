/*
 * Skin baseline bundle: the single source of truth for measuring the skin
 * chrome, executed in-page by BOTH scripts/record-skin-baseline.ts (CDP) and
 * interactive recording sessions (chrome-dev-tools MCP, Runtime.evaluate).
 *
 * Hover/active-pseudo dimensions cannot be forced through plain
 * Runtime.evaluate, and CSS.forcePseudoState is not scriptable from the page.
 * So the bundle reads the winning rule's declaration text from CSSOM
 * (document.styleSheets) and resolves it through a probe element inside the
 * skin root: the var() tokens then resolve against exactly the same Vuetify
 * theme context the real :hover computes in. Literal values pass through.
 * Plain :active states (the toolbar pressed state) are real classes driven
 * by editor commands, so they are measured as plain computed styles.
 *
 * Public surface (window.__tfBaseline):
 *   ready()                      -> both skin roots present
 *   themeProbe()                 -> { light: bool, dark: bool } vuetify theme classes present
 *   record(skin)                 -> every fixture section for the skin, hover included (drives menus/dialogs/images)
 *   hoverRules(skin)             -> the hover section only: { 'key|prop': { selector, value, resolved } }
 *   reset(skin)                  -> restore the playground editor content
 */
;(function () {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  function skinRoot (skin) { return document.querySelector('.tiptapify-skin-' + skin) }

  function editorFor (skin) {
    let cur = skinRoot(skin).querySelector('.tiptapify-container').__vueParentComponent
    for (let i = 0; i < 12 && cur; i++) {
      if (cur.provides && cur.provides['tiptapifyEditor']) {
        const r = cur.provides['tiptapifyEditor']
        return r && r.value !== undefined ? r.value : r
      }
      cur = cur.parent
    }
    throw new Error('no editor in provides for ' + skin)
  }

  async function waitFor (sel, ms = 3000) {
    for (let i = 0; i < ms / 100; i++) {
      const el = document.querySelector(sel)
      if (el) return el
      await sleep(100)
    }
    return null
  }

  function cs (el, props) {
    if (!el) return null
    const s = getComputedStyle(el)
    const o = {}
    for (const p of props) o[p] = s[p]
    return o
  }

  function pick (root, selector, props) {
    const el = root && root.querySelector(selector)
    if (!el) return { MISSING: selector }
    return cs(el, props)
  }

  function toolbarBtnByIcon (root, pathPrefix) {
    return [...root.querySelectorAll('.tiptapify-toolbar .v-btn')].find((b) => {
      const p = b.querySelector('svg path')
      return p && p.getAttribute('d').startsWith(pathPrefix)
    })
  }

  function headingButton (root) {
    return [...root.querySelectorAll('.tiptapify-toolbar .v-btn')].find((b) => (b.id || '').startsWith('tiptapify-heading-button-'))
  }

  function imagePosition (ed) {
    let pos = -1
    ed.state.doc.forEach((node, offset) => { if ((node.type.name === 'tiptapifyImage' || node.type.name === 'image') && pos < 0) pos = offset })
    return pos
  }

  function probe (skin, prop, value) {
    // The vuetify theme vars (--v-theme-*, --v-border-*) are declared on the
    // .v-theme--* element, so the probe must live under one — the toolbar is
    // the closest themed ancestor present for every measured section.
    const root = skinRoot(skin)
    const host = root.querySelector('.tiptapify-toolbar .v-toolbar') || root.querySelector('[class*="v-theme--"]') || root
    const el = document.createElement('div')
    host.appendChild(el)
    el.style.setProperty(prop, value, 'important')
    const out = getComputedStyle(el).getPropertyValue(prop)
    el.remove()
    return out
  }

  function findRules (needles) {
    const hits = []
    for (const sheet of document.styleSheets) {
      let rules
      try { rules = sheet.cssRules } catch { continue }
      const walk = (list) => {
        for (const rule of list) {
          if (!rule.selectorText && rule.cssRules && rule.cssRules.length) { walk(rule.cssRules); continue }
          if (!rule.selectorText || !rule.style) continue
          const selector = rule.selectorText
          for (const needle of needles) {
            if (selector.includes(needle.match)) {
              const sel = needle.only
                ? selector.split(',').map((s) => s.trim()).filter((s) => s.includes(needle.only)).join(', ')
                : selector
              for (const prop of needle.props) {
                const value = rule.style.getPropertyValue(prop)
                if (value) hits.push({ key: needle.key, selector: sel, prop, value })
              }
            }
          }
        }
      }
      walk(rules)
    }
    return hits
  }

  // One needle per fixture hover key. `key` is the fixture label (output key
  // is `key|prop`), `match` is the selector substring that identifies the
  // winning CSSOM rule, `only` records only the selector items carrying the
  // hover dimension (the shared rules also cover :focus-visible /
  // [aria-expanded="true"], which are not part of this fixture contract).
  // Keys, order and values here are canonical — they define the committed
  // fixture's hover section, keep them in sync.
  const HOVER_NEEDLES = [
    { key: 'v-list-item:hover', match: '.v-list-item:hover > .v-list-item__overlay', props: ['opacity'] },
    { key: 'v-list-item--active > .v-list-item__overlay', match: '.v-list-item--active > .v-list-item__overlay', props: ['opacity'] },
    { key: 'v-list-item--active:hover > .v-list-item__overlay', match: '.v-list-item--active:hover > .v-list-item__overlay', props: ['opacity'] },
    // SkinScope wrapper (step 5) + soft carrier rename (step 6): the menu rules anchor on the scope
    // div through the `tiptapify-menu--soft` carrier. The key label keeps the historical `--pastel`
    // text: it is the committed fixture key; only the selector field of the record moves.
    { key: 'tiptapify-menu--pastel active overlay', match: '.tiptapify-menu--soft > .tiptapify-skin-scope > .v-list.v-list > .v-list-item.v-list-item.v-list-item--active', props: ['opacity'] },
    { key: '.v-btn.v-btn.v-btn:hover', match: '.v-btn.v-btn.v-btn:hover', only: '.v-btn.v-btn.v-btn:hover', props: ['background-color', 'color'] },
    { key: '.bg-primary:hover', match: '.bg-primary:hover', only: '.bg-primary:hover', props: ['background-color'] },
    { key: '[data-resize-handle]:hover', match: '[data-resize-handle]:hover', props: ['background-color'] },
    { key: ':hover [data-resize-wrapper]', match: ':hover [data-resize-wrapper]', props: ['outline-color'] },
  ]

  // ── sections ─────────────────────────────────────────────────────────────
  async function statics (skin) {
    const root = skinRoot(skin)
    return {
      frame: pick(root, '.tiptapify-frame', ['borderTopWidth', 'borderTopColor', 'borderRightWidth', 'borderRightColor', 'borderBottomWidth', 'borderBottomColor', 'borderLeftWidth', 'borderLeftColor', 'backgroundColor', 'boxShadow']),
      toolbar: pick(root, '.tiptapify-toolbar .v-toolbar', ['backgroundColor', 'color', 'borderBottomWidth', 'borderBottomColor', 'borderBottomStyle', 'boxShadow']),
      items: pick(root, '.tiptapify-toolbar-items', ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'columnGap', 'rowGap']),
      group: pick(root, '.tiptapify-toolbar-group', ['columnGap', 'height', 'backgroundColor', 'borderRadius', 'boxShadow']),
      divider: pick(root, '.menu-divider', ['width', 'height', 'marginLeft', 'marginRight', 'backgroundColor']),
      groupBtn: pick(root, '.tiptapify-toolbar-group .v-btn', ['borderRadius', 'color', 'backgroundColor', 'boxShadow', 'height']),
    }
  }

  async function buttonsActive (skin) {
    const ed = editorFor(skin)
    ed.chain().setContent('<p>Bold probe text</p>').focus().setTextSelection({ from: 4, to: 8 }).toggleBold().run()
    await sleep(500)
    const b = [...skinRoot(skin).querySelectorAll('.tiptapify-toolbar .v-btn')].find((x) => x.classList.contains('tiptapify-btn--active') || x.classList.contains('bg-primary') || x.classList.contains('text-primary'))
    if (!b) return { MISSING: 'no active button found' }
    const s = getComputedStyle(b)
    const cls = b.classList.contains('tiptapify-btn--active') ? 'tiptapify-btn--active' : (b.classList.contains('bg-primary') ? 'bg-primary' : 'text-primary')
    const out = { mark: cls, backgroundColor: s.backgroundColor, color: s.color, boxShadow: s.boxShadow, opacity: s.opacity }
    ed.chain().focus().setTextSelection({ from: 4, to: 8 }).toggleBold().run()
    await sleep(300)
    return out
  }

  async function bubble (skin) {
    const sel = skin === 'default' ? '.bubble-menu' : '.tiptapify-bubble-menu'
    const ed = editorFor(skin)
    ed.chain().setContent('<p>Baseline sample text for the bubble menu</p>').focus().setTextSelection({ from: 4, to: 12 }).run()
    const el = await waitFor('.tiptapify-skin-' + skin + ' ' + sel)
    if (!el) return { MISSING: 'bubble ' + skin }
    const s = getComputedStyle(el)
    const btn = el.querySelector('.v-btn')
    const bs = btn && getComputedStyle(btn)
    const out = {
      rootSelector: sel,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow,
      backgroundColor: s.backgroundColor,
      borderTopWidth: s.borderTopWidth,
      borderTopColor: s.borderTopColor,
      paddingTop: s.paddingTop,
      paddingLeft: s.paddingLeft,
      columnGap: s.columnGap,
      rowGap: s.rowGap,
      hasVCard: String(!!el.querySelector('.v-card')),
      hasDividedBtnGroup: String(!!el.querySelector('.v-btn-group--divided')),
      btnVariant: btn ? [...btn.classList].filter((c) => c.includes('variant')).join(' ') : '',
      btnBorderRadius: bs && bs.borderRadius,
      btnBackgroundColor: bs && bs.backgroundColor,
      btnColor: bs && bs.color,
      btnHeight: bs && bs.height,
    }
    ed.commands.blur()
    return out
  }

  async function menuOpen (skin) {
    const btn = headingButton(skinRoot(skin))
    if (!btn) throw new Error('no heading button for ' + skin)
    btn.click()
    const content = await waitFor('.v-overlay__content.tiptapify-menu')
    if (!content) throw new Error('menu overlay did not open for ' + skin)
    return content
  }

  async function menu (skin) {
    const content = await menuOpen(skin)
    const list = content.querySelector('.v-list')
    const item = content.querySelector('.v-list-item')
    const ls = getComputedStyle(list)
    const iS = getComputedStyle(item)
    return {
      contentClass: content.className,
      listPaddingTop: ls.paddingTop, listPaddingRight: ls.paddingRight, listPaddingBottom: ls.paddingBottom, listPaddingLeft: ls.paddingLeft,
      listBorderRadius: ls.borderRadius,
      listBorderTopWidth: ls.borderTopWidth, listBorderTopColor: ls.borderTopColor,
      listBoxShadow: ls.boxShadow,
      listBackgroundColor: ls.backgroundColor,
      itemPaddingTop: iS.paddingTop, itemPaddingLeft: iS.paddingLeft,
      itemMinHeight: iS.minHeight, itemBorderRadius: iS.borderRadius, itemColor: iS.color,
      itemOverlayOpacity: (() => { const o = item.querySelector('.v-list-item__overlay'); return o ? getComputedStyle(o).opacity : '' })(),
    }
  }

  async function menuActive (skin) {
    // activate the current style: the paragraph item gets .v-list-item--active when the
    // selection is a paragraph and the menu marks it — probe the active-rule dimensions
    const content = await waitFor('.v-overlay__content.tiptapify-menu')
    if (!content) return { MISSING: 'menu not open for active probe' }
    const item = content.querySelector('.v-list-item--active')
    if (!item) return { noActiveItem: true }
    const s = getComputedStyle(item)
    const ov = item.querySelector('.v-list-item__overlay')
    return { activeItemBg: s.backgroundColor, activeItemColor: s.color, activeOverlayOpacity: ov && getComputedStyle(ov).opacity }
  }

  function menuClose (skin) {
    const btn = headingButton(skinRoot(skin))
    btn.click()
  }

  async function dialog (skin) {
    const root = skinRoot(skin)
    const linkBtn = toolbarBtnByIcon(root, 'M3.9,12C3.9,10')
    if (!linkBtn) return { MISSING: 'link button' }
    linkBtn.click()
    const card = await waitFor('.tiptapify-dialog')
    if (!card) return { MISSING: 'dialog' }
    const s = getComputedStyle(card)
    const header = card.querySelector('.tiptapify-dialog-header')
    const hs = getComputedStyle(header)
    const content = card.querySelector('.v-card-text')
    const actions = card.querySelector('.v-card-actions')
    const as = actions && getComputedStyle(actions)
    const title = card.querySelector('.tiptapify-dialog-title')
    const ts = getComputedStyle(title)
    const close = card.querySelector('.tiptapify-dialog-close')
    const field = card.querySelector('.v-field')
    const actionBtn = actions && actions.querySelector('.v-btn')
    const abs = actionBtn && getComputedStyle(actionBtn)
    const grid = card.querySelector('.tiptapify-dialog-grid')
    const gs = grid && getComputedStyle(grid)
    const dividerUnderTitle = header.nextElementSibling && header.nextElementSibling.classList.contains('v-divider')
    return {
      classes: [...card.classList].filter((c) => c.startsWith('tiptapify')).join(' '),
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow,
      headerPaddingTop: hs.paddingTop, headerPaddingRight: hs.paddingRight, headerPaddingBottom: hs.paddingBottom, headerPaddingLeft: hs.paddingLeft,
      contentPaddingTop: content && getComputedStyle(content).paddingTop,
      contentPaddingRight: content && getComputedStyle(content).paddingRight,
      contentPaddingBottom: content && getComputedStyle(content).paddingBottom,
      contentPaddingLeft: content && getComputedStyle(content).paddingLeft,
      actionsPaddingTop: as && as.paddingTop, actionsPaddingRight: as && as.paddingRight, actionsPaddingBottom: as && as.paddingBottom, actionsPaddingLeft: as && as.paddingLeft,
      titleFontSize: ts.fontSize, titleFontWeight: ts.fontWeight, titleColor: ts.color,
      dividerUnderTitle: String(!!dividerUnderTitle),
      closeVariant: close ? [...close.classList].filter((c) => c.includes('variant')).join(' ') : '',
      fieldVariant: field ? [...field.classList].filter((c) => c.includes('v-field--variant')).join(' ') : '',
      fieldBorderRadius: field ? getComputedStyle(field).getPropertyValue('border-radius') || getComputedStyle(field).borderRadius : '',
      actionBtnMinHeight: abs && abs.minHeight,
      actionBtnBorderRadius: abs && abs.borderRadius,
      gridColumnGap: gs && gs.columnGap, gridRowGap: gs && gs.rowGap,
    }
  }

  function dialogClose () {
    const c = document.querySelector('.tiptapify-dialog .tiptapify-dialog-close')
    if (c) c.click()
  }

  async function image (skin) {
    const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    const ed = editorFor(skin)
    ed.chain().setContent('<p>Baseline image probe</p>').run()
    ed.chain().focus().setImage({ src: dataUri }).run()
    await sleep(500)
    const pos = imagePosition(ed)
    if (pos < 0) return { MISSING: 'image not inserted' }
    ed.chain().focus().setNodeSelection(pos).run()
    await sleep(500)
    const root = skinRoot(skin)
    const img = root.querySelector('.tiptapify-image img')
    const wrap = root.querySelector('[data-resize-wrapper]')
    const handle = root.querySelector('[data-resize-handle]')
    if (!img || !wrap || !handle) return { MISSING: 'image nodes', img: String(!!img), wrap: String(!!wrap), handle: String(!!handle) }
    const is = getComputedStyle(img)
    const ws = getComputedStyle(wrap)
    const hs = getComputedStyle(handle)
    return {
      imgBorderRadius: is.borderRadius,
      imgBackgroundColor: is.backgroundColor,
      wrapBorderRadius: ws.borderRadius,
      wrapOutlineStyle: ws.outlineStyle,
      wrapOutlineWidth: ws.outlineWidth,
      wrapOutlineColor: ws.outlineColor,
      wrapOutlineOffset: ws.outlineOffset,
      handleDisplay: hs.display,
      handleBackgroundColor: hs.backgroundColor,
      handleBorderTopWidth: hs.borderTopWidth,
      handleBorderTopColor: hs.borderTopColor,
      handleBorderRadius: hs.borderRadius,
      handleBoxShadow: hs.boxShadow,
      handleWidth: hs.width, handleHeight: hs.height,
    }
  }

  function hoverRules (skin) {
    const hits = new Map()
    for (const h of findRules(HOVER_NEEDLES)) {
      const key = h.key + '|' + h.prop
      if (!hits.has(key)) hits.set(key, h) // first winning rule is the canonical one (the dist css is loaded twice by the docs app)
    }
    // emit in needle order: the fixture key order is canonical, independent of stylesheet insertion order
    const out = {}
    for (const needle of HOVER_NEEDLES) {
      for (const prop of needle.props) {
        const key = needle.key + '|' + prop
        const h = hits.get(key)
        if (h) out[key] = { selector: h.selector, value: h.value, resolved: probe(skin, prop, h.value) }
      }
    }
    return out
  }

  function reset (skin) {
    const ed = editorFor(skin)
    ed.chain().setContent('<p></p>').run()
  }

  window.__tfBaseline = {
    ready () {
      return !!document.querySelector('.tiptapify-skin-default .tiptapify-toolbar') &&
        !!document.querySelector('.tiptapify-skin-pastel .tiptapify-toolbar')
    },
    themeProbe () {
      return {
        dark: !!document.querySelector('.v-theme--tiptapifyDark'),
        light: !!document.querySelector('.v-theme--tiptapifyLight'),
      }
    },
    async record (skin) {
      const stat = await statics(skin)
      // key order mirrors the committed fixture (skin-baseline.json)
      const out = {
        toolbar: stat.toolbar, items: stat.items,
        group: stat.group, divider: stat.divider, groupBtn: stat.groupBtn,
        buttonsActive: await buttonsActive(skin),
        bubble: await bubble(skin),
        menu: await menu(skin),
        menuActive: await menuActive(skin),
      }
      menuClose(skin)
      await sleep(300)
      out.dialog = await dialog(skin)
      dialogClose()
      await sleep(300)
      out.image = await image(skin)
      out.frame = stat.frame
      out.hover = hoverRules(skin)
      reset(skin)
      return out
    },
    reset,
  }
  return 'installed'
})()
