# कंटेंट स्टाइल {#content-styles}

एडिटर जो कुछ सहेजता है, उसमें से कुछ को उस पेज पर अपना रूप चाहिए जो उसे दिखाता है: लिंक कार्ड, कैप्शन और फ़्लोट वाली इमेज, टेक्स्ट की चौड़ाई में बैठने वाले वीडियो और एम्बेड, और टास्क लिस्ट जिनके हर आइटम के पास चेकबॉक्स होता है। इसके बिना लिंक कार्ड एक सादा लिंक बन जाता है जिसमें इमेज और टेक्स्ट आपस में मिल जाते हैं।

`contentStyles` प्रॉप बताता है कि सहेजा गया HTML यह रूप कैसे साथ रखता है:

| `contentStyles` | सहेजा गया HTML | साइट पर |
|---|---|---|
| `inline` (डिफ़ॉल्ट) | रूप इन एलिमेंट के `style` एट्रिब्यूट में लिखा होता है | कुछ लोड करने की ज़रूरत नहीं: HTML जैसा है वैसा दिखता है |
| `classes` | सिर्फ़ क्लास और `data-` एट्रिब्यूट | `tiptapify/content.css` लोड करें और HTML को `tiptapify-content` क्लास वाले एलिमेंट में रखें |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

दोनों में वही नियम होते हैं जिनसे एडिटर खुद कंटेंट दिखाता है, इसलिए दोनों हालत में पेज एडिटर जैसा दिखता है। ये नियम सिर्फ़ इन्हीं एलिमेंट पर लगते हैं: हेडिंग, पैराग्राफ़, लिस्ट, टेबल और बाकी टेक्स्ट साइट की अपनी स्टाइल रखते हैं।

## इनलाइन स्टाइल {#inline-styles}

यह डिफ़ॉल्ट है। एक कॉम्पैक्ट लिंक कार्ड इस तरह सहेजा जाता है:

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

- **रंग साइट के ही रहते हैं।** टेक्स्ट अपना रंग इनहेरिट करता है; धुंधला टेक्स्ट और बॉर्डर ओपैसिटी और आधे पारदर्शी ग्रे का उपयोग करते हैं, इसलिए वे हल्के और गहरे दोनों पेज पर चलते हैं। किसी थीम के लिए टेक्स्ट का रंग साइट पर हमेशा की तरह सेट करें।
- **media query की ज़रूरत नहीं।** कॉम्पैक्ट कार्ड संकरे कॉलम में अपनी इमेज को खुद टेक्स्ट के ऊपर रख देता है; वीडियो और एम्बेड कभी टेक्स्ट से चौड़े नहीं होते।
- **साइट फिर भी इन्हें दोबारा स्टाइल कर सकती है**, क्लास बनी रहती हैं। इनलाइन स्टाइल क्लास के नियम पर भारी पड़ती है, इसलिए ऐसे नियम को `!important` चाहिए।
- **sanitizer को इन एलिमेंट पर `style` एट्रिब्यूट रखना चाहिए**, वरना वे अपना रूप खो देते हैं।

## क्लास और content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` छोटी है और उसमें Vue या Vuetify नहीं है। इसके नियम `:where(.tiptapify-content)` में लिपटे हैं, इसलिए उनका कोई वज़न नहीं है: साइट का कोई भी नियम `!important` के बिना उन पर जीतता है। इसका उपयोग तब करें जब साइट रूप एक जगह चाहती हो, या अपना कंटेंट खुद स्टाइल करती हो।

`contentCss(scope)` वही स्टाइलशीट स्ट्रिंग के रूप में देता है, `tiptapify-content` से अलग क्लास के लिए:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML वापस लोड करना {#loading-html-back}

एडिटर इन एलिमेंट को सिर्फ़ उनके एट्रिब्यूट और क्लास से पढ़ता है: लिंक कार्ड को `data-link-card` से, इमेज को उसके `src`, साइज़ और फ़्लोट से, टास्क को `data-checked` से। उनकी इनलाइन स्टाइल HTML लोड होते समय अनदेखी की जाती हैं, और सहेजते समय फिर लिखी जाती हैं। इसलिए वही HTML बिना बदले आगे-पीछे जाता है, `inline` से सहेजा गया दस्तावेज़ `classes` के साथ साफ़ लोड होता है और उल्टा भी, और एडिटर का बाद का वर्शन दस्तावेज़ का रूप अगली बार सहेजने पर अपडेट कर देता है।

टेक्स्ट फ़ॉर्मैटिंग को छुआ नहीं जाता: टेक्स्ट का रंग या साइज़ और पैराग्राफ़ का अलाइनमेंट कंटेंट है, और एडिटर इन्हें उनकी स्टाइल से पढ़ना जारी रखता है।

क्लास वाले HTML को एडिटर के बाहर (पुराना दस्तावेज़, ईमेल) इनलाइन-स्टाइल वाले HTML में बदलने के लिए `inlineContentStyles` का उपयोग करें:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

इसे DOM चाहिए (ब्राउज़र, या सर्वर पर jsdom) और उसके बिना यह HTML को जैसा है वैसा लौटा देता है।

## इमेज स्लाइडर {#image-sliders}

लिखते समय एडिटर एक पंक्ति की इमेज को स्लाइडर के रूप में चिह्नित करता है (देखें `imageSlider` प्रॉप); सहेजा गया HTML उन्हें एक के बाद एक figure के रूप में रखता है। उन्हें स्लाइडर के रूप में दिखाना साइट की अपनी स्क्रिप्ट पर निर्भर है।
