# मीडिया {#media}

## चित्र {#images}

URL से चित्र डालें:

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

चित्र बटन चित्र डायलॉग खोलता है:

- **URL से** या **अपलोड**। [अपलोड एंडपॉइंट](/hi/guide/uploads) के बिना चुनी गई फ़ाइल base64 डेटा URL के रूप में एम्बेड होती है; एंडपॉइंट होने पर फ़ाइल आपके सर्वर पर जाती है।
- **वैकल्पिक टेक्स्ट** (खाली होने पर डायलॉग याद दिलाता है) और चित्र के नीचे **कैप्शन**।
- **आकार**: मूल, टेक्स्ट की चौड़ाई, या अनुपात लॉक के साथ कस्टम चौड़ाई × ऊँचाई।
- **स्थिति**: अपनी पंक्ति में केंद्र में, या टेक्स्ट के बाएँ या दाएँ तैरता हुआ।

चुने हुए चित्र पर रीसाइज़ हैंडल होते हैं (हर रीसाइज़ पूर्ववत् का एक चरण है) और उसके ऊपर एक टूलबार: बाएँ या दाएँ फ़्लोट, डाउनलोड, संपादित करें, हटाएँ। डबल क्लिक से डायलॉग खुलता है।

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## वीडियो {#videos}

YouTube और Vimeo वीडियो, या वीडियो फ़ाइल एम्बेड करें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

वीडियो बटन वीडियो डायलॉग खोलता है:

- **YouTube या Vimeo लिंक** उनका प्लेयर बन जाता है; डायलॉग पहचाना गया प्रदाता और पूर्वावलोकन दिखाता है, और जहाँ प्लेयर समर्थन करे वहाँ **शुरुआत** (`?t=` से पहले भरी हुई)।
- **वीडियो फ़ाइल का लिंक** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) पोस्टर, कंट्रोल, ऑटोप्ले (म्यूट) और लूप वाला `<video>` बन जाता है। लिंक में प्रोटोकॉल (`https://`, `http://`), `//host` या `/path` होना ज़रूरी है: डायलॉग कभी अंदाज़ा नहीं लगाता।
- **अपलोड** वीडियो फ़ाइल को आपके सर्वर पर भेजता है; यह केवल [अपलोड एंडपॉइंट](/hi/guide/uploads) होने पर दिखता है।
- **आकार**: रिस्पॉन्सिव 16:9, या अनुपात लॉक के साथ कस्टम चौड़ाई × ऊँचाई।

टेक्स्ट में पेस्ट किया गया YouTube URL भी एम्बेड हो जाता है। प्लेयर पर क्लिक उसे चलाने के बजाय चुनता है, ताकि टूलबार बटन उसे दिखाए; डबल क्लिक से डायलॉग खुलता है।

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="वीडियो एम्बेड करने के लिए YouTube URL पेस्ट करें..." />

## Iframe {#iframes}

किसी पेज को उसके पते से, या उसके Share या Embed मेन्यू के iframe कोड से एम्बेड करें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

iframe डायलॉग पेस्ट किया गया कोड (पता, आकार, शीर्षक, अनुमतियाँ, sandbox, लेज़ी लोडिंग, फ़ुलस्क्रीन) पढ़ता है और बताता है कि उसने उसमें से क्या लिया; स्क्रिप्ट या अन्य टैग वाला कोड अस्वीकार कर दिया जाता है। यह पूर्वावलोकन दिखाता है और इसमें **स्क्रीन रीडर के लिए शीर्षक**, आकार (कोड के अनुपात में रिस्पॉन्सिव, या अनुपात लॉक के साथ कस्टम), और **उन्नत** के अंतर्गत नाम, `allow`, `sandbox`, लेज़ी लोडिंग और बॉर्डर होते हैं। पते में `https://` या `http://` ज़रूरी है। एम्बेड पर डबल क्लिक से डायलॉग खुलता है।

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="iframe के रूप में एम्बेड करने के लिए URL दर्ज करें..." />

## टेबल {#tables}

टेबल डालें और संपादित करें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

टेबल डालने के बाद आप ये कर सकते हैं:
- पंक्तियाँ और कॉलम जोड़ें/हटाएँ
- सेल चुनें
- पूरी टेबल हटाएँ

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="टेबल डालने के लिए टेबल बटन उपयोग करें..." />

## लिंक {#links}

हाइपरलिंक डालें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

लिंक डायलॉग पता वैसे ही लेता है जैसा टाइप किया गया हो: `https://…`, कोई अन्य स्कीम (`ftp://`, `ssh://`, कोई आंतरिक), `mailto:`, `tel:`, `#anchor` या `/page`। यह अपने आप कभी प्रोटोकॉल नहीं जोड़ता: बिना प्रोटोकॉल वाले पते (`example.com`, `internal.host:8080`) के लिए `https://`, `http://` या `ftp://` जोड़ने वाले चिप मिलते हैं, और कुछ न जोड़ने पर वह जैसा टाइप किया गया वैसा ही रहता है। `javascript:`, `vbscript:` और `data:` पते अस्वीकार किए जाते हैं।

डायलॉग में लिंक टेक्स्ट, **नए टैब में खोलें** (जो `noopener noreferrer` जोड़ता है), और **उन्नत** के अंतर्गत चिप के रूप में `rel` मान (कोई भी मान: Enter, स्पेस या कॉमा से जुड़ता है) और एक CSS क्लास होती है।

[`linkPreview`](/hi/api/props#linkpreview) prop के साथ यही डायलॉग लिंक को पेज की छवि, शीर्षक और विवरण वाले कार्ड के रूप में दिखाता है, और खाली पंक्ति में पेस्ट किया गया URL **लिंक / कार्ड** का विकल्प देता है — [लिंक कार्ड](/hi/guide/link-cards) देखें।

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="हाइपरलिंक जोड़ने के लिए टेक्स्ट चुनें और लिंक पर क्लिक करें..." />

## इमोजी {#emoji}

बिल्ट-इन पिकर से 10 श्रेणियों में से इमोजी डालें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

इमोजी पिकर में खोज/फ़िल्टर इनपुट होता है, जिससे खास इमोजी जल्दी मिल जाते हैं।

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="इमोजी डालने के लिए इमोजी बटन पर क्लिक करें..." />

## विशेष वर्ण (Charmap) {#special-characters-charmap}

विशेष वर्ण, तीर, यूनानी अक्षर, गणित चिह्न और बहुत कुछ डालें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

श्रेणियों में शामिल हैं:
- तीर
- मुद्रा
- यूनानी अक्षर
- गणित चिह्न
- विविध

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="विशेष वर्ण डालने के लिए charmap पर क्लिक करें..." />

## मीडिया टूल को मिलाना {#combining-media-tools}

सभी सुविधाओं वाला मीडिया टूलबार:

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
placeholder="पूरा मीडिया टूलबार..." />
