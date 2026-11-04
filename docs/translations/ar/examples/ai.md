# الذكاء الاصطناعي {#ai}

استخدم هذا العرض مع أي مزوّد متوافق مع OpenAI عبر `/v1/chat/completions`. تُستخدم حقول نقطة النهاية والنموذج والرمز المميز (token) خلال جلسة هذه الصفحة فقط ولا يتم تخزينها.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="اكتب نصًا أو الصقه، ثم استخدم زر الذكاء الاصطناعي في شريط الأدوات..."
/>

## وضع نقطة النهاية الخلفية {#backend-endpoint-mode}

بدّل الحقل **الوضع** إلى **نقطة النهاية الخلفية** ليتواصل tiptapify مع الخادم الخلفي مباشرة دون الحاجة إلى `aiProvider` مخصص. يرسل حمولة بسيطة (`prompt` و`instruction` والحقول الاختيارية `stream` و`thinking` و`reasoning_effort` و`model`) إلى نقطة النهاية، ويقبل استجابة JSON عادية أو `{ content }` أو بثًا بصيغة SSE — راجع [دليل الذكاء الاصطناعي](/ar/guide/ai#backend-generation-aiendpoint) للاطلاع على العقد الكامل.

## LM Studio محليًا {#local-lm-studio}

مع LM Studio، استخدم نقطة نهاية مثل:

```txt
http://localhost:1234/v1/chat/completions
```

إذا كان LM Studio يعمل على جهاز آخر، فاستخدم عنوان ذلك الجهاز بدلًا منه، مثلًا:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

في العروض التي تعمل داخل المتصفح، استخدم وكيلًا (proxy) للتطوير إذا كان مزوّدك لا يسمح بـ CORS.
