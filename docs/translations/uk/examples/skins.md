# Скіни {#skins}

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

Проп `skin` визначає вигляд оболонки редактора: панелі інструментів, bubble-меню, випадних списків, діалогів.
Функції працюють однаково в кожному скіні. Концепції, таблицю токенів і рецепти дивіться в
[посібнику зі скінів](/uk/guide/skins).

## Classic (за замовчуванням) {#classic-default}

Підвищена панель інструментів, групи кнопок як підвищені блоки, bubble-меню у вигляді карток:

<InteractiveEditor :bubble-menu="true" placeholder="Скін Classic..." />

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

Плаский тонований тулбар під тонкою лінією, «примарні» кнопки з нейтральним натиснутим станом, легкі випадні списки:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Скін Pastel..." />

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

## Власний: mint {#custom-mint}

`registerSkin` додає назву до реєстру. Цей скін розширює `pastel` і перевизначає кілька токенів: м'ятний відтінок фону панелі інструментів і насичений зелений для контуру зображення та маркерів зміни розміру. Спокійна форма успадковується від pastel; усе, що не перевизначено (стани кнопок, меню, діалоги), зберігає значення pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Скін Mint..." />

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

Корінь редактора має клас `tiptapify-skin-mint` — запасний вихід для розмірів, яких немає в каталозі токенів (див. [Запасний вихід](/uk/guide/skins#escape-hatch-the-root-class)).

## Inline-скін {#inline-skin}

Проп `skin` також приймає об'єкт: перевизначення токенів і прапорці форми, що успадковуються від зареєстрованого скіну через `extends`. Він розв'язується тим самим ланцюжком, не потрапляє до реєстру й рендериться з класом `tiptapify-skin-inline` (або `tiptapify-skin-{name}`, якщо в об'єкта є `name`); його токени потрапляють як CSS-змінні `--tf-*` на корінь редактора.

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
