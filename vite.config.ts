import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { contentCss } from './src/utils/contentStyles'

/// <reference types="vitest" />

// The UMD build reads the externals from the globals of their UMD builds; @mdi/js has none, so a page sets `mdi`
function umdGlobal(id: string): string {
  if (id === '@mdi/js') {
    return 'mdi'
  }
  if (id.startsWith('vuetify/components')) {
    return 'Vuetify.components'
  }
  if (id.startsWith('vuetify/directives')) {
    return 'Vuetify.directives'
  }
  if (id.startsWith('vuetify')) {
    return 'Vuetify'
  }

  return id === 'vue-i18n' ? 'vueI18n' : 'Vue'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL('./src/i18n/locales/**', import.meta.url)),
      ],
    }),
    vuetify({
      autoImport: { labs: true },
      styles: 'none'
    }),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    svgLoader(),
    // dist/content.css: the content styles for a site that keeps the classes (contentStyles: 'classes')
    {
      name: 'tiptapify-content-css',
      apply: 'build',
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'content.css', source: contentCss() })
      },
    },
  ],
  define: { 'process.env': {} },
  resolve: {
    preserveSymlinks: true,
    tsconfigPaths: true,
    alias: {
      '@tiptapify': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'esbuild',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Tiptapify',
      formats: ['es', 'umd'],
      fileName: 'tiptapify'
    },
    cssCodeSplit: false,
    rolldownOptions: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      // With its subpaths: the auto-import of vite-plugin-vuetify brings components from `vuetify/components/*`
      external: [/^@mdi\/js$/, /^vue$/, /^vue-i18n$/, /^vuetify(\/.*)?$/],
      output: {
        exports: 'named',
        globals: umdGlobal,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'tiptapify.css'
          return assetInfo.name
        }
      }
    },
    chunkSizeWarningLimit: 5000,
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,js}'],
    server: {
      deps: {
        // let Vite process Vuetify's component CSS imports
        inline: ['vuetify'],
      },
    },
  },
  optimizeDeps: {
    exclude: ['vuetify', '@tiptap/pm'],
    include: [
      'vue',
      '@tiptapify/components/Tiptapify.vue',
      '@tiptapify/components/UI/TiptapifyDialog.vue'
    ],
    entries: [
      './src/**/*.vue',
    ],
  },
})