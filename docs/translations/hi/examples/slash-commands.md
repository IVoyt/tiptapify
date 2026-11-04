# स्लैश कमांड {#slash-commands}

स्लैश कमांड एक त्वरित-इन्सर्ट मेन्यू देते हैं, जो पंक्ति की शुरुआत में `/` टाइप करने पर दिखता है।

## स्लैश कमांड सक्षम करना {#enabling-slash-commands}

स्लैश कमांड डिफ़ॉल्ट रूप से सक्षम होते हैं। उन्हें स्पष्ट रूप से नियंत्रित करने के लिए:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="स्लैश कमांड डेमो..."
:slash-commands="true"
/>

## उपलब्ध कमांड {#available-commands}

कमांड पैलेट देखने के लिए एडिटर में `/` टाइप करें। उपलब्ध कमांड में ये शामिल हैं:

| कमांड           | विवरण                              |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | शीर्षक डालें (स्तर 1-6)             |
| `/bulletList`   | बुलेट सूची डालें                    |
| `/numberedList` | क्रमांकित सूची डालें                |
| `/taskList`     | कार्य सूची डालें                    |
| `/code`         | इनलाइन कोड डालें                    |
| `/codeBlock`    | कोड ब्लॉक डालें                     |
| `/quote`        | ब्लॉककोट डालें                      |
| `/image`        | चित्र डालें (URL डायलॉग खुलता है)    |
| `/video`        | YouTube वीडियो एम्बेड करें          |
| `/table`        | टेबल डालें                          |
| `/link`         | हाइपरलिंक डालें                     |
| `/divider`      | क्षैतिज रेखा डालें                   |
| `/emoji`        | इमोजी पिकर खोलें                    |
| `/specialChars` | विशेष वर्ण खोलें                    |

## यह कैसे काम करता है {#how-it-works}

1. कर्सर को पंक्ति की शुरुआत में या किसी स्पेस के बाद रखें
2. `/` टाइप करें — कमांड पैलेट दिखाई देता है
3. कमांड छानने के लिए टाइप करना जारी रखें
4. चुना हुआ कमांड डालने के लिए `Enter` दबाएँ या क्लिक करें

## स्लैश कमांड अक्षम करना {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## फ़्लोटिंग मेन्यू के साथ स्लैश कमांड {#slash-commands-with-floating-menu}

सबसे अच्छे संपादन अनुभव के लिए स्लैश कमांड को फ़्लोटिंग मेन्यू के साथ मिलाएँ:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **स्लैश कमांड** (`/`) — पंक्ति की शुरुआत में `/` टाइप करने पर सक्रिय होते हैं
- **फ़्लोटिंग मेन्यू** — खाली पंक्ति पर कर्सर रखने पर दिखता है (ब्लॉक-स्तर की क्रियाएँ देता है)
- **बबल मेन्यू** — टेक्स्ट चुनने पर दिखता है (इनलाइन फ़ॉर्मैटिंग देता है)

## उपलब्ध कमांड छानना {#filtering-available-commands}

कमांड ID की एक ऐरे देकर आप तय कर सकते हैं कि कौन से कमांड शामिल हों:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### उपलब्ध कमांड ID {#available-command-ids}

| ID             | विवरण                |
|----------------|----------------------|
| `h1` - `h6`    | शीर्षक स्तर 1-6      |
| `bulletList`   | बुलेट सूची           |
| `numberedList` | क्रमांकित सूची       |
| `taskList`     | कार्य सूची           |
| `code`         | इनलाइन कोड           |
| `codeBlock`    | कोड ब्लॉक            |
| `quote`        | ब्लॉककोट             |
| `image`        | चित्र                |
| `video`        | YouTube वीडियो       |
| `table`        | टेबल                 |
| `link`         | लिंक                 |
| `divider`      | क्षैतिज रेखा         |
| `emoji`        | इमोजी                |
| `specialChars` | विशेष वर्ण           |
