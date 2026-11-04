# AI {#ai}

Використовуйте це демо з будь-яким OpenAI-сумісним провайдером `/v1/chat/completions`. Поля endpoint, model і token використовуються лише в межах сесії цієї сторінки й не зберігаються.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Напишіть або вставте текст, а потім скористайтеся кнопкою AI на панелі інструментів..."
/>

## Режим Backend endpoint {#backend-endpoint-mode}

Перемкніть поле **Режим** на **Backend endpoint**, щоб tiptapify напряму звертався до вашого бекенду без власного `aiProvider`. Він надсилає на endpoint мінімальний payload (`prompt`, `instruction` та необов'язкові поля `stream`, `thinking`, `reasoning_effort`, `model`) і приймає звичайний JSON, `{ content }` або потокову відповідь SSE — повний контракт дивіться в [посібнику з AI](/uk/guide/ai#backend-generation-aiendpoint).

## Локальний LM Studio {#local-lm-studio}

Для LM Studio використовуйте endpoint на кшталт:

```txt
http://localhost:1234/v1/chat/completions
```

Якщо LM Studio працює на іншій машині, використайте її хост, наприклад:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Для браузерних демо використовуйте dev-проксі, якщо ваш провайдер не дозволяє CORS.
