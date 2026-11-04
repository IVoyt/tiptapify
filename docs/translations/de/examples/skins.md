# Skins {#skins}

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

Die Prop `skin` wählt das Erscheinungsbild des Editor-Chromes: Symbolleiste, Bubble-Menüs, Dropdowns, Dialoge.
Die Funktionen arbeiten in jedem Skin gleich. Die Konzepte, die Token-Tabelle und die Rezepte stehen in der
[Skins-Anleitung](/de/guide/skins).

## Classic (Standard) {#classic-default}

Eine erhabene Symbolleiste, Schaltflächengruppen als erhabene Boxen, Bubble-Menüs im Kartenstil:

<InteractiveEditor :bubble-menu="true" placeholder="Classic-Skin..." />

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

Eine flache, getönte Toolbar unter einer Haarlinie, Ghost-Buttons mit neutralem gedrückten Zustand, helle Dropdowns:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel-Skin..." />

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

## Eigener Skin: mint {#custom-mint}

`registerSkin` fügt der Registry einen Namen hinzu. Dieser Skin erweitert `pastel` und überschreibt eine Handvoll Tokens: einen Mintton für die Tönung der Symbolleiste und ein tiefes Grün für die Bildkontur und die Resize-Handles. Die ruhige Form kommt von pastel; alles, was nicht überschrieben ist (Schaltflächenzustände, Menüs, Dialoge), behält die Pastel-Werte:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint-Skin..." />

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

Der Editor-Root trägt die Klasse `tiptapify-skin-mint` — die Notlösung für Maße, die der Token-Katalog nicht abdeckt (siehe [Escape hatch](/de/guide/skins#escape-hatch-the-root-class)).

## Inline-Skin {#inline-skin}

Die Prop `skin` nimmt auch ein Objekt: Token-Überschreibungen und Form-Flags, die über `extends` von einem registrierten Skin erben. Es wird über dieselbe Kette aufgelöst, gelangt nie in die Registry und wird unter der Klasse `tiptapify-skin-inline` gerendert (oder `tiptapify-skin-{name}`, wenn das Objekt einen `name` trägt); seine Tokens landen als CSS-Variablen `--tf-*` am Editor-Root.

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
