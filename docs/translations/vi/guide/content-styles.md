# Kiểu nội dung {#content-styles}

Một số nội dung mà trình soạn thảo lưu cần giao diện riêng trên trang hiển thị nó: thẻ liên kết, ảnh có chú thích và căn lề float, video và nội dung nhúng vừa với chiều rộng văn bản, danh sách công việc có hộp kiểm bên cạnh mỗi mục. Nếu thiếu, thẻ liên kết chỉ là một liên kết trơn với ảnh và văn bản dính vào nhau.

Prop `contentStyles` cho biết HTML đã lưu mang giao diện đó như thế nào:

| `contentStyles` | HTML đã lưu | Trên trang web |
|---|---|---|
| `inline` (mặc định) | giao diện được ghi vào thuộc tính `style` của các phần tử này | không cần tải gì: HTML hiển thị đúng như nó vốn có |
| `classes` | chỉ có class và thuộc tính `data-` | tải `tiptapify/content.css` và đặt HTML vào một phần tử có class `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Cả hai đều mang cùng các quy tắc, chính là những quy tắc mà trình soạn thảo dùng để hiển thị nội dung, nên trang trông giống trình soạn thảo trong cả hai trường hợp. Chỉ các phần tử này được áp dụng: tiêu đề, đoạn văn, danh sách, bảng và phần văn bản còn lại vẫn dùng kiểu riêng của trang web.

## Inline style {#inline-styles}

Đây là mặc định. Một thẻ liên kết gọn (compact) được lưu như sau:

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

- **Màu sắc vẫn do trang web quyết định.** Văn bản kế thừa màu của nó; văn bản mờ và đường viền dùng độ mờ và màu xám bán trong suốt, nên hiển thị tốt trên cả trang sáng lẫn trang tối. Hãy đặt màu chữ cho từng giao diện trên trang web như bình thường.
- **Không cần media query.** Thẻ gọn tự đặt ảnh phía trên văn bản trong cột hẹp; video và nội dung nhúng không bao giờ rộng hơn văn bản.
- **Trang web vẫn có thể đặt lại kiểu cho chúng**, các class vẫn còn đó. Inline style thắng quy tắc của class, nên quy tắc như vậy cần `!important`.
- **Bộ lọc (sanitizer) phải giữ lại thuộc tính `style`** trên các phần tử này, nếu không chúng sẽ mất giao diện.

## Class và content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` nhỏ gọn và không chứa Vue hay Vuetify. Các quy tắc của nó được bọc trong `:where(.tiptapify-content)`, nên có độ ưu tiên bằng không: mọi quy tắc của trang web đều thắng chúng mà không cần `!important`. Hãy dùng cách này khi trang web muốn giữ giao diện ở một chỗ, hoặc tự tạo kiểu cho nội dung của mình.

`contentCss(scope)` trả về cùng stylesheet đó dưới dạng chuỗi, dùng cho một class khác ngoài `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Tải lại HTML {#loading-html-back}

Trình soạn thảo chỉ đọc các phần tử này qua thuộc tính và class: thẻ liên kết qua `data-link-card`, ảnh qua `src`, kích thước và float, công việc qua `data-checked`. Inline style của chúng bị bỏ qua khi tải HTML và được ghi lại khi lưu. Nhờ vậy cùng một HTML đi qua đi lại mà không thay đổi, tài liệu lưu bằng `inline` tải sạch với `classes` và ngược lại, và phiên bản trình soạn thảo mới hơn sẽ cập nhật giao diện của tài liệu vào lần lưu kế tiếp.

Định dạng văn bản không bị động đến: màu hay cỡ chữ và căn lề của đoạn văn là nội dung, và trình soạn thảo vẫn đọc chúng từ style.

Để chuyển HTML dùng class thành HTML dùng inline style bên ngoài trình soạn thảo (tài liệu cũ, email), hãy dùng `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Hàm này cần DOM (trình duyệt, hoặc jsdom trên máy chủ) và trả về nguyên HTML nếu không có DOM.

## Slider ảnh {#image-sliders}

Trình soạn thảo đánh dấu các ảnh nằm liền nhau là một slider khi bạn viết (xem prop `imageSlider`); HTML đã lưu giữ chúng thành các figure nối tiếp nhau. Việc hiển thị chúng như một slider do script riêng của trang web đảm nhận.
