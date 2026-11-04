# Orodna vrstica po meri {#custom-toolbar}

## Prikaz določenih elementov {#showing-specific-items}

Z lastnostjo `items` prikažite samo gumbe orodne vrstice, ki jih potrebujete. Podajte polje imen elementov:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Za ločilo med skupinami gumbov uporabite `|`.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Orodna vrstica po meri..." />

## Spustni meni slogov seznama {#list-styles-dropdown}

Pripona `:styles` gumb seznama zamenja z njegovim spustnim menijem slogov oznak/oštevilčenja: gumb seznama odpre mrežo možnosti `list-style-type`, shranjenih kot vrstični slog. Mreža se izriše znotraj površine menija preobleke, zato sledi aktivni preobleki ([vodnik za preobleke](/sl/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Odprite spustne menije slogov seznama..." />

## Izključevanje elementov {#excluding-items}

Z `items-exclude` ob `items` prikažete večino elementov orodne vrstice, določene pa izključite:

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
placeholder="Izključevanje neželenih elementov..." />

## Odseki po meri {#custom-sections}

Elemente razvrstite v lastne poimenovane odseke z objektom:

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
placeholder="Orodna vrstica z odseki po meri..." />

## Referenca odsekov orodne vrstice {#toolbar-sections-reference}

Elementi orodne vrstice so razvrščeni v odseke. Tukaj so vsi razpoložljivi odseki:

| Odsek          | Elementi                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Skrivanje orodne vrstice {#hiding-the-toolbar}

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
placeholder="Brez orodne vrstice..." />

## Komponente orodne vrstice po meri {#custom-toolbar-components}

Z lastnostjo `customExtensions` dodajte lastne gumbe. Vsak vnos je [odsek orodne vrstice](/sl/api/types#section) — uporabite ime vgrajenega odseka (`misc`, `media`, …), da svoje gumbe združite z obstoječo skupino, ali novo ime za ločeno skupino, izrisano za vgrajenimi odseki:

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

Komponente po meri se izrišejo znotraj `<Tiptapify>`, zato imajo dostop do istih skupnih vrednosti kot vgrajeni gumbi — urejevalnika, prevodov in konfiguracije na ravni urejevalnika:

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

- `useTiptapifyConfig()` vrne konfiguracijo na ravni urejevalnika (`variantBtn`, `variantField`), zato se komponente po meri samodejno ujemajo s slogom vgrajene orodne vrstice.
- Lastnost `variantBtn` se zaradi povratne združljivosti še vedno poda vsaki komponenti orodne vrstice — komponente, napisane pred skupno konfiguracijo, delujejo nespremenjeno.
- `inject('tiptapifyI18n')` vrne isto funkcijo prevajanja, ki jo uporabljajo vgrajeni gumbi.
