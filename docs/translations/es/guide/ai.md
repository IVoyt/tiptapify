# Extensión de IA {#ai-extension}

La extensión de IA añade un botón a la barra de herramientas que abre un diálogo de solicitud, envía la petición al proveedor que elijas, muestra el resultado en streaming y lo inserta en el editor mediante el botón de acción según el modo (**Insertar** / **Reemplazar selección** / **Agregar al final**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

La prop `ai` acepta `true` (opciones con valores predeterminados) o un objeto de opciones (`TiptapifyAiOptions`). El elemento `ai` de la barra de herramientas siempre está registrado, pero el botón está **deshabilitado** salvo que se defina `aiProvider`.

Consulta el [ejemplo de IA](/es/examples/ai) para una demo ejecutable y las [Props](/es/api/props#ai) para la referencia completa de opciones.

## Arquitectura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliza la prop `ai`: `ai: true` se convierte en un objeto de opciones vacío, `promptExamples` recurre a los valores predeterminados localizados y el resultado se expone a los descendientes mediante `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` o `false`).
- El elemento de la barra de herramientas (`src/components/Toolbar/ai.ts`) renderiza `Button.vue`. El botón comprueba la disponibilidad de `aiProvider` y abre `Dialog.vue`.
- `Dialog.vue` gestiona todo el ciclo de vida de la solicitud: construir la petición, llamar al proveedor, el streaming y la inserción del resultado.

## El contrato del proveedor {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

El proveedor es una función asíncrona simple que implementas tú. tiptapify no llama a ninguna API por sí mismo: sirve cualquier cosa que pueda consumir un objeto `request` compatible con OpenAI (fetch, un SDK, un adaptador de backend). La excepción es el modo de backend `aiEndpoint` (consulta [Generación en el backend](#backend-generation-aiendpoint)), donde tiptapify envía la petición a tu endpoint.

La **petición** (`TiptapifyAiRequest`) se construye a partir de tus `chatCompletionOptions` y el plugin la amplía:

| Campo | Origen |
| --- | --- |
| `messages` | `createMessages(context)` si se proporciona; si no, el par predeterminado: un mensaje de sistema (tu `systemPrompt` o uno integrado) y un mensaje de usuario que incluye la solicitud, el texto seleccionado del editor con el texto que lo rodea y la regla de responder solo para la selección (o para todo el texto cuando no hay nada seleccionado) |
| `model` | la opción `model`, si está definida |
| `temperature` | la opción `temperature`, si está definida |
| `stream` | la opción `stream`, o `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | el interruptor de pensamiento / el desplegable de esfuerzo; ver más abajo |

El **contexto** (`TiptapifyAiEditorContext`) da al proveedor el estado completo del editor: `prompt`, `selectedText`, `textBefore` / `textAfter` (el texto del párrafo de la selección que la rodea, hasta 500 caracteres cada uno), `text`, `html`, `json` y `mode` (`insert` / `replace` / `append`).

Una selección que empieza o termina dentro de una palabra incluye la palabra completa, y los mensajes predeterminados envían el texto que rodea la selección con la regla de responder solo para la selección: si recibe únicamente un fragmento, un modelo lo toma por el texto completo y lo completa, y el reemplazo repetiría lo que sigue a la selección.

**Respuesta**: el proveedor puede devolver el contenido como un `string` simple, como `{ content }` (`TiptapifyAiResponse`) o como una carga `choices` compatible con OpenAI (`TiptapifyAiOpenAiResponse`). El diálogo extrae el contenido en ese orden y elimina los espacios iniciales. Si se rechaza, el mensaje de error se muestra en el diálogo (o `ai.error` cuando el error no es una instancia de `Error`) y el diálogo permanece abierto.

## Generación en el backend (`aiEndpoint`) {#backend-generation-aiendpoint}

En lugar de implementar un `aiProvider`, apunta la función de IA a un endpoint LLM de tu backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify construye entonces la petición y la envía por POST al endpoint por sí mismo. Un `aiProvider` explícito siempre tiene prioridad cuando se definen ambos.

**Petición**: una carga JSON mínima (`TiptapifyAiBackendRequest`):

| Campo | Se envía |
| --- | --- |
| `prompt` | siempre: la solicitud escrita en el diálogo |
| `instruction` | siempre: tu `systemPrompt`, el mensaje de sistema de un `createMessages` personalizado, o el predeterminado integrado |
| `stream` | solo con `stream: true` |
| `thinking` | solo cuando el interruptor **Pensamiento** del diálogo está activado |
| `reasoning_effort` | solo cuando el usuario eligió un nivel (distinto de `default`) |
| `model` | solo cuando la opción `model` está definida |

**Respuesta**: se acepta de forma flexible: una cadena simple, un objeto `{ content }` o una carga `choices` compatible con OpenAI.

**Streaming**: cuando la petición lleva `stream: true`, el cuerpo de la respuesta se lee como un flujo SSE (líneas `data:`, terminado con `data: [DONE]`). Formatos de fragmento aceptados:

- Estilo OpenAI: `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Simple: `data: {"type":"content"|"reasoning","data":"…"}`
- Plano: `data: {"content":"…","reasoning_content":"…"}`
- Texto plano: `data: some text` (una línea `data` que no es JSON es un fragmento de contenido)

Los fragmentos `content` actualizan el campo de resultado mediante `onChunk`; los fragmentos `reasoning_content` alimentan el panel **Pensamiento** mediante `onReasoning`. Si el backend ignora `stream` y responde con un cuerpo simple, se usa ese cuerpo. Un clic en **Detener** o cerrar el diálogo interrumpe la petición; el contenido recibido parcialmente por streaming se conserva en el campo de resultado.

**Encabezados**: `aiHeaders` (un `Record<string, string>`) se fusionan sobre `Content-Type: application/json`. Un encabezado `Authorization` en `aiHeaders` se conserva tal cual; si no, se envía un token de `tokenProvider` como `Authorization: Bearer <token>`.

**Errores**: una respuesta no OK muestra en el diálogo el mensaje de error del backend (JSON `{ error }` / `{ message }` o el cuerpo sin procesar).

## Streaming {#streaming}

Cuando `stream: true` (o `chatCompletionOptions.stream` es `true`), el diálogo pasa un objeto `TiptapifyAiStream` como tercer argumento:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`**: pásalo a `fetch` (o a la llamada de tu SDK). Se aborta cuando el usuario hace clic en **Detener** o cierra el diálogo, de modo que las peticiones en curso no sigan ejecutándose.
- **`onChunk`**: añade cada fragmento de contenido al campo de resultado. Durante la generación, el campo de resultado es de solo lectura y el contenido recibido parcialmente se conserva (puedes detener y luego insertarlo o descartarlo).
- **`onReasoning`**: reenvía la salida de razonamiento o pensamiento del modelo (por ejemplo, el delta `reasoning_content` de Qwen/DeepSeek/serie o) a un panel plegable **Pensamiento** sobre el resultado. El panel se expande y se desplaza automáticamente durante el streaming. La salida de razonamiento es solo para mostrar y nunca se inserta en el editor.

Los proveedores que no hacen streaming ignoran el argumento `stream`, que es opcional.

## Pensamiento y esfuerzo de razonamiento {#thinking-and-reasoning-effort}

Dos controles del usuario en el diálogo se corresponden con campos de la petición. Ambos son opcionales mediante opciones y los gestiona el plugin: no debes (ni conviene que) definir estos campos tú mismo en `chatCompletionOptions`.

- **`thinking: true`** muestra el interruptor **Pensamiento** (activado de forma predeterminada, se restablece en cada apertura del diálogo). El plugin escribe el valor del interruptor en la petición como `enable_thinking: true | false`.
- **`thinking` ausente o `thinking: false`** oculta el interruptor y el plugin envía `enable_thinking: false`, de modo que los modelos que piensan por defecto no piensen.
- **`reasoningEffort: { options, default? }`** muestra el desplegable **Esfuerzo de razonamiento**. `options` lista los niveles de esfuerzo personalizados que quieres ofrecer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); la extensión siempre añade por sí misma un elemento `default` (la base del modo de pensamiento), así que nunca incluyas `default` en tu configuración. El campo `default` preselecciona uno de tus niveles personalizados al abrir el diálogo; si se omite, se preselecciona `default`. El valor se restablece en cada apertura. El desplegable solo se renderiza cuando `options` es una lista no vacía, `thinking` está habilitado y el interruptor Pensamiento está activado.
- **`showReasoning`** (`false` de forma predeterminada) controla el panel plegable **Pensamiento** que muestra por streaming el proceso de razonamiento del modelo (el delta `reasoning_content`). Define `showReasoning: true` para mostrar ese panel manteniendo el pensamiento activado: el modelo sigue razonando y el resultado se aplica igual; solo se muestra además el razonamiento paso a paso.

Como los proveedores (vLLM/LM Studio en particular) rechazan `enable_thinking` y `reasoning_effort` en una misma petición, el plugin envía exactamente uno de los dos:

| Estado | Campo de la petición |
| --- | --- |
| Pensamiento activado, esfuerzo = `default` (o sin esfuerzo configurado) | `enable_thinking` (del interruptor) |
| Pensamiento activado, esfuerzo = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (del desplegable); el interruptor está deshabilitado |
| Pensamiento desactivado (interruptor apagado, o `thinking` no habilitado en la configuración) | `enable_thinking: false`; no se envía `reasoning_effort` |

## Errores {#errors}

El diálogo explica una petición fallida en lugar de mostrar el error sin procesar, y añade a continuación el mensaje del propio servicio:

| Qué ocurrió | Explicación |
| --- | --- |
| El navegador no recibió respuesta (`Failed to fetch`, `NetworkError…`, `Load failed`) | El servicio está caído, es inaccesible o CORS bloqueó la respuesta; la consola del navegador indica cuál |
| `401` / `403` | Revisa la clave de API o los permisos de acceso |
| `404` | Revisa la ruta del endpoint |
| `408` / `504` / un tiempo de espera agotado | El servicio no respondió a tiempo |
| `429` | Demasiadas solicitudes |
| `5xx` | El servicio no está disponible (cargando un modelo, ocupado) |

Con `aiEndpoint`, el estado procede de la respuesta. Un `aiProvider` personalizado obtiene las mismas explicaciones lanzando un error con un `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Cualquier otro error se muestra con su propio mensaje.

## Insertar el resultado {#inserting-the-result}

Con el botón de acción (**Insertar**, **Reemplazar selección** o **Agregar al final**, según el modo), el diálogo coloca `result` en el editor:

- **Modo**: el botón de acción del diálogo es un botón dividido. La parte principal aplica el resultado en el modo preseleccionado (**Insertar** / **Reemplazar selección** / **Agregar al final**): la opción `mode` lo preselecciona, o **Reemplazar selección** cuando había texto seleccionado al abrir el diálogo e **Insertar** en caso contrario. Una pequeña sección «más» (⋮) a la derecha del botón abre un menú con los demás modos; al hacer clic en uno, el resultado se aplica de inmediato en ese modo. **Insertar** coloca el resultado en el cursor, **Reemplazar selección** reemplaza el texto seleccionado (capturado al hacer clic en **Generar**) y **Agregar al final** lo añade al final del documento.
- **Límite de caracteres**: cuando el editor está configurado con `limit` (la extensión `CharacterCount` rechaza cualquier transacción que no sea un pegado y que haría crecer el documento por encima del límite), se muestra un contador de caracteres `generated / limit` bajo el campo de resultado (en vivo durante el streaming, en rojo suave cuando se superaría el límite), y el diálogo muestra la advertencia `ai.limit_exceeded` justo después de la generación cuando el resultado superaría el límite. El botón **Insertar** y su menú de modos alternativos quedan entonces deshabilitados: el resultado se aplica todo o nada, así que debes acortarlo antes de aplicarlo.