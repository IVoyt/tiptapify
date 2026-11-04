# Skins {#skins}

Ένα **skin** είναι μία εμφάνιση του περιβλήματος του επεξεργαστή: η γραμμή εργαλείων, τα κουμπιά και οι ομάδες της, τα bubble menus, τα αναπτυσσόμενα μενού, οι διάλογοι, το πλαίσιο γύρω από το περιεχόμενο και το περίβλημα επιλογής εικόνας. Το prop `skin` το επιλέγει:

```vue
<Tiptapify skin="pastel" />
```

Ένα skin αποτελείται από δύο πράγματα: τα **tokens** (χρώματα και μεγέθη ως μεταβλητές CSS) και το **σχήμα** (δομικές παραλλαγές που ένα token δεν μπορεί να εκφράσει). Τα δύο ενσωματωμένα skins είναι το `default` — η κλασική εμφάνιση, μια ανασηκωμένη γραμμή εργαλείων με ανασηκωμένες ομάδες κουμπιών — και το `pastel`, η ήρεμη εμφάνιση. Τα προσαρμοσμένα skins είναι πλήρως ισότιμα: το `registerSkin()` και τα ενσωματωμένα αντικείμενα skin επιλύονται με ακριβώς τον ίδιο μηχανισμό, και τα ενσωματωμένα skins είναι καταχωρισμένα skins, όχι ειδικές περιπτώσεις.

## Ορολογία: skin έναντι θέματος Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — ο όρος προς τον χρήστη για μία εμφάνιση του περιβλήματος του επεξεργαστή: tokens + shape. Το prop είναι `skin`, οι τύποι είναι `TiptapifySkin*`, το μητρώο είναι το `registerSkin()`, η κλάση ρίζας είναι `tiptapify-skin-{name}`.
- **θέμα (theme)** — δεσμευμένο για τα ανοιχτά/σκούρα θέματα του Vuetify. Τα στοιχεία του Tiptapify τροφοδοτούν τα props `theme` από το τρέχον όνομα θέματος του Vuetify· το σύστημα skin δεν τα αγγίζει ποτέ.

Συνδυάζονται: τα περισσότερα ενσωματωμένα χρώματα tokens αναφέρονται σε μεταβλητές θέματος του Vuetify (`rgb(var(--v-theme-surface))`, …), ώστε τα skins να ακολουθούν αυτόματα το ανοιχτό/σκούρο θέμα. Τα κελιά σταθερού σκούρου χρώματος στη στήλη classic — η λαβή αλλαγής μεγέθους (`rgba(0, 0, 0, .5/.8)`), το απλό περίγραμμα εικόνας, η σκιά του bubble και οι σκιές ύψους μενού/διαλόγου — είναι σκόπιμα: η κλασική εμφάνιση χρωματίζει ουδέτερο σκούρο περίβλημα και στα δύο θέματα, και η μετρημένη βάση τα καθηλώνει. Ένα προσαρμοσμένο skin μπορεί να αναφέρεται ελεύθερα σε μεταβλητές θέματος — δείτε τον πίνακα tokens.

## Έννοια {#concept}

### Tokens {#tokens}

Ένα token είναι μια προσαρμοσμένη ιδιότητα CSS με όνομα `--tf-*`. Το κλειδί του καταλόγου είναι το camelCase του επιθέματος CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Οι τιμές είναι απλές συμβολοσειρές — χρώματα, πλήρεις συντομογραφίες περιγράμματος, σκιές, εσωτερικά περιθώρια, ακτίνες.

Κάθε κανόνας skin της βιβλιοθήκης υπάρχει **μία φορά**, διαβάζοντας το token του με εφεδρική τιμή ίση με την κλασική (βασική) τιμή:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Ένα επιλυμένο skin εκπέμπει ως μεταβλητές μόνο τις **παρακάμψεις** του· οι εφεδρικές τιμές CSS μεταφέρουν τη βάση. Οι μεταβλητές καταλήγουν στη ρίζα του επεξεργαστή — και, επειδή τα μενού και οι διάλογοι μεταφέρονται (teleport) έξω από αυτήν, στο περιτύλιγμα `SkinScope` κάθε μενού και στην ίδια την κάρτα του διαλόγου, ώστε τα tokens να ακολουθούν κάθε επιφάνεια.

### Shape {#shape}

Έξι σημαίες αποφασίζουν ποια σύνολα κανόνων εφαρμόζονται· τα tokens τα χρωματίζουν:

| σημαία | τιμές | τι αλλάζει |
|---|---|---|
| `toolbar` | `raised` · `flat` | ύψος VToolbar + χωρίς εσωτερική λεπτή γραμμή έναντι επίπεδης γραμμής με απόχρωση |
| `groups` | `box` · `flat` | ενότητες γραμμής εργαλείων ως ανάγλυφα κουτιά **VBtnGroup** (markup 0.3.2: ενωμένα κουμπιά, τα tokens ομάδας χρωματίζουν το κουτί) έναντι απλών σειρών flex div |
| `buttons` | `vuetify` · `quiet` | εγγενή κουμπιά Vuetify έναντι κουμπιών-φαντασμάτων με ουδέτερη κατάσταση πατήματος |
| `bubble` | `card` · `flat` | διατηρείται για συμβατότητα: τα bubble menus είναι μία σειρά κουμπιών εικονιδίων χρωματισμένη από tokens και στα δύο σχήματα (τα κουμπιά τους ακολουθούν το `buttons`) |
| `dialog` | `classic` · `soft` | διαχωριστική γραμμή κάτω από τον τίτλο, ανάγλυφο κλείσιμο έναντι απαλής κάρτας, κλείσιμο με κείμενο |
| `menu` | `vuetify` · `soft` | αναπτυσσόμενα μενού: λίστα Vuetify έναντι ανοιχτής κάρτας με εσωτερικά περιθώρια |

Το επιλυμένο shape κωδικοποιείται στη ρίζα του επεξεργαστή ως έξι κλάσεις `.tiptapify-shape-{flag}-{value}` και εκτίθεται ως `shape: ComputedRef<ResolvedShape>` στο [`useTiptapifyConfig()`](/el/api/types#usetiptapifyconfig) για προσαρμοσμένα στοιχεία γραμμής εργαλείων.

### Extends {#extends}

Ένα skin επιλύεται πάνω στην κλασική βάση, μετά την αλυσίδα `extends` από τη ρίζα προς τα έξω, και τέλος τα δικά του μέλη:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Οι συνδέσεις που λείπουν επιλύονται στην αθροισμένη αλυσίδα (με προειδοποίηση dev)· ένας κύκλος επιλύεται στο classic (με προειδοποίηση dev). Ένα καταχωρισμένο skin αναφέρεται με το όνομά του· ένα ενσωματωμένο αντικείμενο skin μπορεί να κάνει `extends` ένα καταχωρισμένο όνομα και δεν μπαίνει ποτέ στο καθολικό μητρώο — τα προσαρμοσμένα skins δεν διαρρέουν ποτέ ανάμεσα σε επεξεργαστές. Τα άγνωστα κλειδιά tokens αγνοούνται με προειδοποίηση dev.

Ζωντανά demos και των τριών μορφών υπάρχουν στη [σελίδα παραδειγμάτων Skins](/el/examples/skins).

## Κατάλογος tokens {#token-catalog}

Οι παρακάτω πίνακες είναι το **συμβόλαιο v1**: τα κλειδιά του καταλόγου (`TiptapifySkinColors` / `TiptapifySkinMetrics`) είναι τα ονόματα που μπορείτε να ορίσετε. Τα κελιά classic είναι οι εφεδρικές τιμές CSS — η τιμή που χρωματίζουν οι βασικοί κανόνες όταν κανένα skin δεν παρακάμπτει το token.

### Γραμμή εργαλείων / μπάρα {#toolbar-bar}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Στοιχεία / ομάδες / διαχωριστικά {#items-groups-dividers}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (διάκενο: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Το μετρημένο κελί classic είναι `normal` — η εγγενής τιμή flex του Vuetify, που είναι αυτό που φέρει η εφεδρική τιμή CSS. Η βασική τιμή του καταλόγου `0px` είναι το ισοδύναμο ρητό μήκος για παρακάμψεις skin.

<a id="shadow-cells"></a>² Τα κελιά που γράφουν «Vuetify elevation *n*» είναι περιγραφικά: η ακριβής συμβολοσειρά τριπλής σκιάς είναι η μετρημένη τιμή στο αποθηκευμένο fixture βάσης (`src/skins/__fixtures__/skin-baseline.json`) και αποτελεί την εφεδρική τιμή CSS. Για το `groupShadow` αυτό είναι το **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — με `groups: 'box'` η ενότητα είναι ένα VBtnGroup (`elevation="4"`), και ο κανόνας του token χρωματίζει το κουτί με αυτή την τριάδα πάνω από το δικό του elevation της ομάδας: το κουτί κατέχει το elevation, τα ενωμένα κουμπιά-παιδιά δεν φέρουν κανένα.

### Κουμπιά {#buttons}

Αυτά τα tokens καταναλώνονται **μόνο με `buttons: 'quiet'`** — δείτε [Προσβασιμότητα](#reachability).

| token | Μεταβλητή CSS | τιμή quiet (classic: εγγενές Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menus (επιλογή, κενή γραμμή, εικόνα) {#bubble-menus-selection-empty-line-image}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | το ίδιο |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | το ίδιο |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | το ίδιο |

### Αναπτυσσόμενα μενού {#dropdown-menus}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Το κουτί της **λίστας** (ακτίνα, σκιά, εσωτερικό περιθώριο λίστας) του κλασικού μενού είναι σήμερα κανόνας skin — το περιτύλιγμα tokens `SkinScope` βρίσκεται ανάμεσα στον δικό του κανόνα-παιδί του Vuetify και τη λίστα, οπότε η βιβλιοθήκη αποκαθιστά αυτά τα pixel ως κανόνες skin που διαβάζουν τα παραπάνω tokens. Τα pixel των **στοιχείων** μένουν εγγενή Vuetify (το fixture μετρά τις προεπιλογές του Vuetify εκεί): τα τέσσερα tokens στοιχείων είναι ανενεργά όσο ισχύει `menu: 'vuetify'`.

### Διάλογοι {#dialogs}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | προεπιλογή πεδίου (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Πλαίσιο (περιτύλιγμα περιγράμματος του επεξεργαστή) {#frame-editor-border-wrapper}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, χωρίς πάνω άκρη | πλήρες περίγραμμα |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Με το επίπεδο shape της γραμμής εργαλείων, το πλαίσιο χρωματίζει επιπλέον μια διαφορά ανά πλευρά (μια πάνω άκρη και την κάτω άκρη με 1,6× την αδιαφάνεια του περιγράμματος). Αυτή η διαφορά ανήκει στο shape, όχι σε token: δεν είναι προσβάσιμη μέσω token.

### Εικόνες και λαβές αλλαγής μεγέθους {#images-and-resize-handles}

| token | Μεταβλητή CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (επιλεγμένο) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Η γραμμή εργαλείων της εικόνας ακολουθεί τη σημαία `buttons`: με το quiet shape παίρνει την ήσυχη επιφάνεια — τα διάκενα 2px/4px διαβάζουν τα `--tf-bubble-gap` / `--tf-bubble-padding` με εφεδρικές τιμές του μενού εικόνας· δεν υπάρχει αποκλειστικό token για τη γραμμή εργαλείων της εικόνας.

### Εκτός καταλόγου (περιοχή διεξόδου) {#not-in-the-catalog-escape-hatch-territory}

Ορισμένες διαστάσεις που αναφέρονται στην επισκόπηση σχεδιασμού δεν έχουν token στον κατάλογο της v1: **ύψος γραμμής εργαλείων, πλάτος πλαισίου, ακτίνα πλαισίου, πλάτος κουμπιού, εσωτερικό περιθώριο κουμπιού, πλάτος διαλόγου**. Οι πίνακες του καταλόγου παραπάνω είναι το συμβόλαιο· για αυτά τα pixel ανοίξτε τη [διέξοδο](#escape-hatch-the-root-class) και μορφοποιήστε απευθείας τις σταθερές κλάσεις.

## Προσβασιμότητα {#reachability}

Το συμβόλαιο, διατυπωμένο μία φορά και τηρούμενο από κάθε ομάδα παραπάνω:

> Ένα token χρωματίζει μια επιφάνεια μόνο όταν το shape ενεργοποιεί αυτή την επιφάνεια· τα εγγενή οπτικά του Vuetify μορφοποιούνται μέσω των χρωμάτων θέματος του Vuetify.

Ανά ομάδα:

- **Γραμμή εργαλείων, πλαίσιο, περίβλημα εικόνας/λαβής** — ενεργά σε κάθε shape· τα tokens τα χρωματίζουν, τα κελιά classic είναι η εγγενής εμφάνιση στην οποία επιστρέφουν τα tokens.
- **Κουτί ομάδων** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — με `groups: 'box'` η ενότητα είναι ένα VBtnGroup (δομή 0.3.2: τα κουμπιά ενώνονται, το κουτί φέρει το elevation)· οι κανόνες του κουτιού το χρωματίζουν με τα tokens ομάδας, και το `--tf-group-height` κρατά το συμβόλαιο των 32px με `!important` (ο κανόνας πυκνότητας του Vuetify το πολεμά, όπως στη 0.3.2). Με `groups: 'flat'` οι ενότητες είναι απλές σειρές div (διαφανείς, χωρίς σκιά, ακτίνα 0 είναι η βάση του shape).
- **Λεπτές γραμμές διαχωριστικών** (`dividerWidth/Height/Color`) — η ορατή λεπτή γραμμή είναι δυνατότητα του `groups: 'flat'`· στο box shape το διαχωριστικό είναι διάκενο μηδενικού μεγέθους (`margin: 0 4px` από τον βασικό κανόνα).
- **Εσωτερικά περιθώρια/διάκενα στοιχείων** — η συμπαγής σειρά `6px 8px` ισχύει μόνο στην επίπεδη μπάρα (`toolbar: 'flat'`), τα διάκενα ομάδων στις επίπεδες ενότητες (`groups: 'flat'`)· η ανάγλυφη μπάρα κρατά τις κλασικές μετρικές.
- **Κουμπιά** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — ανενεργά με `buttons: 'vuetify'`: τα εγγενή κουμπιά Vuetify χρωματίζουν μόνα τους τις καταστάσεις τους. Μορφοποιήστε τα με χρώματα θέματος του Vuetify (`primary`, `surface`, …) — τα κλασικά shapes τα κληρονομούν σκόπιμα.
- **Μετρικές στοιχείων μενού** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — ανενεργές με `menu: 'vuetify'`· το Vuetify κατέχει αυτά τα pixel των στοιχείων. Το κουτί της **λίστας** του μενού (ακτίνα/σκιά/εσωτερικό περιθώριο) χρωματίζεται από το skin και στα δύο shapes (δείτε τη [σημείωση μενού](#menu-classic-note)).
- **Απαλό περίβλημα διαλόγου** (`dialogActionBtn*`, `dialogFieldRadius`, τα απαλά εσωτερικά περιθώρια, η απούσα διαχωριστική γραμμή) — χρωματίζεται με `dialog: 'soft'`· με `dialog: 'classic'` ο διάλογος είναι VCard με τα κλασικά εσωτερικά περιθώρια.
- **Περίβλημα bubble** — τα μενού επιλογής, κενής γραμμής και εικόνας είναι μία σειρά κουμπιών εικονιδίων και στα δύο shapes, χρωματισμένη από τα tokens bubble· το `bubble` δεν αλλάζει πλέον το markup τους.

Μια παράκαμψη ίση με τη βάση του καταλόγου **δεν εκπέμπεται** — με non-classic shape χρωματίζει η δική του βάση του shape μέσω της εφεδρικής τιμής CSS, οπότε η «επαναφορά» μιας κλασικής τιμής (π.χ. ορίζοντας το `buttonActiveBg` ξανά σε `rgb(var(--v-theme-primary))` με `buttons: 'quiet'`) δεν κάνει σιωπηλά τίποτα. Για να επιβάλετε κλασική εμφάνιση με non-classic shape, ορίστε μια παράκαμψη που διαφέρει από τη βάση του καταλόγου — ένα ισοδύναμο literal όπως `rgba(var(--v-theme-primary), 1)` χρωματίζει πανομοιότυπα και επιβιώνει από την παράλειψη.

Τα tokens σκόπιμα δεν συνδέονται στις εγγενείς διαδρομές — αυτό κρατά το `default` πανομοιότυπο pixel προς pixel με την κλασική εμφάνιση ενώ όλα περνούν μέσω του καταλόγου.

## Συνταγές {#recipes}

### Επέκταση του pastel {#extend-pastel}

Κληρονομήστε το quiet shape και χρωματίστε ξανά λίγες επιφάνειες. Τα καταχωρισμένα ονόματα λειτουργούν σε κάθε επεξεργαστή:

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

Το shape (flat/quiet/soft) προέρχεται από το pastel· τα tokens που δεν αγγίζετε κρατούν τις τιμές του pastel — η απόχρωση των ήσυχων κουμπιών μένει ουδέτερη, μετακινείται μόνο ό,τι παρακάμπτετε. Αυτό είναι το skin που αποδίδεται ζωντανά στη [σελίδα παραδειγμάτων](/el/examples/skins#custom-mint).

### Επέκταση του default {#extend-default}

Κρατήστε την κλασική δομή, ρυθμίστε τα χρώματα:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

Το `extends: 'default'` είναι η άρρητη ρίζα, οπότε το κλειδί μπορεί να παραλειφθεί: το `{ toolbar: 'flat', … }` ξεκινά κι αυτό από το classic.

### Πλήρως προσαρμοσμένο {#full-custom}

Χωρίς `extends`, χωρίς καταχώριση: περάστε το αντικείμενο στο prop `skin` και ορίστε ελεύθερα σημαίες shape και tokens. Ένα `name` βάζει τη δική σας ετικέτα στην κλάση ρίζας (δείτε παρακάτω)· χωρίς αυτό είναι `tiptapify-skin-inline`.

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

Το `defineSkin` είναι βοηθητική συνάρτηση ταυτότητας για τυποποιημένους ορισμούς const (δεν μπαίνει σε κανένα μητρώο). Οι σημαίες shape μπορούν να οριστούν μία-μία — κάθε σημαία που παραλείπετε μένει classic.

## Διέξοδος: η κλάση ρίζας {#escape-hatch-the-root-class}

Κάθε ρίζα επεξεργαστή φέρει `tiptapify-skin-{name}` (`tiptapify-skin-inline` για ανώνυμο ενσωματωμένο αντικείμενο). Η βιβλιοθήκη **δεν βασίζει ποτέ κανέναν κανόνα σε όνομα skin** — η κλάση είναι δική σας:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Τα σταθερά σημεία αγκύρωσης για τη μορφοποίησή σας:

| κλάση | πού |
|---|---|
| `tiptapify-skin-{name}` | ρίζα επεξεργαστή |
| `tiptapify-shape-{flag}-{value}` ×6 | ρίζα επεξεργαστή — το επιλυμένο shape |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | η γραμμή εργαλείων και οι ενότητές της |
| `tiptapify-quiet-buttons` | ρίζες γραμμής εργαλείων και bubble με `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | η σειρά κάθε bubble menu και η λεπτή γραμμή ανάμεσα στις ομάδες του |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | οι σειρές των μενού επιλογής, κενής γραμμής και εικόνας |
| `tiptapify-btn--active` | ένα πατημένο κουμπί bubble menu (ενεργό mark, αιώρηση εικόνας) |
| `tiptapify-menu` · `tiptapify-menu--soft` | περιεχόμενο επικάλυψης αναπτυσσόμενου μενού, ο φορέας των κανόνων απαλού μενού |
| `tiptapify-skin-scope` | το div εμβέλειας tokens μέσα σε μενού που γίνονται teleport |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | η κάρτα του διαλόγου και ο απαλός φορέας της |
| `tiptapify-frame` | το περιτύλιγμα περιγράμματος του επεξεργαστή |

**Άμυνα απέναντι σε θέματα καταναλωτή.** Το επίπεδο skin είναι φτιαγμένο ώστε να επιβιώνει σε θέματα διαχείρισης που προσθέτουν εσωτερικά περιθώρια και χρωματίζουν ξανά εσωτερικά του Vuetify: οι κανόνες ελέγχονται από κλάσεις shape/φορέα, χρησιμοποιούν διπλασιασμένες κλάσεις (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) για ειδικότητα και κρατούν το `!important` μόνο όπου η περίπτωση θέματος διαχείρισης του βασικού commit απέδειξε ότι ήταν απαραίτητο (το σύνολο άμυνας του menu.css). Συμβάσεις που κρατούν λειτουργικές τις δικές σας παρακάμψεις στο ίδιο πεδίο μάχης:

- περιορίστε το CSS σας κάτω από το `.tiptapify-skin-{name}` (ή μια κλάση shape) — ποτέ σε γυμνά εσωτερικά του Vuetify·
- προτιμήστε tokens (`--tf-*`) για τις διαστάσεις του καταλόγου, κλάσεις για τα υπόλοιπα·
- ταιριάξτε τον διπλασιασμό όταν παρακάμπτετε στοιχεία Vuetify (ένα μονό `.v-list-item` χάνει από τους κανόνες του skin).

## Οπτικό συμβόλαιο (σημείωση για συνεισφέροντες) {#visual-contract-contributor-note}

Τα υπολογισμένα στυλ των ενσωματωμένων skins καθηλώνονται από το fixture βάσης `src/skins/__fixtures__/skin-baseline.json` (13 ενότητες × ανοιχτό/σκούρο): το επίπεδο CSS είναι έτοιμο όταν ο μετρημένος πίνακας ταιριάζει με αυτό. Σημειώσεις ανάγνωσης για το fixture:

- Οι διαστάσεις hover/active δεν μπορούν να επιβληθούν από τη σελίδα, οπότε η καταγραφή διαβάζει το **κείμενο δήλωσης του πρώτου κανόνα CSSOM που ταιριάζει** για κάθε επιλογέα hover και το επιλύει μέσω ενός στοιχείου-ανιχνευτή μέσα στη ρίζα του skin (το πεδίο `resolved`) — είναι το συμβόλαιο του κανόνα που υπερισχύει, όχι ζωντανό στιγμιότυπο `:hover`.
- Το `_meta.selectors.menu` καταγράφει το κείμενο επιλογέα πριν από το `SkinScope`. Το fixture είναι παγωμένο (κανονιστικές τιμές), οπότε το πεδίο είναι σκόπιμα παλιό· το πακέτο καταγραφής καθηλώνει τον τρέχοντα επιλογέα.
- Το fixture φέρει τις εγκεκριμένες αλλαγές του στο `_meta.notes`: η αποκατάσταση του markup VBtnGroup της 2026-10-18 με `groups: 'box'` μέτρησε ξανά τα πεδία κουμπιών-παιδιών `groupBtn`/`buttonsActive` του classic (ενωμένες γωνίες, το κουτί κατέχει το elevation). Τα πεδία του pastel μένουν αναλλοίωτα — μια σκόπιμη οπτική αλλαγή ενημερώνει μόνο τα επηρεαζόμενα κελιά classic, καταγράφει σημείωση και συνοδεύεται από γραμμή στο CHANGELOG.

## Δείτε επίσης {#see-also}

- [Παραδείγματα Skins](/el/examples/skins) — classic, pastel και το προσαρμοσμένο skin mint, ζωντανά.
- [Prop `skin`](/el/api/props#skin) · [τύποι skin](/el/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/el/api/types#tiptapifyskininput).
