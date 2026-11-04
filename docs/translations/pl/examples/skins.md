# Skórki {#skins}

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

Właściwość `skin` wybiera wygląd elementów interfejsu edytora: paska narzędzi, menu dymków, list rozwijanych i okien dialogowych.
Funkcje działają tak samo w każdej skórce. Pojęcia, tabelę tokenów i receptury znajdziesz w
[przewodniku po skórkach](/pl/guide/skins).

## Classic (domyślna) {#classic-default}

Wyniesiony pasek narzędzi, grupy przycisków jako wyniesione pola, menu dymków w stylu kart:

<InteractiveEditor :bubble-menu="true" placeholder="Skórka Classic..." />

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

Płaski, zabarwiony pasek narzędzi pod cienką linią, przyciski typu ghost z neutralnym stanem wciśnięcia, jasne listy rozwijane:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skórka Pastel..." />

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

## Własna: mint {#custom-mint}

`registerSkin` dodaje nazwę do rejestru. Ta skórka rozszerza `pastel` i nadpisuje kilka tokenów: miętowy odcień tła paska narzędzi oraz głęboką zieleń dla obrysu obrazu i uchwytów zmiany rozmiaru. Spokojny kształt dziedziczy po pastel; wszystko, co nie zostało nadpisane (stany przycisków, menu, okna dialogowe), zachowuje wartości z pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skórka Mint..." />

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

Korzeń edytora ma klasę `tiptapify-skin-mint` — to furtka awaryjna dla wymiarów, których katalog tokenów nie obejmuje (zobacz [furtkę awaryjną](/pl/guide/skins#escape-hatch-the-root-class)).

## Skórka inline {#inline-skin}

Właściwość `skin` przyjmuje też obiekt: nadpisania tokenów i flagi kształtu, dziedziczące po zarejestrowanej skórce przez `extends`. Jest rozwiązywana tym samym łańcuchem, nigdy nie trafia do rejestru i jest renderowana z klasą `tiptapify-skin-inline` (lub `tiptapify-skin-{name}`, gdy obiekt zawiera `name`); jej tokeny trafiają do korzenia edytora jako zmienne CSS `--tf-*`.

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
