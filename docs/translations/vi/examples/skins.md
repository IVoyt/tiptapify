# Skin {#skins}

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

Prop `skin` chọn diện mạo của phần khung trình soạn thảo: thanh công cụ, bubble menu, dropdown, hộp thoại.
Các tính năng hoạt động như nhau ở mọi skin. Các khái niệm, bảng token và các công thức nằm trong
[hướng dẫn Skin](/vi/guide/skins).

## Classic (mặc định) {#classic-default}

Thanh công cụ nổi, các nhóm nút dạng hộp nổi, bubble menu kiểu thẻ:

<InteractiveEditor :bubble-menu="true" placeholder="Skin Classic..." />

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

Thanh công cụ phẳng phủ sắc nhạt dưới một đường kẻ mảnh, nút ghost có trạng thái nhấn trung tính, danh sách thả xuống nhẹ:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skin Pastel..." />

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

## Tùy chỉnh: mint {#custom-mint}

`registerSkin` thêm một tên vào registry. Skin này kế thừa `pastel` và ghi đè một vài token: sắc xanh bạc hà cho lớp nền thanh công cụ, và xanh lục đậm cho viền hình ảnh và các tay nắm thay đổi kích thước. Hình dạng tinh gọn được thừa hưởng từ pastel; mọi thứ không bị ghi đè (trạng thái nút, menu, hộp thoại) giữ nguyên giá trị của pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skin Mint..." />

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

Phần tử gốc của trình soạn thảo mang class `tiptapify-skin-mint` — lối thoát cho những kích thước mà danh mục token không bao phủ (xem [Lối thoát](/vi/guide/skins#escape-hatch-the-root-class)).

## Skin nội tuyến {#inline-skin}

Prop `skin` cũng nhận một đối tượng: ghi đè token và các cờ hình dạng, kế thừa từ một skin đã đăng ký thông qua `extends`. Nó được phân giải qua cùng một chuỗi, không bao giờ vào registry, và được render với class `tiptapify-skin-inline` (hoặc `tiptapify-skin-{name}` khi đối tượng có `name`); các token của nó trở thành biến CSS `--tf-*` trên phần tử gốc của trình soạn thảo.

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
