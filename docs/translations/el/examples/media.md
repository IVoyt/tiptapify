# Πολυμέσα {#media}

## Εικόνες {#images}

Εισαγωγή εικόνων από URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

Το κουμπί εικόνας ανοίγει το παράθυρο διαλόγου εικόνας:

- **Από URL** ή **Μεταφόρτωση**. Χωρίς [endpoint μεταφόρτωσης](/el/guide/uploads) το αρχείο που επιλέγεται ενσωματώνεται ως base64 data URL· με endpoint το αρχείο στέλνεται στον διακομιστή σας.
- **Εναλλακτικό κείμενο** (ο διάλογος σας υπενθυμίζει όταν είναι κενό) και **λεζάντα** κάτω από την εικόνα.
- **Μέγεθος**: αρχικό, πλάτος κειμένου ή προσαρμοσμένο πλάτος × ύψος με κλείδωμα αναλογίας.
- **Θέση**: στο κέντρο, σε δική της γραμμή, ή αιωρούμενη αριστερά ή δεξιά του κειμένου.

Μια επιλεγμένη εικόνα έχει λαβές αλλαγής μεγέθους (κάθε αλλαγή μεγέθους είναι ένα βήμα αναίρεσης) και μια γραμμή εργαλείων από πάνω της: αιώρηση αριστερά ή δεξιά, λήψη, επεξεργασία, διαγραφή. Με διπλό κλικ ανοίγει ο διάλογος.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Βίντεο {#videos}

Ενσωματώστε βίντεο YouTube και Vimeo ή ένα αρχείο βίντεο:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Το κουμπί βίντεο ανοίγει το παράθυρο διαλόγου βίντεο:

- **Ένας σύνδεσμος YouTube ή Vimeo** γίνεται το πρόγραμμα αναπαραγωγής τους· ο διάλογος δείχνει τον αναγνωρισμένο πάροχο και μια προεπισκόπηση, καθώς και το **Έναρξη από** (προσυμπληρωμένο από το `?t=`) όπου το υποστηρίζει το πρόγραμμα αναπαραγωγής.
- **Ένας σύνδεσμος σε αρχείο βίντεο** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) γίνεται `<video>` με εικόνα εξωφύλλου, στοιχεία ελέγχου, αυτόματη αναπαραγωγή (χωρίς ήχο) και επανάληψη. Ο σύνδεσμος χρειάζεται το πρωτόκολλό του (`https://`, `http://`), `//host` ή ένα `/path`: ο διάλογος δεν το μαντεύει ποτέ.
- Η **Μεταφόρτωση** στέλνει ένα αρχείο βίντεο στον διακομιστή σας· εμφανίζεται μόνο με [endpoint μεταφόρτωσης](/el/guide/uploads).
- **Μέγεθος**: προσαρμοστικό 16:9 ή προσαρμοσμένο πλάτος × ύψος με κλείδωμα αναλογίας.

Ένα URL YouTube που επικολλάται στο κείμενο ενσωματώνεται επίσης. Ένα κλικ σε πρόγραμμα αναπαραγωγής το επιλέγει αντί να το παίζει, ώστε να το δείχνει το κουμπί της γραμμής εργαλείων· με διπλό κλικ ανοίγει ο διάλογος.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Επικολλήστε ένα URL YouTube για να ενσωματώσετε βίντεο..." />

## Iframes {#iframes}

Ενσωματώστε μια σελίδα με τη διεύθυνσή της ή με τον κώδικα iframe από το μενού Κοινοποίηση ή Ενσωμάτωσή της:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Ο διάλογος iframe διαβάζει έναν επικολλημένο κώδικα (διεύθυνση, μέγεθος, τίτλο, δικαιώματα, sandbox, καθυστερημένη φόρτωση, πλήρη οθόνη) και λέει τι πήρε από αυτόν· ένας κώδικας με scripts ή άλλες ετικέτες απορρίπτεται. Δείχνει προεπισκόπηση και διαθέτει **τίτλο για αναγνώστες οθόνης**, το μέγεθος (προσαρμοστικό στις αναλογίες του κώδικα ή προσαρμοσμένο με κλείδωμα αναλογίας) και, στα **Σύνθετα**, το όνομα, τα `allow`, `sandbox`, την καθυστερημένη φόρτωση και ένα περίγραμμα. Η διεύθυνση χρειάζεται `https://` ή `http://`. Με διπλό κλικ σε μια ενσωμάτωση ανοίγει ο διάλογος.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Εισαγάγετε ένα URL για ενσωμάτωση ως iframe..." />

## Πίνακες {#tables}

Εισαγωγή και επεξεργασία πινάκων:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Μετά την εισαγωγή ενός πίνακα μπορείτε να:
- Προσθέτετε/αφαιρείτε γραμμές και στήλες
- Επιλέγετε κελιά
- Διαγράψετε ολόκληρο τον πίνακα

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Χρησιμοποιήστε το κουμπί πίνακα για να εισαγάγετε πίνακα..." />

## Σύνδεσμοι {#links}

Εισαγωγή υπερσυνδέσμων:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Ο διάλογος συνδέσμου δέχεται τη διεύθυνση όπως πληκτρολογείται: `https://…`, οποιοδήποτε άλλο σχήμα (`ftp://`, `ssh://`, ένα εσωτερικό), `mailto:`, `tel:`, `#anchor` ή `/page`. Δεν προσθέτει ποτέ πρωτόκολλο από μόνος του: μια διεύθυνση χωρίς πρωτόκολλο (`example.com`, `internal.host:8080`) εμφανίζει chips για προσθήκη `https://`, `http://` ή `ftp://` και μένει όπως πληκτρολογήθηκε αν δεν προσθέσετε κανένα. Οι διευθύνσεις `javascript:`, `vbscript:` και `data:` απορρίπτονται.

Ο διάλογος έχει επίσης το κείμενο του συνδέσμου, το **Άνοιγμα σε νέα καρτέλα** (που προσθέτει `noopener noreferrer`) και, στα **Σύνθετα**, τις τιμές `rel` ως chips (οποιαδήποτε τιμή: το Enter, το κενό ή το κόμμα την προσθέτει) και μια κλάση CSS.

Με το prop [`linkPreview`](/el/api/props#linkpreview) ο ίδιος διάλογος δείχνει έναν σύνδεσμο ως κάρτα με την εικόνα, τον τίτλο και την περιγραφή της σελίδας, και ένα URL που επικολλάται σε κενή γραμμή προσφέρει **Σύνδεσμος / Κάρτα** — δείτε [Κάρτες συνδέσμων](/el/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Επιλέξτε κείμενο και κάντε κλικ στον σύνδεσμο για να προσθέσετε υπερσύνδεσμο..." />

## Emoji {#emoji}

Εισαγωγή emoji από τον ενσωματωμένο επιλογέα με 10 κατηγορίες:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Ο επιλογέας emoji περιλαμβάνει πεδίο αναζήτησης/φίλτρου για γρήγορο εντοπισμό συγκεκριμένων emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Κάντε κλικ στο κουμπί emoji για να εισαγάγετε ένα emoji..." />

## Ειδικοί χαρακτήρες (Charmap) {#special-characters-charmap}

Εισαγωγή ειδικών χαρακτήρων, βελών, ελληνικών γραμμάτων, μαθηματικών συμβόλων και άλλων:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Οι κατηγορίες περιλαμβάνουν:
- Βέλη
- Νομίσματα
- Ελληνικά γράμματα
- Μαθηματικά σύμβολα
- Διάφορα

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Κάντε κλικ στο charmap για να εισαγάγετε ειδικούς χαρακτήρες..." />

## Συνδυασμός εργαλείων πολυμέσων {#combining-media-tools}

Μια πλήρης γραμμή εργαλείων πολυμέσων:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Πλήρης γραμμή εργαλείων πολυμέσων..." />
