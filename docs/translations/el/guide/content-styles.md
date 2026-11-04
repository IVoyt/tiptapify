# Στυλ περιεχομένου {#content-styles}

Μέρος όσων αποθηκεύει ο επεξεργαστής χρειάζεται δική του εμφάνιση στη σελίδα που το δείχνει: κάρτες συνδέσμου, εικόνες με λεζάντα και περιτύλιξη, βίντεο και ενσωματώσεις που χωρούν στο πλάτος του κειμένου, λίστες εργασιών με πλαίσιο επιλογής δίπλα σε κάθε στοιχείο. Χωρίς αυτήν, η κάρτα συνδέσμου είναι ένας γυμνός σύνδεσμος με την εικόνα και τα κείμενά του κολλημένα μεταξύ τους.

Η ιδιότητα `contentStyles` ορίζει πώς το αποθηκευμένο HTML μεταφέρει αυτή την εμφάνιση:

| `contentStyles` | το αποθηκευμένο HTML | στον ιστότοπο |
|---|---|---|
| `inline` (προεπιλογή) | η εμφάνιση γράφεται στα χαρακτηριστικά `style` αυτών των στοιχείων | δεν φορτώνεται τίποτα: το HTML εμφανίζεται όπως είναι |
| `classes` | μόνο κλάσεις και χαρακτηριστικά `data-` | φορτώστε το `tiptapify/content.css` και βάλτε το HTML σε στοιχείο με την κλάση `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Και οι δύο τρόποι μεταφέρουν τους ίδιους κανόνες, αυτούς με τους οποίους ο ίδιος ο επεξεργαστής εμφανίζει το περιεχόμενο, οπότε μια σελίδα μοιάζει με τον επεξεργαστή και στις δύο περιπτώσεις. Μόνο αυτά τα στοιχεία τους παίρνουν: οι επικεφαλίδες, οι παράγραφοι, οι λίστες, οι πίνακες και το υπόλοιπο κείμενο κρατούν τα στυλ του ιστότοπου.

## Inline στυλ {#inline-styles}

Η προεπιλογή. Μια συμπαγής κάρτα συνδέσμου αποθηκεύεται ως:

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **Τα χρώματα μένουν του ιστότοπου.** Το κείμενο κληρονομεί το χρώμα του· το αχνό κείμενο και τα περιγράμματα χρησιμοποιούν αδιαφάνεια και ημιδιαφανές γκρι, ώστε να δουλεύουν το ίδιο σε φωτεινή και σε σκοτεινή σελίδα. Ορίστε το χρώμα κειμένου για ένα θέμα στον ιστότοπο ως συνήθως.
- **Δεν χρειάζονται media queries.** Μια συμπαγής κάρτα βάζει μόνη της την εικόνα πάνω από τα κείμενα σε στενή στήλη· τα βίντεο και οι ενσωματώσεις δεν γίνονται ποτέ πιο πλατιά από το κείμενο.
- **Ένας ιστότοπος μπορεί και πάλι να τα αλλάξει**, οι κλάσεις παραμένουν. Ένα inline στυλ υπερισχύει ενός κανόνα κλάσης, οπότε ένας τέτοιος κανόνας χρειάζεται `!important`.
- **Ένας sanitizer πρέπει να διατηρεί το χαρακτηριστικό `style`** σε αυτά τα στοιχεία, αλλιώς χάνουν την εμφάνισή τους.

## Κλάσεις και content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

Το `content.css` είναι μικρό και δεν περιέχει Vue ή Vuetify. Οι κανόνες του τυλίγονται σε `:where(.tiptapify-content)`, οπότε δεν έχουν βάρος: οποιοσδήποτε κανόνας του ιστότοπου υπερισχύει χωρίς `!important`. Χρησιμοποιήστε το όταν ο ιστότοπος θέλει την εμφάνιση σε ένα σημείο ή διαμορφώνει μόνος του το περιεχόμενό του.

Η `contentCss(scope)` δίνει το ίδιο φύλλο στυλ ως συμβολοσειρά, για άλλη κλάση από την `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Φόρτωση του HTML πίσω {#loading-html-back}

Ο επεξεργαστής διαβάζει αυτά τα στοιχεία μόνο από τα χαρακτηριστικά και τις κλάσεις τους: μια κάρτα συνδέσμου από το `data-link-card`, μια εικόνα από το `src`, το μέγεθος και την περιτύλιξή της, μια εργασία από το `data-checked`. Τα inline στυλ τους αγνοούνται όταν φορτώνεται HTML και γράφονται ξανά όταν αποθηκεύεται. Έτσι το ίδιο HTML πηγαινοέρχεται αναλλοίωτο, ένα έγγραφο που αποθηκεύτηκε με `inline` φορτώνεται καθαρά με `classes` και αντίστροφα, και μια μεταγενέστερη έκδοση του επεξεργαστή ενημερώνει την εμφάνιση ενός εγγράφου την επόμενη φορά που θα αποθηκευτεί.

Η μορφοποίηση κειμένου δεν αγγίζεται: το χρώμα ή το μέγεθος ενός κειμένου και η στοίχιση μιας παραγράφου είναι περιεχόμενο, και ο επεξεργαστής συνεχίζει να τα διαβάζει από τα στυλ τους.

Για να μετατρέψετε HTML με κλάσεις σε HTML με inline στυλ εκτός του επεξεργαστή (ένα παλαιότερο έγγραφο, ένα email), χρησιμοποιήστε την `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Χρειάζεται DOM (έναν browser ή το jsdom σε διακομιστή) και χωρίς αυτό επιστρέφει το HTML όπως είναι.

## Σλάιντερ εικόνων {#image-sliders}

Ο επεξεργαστής σημειώνει τις εικόνες σε σειρά ως σλάιντερ ενώ γράφετε (δείτε την ιδιότητα `imageSlider`)· το αποθηκευμένο HTML τις κρατά ως σχήματα το ένα μετά το άλλο. Η εμφάνισή τους ως σλάιντερ εναπόκειται στο δικό script του ιστότοπου.
