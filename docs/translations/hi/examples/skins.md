# स्किन {#skins}

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

`skin` prop एडिटर के बाहरी स्वरूप को तय करता है: टूलबार, बबल मेन्यू, ड्रॉपडाउन, डायलॉग।
सुविधाएँ हर स्किन में एक जैसी काम करती हैं। अवधारणाएँ, टोकन तालिका और रेसिपी
[स्किन गाइड](/hi/guide/skins) में हैं।

## क्लासिक (डिफ़ॉल्ट) {#classic-default}

उभरा हुआ टूलबार, उभरे बॉक्स जैसे बटन समूह और कार्ड-शैली के बबल मेन्यू:

<InteractiveEditor :bubble-menu="true" placeholder="Classic skin..." />

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

## पैस्टल {#pastel}

पतली रेखा के नीचे सपाट रंगीन टूलबार, तटस्थ दबी हुई अवस्था वाले घोस्ट बटन, हल्के ड्रॉपडाउन:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel skin..." />

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

## कस्टम: मिंट {#custom-mint}

`registerSkin` रजिस्ट्री में एक नाम जोड़ता है। यह स्किन `pastel` को बढ़ाती है और मुट्ठी भर टोकन बदलती है: टूलबार की पृष्ठभूमि पर मिंट रंगत, और छवि की रूपरेखा व रीसाइज़ हैंडल के लिए गहरा हरा। शांत आकार pastel से मिलता है; जो कुछ बदला नहीं गया (बटन की स्थितियाँ, मेन्यू, डायलॉग) वह pastel के मान रखता है:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint skin..." />

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

एडिटर रूट पर `tiptapify-skin-mint` क्लास लगती है — यह उन आयामों के लिए निकास-द्वार है जिन्हें टोकन कैटलॉग कवर नहीं करता ([निकास-द्वार](/hi/guide/skins#escape-hatch-the-root-class) देखें)।

## इनलाइन स्किन {#inline-skin}

`skin` prop एक ऑब्जेक्ट भी लेता है: टोकन ओवरराइड और आकार फ़्लैग, जो `extends` के ज़रिए किसी पंजीकृत स्किन से विरासत लेते हैं। यह उसी श्रृंखला से रिज़ॉल्व होता है, रजिस्ट्री में कभी नहीं जाता, और `tiptapify-skin-inline` क्लास के तहत रेंडर होता है (या ऑब्जेक्ट में `name` हो तो `tiptapify-skin-{name}` के तहत); इसके टोकन एडिटर रूट पर `--tf-*` CSS वेरिएबल के रूप में लगते हैं।

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
