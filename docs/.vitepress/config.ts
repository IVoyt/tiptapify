import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { readdirSync, readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(fileURLToPath(new URL('../../package.json', import.meta.url)), 'utf-8'))
const currentVersion = `v${packageJson.version}`

type DocsStrings = {
  lang: string
  label: string
  plugin: string
  dir: 'ltr' | 'rtl'
  site: Record<string, string>
  nav: Record<string, string>
  sidebar: Record<string, string>
  theme: Record<string, string>
  search: Record<string, string>
  demo: Record<string, string>
}

// The strings of the docs site itself, one file per language (the editor's own translations live in src/i18n)
const localesDir = fileURLToPath(new URL('./locales', import.meta.url))
const docsLocales: Record<string, DocsStrings> = Object.fromEntries(
  readdirSync(localesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => [file.replace(/\.json$/, ''), JSON.parse(readFileSync(`${localesDir}/${file}`, 'utf-8'))]),
)

function themeConfig(strings: DocsStrings, prefix: string): DefaultTheme.Config {
  const { nav, sidebar, theme } = strings
  const link = (path: string) => `${prefix}${path}`

  return {
    nav: [
      { text: nav.guide, link: link('/guide/installation') },
      { text: nav.examples, link: link('/examples/basic') },
      { text: nav.api, link: link('/api/props') },
      {
        text: currentVersion,
        items: [
          { text: nav.changelog, link: 'https://github.com/IVoyt/tiptapify/blob/main/CHANGELOG.md' },
          { text: 'npm', link: 'https://www.npmjs.com/package/tiptapify' },
          { text: 'GitHub', link: 'https://github.com/IVoyt/tiptapify' },
        ],
      },
    ],
    sidebar: {
      [link('/guide/')]: [
        {
          text: sidebar.gettingStarted,
          items: [
            { text: sidebar.installation, link: link('/guide/installation') },
            { text: sidebar.quickStart, link: link('/guide/quick-start') },
            { text: sidebar.skins, link: link('/guide/skins') },
            { text: sidebar.i18n, link: link('/guide/i18n') },
            { text: sidebar.ai, link: link('/guide/ai') },
            { text: sidebar.linkCards, link: link('/guide/link-cards') },
            { text: sidebar.uploads, link: link('/guide/uploads') },
            { text: sidebar.contentStyles, link: link('/guide/content-styles') },
          ],
        },
      ],
      [link('/examples/')]: [
        {
          text: sidebar.examples,
          items: [
            { text: sidebar.basicUsage, link: link('/examples/basic') },
            { text: sidebar.examplesSkins, link: link('/examples/skins') },
            { text: sidebar.customToolbar, link: link('/examples/custom-toolbar') },
            { text: sidebar.media, link: link('/examples/media') },
            { text: sidebar.slashCommands, link: link('/examples/slash-commands') },
            { text: sidebar.examplesAi, link: link('/examples/ai') },
            { text: sidebar.examplesI18n, link: link('/examples/i18n') },
          ],
        },
      ],
      [link('/api/')]: [
        {
          text: sidebar.apiReference,
          items: [
            { text: sidebar.props, link: link('/api/props') },
            { text: sidebar.toolbarItems, link: link('/api/toolbar-items') },
            { text: sidebar.types, link: link('/api/types') },
          ],
        },
      ],
    },
    footer: {
      message: strings.site.footerMessage,
      copyright: 'Copyright © 2025-present Igor Voytovich',
    },
    outline: { label: theme.outlineTitle },
    docFooter: { prev: theme.docFooterPrev, next: theme.docFooterNext },
    darkModeSwitchLabel: theme.darkModeSwitchLabel,
    lightModeSwitchTitle: theme.lightModeSwitchTitle,
    darkModeSwitchTitle: theme.darkModeSwitchTitle,
    sidebarMenuLabel: theme.sidebarMenuLabel,
    returnToTopLabel: theme.returnToTopLabel,
    langMenuLabel: theme.langMenuLabel,
    skipToContentLabel: theme.skipToContentLabel,
    notFound: { title: theme.notFoundTitle, quote: theme.notFoundQuote, linkText: theme.notFoundLinkText },
  }
}

function searchTranslations({ search }: DocsStrings) {
  return {
    button: { buttonText: search.buttonText, buttonAriaLabel: search.buttonAriaLabel },
    modal: {
      displayDetails: search.displayDetails,
      resetButtonTitle: search.resetButtonTitle,
      backButtonTitle: search.backButtonTitle,
      noResultsText: search.noResultsText,
      footer: {
        selectText: search.selectText,
        selectKeyAriaLabel: search.selectKeyAriaLabel,
        navigateText: search.navigateText,
        navigateUpKeyAriaLabel: search.navigateUpKeyAriaLabel,
        navigateDownKeyAriaLabel: search.navigateDownKeyAriaLabel,
        closeText: search.closeText,
        closeKeyAriaLabel: search.closeKeyAriaLabel,
      },
    },
  }
}

// English at the root, every other language under its own path (/uk/, /de/, …)
const locales = Object.fromEntries(
  Object.entries(docsLocales)
    .sort(([a], [b]) => (a === 'en' ? -1 : b === 'en' ? 1 : docsLocales[a].label.localeCompare(docsLocales[b].label)))
    .map(([code, strings]) => [code === 'en' ? 'root' : code, {
      label: strings.label,
      lang: strings.lang,
      dir: strings.dir,
      description: strings.site.description,
      themeConfig: themeConfig(strings, code === 'en' ? '' : `/${code}`),
    }]),
)

export default defineConfig({
  title: 'Tiptapify',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tiptapify/tiptapify-symbol.svg' }],
  ],
  base: '/tiptapify/',
  locales,
  // The translated pages live in docs/translations/<code>/ and are served at /<code>/ (docs/translations/uk/guide/ai.md
  // is /uk/guide/ai), so the docs root keeps only the English pages
  rewrites: {
    'translations/:lang/:path*': ':lang/:path*',
  },

  vite: {
    ssr: {
      noExternal: ['vuetify', 'vue-i18n'],
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
    optimizeDeps: {
      include: ['vuetify'],
    },
    resolve: {
      alias: [
        { find: '@tiptapify', replacement: fileURLToPath(new URL('../../src', import.meta.url)) },
        { find: '@tiptapifyDist', replacement: fileURLToPath(new URL('../../dist', import.meta.url)) },
        // The language menu lists every language in one order, the current one highlighted in its place
        {
          find: /^.*\/VPNavTranslations\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/NavTranslations.vue', import.meta.url)),
        },
      ],
    }
  },

  themeConfig: {
    logo: '/tiptapify-symbol.svg',
    siteTitle: 'Tiptapify',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IVoyt/tiptapify' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/tiptapify' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: Object.fromEntries(Object.entries(docsLocales).map(([code, strings]) => [
          code === 'en' ? 'root' : code,
          { translations: searchTranslations(strings) },
        ])),
      },
    },
  },
})
