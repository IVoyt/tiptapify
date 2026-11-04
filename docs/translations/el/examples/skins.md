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

Το prop `skin` επιλέγει την εμφάνιση του περιβλήματος του επεξεργαστή: γραμμή εργαλείων, bubble menus, αναπτυσσόμενα μενού, παράθυρα διαλόγου.
Οι λειτουργίες δουλεύουν με τον ίδιο τρόπο σε κάθε skin. Οι έννοιες, ο πίνακας των tokens και οι συνταγές βρίσκονται στον
[οδηγό Skins](/el/guide/skins).

## Classic (προεπιλογή) {#classic-default}

Γραμμή εργαλείων με ανάγλυφη εμφάνιση, ομάδες κουμπιών ως ανάγλυφα κουτιά, bubble menus σε στυλ κάρτας:

<InteractiveEditor :bubble-menu="true" placeholder="Skin Classic..." />

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

Μια επίπεδη χρωματισμένη γραμμή εργαλείων κάτω από μια λεπτή γραμμή, διάφανα κουμπιά με ουδέτερη κατάσταση πατήματος, ελαφριά αναπτυσσόμενα μενού:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skin Pastel..." />

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

## Προσαρμοσμένο: mint {#custom-mint}

Το `registerSkin` προσθέτει ένα όνομα στο μητρώο. Αυτό το skin επεκτείνει το `pastel` και παρακάμπτει λίγα tokens: μια απόχρωση μέντας στο φόντο της γραμμής εργαλείων και βαθύ πράσινο για το περίγραμμα της εικόνας και τις λαβές αλλαγής μεγέθους. Το ήσυχο σχήμα κληρονομείται από το pastel· ό,τι δεν παρακάμπτεται (καταστάσεις κουμπιών, μενού, διάλογοι) κρατά τις τιμές του pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skin Mint..." />

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

Η ρίζα του επεξεργαστή φέρει την κλάση `tiptapify-skin-mint` — τη διέξοδο για διαστάσεις που δεν καλύπτει ο κατάλογος των tokens (δείτε [Διέξοδος](/el/guide/skins#escape-hatch-the-root-class)).

## Ενσωματωμένο skin {#inline-skin}

Το prop `skin` δέχεται και αντικείμενο: παρακάμψεις tokens και σημαίες σχήματος, με κληρονομιά από καταχωρισμένο skin μέσω του `extends`. Επιλύεται μέσω της ίδιας αλυσίδας, δεν μπαίνει ποτέ στο μητρώο και αποδίδεται με την κλάση `tiptapify-skin-inline` (ή `tiptapify-skin-{name}` όταν το αντικείμενο φέρει `name`)· τα tokens του καταλήγουν ως μεταβλητές CSS `--tf-*` στη ρίζα του επεξεργαστή.

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
