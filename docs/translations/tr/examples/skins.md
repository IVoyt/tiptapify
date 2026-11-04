# Temalar {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

`skin` prop'u düzenleyici arayüzünün görünümünü belirler: araç çubuğu, balon menüler, açılır menüler, diyaloglar.
Özellikler her temada aynı çalışır. Kavramlar, token tablosu ve tarifler
[Temalar kılavuzunda](/tr/guide/skins) yer alır.

## Classic (varsayılan) {#classic-default}

Yükseltilmiş bir araç çubuğu, yükseltilmiş kutular olarak düğme grupları, kart tarzı balon menüler:

<InteractiveEditor :bubble-menu="true" placeholder="Classic teması..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## Pastel {#pastel}

İnce bir çizginin altında düz renk tonlu araç çubuğu, nötr basılı durumu olan hayalet düğmeler, hafif açılır menüler:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel teması..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## Özel: mint {#custom-mint}

`registerSkin` kayıt defterine bir ad ekler. Bu tema `pastel` temasını genişletir ve bir avuç token'ı geçersiz kılar: araç çubuğu zemininde nane tonu, görsel çerçevesi ve yeniden boyutlandırma tutamaçları için koyu yeşil. Sakin biçim pastel temadan gelir; geçersiz kılınmayan her şey (düğme durumları, menüler, diyaloglar) pastel değerlerini korur:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint teması..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

Düzenleyici kökü `tiptapify-skin-mint` sınıfını taşır — token kataloğunun kapsamadığı boyutlar için kaçış yoludur ([Kaçış yolu](/tr/guide/skins#escape-hatch-the-root-class) bölümüne bakın).

## Satır içi tema {#inline-skin}

`skin` prop'u bir nesne de alır: token geçersiz kılmaları ve biçim bayrakları; `extends` aracılığıyla kayıtlı bir temadan miras alır. Aynı zincirden çözümlenir, kayıt defterine hiç girmez ve `tiptapify-skin-inline` sınıfı altında (nesne bir `name` taşıyorsa `tiptapify-skin-{name}`) işlenir; token'ları düzenleyici kökünde `--tf-*` CSS değişkenleri olarak yer alır.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
