# Skin {#skins}

**Skin** là một diện mạo của phần khung trình soạn thảo: thanh công cụ, các nút và nhóm nút trong đó, bubble menu, dropdown menu, hộp thoại, khung bao quanh nội dung và phần khung chọn hình ảnh. Prop `skin` chọn nó:

```vue
<Tiptapify skin="pastel" />
```

Một skin gồm hai phần: **token** (màu sắc và kích thước dưới dạng biến CSS) và **hình dạng** (các biến thể cấu trúc mà token không thể diễn đạt). Hai skin tích hợp sẵn là `default` — diện mạo cổ điển, thanh công cụ nổi với các nhóm nút nổi — và `pastel`, diện mạo nhẹ nhàng. Skin tùy chỉnh được đối xử bình đẳng: `registerSkin()` và các đối tượng skin nội tuyến được xử lý bằng đúng cùng một cơ chế, còn các skin tích hợp sẵn chỉ là skin đã đăng ký, không phải trường hợp đặc biệt.

## Thuật ngữ: skin và theme Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — thuật ngữ hướng tới người dùng cho một diện mạo của phần khung trình soạn thảo: token + shape. Prop là `skin`, các kiểu là `TiptapifySkin*`, registry là `registerSkin()`, class gốc là `tiptapify-skin-{name}`.
- **theme** — dành riêng cho các theme sáng/tối của Vuetify. Các thành phần Tiptapify vẫn nhận prop `theme` từ tên theme hiện tại của Vuetify; hệ thống skin không bao giờ đụng tới chúng.

Chúng kết hợp được với nhau: hầu hết màu token có sẵn tham chiếu đến các biến theme Vuetify (`rgb(var(--v-theme-surface))`, …), nên các skin tự động theo chế độ sáng/tối. Các ô tối cố định trong cột classic — tay nắm thay đổi kích thước (`rgba(0, 0, 0, .5/.8)`), viền hình ảnh thường, bóng của bubble, và các bóng nâng của menu/hộp thoại — là có chủ ý: diện mạo classic vẽ khung tối trung tính ở cả hai theme, và đường cơ sở đã đo ghim chúng lại. Skin tùy chỉnh có thể tham chiếu tự do các biến theme — xem bảng token.

## Khái niệm {#concept}

### Token {#tokens}

Token là một CSS custom property có tên `--tf-*`. Khóa trong danh mục là dạng camelCase của hậu tố CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Giá trị là các chuỗi thuần — màu sắc, đầy đủ các shorthand viền, bóng, padding, bán kính bo góc.

Mọi quy tắc skin trong thư viện chỉ tồn tại **một lần**, đọc token của nó với giá trị dự phòng bằng giá trị classic (cơ sở):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Skin đã phân giải chỉ phát ra các **giá trị ghi đè** của nó dưới dạng biến; các giá trị dự phòng CSS mang phần cơ sở. Các biến nằm trên phần tử gốc của trình soạn thảo — và vì menu và hộp thoại được teleport ra khỏi nó, nên cũng nằm trên wrapper `SkinScope` của từng menu và trên chính thẻ hộp thoại, để các token theo mọi bề mặt.

### Shape {#shape}

Sáu cờ quyết định bộ quy tắc nào được áp dụng; các token tô màu cho chúng:

| cờ | giá trị | nó chuyển đổi gì |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar có độ nổi + không có đường kẻ mảnh bên trong so với thanh phẳng có màu nhạt |
| `groups` | `box` · `flat` | các nhóm thanh công cụ dạng hộp **VBtnGroup** nổi (markup 0.3.2: các nút liền nhau, token nhóm tô màu hộp) so với các dãy div flex thuần |
| `buttons` | `vuetify` · `quiet` | nút Vuetify gốc so với nút ghost có trạng thái nhấn trung tính |
| `bubble` | `card` · `flat` | giữ lại để tương thích: bubble menu là một hàng nút biểu tượng do token tô màu ở cả hai shape (các nút của chúng theo `buttons`) |
| `dialog` | `classic` · `soft` | đường phân cách dưới tiêu đề, nút đóng nổi so với thẻ mềm, nút đóng dạng chữ |
| `menu` | `vuetify` · `soft` | dropdown menu: danh sách Vuetify so với thẻ sáng có padding |

Shape đã phân giải được mã hóa trên phần tử gốc của trình soạn thảo dưới dạng sáu class `.tiptapify-shape-{flag}-{value}`, và được hiển thị dưới dạng `shape: ComputedRef<ResolvedShape>` trên [`useTiptapifyConfig()`](/vi/api/types#usetiptapifyconfig) cho các thành phần thanh công cụ tùy chỉnh.

### Extends {#extends}

Skin được phân giải trên nền classic, sau đó đến chuỗi `extends` của nó từ gốc trở đi, rồi đến các thành viên của chính nó:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Các mắt xích bị thiếu được phân giải thành chuỗi đã tích lũy (kèm cảnh báo dev); vòng lặp được phân giải thành classic (kèm cảnh báo dev). Skin đã đăng ký được tham chiếu theo tên; đối tượng skin nội tuyến có thể `extends` một tên đã đăng ký và không bao giờ vào registry toàn cục — skin tùy chỉnh không bao giờ rò rỉ giữa các trình soạn thảo. Các khóa token không xác định bị bỏ qua kèm cảnh báo dev.

Bản demo trực tiếp của cả ba dạng nằm ở [trang ví dụ Skin](/vi/examples/skins).

## Danh mục token {#token-catalog}

Các bảng dưới đây là **hợp đồng v1**: các khóa trong danh mục (`TiptapifySkinColors` / `TiptapifySkinMetrics`) là những tên bạn có thể đặt. Các ô classic là giá trị dự phòng CSS — giá trị mà các quy tắc cơ sở tô khi không có skin nào ghi đè token.

### Thanh công cụ / thanh {#toolbar-bar}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Mục / nhóm / đường phân cách {#items-groups-dividers}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | độ nổi Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (khoảng đệm: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Ô classic đã đo là `normal` — giá trị flex gốc của Vuetify, cũng là giá trị mà CSS dự phòng mang. Giá trị cơ sở trong danh mục `0px` là độ dài tường minh tương đương cho các giá trị ghi đè của skin.

<a id="shadow-cells"></a>² Các ô ghi "độ nổi Vuetify *n*" mang tính mô tả: chuỗi ba lớp bóng chính xác là giá trị đã đo trong fixture đường cơ sở đã commit (`src/skins/__fixtures__/skin-baseline.json`) và là CSS dự phòng. Với `groupShadow` đó là **độ nổi 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — dưới `groups: 'box'` phần này là một VBtnGroup (`elevation="4"`), và quy tắc token tô hộp bằng bộ ba bóng này lên trên độ nổi riêng của nhóm: hộp sở hữu độ nổi, các nút con liền nhau không mang độ nổi nào.

### Nút {#buttons}

Các token này **chỉ được dùng dưới `buttons: 'quiet'`** — xem [Khả năng tác động](#reachability).

| token | biến CSS | giá trị quiet (classic: Vuetify gốc) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menu (vùng chọn, dòng trống, hình ảnh) {#bubble-menus-selection-empty-line-image}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | giống |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | giống |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | giống |

### Dropdown menu {#dropdown-menus}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | độ nổi Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Hộp **danh sách** (bán kính, bóng, padding danh sách) của menu classic hiện là một quy tắc skin — wrapper token `SkinScope` nằm giữa quy tắc con của chính Vuetify và danh sách, nên thư viện khôi phục các pixel đó dưới dạng quy tắc skin đọc các token ở trên. Các pixel của **mục** vẫn là Vuetify gốc (fixture đo các giá trị mặc định của Vuetify ở đó): bốn token mục không có tác dụng khi `menu: 'vuetify'`.

### Hộp thoại {#dialogs}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | field default (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Khung (wrapper viền của trình soạn thảo) {#frame-editor-border-wrapper}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, không có cạnh trên | viền đầy đủ |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Dưới shape thanh công cụ phẳng, khung còn tô thêm phần chênh lệch theo từng cạnh (một cạnh trên, và cạnh dưới với độ mờ viền 1,6×). Phần chênh lệch đó thuộc về shape, không thuộc token: token không tác động tới nó.

### Hình ảnh và tay nắm thay đổi kích thước {#images-and-resize-handles}

| token | biến CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (được chọn) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (khi hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Thanh công cụ hình ảnh theo cờ `buttons`: dưới shape quiet nó có bề mặt quiet — khoảng cách 2px/4px của nó đọc `--tf-bubble-gap` / `--tf-bubble-padding` với giá trị dự phòng của menu hình ảnh; không có token riêng cho thanh công cụ hình ảnh.

### Không có trong danh mục (vùng lối thoát) {#not-in-the-catalog-escape-hatch-territory}

Một số kích thước được nêu trong phần tổng quan thiết kế không có token trong danh mục v1: **chiều cao thanh công cụ, chiều rộng khung, bán kính khung, chiều rộng nút, padding nút, chiều rộng hộp thoại**. Các bảng danh mục ở trên là hợp đồng; với các pixel này hãy mở [lối thoát](#escape-hatch-the-root-class) và tạo kiểu trực tiếp cho các class ổn định.

## Khả năng tác động {#reachability}

Hợp đồng, nêu một lần và được mọi nhóm ở trên tuân thủ:

> Token chỉ tô màu một bề mặt khi shape kích hoạt bề mặt đó; các hiển thị Vuetify gốc được tạo kiểu thông qua màu theme của Vuetify.

Theo từng nhóm:

- **Thanh công cụ, khung, khung hình ảnh/tay nắm** — hoạt động ở mọi shape; token tô màu cho chúng, các ô classic là diện mạo gốc mà token quay về.
- **Hộp nhóm** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — dưới `groups: 'box'` phần này là một VBtnGroup (cấu trúc 0.3.2: các nút liền nhau, hộp mang độ nổi); các quy tắc hộp tô màu nó bằng token nhóm, và `--tf-group-height` giữ hợp đồng 32px bằng `!important` (quy tắc density của Vuetify xung đột với nó, như ở 0.3.2). Dưới `groups: 'flat'` các phần là các dãy div thuần (trong suốt, không bóng, bán kính 0 là cơ sở của shape).
- **Đường kẻ mảnh phân cách** (`dividerWidth/Height/Color`) — đường kẻ mảnh hiển thị là tính năng của `groups: 'flat'`; ở shape hộp, đường phân cách là một khoảng đệm kích thước bằng không (`margin: 0 4px` từ quy tắc cơ sở).
- **Padding/khoảng cách của mục** — dãy gọn `6px 8px` bị chặn bởi thanh phẳng (`toolbar: 'flat'`), khoảng cách nhóm bị chặn bởi các phần phẳng (`groups: 'flat'`); thanh nổi giữ các số đo classic.
- **Nút** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — không có tác dụng dưới `buttons: 'vuetify'`: các nút Vuetify gốc tự tô trạng thái của chúng. Hãy tạo kiểu cho chúng bằng màu theme Vuetify (`primary`, `surface`, …) — các shape classic cố ý kế thừa chúng.
- **Số đo mục menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — không có tác dụng dưới `menu: 'vuetify'`; Vuetify sở hữu các pixel mục đó. Hộp **danh sách** menu (bán kính/bóng/padding) do skin tô ở cả hai shape (xem [ghi chú menu](#menu-classic-note)).
- **Khung mềm của hộp thoại** (`dialogActionBtn*`, `dialogFieldRadius`, các padding mềm, đường phân cách bị bỏ) — được tô dưới `dialog: 'soft'`; dưới `dialog: 'classic'` hộp thoại là một VCard với các padding classic.
- **Khung bubble** — các menu vùng chọn, dòng trống và hình ảnh là một hàng nút biểu tượng ở cả hai shape, do các token bubble tô màu; `bubble` không còn thay đổi markup của chúng.

Giá trị ghi đè bằng giá trị cơ sở trong danh mục thì **không được phát ra** — dưới shape không phải classic, cơ sở riêng của shape được tô qua CSS dự phòng, nên việc "khôi phục" một giá trị classic (ví dụ đặt `buttonActiveBg` về `rgb(var(--v-theme-primary))` dưới `buttons: 'quiet'`) âm thầm không có tác dụng. Để ép một giá trị trông như classic dưới shape không phải classic, hãy đặt một giá trị ghi đè khác với cơ sở trong danh mục — một literal tương đương như `rgba(var(--v-theme-primary), 1)` tô giống hệt và vượt qua được việc bỏ qua.

Token cố ý không được nối vào các đường dẫn gốc — đó là điều giữ `default` giống từng pixel với diện mạo classic trong khi mọi thứ đi qua danh mục.

## Công thức {#recipes}

### Mở rộng pastel {#extend-pastel}

Kế thừa shape quiet và tô lại vài bề mặt. Các tên đã đăng ký dùng được trên mọi trình soạn thảo:

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

Shape (flat/quiet/soft) đến từ pastel; các token không đụng tới giữ giá trị của pastel — lớp nền nút quiet vẫn trung tính, chỉ những gì bạn ghi đè mới thay đổi. Đây là skin được render trực tiếp trên [trang ví dụ](/vi/examples/skins#custom-mint).

### Mở rộng default {#extend-default}

Giữ cấu trúc classic, tinh chỉnh màu sắc:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` là gốc ngầm định, nên có thể bỏ khóa này: `{ toolbar: 'flat', … }` cũng bắt đầu từ classic.

### Tùy chỉnh hoàn toàn {#full-custom}

Không `extends`, không đăng ký: truyền đối tượng cho prop `skin` và đặt tự do các cờ shape và token. `name` đặt nhãn riêng của bạn lên class gốc (xem bên dưới); không có thì là `tiptapify-skin-inline`.

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

`defineSkin` là hàm trợ giúp identity cho các định nghĩa const có kiểu (nó không vào registry nào). Các cờ shape có thể được đặt riêng lẻ — mọi cờ bạn bỏ qua vẫn là classic.

## Lối thoát: class gốc {#escape-hatch-the-root-class}

Mọi phần tử gốc của trình soạn thảo đều mang `tiptapify-skin-{name}` (`tiptapify-skin-inline` cho đối tượng nội tuyến không tên). Thư viện **không bao giờ gắn quy tắc nào theo tên skin** — class này là của bạn:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Các hook ổn định để viết CSS:

| class | vị trí |
|---|---|
| `tiptapify-skin-{name}` | phần tử gốc của trình soạn thảo |
| `tiptapify-shape-{flag}-{value}` ×6 | phần tử gốc của trình soạn thảo — shape đã phân giải |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | thanh công cụ và các nhóm của nó |
| `tiptapify-quiet-buttons` | phần tử gốc của thanh công cụ và bubble dưới `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | hàng của mọi bubble menu và đường kẻ mảnh giữa các nhóm của nó |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | các hàng menu vùng chọn, dòng trống và hình ảnh |
| `tiptapify-btn--active` | nút đang được nhấn của bubble menu (một mark đang bật, float của hình ảnh) |
| `tiptapify-menu` · `tiptapify-menu--soft` | nội dung overlay dropdown, phần mang các quy tắc menu mềm |
| `tiptapify-skin-scope` | div phạm vi token bên trong các menu được teleport |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | thẻ hộp thoại và phần mang quy tắc mềm của nó |
| `tiptapify-frame` | wrapper viền của trình soạn thảo |

**Phòng thủ trước theme của người dùng.** Lớp skin được xây dựng để sống sót qua các theme admin vốn thêm padding và tô lại phần bên trong của Vuetify: các quy tắc chặn theo class shape/carrier, dùng class nhân đôi (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) để tăng độ ưu tiên, và chỉ giữ `!important` ở nơi trường hợp theme admin của commit cơ sở chứng minh là cần thiết (bộ phòng thủ menu.css). Các quy ước giúp các giá trị ghi đè của riêng bạn hoạt động trên cùng chiến trường:

- giới hạn CSS của bạn trong `.tiptapify-skin-{name}` (hoặc một class shape) — không bao giờ trên phần bên trong trần của Vuetify;
- ưu tiên token (`--tf-*`) cho các kích thước trong danh mục, class cho phần còn lại;
- khớp việc nhân đôi khi ghi đè các thành phần Vuetify (một `.v-list-item` đơn lẻ sẽ thua các quy tắc skin).

## Hợp đồng hiển thị (ghi chú cho người đóng góp) {#visual-contract-contributor-note}

Các style đã tính toán của các skin có sẵn được ghim bởi fixture đường cơ sở `src/skins/__fixtures__/skin-baseline.json` (13 mục × sáng/tối): lớp CSS hoàn tất khi ma trận đo được khớp với nó. Ghi chú đọc fixture:

- Các kích thước hover/active không thể ép từ trang, nên bản ghi đọc **văn bản khai báo của quy tắc CSSOM trúng đầu tiên** cho từng selector hover và phân giải nó qua một phần tử probe bên trong phần tử gốc skin (trường `resolved`) — đó là hợp đồng của quy tắc thắng, không phải ảnh chụp `:hover` trực tiếp.
- `_meta.selectors.menu` ghi lại văn bản selector trước `SkinScope`. Fixture bị đóng băng (giá trị chuẩn), nên trường này lỗi thời có chủ ý; bundle ghi lại ghim selector hiện tại.
- Fixture mang các thay đổi được cho phép trong `_meta.notes`: việc khôi phục markup VBtnGroup ngày 2026-10-18 dưới `groups: 'box'` đã đo lại các trường nút con `groupBtn`/`buttonsActive` của classic (góc liền nhau, hộp sở hữu độ nổi). Các trường Pastel không bị đụng tới — một thay đổi hình ảnh có chủ ý chỉ cập nhật các ô classic bị ảnh hưởng, ghi một ghi chú và đi kèm một dòng CHANGELOG.

## Xem thêm {#see-also}

- [Ví dụ Skin](/vi/examples/skins) — classic, pastel và skin mint tùy chỉnh, chạy trực tiếp.
- [prop `skin`](/vi/api/props#skin) · [các kiểu skin](/vi/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/vi/api/types#tiptapifyskininput).
