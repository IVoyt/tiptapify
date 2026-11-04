# Types {#types}

## TiptapifyEditor {#tiptapifyeditor}

Classe Editor de Tiptap étendue, avec des propriétés supplémentaires.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Définit les valeurs valides de la prop `variantBtn` de `<Tiptapify>`. La valeur est appliquée à chaque bouton de la barre d'outils via la configuration partagée de l'éditeur (voir [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Définit les valeurs valides de la prop `variantField` de `<Tiptapify>`. La valeur est appliquée aux champs déroulants de la barre d'outils via la configuration partagée de l'éditeur (voir [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Définit les valeurs valides de la prop `footerAlignment` du composant `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Définit les noms intégrés de la prop `skin` du composant `<Tiptapify>` : l'apparence de l'interface de l'éditeur.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — l'apparence classique : une barre d'outils en relief, des groupes de boutons en boîtes en relief, des boutons Vuetify avec un état enfoncé en couleur primaire.
- `pastel` — l'apparence discrète : une barre d'outils plate teintée, des boutons fantômes, des menus déroulants clairs, des dialogues doux.

Les thèmes personnalisés ajoutent des noms : `registerSkin('mint', { extends: 'pastel', colors: { … } })` ; `defineSkin` est l'assistant d'identité pour les définitions const typées. Les deux sont exportés depuis `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Les variantes structurelles qu'un token ne peut pas exprimer (balisage des composants, liaisons de props Vuetify). La forme détermine quels jeux de règles du thème s'appliquent ; les tokens les peignent.

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

Chaque thème est résolu à partir de la forme classique. La forme résolue est exposée sous la forme `shape: ComputedRef<ResolvedShape>` dans [`TiptapifyConfig`](#tiptapifyconfig), afin que les composants de barre d'outils personnalisés puissent la suivre.

## TiptapifySkinColors {#tiptapifyskincolors}

Le catalogue des tokens de couleur des thèmes : barre d'outils, groupes, boutons, menus flottants, listes déroulantes, boîtes de dialogue, cadre, images et poignée de redimensionnement. Chaque clé en camelCase correspond à une variable CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Le tableau complet figure dans le [guide des thèmes](/fr/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Le catalogue des tokens de métriques des thèmes : espacements, tailles et rayons pour les mêmes zones, avec la même correspondance clé → `--tf-*`. Le tableau complet figure dans le [guide des thèmes](/fr/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Le type complet de la prop `skin` : un nom de thème enregistré (chaîne) ou un objet de thème en ligne.

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

Un objet en ligne est résolu par la même chaîne qu'un thème enregistré (classic → `extends` → propre), n'entre jamais dans le registre global et s'affiche sous la classe `tiptapify-skin-inline`, sauf s'il porte un `name`. Ses tokens sont émis sous forme de variables CSS `--tf-*` sur la racine de l'éditeur.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Le type de la prop `contentStyles` (voir [Styles de contenu](/fr/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Le type de la prop `upload` : le point de terminaison des [imports de fichiers](/fr/guide/uploads).

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

Le type de la prop `linkPreview` et des données auxquelles son point de terminaison répond (voir [Cartes de lien](/fr/guide/link-cards)).

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

Configuration de l'interface au niveau de l'éditeur, partagée avec chaque composant à l'intérieur de `<Tiptapify>` via `provide`/`inject` de Vue. Lisez-la dans vos propres composants de barre d'outils avec [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Les valeurs sont réactives : modifier la prop `variantBtn` / `variantField` / `skin` de `<Tiptapify>` met à jour chaque composant de la barre d'outils sans nouveau rendu des props.

## useTiptapifyConfig {#usetiptapifyconfig}

Renvoie la configuration partagée de l'instance `<Tiptapify>` à laquelle appartient le composant appelant. Destiné aux composants de barre d'outils personnalisés (voir [Barre d'outils personnalisée](/fr/examples/custom-toolbar#custom-toolbar-components)).

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

En dehors d'une instance `<Tiptapify>`, le composable retombe sur les valeurs par défaut du paquet : `variantBtn` `flat`, `variantField` `solo`, et le thème `default` (forme classique, aucun token émis).

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

## Types IA {#ai-types}

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

Définit les valeurs valides de la prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format tableau** — liste plate de noms d'éléments :

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format objet** — sections nommées :

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Émis via l'événement `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Émis via l'événement `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Options transmises lors de l'installation du plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Réexportations {#re-exports}

Les utilitaires suivants sont réexportés depuis `@tiptap/core` par commodité lors de la création d'extensions personnalisées :

| Export            | Nature   | Source          |
|-------------------|----------|-----------------|
| `Node`            | Classe   | `@tiptap/core`  |
| `Mark`            | Classe   | `@tiptap/core`  |
| `mergeAttributes` | Fonction | `@tiptap/core`  |
| `markInputRule`   | Fonction | `@tiptap/core`  |
| `markPasteRule`   | Fonction | `@tiptap/core`  |
| `CommandProps`    | Type     | `@tiptap/core`  |
| `InputRuleMatch`  | Type     | `@tiptap/core`  |
| `PasteRuleMatch`  | Type     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Les icônes Material Design de `@mdi/js` sont réexportées pour la personnalisation des icônes de la barre d'outils.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable pour lire la configuration de l'interface au niveau de l'éditeur (`variantBtn`, `variantField`) depuis des composants de barre d'outils personnalisés. Voir [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

La classe Editor sous-jacente de `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Les composants d'éditeur et de dialogue sont disponibles en exports nommés pour un usage direct.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
