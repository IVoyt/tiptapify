# AI {#ai}

Используйте это демо с любым OpenAI-совместимым провайдером `/v1/chat/completions`. Поля endpoint, модели и токена действуют только в рамках сессии этой страницы и не сохраняются.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Напишите или вставьте текст, затем нажмите кнопку AI на панели инструментов..."
/>

## Режим backend endpoint {#backend-endpoint-mode}

Переключите поле **Режим** на **Backend endpoint**, чтобы tiptapify обращался напрямую к вашему бэкенду, без собственного `aiProvider`. Он отправляет на endpoint минимальный payload (`prompt`, `instruction` и необязательные поля `stream`, `thinking`, `reasoning_effort`, `model`) и принимает ответ в виде обычного JSON, `{ content }` или потока SSE — полный контракт описан в [руководстве по AI](/ru/guide/ai#backend-generation-aiendpoint).

## Локальный LM Studio {#local-lm-studio}

Для LM Studio используйте endpoint вида:

```txt
http://localhost:1234/v1/chat/completions
```

Если LM Studio запущен на другой машине, укажите её хост, например:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Для браузерных демо используйте dev-прокси, если ваш провайдер не разрешает CORS.
