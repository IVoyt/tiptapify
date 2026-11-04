# Προσαρμοσμένη γραμμή εργαλείων {#custom-toolbar}

## Εμφάνιση συγκεκριμένων στοιχείων {#showing-specific-items}

Χρησιμοποιήστε το prop `items` για να εμφανίσετε μόνο τα κουμπιά της γραμμής εργαλείων που χρειάζεστε. Περάστε έναν πίνακα με ονόματα στοιχείων:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Χρησιμοποιήστε το `|` ως διαχωριστικό μεταξύ ομάδων κουμπιών.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Προσαρμοσμένη γραμμή εργαλείων..." />

## Αναπτυσσόμενο μενού στυλ λίστας {#list-styles-dropdown}

Το επίθημα `:styles` αντικαθιστά ένα κουμπί λίστας με το αναπτυσσόμενο μενού στυλ κουκκίδων/αρίθμησης: το κουμπί λίστας ανοίγει ένα πλέγμα επιλογών `list-style-type`, που αποθηκεύονται ως inline στυλ. Το πλέγμα αποδίδεται μέσα στην επιφάνεια μενού του skin, οπότε ακολουθεί το ενεργό skin ([οδηγός Skins](/el/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Ανοίξτε τα αναπτυσσόμενα μενού στυλ λίστας..." />

## Εξαίρεση στοιχείων {#excluding-items}

Χρησιμοποιήστε το `items-exclude` μαζί με το `items` για να εμφανίσετε τα περισσότερα στοιχεία της γραμμής εργαλείων εξαιρώντας συγκεκριμένα:

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
placeholder="Εξαίρεση ανεπιθύμητων στοιχείων..." />

## Προσαρμοσμένες ενότητες {#custom-sections}

Ομαδοποιήστε στοιχεία σε δικές σας ονομασμένες ενότητες χρησιμοποιώντας ένα αντικείμενο:

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
placeholder="Γραμμή εργαλείων με προσαρμοσμένες ενότητες..." />

## Αναφορά ενοτήτων της γραμμής εργαλείων {#toolbar-sections-reference}

Τα στοιχεία της γραμμής εργαλείων οργανώνονται σε ενότητες. Ακολουθούν όλες οι διαθέσιμες ενότητες:

| Ενότητα        | Στοιχεία                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Απόκρυψη της γραμμής εργαλείων {#hiding-the-toolbar}

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
placeholder="Χωρίς γραμμή εργαλείων..." />

## Προσαρμοσμένα στοιχεία γραμμής εργαλείων {#custom-toolbar-components}

Προσθέστε τα δικά σας κουμπιά με το prop `customExtensions`. Κάθε καταχώριση είναι μια [ενότητα γραμμής εργαλείων](/el/api/types#section) — χρησιμοποιήστε το όνομα μιας ενσωματωμένης ενότητας (`misc`, `media`, …) για να συγχωνεύσετε τα κουμπιά σας σε υπάρχουσα ομάδα, ή ένα νέο όνομα για ξεχωριστή ομάδα που αποδίδεται μετά τις ενσωματωμένες ενότητες:

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

Τα προσαρμοσμένα στοιχεία αποδίδονται μέσα στο `<Tiptapify>`, οπότε έχουν πρόσβαση στις ίδιες κοινές τιμές που χρησιμοποιούν τα ενσωματωμένα κουμπιά — επεξεργαστή, μεταφράσεις και ρυθμίσεις σε επίπεδο επεξεργαστή:

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

- Το `useTiptapifyConfig()` επιστρέφει τις ρυθμίσεις σε επίπεδο επεξεργαστή (`variantBtn`, `variantField`), ώστε τα προσαρμοσμένα στοιχεία να ταιριάζουν αυτόματα με το στυλ της ενσωματωμένης γραμμής εργαλείων.
- Το prop `variantBtn` εξακολουθεί να περνιέται σε κάθε στοιχείο της γραμμής εργαλείων για συμβατότητα προς τα πίσω — τα στοιχεία που γράφτηκαν πριν από τις κοινές ρυθμίσεις συνεχίζουν να λειτουργούν αμετάβλητα.
- Το `inject('tiptapifyI18n')` δίνει την ίδια συνάρτηση μετάφρασης που χρησιμοποιούν τα ενσωματωμένα κουμπιά.
