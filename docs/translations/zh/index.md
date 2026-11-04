<script setup>
</script>

# Tiptapify {#tiptapify}

**适用于 Vue 3 的 Tiptap 3 富文本编辑器，工具栏基于 Vuetify 3 实现**

::: info Beta 状态
本项目目前处于 **Beta** 阶段。功能已完整，但仍可能存在一些待修复的缺陷。
:::

## 特性 {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 组件</h3>
    <p>完全基于 Vuetify 3 组件构建的 Material Design 风格工具栏</p>
  </div>
  <div class="feature">
    <h3>30+ 扩展</h3>
    <p>富文本格式化、媒体嵌入、表格、带语法高亮的代码块</p>
  </div>
  <div class="feature">
    <h3>斜杠命令</h3>
    <p>输入 <code>/</code> 即可唤出快速插入菜单，用于插入标题、列表、媒体等内容</p>
  </div>
  <div class="feature">
    <h3>国际化</h3>
    <p>通过 vue-i18n 支持 20+ 种语言</p>
  </div>
  <div class="feature">
    <h3>深色主题</h3>
    <p>自动支持深色/浅色模式，并与你的 Vuetify 主题集成</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>完整的 TypeScript 支持，所有工具栏项和属性均导出了类型</p>
  </div>
</div>

## 快速开始 {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip 对等依赖
Tiptapify 需要 **Vue 3.x**、**Vuetify 3.x 或 4.x**、**vue-i18n 11+** 和 **@mdi/js** 作为对等依赖。完整的配置请参阅[安装指南](/zh/guide/installation)。
:::

## 许可证 {#license}

MIT — [GitHub 仓库](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
