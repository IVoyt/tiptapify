import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      loose: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
    }),
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
    }),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    svgLoader(),
  ],
  define: { 'process.env': {} },
  resolve: {
    preserveSymlinks: true,
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
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
          ]
        })
      ],
      external: ['vue', 'vuetify'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'tiptapify.css';
          return assetInfo.name;
        }
      }
    },
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
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