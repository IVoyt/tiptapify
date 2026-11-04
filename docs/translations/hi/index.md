<script setup>
</script>

# Tiptapify {#tiptapify}

**Vue 3 के लिए Tiptap 3 रिच टेक्स्ट एडिटर, Vuetify 3 टूलबार के साथ**

::: info बीटा स्थिति
यह प्रोजेक्ट फ़िलहाल **बीटा** में है। इसकी सभी सुविधाएँ तैयार हैं, लेकिन कुछ बग अभी बाकी हो सकते हैं।
:::

## विशेषताएँ {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 कंपोनेंट</h3>
    <p>पूरी तरह Vuetify 3 कंपोनेंट से बना सुंदर Material Design टूलबार</p>
  </div>
  <div class="feature">
    <h3>30+ एक्सटेंशन</h3>
    <p>रिच टेक्स्ट फ़ॉर्मैटिंग, मीडिया एम्बेडिंग, टेबल और सिंटैक्स हाइलाइटिंग वाले कोड ब्लॉक</p>
  </div>
  <div class="feature">
    <h3>स्लैश कमांड</h3>
    <p>शीर्षक, सूचियाँ, मीडिया और बहुत कुछ जल्दी डालने वाला मेन्यू खोलने के लिए <code>/</code> टाइप करें</p>
  </div>
  <div class="feature">
    <h3>अंतर्राष्ट्रीयकरण</h3>
    <p>vue-i18n के ज़रिए 20+ भाषाओं का समर्थन</p>
  </div>
  <div class="feature">
    <h3>डार्क थीम</h3>
    <p>आपकी Vuetify थीम के साथ जुड़ने वाला स्वचालित डार्क/लाइट मोड समर्थन</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>सभी टूलबार आइटम और props के एक्सपोर्ट किए गए टाइप के साथ पूरा TypeScript समर्थन</p>
  </div>
</div>

## त्वरित शुरुआत {#quick-start}

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

::: tip पीयर डिपेंडेंसी
Tiptapify को पीयर डिपेंडेंसी के रूप में **Vue 3.x**, **Vuetify 3.x या 4.x**, **vue-i18n 11+** और **@mdi/js** चाहिए। पूरे सेटअप के लिए [इंस्टॉलेशन गाइड](/hi/guide/installation) देखें।
:::

## लाइसेंस {#license}

MIT — [GitHub रिपॉज़िटरी](https://github.com/IVoyt/tiptapify)

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
