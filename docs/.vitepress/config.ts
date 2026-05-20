import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vitepress'
import path from 'node:path'

export default defineConfig({
  title: 'Tiptapify',
  description: 'Tiptap 3 Editor Vuetify toolbar',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tiptapify/tiptapify-symbol.svg' }],
  ],
  base: '/tiptapify/',
  lang: 'en-US',

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    optimizeDeps: {
      include: ['vuetify'],
    },
    resolve: {
      alias: {
        '@tiptapify': fileURLToPath(new URL('../../src', import.meta.url)),
        '@tiptapifyDist': fileURLToPath(new URL('../../dist', import.meta.url)),
      }
    }
  },

  themeConfig: {
    logo: '/tiptapify-symbol.svg',
    siteTitle: 'Tiptapify',
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Examples', link: '/examples/basic' },
      { text: 'API', link: '/api/props' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/IVoyt/tiptapify/blob/main/CHANGELOG.md' },
          { text: 'npm', link: 'https://www.npmjs.com/package/tiptapify' },
          { text: 'GitHub', link: 'https://github.com/IVoyt/tiptapify' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Internationalization', link: '/guide/i18n' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic' },
            { text: 'Custom Toolbar', link: '/examples/custom-toolbar' },
            { text: 'Media', link: '/examples/media' },
            { text: 'Slash Commands', link: '/examples/slash-commands' },
            { text: 'i18n', link: '/examples/i18n' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api/props' },
            { text: 'Toolbar Items', link: '/api/toolbar-items' },
            { text: 'Types', link: '/api/types' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IVoyt/tiptapify' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/tiptapify' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Igor Voytovich',
    },
    search: {
      provider: 'local',
    },
  },
})
