# Mục thanh công cụ {#toolbar-items}

Tất cả các mục thanh công cụ có sẵn, sắp xếp theo nhóm.

## Actions (Thao tác) {#actions}

| Mục      | Mô tả                       |
|----------|-----------------------------|
| `undo`   | Hoàn tác thay đổi gần nhất  |
| `redo`   | Làm lại thay đổi vừa hoàn tác |
| `resetChanges` | Hủy mọi thay đổi kể từ khi mở trình soạn thảo và xóa lịch sử (hỏi trước) |

## AI {#ai}

| Mục  | Mô tả                                    |
|------|------------------------------------------|
| `ai` | Mở hộp thoại lời nhắc AI nếu đã cấu hình |

## Format (Định dạng) {#format}

| Mục         | Mô tả                |
|-------------|----------------------|
| `bold`      | Bật/tắt chữ đậm      |
| `italic`    | Bật/tắt chữ nghiêng  |
| `underline` | Bật/tắt gạch chân    |
| `strike`    | Bật/tắt gạch ngang   |

## Format Extra (Định dạng bổ sung) {#format-extra}

| Mục          | Mô tả                                        |
|--------------|----------------------------------------------|
| `sup`        | Bật/tắt chỉ số trên                          |
| `sub`        | Bật/tắt chỉ số dưới                          |
| `code`       | Bật/tắt mã nội tuyến                         |
| `codeBlock`  | Chèn khối mã có tô sáng cú pháp              |
| `blockquote` | Chèn khối trích dẫn                          |

## Style (Kiểu) {#style}

| Mục              | Mô tả                                      |
|------------------|--------------------------------------------|
| `heading`        | Dropdown chọn cấp tiêu đề (H1-H6)          |
| `fontFamily`     | Dropdown chọn phông chữ                    |
| `fontSize`       | Dropdown chọn cỡ chữ                       |
| `lineHeight`     | Đặt chiều cao dòng                         |
| `textColor`      | Màu chữ: bảng màu, màu gần đây, HEX, công cụ lấy màu, bộ chọn tùy chỉnh |
| `highlightColor` | Màu tô sáng: cùng bộ chọn, "Không tô sáng" ở đầu |

Mục `heading` nhận các tùy chọn sau dấu hai chấm: các cấp tiêu đề, `p` để thêm mục đoạn văn, và `inline` để hiển thị chúng dưới dạng các nút riêng thay vì dropdown:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Alignment (Căn lề) {#alignment}

| Mục       | Mô tả             |
|-----------|-------------------|
| `left`    | Căn trái          |
| `center`  | Căn giữa          |
| `right`   | Căn phải          |
| `justify` | Căn đều hai bên   |
| `align`   | Dropdown căn lề; `align:left,center,right` giới hạn các tùy chọn của nó |

## List (Danh sách) {#list}

| Mục            | Mô tả                         |
|----------------|-------------------------------|
| `bulletList`   | Bật/tắt danh sách dấu đầu dòng |
| `orderedList`  | Bật/tắt danh sách đánh số     |
| `taskList`     | Bật/tắt danh sách công việc (hộp kiểm) |
| `indent`       | Thụt lề khối hiện tại         |
| `outdent`      | Giảm thụt lề khối hiện tại    |

## Media (Phương tiện) {#media}

| Mục       | Mô tả                             |
|-----------|-----------------------------------|
| `link`    | Chèn/sửa liên kết, hoặc [thẻ liên kết](/vi/guide/link-cards) với `linkPreview` |
| `image`   | Chèn/sửa hình ảnh: qua URL hoặc tải lên, văn bản thay thế, chú thích, kích thước, vị trí |
| `video`   | Chèn/sửa video YouTube, Vimeo hoặc tệp video (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Nhúng một trang theo địa chỉ hoặc mã iframe của nó |
| `emoji`   | Mở bộ chọn emoji (10 danh mục)    |
| `charmap` | Mở bộ chọn ký tự đặc biệt         |
| `table`   | Chèn bảng                         |

## Misc (Khác) {#misc}

| Mục             | Mô tả                                      |
|-----------------|--------------------------------------------|
| `line`          | Chèn đường kẻ ngang                        |
| `pagebreak`     | Chèn ngắt trang                            |
| `source`        | Bật/tắt chế độ xem mã nguồn HTML thô       |
| `preview`       | Bật/tắt chế độ xem trước HTML              |
| `fullscreen`    | Bật/tắt chế độ soạn thảo toàn màn hình     |
| `formatClear`   | Xóa toàn bộ định dạng khỏi vùng chọn       |
| `invisibleChar` | Chèn ký tự ẩn (dấu cách, v.v.)             |

## Dấu phân cách {#separators}

Dùng `|` làm dấu phân cách giữa các nhóm nút trong prop `items` dạng mảng:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Ví dụ thanh công cụ hoàn chỉnh {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
