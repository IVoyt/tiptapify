# Props {#props}

## Props de `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Type :** `String | Object`
- **Défaut :** `''`

Contenu initial de l'éditeur. Accepte une chaîne HTML ou un objet JSON Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` n'est que le contenu **initial** ; pour une liaison bidirectionnelle, utilisez `v-model` (voir `modelValue`).

### `modelValue` {#modelvalue}

- **Type :** `String | Object`
- **Défaut :** `''`

Valeur de liaison bidirectionnelle pour `v-model`. Utilisez `v-model` pour garder une valeur réactive synchronisée avec l'éditeur. À chaque modification, le composant émet `update:modelValue` avec le dernier HTML, que `v-model` réécrit dans votre ref. Lorsque seul `v-model` est utilisé (sans `:content`), la valeur liée sert de contenu initial de l'éditeur.

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

- **Type :** `String`
- **Défaut :** `''`

Texte indicatif affiché lorsque l'éditeur est vide.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Type :** `Number`
- **Défaut :** `null`

Hauteur minimale de la zone de contenu de l'éditeur, en pixels.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Type :** `Boolean`
- **Défaut :** `true`

Affiche ou masque la barre d'outils.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Type :** `Array<String> | Object`
- **Défaut :** `[]`

Éléments de la barre d'outils à afficher. Transmettez un tableau de noms d'éléments ou un objet avec des sections nommées. Voir [Éléments de la barre d'outils](/fr/api/toolbar-items).
Dans un tableau, `'|'` répartit les éléments en groupes (dans cet ordre, quelles que soient les sections d'où viennent les boutons) et `'~'` repousse les éléments qui le suivent à la fin de la barre d'outils. Avec des groupes, un nom qui n'est pas un élément intégré réserve une place au bouton personnalisé de ce nom provenant de `customExtensions` ; sans un tel bouton, la place est supprimée.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Type :** `Boolean`
- **Défaut :** `false`

Lorsque la valeur est `true`, la prop `items` indique les éléments à **exclure** plutôt qu'à inclure.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Type :** `Boolean`
- **Défaut :** `true`

Affiche le menu flottant lorsque du texte est sélectionné : une rangée de boutons d'icônes en groupes — gras, italique, souligné, barré | exposant, indice | surbrillance, code en ligne | lien | effacer le formatage. Chaque bouton a une infobulle indiquant son raccourci et s'affiche actif lorsque sa marque est présente dans la sélection. Il se masque pour un bloc sélectionné (image, widget), dans du code, et lorsque tout le document est sélectionné.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Type :** `Boolean`
- **Défaut :** `true`

Affiche le menu flottant sur les lignes vides : titre 1, titre 2 et liste à puces, dans la même rangée de boutons d'icônes que le menu de sélection.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Type :** `Boolean`
- **Défaut :** `true`

Active le menu des commandes slash (tapez `/` pour le déclencher).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Type :** `Boolean`
- **Défaut :** `true`

Affiche le nombre de mots dans le pied de l'éditeur.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Type :** `Boolean`
- **Défaut :** `true`

Affiche le nombre de caractères dans le pied de l'éditeur.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Type :** `Number | null`
- **Défaut :** `null`

Nombre maximal de caractères autorisés par l'extension Tiptap `CharacterCount`. Définissez `null` ou omettez la prop pour une édition illimitée. Lorsqu'elle est définie à une valeur supérieure à `0`, le pied affiche un indicateur de progression circulaire SVG avec des seuils colorés.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Type :** `String`
- **Défaut :** `'purple'`

Couleur par défaut de l'indicateur de progression circulaire affiché dans le pied lorsque `limit` est défini.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Type :** `String`
- **Défaut :** `'orange'`

Couleur de l'indicateur de progression lorsque l'utilisation dépasse 75 % de la limite.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Type :** `String`
- **Défaut :** `'red'`

Couleur de l'indicateur de progression lorsque la limite de caractères est atteinte.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Type :** `TiptapifyFooterAlignment`
- **Défaut :** `'end'`

Alignement des éléments d'état du pied. Accepte `'start'`, `'center'` ou `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Type :** `Boolean | TiptapifyAiOptions`
- **Défaut :** `false`

Active l'élément `ai` de la barre d'outils. L'éditeur construit une requête `/v1/chat/completions` compatible OpenAI et la transmet à `aiProvider`. Utilisez le callback du fournisseur pour appeler votre backend, votre BFF, un point de terminaison protégé par OAuth, LM Studio ou un wrapper de SDK.

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

Exemple avec un LLM local, LM Studio :

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

Le streaming de la sortie est pris en charge en définissant `stream: true` et en poussant les jetons via l'argument `stream` de `aiProvider`. Le champ de résultat de la boîte de dialogue IA se met à jour en direct à mesure que les blocs arrivent, et un bouton **Arrêter** annule la requête en cours :

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

Transmettez `stream.signal` à `fetch` (ou à l'appel de votre SDK) afin que la requête soit annulée lorsque l'utilisateur clique sur **Arrêter** ou ferme la boîte de dialogue. Le contenu déjà reçu reste dans le champ de résultat et peut être appliqué ou abandonné. Les fournisseurs qui ne gèrent pas le streaming peuvent ignorer entièrement l'argument `stream` — il est facultatif et rétrocompatible.

Les modèles de raisonnement (Qwen thinking, DeepSeek, série o) diffusent leurs « pensées » dans un delta `reasoning_content` distinct. Transmettez ces blocs via `stream.onReasoning()` — avec `showReasoning: true`, la boîte de dialogue les affiche dans un panneau **Réflexion** repliable au-dessus du champ de résultat (le panneau est masqué par défaut). La sortie de raisonnement est uniquement affichée et n'est jamais insérée dans l'éditeur.

Pour permettre à l'utilisateur de basculer le mode de réflexion du modèle à chaque requête, définissez `thinking: true` dans les options IA. La boîte de dialogue affiche alors un commutateur **Réflexion** (activé par défaut, réinitialisé à chaque ouverture) ; le plugin écrit la valeur du commutateur dans la requête sous la forme `enable_thinking: true | false`, vous n'avez donc plus besoin (et ne devez pas) de définir vous-même `enable_thinking` dans `chatCompletionOptions` :

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

Lorsque `thinking` vaut `false` ou est omis, le commutateur n'est pas affiché et le plugin envoie `enable_thinking: false`, de sorte que les modèles qui réfléchissent par défaut (Qwen3, DeepSeek, …) ne réfléchissent pas.

Pour permettre à l'utilisateur de choisir le niveau de raisonnement à chaque requête, définissez `reasoningEffort` dans les options IA. La boîte de dialogue affiche alors une liste déroulante **Niveau de réflexion** remplie à partir de `options` — des niveaux d'effort personnalisés (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
L'extension ajoute toujours elle-même un élément `default` à la liste (la référence du mode réflexion), vous ne listez donc jamais `default` dans votre configuration ; le champ `default` de l'option présélectionne l'un de vos niveaux personnalisés à l'ouverture de la boîte de dialogue (sinon `default` est présélectionné), et la valeur est réinitialisée à chaque ouverture.
La valeur sélectionnée détermine ce que le plugin écrit dans la requête : `default` conserve le mode réflexion — le commutateur **Réflexion** reste actif et contrôle `enable_thinking` ; toute autre valeur est envoyée à la place sous la forme `reasoning_effort`, et le commutateur Réflexion est désactivé tant que cette valeur est sélectionnée (les fournisseurs rejettent `enable_thinking` et `reasoning_effort` dans une même requête).
La liste déroulante n'est affichée que lorsque `thinking` est activé et que le commutateur Réflexion est activé — désactiver la réflexion la masque et `reasoning_effort` n'est pas envoyé (la requête revient à `enable_thinking: false`). Lorsque `options` est absent ou vide, la liste déroulante n'est pas affichée du tout :

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

Le panneau **Réflexion** est masqué par défaut (`showReasoning` vaut `false` par défaut). Définissez `showReasoning: true` pour afficher un panneau repliable qui diffuse en flux le processus de raisonnement du modèle (le delta `reasoning_content`) tout en gardant la réflexion activée — le modèle raisonne toujours et le résultat est appliqué de la même façon, seul le raisonnement étape par étape est affiché en plus :

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

Des exemples de demandes personnalisés remplacent les valeurs par défaut localisées :

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

`tokenProvider` et `storage` sont des hooks facultatifs, gérés par le consommateur, pour les intégrations directes dans le navigateur. Les clés d'API ou jetons de fournisseur placés dans le code ou le stockage du navigateur sont visibles par les utilisateurs et ne doivent pas être considérés comme des secrets. Préférez le modèle d'adaptateur backend ci-dessus pour les secrets en production.

Utilisez `mode: 'insert' | 'replace' | 'append'` pour présélectionner le mode d'insertion du bouton d'action de la boîte de dialogue (**Insérer** / **Remplacer la sélection** / **Ajouter à la fin**). Sans `mode`, le bouton utilise par défaut **Remplacer la sélection** lorsque du texte est sélectionné à l'ouverture de la boîte de dialogue, et **Insérer** sinon. Le bouton d'action est un bouton scindé : la partie principale applique le résultat dans le mode présélectionné, et une petite section « plus » (⋮) à sa droite ouvre un menu listant les autres modes — un clic sur l'un d'eux applique immédiatement le résultat dans ce mode.

Lorsque l'éditeur a une `limit` (limite de caractères), un compteur de caractères `generated / limit` s'affiche sous le champ de résultat dès qu'un résultat est généré (il se met à jour en direct pendant le streaming et passe au rouge doux lorsque la limite serait dépassée).
La boîte de dialogue affiche aussi l'avertissement `ai.limit_exceeded` juste après la génération si la sortie de l'IA dépassait la limite.
Dans cet état, le bouton **Insérer** et son menu de modes alternatifs sont désactivés — l'extension `CharacterCount` rejette toute insertion qui ferait dépasser la limite au document, le résultat est donc appliqué en bloc : il est inséré entièrement s'il tient, ou pas du tout s'il dépasse la limite.
Raccourcissez le résultat pour réactiver l'action :

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

Utilisez `systemPrompt`, `temperature`, `chatCompletionOptions` ou `createMessages(context)` pour personnaliser la requête de chat-completions compatible OpenAI. `context` contient `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }` : `textBefore` / `textAfter` sont le texte du paragraphe de la sélection qui l'entoure (jusqu'à 500 caractères de chaque côté, vide sans sélection) — envoyez-les avec la sélection, faute de quoi un modèle prend le fragment pour le texte entier et le complète.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Type :** `String`
- **Défaut :** `undefined`

Alternative à un `aiProvider` personnalisé : pointez la fonctionnalité IA vers un point de terminaison LLM de votre backend, et tiptapify construit et envoie lui-même la requête. Le backend reçoit une charge utile JSON minimale :

- **Toujours :** `prompt` (la demande saisie dans la boîte de dialogue) et `instruction` (votre `systemPrompt`, le message système d'un `createMessages` personnalisé, ou la valeur par défaut intégrée).
- **Facultatifs, envoyés uniquement lorsqu'ils sont définis :** `stream` (`true` uniquement), `thinking` (le commutateur **Réflexion** de la boîte de dialogue, `true` uniquement), `reasoning_effort` (le niveau d'effort sélectionné) et `model`.

La réponse est acceptée avec souplesse : une simple chaîne, un objet `{ content }` ou une charge utile `choices` compatible OpenAI. Lorsque la requête comporte `stream: true`, le corps de la réponse est lu comme un flux SSE (lignes `data:`, terminé par `data: [DONE]`) : les deltas de style OpenAI (`choices[0].delta.content` / `.reasoning_content`), un bloc simple `{ type: 'content' | 'reasoning', data }`, un bloc plat `{ content, reasoning_content }` et des lignes `data` en texte brut sont tous acceptés. Si le backend ignore `stream` et répond avec un corps simple, ce corps est utilisé à la place. Une réponse non OK fait remonter dans la boîte de dialogue le message d'erreur du backend (JSON `{ error }` / `{ message }` ou corps brut). Un bouton **Arrêter** et la fermeture de la boîte de dialogue interrompent la requête en cours ; le contenu déjà reçu en flux est conservé dans le champ de résultat.

Si `aiProvider` et `aiEndpoint` sont tous deux définis, `aiProvider` l'emporte.

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

- **Type :** `Record<string, string>`
- **Défaut :** `undefined`

En-têtes supplémentaires envoyés avec la requête `aiEndpoint`, fusionnés par-dessus `Content-Type: application/json`. Un en-tête `Authorization` défini ici est conservé tel quel ; sinon, un jeton issu de `tokenProvider` (lorsqu'il est défini) est envoyé sous la forme `Authorization: Bearer <token>`.

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

- **Type :** `String`
- **Défaut :** `'Inter'`

Police par défaut du contenu de l'éditeur.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Type :** `String`
- **Défaut :** `'px'`

Unité de mesure des tailles de police.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Type :** `String`
- **Défaut :** `'0'`

Rayon de bordure du conteneur de l'éditeur. Accepte les valeurs de rayon de Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Type :** `variantBtnTypes`
- **Défaut :** `'tonal'`

Variante de bouton Vuetify pour les boutons de la barre d'outils. La valeur est partagée avec chaque composant de la barre d'outils via la configuration de l'éditeur — les composants personnalisés peuvent la lire avec [`useTiptapifyConfig`](/fr/api/types#usetiptapifyconfig). Voir [`variantBtnTypes`](/fr/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Type :** `variantFieldTypes`
- **Défaut :** `'outlined'`

Variante Vuetify pour les champs déroulants de la barre d'outils. La valeur est partagée avec chaque composant de la barre d'outils via la configuration de l'éditeur — les composants personnalisés peuvent la lire avec [`useTiptapifyConfig`](/fr/api/types#usetiptapifyconfig). Voir [`variantFieldTypes`](/fr/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Type :** `Array<toolbarSections>`
- **Défaut :** `[]`

Fournit des sections de barre d'outils personnalisées pour étendre ou ajouter des éléments. Les composants de chaque section peuvent lire la configuration partagée de l'éditeur avec [`useTiptapifyConfig`](/fr/api/types#usetiptapifyconfig). Voir [Barre d'outils personnalisée](/fr/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Type :** `Boolean`
- **Défaut :** `true`

Active l'application interactive des styles.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Type :** `Boolean`
- **Défaut :** `false`

Affiche une barre de progression indéterminée pendant le chargement de l'éditeur.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Type :** `String`
- **Défaut :** `'default'`

Couleur de la barre de progression du chargement. Accepte les valeurs de couleur du thème Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Type :** `String`
- **Défaut :** `'1px'`

Hauteur de la barre de progression du chargement.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Type :** `Number`
- **Défaut :** `0`

À partir de ce nombre d'images à la suite (sans rien entre elles), l'éditeur les dispose en une grille numérotée de trois colonnes, pour les sites qui affichent de telles images sous forme de carrousel. `0` le désactive.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Type :** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/fr/api/types#tiptapifyskininput))
- **Défaut :** `'default'`

L'apparence de l'interface de l'éditeur : barre d'outils, menus flottants, listes déroulantes, boîtes de dialogue, pied.

- `default` — l'apparence classique : une barre d'outils en relief, des groupes de boutons en boîtes en relief, des boutons Vuetify avec un état enfoncé en couleur primaire.
- `pastel` — l'apparence discrète : une barre d'outils plate teintée sous un filet fin, des boutons fantômes avec un état enfoncé neutre, des menus déroulants clairs, des dialogues doux.

Les fonctionnalités (légendes d'images, carrousels, liste déroulante d'alignement, styles de liste) fonctionnent de la même façon dans les deux skins.

```vue
<Tiptapify skin="pastel" />
```

Vous pouvez aussi transmettre un objet de skin en ligne : surcharges de tokens (`colors` / `metrics`) et indicateurs de forme, avec en option `extends` d'un skin enregistré. Il est résolu par-dessus `default` (ou sa base), s'affiche sous la classe `tiptapify-skin-inline` (`tiptapify-skin-{name}` lorsque l'objet porte un `name`), et ses tokens atterrissent sous forme de variables CSS `--tf-*` sur la racine de l'éditeur. Les noms personnalisés proviennent de `registerSkin('mint', { … })` — voir le [guide des thèmes](/fr/guide/skins) pour le tableau des tokens et les recettes.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Type :** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/fr/api/types#tiptapifyuploadoptions))
- **Défaut :** `null`

Le point de terminaison des [imports de fichiers](/fr/guide/uploads) : les fichiers choisis dans les boîtes de dialogue d'image et de vidéo (ainsi qu'une miniature de vidéo, l'image d'une carte de lien) lui sont envoyés avec `POST {endpoint}` (`file` et `kind` en multipart), et le document conserve l'URL qu'il renvoie (`{ "url": … }`).

Sans cette prop, la boîte de dialogue d'image accepte quand même un fichier : une image choisie (et une miniature de vidéo) est intégrée au document sous forme d'URL de données base64, et les images base64 sont conservées au chargement du document. La boîte de dialogue de vidéo ne propose **Importer** qu'avec cette prop. Lorsque `upload` est défini, les images base64 sont supprimées au chargement du document.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Type :** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/fr/api/types#tiptapifycontentstyles))
- **Par défaut :** `'inline'`

Comment le HTML enregistré porte l'apparence des cartes de lien, des images avec légende, des vidéos, des intégrations et des listes de tâches (voir [Styles de contenu](/fr/guide/content-styles)) : `inline` l'écrit dans leurs attributs `style`, de sorte qu'un site affiche le HTML tel quel ; `classes` ne garde que des classes, pour un site qui charge `tiptapify/content.css`. L'éditeur ignore ces styles au chargement du HTML, donc les deux types de HTML se rechargent de la même façon.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Type :** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/fr/api/types#tiptapifylinkpreviewoptions))
- **Défaut :** `null`

Le point de terminaison backend des [cartes de lien](/fr/guide/link-cards) : il lit les données OpenGraph des pages, ce qu'un navigateur ne peut pas faire (CORS). L'éditeur le vérifie par une prise de contact au démarrage (`GET {endpoint}` doit répondre `200 { "tiptapifyLinkPreview": 1 }`) ; tant qu'il ne répond pas, rien ne propose de carte.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Événements {#events}

### `editor-ready` {#editor-ready}

Émis lorsque l'instance de l'éditeur est prête.

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

Émis lorsque le contenu de l'éditeur change.

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

Prend en charge la liaison `v-model`.

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

L'instance de l'éditeur et la fonction `t` sont disponibles via provide/inject de Vue :

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
