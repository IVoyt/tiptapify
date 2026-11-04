# ツールバー項目 {#toolbar-items}

利用できるすべてのツールバー項目を、セクション別に示します。

## アクション {#actions}

| 項目 | 説明 |
|---|---|
| `undo` | 直前の変更を元に戻す |
| `redo` | 元に戻した変更をやり直す |

## AI {#ai}

| 項目 | 説明 |
|---|---|
| `ai` | 設定されている場合に AI プロンプトダイアログを開く |

## 書式 {#format}

| 項目 | 説明 |
|---|---|
| `bold` | 太字を切り替える |
| `italic` | 斜体を切り替える |
| `underline` | 下線を切り替える |
| `strike` | 取り消し線を切り替える |

## 追加の書式 {#format-extra}

| 項目 | 説明 |
|---|---|
| `sup` | 上付き文字を切り替える |
| `sub` | 下付き文字を切り替える |
| `code` | インラインコードを切り替える |
| `codeBlock` | シンタックスハイライト付きのコードブロックを挿入する |
| `blockquote` | 引用ブロックを挿入する |

## スタイル {#style}

| 項目 | 説明 |
|---|---|
| `heading` | 見出しレベル（H1〜H6）を選ぶドロップダウン |
| `fontFamily` | フォントファミリーを選ぶドロップダウン |
| `fontSize` | フォントサイズを選ぶドロップダウン |
| `lineHeight` | 行の高さを設定する |
| `textColor` | 文字色: パレット、最近使った色、HEX、スポイト、カスタムピッカー |
| `highlightColor` | ハイライト色: 同じピッカー。先頭は「ハイライトなし」 |

`heading` 項目では、コロンの後ろにオプションを指定できます。見出しレベル、段落項目を追加する `p`、ドロップダウンではなく個別のボタンとして表示する `inline` です。

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## 配置 {#alignment}

| 項目 | 説明 |
|---|---|
| `left` | 左揃え |
| `center` | 中央揃え |
| `right` | 右揃え |
| `justify` | 両端揃え |
| `align` | 配置のドロップダウン。`align:left,center,right` で選択肢を絞り込める |

## リスト {#list}

| 項目 | 説明 |
|---|---|
| `bulletList` | 箇条書きリストを切り替える |
| `orderedList` | 番号付きリストを切り替える |
| `taskList` | タスクリスト（チェックボックス）を切り替える |
| `indent` | 現在のブロックをインデントする |
| `outdent` | 現在のブロックのインデントを戻す |

## メディア {#media}

| 項目 | 説明 |
|---|---|
| `link` | リンクを挿入/編集する。`linkPreview` を指定すると[リンクカード](/ja/guide/link-cards)になる |
| `image` | 画像を挿入/編集する: URL またはアップロード、代替テキスト、キャプション、サイズ、配置 |
| `video` | YouTube、Vimeo、または動画ファイル（`.mp4`、`.webm`、`.ogg`、`.mov`）を挿入/編集する |
| `iframe` | ページのアドレスまたは iframe コードでページを埋め込む |
| `emoji` | 絵文字ピッカーを開く（10 カテゴリー） |
| `charmap` | 特殊文字ピッカーを開く |
| `table` | 表を挿入する |

## その他 {#misc}

| 項目 | 説明 |
|---|---|
| `line` | 水平線を挿入する |
| `pagebreak` | 改ページを挿入する |
| `source` | HTML ソース表示を切り替える |
| `preview` | HTML プレビューモードを切り替える |
| `fullscreen` | 全画面編集モードを切り替える |
| `formatClear` | 選択範囲の書式をすべてクリアする |
| `invisibleChar` | 不可視文字（スペースなど）を挿入する |

## 区切り {#separators}

配列形式の `items` prop では、ボタングループの区切りとして `|` を使います。

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## ツールバーの完全な例 {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
