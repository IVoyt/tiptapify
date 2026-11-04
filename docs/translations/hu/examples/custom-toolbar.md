# Egyéni eszköztár {#custom-toolbar}

## Meghatározott elemek megjelenítése {#showing-specific-items}

Az `items` propot használva csak a szükséges eszköztárgombokat jelenítheted meg. Adj át elemneveket tartalmazó tömböt:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

A gombcsoportok elválasztásához használd a `|` jelet.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Egyéni eszköztár..." />

## Listastílusok legördülő menü {#list-styles-dropdown}

A `:styles` utótag a listagombot a jelölő-/számozási stílusok legördülő menüjére cseréli: a listagomb `list-style-type` opciók rácsát nyitja meg, amelyek beágyazott stílusként mentődnek. A rács a skin menüfelületén belül jelenik meg, így az aktív skint követi ([Skin útmutató](/hu/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Nyisd meg a listastílusok legördülő menüit..." />

## Elemek kizárása {#excluding-items}

Az `items-exclude` az `items` mellett használva az eszköztárelemek többségét megjeleníti, de a megadottakat kizárja:

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
placeholder="A nem kívánt elemek kizárása..." />

## Egyéni szakaszok {#custom-sections}

Az elemeket saját elnevezett szakaszokba csoportosíthatod egy objektummal:

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
placeholder="Egyéni szakaszos eszköztár..." />

## Eszköztár-szakaszok referenciája {#toolbar-sections-reference}

Az eszköztárelemek szakaszokba vannak szervezve. Az összes elérhető szakasz:

| Szakasz        | Elemek                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Az eszköztár elrejtése {#hiding-the-toolbar}

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
placeholder="Nincs eszköztár..." />

## Egyéni eszköztár-komponensek {#custom-toolbar-components}

Saját gombokat a `customExtensions` proppal adhatsz hozzá. Minden bejegyzés egy [eszköztár-szakasz](/hu/api/types#section) — használj beépített szakasznevet (`misc`, `media`, …), hogy a gombjaid egy meglévő csoportba kerüljenek, vagy új nevet, hogy a beépített szakaszok után megjelenő külön csoportot kapj:

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

Az egyéni komponensek a `<Tiptapify>` belsejében renderelődnek, így hozzáférnek ugyanazokhoz a megosztott értékekhez, mint a beépített gombok — a szerkesztőhöz, a fordításokhoz és a szerkesztőszintű konfigurációhoz:

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

- A `useTiptapifyConfig()` a szerkesztőszintű konfigurációt (`variantBtn`, `variantField`) adja vissza, így az egyéni komponensek automatikusan illeszkednek a beépített eszköztár stílusához.
- A `variantBtn` prop a visszamenőleges kompatibilitás miatt továbbra is átadódik minden eszköztár-komponensnek — a megosztott konfiguráció előtt írt komponensek változtatás nélkül működnek tovább.
- Az `inject('tiptapifyI18n')` ugyanazt a fordítófüggvényt adja, amelyet a beépített gombok használnak.
