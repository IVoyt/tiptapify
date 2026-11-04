# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Tipo:** `String | Object`
- **Predeterminado:** `''`

Contenido inicial del editor. Acepta una cadena HTML o un objeto JSON de Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` es solo el contenido **inicial**; para el enlace bidireccional usa `v-model` (consulta `modelValue`).

### `modelValue` {#modelvalue}

- **Tipo:** `String | Object`
- **Predeterminado:** `''`

Valor del enlace bidireccional de `v-model`. Usa `v-model` para mantener un valor reactivo sincronizado con el editor. En cada edición el componente emite `update:modelValue` con el último HTML, que `v-model` escribe de nuevo en tu ref. Cuando solo se usa `v-model` (sin `:content`), el valor enlazado es el contenido inicial del editor.

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

- **Tipo:** `String`
- **Predeterminado:** `''`

Texto de marcador que se muestra cuando el editor está vacío.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipo:** `Number`
- **Predeterminado:** `null`

Altura mínima del área de contenido del editor, en píxeles.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Muestra u oculta la barra de herramientas.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipo:** `Array<String> | Object`
- **Predeterminado:** `[]`

Elementos de la barra de herramientas que se muestran. Pasa un array de nombres de elementos o un objeto con secciones con nombre. Consulta [Elementos de la barra de herramientas](/es/api/toolbar-items).
En un array, `'|'` divide los elementos en grupos (en ese orden, sea cual sea la sección de la que provengan los botones) y `'~'` empuja los elementos que le siguen al final de la barra de herramientas. Con grupos, un nombre que no es un elemento integrado reserva un lugar para el botón personalizado de ese nombre de `customExtensions`; si no existe tal botón, el lugar se descarta.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipo:** `Boolean`
- **Predeterminado:** `false`

Cuando es `true`, la prop `items` indica los elementos que se **excluyen** en lugar de los que se incluyen.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Muestra el menú de burbuja cuando se selecciona texto: una fila de botones de iconos en grupos: negrita, cursiva, subrayado, tachado | superíndice, subíndice | resaltado, código en línea | enlace | borrar formato. Cada botón tiene un tooltip con su atajo y se muestra activo cuando su marca está en la selección. Se oculta para un bloque seleccionado (imagen, widget), dentro de código y cuando se selecciona todo el documento.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Muestra el menú flotante en las líneas vacías: encabezado 1, encabezado 2 y una lista con viñetas, en la misma fila de botones de iconos que el menú de burbuja.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Activa el menú de comandos con barra (escribe `/` para abrirlo).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Muestra el recuento de palabras en el pie del editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Muestra el recuento de caracteres en el pie del editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipo:** `Number | null`
- **Predeterminado:** `null`

Número máximo de caracteres permitido por la extensión `CharacterCount` de Tiptap. Define `null` u omite la prop para mantener la edición sin límite. Cuando se establece un valor mayor que `0`, el pie muestra un indicador de progreso circular SVG con umbrales codificados por color.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipo:** `String`
- **Predeterminado:** `'purple'`

Color predeterminado del indicador de progreso circular que se muestra en el pie cuando se define `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipo:** `String`
- **Predeterminado:** `'orange'`

Color del indicador de progreso cuando el uso supera el 75 % del límite.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipo:** `String`
- **Predeterminado:** `'red'`

Color del indicador de progreso cuando se ha alcanzado el límite de caracteres.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipo:** `TiptapifyFooterAlignment`
- **Predeterminado:** `'end'`

Alineación de los elementos de estado del pie. Acepta `'start'`, `'center'` o `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipo:** `Boolean | TiptapifyAiOptions`
- **Predeterminado:** `false`

Activa el elemento `ai` de la barra de herramientas. El editor construye una petición `/v1/chat/completions` compatible con OpenAI y se la pasa a `aiProvider`. Usa el callback del proveedor para llamar a tu backend, BFF, endpoint protegido con OAuth, LM Studio o un wrapper de SDK.

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

Ejemplo con un LLM local en LM Studio:

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

El streaming se admite definiendo `stream: true` y enviando los tokens mediante el argumento `stream` de `aiProvider`. El campo de resultado del diálogo de IA se actualiza en vivo a medida que llegan los fragmentos, y un botón **Detener** cancela la petición en curso:

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

Pasa `stream.signal` a `fetch` (o a la llamada de tu SDK) para que la petición se cancele cuando el usuario haga clic en **Detener** o cierre el diálogo. El contenido recibido parcialmente por streaming permanece en el campo de resultado y se puede aplicar o descartar. Los proveedores que no hacen streaming pueden ignorar por completo el argumento `stream`: es opcional y retrocompatible.

Los modelos de razonamiento (Qwen thinking, DeepSeek, serie o) emiten por streaming sus «pensamientos» en un delta `reasoning_content` aparte. Reenvía esos fragmentos mediante `stream.onReasoning()`: con `showReasoning: true`, el diálogo los muestra en un panel plegable **Pensamiento** sobre el campo de resultado (el panel está oculto de forma predeterminada). La salida de razonamiento es solo para mostrar y nunca se inserta en el editor.

Para que el usuario pueda cambiar el modo de pensamiento del modelo en cada petición, define `thinking: true` en las opciones de IA. El diálogo muestra entonces un interruptor **Pensamiento** (activado de forma predeterminada, se restablece en cada apertura); el plugin escribe el valor del interruptor en la petición como `enable_thinking: true | false`, así que ya no necesitas (ni conviene) definir `enable_thinking` tú mismo en `chatCompletionOptions`:

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

Cuando `thinking` es `false` o se omite, el interruptor no se muestra y el plugin envía `enable_thinking: false`, de modo que los modelos que piensan por defecto (Qwen3, DeepSeek, …) no piensen.

Para que el usuario elija el esfuerzo de razonamiento en cada petición, define `reasoningEffort` en las opciones de IA. El diálogo muestra entonces un desplegable **Esfuerzo de razonamiento** rellenado desde `options`: niveles de esfuerzo personalizados (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
La extensión siempre añade por sí misma un elemento `default` al desplegable (la base del modo de pensamiento), así que nunca incluyas `default` en tu configuración; el campo `default` de la opción preselecciona uno de tus niveles personalizados al abrir el diálogo (si no, se preselecciona `default`), y el valor se restablece en cada apertura.
El valor seleccionado decide lo que el plugin escribe en la petición: `default` mantiene el modo de pensamiento (el interruptor **Pensamiento** sigue activo y controla `enable_thinking`); cualquier otro valor se envía como `reasoning_effort` en su lugar, y el interruptor Pensamiento se deshabilita mientras ese valor está seleccionado (los proveedores rechazan `enable_thinking` y `reasoning_effort` en una misma petición).
El desplegable solo se muestra cuando `thinking` está habilitado y el interruptor Pensamiento está activado: al desactivar el pensamiento se oculta y no se envía `reasoning_effort` (la petición vuelve a `enable_thinking: false`). Cuando `options` falta o está vacío, el desplegable no se renderiza en absoluto:

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

El panel **Pensamiento** está oculto de forma predeterminada (`showReasoning` es `false` por defecto). Define `showReasoning: true` para mostrar un panel plegable que muestra por streaming el proceso de razonamiento del modelo (el delta `reasoning_content`) manteniendo el pensamiento activado: el modelo sigue razonando y el resultado se aplica igual; solo se muestra además el razonamiento paso a paso:

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

Los ejemplos de solicitud personalizados reemplazan los predeterminados localizados:

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

`tokenProvider` y `storage` son hooks opcionales, a cargo del consumidor, para integraciones directas desde el navegador. Las claves de API o los tokens de proveedor colocados en el código del navegador o en su almacenamiento son visibles para los usuarios y no deben tratarse como secretos. Para los secretos de producción, prefiere el patrón de adaptador de backend descrito arriba.

Usa `mode: 'insert' | 'replace' | 'append'` para preseleccionar el modo de inserción del botón de acción del diálogo (**Insertar** / **Reemplazar selección** / **Agregar al final**). Sin `mode`, el botón usa por defecto **Reemplazar selección** cuando había texto seleccionado al abrir el diálogo e **Insertar** en caso contrario. El botón de acción es un botón dividido: la parte principal aplica el resultado en el modo preseleccionado, y una pequeña sección «más» (⋮) a su derecha abre un menú con los demás modos; al hacer clic en uno, el resultado se aplica de inmediato en ese modo.

Cuando el editor tiene un `limit` (límite de caracteres), se muestra un contador de caracteres `generated / limit` bajo el campo de resultado en cuanto se genera un resultado (se actualiza en vivo durante el streaming y se vuelve rojo suave cuando se superaría el límite).
El diálogo también muestra la advertencia `ai.limit_exceeded` justo después de la generación si la salida de la IA superara el límite.
En ese estado, el botón **Insertar** y su menú de modos alternativos quedan deshabilitados: la extensión `CharacterCount` rechaza cualquier inserción que haría crecer el documento por encima del límite, así que el resultado se aplica todo o nada: se inserta por completo si cabe, o no se inserta en absoluto si supera el límite.
Acorta el resultado para volver a habilitar la acción:

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

Usa `systemPrompt`, `temperature`, `chatCompletionOptions` o `createMessages(context)` para personalizar la petición de chat-completions compatible con OpenAI. `context` contiene `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` son el texto del párrafo de la selección que la rodea (hasta 500 caracteres cada uno, vacíos sin selección); envíalos junto con la selección, o un modelo tomará el fragmento por el texto completo y lo completará.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipo:** `String`
- **Predeterminado:** `undefined`

Alternativa a un `aiProvider` personalizado: apunta la función de IA a un endpoint LLM de tu backend y tiptapify construye y envía la petición por sí mismo. El backend recibe una carga JSON mínima:

- **Siempre:** `prompt` (la solicitud escrita en el diálogo) e `instruction` (tu `systemPrompt`, el mensaje de sistema de un `createMessages` personalizado, o el predeterminado integrado).
- **Opcional, se envía solo cuando se define:** `stream` (solo `true`), `thinking` (el interruptor **Pensamiento** del diálogo, solo `true`), `reasoning_effort` (el nivel de esfuerzo seleccionado) y `model`.

La respuesta se acepta de forma flexible: una cadena simple, un objeto `{ content }` o una carga `choices` compatible con OpenAI. Cuando la petición lleva `stream: true`, el cuerpo de la respuesta se lee como un flujo SSE (líneas `data:`, terminado con `data: [DONE]`): se aceptan deltas al estilo OpenAI (`choices[0].delta.content` / `.reasoning_content`), un fragmento simple `{ type: 'content' | 'reasoning', data }`, un fragmento plano `{ content, reasoning_content }` y líneas `data` de texto plano. Si el backend ignora `stream` y responde con un cuerpo simple, se usa ese cuerpo. Una respuesta no OK muestra en el diálogo el mensaje de error del backend (JSON `{ error }` / `{ message }` o el cuerpo sin procesar). Un botón **Detener** y el cierre del diálogo abortan la petición en curso; el contenido recibido parcialmente por streaming se conserva en el campo de resultado.

Si se definen `aiProvider` y `aiEndpoint`, prevalece `aiProvider`.

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

- **Tipo:** `Record<string, string>`
- **Predeterminado:** `undefined`

Encabezados adicionales enviados con la petición a `aiEndpoint`, fusionados sobre `Content-Type: application/json`. Un encabezado `Authorization` definido aquí se conserva tal cual; si no, se envía un token de `tokenProvider` (cuando está definido) como `Authorization: Bearer <token>`.

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

- **Tipo:** `String`
- **Predeterminado:** `'Inter'`

Familia tipográfica predeterminada del contenido del editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipo:** `String`
- **Predeterminado:** `'px'`

Unidad de medida de los valores de tamaño de fuente.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipo:** `String`
- **Predeterminado:** `'0'`

Radio del borde del contenedor del editor. Acepta los valores de radio de Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipo:** `variantBtnTypes`
- **Predeterminado:** `'tonal'`

Variante de botón de Vuetify para los botones de la barra de herramientas. El valor se comparte con todos los componentes de la barra de herramientas mediante la configuración del editor: los componentes personalizados pueden leerlo con [`useTiptapifyConfig`](/es/api/types#usetiptapifyconfig). Consulta [`variantBtnTypes`](/es/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipo:** `variantFieldTypes`
- **Predeterminado:** `'outlined'`

Variante de Vuetify para los campos desplegables de la barra de herramientas. El valor se comparte con todos los componentes de la barra de herramientas mediante la configuración del editor: los componentes personalizados pueden leerlo con [`useTiptapifyConfig`](/es/api/types#usetiptapifyconfig). Consulta [`variantFieldTypes`](/es/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipo:** `Array<toolbarSections>`
- **Predeterminado:** `[]`

Proporciona secciones personalizadas de la barra de herramientas para ampliarla o añadirle elementos. Los componentes de cada sección pueden leer la configuración compartida del editor con [`useTiptapifyConfig`](/es/api/types#usetiptapifyconfig). Consulta [Barra de herramientas personalizada](/es/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipo:** `Boolean`
- **Predeterminado:** `true`

Activa la aplicación interactiva de estilos.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipo:** `Boolean`
- **Predeterminado:** `false`

Muestra una barra de progreso indeterminada mientras el editor se carga.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipo:** `String`
- **Predeterminado:** `'default'`

Color de la barra de progreso de carga. Acepta los valores de color del tema de Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipo:** `String`
- **Predeterminado:** `'1px'`

Altura de la barra de progreso de carga.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipo:** `Number`
- **Predeterminado:** `0`

A partir de este número de imágenes seguidas (sin nada entre ellas), el editor las dispone en una cuadrícula numerada de tres columnas, para sitios que muestran esas imágenes como un slider. `0` lo desactiva.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipo:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/es/api/types#tiptapifyskininput))
- **Predeterminado:** `'default'`

El aspecto del cromado del editor: barra de herramientas, menús de burbuja, desplegables, diálogos y pie.

- `default` — el aspecto clásico: una barra de herramientas elevada, grupos de botones como cajas elevadas, botones de Vuetify con un estado pulsado en color primario.
- `pastel` — el aspecto discreto: una barra de herramientas plana y teñida bajo una línea fina, botones fantasma con un estado pulsado neutro, menús desplegables claros, diálogos suaves.

Las funciones (pies de foto de imágenes, sliders, el desplegable de alineación, estilos de lista) funcionan igual en ambos skins.

```vue
<Tiptapify skin="pastel" />
```

También puedes pasar un objeto de skin en línea: sobrescrituras de tokens (`colors` / `metrics`) e indicadores de forma, que opcionalmente hereda (`extends`) de un skin registrado. Se resuelve sobre `default` (o su base), se renderiza con la clase `tiptapify-skin-inline` (`tiptapify-skin-{name}` cuando el objeto incluye un `name`), y sus tokens se aplican como variables CSS `--tf-*` en la raíz del editor. Los nombres personalizados provienen de `registerSkin('mint', { … })`; consulta la [guía de Skins](/es/guide/skins) para la tabla de tokens y las recetas.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/es/api/types#tiptapifyuploadoptions))
- **Predeterminado:** `null`

El endpoint de la [subida de archivos](/es/guide/uploads): los archivos elegidos en los diálogos de imagen y video (y la portada de un video, la imagen de una tarjeta de enlace) se le envían con `POST {endpoint}` (`file` y `kind` multipart), y el documento conserva la URL que responde (`{ "url": … }`).

Sin ella, el diálogo de imagen sigue aceptando un archivo: una imagen elegida (y la portada de un video) se incrusta en el documento como URL de datos base64, y las imágenes base64 se conservan al cargar el documento. El diálogo de video ofrece **Subir** solo con esta prop. Con `upload` definido, las imágenes base64 se descartan al cargar el documento.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipo:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/es/api/types#tiptapifycontentstyles))
- **Por defecto:** `'inline'`

Cómo lleva el HTML guardado el aspecto de las tarjetas de enlace, las imágenes con pie de foto, los vídeos, las incrustaciones y las listas de tareas (véase [Estilos de contenido](/es/guide/content-styles)): `inline` lo escribe en sus atributos `style`, de modo que un sitio muestra el HTML tal cual; `classes` conserva solo clases, para un sitio que carga `tiptapify/content.css`. El editor ignora estos estilos al cargar el HTML, así que ambos tipos de HTML se cargan igual.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/es/api/types#tiptapifylinkpreviewoptions))
- **Predeterminado:** `null`

El endpoint de backend de las [tarjetas de enlace](/es/guide/link-cards): lee los datos OpenGraph de las páginas, algo que un navegador no puede hacer (CORS). El editor lo comprueba con un handshake al arrancar (`GET {endpoint}` debe responder `200 { "tiptapifyLinkPreview": 1 }`); hasta que responda, nada ofrece una tarjeta.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Eventos {#events}

### `editor-ready` {#editor-ready}

Se emite cuando la instancia del editor está lista.

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

Se emite cuando cambia el contenido del editor.

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

Admite el enlace con `v-model`.

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

La instancia del editor y la función `t` están disponibles mediante provide/inject de Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
