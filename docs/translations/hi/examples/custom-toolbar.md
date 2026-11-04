# कस्टम टूलबार {#custom-toolbar}

## चुनिंदा आइटम दिखाना {#showing-specific-items}

केवल अपनी ज़रूरत के टूलबार बटन दिखाने के लिए `items` prop उपयोग करें। आइटम नामों की एक ऐरे दें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

बटन समूहों के बीच विभाजक के रूप में `|` उपयोग करें।

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="कस्टम टूलबार..." />

## सूची शैली ड्रॉपडाउन {#list-styles-dropdown}

`:styles` प्रत्यय सूची बटन को उसके मार्कर/क्रमांकन शैली ड्रॉपडाउन से बदल देता है: सूची बटन `list-style-type` विकल्पों का ग्रिड खोलता है, जो इनलाइन स्टाइल के रूप में सहेजा जाता है। ग्रिड स्किन की मेन्यू सतह के भीतर रेंडर होता है, इसलिए वह सक्रिय स्किन का अनुसरण करता है ([स्किन गाइड](/hi/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="सूची शैली ड्रॉपडाउन खोलें..." />

## आइटम बाहर रखना {#excluding-items}

ज़्यादातर टूलबार आइटम दिखाकर केवल कुछ को बाहर रखने के लिए `items` के साथ `items-exclude` उपयोग करें:

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
placeholder="अनचाहे आइटम बाहर रखना..." />

## कस्टम सेक्शन {#custom-sections}

ऑब्जेक्ट के ज़रिए आइटम को अपने नामित सेक्शन में समूहित करें:

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
placeholder="कस्टम सेक्शन वाला टूलबार..." />

## टूलबार सेक्शन संदर्भ {#toolbar-sections-reference}

टूलबार आइटम सेक्शन में व्यवस्थित हैं। उपलब्ध सभी सेक्शन ये हैं:

| सेक्शन         | आइटम                                                                                    |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## टूलबार छिपाना {#hiding-the-toolbar}

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
placeholder="टूलबार नहीं..." />

## कस्टम टूलबार कंपोनेंट {#custom-toolbar-components}

`customExtensions` prop से अपने बटन जोड़ें। हर एंट्री एक [टूलबार सेक्शन](/hi/api/types#section) है — अपने बटन को मौजूदा समूह में मिलाने के लिए बिल्ट-इन सेक्शन नाम (`misc`, `media`, …) उपयोग करें, या बिल्ट-इन सेक्शन के बाद रेंडर होने वाले अलग समूह के लिए नया नाम दें:

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

कस्टम कंपोनेंट `<Tiptapify>` के भीतर रेंडर होते हैं, इसलिए उन्हें वही साझा मान मिलते हैं जो बिल्ट-इन बटन उपयोग करते हैं — एडिटर, अनुवाद और एडिटर-स्तर का कॉन्फ़िग:

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

- `useTiptapifyConfig()` एडिटर-स्तर का कॉन्फ़िग (`variantBtn`, `variantField`) लौटाता है, इसलिए कस्टम कंपोनेंट अपने-आप बिल्ट-इन टूलबार की शैली से मेल खाते हैं।
- पिछली संगतता के लिए `variantBtn` prop अब भी हर टूलबार कंपोनेंट को दिया जाता है — साझा कॉन्फ़िग से पहले लिखे कंपोनेंट बिना बदलाव के काम करते रहते हैं।
- `inject('tiptapifyI18n')` वही अनुवाद फ़ंक्शन देता है जो बिल्ट-इन बटन उपयोग करते हैं।
