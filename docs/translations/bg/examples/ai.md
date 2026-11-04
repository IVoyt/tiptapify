# AI {#ai}

Използвайте тази демонстрация с всеки OpenAI-съвместим доставчик на `/v1/chat/completions`. Полетата за крайна точка, модел и токен се използват само в тази сесия на страницата и не се запазват.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Напишете или поставете текст, после използвайте AI бутона в лентата..."
/>

## Режим с backend крайна точка {#backend-endpoint-mode}

Превключете полето **Режим** на **Backend крайна точка**, за да позволите на tiptapify да комуникира директно с вашия backend, без собствен `aiProvider`. Той изпраща минимален payload (`prompt`, `instruction` и незадължителните полета `stream`, `thinking`, `reasoning_effort`, `model`) към крайната точка и приема обикновен JSON, `{ content }` или SSE поточен отговор — пълният договор е описан в [AI ръководството](/bg/guide/ai#backend-generation-aiendpoint).

## Локален LM Studio {#local-lm-studio}

За LM Studio използвайте крайна точка като:

```txt
http://localhost:1234/v1/chat/completions
```

Ако LM Studio работи на друга машина, използвайте нейния хост, например:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

За демонстрации в браузъра използвайте dev proxy, ако доставчикът ви не позволява CORS.
