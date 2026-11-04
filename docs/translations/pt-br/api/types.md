# Tipos {#types}

## TiptapifyEditor {#tiptapifyeditor}

Classe Editor do Tiptap estendida com propriedades adicionais.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Define os valores válidos da prop `variantBtn` em `<Tiptapify>`. O valor é aplicado a todos os botões da barra de ferramentas pela configuração compartilhada do editor (veja [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Define os valores válidos da prop `variantField` em `<Tiptapify>`. O valor é aplicado aos campos suspensos da barra de ferramentas pela configuração compartilhada do editor (veja [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Define os valores válidos da prop `footerAlignment` no componente `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Define os nomes nativos da prop `skin` no componente `<Tiptapify>`: a aparência do chrome do editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — o visual clássico: uma barra de ferramentas elevada, grupos de botões como caixas elevadas, botões do Vuetify com estado pressionado na cor primária.
- `pastel` — o visual discreto: uma barra de ferramentas plana e tingida, botões fantasma, menus suspensos claros, diálogos suaves.

Skins personalizadas adicionam nomes: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` é o helper de identidade para definições const tipadas. Ambos são exportados de `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

As variantes estruturais que um token não consegue expressar (marcação de componentes, bindings de props do Vuetify). A forma decide quais conjuntos de regras da skin se aplicam; os tokens os pintam.

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

Toda skin é resolvida sobre a forma clássica. A forma resolvida é exposta como `shape: ComputedRef<ResolvedShape>` em [`TiptapifyConfig`](#tiptapifyconfig), para que componentes personalizados da barra de ferramentas possam segui-la.

## TiptapifySkinColors {#tiptapifyskincolors}

O catálogo de tokens de cor da skin: barra de ferramentas, grupos, botões, bubble menus, menus suspensos, diálogos, moldura, imagens e a alça de redimensionamento. Cada chave em camelCase corresponde a uma variável CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). A tabela completa está no [guia de Skins](/pt-br/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

O catálogo de tokens de métrica da skin: espaçamentos, tamanhos e raios para as mesmas áreas, com o mesmo mapeamento chave → `--tf-*`. A tabela completa está no [guia de Skins](/pt-br/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

O tipo completo da prop `skin`: o nome de uma skin registrada (string) ou um objeto de skin inline.

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

Um objeto inline é resolvido pela mesma cadeia de uma skin registrada (clássica → `extends` → própria), nunca entra no registro global e é renderizado sob a classe `tiptapify-skin-inline`, a menos que traga um `name`. Seus tokens são emitidos como variáveis CSS `--tf-*` na raiz do editor.

## TiptapifyContentStyles {#tiptapifycontentstyles}

O tipo da prop `contentStyles` (veja [Estilos de conteúdo](/pt-br/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

O tipo da prop `upload`: o endpoint de [uploads](/pt-br/guide/uploads).

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

O tipo da prop `linkPreview` e dos dados que o seu endpoint responde (veja [Link cards](/pt-br/guide/link-cards)).

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

Configuração de UI em nível de editor, compartilhada com todos os componentes dentro de `<Tiptapify>` via `provide`/`inject` do Vue. Leia-a nos seus próprios componentes da barra de ferramentas com [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Os valores são reativos: alterar a prop `variantBtn` / `variantField` / `skin` em `<Tiptapify>` atualiza todos os componentes da barra de ferramentas sem precisar renderizar as props novamente.

## useTiptapifyConfig {#usetiptapifyconfig}

Retorna a configuração compartilhada da instância de `<Tiptapify>` à qual o componente chamador pertence. Destinado a componentes personalizados da barra de ferramentas (veja [Barra de ferramentas personalizada](/pt-br/examples/custom-toolbar#custom-toolbar-components)).

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

Fora de uma instância de `<Tiptapify>`, o composable recorre aos padrões do pacote: `variantBtn` `flat`, `variantField` `solo` e a skin `default` (forma clássica, sem tokens emitidos).

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

**Formato de objeto** — seções nomeadas:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emitido pelo evento `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emitido pelo evento `content-changed`.

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

Os utilitários a seguir são reexportados de `@tiptap/core` por conveniência ao criar extensões personalizadas:

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

Composable para ler a configuração de UI em nível de editor (`variantBtn`, `variantField`) a partir de componentes personalizados da barra de ferramentas. Veja [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

A classe Editor subjacente de `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Os componentes do editor e do diálogo estão disponíveis como exportações nomeadas para uso direto.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
