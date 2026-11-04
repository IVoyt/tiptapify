<script setup>
</script>

# Tiptapify {#tiptapify}

**Trình soạn thảo văn bản đa dạng Tiptap 3 cho Vue 3 với thanh công cụ xây dựng bằng Vuetify 3**

::: info Trạng thái Beta
Dự án hiện đang ở giai đoạn **Beta**. Các tính năng đã đầy đủ nhưng vẫn có thể còn một số lỗi cần sửa.
:::

## Tính năng {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Các thành phần Vuetify 3</h3>
    <p>Thanh công cụ Material Design đẹp mắt, được xây dựng hoàn toàn bằng các thành phần Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Hơn 30 extension</h3>
    <p>Định dạng văn bản, nhúng phương tiện, bảng, khối mã với tô sáng cú pháp</p>
  </div>
  <div class="feature">
    <h3>Lệnh Slash</h3>
    <p>Nhập <code>/</code> để mở menu chèn nhanh tiêu đề, danh sách, phương tiện và nhiều hơn nữa</p>
  </div>
  <div class="feature">
    <h3>Đa ngôn ngữ</h3>
    <p>Hỗ trợ hơn 20 ngôn ngữ thông qua vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Giao diện tối</h3>
    <p>Tự động hỗ trợ chế độ tối/sáng, tích hợp với theme Vuetify của bạn</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Hỗ trợ TypeScript đầy đủ với các kiểu được xuất cho mọi mục thanh công cụ và props</p>
  </div>
</div>

## Bắt đầu nhanh {#quick-start}

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

::: tip Phụ thuộc ngang hàng (Peer Dependencies)
Tiptapify yêu cầu **Vue 3.x**, **Vuetify 3.x hoặc 4.x**, **vue-i18n 11+** và **@mdi/js** làm peer dependencies. Xem [hướng dẫn cài đặt](/vi/guide/installation) để biết đầy đủ cách thiết lập.
:::

## Giấy phép {#license}

MIT — [Kho GitHub](https://github.com/IVoyt/tiptapify)

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
