# Prilagođena alatna traka {#custom-toolbar}

## Prikaz određenih stavki {#showing-specific-items}

Koristite prop `items` za prikaz samo onih gumba alatne trake koji su vam potrebni. Proslijedite niz naziva stavki:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Koristite `|` kao separator između grupa gumba.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Prilagođena alatna traka..." />

## Padajući izbornik stilova popisa {#list-styles-dropdown}

Sufiks `:styles` zamjenjuje gumb popisa padajućim izbornikom stilova oznaka/numeriranja: gumb popisa otvara mrežu opcija `list-style-type`, spremljenih kao inline stil. Mreža se prikazuje unutar površine izbornika skina, pa prati aktivni skin ([vodič za skinove](/hr/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Otvorite padajuće izbornike stilova popisa..." />

## Isključivanje stavki {#excluding-items}

Koristite `items-exclude` uz `items` da prikažete većinu stavki alatne trake, a isključite određene:

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
placeholder="Isključivanje neželjenih stavki..." />

## Prilagođeni odjeljci {#custom-sections}

Grupirajte stavke u vlastite imenovane odjeljke pomoću objekta:

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
placeholder="Alatna traka s prilagođenim odjeljcima..." />

## Referenca odjeljaka alatne trake {#toolbar-sections-reference}

Stavke alatne trake organizirane su u odjeljke. Evo svih dostupnih odjeljaka:

| Odjeljak       | Stavke                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Sakrivanje alatne trake {#hiding-the-toolbar}

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
placeholder="Bez alatne trake..." />

## Prilagođene komponente alatne trake {#custom-toolbar-components}

Dodajte vlastite gumbe pomoću propa `customExtensions`. Svaki unos je [odjeljak alatne trake](/hr/api/types#section) — koristite naziv ugrađenog odjeljka (`misc`, `media`, …) da spojite svoje gumbe u postojeću grupu ili novo ime za zasebnu grupu prikazanu nakon ugrađenih odjeljaka:

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

Prilagođene komponente prikazuju se unutar `<Tiptapify>`, pa imaju pristup istim zajedničkim vrijednostima koje koriste ugrađeni gumbi — uređivaču, prijevodima i konfiguraciji na razini uređivača:

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

- `useTiptapifyConfig()` vraća konfiguraciju na razini uređivača (`variantBtn`, `variantField`), pa se prilagođene komponente automatski uklapaju u stil ugrađene alatne trake.
- Prop `variantBtn` i dalje se prosljeđuje svakoj komponenti alatne trake radi povratne kompatibilnosti — komponente napisane prije zajedničke konfiguracije rade nepromijenjeno.
- `inject('tiptapifyI18n')` daje istu funkciju prijevoda koju koriste ugrađeni gumbi.
