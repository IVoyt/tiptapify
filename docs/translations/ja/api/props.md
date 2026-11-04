# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **型:** `String | Object`
- **デフォルト:** `''`

エディターの初期コンテンツです。HTML 文字列または Tiptap の JSON オブジェクトを受け付けます。

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` は**初期**コンテンツのみを指定します。双方向バインディングには `v-model` を使います（`modelValue` を参照）。

### `modelValue` {#modelvalue}

- **型:** `String | Object`
- **デフォルト:** `''`

`v-model` による双方向バインディングの値です。`v-model` を使うと、リアクティブな値をエディターと同期し続けられます。編集のたびに、コンポーネントは最新の HTML とともに `update:modelValue` を発行し、`v-model` がそれを ref に書き戻します。`v-model` だけを使う場合（`:content` なし）は、バインドされた値がエディターの初期コンテンツになります。

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

- **型:** `String`
- **デフォルト:** `''`

エディターが空のときに表示されるプレースホルダーのテキストです。

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **型:** `Number`
- **デフォルト:** `null`

エディターのコンテンツ領域の最小の高さ（ピクセル）です。

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **型:** `Boolean`
- **デフォルト:** `true`

ツールバーの表示/非表示を切り替えます。

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **型:** `Array<String> | Object`
- **デフォルト:** `[]`

表示するツールバー項目です。項目名の配列、または名前付きセクションを持つオブジェクトを渡します。[ツールバー項目](/ja/api/toolbar-items)を参照してください。
配列内では、`'|'` が項目をグループに分割し（ボタンがどのセクションのものであっても、その順序で）、`'~'` はそれ以降の項目をツールバーの末尾に寄せます。グループを使う場合、組み込み項目ではない名前は、`customExtensions` にある同名のカスタムボタンの場所を確保します。該当するボタンがなければ、その場所は破棄されます。

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **型:** `Boolean`
- **デフォルト:** `false`

`true` の場合、`items` prop は含める項目ではなく**除外する**項目を指定します。

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **型:** `Boolean`
- **デフォルト:** `true`

テキストを選択したときにバブルメニューを表示します。グループ分けされたアイコンボタンが 1 行に並びます — 太字、斜体、下線、取り消し線 | 上付き文字、下付き文字 | ハイライト、インラインコード | リンク | 書式のクリア。各ボタンにはショートカット付きのツールチップがあり、選択範囲にそのマークが適用されているときは状態が表示されます。選択したブロック（画像、ウィジェット）、コード内、およびドキュメント全体を選択したときは非表示になります。

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **型:** `Boolean`
- **デフォルト:** `true`

空行でフローティングメニューを表示します。見出し 1、見出し 2、箇条書きリストが、バブルメニューと同じアイコンボタンの行に並びます。

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **型:** `Boolean`
- **デフォルト:** `true`

スラッシュコマンドメニューを有効にします（`/` を入力すると起動します）。

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **型:** `Boolean`
- **デフォルト:** `true`

エディターのフッターに単語数を表示します。

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **型:** `Boolean`
- **デフォルト:** `true`

エディターのフッターに文字数を表示します。

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **型:** `Number | null`
- **デフォルト:** `null`

Tiptap の `CharacterCount` 拡張機能で許可する最大文字数です。`null` を設定するか prop を省略すると、無制限に編集できます。`0` より大きい値を設定すると、フッターに、しきい値ごとに色分けされた SVG の円形プログレスインジケーターが表示されます。

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **型:** `String`
- **デフォルト:** `'purple'`

`limit` が設定されているときにフッターに表示される円形プログレスインジケーターのデフォルトの色です。

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **型:** `String`
- **デフォルト:** `'orange'`

使用量が上限の 75% を超えたときのプログレスインジケーターの色です。

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **型:** `String`
- **デフォルト:** `'red'`

文字数の上限に達したときのプログレスインジケーターの色です。

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **型:** `TiptapifyFooterAlignment`
- **デフォルト:** `'end'`

フッターのステータス項目の配置です。`'start'`、`'center'`、`'end'` を指定できます。

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **型:** `Boolean | TiptapifyAiOptions`
- **デフォルト:** `false`

`ai` ツールバー項目を有効にします。エディターは OpenAI 互換の `/v1/chat/completions` リクエストを組み立て、`aiProvider` に渡します。プロバイダーのコールバックで、バックエンド、BFF、OAuth で保護されたエンドポイント、LM Studio、SDK のラッパーなどを呼び出せます。

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

ローカル LLM（LM Studio）の例:

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

`stream: true` を設定し、`aiProvider` の `stream` 引数でトークンを送ることで、ストリーミング出力に対応できます。AI ダイアログの結果フィールドはチャンクが届くたびにリアルタイムで更新され、**停止**ボタンで実行中のリクエストをキャンセルできます。

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

`stream.signal` を `fetch`（または SDK の呼び出し）に渡すと、ユーザーが**停止**をクリックするかダイアログを閉じたときにリクエストがキャンセルされます。ストリーミング済みの内容は結果フィールドに残り、適用も破棄もできます。ストリーミングに対応しないプロバイダーは `stream` 引数を完全に無視して構いません。この引数は省略可能で、後方互換性があります。

推論モデル（Qwen の thinking、DeepSeek、o シリーズ）は、「思考」を別の `reasoning_content` デルタとしてストリーミングします。これらのチャンクを `stream.onReasoning()` で転送し、`showReasoning: true` にすると、ダイアログは結果フィールドの上にある折りたたみ可能な**思考**パネルにそれらを表示します（パネルはデフォルトでは非表示です）。推論の出力は表示専用で、エディターに挿入されることはありません。

リクエストごとにモデルの思考モードをユーザーが切り替えられるようにするには、AI オプションで `thinking: true` を設定します。ダイアログに**思考**トグルが表示され（デフォルトでオン、開くたびにリセット）、プラグインはトグルの値を `enable_thinking: true | false` としてリクエストに書き込みます。そのため、`chatCompletionOptions` で `enable_thinking` を自分で設定する必要はありません（設定すべきでもありません）。

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

`thinking` が `false` または省略されている場合、トグルは表示されず、プラグインは `enable_thinking: false` を送信するため、デフォルトで思考するモデル（Qwen3、DeepSeek など）は思考しません。

リクエストごとにユーザーが推論レベルを選べるようにするには、AI オプションで `reasoningEffort` を設定します。ダイアログには、`options`（カスタムの推論レベル `'low' | 'medium' | 'high' | 'xhigh' | 'max'`）から作られた**推論レベル**のドロップダウンが表示されます。
拡張機能はドロップダウンに `default` 項目（思考モードの基準値）を常に自動で追加するため、設定に `default` を含める必要はありません。オプションの `default` フィールドは、ダイアログを開いたときにカスタムレベルのいずれかを事前選択します（指定がなければ `default` が事前選択されます）。値は開くたびにリセットされます。
選択された値によって、プラグインがリクエストに書き込む内容が決まります。`default` では思考モードが維持され、**思考**トグルは有効なままで `enable_thinking` を制御します。それ以外の値は代わりに `reasoning_effort` として送信され、その値が選択されている間は思考トグルが無効になります（プロバイダーは 1 つのリクエストに `enable_thinking` と `reasoning_effort` の両方が含まれていると拒否するためです）。
ドロップダウンが表示されるのは、`thinking` が有効で、思考トグルがオンのときだけです。思考をオフにするとドロップダウンは非表示になり、`reasoning_effort` は送信されません（リクエストは `enable_thinking: false` にフォールバックします）。`options` がない、または空の場合、ドロップダウンはまったく描画されません。

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

**思考**パネルはデフォルトでは非表示です（`showReasoning` のデフォルトは `false`）。`showReasoning: true` を設定すると、思考をオンのまま、モデルの推論過程（`reasoning_content` デルタ）をストリーミング表示する折りたたみ可能なパネルが表示されます。モデルは同じように推論し、結果も同じように適用され、段階的な推論過程が追加で表示されるだけです。

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

カスタムのプロンプト例は、ローカライズ済みのデフォルトを置き換えます。

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

`tokenProvider` と `storage` は、ブラウザーから直接連携する場合のために、利用側が用意する任意のフックです。ブラウザーのコードやブラウザーのストレージに置かれた API キーやプロバイダーのトークンはユーザーから見えるため、秘密情報として扱ってはいけません。本番環境の秘密情報には、上記のバックエンドアダプターのパターンを使うことをおすすめします。

`mode: 'insert' | 'replace' | 'append'` を使うと、ダイアログのアクションボタンの挿入モード（**挿入** / **置換** / **末尾に追加**）を事前選択できます。`mode` を指定しない場合、ボタンは、ダイアログを開いたときにテキストが選択されていれば**置換**、そうでなければ**挿入**になります。アクションボタンは分割ボタンです。メイン部分は事前選択されたモードで結果を適用し、右側の小さな「その他」（⋮）部分を押すと他のモードを一覧するメニューが開き、選ぶとそのモードで即座に結果が適用されます。

エディターに `limit`（文字数の上限）がある場合、結果が生成された時点で、結果フィールドの下に `generated / limit` の文字数カウンターが表示されます（ストリーミング中はリアルタイムで更新され、上限を超えそうな場合は淡い赤になります）。
AI の出力が上限を超える場合は、生成の直後にダイアログが `ai.limit_exceeded` の警告も表示します。
この状態では、**挿入**ボタンとその別モードのメニューは無効になります。`CharacterCount` 拡張機能は、ドキュメントが上限を超えて長くなる挿入をすべて拒否するため、結果は全部適用するか全く適用しないかのどちらかです。収まる場合は全体が挿入され、上限を超える場合はまったく挿入されません。
結果を短くすると、アクションが再び有効になります。

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

`systemPrompt`、`temperature`、`chatCompletionOptions`、`createMessages(context)` を使って、OpenAI 互換のチャット補完リクエストをカスタマイズできます。`context` には `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }` が含まれます。`textBefore` / `textAfter` は、選択範囲を含む段落のうち、その前後のテキストです（それぞれ最大 500 文字、選択がなければ空）。選択範囲と一緒に送ってください。そうしないと、モデルは断片をテキスト全体と見なして続きを補ってしまいます。

### `ai.aiEndpoint` {#ai-aiendpoint}

- **型:** `String`
- **デフォルト:** `undefined`

カスタムの `aiProvider` の代替手段です。AI 機能をバックエンドの LLM エンドポイントに向けると、tiptapify がリクエストを組み立てて自分で送信します。バックエンドは最小限の JSON ペイロードを受け取ります。

- **常に:** `prompt`（ダイアログに入力されたリクエスト）と `instruction`（`systemPrompt`、カスタム `createMessages` のシステムメッセージ、または組み込みのデフォルト）。
- **任意（設定されている場合のみ送信）:** `stream`（`true` のときのみ）、`thinking`（ダイアログの**思考**トグル、`true` のときのみ）、`reasoning_effort`（選択された推論レベル）、`model`。

レスポンスは寛容に受け付けます。プレーンな文字列、`{ content }` オブジェクト、または OpenAI 互換の `choices` ペイロードです。リクエストが `stream: true` の場合、レスポンスボディを SSE ストリーム（`data:` 行で、`data: [DONE]` で終了）として読み取ります。OpenAI 形式のデルタ（`choices[0].delta.content` / `.reasoning_content`）、シンプルな `{ type: 'content' | 'reasoning', data }` チャンク、フラットな `{ content, reasoning_content }` チャンク、プレーンテキストの `data` 行のいずれも受け付けます。バックエンドが `stream` を無視してプレーンなボディで応答した場合は、そのボディが使われます。OK ではないレスポンスの場合、バックエンドのエラーメッセージ（JSON の `{ error }` / `{ message }`、または生のボディ）がダイアログに表示されます。**停止**ボタンを押すかダイアログを閉じると、実行中のリクエストが中断され、ストリーミング済みの内容は結果フィールドに残ります。

`aiProvider` と `aiEndpoint` の両方が設定されている場合は、`aiProvider` が優先されます。

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

- **型:** `Record<string, string>`
- **デフォルト:** `undefined`

`aiEndpoint` のリクエストと一緒に送信される追加のヘッダーで、`Content-Type: application/json` の上にマージされます。ここで設定した `Authorization` ヘッダーはそのまま使われ、なければ `tokenProvider` のトークン（設定されている場合）が `Authorization: Bearer <token>` として送信されます。

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

- **型:** `String`
- **デフォルト:** `'Inter'`

エディターのコンテンツのデフォルトのフォントファミリーです。

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **型:** `String`
- **デフォルト:** `'px'`

フォントサイズの値の単位です。

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **型:** `String`
- **デフォルト:** `'0'`

エディターコンテナーの角丸です。Vuetify の角丸の値（`sm`、`md`、`lg`、`xl`、`pill` など）を指定できます。

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **型:** `variantBtnTypes`
- **デフォルト:** `'tonal'`

ツールバーボタンの Vuetify ボタンバリアントです。値はエディターの設定を通じてすべてのツールバーコンポーネントと共有され、カスタムコンポーネントは [`useTiptapifyConfig`](/ja/api/types#usetiptapifyconfig) で読み取れます。[`variantBtnTypes`](/ja/api/types#variantbtntypes) を参照してください。

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **型:** `variantFieldTypes`
- **デフォルト:** `'outlined'`

ツールバーのドロップダウンフィールドの Vuetify バリアントです。値はエディターの設定を通じてすべてのツールバーコンポーネントと共有され、カスタムコンポーネントは [`useTiptapifyConfig`](/ja/api/types#usetiptapifyconfig) で読み取れます。[`variantFieldTypes`](/ja/api/types#variantfieldtypes) を参照してください。

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **型:** `Array<toolbarSections>`
- **デフォルト:** `[]`

ツールバー項目を拡張または追加するための、カスタムのツールバーセクションを指定します。各セクションのコンポーネントは、共有されたエディター設定を [`useTiptapifyConfig`](/ja/api/types#usetiptapifyconfig) で読み取れます。[カスタムツールバー](/ja/examples/custom-toolbar#custom-toolbar-components)を参照してください。

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **型:** `Boolean`
- **デフォルト:** `true`

インタラクティブなスタイル適用を有効にします。

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **型:** `Boolean`
- **デフォルト:** `false`

エディターの読み込み中に、不確定のプログレスバーを表示します。

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **型:** `String`
- **デフォルト:** `'default'`

読み込み用プログレスバーの色です。Vuetify のテーマカラーの値を指定できます。

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **型:** `String`
- **デフォルト:** `'1px'`

読み込み用プログレスバーの高さです。

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **型:** `Number`
- **デフォルト:** `0`

この数以上の画像が（間に何も挟まずに）連続すると、エディターはそれらを番号付きの 3 列グリッドにレイアウトします。そのような画像をスライダーとして表示するサイト向けです。`0` で無効になります。

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **型:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/ja/api/types#tiptapifyskininput))
- **デフォルト:** `'default'`

エディターの外観（ツールバー、バブルメニュー、ドロップダウン、ダイアログ、フッター）です。

- `default` — クラシックな外観: 浮き上がったツールバー、浮き上がったボックスとしてのボタングループ、押下状態にプライマリカラーを使う Vuetify ボタン。
- `pastel` — 落ち着いた外観: 極細の線の下に置かれたフラットな色付きツールバー、押下状態がニュートラルなゴーストボタン、軽やかなドロップダウン、やわらかいダイアログ。

機能（画像のキャプション、スライダー、配置のドロップダウン、リストスタイル）は、どちらのスキンでも同じように動作します。

```vue
<Tiptapify skin="pastel" />
```

インラインのスキンオブジェクトも渡せます。トークンの上書き（`colors` / `metrics`）とシェイプのフラグを指定でき、任意で登録済みのスキンを `extends` します。`default`（またはそのベース）の上に解決され、クラス `tiptapify-skin-inline`（オブジェクトに `name` がある場合は `tiptapify-skin-{name}`）の下で描画され、トークンはエディターのルートに `--tf-*` CSS 変数として設定されます。カスタム名は `registerSkin('mint', { … })` で作ります。トークン表とレシピは[スキンガイド](/ja/guide/skins)をご覧ください。

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **型:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/ja/api/types#tiptapifyuploadoptions))
- **デフォルト:** `null`

[アップロード](/ja/guide/uploads)のエンドポイントです。画像ダイアログと動画ダイアログで選択されたファイル（および動画のポスター、リンクカードの画像）は、`POST {endpoint}`（multipart の `file` と `kind`）でここに送信され、ドキュメントには応答された URL（`{ "url": … }`）が残ります。

これがなくても、画像ダイアログはファイルを受け付けます。選択した画像（および動画のポスター）は base64 データ URL としてドキュメントに埋め込まれ、ドキュメントの読み込み時にも base64 画像は保持されます。動画ダイアログに**アップロード**が表示されるのは、この prop があるときだけです。`upload` を設定すると、ドキュメントの読み込み時に base64 画像は破棄されます。

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **型:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/ja/api/types#tiptapifycontentstyles))
- **デフォルト:** `'inline'`

保存される HTML が、リンクカード、キャプション付き画像、動画、埋め込み、タスクリストの見た目をどのように持つかを指定します([コンテンツスタイル](/ja/guide/content-styles)を参照)。`inline` は見た目を要素の `style` 属性に書き込むため、サイトは HTML をそのまま表示できます。`classes` はクラスのみを残し、`tiptapify/content.css` を読み込むサイト向けです。エディターは HTML の読み込み時にこれらのスタイルを無視するため、どちらの HTML も同じように読み込まれます。

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **型:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/ja/api/types#tiptapifylinkpreviewoptions))
- **デフォルト:** `null`

[リンクカード](/ja/guide/link-cards)のバックエンドエンドポイントです。ブラウザーでは読み取れない（CORS）ページの OpenGraph データを読み取ります。エディターは起動時にハンドシェイクで確認します（`GET {endpoint}` は `200 { "tiptapifyLinkPreview": 1 }` を返す必要があります）。応答があるまでは、カードの提案は一切表示されません。

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## イベント {#events}

### `editor-ready` {#editor-ready}

エディターインスタンスの準備が完了したときに発火します。

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

エディターのコンテンツが変更されたときに発火します。

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

`v-model` バインディングに対応します。

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

エディターインスタンスと `t` 関数は、Vue の provide/inject で利用できます。

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
