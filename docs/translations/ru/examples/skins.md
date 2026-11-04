# Скины {#skins}

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

Prop `skin` задаёт внешний вид оболочки редактора: панели инструментов, bubble-меню, выпадающих списков, диалогов.
Функциональность одинакова в любом скине. Концепции, таблица токенов и рецепты описаны в
[руководстве по скинам](/ru/guide/skins).

## Classic (по умолчанию) {#classic-default}

Приподнятая панель инструментов, группы кнопок в виде приподнятых блоков, bubble-меню в виде карточек:

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

Плоская тонированная панель инструментов под тонкой линией, «призрачные» кнопки с нейтральным нажатым состоянием, лёгкие выпадающие списки:

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

## Свой скин: mint {#custom-mint}

`registerSkin` добавляет имя в реестр. Этот скин расширяет `pastel` и переопределяет несколько токенов: мятный оттенок заливки панели инструментов и насыщенно-зелёный для контура изображения и маркеров изменения размера. Тихая форма наследуется от pastel; всё, что не переопределено (состояния кнопок, меню, диалоги), сохраняет значения pastel:

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

Корневой элемент редактора получает класс `tiptapify-skin-mint` — запасной выход для размеров, которые не покрывает каталог токенов (см. [Запасной выход](/ru/guide/skins#escape-hatch-the-root-class)).

## Инлайн-скин {#inline-skin}

Prop `skin` принимает и объект: переопределения токенов и флаги формы, с наследованием от зарегистрированного скина через `extends`. Он разрешается по той же цепочке, никогда не попадает в реестр и отображается с классом `tiptapify-skin-inline` (или `tiptapify-skin-{name}`, если у объекта есть `name`); его токены попадают в корневой элемент редактора как CSS-переменные `--tf-*`.

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
