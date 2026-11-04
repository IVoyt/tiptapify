# メディア {#media}

## 画像 {#images}

URL から画像を挿入します。

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

画像ボタンを押すと、画像ダイアログが開きます。

- **URL で指定**または**アップロード**。[アップロードエンドポイント](/ja/guide/uploads)がない場合、選択したファイルは base64 データ URL として埋め込まれます。ある場合は、ファイルがサーバーに送られます。
- **代替テキスト**（空のときはダイアログが知らせます）と、画像の下に表示する**キャプション**。
- **サイズ**: 元のサイズ、テキスト幅、または縦横比のロック付きで幅 × 高さを指定するカスタム。
- **配置**: 単独の行で中央揃え、またはテキストの左右に回り込ませる。

選択した画像には、リサイズハンドル（リサイズ 1 回が元に戻す 1 ステップになります）と、画像の上にツールバーが表示されます。左右への回り込み、ダウンロード、編集、削除が行えます。ダブルクリックでダイアログが開きます。

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## 動画 {#videos}

YouTube や Vimeo の動画、または動画ファイルを埋め込みます。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

動画ボタンを押すと、動画ダイアログが開きます。

- **YouTube または Vimeo のリンク**はそれぞれのプレーヤーになります。ダイアログには認識したプロバイダーとプレビューが表示され、プレーヤーが対応していれば**開始位置**（`?t=` から自動入力）も指定できます。
- **動画ファイルへのリンク**（`.mp4`、`.m4v`、`.webm`、`.ogv`、`.ogg`、`.mov`）は、ポスター、コントロール、自動再生（ミュート）、ループ付きの `<video>` になります。リンクにはプロトコル（`https://`、`http://`）、`//host`、または `/path` が必要です。ダイアログが推測で補うことはありません。
- **アップロード**は動画ファイルをサーバーに送信します。[アップロードエンドポイント](/ja/guide/uploads)がある場合のみ表示されます。
- **サイズ**: レスポンシブ 16:9、または縦横比のロック付きで幅 × 高さを指定するカスタム。

テキストに貼り付けた YouTube の URL も埋め込まれます。プレーヤーをクリックすると再生ではなく選択され、ツールバーのボタンに反映されます。ダブルクリックでダイアログが開きます。

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="YouTube の URL を貼り付けて動画を埋め込みましょう..." />

## iframe {#iframes}

ページのアドレス、または共有・埋め込みメニューにある iframe コードで、ページを埋め込みます。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

iframe ダイアログは、貼り付けられたコード（アドレス、サイズ、タイトル、権限、sandbox、遅延読み込み、全画面）を読み取り、そこから何を取り込んだかを表示します。スクリプトやその他のタグを含むコードは拒否されます。プレビューが表示され、**スクリーンリーダー用のタイトル**、サイズ（コードの比率に合わせたレスポンシブ、または縦横比のロック付きのカスタム）を設定でき、**詳細設定**では名前、`allow`、`sandbox`、遅延読み込み、枠線を設定できます。アドレスには `https://` または `http://` が必要です。埋め込みをダブルクリックするとダイアログが開きます。

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="iframe として埋め込む URL を入力..." />

## 表 {#tables}

表を挿入して編集します。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

表を挿入した後は、次の操作ができます。
- 行や列の追加・削除
- セルの選択
- 表全体の削除

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="表ボタンで表を挿入できます..." />

## リンク {#links}

ハイパーリンクを挿入します。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

リンクダイアログは、入力されたとおりのアドレスを受け付けます。`https://…`、その他のスキーム（`ftp://`、`ssh://`、社内用のもの）、`mailto:`、`tel:`、`#anchor`、`/page` が使えます。プロトコルを勝手に追加することはありません。プロトコルのないアドレス（`example.com`、`internal.host:8080`）には、`https://`、`http://`、`ftp://` を追加するチップが表示され、何も追加しなければ入力したままになります。`javascript:`、`vbscript:`、`data:` のアドレスは拒否されます。

ダイアログにはリンクテキストと**新しいタブで開く**（`noopener noreferrer` が追加されます）もあり、**詳細設定**では `rel` の値をチップとして（任意の値を Enter、スペース、カンマで追加）、また CSS クラスを設定できます。

[`linkPreview`](/ja/api/props#linkpreview) prop を使うと、同じダイアログでリンクをページの画像・タイトル・説明付きのカードとして表示でき、空行に URL を貼り付けると**リンク / カード**が提案されます。詳しくは[リンクカード](/ja/guide/link-cards)をご覧ください。

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="テキストを選択してリンクをクリックすると、ハイパーリンクを追加できます..." />

## 絵文字 {#emoji}

10 のカテゴリーを備えた組み込みピッカーから絵文字を挿入します。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

絵文字ピッカーには、目的の絵文字をすばやく見つけられる検索/フィルター入力欄があります。

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="絵文字ボタンをクリックして絵文字を挿入しましょう..." />

## 特殊文字（Charmap） {#special-characters-charmap}

特殊文字、矢印、ギリシャ文字、数学記号などを挿入します。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

カテゴリーは次のとおりです。
- 矢印
- 通貨
- ギリシャ文字
- 数学記号
- その他

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="charmap をクリックして特殊文字を挿入しましょう..." />

## メディアツールの組み合わせ {#combining-media-tools}

機能をすべて備えたメディアツールバーです。

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="メディアツールバーのフル構成..." />
