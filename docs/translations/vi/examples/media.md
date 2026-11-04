# Media (Phương tiện) {#media}

## Hình ảnh {#images}

Chèn hình ảnh từ một URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

Nút hình ảnh mở hộp thoại hình ảnh:

- **Qua URL** hoặc **Tải lên**. Khi không có [endpoint tải lên](/vi/guide/uploads), tệp được chọn sẽ được nhúng dưới dạng data URL base64; khi có, tệp được gửi đến máy chủ của bạn.
- **Văn bản thay thế** (hộp thoại nhắc bạn khi để trống) và **chú thích** bên dưới hình ảnh.
- **Kích thước**: gốc, rộng bằng văn bản, hoặc chiều rộng × chiều cao tùy chỉnh với khóa tỷ lệ.
- **Vị trí**: căn giữa trên một dòng riêng, hoặc nổi bên trái hoặc bên phải văn bản.

Hình ảnh được chọn có các tay nắm thay đổi kích thước (mỗi lần thay đổi là một bước hoàn tác) và một thanh công cụ phía trên: nổi sang trái hoặc phải, tải xuống, chỉnh sửa, xóa. Nhấp đúp sẽ mở hộp thoại.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video {#videos}

Nhúng video YouTube và Vimeo, hoặc một tệp video:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Nút video mở hộp thoại video:

- **Liên kết YouTube hoặc Vimeo** trở thành trình phát của chúng; hộp thoại hiển thị nhà cung cấp được nhận dạng cùng bản xem trước, và **Bắt đầu từ** (điền sẵn từ `?t=`) khi trình phát hỗ trợ.
- **Liên kết đến tệp video** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) trở thành thẻ `<video>` có ảnh bìa, điều khiển, tự động phát (tắt tiếng) và lặp lại. Liên kết cần có giao thức (`https://`, `http://`), `//host` hoặc `/path`: hộp thoại không bao giờ tự đoán.
- **Tải lên** gửi một tệp video đến máy chủ của bạn; mục này chỉ hiển thị khi có [endpoint tải lên](/vi/guide/uploads).
- **Kích thước**: responsive 16:9, hoặc chiều rộng × chiều cao tùy chỉnh với khóa tỷ lệ.

URL YouTube được dán vào văn bản cũng sẽ được nhúng. Nhấp vào trình phát sẽ chọn nó thay vì phát, để nút trên thanh công cụ hiển thị nó; nhấp đúp sẽ mở hộp thoại.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Dán URL YouTube để nhúng video..." />

## Iframe {#iframes}

Nhúng một trang theo địa chỉ hoặc theo mã iframe từ menu Chia sẻ (Share) hoặc Nhúng (Embed) của trang đó:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Hộp thoại iframe đọc mã đã dán (địa chỉ, kích thước, tiêu đề, quyền, sandbox, tải chậm, toàn màn hình) và cho biết nó lấy được gì từ mã đó; mã chứa script hoặc các thẻ khác sẽ bị từ chối. Hộp thoại có bản xem trước và có **tiêu đề cho trình đọc màn hình**, kích thước (responsive theo tỷ lệ của mã, hoặc tùy chỉnh với khóa tỷ lệ), và trong **Nâng cao** có tên, `allow`, `sandbox`, tải chậm và viền. Địa chỉ cần có `https://` hoặc `http://`. Nhấp đúp vào một phần nhúng sẽ mở hộp thoại.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Nhập URL để nhúng dưới dạng iframe..." />

## Bảng {#tables}

Chèn và chỉnh sửa bảng:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Sau khi chèn bảng, bạn có thể:
- Thêm/xóa hàng và cột
- Chọn ô
- Xóa toàn bộ bảng

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Dùng nút bảng để chèn bảng..." />

## Liên kết {#links}

Chèn siêu liên kết:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Hộp thoại liên kết nhận địa chỉ đúng như được nhập: `https://…`, bất kỳ giao thức nào khác (`ftp://`, `ssh://`, giao thức nội bộ), `mailto:`, `tel:`, `#anchor` hoặc `/page`. Nó không bao giờ tự thêm giao thức: địa chỉ không có giao thức (`example.com`, `internal.host:8080`) sẽ có các chip để thêm `https://`, `http://` hoặc `ftp://`, và giữ nguyên như đã nhập nếu bạn không thêm. Các địa chỉ `javascript:`, `vbscript:` và `data:` bị từ chối.

Hộp thoại cũng có văn bản liên kết, **Mở trong tab mới** (thêm `noopener noreferrer`), và trong **Nâng cao** có các giá trị `rel` dưới dạng chip (mọi giá trị: Enter, dấu cách hoặc dấu phẩy để thêm) và một class CSS.

Với prop [`linkPreview`](/vi/api/props#linkpreview), cùng hộp thoại này hiển thị liên kết dưới dạng thẻ có hình ảnh, tiêu đề và mô tả của trang, và URL dán vào một dòng trống sẽ đề xuất **Liên kết / Thẻ** — xem [Thẻ liên kết](/vi/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Chọn văn bản và bấm liên kết để thêm siêu liên kết..." />

## Emoji {#emoji}

Chèn emoji từ bộ chọn có sẵn với 10 danh mục:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Bộ chọn emoji có ô tìm kiếm/lọc để tìm nhanh các emoji cụ thể.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Bấm nút emoji để chèn emoji..." />

## Ký tự đặc biệt (Charmap) {#special-characters-charmap}

Chèn ký tự đặc biệt, mũi tên, chữ cái Hy Lạp, ký hiệu toán học và nhiều hơn nữa:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Các danh mục gồm:
- Mũi tên
- Tiền tệ
- Chữ cái Hy Lạp
- Ký hiệu toán học
- Khác

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Bấm charmap để chèn ký tự đặc biệt..." />

## Kết hợp các công cụ phương tiện {#combining-media-tools}

Một thanh công cụ phương tiện đầy đủ tính năng:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Thanh công cụ phương tiện đầy đủ..." />
