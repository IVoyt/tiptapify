# Lệnh Slash {#slash-commands}

Lệnh slash cung cấp một menu chèn nhanh xuất hiện khi bạn nhập `/` ở đầu dòng.

## Bật lệnh Slash {#enabling-slash-commands}

Lệnh slash được bật theo mặc định. Để điều khiển chúng một cách tường minh:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Bản demo lệnh slash..."
:slash-commands="true"
/>

## Các lệnh có sẵn {#available-commands}

Nhập `/` trong trình soạn thảo để xem bảng lệnh. Các lệnh có sẵn gồm:

| Lệnh            | Mô tả                                  |
|-----------------|----------------------------------------|
| `/h1` - `/h6`   | Chèn tiêu đề (cấp 1-6)                 |
| `/bulletList`   | Chèn danh sách dấu đầu dòng            |
| `/numberedList` | Chèn danh sách đánh số                 |
| `/taskList`     | Chèn danh sách công việc               |
| `/code`         | Chèn mã nội tuyến                      |
| `/codeBlock`    | Chèn khối mã                           |
| `/quote`        | Chèn khối trích dẫn                    |
| `/image`        | Chèn hình ảnh (mở hộp thoại URL)       |
| `/video`        | Nhúng video YouTube                    |
| `/table`        | Chèn bảng                              |
| `/link`         | Chèn siêu liên kết                     |
| `/divider`      | Chèn đường kẻ ngang                    |
| `/emoji`        | Mở bộ chọn emoji                       |
| `/specialChars` | Mở bảng ký tự đặc biệt                 |

## Cách hoạt động {#how-it-works}

1. Đặt con trỏ ở đầu dòng hoặc sau một khoảng trắng
2. Nhập `/` — bảng lệnh xuất hiện
3. Tiếp tục nhập để lọc các lệnh
4. Nhấn `Enter` hoặc bấm chuột để chèn lệnh đã chọn

## Tắt lệnh Slash {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Lệnh Slash với menu nổi {#slash-commands-with-floating-menu}

Kết hợp lệnh slash với menu nổi để có trải nghiệm soạn thảo tốt nhất:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Lệnh slash** (`/`) — được kích hoạt khi nhập `/` ở đầu dòng
- **Menu nổi** — xuất hiện khi bạn đặt con trỏ trên một dòng trống (đưa ra các thao tác cấp khối)
- **Bubble menu** — xuất hiện khi bạn chọn văn bản (đưa ra các định dạng nội tuyến)

## Lọc các lệnh có sẵn {#filtering-available-commands}

Bạn có thể chỉ định các lệnh cần đưa vào bằng cách truyền một mảng ID lệnh:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Các ID lệnh có sẵn {#available-command-ids}

| ID             | Mô tả                      |
|----------------|----------------------------|
| `h1` - `h6`    | Tiêu đề cấp 1-6            |
| `bulletList`   | Danh sách dấu đầu dòng     |
| `numberedList` | Danh sách đánh số          |
| `taskList`     | Danh sách công việc        |
| `code`         | Mã nội tuyến               |
| `codeBlock`    | Khối mã                    |
| `quote`        | Khối trích dẫn             |
| `image`        | Hình ảnh                   |
| `video`        | Video YouTube              |
| `table`        | Bảng                       |
| `link`         | Liên kết                   |
| `divider`      | Đường kẻ ngang             |
| `emoji`        | Emoji                      |
| `specialChars` | Ký tự đặc biệt             |
