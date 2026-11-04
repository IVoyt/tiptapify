# Pasirinktinė įrankių juosta {#custom-toolbar}

## Tik pasirinktų elementų rodymas {#showing-specific-items}

Naudokite savybę `items`, kad būtų rodomi tik jums reikalingi įrankių juostos mygtukai. Perduokite elementų pavadinimų masyvą:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Naudokite `|` kaip skirtuką tarp mygtukų grupių.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Pasirinktinė įrankių juosta..." />

## Sąrašo stilių išskleidžiamasis meniu {#list-styles-dropdown}

Priesaga `:styles` sąrašo mygtuką pakeičia ženklelių / numeravimo stilių išskleidžiamuoju meniu: sąrašo mygtukas atidaro `list-style-type` parinkčių tinklelį, išsaugomą kaip įterptinį stilių. Tinklelis atvaizduojamas apvalkalo meniu paviršiuje, todėl seka aktyvų apvalkalą ([apvalkalų vadovas](/lt/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Atidarykite sąrašo stilių išskleidžiamuosius meniu..." />

## Elementų neįtraukimas {#excluding-items}

Naudokite `items-exclude` kartu su `items`, kad būtų rodoma dauguma įrankių juostos elementų, išskyrus nurodytus:

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
placeholder="Nereikalingų elementų neįtraukimas..." />

## Pasirinktiniai skyriai {#custom-sections}

Sugrupuokite elementus į savo pavadintus skyrius naudodami objektą:

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
placeholder="Įrankių juosta su pasirinktiniais skyriais..." />

## Įrankių juostos skyrių nuoroda {#toolbar-sections-reference}

Įrankių juostos elementai suskirstyti į skyrius. Štai visi galimi skyriai:

| Skyrius        | Elementai                                                                               |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Įrankių juostos slėpimas {#hiding-the-toolbar}

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
placeholder="Be įrankių juostos..." />

## Pasirinktiniai įrankių juostos komponentai {#custom-toolbar-components}

Pridėkite savo mygtukus per savybę `customExtensions`. Kiekvienas įrašas yra [įrankių juostos skyrius](/lt/api/types#section) – naudokite įtaisytojo skyriaus pavadinimą (`misc`, `media`, …), kad sujungtumėte savo mygtukus su esama grupe, arba naują pavadinimą atskirai grupei, atvaizduojamai po įtaisytųjų skyrių:

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

Pasirinktiniai komponentai atvaizduojami `<Tiptapify>` viduje, todėl jie turi prieigą prie tų pačių bendrų reikšmių, kurias naudoja įtaisytieji mygtukai – redaktoriaus, vertimų ir redaktoriaus lygio konfigūracijos:

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

- `useTiptapifyConfig()` grąžina redaktoriaus lygio konfigūraciją (`variantBtn`, `variantField`), todėl pasirinktiniai komponentai automatiškai atitinka įtaisytosios įrankių juostos stilių.
- Savybė `variantBtn` vis dar perduodama kiekvienam įrankių juostos komponentui dėl atgalinio suderinamumo – prieš atsirandant bendrai konfigūracijai parašyti komponentai toliau veikia nepakitę.
- `inject('tiptapifyI18n')` suteikia tą pačią vertimo funkciją, kurią naudoja įtaisytieji mygtukai.
