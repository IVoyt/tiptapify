<script setup>
</script>

# Tiptapify {#tiptapify}

**Vuetify 3 araç çubuğu uygulamasıyla Vue 3 için Tiptap 3 zengin metin düzenleyici**

::: info Beta Durumu
Bu proje şu anda **Beta** aşamasındadır. Özellikleri tamamlanmıştır, ancak düzeltilmesi gereken bazı hatalar olabilir.
:::

## Özellikler {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 Bileşenleri</h3>
    <p>Tamamen Vuetify 3 bileşenleriyle oluşturulmuş şık bir Material Design araç çubuğu</p>
  </div>
  <div class="feature">
    <h3>30+ Eklenti</h3>
    <p>Zengin metin biçimlendirme, medya gömme, tablolar, sözdizimi vurgulamalı kod blokları</p>
  </div>
  <div class="feature">
    <h3>Slash Komutları</h3>
    <p>Başlıklar, listeler, medya ve daha fazlası için hızlı ekleme menüsünü açmak üzere <code>/</code> yazın</p>
  </div>
  <div class="feature">
    <h3>Çok Dillilik</h3>
    <p>vue-i18n ile 20'den fazla dil desteği</p>
  </div>
  <div class="feature">
    <h3>Koyu Tema</h3>
    <p>Vuetify temanızla bütünleşen otomatik koyu/açık mod desteği</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Tüm araç çubuğu öğeleri ve prop'lar için dışa aktarılan tiplerle tam TypeScript desteği</p>
  </div>
</div>

## Hızlı Başlangıç {#quick-start}

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

::: tip Eş Bağımlılıklar
Tiptapify, eş bağımlılık olarak **Vue 3.x**, **Vuetify 3.x veya 4.x**, **vue-i18n 11+** ve **@mdi/js** gerektirir. Kurulumun tamamı için [Kurulum kılavuzuna](/tr/guide/installation) bakın.
:::

## Lisans {#license}

MIT — [GitHub Deposu](https://github.com/IVoyt/tiptapify)

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
