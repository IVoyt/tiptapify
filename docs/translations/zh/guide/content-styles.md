# 内容样式 {#content-styles}

编辑器保存的某些内容,在显示它的页面上需要自己的外观:链接卡片、带说明文字和浮动的图片、适应正文宽度的视频和嵌入内容、每项旁带复选框的任务列表。没有这些样式,链接卡片就只是一个普通链接,图片和文字挤在一起。

`contentStyles` 属性决定保存的 HTML 如何携带这种外观:

| `contentStyles` | 保存的 HTML | 在网站上 |
|---|---|---|
| `inline`(默认) | 外观写入这些元素的 `style` 属性 | 无需加载任何内容:HTML 按原样显示 |
| `classes` | 仅有 class 和 `data-` 属性 | 加载 `tiptapify/content.css`,并把 HTML 放进带有 `tiptapify-content` class 的元素中 |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

两者携带的规则相同,正是编辑器自身显示内容所用的规则,因此无论哪种方式,页面看起来都与编辑器一致。只有这些元素会应用这些规则:标题、段落、列表、表格以及其余文本仍使用网站自己的样式。

## 内联样式 {#inline-styles}

默认方式。一个紧凑的链接卡片会这样保存:

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

- **颜色仍由网站决定。** 文本继承其颜色;弱化的文本和边框使用不透明度和半透明灰色,因此在浅色和深色页面上都能正常显示。主题的文本颜色照常在网站上设置。
- **无需媒体查询。** 在窄栏中,紧凑卡片会自动把图片放在文字上方;视频和嵌入内容不会比正文更宽。
- **网站仍可重新设置它们的样式**,class 依然保留。内联样式优先于 class 规则,因此这样的规则需要 `!important`。
- **清理器(sanitizer)必须保留这些元素的 `style` 属性**,否则它们会失去外观。

## Class 与 content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` 体积很小,不含 Vue 或 Vuetify。它的规则包裹在 `:where(.tiptapify-content)` 中,因此权重为零:网站的任何规则都会优先于它们,无需 `!important`。当网站希望把外观集中在一处,或自行为内容设置样式时,请使用这种方式。

`contentCss(scope)` 以字符串形式返回同一份样式表,可用于 `tiptapify-content` 之外的其他 class:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## 重新加载 HTML {#loading-html-back}

编辑器只根据属性和 class 读取这些元素:链接卡片通过 `data-link-card`,图片通过其 `src`、尺寸和浮动,任务通过 `data-checked`。加载 HTML 时会忽略它们的内联样式,保存时再重新写入。因此同一份 HTML 来回传递而不会改变:用 `inline` 保存的文档可以直接用 `classes` 加载,反之亦然,而且编辑器的后续版本会在文档下次保存时更新其外观。

文本格式不受影响:文本的颜色或大小以及段落的对齐方式属于内容,编辑器会继续从它们的样式中读取。

若要在编辑器之外(旧文档、电子邮件)把 class 形式的 HTML 转换为内联样式的 HTML,请使用 `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

它需要 DOM(浏览器,或服务器上的 jsdom);没有 DOM 时会原样返回 HTML。

## 图片滑块 {#image-sliders}

编写时,编辑器会把连续排列的图片标记为滑块(参见 `imageSlider` 属性);保存的 HTML 则将它们保留为依次排列的 figure。如何把它们显示为滑块,由网站自己的脚本决定。
