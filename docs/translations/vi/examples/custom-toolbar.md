# Thanh công cụ tùy chỉnh {#custom-toolbar}

## Hiển thị các mục cụ thể {#showing-specific-items}

Dùng prop `items` để chỉ hiển thị các nút thanh công cụ bạn cần. Truyền vào một mảng tên mục:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Dùng `|` làm dấu phân cách giữa các nhóm nút.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Thanh công cụ tùy chỉnh..." />

## Dropdown kiểu danh sách {#list-styles-dropdown}

Hậu tố `:styles` đổi nút danh sách thành dropdown các kiểu dấu đầu dòng/đánh số: nút danh sách mở ra một lưới các tùy chọn `list-style-type`, được lưu dưới dạng style nội tuyến. Lưới này hiển thị trong bề mặt menu của skin nên tuân theo skin đang dùng ([hướng dẫn Skin](/vi/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Mở các dropdown kiểu danh sách..." />

## Loại trừ các mục {#excluding-items}

Dùng `items-exclude` cùng với `items` để hiển thị hầu hết các mục trên thanh công cụ nhưng loại trừ một số mục cụ thể:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="Loại trừ các mục không mong muốn..." />

## Các nhóm tùy chỉnh {#custom-sections}

Gom các mục vào những nhóm có tên do bạn đặt bằng cách dùng một đối tượng:

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="Thanh công cụ với các nhóm tùy chỉnh..." />

## Tham khảo các nhóm thanh công cụ {#toolbar-sections-reference}

Các mục trên thanh công cụ được tổ chức thành các nhóm. Dưới đây là tất cả các nhóm có sẵn:

| Nhóm           | Các mục                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ẩn thanh công cụ {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="Không có thanh công cụ..." />

## Thành phần thanh công cụ tùy chỉnh {#custom-toolbar-components}

Thêm các nút của riêng bạn bằng prop `customExtensions`. Mỗi mục là một [nhóm thanh công cụ](/vi/api/types#section) — dùng tên nhóm có sẵn (`misc`, `media`, …) để gộp các nút của bạn vào một nhóm hiện có, hoặc một tên mới để tạo nhóm riêng được hiển thị sau các nhóm có sẵn:

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

Các thành phần tùy chỉnh được render bên trong `<Tiptapify>`, nên chúng có quyền truy cập các giá trị chia sẻ giống như các nút có sẵn — trình soạn thảo, bản dịch và cấu hình cấp trình soạn thảo:

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()` trả về cấu hình cấp trình soạn thảo (`variantBtn`, `variantField`), nhờ đó các thành phần tùy chỉnh tự động khớp với kiểu dáng của thanh công cụ có sẵn.
- Prop `variantBtn` vẫn được truyền vào mọi thành phần thanh công cụ để tương thích ngược — các thành phần viết trước khi có cấu hình chia sẻ vẫn hoạt động như cũ.
- `inject('tiptapifyI18n')` cung cấp cùng hàm dịch mà các nút có sẵn sử dụng.
