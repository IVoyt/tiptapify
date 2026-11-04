# 皮肤 {#skins}

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

`skin` 属性用于选择编辑器外观：工具栏、气泡菜单、下拉菜单和对话框。
所有皮肤下的功能表现一致。相关概念、令牌表和用法示例请参阅
[皮肤指南](/zh/guide/skins)。

## 经典（默认） {#classic-default}

凸起的工具栏，按钮组呈凸起的盒状，气泡菜单为卡片样式：

<InteractiveEditor :bubble-menu="true" placeholder="经典皮肤..." />

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

## 柔和 {#pastel}

位于细线下方的扁平着色工具栏，按下状态为中性色的幽灵按钮，轻盈的下拉菜单：

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="柔和皮肤..." />

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

## 自定义：薄荷 {#custom-mint}

`registerSkin` 会在注册表中添加一个名称。此皮肤继承自 `pastel`，并覆盖少量令牌：工具栏底色使用薄荷色调，图片轮廓和调整手柄使用深绿色。安静的造型沿用自 pastel；所有未被覆盖的内容（按钮状态、菜单、对话框）保持 pastel 的取值：

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="薄荷皮肤..." />

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

编辑器根元素带有 `tiptapify-skin-mint` 类——这是为令牌目录未涵盖的尺寸准备的应急出口（参见[应急出口](/zh/guide/skins#escape-hatch-the-root-class)）。

## 内联皮肤 {#inline-skin}

`skin` 属性也接受对象：令牌覆盖项和造型标志，并通过 `extends` 继承自已注册的皮肤。它沿同一条链解析，不会进入注册表，并以类 `tiptapify-skin-inline` 渲染（若对象带有 `name`，则为 `tiptapify-skin-{name}`）；其令牌会作为 `--tf-*` CSS 变量应用到编辑器根元素上。

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
