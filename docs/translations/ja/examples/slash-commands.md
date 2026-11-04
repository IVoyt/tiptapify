# スラッシュコマンド {#slash-commands}

スラッシュコマンドは、行頭で `/` を入力すると表示されるクイック挿入メニューです。

## スラッシュコマンドを有効にする {#enabling-slash-commands}

スラッシュコマンドはデフォルトで有効です。明示的に制御するには次のようにします。

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="スラッシュコマンドのデモ..."
:slash-commands="true"
/>

## 利用可能なコマンド {#available-commands}

エディターで `/` を入力すると、コマンドパレットが表示されます。利用できるコマンドは次のとおりです。

| コマンド | 説明 |
|---|---|
| `/h1` - `/h6` | 見出しを挿入（レベル 1〜6） |
| `/bulletList` | 箇条書きリストを挿入 |
| `/numberedList` | 番号付きリストを挿入 |
| `/taskList` | タスクリストを挿入 |
| `/code` | インラインコードを挿入 |
| `/codeBlock` | コードブロックを挿入 |
| `/quote` | 引用ブロックを挿入 |
| `/image` | 画像を挿入（URL ダイアログが開きます） |
| `/video` | YouTube 動画を埋め込み |
| `/table` | 表を挿入 |
| `/link` | ハイパーリンクを挿入 |
| `/divider` | 水平線を挿入 |
| `/emoji` | 絵文字ピッカーを開く |
| `/specialChars` | 特殊文字を開く |

## 仕組み {#how-it-works}

1. カーソルを行頭またはスペースの後ろに置きます
2. `/` を入力すると、コマンドパレットが表示されます
3. 入力を続けてコマンドを絞り込みます
4. `Enter` を押すか、クリックして選択したコマンドを挿入します

## スラッシュコマンドを無効にする {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## スラッシュコマンドとフローティングメニューの併用 {#slash-commands-with-floating-menu}

スラッシュコマンドとフローティングメニューを組み合わせると、快適に編集できます。

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **スラッシュコマンド**（`/`）— 行頭で `/` を入力すると起動します
- **フローティングメニュー** — 空行にカーソルを置くと表示されます（ブロックレベルの操作を提供）
- **バブルメニュー** — テキストを選択すると表示されます（インライン書式を提供）

## 利用可能なコマンドの絞り込み {#filtering-available-commands}

コマンド ID の配列を渡すことで、含めるコマンドを指定できます。

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### 利用可能なコマンド ID {#available-command-ids}

| ID | 説明 |
|---|---|
| `h1` - `h6` | 見出しレベル 1〜6 |
| `bulletList` | 箇条書きリスト |
| `numberedList` | 番号付きリスト |
| `taskList` | タスクリスト |
| `code` | インラインコード |
| `codeBlock` | コードブロック |
| `quote` | 引用ブロック |
| `image` | 画像 |
| `video` | YouTube 動画 |
| `table` | 表 |
| `link` | リンク |
| `divider` | 水平線 |
| `emoji` | 絵文字 |
| `specialChars` | 特殊文字 |
