# Tipos {#types}

## TiptapifyEditor {#tiptapifyeditor}

Clase Editor de Tiptap ampliada con propiedades adicionales.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Define los valores válidos de la prop `variantBtn` de `<Tiptapify>`. El valor se aplica a cada botón de la barra de herramientas mediante la configuración compartida del editor (consulta [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Define los valores válidos de la prop `variantField` de `<Tiptapify>`. El valor se aplica a los campos desplegables de la barra de herramientas mediante la configuración compartida del editor (consulta [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Define los valores válidos de la prop `footerAlignment` del componente `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Define los nombres integrados de la prop `skin` del componente `<Tiptapify>`: el aspecto del cromado del editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — el aspecto clásico: una barra de herramientas elevada, grupos de botones como cajas elevadas, botones de Vuetify con un estado pulsado en color primario.
- `pastel` — el aspecto discreto: una barra de herramientas plana y teñida, botones fantasma, menús desplegables claros, diálogos suaves.

Los skins personalizados añaden nombres: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` es el helper de identidad para definiciones const tipadas. Ambos se exportan desde `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Las variantes estructurales que un token no puede expresar (marcado de componentes, enlaces de props de Vuetify). La forma decide qué conjuntos de reglas del skin se aplican; los tokens las pintan.

```typescript
type TiptapifyShape = {
  toolbar?: 'raised' | 'flat'   // elevated bar vs flat tinted bar
  groups?: 'box' | 'flat'       // toolbar sections as raised boxes vs plain runs
  buttons?: 'vuetify' | 'quiet' // native Vuetify buttons vs ghost buttons
  bubble?: 'card' | 'flat'      // kept for compatibility: the bubble menus are one row in both
  dialog?: 'classic' | 'soft'   // classic dialog chrome vs soft card
  menu?: 'vuetify' | 'soft'     // dropdown menus: Vuetify list vs padded card
}

// The shape after resolution: every key set (missing keys fall back to classic)
type ResolvedShape = Required<TiptapifyShape>
```

Todo skin se resuelve sobre la forma classic. La forma resultante se expone como `shape: ComputedRef<ResolvedShape>` en [`TiptapifyConfig`](#tiptapifyconfig), de modo que los componentes personalizados de la barra de herramientas puedan seguirla.

## TiptapifySkinColors {#tiptapifyskincolors}

El catálogo de tokens de color del skin: barra de herramientas, grupos, botones, menús de burbuja, desplegables, diálogos, marco, imágenes y el tirador de redimensionado. Cada clave en camelCase se corresponde con una variable CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). La tabla completa está en la [guía de Skins](/es/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

El catálogo de tokens de métricas del skin: espaciados, tamaños y radios de las mismas áreas, con la misma correspondencia clave → `--tf-*`. La tabla completa está en la [guía de Skins](/es/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

El tipo completo de la prop `skin`: el nombre de un skin registrado (cadena) o un objeto de skin en línea.

```typescript
type TiptapifySkinInput = string | TiptapifySkinConfig

type TiptapifySkinConfig = TiptapifyShape & {
  name?: string
  // registered skin name to inherit from; implicit 'default'
  extends?: string
  colors?: Partial<TiptapifySkinColors>
  metrics?: Partial<TiptapifySkinMetrics>
}
```

Un objeto en línea se resuelve por la misma cadena que un skin registrado (classic → `extends` → propio), nunca entra en el registro global y se renderiza con la clase `tiptapify-skin-inline` salvo que incluya un `name`. Sus tokens se emiten como variables CSS `--tf-*` en la raíz del editor.

## TiptapifyContentStyles {#tiptapifycontentstyles}

El tipo de la prop `contentStyles` (véase [Estilos de contenido](/es/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

El tipo de la prop `upload`: el endpoint de la [subida de archivos](/es/guide/uploads).

```typescript
type TiptapifyUploadOptions = {
  // POST {endpoint}: multipart `file` and `kind`, answered by { url } (or an error status with { error })
  endpoint: string
  // extra request headers, e.g. authorization
  headers?: Record<string, string>
}

// The `kind` field of an upload
type TiptapifyUploadKind = 'image' | 'video'
```

## TiptapifyLinkPreviewOptions {#tiptapifylinkpreviewoptions}

El tipo de la prop `linkPreview` y de los datos que responde su endpoint (consulta [Tarjetas de enlace](/es/guide/link-cards)).

```typescript
type TiptapifyLinkPreviewOptions = {
  // GET {endpoint} answers the handshake, GET {endpoint}?url=<page> the data of the page
  endpoint: string
  headers?: Record<string, string>
}

type TiptapifyLinkPreviewData = {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
}
```

## TiptapifyConfig {#tiptapifyconfig}

Configuración de la interfaz a nivel de editor compartida con todos los componentes dentro de `<Tiptapify>` mediante `provide`/`inject` de Vue. Léela en tus propios componentes de barra de herramientas con [`useTiptapifyConfig`](#usetiptapifyconfig).

```typescript
import type { ComputedRef, Ref } from 'vue'

interface TiptapifyConfig {
  variantBtn: Ref<variantBtnTypes>
  variantField: Ref<variantFieldTypes>
  // the raw `skin` prop: a registered name (string) or an inline skin object
  skin: Ref<TiptapifySkinInput>
  // the resolved skin name ('inline' for an inline object without a name)
  skinName: ComputedRef<string>
  // css variable name -> value; only overrides, the css fallbacks carry the base
  tokens: ComputedRef<Record<string, string>>
  // the resolved shape — every key set, see [ResolvedShape](#tiptapifyshape)
  shape: ComputedRef<ResolvedShape>
}
```

Los valores son reactivos: al cambiar la prop `variantBtn` / `variantField` / `skin` de `<Tiptapify>`, se actualizan todos los componentes de la barra de herramientas sin volver a renderizar las props.

## useTiptapifyConfig {#usetiptapifyconfig}

Devuelve la configuración compartida de la instancia de `<Tiptapify>` a la que pertenece el componente que lo llama. Está pensado para componentes personalizados de la barra de herramientas (consulta [Barra de herramientas personalizada](/es/examples/custom-toolbar#custom-toolbar-components)).

```typescript
function useTiptapifyConfig(): TiptapifyConfig
```

```vue
<script setup lang="ts">
import { useTiptapifyConfig } from 'tiptapify'

const { variantBtn, variantField, skin } = useTiptapifyConfig()
</script>

<template>
  <VBtn :variant="variantBtn" size="32" />
</template>
```

Fuera de una instancia de `<Tiptapify>`, el composable recurre a los valores predeterminados del paquete: `variantBtn` `flat`, `variantField` `solo` y el skin `default` (forma classic, sin tokens emitidos).

```typescript
enum ToolbarSectionsEnum {
  actions = 'actions',
  ai = 'ai',
  alignment = 'alignment',
  extra = 'extra',
  formatExtra = 'formatExtra',
  format = 'format',
  list = 'list',
  media = 'media',
  misc = 'misc',
  style = 'style',
}
```

## Tipos de IA {#ai-types}

```typescript
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

interface TiptapifyAiStream {
  signal: AbortSignal
  onChunk: (chunk: string) => void
  onReasoning: (chunk: string) => void
}

type TiptapifyAiChatRole = 'system' | 'user' | 'assistant' | 'developer' | 'tool'

interface TiptapifyAiChatMessage {
  role: TiptapifyAiChatRole
  content: string
}

interface TiptapifyAiRequest {
  model?: string
  messages: TiptapifyAiChatMessage[]
  temperature?: number
  stream?: boolean
  [key: string]: unknown
}

type TiptapifyAiReasoningEffort = 'low' | 'medium' | 'high'

interface TiptapifyAiReasoningEffortOptions {
  options: TiptapifyAiReasoningEffort[]
  default?: TiptapifyAiReasoningEffort
}

interface TiptapifyAiEditorContext {
  prompt: string
  selectedText: string  // whole words: a selection cut inside a word takes the word
  textBefore: string    // the selection's paragraph before it, up to 500 characters ('' without a selection)
  textAfter: string     // the selection's paragraph after it, up to 500 characters
  text: string
  html: string
  json: object
  mode: 'insert' | 'replace' | 'append'
}

interface TiptapifyAiResponse {
  content: string
}

interface TiptapifyAiOpenAiResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
    text?: string
  }>
}

interface TiptapifyAiBackendRequest {
  prompt: string
  instruction: string
  stream?: boolean
  thinking?: boolean
  reasoning_effort?: TiptapifyAiReasoningEffort
  model?: string
}

interface TiptapifyAiBackendProviderOptions {
  endpoint: string
  headers?: Record<string, string>
  tokenProvider?: TiptapifyAiTokenProvider
}

function createAiBackendProvider(options: TiptapifyAiBackendProviderOptions): TiptapifyAiProvider

interface TiptapifyAiPromptExample {
  title: string
  prompt: string
}

interface TiptapifyAiOptions {
  aiProvider?: TiptapifyAiProvider
  aiEndpoint?: string
  aiHeaders?: Record<string, string>
  model?: string
  promptExamples?: TiptapifyAiPromptExample[]
  mode?: 'insert' | 'replace' | 'append'
  defaultPrompt?: string
  systemPrompt?: string
  temperature?: number
  stream?: boolean
  thinking?: boolean
  reasoningEffort?: TiptapifyAiReasoningEffortOptions
  showReasoning?: boolean
  chatCompletionOptions?: Record<string, unknown>
  createMessages?: (context: TiptapifyAiEditorContext) => TiptapifyAiChatMessage[]
  tokenProvider?: () => Promise<string | null> | string | null
  storage?: {
    getItem: (key: string) => string | null | Promise<string | null>
    setItem: (key: string, value: string) => void | Promise<void>
    removeItem: (key: string) => void | Promise<void>
  }
}
```

## sectionComponent {#sectioncomponent}

```typescript
interface sectionComponent {
  name: string
  component: any
  props?: { [key: string]: any }
}
```

## section {#section}

```typescript
interface section {
  section: string
  group: boolean
  components: sectionComponent[]
  extensions?: Array<any>
}
```

## toolbarSections {#toolbarsections}

```typescript
type toolbarSections = Array<section>
```

## itemsPropType {#itemsproptype}

Define los valores válidos de la prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Formato de array**: lista plana de nombres de elementos:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Formato de objeto**: secciones con nombre:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Se emite mediante el evento `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Se emite mediante el evento `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opciones que se pasan al instalar el plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Reexportaciones {#re-exports}

Las siguientes utilidades se reexportan desde `@tiptap/core` por comodidad al crear extensiones personalizadas:

| Exportación       | Tipo     | Origen          |
|-------------------|----------|-----------------|
| `Node`            | Clase    | `@tiptap/core`  |
| `Mark`            | Clase    | `@tiptap/core`  |
| `mergeAttributes` | Función  | `@tiptap/core`  |
| `markInputRule`   | Función  | `@tiptap/core`  |
| `markPasteRule`   | Función  | `@tiptap/core`  |
| `CommandProps`    | Tipo     | `@tiptap/core`  |
| `InputRuleMatch`  | Tipo     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tipo     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Los Material Design Icons de `@mdi/js` se reexportan para personalizar los iconos de la barra de herramientas.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable para leer la configuración de la interfaz a nivel de editor (`variantBtn`, `variantField`) desde componentes personalizados de la barra de herramientas. Consulta [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

La clase Editor subyacente de `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Los componentes del editor y del diálogo están disponibles como exportaciones con nombre para su uso directo.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
