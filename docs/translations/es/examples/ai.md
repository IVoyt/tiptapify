# IA {#ai}

Usa esta demo con cualquier proveedor compatible con OpenAI que ofrezca `/v1/chat/completions`. Los campos de endpoint, modelo y token solo se usan durante esta sesión de la página y no se guardan.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Escribe o pega un texto y luego usa el botón de IA de la barra de herramientas..."
/>

## Modo de endpoint del backend {#backend-endpoint-mode}

Cambia el campo **Modo** a **Endpoint del backend** para que tiptapify se comunique directamente con tu backend, sin un `aiProvider` personalizado. Envía al endpoint una carga mínima (`prompt`, `instruction` y los campos opcionales `stream`, `thinking`, `reasoning_effort` y `model`) y acepta una respuesta JSON simple, `{ content }` o streaming SSE. Consulta la [guía de IA](/es/guide/ai#backend-generation-aiendpoint) para ver el contrato completo.

## LM Studio local {#local-lm-studio}

Para LM Studio, usa un endpoint como este:

```txt
http://localhost:1234/v1/chat/completions
```

Si LM Studio se ejecuta en otra máquina, usa ese host, por ejemplo:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

En las demos basadas en el navegador, usa un proxy de desarrollo si tu proveedor no permite CORS.
