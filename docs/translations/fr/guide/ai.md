# Extension IA {#ai-extension}

L'extension IA ajoute un bouton de barre d'outils qui ouvre une boîte de dialogue de demande, envoie la requête au fournisseur de votre choix, affiche le résultat diffusé en flux et l'insère dans l'éditeur via le bouton d'action propre au mode (**Insérer** / **Remplacer la sélection** / **Ajouter à la fin**).

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

La prop `ai` accepte `true` (options par défaut) ou un objet d'options (`TiptapifyAiOptions`). L'élément `ai` de la barre d'outils est toujours enregistré, mais le bouton est **désactivé** tant que `aiProvider` n'est pas défini.

Voir l'[exemple IA](/fr/examples/ai) pour une démo exécutable et les [Props](/fr/api/props#ai) pour la référence complète des options.

## Architecture {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalise la prop `ai` : `ai: true` devient un objet d'options vide, `promptExamples` se rabat sur les valeurs par défaut localisées, et le résultat est exposé aux descendants via `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` ou `false`).
- L'élément de la barre d'outils (`src/components/Toolbar/ai.ts`) affiche `Button.vue`. Le bouton vérifie la disponibilité de `aiProvider` et ouvre `Dialog.vue`.
- `Dialog.vue` gère tout le cycle de vie de la requête : construction de la requête, appel du fournisseur, streaming et insertion du résultat.

## Le contrat du fournisseur {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Le fournisseur est une simple fonction asynchrone que vous implémentez. tiptapify n'appelle aucune API lui-même — tout ce qui peut consommer un objet `request` compatible OpenAI fonctionne (fetch, un SDK, un adaptateur backend). L'exception est le mode backend `aiEndpoint` (voir [Génération côté backend](#backend-generation-aiendpoint)), où tiptapify envoie la requête à votre point de terminaison.

La **requête** (`TiptapifyAiRequest`) est construite à partir de vos `chatCompletionOptions`, puis enrichie par le plugin :

| Champ | Source |
| --- | --- |
| `messages` | `createMessages(context)` s'il est fourni, sinon la paire par défaut : un message système (votre `systemPrompt` ou une valeur par défaut intégrée) et un message utilisateur qui intègre la demande, le texte sélectionné dans l'éditeur avec le texte qui l'entoure, et la règle de ne répondre que pour la sélection (ou pour tout le texte lorsque rien n'est sélectionné) |
| `model` | option `model`, lorsqu'elle est définie |
| `temperature` | option `temperature`, lorsqu'elle est définie |
| `stream` | option `stream`, ou `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | le commutateur de réflexion / la liste déroulante du niveau — voir ci-dessous |

Le **contexte** (`TiptapifyAiEditorContext`) donne au fournisseur l'état complet de l'éditeur : `prompt`, `selectedText`, `textBefore` / `textAfter` (le texte du paragraphe de la sélection qui l'entoure, jusqu'à 500 caractères de chaque côté), `text`, `html`, `json` et `mode` (`insert` / `replace` / `append`).

Une sélection qui commence ou se termine au milieu d'un mot englobe le mot entier, et les messages par défaut envoient le texte autour de la sélection avec la règle de ne répondre que pour la sélection : si on ne lui donne qu'un fragment, un modèle le prend pour le texte entier et le complète, et le remplacement répéterait ce qui suit la sélection.

**Réponse** : le fournisseur peut renvoyer le contenu sous forme de simple `string`, de `{ content }` (`TiptapifyAiResponse`) ou de charge utile `choices` compatible OpenAI (`TiptapifyAiOpenAiResponse`). La boîte de dialogue extrait le contenu dans cet ordre et supprime les espaces initiaux. En cas de rejet, le message d'erreur s'affiche dans la boîte de dialogue (ou `ai.error` lorsque l'erreur n'est pas une instance de `Error`) et la boîte de dialogue reste ouverte.

## Génération côté backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Au lieu d'implémenter un `aiProvider`, pointez la fonctionnalité IA vers un point de terminaison LLM de votre backend :

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify construit alors la requête et l'envoie lui-même au point de terminaison. Un `aiProvider` explicite l'emporte toujours lorsque les deux sont définis.

**Requête** — une charge utile JSON minimale (`TiptapifyAiBackendRequest`) :

| Champ | Envoyé |
| --- | --- |
| `prompt` | toujours — la demande saisie dans la boîte de dialogue |
| `instruction` | toujours — votre `systemPrompt`, le message système d'un `createMessages` personnalisé, ou la valeur par défaut intégrée |
| `stream` | uniquement lorsque `stream: true` |
| `thinking` | uniquement lorsque le commutateur **Réflexion** de la boîte de dialogue est activé |
| `reasoning_effort` | uniquement lorsque l'utilisateur a choisi un niveau (autre que `default`) |
| `model` | uniquement lorsque l'option `model` est définie |

**Réponse** — acceptée avec souplesse : une simple chaîne, un objet `{ content }` ou une charge utile `choices` compatible OpenAI.

**Streaming** — lorsque la requête comporte `stream: true`, le corps de la réponse est lu comme un flux SSE (lignes `data:`, terminé par `data: [DONE]`). Formats de blocs acceptés :

- Style OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Simple — `data: {"type":"content"|"reasoning","data":"…"}`
- Plat — `data: {"content":"…","reasoning_content":"…"}`
- Texte brut — `data: some text` (une ligne `data` non JSON est un bloc de contenu)

Les blocs `content` mettent à jour le champ de résultat via `onChunk`, les blocs `reasoning_content` alimentent le panneau **Réflexion** via `onReasoning`. Si le backend ignore `stream` et répond avec un corps simple, ce corps est utilisé à la place. Un clic sur **Arrêter** ou la fermeture de la boîte de dialogue interrompt la requête ; le contenu déjà reçu en flux est conservé dans le champ de résultat.

**En-têtes** — `aiHeaders` (un `Record<string, string>`) est fusionné par-dessus `Content-Type: application/json`. Un en-tête `Authorization` présent dans `aiHeaders` est conservé tel quel ; sinon, un jeton issu de `tokenProvider` est envoyé sous la forme `Authorization: Bearer <token>`.

**Erreurs** — une réponse non OK fait remonter dans la boîte de dialogue le message d'erreur du backend (JSON `{ error }` / `{ message }` ou corps brut).

## Streaming {#streaming}

Lorsque `stream: true` (ou que `chatCompletionOptions.stream` vaut `true`), la boîte de dialogue transmet un objet `TiptapifyAiStream` en troisième argument :

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — transmettez-le à `fetch` (ou à l'appel de votre SDK). Il interrompt la requête lorsque l'utilisateur clique sur **Arrêter** ou ferme la boîte de dialogue, de sorte que les requêtes en cours ne continuent pas à s'exécuter.
- **`onChunk`** — ajoutez chaque bloc de contenu au champ de résultat. Pendant la génération, le champ de résultat est en lecture seule et le contenu déjà reçu est conservé (vous pouvez arrêter, puis l'insérer ou l'abandonner).
- **`onReasoning`** — transmettez la sortie de raisonnement/réflexion du modèle (par exemple le delta `reasoning_content` de Qwen/DeepSeek/série o) à un panneau **Réflexion** repliable au-dessus du résultat. Le panneau se déploie et défile automatiquement pendant le streaming. La sortie de raisonnement est uniquement affichée et n'est jamais insérée dans l'éditeur.

Les fournisseurs qui ne gèrent pas le streaming ignorent l'argument `stream` — il est facultatif.

## Réflexion et niveau de raisonnement {#thinking-and-reasoning-effort}

Deux contrôles utilisateur de la boîte de dialogue correspondent à des champs de la requête. Les deux sont activables via les options et appartiennent au plugin — vous ne devez pas (et ne devriez pas) définir ces champs vous-même dans `chatCompletionOptions`.

- **`thinking: true`** affiche le commutateur **Réflexion** (activé par défaut, réinitialisé à chaque ouverture de la boîte de dialogue). Le plugin écrit la valeur du commutateur dans la requête sous la forme `enable_thinking: true | false`.
- **`thinking` absent ou `thinking: false`** masque le commutateur et le plugin envoie `enable_thinking: false`, de sorte que les modèles qui réfléchissent par défaut ne réfléchissent pas.
- **`reasoningEffort: { options, default? }`** affiche la liste déroulante **Niveau de réflexion**. `options` énumère les niveaux d'effort personnalisés que vous souhaitez proposer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`) ; l'extension ajoute toujours elle-même un élément `default` (la référence du mode réflexion), vous ne listez donc jamais `default` dans votre configuration. Le champ `default` présélectionne l'un de vos niveaux personnalisés à l'ouverture de la boîte de dialogue — lorsqu'il est omis, `default` est présélectionné. La valeur est réinitialisée à chaque ouverture. La liste déroulante n'est affichée que si `options` est une liste non vide, que `thinking` est activé et que le commutateur Réflexion est activé.
- **`showReasoning`** (`false` par défaut) contrôle le panneau **Réflexion** repliable qui diffuse en flux le processus de raisonnement du modèle (le delta `reasoning_content`). Définissez `showReasoning: true` pour afficher ce panneau tout en gardant la réflexion activée — le modèle raisonne toujours, le résultat est appliqué de la même façon, seul le raisonnement étape par étape est affiché en plus.

Comme les fournisseurs (vLLM/LM Studio en particulier) rejettent `enable_thinking` et `reasoning_effort` dans une même requête, le plugin n'envoie qu'un seul des deux :

| État | Champ de la requête |
| --- | --- |
| Réflexion activée, niveau = `default` (ou aucun niveau configuré) | `enable_thinking` (issu du commutateur) |
| Réflexion activée, niveau = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (issu de la liste déroulante) ; le commutateur est désactivé |
| Réflexion désactivée (commutateur désactivé, ou `thinking` non activé dans la configuration) | `enable_thinking: false` ; `reasoning_effort` n'est pas envoyé |

## Erreurs {#errors}

La boîte de dialogue explique l'échec d'une requête au lieu d'afficher l'erreur brute, et ajoute après l'explication le message propre au service :

| Ce qui s'est passé | Explication |
| --- | --- |
| Le navigateur n'a reçu aucune réponse (`Failed to fetch`, `NetworkError…`, `Load failed`) | Le service est arrêté, injoignable, ou CORS a bloqué la réponse ; la console du navigateur indique laquelle de ces causes |
| `401` / `403` | Vérifiez la clé d'API ou les droits d'accès |
| `404` | Vérifiez le chemin du point de terminaison |
| `408` / `504` / un délai d'expiration | Le service n'a pas répondu à temps |
| `429` | Trop de requêtes |
| `5xx` | Le service est indisponible (chargement d'un modèle, surcharge) |

Avec `aiEndpoint`, le statut provient de la réponse. Un `aiProvider` personnalisé obtient les mêmes explications en levant une erreur dotée d'un `status` :

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Toute autre erreur est affichée avec son propre message.

## Insertion du résultat {#inserting-the-result}

Sur le bouton d'action — **Insérer**, **Remplacer la sélection** ou **Ajouter à la fin**, selon le mode — la boîte de dialogue place `result` dans l'éditeur :

- **Mode** — le bouton d'action de la boîte de dialogue est un bouton scindé. La partie principale applique le résultat dans le mode présélectionné (**Insérer** / **Remplacer la sélection** / **Ajouter à la fin**) : l'option `mode` le présélectionne, ou **Remplacer la sélection** lorsque du texte était sélectionné à l'ouverture de la boîte de dialogue et **Insérer** sinon. Une petite section « plus » (⋮) à droite du bouton ouvre un menu avec les autres modes — un clic sur l'un d'eux applique immédiatement le résultat dans ce mode. **Insérer** place le résultat au niveau du curseur, **Remplacer la sélection** remplace le texte sélectionné (capturé au clic sur **Générer**) et **Ajouter à la fin** l'ajoute à la fin du document.
- **Limite de caractères** — lorsque l'éditeur est configuré avec `limit` (l'extension `CharacterCount` rejette toute transaction autre qu'un collage qui ferait dépasser la limite au document), un compteur de caractères `generated / limit` s'affiche sous le champ de résultat (en direct pendant le streaming, en rouge doux lorsque la limite serait dépassée) et la boîte de dialogue affiche l'avertissement `ai.limit_exceeded` juste après la génération lorsque le résultat dépasserait la limite. Le bouton **Insérer** et son menu de modes alternatifs sont alors désactivés : le résultat est appliqué en bloc, vous devez donc le raccourcir avant de l'appliquer.