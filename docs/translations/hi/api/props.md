# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **प्रकार:** `String | Object`
- **डिफ़ॉल्ट:** `''`

एडिटर की शुरुआती सामग्री। HTML स्ट्रिंग या Tiptap JSON ऑब्जेक्ट स्वीकार करता है।

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` केवल **शुरुआती** सामग्री है; दोतरफ़ा बाइंडिंग के लिए `v-model` उपयोग करें (`modelValue` देखें)।

### `modelValue` {#modelvalue}

- **प्रकार:** `String | Object`
- **डिफ़ॉल्ट:** `''`

`v-model` के लिए दोतरफ़ा बाइंडिंग मान। रिएक्टिव मान को एडिटर के साथ सिंक में रखने के लिए `v-model` उपयोग करें। हर संपादन पर कंपोनेंट नवीनतम HTML के साथ `update:modelValue` एमिट करता है, जिसे `v-model` आपके ref में वापस लिखता है। जब केवल `v-model` उपयोग हो (`:content` नहीं), तो बाइंड किया गया मान एडिटर की शुरुआती सामग्री होता है।

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `''`

एडिटर खाली होने पर दिखने वाला प्लेसहोल्डर टेक्स्ट।

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **प्रकार:** `Number`
- **डिफ़ॉल्ट:** `null`

एडिटर के कंटेंट क्षेत्र की न्यूनतम ऊँचाई, पिक्सेल में।

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

टूलबार दिखाएँ या छिपाएँ।

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **प्रकार:** `Array<String> | Object`
- **डिफ़ॉल्ट:** `[]`

दिखाए जाने वाले टूलबार आइटम। आइटम नामों की ऐरे या नामित सेक्शन वाला ऑब्जेक्ट दें। [टूलबार आइटम](/hi/api/toolbar-items) देखें।
ऐरे में `'|'` आइटम को समूहों में बाँटता है (उसी क्रम में, बटन किसी भी सेक्शन के हों) और `'~'` अपने बाद के आइटम को टूलबार के अंत में धकेल देता है। समूहों के साथ, जो नाम बिल्ट-इन आइटम नहीं है वह `customExtensions` के उसी नाम वाले कस्टम बटन की जगह रखता है; ऐसा बटन न हो तो वह जगह छोड़ दी जाती है।

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `false`

`true` होने पर `items` prop उन आइटम को बताता है जिन्हें **बाहर रखना** है, शामिल करना नहीं।

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

टेक्स्ट चुनने पर बबल मेन्यू दिखाएँ: समूहों में आइकन बटनों की एक पंक्ति — bold, italic, underline, strikethrough | सुपरस्क्रिप्ट, सबस्क्रिप्ट | हाइलाइट, इनलाइन कोड | लिंक | फ़ॉर्मैटिंग हटाएँ। हर बटन पर उसके शॉर्टकट वाला टूलटिप होता है और चयन पर उसका मार्क चालू हो तो वह सक्रिय दिखता है। चुने हुए ब्लॉक (चित्र, विजेट) पर, कोड के भीतर, और पूरा दस्तावेज़ चुने जाने पर यह छिप जाता है।

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

खाली पंक्तियों पर फ़्लोटिंग मेन्यू दिखाएँ: शीर्षक 1, शीर्षक 2 और बुलेट सूची, बबल मेन्यू वाली आइकन बटनों की उसी पंक्ति में।

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

स्लैश कमांड मेन्यू सक्षम करें (सक्रिय करने के लिए `/` टाइप करें)।

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

एडिटर के फ़ुटर में शब्द गिनती दिखाएँ।

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

एडिटर के फ़ुटर में अक्षर गिनती दिखाएँ।

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **प्रकार:** `Number | null`
- **डिफ़ॉल्ट:** `null`

Tiptap `CharacterCount` एक्सटेंशन द्वारा अनुमत अधिकतम अक्षर संख्या। असीमित संपादन के लिए `null` सेट करें या prop छोड़ दें। `0` से बड़ा मान सेट होने पर फ़ुटर रंग-कोडित सीमाओं वाला SVG गोलाकार प्रगति संकेतक दिखाता है।

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'purple'`

`limit` सेट होने पर फ़ुटर में दिखने वाले गोलाकार प्रगति संकेतक का डिफ़ॉल्ट रंग।

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'orange'`

उपयोग सीमा के 75% से ऊपर जाने पर प्रगति संकेतक का रंग।

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'red'`

अक्षर सीमा पूरी हो जाने पर प्रगति संकेतक का रंग।

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **प्रकार:** `TiptapifyFooterAlignment`
- **डिफ़ॉल्ट:** `'end'`

फ़ुटर के स्थिति आइटम का संरेखण। `'start'`, `'center'` या `'end'` स्वीकार करता है।

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **प्रकार:** `Boolean | TiptapifyAiOptions`
- **डिफ़ॉल्ट:** `false`

`ai` टूलबार आइटम सक्षम करता है। एडिटर OpenAI-संगत `/v1/chat/completions` अनुरोध बनाता है और उसे `aiProvider` को देता है। अपने बैकएंड, BFF, OAuth-सुरक्षित एंडपॉइंट, LM Studio या SDK रैपर को कॉल करने के लिए प्रदाता कॉलबैक उपयोग करें।

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

लोकल LLM LM Studio का उदाहरण:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

`stream: true` सेट करके और `aiProvider` के `stream` आर्गुमेंट के ज़रिए टोकन भेजकर स्ट्रीमिंग आउटपुट समर्थित है। चंक आते समय AI डायलॉग का परिणाम फ़ील्ड लाइव अपडेट होता है, और **रोकें** बटन चल रहे अनुरोध को रद्द कर देता है:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

`stream.signal` को `fetch` (या अपनी SDK कॉल) को दें ताकि उपयोगकर्ता के **रोकें** पर क्लिक करने या डायलॉग बंद करने पर अनुरोध रद्द हो जाए। आंशिक रूप से स्ट्रीम हुआ कंटेंट परिणाम फ़ील्ड में रहता है और उसे लागू या छोड़ा जा सकता है। जो प्रदाता स्ट्रीम नहीं करते वे `stream` आर्गुमेंट को पूरी तरह अनदेखा कर सकते हैं — यह वैकल्पिक और पिछली संगतता वाला है।

तर्क करने वाले मॉडल (Qwen thinking, DeepSeek, o-series) अपने "विचार" एक अलग `reasoning_content` डेल्टा में स्ट्रीम करते हैं। उन चंक को `stream.onReasoning()` से आगे भेजें — `showReasoning: true` होने पर डायलॉग उन्हें परिणाम फ़ील्ड के ऊपर समेटे जा सकने वाले **सोच** पैनल में दिखाता है (पैनल डिफ़ॉल्ट रूप से छिपा रहता है)। तर्क आउटपुट केवल दिखाने के लिए है और एडिटर में कभी नहीं डाला जाता।

उपयोगकर्ता को हर अनुरोध पर मॉडल का सोच मोड बदलने देने के लिए AI विकल्पों में `thinking: true` सेट करें। तब डायलॉग **सोच** टॉगल दिखाता है (डिफ़ॉल्ट रूप से चालू, हर बार खुलने पर रीसेट); प्लगइन टॉगल का मान अनुरोध में `enable_thinking: true | false` के रूप में लिखता है, इसलिए आपको `chatCompletionOptions` में `enable_thinking` खुद सेट करने की ज़रूरत नहीं (और नहीं करना चाहिए):

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

जब `thinking` `false` हो या छोड़ा गया हो, टॉगल नहीं दिखता और प्लगइन `enable_thinking: false` भेजता है, ताकि जो मॉडल डिफ़ॉल्ट रूप से सोचते हैं (Qwen3, DeepSeek, …) वे न सोचें।

उपयोगकर्ता को हर अनुरोध पर तर्क प्रयास चुनने देने के लिए AI विकल्पों में `reasoningEffort` सेट करें। तब डायलॉग `options` से भरा **तर्क प्रयास** ड्रॉपडाउन दिखाता है — कस्टम प्रयास स्तर (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`)।
एक्सटेंशन ड्रॉपडाउन में खुद हमेशा एक `default` आइटम जोड़ता है (सोच-मोड का आधार), इसलिए आप अपने कॉन्फ़िग में `default` कभी सूचीबद्ध नहीं करते; विकल्प का `default` फ़ील्ड डायलॉग खुलते समय आपके कस्टम स्तरों में से एक को पहले से चुनता है (अन्यथा `default` पहले से चुना रहता है), और मान हर बार खुलने पर रीसेट होता है।
चुना हुआ मान तय करता है कि प्लगइन अनुरोध में क्या लिखे: `default` सोच मोड को बनाए रखता है — **सोच** टॉगल सक्रिय रहता है और `enable_thinking` को नियंत्रित करता है; कोई भी अन्य मान उसके बजाय `reasoning_effort` के रूप में भेजा जाता है, और वह मान चुना रहने तक सोच टॉगल अक्षम रहता है (प्रदाता एक ही अनुरोध में `enable_thinking` और `reasoning_effort` को अस्वीकार करते हैं)।
ड्रॉपडाउन तभी दिखता है जब `thinking` सक्षम हो और सोच टॉगल चालू हो — सोच बंद करने पर वह छिप जाता है और `reasoning_effort` नहीं भेजा जाता (अनुरोध `enable_thinking: false` पर लौट आता है)। `options` गायब या खाली होने पर ड्रॉपडाउन बिल्कुल रेंडर नहीं होता:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

**सोच** पैनल डिफ़ॉल्ट रूप से छिपा रहता है (`showReasoning` का डिफ़ॉल्ट `false` है)। सोच चालू रखते हुए मॉडल की तर्क प्रक्रिया (`reasoning_content` डेल्टा) स्ट्रीम करने वाला समेटे जा सकने वाला पैनल दिखाने के लिए `showReasoning: true` सेट करें — मॉडल फिर भी तर्क करता है और परिणाम उसी तरह लागू होता है, केवल चरण-दर-चरण तर्क अतिरिक्त रूप से दिखाया जाता है:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

कस्टम प्रॉम्प्ट उदाहरण स्थानीयकृत डिफ़ॉल्ट की जगह लेते हैं:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` और `storage` सीधे ब्राउज़र इंटीग्रेशन के लिए वैकल्पिक, उपभोक्ता के स्वामित्व वाले हुक हैं। ब्राउज़र कोड या ब्राउज़र स्टोरेज में रखी गई API कुंजियाँ या प्रदाता टोकन उपयोगकर्ताओं को दिखते हैं और उन्हें गोपनीय नहीं माना जाना चाहिए। प्रोडक्शन के रहस्यों के लिए ऊपर दिया बैकएंड एडेप्टर पैटर्न चुनें।

डायलॉग के क्रिया बटन पर डालने का मोड पहले से चुनने के लिए `mode: 'insert' | 'replace' | 'append'` उपयोग करें (**डालें** / **बदलें** / **अंत में जोड़ें**)। `mode` के बिना, डायलॉग खुलते समय टेक्स्ट चुना हुआ हो तो बटन का डिफ़ॉल्ट **बदलें** और अन्यथा **डालें** होता है। क्रिया बटन स्प्लिट बटन है: मुख्य भाग परिणाम को पहले से चुने मोड में लागू करता है, और उसके दाईं ओर छोटा "और" (⋮) भाग बाकी मोड की सूची वाला मेन्यू खोलता है — उनमें से किसी पर क्लिक करने से परिणाम तुरंत उसी मोड में लागू हो जाता है।

जब एडिटर में `limit` (अक्षर गिनती सीमा) हो, तो परिणाम बनते ही उसके फ़ील्ड के नीचे `generated / limit` अक्षर काउंटर दिखता है (स्ट्रीमिंग के दौरान लाइव अपडेट होता है और सीमा पार होने पर हल्का लाल हो जाता है)।
अगर AI आउटपुट सीमा से बड़ा हो जाए तो जनरेशन के तुरंत बाद डायलॉग `ai.limit_exceeded` चेतावनी भी दिखाता है।
उस स्थिति में **डालें** बटन और उसका वैकल्पिक-मोड मेन्यू अक्षम रहते हैं — `CharacterCount` एक्सटेंशन हर उस डालने को अस्वीकार करता है जो दस्तावेज़ को सीमा से बड़ा करे, इसलिए परिणाम पूरा-या-कुछ नहीं की तरह लागू होता है: जब समाए तो पूरा डाला जाता है, और सीमा पार करे तो बिल्कुल नहीं।
क्रिया फिर सक्षम करने के लिए परिणाम छोटा करें:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

OpenAI-संगत chat-completions अनुरोध अनुकूलित करने के लिए `systemPrompt`, `temperature`, `chatCompletionOptions` या `createMessages(context)` उपयोग करें। `context` में `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }` होता है: `textBefore` / `textAfter` चयन के पैराग्राफ़ का उसके आसपास का टेक्स्ट हैं (हर तरफ़ अधिकतम 500 अक्षर, चयन के बिना खाली) — उन्हें चयन के साथ भेजें, वरना मॉडल टुकड़े को पूरा टेक्स्ट समझकर पूरा कर देता है।

### `ai.aiEndpoint` {#ai-aiendpoint}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `undefined`

कस्टम `aiProvider` का विकल्प: AI सुविधा को किसी बैकएंड LLM एंडपॉइंट की ओर इंगित करें और tiptapify अनुरोध खुद बनाकर भेजता है। बैकएंड को एक न्यूनतम JSON पेलोड मिलता है:

- **हमेशा:** `prompt` (डायलॉग में टाइप किया गया अनुरोध) और `instruction` (आपका `systemPrompt`, कस्टम `createMessages` का सिस्टम संदेश, या बिल्ट-इन डिफ़ॉल्ट)।
- **वैकल्पिक, केवल सेट होने पर भेजे जाते हैं:** `stream` (केवल `true`), `thinking` (डायलॉग का **सोच** टॉगल, केवल `true`), `reasoning_effort` (चुना गया प्रयास स्तर), और `model`।

उत्तर उदारता से स्वीकार किया जाता है: साधारण स्ट्रिंग, `{ content }` ऑब्जेक्ट, या OpenAI-संगत `choices` पेलोड। जब अनुरोध में `stream: true` हो, तो उत्तर की बॉडी SSE स्ट्रीम के रूप में पढ़ी जाती है (`data:` पंक्तियाँ, जो `data: [DONE]` से समाप्त होती हैं): OpenAI-शैली के डेल्टा (`choices[0].delta.content` / `.reasoning_content`), सरल `{ type: 'content' | 'reasoning', data }` चंक, सपाट `{ content, reasoning_content }` चंक, और सादे-टेक्स्ट `data` पंक्तियाँ — सभी स्वीकार की जाती हैं। अगर बैकएंड `stream` को अनदेखा करके साधारण बॉडी के साथ उत्तर देता है, तो वही बॉडी उपयोग होती है। गैर-OK उत्तर बैकएंड का त्रुटि संदेश (JSON `{ error }` / `{ message }` या कच्ची बॉडी) डायलॉग में दिखाता है। **रोकें** बटन और डायलॉग बंद करना चल रहे अनुरोध को रोक देते हैं; आंशिक रूप से स्ट्रीम हुआ कंटेंट परिणाम फ़ील्ड में रखा जाता है।

अगर `aiProvider` और `aiEndpoint` दोनों सेट हों, तो `aiProvider` को प्राथमिकता मिलती है।

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **प्रकार:** `Record<string, string>`
- **डिफ़ॉल्ट:** `undefined`

`aiEndpoint` अनुरोध के साथ भेजे जाने वाले अतिरिक्त हेडर, जो `Content-Type: application/json` के ऊपर मिलाए जाते हैं। यहाँ सेट किया गया `Authorization` हेडर जैसा है वैसा रखा जाता है; अन्यथा `tokenProvider` का टोकन (सेट होने पर) `Authorization: Bearer <token>` के रूप में भेजा जाता है।

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'Inter'`

एडिटर की सामग्री के लिए डिफ़ॉल्ट फ़ॉन्ट परिवार।

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'px'`

फ़ॉन्ट आकार मानों की माप-इकाई।

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'0'`

एडिटर कंटेनर की बॉर्डर त्रिज्या। Vuetify त्रिज्या मान (`sm`, `md`, `lg`, `xl`, `pill`, आदि) स्वीकार करता है।

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **प्रकार:** `variantBtnTypes`
- **डिफ़ॉल्ट:** `'tonal'`

टूलबार बटन के लिए Vuetify बटन वेरिएंट। यह मान एडिटर कॉन्फ़िग के ज़रिए हर टूलबार कंपोनेंट के साथ साझा होता है — कस्टम कंपोनेंट इसे [`useTiptapifyConfig`](/hi/api/types#usetiptapifyconfig) से पढ़ सकते हैं। [`variantBtnTypes`](/hi/api/types#variantbtntypes) देखें।

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **प्रकार:** `variantFieldTypes`
- **डिफ़ॉल्ट:** `'outlined'`

टूलबार ड्रॉपडाउन फ़ील्ड के लिए Vuetify वेरिएंट। यह मान एडिटर कॉन्फ़िग के ज़रिए हर टूलबार कंपोनेंट के साथ साझा होता है — कस्टम कंपोनेंट इसे [`useTiptapifyConfig`](/hi/api/types#usetiptapifyconfig) से पढ़ सकते हैं। [`variantFieldTypes`](/hi/api/types#variantfieldtypes) देखें।

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **प्रकार:** `Array<toolbarSections>`
- **डिफ़ॉल्ट:** `[]`

टूलबार आइटम बढ़ाने या जोड़ने के लिए कस्टम टूलबार सेक्शन दें। हर सेक्शन के कंपोनेंट साझा एडिटर कॉन्फ़िग [`useTiptapifyConfig`](/hi/api/types#usetiptapifyconfig) से पढ़ सकते हैं। [कस्टम टूलबार](/hi/examples/custom-toolbar#custom-toolbar-components) देखें।

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `true`

इंटरैक्टिव स्टाइल लागू करना सक्षम करें।

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **प्रकार:** `Boolean`
- **डिफ़ॉल्ट:** `false`

एडिटर लोड होते समय अनिश्चित प्रगति पट्टी दिखाएँ।

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'default'`

लोडिंग प्रगति पट्टी का रंग। Vuetify थीम रंग मान स्वीकार करता है।

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **प्रकार:** `String`
- **डिफ़ॉल्ट:** `'1px'`

लोडिंग प्रगति पट्टी की ऊँचाई।

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **प्रकार:** `Number`
- **डिफ़ॉल्ट:** `0`

जब इतने चित्र एक पंक्ति में हों (बीच में कुछ नहीं), तो एडिटर उन्हें क्रमांकित तीन-कॉलम ग्रिड के रूप में सजाता है, उन साइटों के लिए जो ऐसे चित्रों को स्लाइडर के रूप में दिखाती हैं। `0` इसे बंद कर देता है।

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **प्रकार:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/hi/api/types#tiptapifyskininput))
- **डिफ़ॉल्ट:** `'default'`

एडिटर के बाहरी स्वरूप का रूप: टूलबार, बबल मेन्यू, ड्रॉपडाउन, डायलॉग, फ़ुटर।

- `default` — क्लासिक रूप: उभरा हुआ टूलबार, उभरे हुए बॉक्स जैसे बटन समूह, और दबी हुई अवस्था में प्राइमरी रंग वाले Vuetify बटन।
- `pastel` — शांत रूप: पतली रेखा के नीचे सपाट रंगीन टूलबार, तटस्थ दबी हुई अवस्था वाले घोस्ट बटन, हल्के ड्रॉपडाउन, कोमल डायलॉग।

सुविधाएँ (चित्र कैप्शन, स्लाइडर, संरेखण ड्रॉपडाउन, सूची शैलियाँ) दोनों स्किन में एक जैसी काम करती हैं।

```vue
<Tiptapify skin="pastel" />
```

आप इनलाइन स्किन ऑब्जेक्ट भी दे सकते हैं: टोकन ओवरराइड (`colors` / `metrics`) और आकार फ़्लैग, वैकल्पिक रूप से किसी पंजीकृत स्किन को `extends` करते हुए। यह `default` (या अपने आधार) के ऊपर रिज़ॉल्व होता है, `tiptapify-skin-inline` क्लास के तहत रेंडर होता है (ऑब्जेक्ट में `name` हो तो `tiptapify-skin-{name}`), और इसके टोकन एडिटर रूट पर `--tf-*` CSS वेरिएबल के रूप में लगते हैं। कस्टम नाम `registerSkin('mint', { … })` से आते हैं — टोकन तालिका और रेसिपी के लिए [स्किन गाइड](/hi/guide/skins) देखें।

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **प्रकार:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/hi/api/types#tiptapifyuploadoptions))
- **डिफ़ॉल्ट:** `null`

[अपलोड](/hi/guide/uploads) का एंडपॉइंट: चित्र और वीडियो डायलॉग में चुनी गई फ़ाइलें (और वीडियो पोस्टर, लिंक कार्ड का चित्र) `POST {endpoint}` (मल्टीपार्ट `file` और `kind`) के साथ उसे भेजी जाती हैं, और दस्तावेज़ वही URL रखता है जो वह लौटाता है (`{ "url": … }`)।

इसके बिना भी चित्र डायलॉग फ़ाइल लेता है: चुना गया चित्र (और वीडियो पोस्टर) base64 डेटा URL के रूप में दस्तावेज़ में एम्बेड हो जाता है, और दस्तावेज़ लोड होने पर base64 चित्र रखे जाते हैं। वीडियो डायलॉग **अपलोड** केवल इसी prop के साथ देता है। `upload` सेट होने पर दस्तावेज़ लोड होते समय base64 चित्र हटा दिए जाते हैं।

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **टाइप:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/hi/api/types#tiptapifycontentstyles))
- **डिफ़ॉल्ट:** `'inline'`

सहेजा गया HTML लिंक कार्ड, कैप्शन वाली इमेज, वीडियो, एम्बेड और टास्क लिस्ट का रूप कैसे साथ रखता है (देखें [कंटेंट स्टाइल](/hi/guide/content-styles)): `inline` इसे उनके `style` एट्रिब्यूट में लिख देता है, इसलिए साइट HTML को जैसा है वैसा दिखाती है; `classes` सिर्फ़ क्लास रखता है, उस साइट के लिए जो `tiptapify/content.css` लोड करती है। HTML लोड होते समय एडिटर इन स्टाइल को अनदेखा करता है, इसलिए दोनों तरह का HTML एक जैसा लोड होता है।

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **प्रकार:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/hi/api/types#tiptapifylinkpreviewoptions))
- **डिफ़ॉल्ट:** `null`

[लिंक कार्ड](/hi/guide/link-cards) का बैकएंड एंडपॉइंट: यह पेजों का OpenGraph डेटा पढ़ता है, जो ब्राउज़र नहीं पढ़ सकता (CORS)। एडिटर शुरू होते समय हैंडशेक से उसे जाँचता है (`GET {endpoint}` को `200 { "tiptapifyLinkPreview": 1 }` लौटाना चाहिए); जब तक वह उत्तर नहीं देता, कुछ भी कार्ड का विकल्प नहीं देता।

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## इवेंट {#events}

### `editor-ready` {#editor-ready}

एडिटर इंस्टेंस तैयार होने पर एमिट होता है।

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

एडिटर की सामग्री बदलने पर एमिट होता है।

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

`v-model` बाइंडिंग का समर्थन करता है।

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

एडिटर इंस्टेंस और `t` फ़ंक्शन Vue के provide/inject से उपलब्ध हैं:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
