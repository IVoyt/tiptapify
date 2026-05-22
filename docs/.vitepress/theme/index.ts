import { h } from 'vue'
import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import { createVuetify } from 'vuetify'
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import TiptapifyPlugin from '@tiptapify'
import '@tiptapifyDist/tiptapify.css'

import { createI18n } from 'vue-i18n'

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdiSvg,
    },
  },
  theme: {
    defaultTheme: 'tiptapifyLight',
    themes: {
      tiptapifyLight: {
        dark: false,
        colors: {
          primary: '#6A00F5',
          secondary: '#6A00F5',
        },
      },
      tiptapifyDark: {
        dark: true,
        colors: {
          primary: '#A855F7',
          secondary: '#A855F7',
        },
      },
    },
  },
})

const InteractiveEditor = defineAsyncComponent(() => import('./components/InteractiveEditor.vue'))

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h('div', { class: 'home-interactive-section' }, [
        h('h2', { class: 'vp-doc-h2', style: 'text-align:center;margin:2rem 0 0.5rem' }, 'Live Playground'),
        h('p', { style: 'text-align:center;color:var(--vp-c-text-2);margin-bottom:1.5rem;max-width:600px;margin-left:auto;margin-right:auto' },
          'Try Tiptapify right here in your browser — no installation needed'),
        h('div', { style: 'max-width:900px;margin:0 auto' },
          h(InteractiveEditor)
        ),
      ]),
    })
  },
  enhanceApp({ app }) {
    const i18n = createI18n({
      locale: 'en',
      legacy: false,
      fallbackLocale: 'en',
    })
    app.use(vuetify)
    app.use(i18n)
    app.use(TiptapifyPlugin, { i18n })

    app.component('InteractiveEditor', InteractiveEditor)
  },
}
