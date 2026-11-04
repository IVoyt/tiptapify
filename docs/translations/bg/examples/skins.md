# Скинове {#skins}

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

Пропъртито `skin` избира външния вид на рамката на редактора: лентата, bubble менютата, падащите менюта и диалозите.
Функционалността е една и съща във всеки скин. Концепциите, таблицата с токени и рецептите са в
[ръководството за скиновете](/bg/guide/skins).

## Classic (по подразбиране) {#classic-default}

Издигната лента, групи бутони като издигнати кутии, bubble менюта в стил карта:

<InteractiveEditor :bubble-menu="true" placeholder="Скин Classic..." />

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

Плоска оцветена лента с инструменти под тънка линия, прозрачни бутони с неутрално състояние при натискане, леки падащи менюта:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Скин Pastel..." />

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

## Собствен: mint {#custom-mint}

`registerSkin` добавя име в регистъра. Този скин разширява `pastel` и преопределя шепа токени: ментов оттенък на фона на лентата и наситено зелено за контура на изображението и дръжките за преоразмеряване. Тихата форма се наследява от pastel; всичко непреопределено (състояния на бутоните, менюта, диалози) запазва стойностите на pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Скин Mint..." />

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

Коренът на редактора носи класа `tiptapify-skin-mint` — запасния изход за размери, които каталогът с токени не покрива (вижте [Запасен изход](/bg/guide/skins#escape-hatch-the-root-class)).

## Вграден скин {#inline-skin}

Пропъртито `skin` приема и обект: преопределения на токени и флагове за форма, наследяващи от регистриран скин чрез `extends`. Той се разрешава по същата верига, никога не влиза в регистъра и се рендира с класа `tiptapify-skin-inline` (или `tiptapify-skin-{name}`, когато обектът съдържа `name`); токените му попадат като CSS променливи `--tf-*` в корена на редактора.

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
