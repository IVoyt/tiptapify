# AI {#ai}

Dùng bản demo này với bất kỳ nhà cung cấp nào tương thích OpenAI qua `/v1/chat/completions`. Các trường endpoint, model và token chỉ được dùng trong phiên của trang này và không được lưu lại.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Viết hoặc dán văn bản, sau đó dùng nút AI trên thanh công cụ..."
/>

## Chế độ Backend endpoint {#backend-endpoint-mode}

Chuyển trường **Chế độ** sang **Endpoint backend** để tiptapify giao tiếp trực tiếp với backend của bạn mà không cần `aiProvider` tùy chỉnh. Nó gửi một payload tối giản (`prompt`, `instruction` và các trường tùy chọn `stream`, `thinking`, `reasoning_effort`, `model`) đến endpoint và chấp nhận phản hồi JSON thuần, `{ content }` hoặc SSE streaming — xem [hướng dẫn AI](/vi/guide/ai#backend-generation-aiendpoint) để biết đầy đủ hợp đồng giao tiếp.

## LM Studio cục bộ {#local-lm-studio}

Với LM Studio, hãy dùng endpoint như sau:

```txt
http://localhost:1234/v1/chat/completions
```

Nếu LM Studio chạy trên máy khác, hãy dùng host đó, ví dụ:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Với các bản demo trên trình duyệt, hãy dùng dev proxy nếu nhà cung cấp của bạn không cho phép CORS.
