<script setup>
</script>

# Tiptapify {#tiptapify}

**Επεξεργαστής εμπλουτισμένου κειμένου Tiptap 3 για Vue 3 με γραμμή εργαλείων Vuetify 3**

::: info Κατάσταση Beta
Το έργο βρίσκεται σε φάση **Beta**. Είναι πλήρες σε λειτουργίες, αλλά ενδέχεται να έχει ακόμη κάποια σφάλματα προς διόρθωση.
:::

## Χαρακτηριστικά {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Στοιχεία Vuetify 3</h3>
    <p>Εντυπωσιακή γραμμή εργαλείων Material Design, φτιαγμένη εξ ολοκλήρου με στοιχεία Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ επεκτάσεις</h3>
    <p>Μορφοποίηση εμπλουτισμένου κειμένου, ενσωμάτωση πολυμέσων, πίνακες, μπλοκ κώδικα με επισήμανση σύνταξης</p>
  </div>
  <div class="feature">
    <h3>Εντολές με κάθετο</h3>
    <p>Πληκτρολογήστε <code>/</code> για να ανοίξει το μενού γρήγορης εισαγωγής επικεφαλίδων, λιστών, πολυμέσων και άλλων</p>
  </div>
  <div class="feature">
    <h3>Διεθνοποίηση</h3>
    <p>Υποστήριξη 20+ γλωσσών μέσω vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Σκούρο θέμα</h3>
    <p>Αυτόματη υποστήριξη σκούρου/ανοιχτού θέματος, ενσωματωμένη στο θέμα του Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Πλήρης υποστήριξη TypeScript με εξαγόμενους τύπους για όλα τα στοιχεία της γραμμής εργαλείων και τα props</p>
  </div>
</div>

## Γρήγορη εκκίνηση {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip Εξαρτήσεις peer
Το Tiptapify απαιτεί ως peer dependencies τα **Vue 3.x**, **Vuetify 3.x ή 4.x**, **vue-i18n 11+** και **@mdi/js**. Δείτε τον [οδηγό εγκατάστασης](/el/guide/installation) για την πλήρη ρύθμιση.
:::

## Άδεια χρήσης {#license}

MIT — [Αποθετήριο GitHub](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
