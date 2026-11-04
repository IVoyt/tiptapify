import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, computed, createApp, h, nextTick, provide, Ref, ref } from 'vue'
import { createVuetify } from 'vuetify'
import { VTextField } from 'vuetify/components'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { TIPTAPIFY_CONFIG_KEY } from '@tiptapify/composables/useTiptapifyConfig'
import { resolveSkin } from '@tiptapify/skins/registry'

// jsdom has no `visualViewport` global; Vuetify's overlay positioning reads it,
// and the `visualViewport?.` guards do not protect against an undeclared identifier
if (!('visualViewport' in globalThis)) {
  ;(globalThis as Record<string, unknown>).visualViewport = {
    scale: 1,
    offsetLeft: 0,
    offsetTop: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
  }
}

// The dialog teleports to the overlay root, so its skin markup rides the shape:
// the `tiptapify-dialog--soft` carrier, the divider under the title, the close
// variant and the field defaults all key off `shape.dialog`, not the skin name.
const openApps: { app: App, host: HTMLElement }[] = []

async function openDialog (skinInput: unknown, listeners: Record<string, () => void> = {}, slots: Record<string, () => unknown> = {}): Promise<HTMLElement> {
  const config = resolveSkin(skinInput)
  const dialog: Ref<{ open: () => void } | null> = ref(null)

  const app = createApp({
    setup () {
      provide(TIPTAPIFY_CONFIG_KEY, {
        variantBtn: ref('flat'),
        variantField: ref('outlined'),
        skin: ref(skinInput),
        skinName: computed(() => config.name),
        tokens: computed(() => config.tokens),
        shape: computed(() => config.shape),
      })
      provide('tiptapifyI18n', { t: (key: string) => key })

      return () => h(TiptapifyDialog, { ref: dialog, title: 'Probe dialog', module: 'link', ...listeners }, {
        content: () => h('div', { class: 'probe-content' }, [h(VTextField, { label: 'Field' })]),
        ...slots,
      })
    },
  })
  app.use(createVuetify())

  const host = document.createElement('div')
  document.body.appendChild(host)
  app.mount(host)
  openApps.push({ app, host })
  await nextTick()

  dialog.value?.open()
  for (let i = 0; i < 10; i++) {
    await nextTick()
    if (document.querySelector('.tiptapify-dialog')) {
      break
    }
  }

  const card = document.querySelector<HTMLElement>('.tiptapify-dialog')
  if (!card) {
    throw new Error('dialog card did not render')
  }

  return card
}

function disposeDialogs () {
  for (const { app, host } of openApps.splice(0)) {
    app.unmount()
    host.remove()
  }
  document.body.innerHTML = ''
}

afterEach(disposeDialogs)

describe('TiptapifyDialog shape wiring', () => {
  it('the classic dialog keeps the divider, the elevated close and no soft carrier', async () => {
    const card = await openDialog('default')

    expect(card.classList.contains('tiptapify-dialog--soft')).toBe(false)
    expect(card.classList.contains('tiptapify-dialog--pastel')).toBe(false)

    const header = card.querySelector('.tiptapify-dialog-header')
    expect(header?.nextElementSibling?.classList.contains('v-divider')).toBe(true)

    const close = card.querySelector('.tiptapify-dialog-close')
    expect([...close?.classList ?? []].join(' ')).toContain('v-btn--variant-elevated')

    const input = card.querySelector('.v-input')
    expect([...input?.classList ?? []].join(' ')).toContain('v-input--density-default')
  })

  it('the pastel dialog carries tiptapify-dialog--soft, no divider, a text close and soft field defaults', async () => {
    const card = await openDialog('pastel')

    expect(card.classList.contains('tiptapify-dialog--soft')).toBe(true)

    const header = card.querySelector('.tiptapify-dialog-header')
    expect(header?.nextElementSibling?.classList.contains('v-divider')).toBe(false)

    const close = card.querySelector('.tiptapify-dialog-close')
    expect([...close?.classList ?? []].join(' ')).toContain('v-btn--variant-text')

    // VDefaultsProvider: the soft dialog gives unstyled fields the comfortable outlined defaults
    const input = card.querySelector('.v-input')
    expect([...input?.classList ?? []].join(' ')).toContain('v-input--density-comfortable')
  })

  it('the soft carrier rides the dialog flag, not the name: a custom skin extending pastel keeps it', async () => {
    const card = await openDialog({ extends: 'pastel' })

    expect(card.classList.contains('tiptapify-dialog--soft')).toBe(true)
    expect(card.classList.contains('tiptapify-dialog--pastel')).toBe(false)
  })

  it('an inline dialog flag alone drives the carrier and the divider', async () => {
    const soft = await openDialog({ dialog: 'soft' })
    expect(soft.classList.contains('tiptapify-dialog--soft')).toBe(true)
    expect(soft.querySelector('.tiptapify-dialog-header')?.nextElementSibling?.classList.contains('v-divider')).toBe(false)

    disposeDialogs()

    const classic = await openDialog({ dialog: 'classic' })
    expect(classic.classList.contains('tiptapify-dialog--soft')).toBe(false)
    expect(classic.querySelector('.tiptapify-dialog-header')?.nextElementSibling?.classList.contains('v-divider')).toBe(true)
  })
})

describe('TiptapifyDialog form', () => {
  it('submits on Enter in a field: the content is a form', async () => {
    const onSubmit = vi.fn()
    const card = await openDialog('default', { onSubmit })

    card.querySelector('form')!.requestSubmit()

    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('tells the dialog it closed, however it was closed', async () => {
    const onClosed = vi.fn()
    const card = await openDialog('default', { onClosed })

    card.querySelector<HTMLElement>('.tiptapify-dialog-close')!.click()
    await nextTick()

    expect(onClosed).toHaveBeenCalledOnce()
  })
})

describe('TiptapifyDialog title', () => {
  it('shows the title prop, or the title slot of the dialog', async () => {
    const plain = await openDialog('default')
    expect(plain.querySelector('.tiptapify-dialog-title')!.textContent!.trim()).toBe('Probe dialog')

    disposeDialogs()

    const custom = await openDialog('default', {}, { title: () => h('b', { class: 'probe-title' }, 'With icon') })
    expect(custom.querySelector('.tiptapify-dialog-title .probe-title')!.textContent).toBe('With icon')
  })
})
