# Extension AI {#ai-extension}

Extension AI thêm một nút trên thanh công cụ mở hộp thoại lời nhắc, gửi yêu cầu đến nhà cung cấp do bạn chọn, hiển thị kết quả được stream, và chèn nó vào trình soạn thảo thông qua nút hành động theo từng chế độ (**Chèn** / **Thay thế** / **Thêm vào cuối**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

Prop `ai` nhận `true` (các tùy chọn với giá trị mặc định) hoặc một đối tượng tùy chọn (`TiptapifyAiOptions`). Mục `ai` trên thanh công cụ luôn được đăng ký, nhưng nút sẽ bị **vô hiệu hóa** trừ khi `aiProvider` được đặt.

Xem [ví dụ AI](/vi/examples/ai) để có bản demo chạy được và [Props](/vi/api/props#ai) để xem tham chiếu đầy đủ các tùy chọn.

## Kiến trúc {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` chuẩn hóa prop `ai`: `ai: true` trở thành một đối tượng tùy chọn rỗng, `promptExamples` quay về các giá trị mặc định đã được bản địa hóa, và kết quả được cung cấp cho các thành phần con qua `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` hoặc `false`).
- Mục thanh công cụ (`src/components/Toolbar/ai.ts`) render `Button.vue`. Nút kiểm tra `aiProvider` có sẵn hay không và mở `Dialog.vue`.
- `Dialog.vue` quản lý toàn bộ vòng đời yêu cầu: dựng yêu cầu, gọi nhà cung cấp, streaming và chèn kết quả.

## Hợp đồng của provider {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Provider là một hàm async thuần do bạn triển khai. tiptapify không tự gọi API nào — mọi thứ có thể xử lý một đối tượng `request` tương thích OpenAI đều dùng được (fetch, một SDK, một adapter backend). Ngoại lệ là chế độ backend `aiEndpoint` (xem [Tạo nội dung qua backend](#backend-generation-aiendpoint)), trong đó tiptapify gửi yêu cầu đến endpoint của bạn.

**Request** (`TiptapifyAiRequest`) được trải ra từ `chatCompletionOptions` của bạn, sau đó được plugin bổ sung:

| Trường | Nguồn |
| --- | --- |
| `messages` | `createMessages(context)` nếu được cung cấp, nếu không thì cặp mặc định: một tin nhắn system (`systemPrompt` của bạn hoặc mặc định có sẵn) và một tin nhắn user nhúng lời nhắc cùng văn bản đang chọn trong trình soạn thảo kèm phần văn bản xung quanh và quy tắc chỉ trả lời cho phần được chọn (hoặc toàn bộ văn bản khi không chọn gì) |
| `model` | tùy chọn `model`, khi được đặt |
| `temperature` | tùy chọn `temperature`, khi được đặt |
| `stream` | tùy chọn `stream`, hoặc `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | công tắc tư duy / dropdown mức độ — xem bên dưới |

**Context** (`TiptapifyAiEditorContext`) cung cấp cho provider toàn bộ trạng thái trình soạn thảo: `prompt`, `selectedText`, `textBefore` / `textAfter` (văn bản của đoạn chứa vùng chọn, xung quanh nó, tối đa 500 ký tự mỗi phía), `text`, `html`, `json`, và `mode` (`insert` / `replace` / `append`).

Vùng chọn bắt đầu hoặc kết thúc giữa một từ sẽ lấy cả từ đó, và các message mặc định gửi văn bản xung quanh vùng chọn cùng quy tắc chỉ trả lời cho vùng chọn: nếu chỉ nhận một đoạn trích, mô hình sẽ coi nó là toàn bộ văn bản và hoàn thiện nó, và phần thay thế sẽ lặp lại những gì theo sau vùng chọn.

**Response**: provider có thể trả về nội dung dưới dạng `string` thuần, dạng `{ content }` (`TiptapifyAiResponse`), hoặc dạng payload `choices` tương thích OpenAI (`TiptapifyAiOpenAiResponse`). Hộp thoại trích xuất nội dung theo thứ tự đó và cắt bỏ khoảng trắng đầu. Khi bị từ chối, thông báo lỗi được hiển thị trong hộp thoại (hoặc `ai.error` khi lỗi không phải là instance của `Error`) và hộp thoại vẫn mở.

## Tạo nội dung qua backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Thay vì triển khai `aiProvider`, hãy trỏ tính năng AI đến một endpoint LLM ở backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Khi đó tiptapify tự dựng yêu cầu và gửi POST đến endpoint. Một `aiProvider` được chỉ định rõ ràng luôn được ưu tiên khi cả hai đều được đặt.

**Request** — một payload JSON tối giản (`TiptapifyAiBackendRequest`):

| Trường | Được gửi |
| --- | --- |
| `prompt` | luôn luôn — yêu cầu nhập trong hộp thoại |
| `instruction` | luôn luôn — `systemPrompt` của bạn, tin nhắn system của `createMessages` tùy chỉnh, hoặc mặc định có sẵn |
| `stream` | chỉ khi `stream: true` |
| `thinking` | chỉ khi công tắc **Tư duy** của hộp thoại đang bật |
| `reasoning_effort` | chỉ khi người dùng đã chọn một mức (không phải `default`) |
| `model` | chỉ khi tùy chọn `model` được đặt |

**Response** — được chấp nhận linh hoạt: một chuỗi thuần, một đối tượng `{ content }`, hoặc một payload `choices` tương thích OpenAI.

**Streaming** — khi yêu cầu có `stream: true`, phần thân phản hồi được đọc như một luồng SSE (các dòng `data:`, kết thúc bằng `data: [DONE]`). Các định dạng chunk được chấp nhận:

- Kiểu OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Đơn giản — `data: {"type":"content"|"reasoning","data":"…"}`
- Phẳng — `data: {"content":"…","reasoning_content":"…"}`
- Văn bản thuần — `data: some text` (một dòng `data` không phải JSON là một chunk nội dung)

Các chunk `content` cập nhật trường kết quả thông qua `onChunk`, các chunk `reasoning_content` đưa vào bảng **Tư duy** thông qua `onReasoning`. Nếu backend bỏ qua `stream` và trả lời bằng phần thân thuần, phần thân đó sẽ được dùng thay thế. Nhấp **Dừng** hoặc đóng hộp thoại sẽ hủy yêu cầu; nội dung đã được stream một phần được giữ lại trong trường kết quả.

**Headers** — `aiHeaders` (một `Record<string, string>`) được gộp đè lên `Content-Type: application/json`. Header `Authorization` trong `aiHeaders` được giữ nguyên; nếu không, token từ `tokenProvider` được gửi dưới dạng `Authorization: Bearer <token>`.

**Lỗi** — phản hồi không OK sẽ hiển thị thông báo lỗi của backend (JSON `{ error }` / `{ message }` hoặc phần thân thô) trong hộp thoại.

## Streaming {#streaming}

Khi `stream: true` (hoặc `chatCompletionOptions.stream` là `true`), hộp thoại truyền một đối tượng `TiptapifyAiStream` làm đối số thứ ba:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — truyền nó cho `fetch` (hoặc lời gọi SDK của bạn). Nó hủy khi người dùng nhấp **Dừng** hoặc đóng hộp thoại, nhờ đó các yêu cầu đang chạy không tiếp tục chạy.
- **`onChunk`** — nối từng chunk nội dung vào trường kết quả. Khi đang tạo, trường kết quả ở chế độ chỉ đọc và nội dung đã stream một phần được giữ lại (bạn có thể Dừng, rồi chèn hoặc bỏ nó).
- **`onReasoning`** — chuyển tiếp đầu ra suy luận/tư duy của mô hình (ví dụ delta `reasoning_content` của Qwen/DeepSeek/dòng o) đến bảng **Tư duy** có thể thu gọn phía trên kết quả. Bảng tự động mở rộng và tự động cuộn khi đang streaming. Đầu ra suy luận chỉ để hiển thị và không bao giờ được chèn vào trình soạn thảo.

Các provider không streaming sẽ bỏ qua đối số `stream` — nó là tùy chọn.

## Tư duy và mức độ suy luận {#thinking-and-reasoning-effort}

Hai điều khiển của người dùng trong hộp thoại ánh xạ tới các trường của yêu cầu. Cả hai đều được bật tùy chọn qua options và do plugin quản lý — bạn không (và không nên) tự đặt các trường này trong `chatCompletionOptions`.

- **`thinking: true`** hiển thị công tắc **Tư duy** (bật theo mặc định, đặt lại mỗi lần mở hộp thoại). Plugin ghi giá trị công tắc vào yêu cầu dưới dạng `enable_thinking: true | false`.
- **`thinking` bị thiếu hoặc `thinking: false`** ẩn công tắc và plugin gửi `enable_thinking: false`, để các mô hình mặc định có tư duy sẽ không tư duy.
- **`reasoningEffort: { options, default? }`** hiển thị dropdown **Mức độ suy luận**. `options` liệt kê các mức độ tùy chỉnh bạn muốn cung cấp (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); extension luôn tự thêm một mục `default` (mức cơ sở của chế độ tư duy), nên bạn không bao giờ liệt kê `default` trong cấu hình. Trường `default` chọn sẵn một trong các mức tùy chỉnh của bạn khi hộp thoại mở — khi bỏ qua, `default` được chọn sẵn. Giá trị được đặt lại mỗi lần mở. Dropdown chỉ được render khi `options` là danh sách không rỗng, `thinking` được bật, và công tắc Tư duy đang bật.
- **`showReasoning`** (mặc định `false`) điều khiển bảng **Tư duy** có thể thu gọn, nơi stream quá trình suy luận của mô hình (delta `reasoning_content`). Đặt `showReasoning: true` để hiển thị bảng đó trong khi vẫn bật tư duy — mô hình vẫn suy luận, kết quả được áp dụng theo cùng cách, chỉ có thêm quá trình suy luận từng bước được hiển thị.

Vì các provider (đặc biệt là vLLM/LM Studio) từ chối `enable_thinking` và `reasoning_effort` trong cùng một yêu cầu, plugin chỉ gửi đúng một trong hai:

| Trạng thái | Trường của yêu cầu |
| --- | --- |
| Tư duy bật, mức = `default` (hoặc không cấu hình mức) | `enable_thinking` (từ công tắc) |
| Tư duy bật, mức = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (từ dropdown); công tắc bị vô hiệu hóa |
| Tư duy tắt (công tắc tắt, hoặc `thinking` không được bật trong cấu hình) | `enable_thinking: false`; `reasoning_effort` không được gửi |

## Lỗi {#errors}

Hộp thoại giải thích yêu cầu thất bại thay vì hiển thị lỗi thô, và thêm thông báo riêng của dịch vụ phía sau:

| Điều gì đã xảy ra | Giải thích |
| --- | --- |
| Trình duyệt không nhận được phản hồi (`Failed to fetch`, `NetworkError…`, `Load failed`) | Dịch vụ ngừng hoạt động, không truy cập được, hoặc CORS đã chặn phản hồi; console của trình duyệt cho biết nguyên nhân |
| `401` / `403` | Kiểm tra khóa API hoặc quyền truy cập |
| `404` | Kiểm tra đường dẫn endpoint |
| `408` / `504` / hết thời gian chờ | Dịch vụ không phản hồi kịp thời |
| `429` | Quá nhiều yêu cầu |
| `5xx` | Dịch vụ không khả dụng (đang tải mô hình, bận) |

Với `aiEndpoint`, mã trạng thái lấy từ phản hồi. Một `aiProvider` tùy chỉnh nhận được các giải thích tương tự bằng cách ném một lỗi có `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Mọi lỗi khác được hiển thị cùng thông báo riêng của nó.

## Chèn kết quả {#inserting-the-result}

Khi nhấn nút hành động — **Chèn**, **Thay thế** hoặc **Thêm vào cuối**, tùy theo chế độ — hộp thoại đặt `result` vào trình soạn thảo:

- **Chế độ** — nút hành động của hộp thoại là một nút tách đôi. Phần chính áp dụng kết quả ở chế độ được chọn sẵn (**Chèn** / **Thay thế** / **Thêm vào cuối**): tùy chọn `mode` chọn sẵn nó, hoặc **Thay thế** khi có văn bản được chọn lúc mở hộp thoại và **Chèn** nếu không. Phần "thêm" (⋮) nhỏ ở bên phải nút mở một menu với các chế độ còn lại — nhấp vào một chế độ sẽ áp dụng kết quả ngay ở chế độ đó. **Chèn** đặt kết quả tại con trỏ, **Thay thế** thay thế văn bản đã chọn (được ghi lại khi nhấp **Tạo**), và **Thêm vào cuối** thêm nó vào cuối tài liệu.
- **Giới hạn ký tự** — khi trình soạn thảo được cấu hình với `limit` (extension `CharacterCount` từ chối mọi transaction không phải dán làm tài liệu vượt quá giới hạn), một bộ đếm ký tự `generated / limit` được hiển thị bên dưới trường kết quả (cập nhật trực tiếp khi streaming, chuyển đỏ nhạt khi vượt giới hạn) và hộp thoại hiển thị cảnh báo `ai.limit_exceeded` ngay sau khi tạo nếu kết quả vượt giới hạn. Khi đó nút **Chèn** và menu các chế độ thay thế của nó bị vô hiệu hóa: kết quả được áp dụng toàn bộ hoặc không gì cả, nên bạn phải rút ngắn nó trước khi áp dụng.