# AI 拡張機能 {#ai-extension}

AI 拡張機能は、プロンプトダイアログを開くツールバーボタンを追加します。リクエストは任意のプロバイダーに送信され、ストリーミングされた結果が表示され、モードごとのアクションボタン（**挿入** / **置換** / **末尾に追加**）でエディターに挿入されます。

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

`ai` prop には、`true`（デフォルト値のオプション）またはオプションオブジェクト（`TiptapifyAiOptions`）を指定できます。ツールバーの `ai` 項目は常に登録されますが、`aiProvider` が設定されていない限りボタンは**無効**になります。

動作するデモは [AI の例](/ja/examples/ai)、オプションの完全なリファレンスは [Props](/ja/api/props#ai) をご覧ください。

## アーキテクチャ {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` は `ai` prop を正規化します。`ai: true` は空のオプションオブジェクトになり、`promptExamples` はローカライズ済みのデフォルトにフォールバックし、その結果は `inject('tiptapifyAi')`（`TiptapifyAiResolvedOptions` または `false`）で子孫コンポーネントに公開されます。
- ツールバー項目（`src/components/Toolbar/ai.ts`）は `Button.vue` を描画します。ボタンは `aiProvider` が利用可能かを確認し、`Dialog.vue` を開きます。
- `Dialog.vue` がリクエストのライフサイクル全体（リクエストの構築、プロバイダーの呼び出し、ストリーミング、結果の挿入）を担います。

## プロバイダーの仕様 {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

プロバイダーは、自分で実装するシンプルな非同期関数です。tiptapify 自身はどの API も呼び出しません。OpenAI 互換の `request` オブジェクトを扱えるものなら何でも使えます（fetch、SDK、バックエンドのアダプターなど）。例外は `aiEndpoint` のバックエンドモード（[バックエンド生成](#backend-generation-aiendpoint)を参照）で、この場合は tiptapify がエンドポイントにリクエストを送信します。

**リクエスト**（`TiptapifyAiRequest`）は `chatCompletionOptions` を展開し、プラグインが次の内容を追加して作られます。

| フィールド | 取得元 |
| --- | --- |
| `messages` | 指定されていれば `createMessages(context)`。なければデフォルトの 2 つのメッセージ: システムメッセージ（`systemPrompt` または組み込みのデフォルト）と、プロンプト、選択されたエディターのテキストとその前後のテキスト、および選択部分だけに答えるというルール（何も選択されていなければテキスト全体）を含めたユーザーメッセージ |
| `model` | 設定されている場合は `model` オプション |
| `temperature` | 設定されている場合は `temperature` オプション |
| `stream` | `stream` オプション、または `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | 思考のトグル / 推論レベルのドロップダウン（後述） |

**コンテキスト**（`TiptapifyAiEditorContext`）は、エディターの完全な状態をプロバイダーに渡します。`prompt`、`selectedText`、`textBefore` / `textAfter`（選択範囲を含む段落のうち、その前後のテキスト。それぞれ最大 500 文字）、`text`、`html`、`json`、`mode`（`insert` / `replace` / `append`）です。

単語の途中から始まる、または終わる選択範囲は、その単語全体に広げられます。また、デフォルトのメッセージは、選択範囲の前後のテキストと、選択部分だけに答えるというルールを送ります。断片しか渡されないと、モデルはそれをテキスト全体と見なして続きを補ってしまい、置換結果が選択範囲の後ろの内容を繰り返してしまうためです。

**レスポンス**: プロバイダーは、コンテンツをプレーンな `string`、`{ content }`（`TiptapifyAiResponse`）、または OpenAI 互換の `choices` ペイロード（`TiptapifyAiOpenAiResponse`）として返せます。ダイアログはこの順にコンテンツを取り出し、先頭の空白を削除します。拒否された場合は、エラーメッセージがダイアログに表示され（エラーが `Error` インスタンスでない場合は `ai.error`）、ダイアログは開いたままになります。

## バックエンド生成（`aiEndpoint`） {#backend-generation-aiendpoint}

`aiProvider` を実装する代わりに、AI 機能をバックエンドの LLM エンドポイントに向けられます。

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

この場合、tiptapify がリクエストを組み立てて、エンドポイントに直接 POST します。両方が設定されている場合は、明示的な `aiProvider` が常に優先されます。

**リクエスト** — 最小限の JSON ペイロード（`TiptapifyAiBackendRequest`）です。

| フィールド | 送信される条件 |
| --- | --- |
| `prompt` | 常に — ダイアログに入力されたリクエスト |
| `instruction` | 常に — `systemPrompt`、カスタム `createMessages` のシステムメッセージ、または組み込みのデフォルト |
| `stream` | `stream: true` の場合のみ |
| `thinking` | ダイアログの**思考**トグルがオンの場合のみ |
| `reasoning_effort` | ユーザーがレベルを選んだ場合のみ（`default` 以外） |
| `model` | `model` オプションが設定されている場合のみ |

**レスポンス** — 寛容に受け付けます。プレーンな文字列、`{ content }` オブジェクト、または OpenAI 互換の `choices` ペイロードです。

**ストリーミング** — リクエストが `stream: true` の場合、レスポンスボディを SSE ストリーム（`data:` 行で、`data: [DONE]` で終了）として読み取ります。受け付けるチャンク形式は次のとおりです。

- OpenAI 形式 — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- シンプル形式 — `data: {"type":"content"|"reasoning","data":"…"}`
- フラット形式 — `data: {"content":"…","reasoning_content":"…"}`
- プレーンテキスト — `data: some text`（JSON ではない `data` 行はコンテンツのチャンクとして扱われます）

`content` チャンクは `onChunk` を通じて結果フィールドを更新し、`reasoning_content` チャンクは `onReasoning` を通じて**思考**パネルに送られます。バックエンドが `stream` を無視してプレーンなボディで応答した場合は、そのボディが使われます。**停止**をクリックするかダイアログを閉じるとリクエストが中断され、ストリーミング済みの内容は結果フィールドに残ります。

**ヘッダー** — `aiHeaders`（`Record<string, string>`）が `Content-Type: application/json` の上にマージされます。`aiHeaders` に `Authorization` ヘッダーがあればそのまま使われ、なければ `tokenProvider` のトークンが `Authorization: Bearer <token>` として送信されます。

**エラー** — OK ではないレスポンスの場合、バックエンドのエラーメッセージ（JSON の `{ error }` / `{ message }`、または生のボディ）がダイアログに表示されます。

## ストリーミング {#streaming}

`stream: true`（または `chatCompletionOptions.stream` が `true`）の場合、ダイアログは 3 番目の引数として `TiptapifyAiStream` オブジェクトを渡します。

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — `fetch`（または SDK の呼び出し）に渡します。ユーザーが**停止**をクリックするかダイアログを閉じると中断されるため、実行中のリクエストが残り続けることはありません。
- **`onChunk`** — 各コンテンツのチャンクを結果フィールドに追加します。生成中は結果フィールドが読み取り専用になり、ストリーミング済みの内容は保持されます（停止してから、挿入または破棄できます）。
- **`onReasoning`** — モデルの推論/思考の出力（Qwen/DeepSeek/o シリーズの `reasoning_content` デルタなど）を、結果の上にある折りたたみ可能な**思考**パネルに転送します。パネルはストリーミング中に自動で展開され、自動スクロールします。推論の出力は表示専用で、エディターに挿入されることはありません。

ストリーミングに対応しないプロバイダーは `stream` 引数を無視します。この引数は省略可能です。

## 思考と推論レベル {#thinking-and-reasoning-effort}

ダイアログにある 2 つのユーザー操作が、リクエストのフィールドに対応します。どちらもオプションで有効化するもので、プラグインが管理します。`chatCompletionOptions` でこれらのフィールドを自分で設定することはありません（設定すべきでもありません）。

- **`thinking: true`** は**思考**トグルを表示します（デフォルトでオン、ダイアログを開くたびにリセットされます）。プラグインはトグルの値を `enable_thinking: true | false` としてリクエストに書き込みます。
- **`thinking` がない、または `thinking: false`** の場合はトグルが非表示になり、プラグインは `enable_thinking: false` を送るため、デフォルトで思考するモデルも思考しません。
- **`reasoningEffort: { options, default? }`** は**推論レベル**のドロップダウンを表示します。`options` には、提供したいカスタムの推論レベル（`'low' | 'medium' | 'high' | 'xhigh' | 'max'`）を並べます。拡張機能は `default` 項目（思考モードの基準値）を常に自動で追加するため、設定に `default` を含める必要はありません。`default` フィールドは、ダイアログを開いたときにカスタムレベルのいずれかを事前選択します。省略した場合は `default` が事前選択されます。値は開くたびにリセットされます。ドロップダウンが描画されるのは、`options` が空でないリストで、`thinking` が有効で、思考トグルがオンの場合だけです。
- **`showReasoning`**（デフォルトは `false`）は、モデルの推論過程（`reasoning_content` デルタ）をストリーミング表示する折りたたみ可能な**思考**パネルを制御します。思考をオンのままこのパネルを表示するには `showReasoning: true` を設定します。モデルは同じように推論し、結果も同じように適用され、段階的な推論過程が追加で表示されるだけです。

プロバイダー（特に vLLM/LM Studio）は 1 つのリクエストに `enable_thinking` と `reasoning_effort` の両方が含まれていると拒否するため、プラグインは次のとおり、どちらか一方だけを送信します。

| 状態 | リクエストのフィールド |
| --- | --- |
| 思考オン、レベル = `default`（またはレベル未設定） | `enable_thinking`（トグルの値） |
| 思考オン、レベル = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort`（ドロップダウンの値）。トグルは無効になる |
| 思考オフ（トグルがオフ、または設定で `thinking` が有効でない） | `enable_thinking: false`。`reasoning_effort` は送信されない |

## エラー {#errors}

リクエストが失敗した場合、ダイアログは生のエラーをそのまま表示せず、原因を説明したうえで、サービス自身のメッセージを続けて表示します。

| 状況 | 説明 |
| --- | --- |
| ブラウザーが応答を受け取れない（`Failed to fetch`、`NetworkError…`、`Load failed`） | サービスが停止している、到達できない、または CORS が応答をブロックした。どれかはブラウザーのコンソールで確認できる |
| `401` / `403` | API キーまたはアクセス権を確認する |
| `404` | エンドポイントのパスを確認する |
| `408` / `504` / タイムアウト | サービスが時間内に応答しなかった |
| `429` | リクエストが多すぎる |
| `5xx` | サービスを利用できない（モデルの読み込み中、混雑など） |

`aiEndpoint` を使う場合、ステータスはレスポンスから取得されます。カスタムの `aiProvider` でも、`status` を持つエラーをスローすれば、同じ説明が表示されます。

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

それ以外のエラーは、そのエラー自身のメッセージで表示されます。

## 結果の挿入 {#inserting-the-result}

アクションボタン（モードに応じて**挿入**、**置換**、**末尾に追加**）を押すと、ダイアログは `result` をエディターに配置します。

- **モード** — ダイアログのアクションボタンは分割ボタンです。メイン部分は、事前選択されたモード（**挿入** / **置換** / **末尾に追加**）で結果を適用します。事前選択は `mode` オプションで指定でき、指定がなければ、ダイアログを開いたときにテキストが選択されていた場合は**置換**、そうでなければ**挿入**になります。ボタン右側の小さな「その他」（⋮）部分を押すと残りのモードのメニューが開き、選ぶとそのモードで即座に結果が適用されます。**挿入**はカーソル位置に結果を置き、**置換**は選択されたテキスト（**生成**をクリックした時点で記録されたもの）を置き換え、**末尾に追加**はドキュメントの末尾に追加します。
- **文字数制限** — エディターに `limit` が設定されている場合（`CharacterCount` 拡張機能は、貼り付け以外でドキュメントが制限を超えて長くなるトランザクションをすべて拒否します）、結果フィールドの下に `generated / limit` の文字数カウンターが表示されます（ストリーミング中はリアルタイムで更新され、制限を超えそうな場合は淡い赤になります）。また、結果が制限を超える場合は、生成の直後にダイアログが `ai.limit_exceeded` の警告を表示します。その場合、**挿入**ボタンとその別モードのメニューは無効になります。結果は全部適用するか全く適用しないかのどちらかなので、適用する前に短くする必要があります。