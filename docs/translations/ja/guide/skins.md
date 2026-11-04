# スキン {#skins}

**スキン**は、エディターの外観（クローム）の 1 つのスタイルです。ツールバー、その中のボタンとグループ、バブルメニュー、ドロップダウンメニュー、ダイアログ、コンテンツを囲むフレーム、画像の選択時の装飾が対象です。`skin` prop で選択します。

```vue
<Tiptapify skin="pastel" />
```

スキンは **トークン**（CSS 変数としての色とサイズ）と **シェイプ**（トークンでは表現できない構造上のバリアント）の 2 つから成ります。組み込みスキンは `default`（クラシックな外観で、浮き上がったボタングループを持つ浮き上がったツールバー）と、落ち着いた外観の `pastel` の 2 つです。カスタムスキンもファーストクラスです。`registerSkin()` とインラインのスキンオブジェクトはまったく同じ仕組みで解決され、組み込みスキンも特別扱いではなく登録済みスキンです。

## 用語: スキンと Vuetify テーマ {#terminology-skin-vs-vuetify-theme}

- **skin（スキン）** — エディターの外観の 1 つのスタイルを指す、ユーザー向けの用語です。トークンとシェイプで構成されます。prop は `skin`、型は `TiptapifySkin*`、レジストリは `registerSkin()`、ルートのクラスは `tiptapify-skin-{name}` です。
- **theme（テーマ）** — Vuetify のライト/ダークテーマ専用の用語です。Tiptapify のコンポーネントは `theme` prop に Vuetify の現在のテーマ名を渡し続け、スキンの仕組みがそれに触れることはありません。

両者は組み合わさって動作します。組み込みのトークンの色の多くは Vuetify のテーマ変数（`rgb(var(--v-theme-surface))` など）を参照しているため、スキンはライト/ダークに自動で追従します。クラシック列で固定のダーク色になっているもの、つまりリサイズハンドル（`rgba(0, 0, 0, .5/.8)`）、通常の画像アウトライン、バブルの影、メニューとダイアログのエレベーションの影は意図的なものです。クラシックの外観はどちらのテーマでも中立的なダーク色のクロームを描画し、計測済みのベースラインがそれを固定しています。カスタムスキンでは、テーマ変数を自由に参照できます。トークン表をご覧ください。

## コンセプト {#concept}

### トークン {#tokens}

トークンは `--tf-*` という名前の CSS カスタムプロパティです。カタログのキーは、CSS サフィックスをキャメルケースにしたものです。`toolbarBg` → `--tf-toolbar-bg`、`dialogTitleSize` → `--tf-dialog-title-size`。値はプレーンな文字列で、色、完全な border の省略記法、影、パディング、角丸などです。

ライブラリ内のスキンルールはすべて**ただ 1 か所**に存在し、クラシック（ベース）の値と同じフォールバックを付けてトークンを読み取ります。

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

解決されたスキンは、**上書き分**だけを変数として出力し、ベースの値は CSS のフォールバックが担います。変数はエディターのルートに設定されます。また、メニューとダイアログはルートの外にテレポートされるため、各メニューの `SkinScope` ラッパーとダイアログカード自体にも設定され、トークンはあらゆる面に追従します。

### シェイプ {#shape}

6 つのフラグが、どのルールセットを適用するかを決め、トークンがそれらを描画します。

| フラグ | 値 | 切り替える内容 |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar のエレベーションと内側の罫線なし、またはフラットな色付きバー |
| `groups` | `box` · `flat` | ツールバーのセクションを浮き出した **VBtnGroup** ボックス（0.3.2 のマークアップ: ボタンが連結され、グループのトークンがボックスを描画）にするか、通常の flex の div の並びにするか |
| `buttons` | `vuetify` · `quiet` | ネイティブの Vuetify ボタン、または押下時にニュートラルな状態になるゴーストボタン |
| `bubble` | `card` · `flat` | 互換性のために残されています。バブルメニューは、どちらのシェイプでも、トークンで描画されたアイコンボタンの 1 行です（ボタンは `buttons` に従います） |
| `dialog` | `classic` · `soft` | タイトル下の区切り線と浮き出した閉じるボタン、またはやわらかいカードとテキストの閉じるボタン |
| `menu` | `vuetify` · `soft` | ドロップダウンメニュー: Vuetify のリスト、または余白のある明るいカード |

解決されたシェイプは、エディターのルートに 6 つの `.tiptapify-shape-{flag}-{value}` クラスとして付与され、カスタムツールバーコンポーネント向けに [`useTiptapifyConfig()`](/ja/api/types#usetiptapifyconfig) の `shape: ComputedRef<ResolvedShape>` として公開されます。

### 拡張（Extends） {#extends}

スキンは、クラシックのベースの上に、`extends` チェーンをルート側から順に、最後に自身のメンバーを重ねて解決されます。

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

存在しないリンクは、そこまでに蓄積されたチェーンに解決され（開発時には警告が出ます）、循環はクラシックに解決されます（開発時には警告が出ます）。登録済みのスキンは名前で参照します。インラインのスキンオブジェクトは登録済みの名前を `extends` できますが、グローバルレジストリには登録されないため、カスタムスキンがエディター間で漏れることはありません。未知のトークンキーは、開発時の警告とともに無視されます。

3 つの形式すべてのライブデモは、[スキンの例のページ](/ja/examples/skins)にあります。

## トークンカタログ {#token-catalog}

以下の表は **v1 の仕様**です。カタログのキー（`TiptapifySkinColors` / `TiptapifySkinMetrics`）が、設定できる名前になります。クラシック列の値は CSS のフォールバック、つまりスキンがトークンを上書きしていないときにベースのルールが描画する値です。

### ツールバー / バー {#toolbar-bar}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### 項目 / グループ / 区切り {#items-groups-dividers}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify エレベーション 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` （スペーサー: margin `0 4px`） | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ 計測されたクラシックの値は `normal` で、これは Vuetify ネイティブの flex の値であり、CSS のフォールバックが持っているものです。カタログのベース値 `0px` は、スキンで上書きするときに使える同等の明示的な長さです。

<a id="shadow-cells"></a>² 「Vuetify elevation *n*」と書かれたセルは説明用です。正確な 3 重の影の文字列は、コミット済みのベースラインフィクスチャ（`src/skins/__fixtures__/skin-baseline.json`）にある計測値で、CSS のフォールバックでもあります。`groupShadow` では **elevation 2**（`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`）がそれに当たります。`groups: 'box'` ではセクションは VBtnGroup（`elevation="4"`）で、トークンのルールがグループ自身のエレベーションの上にこの 3 重の影でボックスを描画します。エレベーションを持つのはボックスで、連結された子ボタンは持ちません。

### ボタン {#buttons}

これらのトークンは **`buttons: 'quiet'` のときだけ**使われます。[到達可能性](#reachability)を参照してください。

| トークン | CSS 変数 | quiet の値（クラシック: ネイティブの Vuetify） |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### バブルメニュー（選択、空行、画像） {#bubble-menus-selection-empty-line-image}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | 同じ |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | 同じ |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | 同じ |

### ドロップダウンメニュー {#dropdown-menus}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify エレベーション 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ クラシックメニューの**リスト**ボックス（角丸、影、リストのパディング）は、現在はスキンのルールです。`SkinScope` のトークンラッパーが Vuetify 自身の子ルールとリストの間に入るため、ライブラリは上記のトークンを読むスキンルールとして、それらのピクセル値を復元しています。**項目**のピクセル値はネイティブの Vuetify のままです（フィクスチャは、そこで Vuetify のデフォルト値を計測しています）。4 つの項目トークンは、`menu: 'vuetify'` の間は効果がありません。

### ダイアログ {#dialogs}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard エレベーション [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px`（VCard） | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | フィールドのデフォルト（`4px`） | `8px`（outlined） |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify（`auto`） | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify（`4px`） | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### フレーム（エディターの枠ラッパー） {#frame-editor-border-wrapper}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`、上辺なし | 完全な border |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

フラットなツールバーのシェイプでは、フレームは辺ごとの差分も描画します（上辺と、border の不透明度を 1.6 倍にした下辺）。この差分はトークンではなくシェイプに属するため、トークンでは変更できません。

### 画像とリサイズハンドル {#images-and-resize-handles}

| トークン | CSS 変数 | クラシック | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` （選択時） | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` （ホバー時） | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

画像ツールバーは `buttons` フラグに従います。quiet シェイプでは quiet のサーフェスが適用され、その 2px/4px の間隔は、画像メニューのフォールバックを持つ `--tf-bubble-gap` / `--tf-bubble-padding` を読みます。画像ツールバー専用のトークンはありません。

### カタログにないもの（抜け道の領域） {#not-in-the-catalog-escape-hatch-territory}

設計の概要で挙げた寸法のうち、v1 のカタログにトークンがないものがあります。**ツールバーの高さ、フレームの幅、フレームの角丸、ボタンの幅、ボタンのパディング、ダイアログの幅**です。上のカタログの表が仕様であり、これらのピクセル値については、[抜け道](#escape-hatch-the-root-class)を使って、安定したクラスを直接スタイリングしてください。

## 到達可能性 {#reachability}

上記のすべてのグループが守る、1 つの原則です。

> トークンは、シェイプがそのサーフェスを有効にしている場合にのみ描画されます。ネイティブの Vuetify の見た目は、Vuetify のテーマカラーでスタイリングします。

グループごとの内容は次のとおりです。

- **ツールバー、フレーム、画像/ハンドルのクローム** — どのシェイプでも有効です。トークンがそれらを描画し、クラシックのセルはトークンがフォールバックするネイティブの見た目です。
- **グループのボックス**（`groupBg`、`groupRadius`、`groupHeight`、`groupShadow`）— `groups: 'box'` ではセクションは VBtnGroup（0.3.2 の構造: ボタンが連結され、ボックスがエレベーションを持つ）で、ボックスのルールがグループのトークンで描画します。`--tf-group-height` は 32px の仕様を `!important` で維持しています（0.3.2 と同様、Vuetify の density ルールと競合するためです）。`groups: 'flat'` ではセクションは通常の div の並びになります（透明で、影がなく、角丸 0 がシェイプのベースです）。
- **区切りの罫線**（`dividerWidth/Height/Color`）— 目に見える罫線は `groups: 'flat'` で使えるもので、ボックスのシェイプでは区切りはサイズ 0 のスペーサーです（ベースルールの `margin: 0 4px`）。
- **項目のパディング/間隔** — コンパクトな `6px 8px` はフラットなバー（`toolbar: 'flat'`）で、グループ間の間隔はフラットなセクション（`groups: 'flat'`）で有効になります。浮き出したバーはクラシックのメトリクスのままです。
- **ボタン**（`buttonFg`、`buttonHover*`、`buttonActive*`、`buttonRadius`）— `buttons: 'vuetify'` では効果がありません。ネイティブの Vuetify ボタンが自分で状態を描画するためです。Vuetify のテーマカラー（`primary`、`surface` など）でスタイリングしてください。クラシックなシェイプは、意図的にそれらを継承します。
- **メニュー項目のメトリクス**（`menuItemRadius/Padding/MinHeight/ActiveBg`）— `menu: 'vuetify'` では効果がなく、これらの項目のピクセル値は Vuetify が管理します。メニューの**リスト**ボックス（角丸/影/パディング）は、どちらのシェイプでもスキンが描画します（[メニューの注記](#menu-classic-note)を参照）。
- **ダイアログのやわらかいクローム**（`dialogActionBtn*`、`dialogFieldRadius`、やわらかいパディング、区切り線がないこと）— `dialog: 'soft'` で描画されます。`dialog: 'classic'` では、ダイアログはクラシックなパディングの VCard です。
- **バブルのクローム** — 選択、空行、画像のメニューは、どちらのシェイプでもアイコンボタンの 1 行で、バブルのトークンで描画されます。`bubble` がそれらのマークアップを変えることはなくなりました。

カタログのベースと同じ値での上書きは**出力されません**。クラシックではないシェイプでは、シェイプ自身のベースが CSS のフォールバックを通じて描画されるため、クラシックの値に「戻す」こと（たとえば `buttons: 'quiet'` で `buttonActiveBg` を `rgb(var(--v-theme-primary))` に戻すこと）は、何も起こりません。クラシックなシェイプ以外でクラシックに見える値を強制したい場合は、カタログのベースと異なる上書きを設定してください。`rgba(var(--v-theme-primary), 1)` のような等価なリテラルは、同じように描画され、スキップされません。

トークンは、ネイティブの描画経路には意図的に接続されていません。これにより、すべてがカタログを経由しつつ、`default` はクラシックな外観とピクセル単位で同一に保たれます。

## レシピ {#recipes}

### pastel を拡張する {#extend-pastel}

quiet のシェイプを継承して、いくつかのサーフェスの色を塗り直します。登録した名前は、どのエディターでも使えます。

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

シェイプ（flat/quiet/soft）は pastel から引き継がれ、触れていないトークンは pastel の値のままです。quiet ボタンの背景はニュートラルなままで、上書きしたものだけが変わります。このスキンは、[例のページ](/ja/examples/skins#custom-mint)でライブ表示されています。

### default を拡張する {#extend-default}

クラシックの構造はそのままに、色を調整します。

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` は暗黙のルートなので、キーは省略できます。`{ toolbar: 'flat', … }` もクラシックから始まります。

### 完全なカスタム {#full-custom}

`extends` も登録も不要です。オブジェクトを `skin` prop に渡し、シェイプのフラグとトークンを自由に設定します。`name` を指定すると、ルートのクラスに独自のラベルが付きます（後述）。指定しない場合は `tiptapify-skin-inline` になります。

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin` は、型付きの const 定義のための恒等ヘルパーです（レジストリには登録されません）。シェイプのフラグは個別に設定でき、省略したフラグはすべてクラシックのままです。

## 抜け道: ルートクラス {#escape-hatch-the-root-class}

すべてのエディターのルートには `tiptapify-skin-{name}` が付きます（名前のないインラインオブジェクトでは `tiptapify-skin-inline`）。ライブラリは、**スキン名をキーとするルールを一切持ちません**。このクラスは自由に使えます。

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

スタイルを書く際に使える、安定したフックは次のとおりです。

| クラス | 場所 |
|---|---|
| `tiptapify-skin-{name}` | エディターのルート |
| `tiptapify-shape-{flag}-{value}` ×6 | エディターのルート — 解決されたシェイプ |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | ツールバーとそのセクション |
| `tiptapify-quiet-buttons` | `buttons: 'quiet'` のときのツールバーとバブルのルート |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | すべてのバブルメニューの行と、そのグループ間の罫線 |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | 選択、空行、画像のメニューの行 |
| `tiptapify-btn--active` | バブルメニューで押された状態のボタン（アクティブなマーク、画像の回り込み） |
| `tiptapify-menu` · `tiptapify-menu--soft` | ドロップダウンのオーバーレイの内容と、やわらかいメニュールールの担い手 |
| `tiptapify-skin-scope` | テレポートされたメニュー内のトークンスコープの div |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | ダイアログカードと、そのやわらかい担い手 |
| `tiptapify-frame` | エディターの枠ラッパー |

**利用側テーマへの防御。** スキンレイヤーは、Vuetify の内部要素にパディングを付けたり色を塗り直したりする管理画面テーマにも耐えられるよう作られています。ルールはシェイプ/キャリアのクラスで限定され、詳細度のために二重のクラス（`.v-list.v-list`、`.v-btn.v-btn.v-btn`）を使い、`!important` は、ベースのコミットで管理画面テーマのケースが必要だと証明した箇所（menu.css の防御セット）にだけ残しています。同じ競合の場で、独自の上書きを機能させ続けるための指針は次のとおりです。

- CSS は `.tiptapify-skin-{name}`（またはシェイプのクラス）の下にスコープする。素の Vuetify 内部要素には書かない。
- カタログにある寸法にはトークン（`--tf-*`）を、それ以外にはクラスを使う。
- Vuetify コンポーネントを上書きするときは、二重化に合わせる（単独の `.v-list-item` は、スキンのルールに負けます）。

## ビジュアル仕様（コントリビューター向けメモ） {#visual-contract-contributor-note}

組み込みスキンの算出スタイルは、ベースラインのフィクスチャ `src/skins/__fixtures__/skin-baseline.json`（13 セクション × ライト/ダーク）に固定されています。計測したマトリクスがこれと一致すれば、CSS レイヤーは完成です。フィクスチャを読む際のメモは次のとおりです。

- ホバー/アクティブの寸法はページから強制できないため、記録では各ホバーセレクターの**最初に一致した CSSOM ルールの宣言テキスト**を読み取り、スキンのルート内にあるプローブ要素を通じて解決します（`resolved` フィールド）。これは実際の `:hover` のスナップショットではなく、勝ったルールの仕様です。
- `_meta.selectors.menu` には、`SkinScope` 導入前のセレクターテキストが記録されています。フィクスチャは凍結されている（規範となる値）ため、このフィールドは意図的に古いままで、記録バンドルが現在のセレクターを固定しています。
- フィクスチャは、承認済みの変更を `_meta.notes` に持っています。`groups: 'box'` で VBtnGroup のマークアップを復元した 2026-10-18 の変更で、クラシックの `groupBtn`/`buttonsActive` の子ボタンのフィールド（連結された角、エレベーションを持つのはボックス）を再計測しました。pastel のフィールドは変更されていません。意図的な見た目の変更では、影響を受けるクラシックのセルだけを更新し、メモを記録し、CHANGELOG に 1 行追加します。

## 関連項目 {#see-also}

- [スキンの例](/ja/examples/skins) — クラシック、pastel、カスタムの mint スキンをライブで表示します。
- [`skin` prop](/ja/api/props#skin) · [スキンの型](/ja/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/ja/api/types#tiptapifyskininput)。
