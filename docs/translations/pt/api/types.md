# Tipos {#types}

## TiptapifyEditor {#tiptapifyeditor}

Classe Editor do Tiptap alargada com propriedades adicionais.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Define os valores válidos da prop `variantBtn` em `<Tiptapify>`. O valor é aplicado a todos os botões da barra de ferramentas através da configuração partilhada do editor (consulte [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Define os valores válidos da prop `variantField` em `<Tiptapify>`. O valor é aplicado aos campos de menu pendente da barra de ferramentas através da configuração partilhada do editor (consulte [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Define os valores válidos da prop `footerAlignment` no componente `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Define os nomes integrados da prop `skin` no componente `<Tiptapify>`: o aspeto do cromado do editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — o aspeto clássico: uma barra de ferramentas elevada, grupos de botões como caixas elevadas, botões do Vuetify com um estado premido na cor primária.
- `pastel` — o aspeto discreto: uma barra de ferramentas plana e tingida, botões fantasma, menus pendentes claros, diálogos suaves.

As skins personalizadas acrescentam nomes: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` é o auxiliar de identidade para definições const tipadas. Ambos são exportados a partir de `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

As variantes estruturais que um token não consegue exprimir (marcação dos componentes, vinculações de props do Vuetify). A forma decide que conjuntos de regras da skin se aplicam; os tokens pintam-nos.

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

Todas as skins são resolvidas sobre a forma clássica. A forma resolvida é exposta como `shape: ComputedRef<ResolvedShape>` em [`TiptapifyConfig`](#tiptapifyconfig), para que os componentes personalizados da barra de ferramentas a possam acompanhar.

## TiptapifySkinColors {#tiptapifyskincolors}

O catálogo de tokens de cor das skins: barra de ferramentas, grupos, botões, menus flutuantes, menus pendentes, diálogos, moldura, imagens e a alça de redimensionamento. Cada chave em camelCase corresponde a uma variável CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). A tabela completa encontra-se no [guia de skins](/pt/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

O catálogo de tokens de métricas das skins: espaçamentos, tamanhos e raios das mesmas áreas, com o mesmo mapeamento chave → `--tf-*`. A tabela completa encontra-se no [guia de skins](/pt/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

O tipo completo da prop `skin`: o nome de uma skin registada (string) ou um objeto de skin em linha.

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

Um objeto em linha é resolvido pela mesma cadeia que uma skin registada (clássica → `extends` → própria), nunca entra no registo global e é renderizado sob a classe `tiptapify-skin-inline`, a menos que tenha um `name`. Os seus tokens são emitidos como variáveis CSS `--tf-*` na raiz do editor.

## TiptapifyContentStyles {#tiptapifycontentstyles}

O tipo da propriedade `contentStyles` (consulte [Estilos de conteúdo](/pt/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

O tipo da prop `upload`: o endpoint dos [carregamentos](/pt/guide/uploads).

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

O tipo da prop `linkPreview` e dos dados que o seu endpoint devolve (consulte [Cartões de link](/pt/guide/link-cards)).

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

Configuração da interface ao nível do editor, partilhada com todos os componentes dentro de `<Tiptapify>` através do `provide`/`inject` do Vue. Leia-a nos seus próprios componentes da barra de ferramentas com [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Os valores são reativos: alterar a prop `variantBtn` / `variantField` / `skin` em `<Tiptapify>` atualiza todos os componentes da barra de ferramentas sem voltar a renderizar as props.

## useTiptapifyConfig {#usetiptapifyconfig}

Devolve a configuração partilhada da instância de `<Tiptapify>` à qual o componente chamador pertence. Destina-se a componentes personalizados da barra de ferramentas (consulte [Barra de ferramentas personalizada](/pt/examples/custom-toolbar#custom-toolbar-components)).

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

Fora de uma instância de `<Tiptapify>`, o composable recorre aos valores predefinidos do pacote: `variantBtn` `flat`, `variantField` `solo` e a skin `default` (forma clássica, sem tokens emitidos).

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

Define os valores válidos da prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Formato de array** — lista simples de nomes de itens:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Formato de objeto** — secções com nome:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emitido através do evento `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emitido através do evento `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opções passadas ao instalar o plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Reexportações {#re-exports}

Os seguintes utilitários são reexportados a partir de `@tiptap/core` por conveniência ao criar extensões personalizadas:

| Exportação        | Tipo     | Origem          |
|-------------------|----------|-----------------|
| `Node`            | Classe   | `@tiptap/core`  |
| `Mark`            | Classe   | `@tiptap/core`  |
| `mergeAttributes` | Função   | `@tiptap/core`  |
| `markInputRule`   | Função   | `@tiptap/core`  |
| `markPasteRule`   | Função   | `@tiptap/core`  |
| `CommandProps`    | Tipo     | `@tiptap/core`  |
| `InputRuleMatch`  | Tipo     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tipo     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Os Material Design Icons de `@mdi/js` são reexportados para a personalização dos ícones da barra de ferramentas.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable para ler a configuração da interface ao nível do editor (`variantBtn`, `variantField`) a partir de componentes personalizados da barra de ferramentas. Consulte [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

A classe Editor subjacente de `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Os componentes do editor e do diálogo estão disponíveis como exportações nomeadas para utilização direta.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
