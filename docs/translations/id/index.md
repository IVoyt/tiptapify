<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor teks kaya Tiptap 3 untuk Vue 3 dengan implementasi toolbar Vuetify 3**

::: info Status Beta
Proyek ini saat ini berstatus **Beta**. Fiturnya sudah lengkap, tetapi mungkin masih ada beberapa bug yang perlu diperbaiki.
:::

## Fitur {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Komponen Vuetify 3</h3>
    <p>Toolbar Material Design yang indah, dibangun sepenuhnya dengan komponen Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ Ekstensi</h3>
    <p>Pemformatan teks kaya, penyematan media, tabel, blok kode dengan penyorotan sintaks</p>
  </div>
  <div class="feature">
    <h3>Perintah Garis Miring</h3>
    <p>Ketik <code>/</code> untuk membuka menu sisip cepat untuk judul, daftar, media, dan lainnya</p>
  </div>
  <div class="feature">
    <h3>Internasionalisasi</h3>
    <p>Mendukung 20+ bahasa melalui vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tema Gelap</h3>
    <p>Dukungan mode gelap/terang otomatis yang terintegrasi dengan tema Vuetify Anda</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Dukungan penuh TypeScript dengan tipe yang diekspor untuk semua item toolbar dan props</p>
  </div>
</div>

## Mulai Cepat {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip Peer Dependency
Tiptapify memerlukan **Vue 3.x**, **Vuetify 3.x atau 4.x**, **vue-i18n 11+**, dan **@mdi/js** sebagai peer dependency. Lihat [panduan Instalasi](/id/guide/installation) untuk pengaturan lengkap.
:::

## Lisensi {#license}

MIT — [Repositori GitHub](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
