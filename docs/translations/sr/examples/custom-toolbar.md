# Prilagođena traka sa alatima {#custom-toolbar}

## Prikaz određenih stavki {#showing-specific-items}

Pomoću propa `items` prikažite samo dugmad trake sa alatima koja vam trebaju. Prosledite niz naziva stavki:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Koristite `|` kao separator između grupa dugmadi.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Prilagođena traka sa alatima..." />

## Padajući meni stilova lista {#list-styles-dropdown}

Sufiks `:styles` menja dugme liste padajućim menijem sa stilovima oznaka/numeracije: dugme liste otvara mrežu opcija `list-style-type`, sačuvanih kao inline stil. Mreža se renderuje unutar površine menija skina, pa prati aktivni skin ([vodič za skinove](/sr/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Otvorite padajuće menije stilova lista..." />

## Isključivanje stavki {#excluding-items}

Koristite `items-exclude` uz `items` da prikažete većinu stavki trake sa alatima, a izuzmete određene:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="Isključivanje nepotrebnih stavki..." />

## Prilagođeni odeljci {#custom-sections}

Grupišite stavke u sopstvene imenovane odeljke pomoću objekta:

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="Traka sa prilagođenim odeljcima..." />

## Referenca odeljaka trake sa alatima {#toolbar-sections-reference}

Stavke trake sa alatima organizovane su u odeljke. Evo svih dostupnih odeljaka:

| Odeljak        | Stavke                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Sakrivanje trake sa alatima {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="Bez trake sa alatima..." />

## Prilagođene komponente trake sa alatima {#custom-toolbar-components}

Dodajte sopstvena dugmad pomoću propa `customExtensions`. Svaki unos je [odeljak trake sa alatima](/sr/api/types#section) — upotrebite naziv ugrađenog odeljka (`misc`, `media`, …) da spojite dugmad u postojeću grupu, ili novi naziv za zasebnu grupu koja se prikazuje posle ugrađenih odeljaka:

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

Prilagođene komponente se renderuju unutar `<Tiptapify>`, pa imaju pristup istim deljenim vrednostima koje koristi ugrađena dugmad — uređivaču, prevodima i konfiguraciji na nivou uređivača:

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()` vraća konfiguraciju na nivou uređivača (`variantBtn`, `variantField`), pa se prilagođene komponente automatski usklađuju sa stilom ugrađene trake sa alatima.
- Prop `variantBtn` se i dalje prosleđuje svakoj komponenti trake sa alatima radi povratne kompatibilnosti — komponente napisane pre deljene konfiguracije nastavljaju da rade bez izmena.
- `inject('tiptapifyI18n')` daje istu funkciju za prevođenje koju koristi ugrađena dugmad.
