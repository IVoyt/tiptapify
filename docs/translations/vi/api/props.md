# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Kiểu:** `String | Object`
- **Mặc định:** `''`

Nội dung ban đầu của trình soạn thảo. Nhận chuỗi HTML hoặc đối tượng JSON của Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` chỉ là nội dung **ban đầu**; để liên kết hai chiều hãy dùng `v-model` (xem `modelValue`).

### `modelValue` {#modelvalue}

- **Kiểu:** `String | Object`
- **Mặc định:** `''`

Giá trị liên kết hai chiều cho `v-model`. Dùng `v-model` để giữ một giá trị reactive đồng bộ với trình soạn thảo. Sau mỗi lần chỉnh sửa, thành phần phát `update:modelValue` với HTML mới nhất, và `v-model` ghi nó trở lại ref của bạn. Khi chỉ dùng `v-model` (không có `:content`), giá trị được liên kết là nội dung ban đầu của trình soạn thảo.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Kiểu:** `String`
- **Mặc định:** `''`

Văn bản gợi ý hiển thị khi trình soạn thảo trống.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Kiểu:** `Number`
- **Mặc định:** `null`

Chiều cao tối thiểu của vùng nội dung trình soạn thảo, tính bằng pixel.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Hiện hoặc ẩn thanh công cụ.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Kiểu:** `Array<String> | Object`
- **Mặc định:** `[]`

Các mục thanh công cụ cần hiển thị. Truyền một mảng tên mục hoặc một đối tượng với các nhóm có tên. Xem [Mục thanh công cụ](/vi/api/toolbar-items).
Trong mảng, `'|'` chia các mục thành các nhóm (theo thứ tự đó, bất kể các nút đến từ nhóm nào) và `'~'` đẩy các mục sau nó về cuối thanh công cụ. Với các nhóm, một tên không phải mục có sẵn sẽ giữ chỗ cho nút tùy chỉnh cùng tên từ `customExtensions`; nếu không có nút như vậy thì chỗ đó bị bỏ.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Kiểu:** `Boolean`
- **Mặc định:** `false`

Khi là `true`, prop `items` chỉ định các mục cần **loại trừ** thay vì bao gồm.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Hiển thị bubble menu khi chọn văn bản: một hàng nút biểu tượng theo nhóm — đậm, nghiêng, gạch chân, gạch ngang | chỉ số trên, chỉ số dưới | tô sáng, mã nội tuyến | liên kết | xóa định dạng. Mỗi nút có tooltip kèm phím tắt và hiển thị khi mark của nó đang áp dụng cho vùng chọn. Menu ẩn khi chọn một khối (hình ảnh, widget), bên trong mã, và khi toàn bộ tài liệu được chọn.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Hiển thị menu nổi trên các dòng trống: tiêu đề 1, tiêu đề 2 và danh sách dấu đầu dòng, trong cùng hàng nút biểu tượng như bubble menu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Bật menu lệnh slash (nhập `/` để kích hoạt).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Hiển thị số từ ở chân trình soạn thảo.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Hiển thị số ký tự ở chân trình soạn thảo.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Kiểu:** `Number | null`
- **Mặc định:** `null`

Số ký tự tối đa được extension `CharacterCount` của Tiptap cho phép. Đặt `null` hoặc bỏ prop để soạn thảo không giới hạn. Khi đặt giá trị lớn hơn `0`, chân trang hiển thị chỉ báo tiến trình hình tròn SVG với các ngưỡng mã hóa bằng màu.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Kiểu:** `String`
- **Mặc định:** `'purple'`

Màu mặc định của chỉ báo tiến trình hình tròn hiển thị ở chân trang khi `limit` được đặt.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Kiểu:** `String`
- **Mặc định:** `'orange'`

Màu của chỉ báo tiến trình khi mức sử dụng vượt quá 75% giới hạn.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Kiểu:** `String`
- **Mặc định:** `'red'`

Màu của chỉ báo tiến trình khi đã đạt giới hạn ký tự.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Kiểu:** `TiptapifyFooterAlignment`
- **Mặc định:** `'end'`

Căn lề các mục trạng thái ở chân trang. Nhận `'start'`, `'center'` hoặc `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Kiểu:** `Boolean | TiptapifyAiOptions`
- **Mặc định:** `false`

Bật mục `ai` trên thanh công cụ. Trình soạn thảo dựng một yêu cầu `/v1/chat/completions` tương thích OpenAI và truyền nó cho `aiProvider`. Hãy dùng callback provider để gọi backend, BFF, endpoint được bảo vệ bằng OAuth, LM Studio hoặc wrapper SDK của bạn.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Ví dụ với LLM cục bộ LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Streaming được hỗ trợ bằng cách đặt `stream: true` và đẩy các token qua đối số `stream` của `aiProvider`. Trường kết quả trong hộp thoại AI cập nhật trực tiếp khi các chunk đến, và nút **Dừng** hủy yêu cầu đang chạy:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Hãy truyền `stream.signal` cho `fetch` (hoặc lời gọi SDK của bạn) để yêu cầu bị hủy khi người dùng nhấp **Dừng** hoặc đóng hộp thoại. Nội dung đã stream một phần vẫn nằm trong trường kết quả và có thể được áp dụng hoặc bỏ đi. Các provider không streaming có thể bỏ qua hoàn toàn đối số `stream` — nó là tùy chọn và tương thích ngược.

Các mô hình suy luận (Qwen thinking, DeepSeek, dòng o) stream "suy nghĩ" của chúng trong một delta `reasoning_content` riêng. Hãy chuyển tiếp các chunk đó qua `stream.onReasoning()` — khi `showReasoning: true`, hộp thoại hiển thị chúng trong bảng **Tư duy** có thể thu gọn phía trên trường kết quả (bảng bị ẩn theo mặc định). Đầu ra suy luận chỉ để hiển thị và không bao giờ được chèn vào trình soạn thảo.

Để cho phép người dùng chuyển chế độ tư duy của mô hình theo từng yêu cầu, hãy đặt `thinking: true` trong các tùy chọn AI. Khi đó hộp thoại hiển thị công tắc **Tư duy** (bật theo mặc định, đặt lại mỗi lần mở); plugin ghi giá trị công tắc vào yêu cầu dưới dạng `enable_thinking: true | false`, nên bạn không cần (và không nên) tự đặt `enable_thinking` trong `chatCompletionOptions` nữa:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Khi `thinking` là `false` hoặc bị bỏ qua, công tắc không được hiển thị và plugin gửi `enable_thinking: false`, để các mô hình mặc định có tư duy (Qwen3, DeepSeek, …) sẽ không tư duy.

Để cho phép người dùng chọn mức độ suy luận theo từng yêu cầu, hãy đặt `reasoningEffort` trong các tùy chọn AI. Khi đó hộp thoại hiển thị dropdown **Mức độ suy luận** được điền từ `options` — các mức độ tùy chỉnh (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Extension luôn tự thêm một mục `default` vào dropdown (mức cơ sở của chế độ tư duy), nên bạn không bao giờ liệt kê `default` trong cấu hình; trường `default` của tùy chọn chọn sẵn một trong các mức tùy chỉnh của bạn khi hộp thoại mở (nếu không thì `default` được chọn sẵn), và giá trị được đặt lại mỗi lần mở.
Giá trị được chọn quyết định plugin ghi gì vào yêu cầu: `default` giữ chế độ tư duy — công tắc **Tư duy** vẫn hoạt động và điều khiển `enable_thinking`; bất kỳ giá trị nào khác được gửi dưới dạng `reasoning_effort`, và công tắc Tư duy bị vô hiệu hóa khi giá trị đó được chọn (các provider từ chối `enable_thinking` và `reasoning_effort` trong cùng một yêu cầu).
Dropdown chỉ hiển thị khi `thinking` được bật và công tắc Tư duy đang bật — tắt tư duy sẽ ẩn nó và `reasoning_effort` không được gửi (yêu cầu quay về `enable_thinking: false`). Khi `options` bị thiếu hoặc rỗng, dropdown hoàn toàn không được render:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

Bảng **Tư duy** bị ẩn theo mặc định (`showReasoning` mặc định là `false`). Đặt `showReasoning: true` để hiển thị một bảng có thể thu gọn stream quá trình suy luận của mô hình (delta `reasoning_content`) trong khi vẫn bật tư duy — mô hình vẫn suy luận và kết quả được áp dụng theo cùng cách, chỉ có thêm quá trình suy luận từng bước được hiển thị:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Các ví dụ lời nhắc tùy chỉnh thay thế các giá trị mặc định đã được bản địa hóa:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` và `storage` là các hook tùy chọn do bên dùng sở hữu, dành cho tích hợp trực tiếp trên trình duyệt. Khóa API hoặc token của provider đặt trong mã trình duyệt hoặc bộ nhớ trình duyệt sẽ hiển thị với người dùng và không được coi là bí mật. Hãy ưu tiên mẫu adapter backend ở trên cho các bí mật trong production.

Dùng `mode: 'insert' | 'replace' | 'append'` để chọn sẵn chế độ chèn trên nút hành động của hộp thoại (**Chèn** / **Thay thế** / **Thêm vào cuối**). Khi không có `mode`, nút mặc định là **Thay thế** nếu có văn bản được chọn lúc mở hộp thoại và **Chèn** nếu không. Nút hành động là nút tách đôi: phần chính áp dụng kết quả ở chế độ được chọn sẵn, và phần "thêm" (⋮) nhỏ ở bên phải mở một menu liệt kê các chế độ khác — nhấp vào một chế độ sẽ áp dụng kết quả ngay ở chế độ đó.

Khi trình soạn thảo có `limit` (giới hạn số ký tự), một bộ đếm ký tự `generated / limit` được hiển thị bên dưới trường kết quả ngay khi có kết quả (cập nhật trực tiếp khi streaming và chuyển đỏ nhạt khi vượt giới hạn).
Hộp thoại cũng hiển thị cảnh báo `ai.limit_exceeded` ngay sau khi tạo nếu đầu ra AI vượt giới hạn.
Ở trạng thái đó nút **Chèn** và menu các chế độ thay thế của nó bị vô hiệu hóa — extension `CharacterCount` từ chối mọi lần chèn làm tài liệu vượt quá giới hạn, nên kết quả được áp dụng toàn bộ hoặc không gì cả: nó được chèn đầy đủ khi vừa, hoặc hoàn toàn không được chèn khi vượt giới hạn.
Hãy rút ngắn kết quả để bật lại hành động:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Dùng `systemPrompt`, `temperature`, `chatCompletionOptions` hoặc `createMessages(context)` để tùy chỉnh yêu cầu chat-completions tương thích OpenAI. `context` chứa `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` là văn bản của đoạn chứa vùng chọn, xung quanh nó (tối đa 500 ký tự mỗi phía, rỗng khi không có vùng chọn) — hãy gửi chúng cùng vùng chọn, nếu không mô hình sẽ coi đoạn trích là toàn bộ văn bản và hoàn thiện nó.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Kiểu:** `String`
- **Mặc định:** `undefined`

Phương án thay thế cho `aiProvider` tùy chỉnh: trỏ tính năng AI đến một endpoint LLM ở backend và tiptapify tự dựng và gửi yêu cầu. Backend nhận một payload JSON tối giản:

- **Luôn có:** `prompt` (yêu cầu nhập trong hộp thoại) và `instruction` (`systemPrompt` của bạn, tin nhắn system của `createMessages` tùy chỉnh, hoặc mặc định có sẵn).
- **Tùy chọn, chỉ gửi khi được đặt:** `stream` (chỉ `true`), `thinking` (công tắc **Tư duy** của hộp thoại, chỉ `true`), `reasoning_effort` (mức độ đã chọn) và `model`.

Phản hồi được chấp nhận linh hoạt: một chuỗi thuần, một đối tượng `{ content }`, hoặc một payload `choices` tương thích OpenAI. Khi yêu cầu có `stream: true`, phần thân phản hồi được đọc như một luồng SSE (các dòng `data:`, kết thúc bằng `data: [DONE]`): các delta kiểu OpenAI (`choices[0].delta.content` / `.reasoning_content`), một chunk đơn giản `{ type: 'content' | 'reasoning', data }`, một chunk phẳng `{ content, reasoning_content }` và các dòng `data` văn bản thuần đều được chấp nhận. Nếu backend bỏ qua `stream` và trả lời bằng phần thân thuần, phần thân đó sẽ được dùng thay thế. Phản hồi không OK sẽ hiển thị thông báo lỗi của backend (JSON `{ error }` / `{ message }` hoặc phần thân thô) trong hộp thoại. Nút **Dừng** và việc đóng hộp thoại sẽ hủy yêu cầu đang chạy; nội dung đã stream một phần được giữ lại trong trường kết quả.

Nếu cả `aiProvider` và `aiEndpoint` đều được đặt, `aiProvider` được ưu tiên.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Kiểu:** `Record<string, string>`
- **Mặc định:** `undefined`

Các header bổ sung gửi kèm yêu cầu `aiEndpoint`, được gộp đè lên `Content-Type: application/json`. Header `Authorization` đặt ở đây được giữ nguyên; nếu không, token từ `tokenProvider` (khi được đặt) được gửi dưới dạng `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Kiểu:** `String`
- **Mặc định:** `'Inter'`

Phông chữ mặc định cho nội dung trình soạn thảo.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Kiểu:** `String`
- **Mặc định:** `'px'`

Đơn vị đo cho các giá trị cỡ chữ.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Kiểu:** `String`
- **Mặc định:** `'0'`

Bán kính bo góc của vùng chứa trình soạn thảo. Nhận các giá trị bán kính của Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, v.v.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Kiểu:** `variantBtnTypes`
- **Mặc định:** `'tonal'`

Biến thể nút Vuetify cho các nút trên thanh công cụ. Giá trị được chia sẻ với mọi thành phần thanh công cụ thông qua cấu hình trình soạn thảo — các thành phần tùy chỉnh có thể đọc nó bằng [`useTiptapifyConfig`](/vi/api/types#usetiptapifyconfig). Xem [`variantBtnTypes`](/vi/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Kiểu:** `variantFieldTypes`
- **Mặc định:** `'outlined'`

Biến thể Vuetify cho các trường dropdown trên thanh công cụ. Giá trị được chia sẻ với mọi thành phần thanh công cụ thông qua cấu hình trình soạn thảo — các thành phần tùy chỉnh có thể đọc nó bằng [`useTiptapifyConfig`](/vi/api/types#usetiptapifyconfig). Xem [`variantFieldTypes`](/vi/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Kiểu:** `Array<toolbarSections>`
- **Mặc định:** `[]`

Cung cấp các nhóm thanh công cụ tùy chỉnh để mở rộng hoặc thêm mục thanh công cụ. Các thành phần của mỗi nhóm có thể đọc cấu hình trình soạn thảo dùng chung bằng [`useTiptapifyConfig`](/vi/api/types#usetiptapifyconfig). Xem [Thanh công cụ tùy chỉnh](/vi/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Kiểu:** `Boolean`
- **Mặc định:** `true`

Bật việc áp dụng style tương tác.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Kiểu:** `Boolean`
- **Mặc định:** `false`

Hiển thị thanh tiến trình không xác định trong khi trình soạn thảo đang tải.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Kiểu:** `String`
- **Mặc định:** `'default'`

Màu của thanh tiến trình tải. Nhận các giá trị màu theme của Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Kiểu:** `String`
- **Mặc định:** `'1px'`

Chiều cao của thanh tiến trình tải.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Kiểu:** `Number`
- **Mặc định:** `0`

Từ chừng này hình ảnh liên tiếp (không có gì xen giữa), trình soạn thảo sắp xếp chúng thành lưới ba cột có đánh số, dành cho các trang web hiển thị những hình ảnh như vậy dưới dạng slider. `0` tắt tính năng này.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Kiểu:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/vi/api/types#tiptapifyskininput))
- **Mặc định:** `'default'`

Diện mạo của phần khung trình soạn thảo: thanh công cụ, bubble menu, dropdown, hộp thoại, chân trang.

- `default` — diện mạo cổ điển: thanh công cụ nổi, các nhóm nút dạng hộp nổi, nút Vuetify có trạng thái nhấn dùng màu chính.
- `pastel` — diện mạo nhẹ nhàng: thanh công cụ phẳng phủ sắc nhạt dưới một đường kẻ mảnh, nút ghost có trạng thái nhấn trung tính, danh sách thả xuống nhẹ, hộp thoại mềm mại.

Các tính năng (chú thích hình ảnh, slider, dropdown căn lề, kiểu danh sách) hoạt động như nhau ở cả hai skin.

```vue
<Tiptapify skin="pastel" />
```

Bạn cũng có thể truyền một đối tượng skin nội tuyến: các giá trị ghi đè token (`colors` / `metrics`) và các cờ shape, có thể `extends` một skin đã đăng ký. Nó được phân giải trên `default` (hoặc cơ sở của nó), được render với class `tiptapify-skin-inline` (`tiptapify-skin-{name}` khi đối tượng có `name`), và các token của nó trở thành biến CSS `--tf-*` trên phần tử gốc của trình soạn thảo. Tên tùy chỉnh đến từ `registerSkin('mint', { … })` — xem [hướng dẫn Skin](/vi/guide/skins) để biết bảng token và các công thức.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Kiểu:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/vi/api/types#tiptapifyuploadoptions))
- **Mặc định:** `null`

Endpoint của [tải lên](/vi/guide/uploads): các tệp chọn trong hộp thoại hình ảnh và video (cùng ảnh bìa video, hình ảnh của thẻ liên kết) được gửi đến đó bằng `POST {endpoint}` (multipart `file` và `kind`), và tài liệu giữ URL mà nó trả lời (`{ "url": … }`).

Khi không có nó, hộp thoại hình ảnh vẫn nhận tệp: ảnh được chọn (và ảnh bìa video) được nhúng vào tài liệu dưới dạng data URL base64, và các ảnh base64 được giữ lại khi tải tài liệu. Hộp thoại video chỉ đưa ra **Tải lên** khi có prop này. Khi đặt `upload`, các ảnh base64 bị loại bỏ khi tải tài liệu.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Kiểu:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/vi/api/types#tiptapifycontentstyles))
- **Mặc định:** `'inline'`

Cách HTML đã lưu mang giao diện của thẻ liên kết, ảnh có chú thích, video, nội dung nhúng và danh sách công việc (xem [Kiểu nội dung](/vi/guide/content-styles)): `inline` ghi giao diện vào thuộc tính `style` của chúng, nên trang web hiển thị HTML đúng như nó vốn có; `classes` chỉ giữ lại class, dành cho trang web tải `tiptapify/content.css`. Trình soạn thảo bỏ qua các kiểu này khi tải HTML, nên cả hai loại HTML đều được tải lại giống nhau.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Kiểu:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/vi/api/types#tiptapifylinkpreviewoptions))
- **Mặc định:** `null`

Endpoint backend của [thẻ liên kết](/vi/guide/link-cards): nó đọc dữ liệu OpenGraph của các trang, điều mà trình duyệt không làm được (CORS). Trình soạn thảo kiểm tra nó bằng handshake khi khởi động (`GET {endpoint}` phải trả lời `200 { "tiptapifyLinkPreview": 1 }`); cho đến khi nó trả lời, sẽ không có gì đề xuất thẻ.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Sự kiện {#events}

### `editor-ready` {#editor-ready}

Được kích hoạt khi instance trình soạn thảo đã sẵn sàng.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Được kích hoạt khi nội dung trình soạn thảo thay đổi.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Hỗ trợ liên kết `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

Instance trình soạn thảo và hàm `t` có sẵn qua provide/inject của Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
