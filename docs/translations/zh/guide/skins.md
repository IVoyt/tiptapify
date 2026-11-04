# 皮肤 {#skins}

**皮肤**（skin）是编辑器外观的一种样式：工具栏、其中的按钮和分组、气泡菜单、下拉菜单、对话框、内容周围的边框，以及图片选中时的外观。通过 `skin` 属性选择它：

```vue
<Tiptapify skin="pastel" />
```

一个皮肤由两部分组成：**令牌**（以 CSS 变量表示的颜色和尺寸）和**形态**（令牌无法表达的结构变体）。两个内置皮肤是 `default`（经典外观，带凸起按钮组的凸起工具栏）和 `pastel`（沉静外观）。自定义皮肤同样是一等公民：`registerSkin()` 和内联皮肤对象通过完全相同的机制解析，内置皮肤也只是已注册的皮肤，而非特例。

## 术语：皮肤与 Vuetify 主题 {#terminology-skin-vs-vuetify-theme}

- **skin（皮肤）**——面向用户的术语，指编辑器外观的一种样式：令牌 + 造型。属性是 `skin`，类型是 `TiptapifySkin*`，注册表是 `registerSkin()`，根类是 `tiptapify-skin-{name}`。
- **theme（主题）**——专指 Vuetify 的浅色/深色主题。Tiptapify 组件的 `theme` 属性由 Vuetify 当前的主题名称提供；皮肤系统从不触及它们。

它们可以组合：大多数内置令牌颜色引用 Vuetify 主题变量（`rgb(var(--v-theme-surface))` 等），因此皮肤会自动跟随浅色/深色。经典列中固定为深色的单元格——调整手柄（`rgba(0, 0, 0, .5/.8)`）、朴素的图片轮廓、气泡菜单阴影，以及菜单/对话框的投影——是有意为之：经典外观在两种主题下都绘制中性的深色外观，并由实测基线固定。自定义皮肤可以自由引用主题变量——参见令牌表。

## 概念 {#concept}

### 令牌 {#tokens}

令牌是名为 `--tf-*` 的 CSS 自定义属性。目录中的键是 CSS 后缀的驼峰形式：`toolbarBg` → `--tf-toolbar-bg`，`dialogTitleSize` → `--tf-dialog-title-size`。值都是普通字符串——颜色、完整的边框简写、阴影、内边距、圆角。

库中的每条皮肤规则都**只存在一次**，读取其令牌，并带有等于经典（基础）值的回退值：

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

解析后的皮肤只会把其**覆盖项**输出为变量；CSS 回退值承载基础值。这些变量会落在编辑器根元素上——并且由于菜单和对话框会被传送到根元素之外，它们也会落在每个菜单的 `SkinScope` 包装元素以及对话框卡片本身上，因此令牌会跟随每一个表面。

### 造型 {#shape}

六个标志决定应用哪些规则集；令牌则负责为它们上色：

| 标志 | 取值 | 切换的内容 |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar 阴影且无内部细线 vs 扁平着色栏 |
| `groups` | `box` · `flat` | 工具栏分区为凸起的 **VBtnGroup** 盒（0.3.2 的标记：按钮相连，由分组令牌为盒着色） vs 普通的 flex div 序列 |
| `buttons` | `vuetify` · `quiet` | 原生 Vuetify 按钮 vs 带中性按下状态的幽灵按钮 |
| `bubble` | `card` · `flat` | 为兼容而保留：在两种造型下，气泡菜单都是由令牌着色的一行图标按钮（其按钮跟随 `buttons`） |
| `dialog` | `classic` · `soft` | 标题下方的分隔线、带阴影的关闭按钮 vs 柔和的卡片、文字关闭按钮 |
| `menu` | `vuetify` · `soft` | 下拉菜单：Vuetify 列表 vs 带内边距的浅色卡片 |

解析后的造型会以六个 `.tiptapify-shape-{flag}-{value}` 类编码在编辑器根元素上，并在 [`useTiptapifyConfig()`](/zh/api/types#usetiptapifyconfig) 上以 `shape: ComputedRef<ResolvedShape>` 的形式暴露，供自定义工具栏组件使用。

### Extends {#extends}

皮肤先基于经典基础解析，然后按从根开始的顺序解析其 `extends` 链，最后是它自己的成员：

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

缺失的链接会解析为已累积的链（并在开发环境给出警告）；循环会解析为经典（并在开发环境给出警告）。已注册的皮肤通过名称引用；内联皮肤对象可以 `extends` 某个已注册的名称，并且从不进入全局注册表——自定义皮肤绝不会在编辑器之间泄漏。未知的令牌键会被忽略，并在开发环境给出警告。

这三种形式的在线演示见[皮肤示例页](/zh/examples/skins)。

## 令牌目录 {#token-catalog}

下面的表格是 **v1 约定**：目录中的键（`TiptapifySkinColors` / `TiptapifySkinMetrics`）就是你可以设置的名称。经典列的单元格是 CSS 回退值——即没有皮肤覆盖该令牌时，基础规则所绘制的值。

### 工具栏 / 栏 {#toolbar-bar}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### 项 / 分组 / 分隔符 {#items-groups-dividers}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify 阴影等级 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` （间隔：外边距 `0 4px`） | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ 实测的经典单元格为 `normal`——Vuetify 原生的 flex 值，也就是 CSS 回退值所携带的值。目录中的基础值 `0px` 是供皮肤覆盖使用的等价显式长度。

<a id="shadow-cells"></a>² 写着“Vuetify 阴影等级 *n*”的单元格是描述性的：确切的三重阴影字符串是已提交的基线固定数据（`src/skins/__fixtures__/skin-baseline.json`）中的实测值，也是 CSS 回退值。对于 `groupShadow`，它是**阴影等级 2**（`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`）——在 `groups: 'box'` 下，该分区是一个 VBtnGroup（`elevation="4"`），令牌规则会用这组三重阴影为盒着色，覆盖在分组自身的阴影之上：盒拥有阴影，相连的子按钮则没有。

### 按钮 {#buttons}

这些令牌**仅在 `buttons: 'quiet'` 下**使用——参见[可达性](#reachability)。

| 令牌 | CSS 变量 | quiet 值（经典：原生 Vuetify） |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### 气泡菜单（选区、空行、图片） {#bubble-menus-selection-empty-line-image}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | 相同 |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | 相同 |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | 相同 |

### 下拉菜单 {#dropdown-menus}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify 阴影等级 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ 经典菜单的**列表**盒（圆角、阴影、列表内边距）目前是一条皮肤规则——`SkinScope` 令牌包装元素位于 Vuetify 自身的子规则与列表之间，因此库会把这些像素还原为读取上述令牌的皮肤规则。**菜单项**的像素仍为原生 Vuetify（固定数据测量的是此处的 Vuetify 默认值）：在 `menu: 'vuetify'` 时，这四个菜单项令牌不起作用。

### 对话框 {#dialogs}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard 阴影 [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` （VCard） | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | 字段默认值（`4px`） | `8px` （outlined） |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### 边框（编辑器边框容器） {#frame-editor-border-wrapper}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`，无上边框 | 完整边框 |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

在扁平工具栏造型下，边框还会绘制各边的差值（上边框，以及不透明度为边框 1.6 倍的下边框）。该差值属于造型，而不属于令牌：它无法通过令牌触达。

### 图片和调整手柄 {#images-and-resize-handles}

| 令牌 | CSS 变量 | 经典 | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` （选中时） | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` （悬停时） | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

图片工具栏跟随 `buttons` 标志：在 quiet 造型下，它会获得 quiet 表面——其 2px/4px 间距读取 `--tf-bubble-gap` / `--tf-bubble-padding`，并带有图片菜单的回退值；没有专门的图片工具栏令牌。

### 不在目录中（应急出口范畴） {#not-in-the-catalog-escape-hatch-territory}

设计概览中提到的某些尺寸在 v1 中没有目录令牌：**工具栏高度、边框宽度、边框圆角、按钮宽度、按钮内边距、对话框宽度**。上面的目录表格就是约定；对于这些像素，请打开[应急出口](#escape-hatch-the-root-class)并直接为稳定的类设置样式。

## 可达性 {#reachability}

该约定只陈述一次，并被上述每一组所遵循：

> 只有当造型激活某个表面时，令牌才会为该表面上色；原生 Vuetify 的视觉效果通过 Vuetify 主题颜色来设置样式。

按组说明：

- **工具栏、边框、图片/手柄外观**——在每种造型下都生效；令牌为它们上色，经典列的单元格是令牌回退到的原生外观。
- **分组盒**（`groupBg`、`groupRadius`、`groupHeight`、`groupShadow`）——在 `groups: 'box'` 下，该分区是一个 VBtnGroup（0.3.2 的结构：按钮相连，盒承载阴影）；盒规则用分组令牌为其着色，并且 `--tf-group-height` 通过 `!important` 保持 32px 的约定（Vuetify 的密度规则与之冲突，与 0.3.2 相同）。在 `groups: 'flat'` 下，各分区是普通的 div 序列（透明、无阴影，圆角 0 是该造型的基础值）。
- **分隔线细线**（`dividerWidth/Height/Color`）——可见的细线是 `groups: 'flat'` 的特性；在 box 造型下，分隔符是零尺寸的间隔（来自基础规则的 `margin: 0 4px`）。
- **项的内边距/间距**——紧凑的 `6px 8px` 序列受扁平栏（`toolbar: 'flat'`）限制，分组间距受扁平分区（`groups: 'flat'`）限制；凸起的栏保持经典度量。
- **按钮**（`buttonFg`、`buttonHover*`、`buttonActive*`、`buttonRadius`）——在 `buttons: 'vuetify'` 下不起作用：原生 Vuetify 按钮会绘制自己的状态。请使用 Vuetify 主题颜色（`primary`、`surface` 等）为它们设置样式——经典造型有意继承这些颜色。
- **菜单项度量**（`menuItemRadius/Padding/MinHeight/ActiveBg`）——在 `menu: 'vuetify'` 下不起作用；这些菜单项的像素由 Vuetify 负责。菜单**列表**盒（圆角/阴影/内边距）在两种造型下都由皮肤绘制（参见[菜单说明](#menu-classic-note)）。
- **对话框柔和外观**（`dialogActionBtn*`、`dialogFieldRadius`、柔和的内边距、缺失的分隔线）——在 `dialog: 'soft'` 下绘制；在 `dialog: 'classic'` 下，对话框是带有经典内边距的 VCard。
- **气泡菜单外观**——选区、空行和图片菜单在两种造型下都是一行图标按钮，由气泡令牌着色；`bubble` 不再改变它们的标记。

与目录基础值相等的覆盖项**不会被输出**——在非经典造型下，该造型自身的基础值会通过 CSS 回退值绘制，因此“还原”经典值（例如在 `buttons: 'quiet'` 下将 `buttonActiveBg` 设回 `rgb(var(--v-theme-primary))`）会悄无声息地不起作用。若要在非经典造型下强制使用经典外观的值，请设置一个与目录基础值不同的覆盖项——像 `rgba(var(--v-theme-primary), 1)` 这样的等价字面量绘制效果相同，并且能躲过这个跳过规则。

令牌有意不接入原生路径——这正是让 `default` 与经典外观保持像素级一致的原因，同时一切都通过目录路由。

## 用法示例 {#recipes}

### 扩展 pastel {#extend-pastel}

继承 quiet 造型并重绘少数几个表面。已注册的名称在任何编辑器上都可用：

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

造型（flat/quiet/soft）来自 pastel；未改动的令牌保留 pastel 的值——quiet 按钮的底色保持中性，只有你覆盖的部分会改变。这就是[示例页](/zh/examples/skins#custom-mint)上实时渲染的皮肤。

### 扩展 default {#extend-default}

保持经典结构，调整绘制：

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` 是隐式的根，因此该键可以省略：`{ toolbar: 'flat', … }` 同样从经典开始。

### 完全自定义 {#full-custom}

没有 `extends`，也无需注册：把对象传给 `skin` 属性，自由设置造型标志和令牌。`name` 会为根类加上你自己的标签（见下文）；没有它时则是 `tiptapify-skin-inline`。

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

`defineSkin` 是用于类型化 const 定义的恒等辅助函数（它不会进入任何注册表）。造型标志可以单独设置——你省略的每个标志都保持经典。

## 应急出口：根类 {#escape-hatch-the-root-class}

每个编辑器根元素都带有 `tiptapify-skin-{name}`（无名内联对象则为 `tiptapify-skin-inline`）。库**绝不会基于皮肤名称设置任何规则**——这个类属于你：

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

可供编写样式时依赖的稳定钩子：

| 类 | 位置 |
|---|---|
| `tiptapify-skin-{name}` | 编辑器根元素 |
| `tiptapify-shape-{flag}-{value}` ×6 | 编辑器根元素——解析后的造型 |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | 工具栏及其分区 |
| `tiptapify-quiet-buttons` | `buttons: 'quiet'` 下的工具栏和气泡菜单根元素 |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | 每个气泡菜单的行，以及其分组之间的细线 |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | 选区、空行和图片菜单的行 |
| `tiptapify-btn--active` | 气泡菜单中被按下的按钮（激活的标记、图片浮动） |
| `tiptapify-menu` · `tiptapify-menu--soft` | 下拉浮层内容，柔和菜单规则的载体 |
| `tiptapify-skin-scope` | 传送出去的菜单内部的令牌作用域 div |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | 对话框卡片及其柔和载体 |
| `tiptapify-frame` | 编辑器边框容器 |

**防御使用者主题。**皮肤层的设计目标是经受住那些会给 Vuetify 内部添加内边距并重绘它们的管理后台主题：规则以造型/载体类为条件，使用双重类（`.v-list.v-list`、`.v-btn.v-btn.v-btn`）来提高优先级，并且仅在基础提交中的管理后台主题案例证明确有必要的地方才保留 `!important`（menu.css 防御集）。以下约定可让你自己的覆盖在同一战场上继续有效：

- 将你的 CSS 限定在 `.tiptapify-skin-{name}`（或某个造型类）之下——绝不要直接作用于裸露的 Vuetify 内部元素；
- 对目录中的尺寸优先使用令牌（`--tf-*`），其余使用类；
- 覆盖 Vuetify 组件时保持同样的双重类写法（单个 `.v-list-item` 会输给皮肤规则）。

## 视觉约定（贡献者说明） {#visual-contract-contributor-note}

内置皮肤的计算样式由基线固定数据 `src/skins/__fixtures__/skin-baseline.json`（13 个部分 × 浅色/深色）固定：当实测矩阵与之匹配时，CSS 层即完成。固定数据的阅读说明：

- 悬停/激活的尺寸无法从页面强制触发，因此记录会读取每个悬停选择器的**第一个命中的 CSSOM 规则的声明文本**，并通过皮肤根元素内的探测元素解析它（`resolved` 字段）——它是获胜规则的约定，而非实时的 `:hover` 快照。
- `_meta.selectors.menu` 记录了 `SkinScope` 出现之前的选择器文本。该固定数据是冻结的（规范值），因此该字段有意保持过时；记录用的包会固定当前的选择器。
- 该固定数据在 `_meta.notes` 中记录其获准的变更：2026-10-18 在 `groups: 'box'` 下还原 VBtnGroup 标记，重新测量了经典的 `groupBtn`/`buttonsActive` 子按钮字段（相连的圆角，盒拥有阴影）。Pastel 字段未改动——有意的视觉变更只更新受影响的经典单元格，记录一条说明，并附带一行 CHANGELOG。

## 另请参阅 {#see-also}

- [皮肤示例](/zh/examples/skins)——经典、pastel 以及自定义的 mint 皮肤，实时演示。
- [`skin` 属性](/zh/api/props#skin) · [皮肤类型](/zh/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/zh/api/types#tiptapifyskininput)。
