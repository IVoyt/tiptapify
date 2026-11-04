# コンテンツスタイル {#content-styles}

エディターが保存するものの一部は、それを表示するページで独自の見た目が必要です。リンクカード、キャプションとフロートを持つ画像、テキスト幅に収まる動画や埋め込み、各項目の横にチェックボックスがあるタスクリストなどです。これがないと、リンクカードは画像とテキストがくっついただけの素のリンクになります。

`contentStyles` プロパティは、保存される HTML がその見た目をどのように持つかを指定します。

| `contentStyles` | 保存される HTML | サイト側 |
|---|---|---|
| `inline`(デフォルト) | 見た目がこれらの要素の `style` 属性に書き込まれる | 読み込むものはなし。HTML がそのまま表示される |
| `classes` | クラスと `data-` 属性のみ | `tiptapify/content.css` を読み込み、HTML を `tiptapify-content` クラスの要素に入れる |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

どちらも同じルール、つまりエディター自身がコンテンツを表示するときのルールを持つため、どちらの場合もページはエディターと同じ見た目になります。ルールが適用されるのはこれらの要素だけです。見出し、段落、リスト、表などのテキストにはサイト独自のスタイルがそのまま使われます。

## インラインスタイル {#inline-styles}

デフォルトの方式です。コンパクトなリンクカードは次のように保存されます。

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **色はサイトのものがそのまま使われます。** テキストは色を継承し、控えめなテキストや罫線は不透明度と半透明のグレーを使うため、明るいページでも暗いページでも機能します。テーマごとのテキスト色は、通常どおりサイト側で設定してください。
- **メディアクエリは不要です。** コンパクトカードは、狭いカラムでは自動的に画像をテキストの上に配置します。動画や埋め込みがテキスト幅を超えることはありません。
- **サイト側で再スタイルすることもできます**。クラスは残っています。インラインスタイルはクラスのルールより優先されるため、そのようなルールには `!important` が必要です。
- **サニタイザーはこれらの要素の `style` 属性を残す必要があります**。残さないと見た目が失われます。

## クラスと content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` は小さく、Vue も Vuetify も含みません。ルールは `:where(.tiptapify-content)` で囲まれているため詳細度がゼロで、サイトのどのルールも `!important` なしでそれらに優先します。見た目を 1 か所にまとめたい場合や、サイトが自分でコンテンツをスタイルする場合に使います。

`contentCss(scope)` は、`tiptapify-content` 以外のクラス向けに、同じスタイルシートを文字列として返します。

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML の再読み込み {#loading-html-back}

エディターはこれらの要素を属性とクラスだけで読み取ります。リンクカードは `data-link-card`、画像は `src`・サイズ・フロート、タスクは `data-checked` です。インラインスタイルは HTML の読み込み時に無視され、保存時にあらためて書き込まれます。そのため同じ HTML が変わらずにやり取りでき、`inline` で保存した文書を `classes` で問題なく読み込めますし、その逆も可能です。また、エディターの新しいバージョンでは、文書を次に保存するときに見た目が更新されます。

テキストの書式には手を加えません。テキストの色やサイズ、段落の配置はコンテンツであり、エディターはこれまでどおりそれらのスタイルから読み取ります。

クラス形式の HTML をエディターの外(古い文書やメールなど)でインラインスタイルの HTML に変換するには、`inlineContentStyles` を使います。

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

DOM(ブラウザー、またはサーバー上の jsdom)が必要で、DOM がない場合は HTML をそのまま返します。

## 画像スライダー {#image-sliders}

エディターは、入力中に並んだ画像をスライダーとしてマークします(`imageSlider` プロパティを参照)。保存される HTML では、それらは続けて並ぶ figure のままです。スライダーとして表示するかどうかは、サイト独自のスクリプト次第です。
