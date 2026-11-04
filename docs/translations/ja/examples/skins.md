# スキン {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

`skin` prop は、ツールバー、バブルメニュー、ドロップダウン、ダイアログといったエディターの外観を選択します。
機能はどのスキンでも同じように動作します。概念、トークン表、レシピは
[スキンガイド](/ja/guide/skins)にまとめています。

## Classic（デフォルト） {#classic-default}

立体感のあるツールバー、浮き出したボックス状のボタングループ、カード風のバブルメニューです。

<InteractiveEditor :bubble-menu="true" placeholder="Classic スキン..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## Pastel {#pastel}

極細の線の下に置かれたフラットな色付きツールバー、押下状態がニュートラルなゴーストボタン、軽やかなドロップダウン:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel スキン..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## カスタム: mint {#custom-mint}

`registerSkin` はレジストリに名前を追加します。このスキンは `pastel` を拡張し、いくつかのトークンだけを上書きしています。ツールバーの背景にミント色の色味を付け、画像のアウトラインとリサイズハンドルには濃い緑を使います。落ち着いた形状は pastel から引き継がれ、上書きしていないもの（ボタンの状態、メニュー、ダイアログ）は pastel の値のままです。

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint スキン..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

エディターのルートには `tiptapify-skin-mint` クラスが付きます。これは、トークンカタログでカバーしきれない項目のための抜け道です（[抜け道: ルートクラス](/ja/guide/skins#escape-hatch-the-root-class)を参照）。

## インラインスキン {#inline-skin}

`skin` prop にはオブジェクトも渡せます。トークンの上書きと形状フラグを指定でき、`extends` で登録済みのスキンを継承します。解決は同じチェーンをたどり、レジストリには登録されず、クラス `tiptapify-skin-inline`（オブジェクトに `name` がある場合は `tiptapify-skin-{name}`）の下で描画されます。トークンはエディターのルートに `--tf-*` CSS 変数として設定されます。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
