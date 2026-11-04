# Oma työkalurivi {#custom-toolbar}

## Tiettyjen kohteiden näyttäminen {#showing-specific-items}

Käytä `items`-propsia näyttääksesi vain tarvitsemasi työkalurivin painikkeet. Anna kohteiden nimet taulukkona:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Käytä `|`-merkkiä erottimena painikeryhmien välillä.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Oma työkalurivi..." />

## Luettelotyylien pudotusvalikko {#list-styles-dropdown}

Pääte `:styles` vaihtaa luettelopainikkeen sen merkki- ja numerointityylien pudotusvalikkoon: luettelopainike avaa ruudukon `list-style-type`-vaihtoehdoista, jotka tallennetaan inline-tyylinä. Ruudukko piirretään teeman valikkopinnan sisään, joten se noudattaa aktiivista teemaa ([Skins-opas](/fi/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Avaa luettelotyylien pudotusvalikot..." />

## Kohteiden poissulkeminen {#excluding-items}

Käytä `items-exclude`-propsia yhdessä `items`-propsin kanssa näyttääksesi suurimman osan työkalurivin kohteista ja jättääksesi tietyt pois:

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
placeholder="Ei-toivottujen kohteiden poissulkeminen..." />

## Omat osiot {#custom-sections}

Ryhmittele kohteet omiin nimettyihin osioihin objektin avulla:

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
placeholder="Työkalurivi omilla osioilla..." />

## Työkalurivin osioiden viite {#toolbar-sections-reference}

Työkalurivin kohteet on jaettu osioihin. Tässä ovat kaikki käytettävissä olevat osiot:

| Osio           | Kohteet                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Työkalurivin piilottaminen {#hiding-the-toolbar}

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
placeholder="Ei työkaluriviä..." />

## Omat työkalurivin komponentit {#custom-toolbar-components}

Lisää omia painikkeita `customExtensions`-propsilla. Jokainen merkintä on [työkalurivin osio](/fi/api/types#section) — käytä sisäänrakennetun osion nimeä (`misc`, `media`, …) yhdistääksesi painikkeesi olemassa olevaan ryhmään tai uutta nimeä erilliselle ryhmälle, joka piirretään sisäänrakennettujen osioiden jälkeen:

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

Omat komponentit piirretään `<Tiptapify>`-komponentin sisällä, joten niillä on pääsy samoihin jaettuihin arvoihin kuin sisäänrakennetuilla painikkeilla — editoriin, käännöksiin ja editoritason määrityksiin:

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

- `useTiptapifyConfig()` palauttaa editoritason määritykset (`variantBtn`, `variantField`), joten omat komponentit vastaavat automaattisesti sisäänrakennetun työkalurivin tyyliä.
- `variantBtn`-propsi välitetään edelleen jokaiselle työkalurivin komponentille taaksepäin yhteensopivuuden vuoksi — ennen jaettua määritystä kirjoitetut komponentit toimivat muuttumattomina.
- `inject('tiptapifyI18n')` antaa saman käännösfunktion, jota sisäänrakennetut painikkeet käyttävät.
