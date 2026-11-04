# AI {#ai}

इस डेमो को किसी भी OpenAI-संगत `/v1/chat/completions` प्रदाता के साथ उपयोग करें। एंडपॉइंट, मॉडल और टोकन फ़ील्ड केवल इसी पेज सत्र में उपयोग होते हैं और संग्रहीत नहीं किए जाते।

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="टेक्स्ट लिखें या पेस्ट करें, फिर AI टूलबार बटन का उपयोग करें..."
/>

## बैकएंड एंडपॉइंट मोड {#backend-endpoint-mode}

कस्टम `aiProvider` के बिना tiptapify को सीधे आपके बैकएंड से जोड़ने के लिए **Mode** फ़ील्ड को **Backend endpoint** पर सेट करें। यह एंडपॉइंट पर न्यूनतम पेलोड (`prompt`, `instruction` और वैकल्पिक `stream`, `thinking`, `reasoning_effort`, `model` फ़ील्ड) भेजता है और सामान्य JSON, `{ content }` या SSE स्ट्रीमिंग उत्तर स्वीकार करता है — पूरे अनुबंध के लिए [AI गाइड](/hi/guide/ai#backend-generation-aiendpoint) देखें।

## लोकल LM Studio {#local-lm-studio}

LM Studio के लिए इस तरह का एंडपॉइंट उपयोग करें:

```txt
http://localhost:1234/v1/chat/completions
```

अगर LM Studio किसी दूसरी मशीन पर चल रहा है, तो उसका होस्ट उपयोग करें, उदाहरण के लिए:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

ब्राउज़र-आधारित डेमो के लिए, अगर आपका प्रदाता CORS की अनुमति नहीं देता तो डेव प्रॉक्सी उपयोग करें।
