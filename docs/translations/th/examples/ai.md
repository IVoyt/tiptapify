# AI {#ai}

ใช้เดโมนี้กับผู้ให้บริการที่รองรับ OpenAI ผ่าน `/v1/chat/completions` ได้ทุกราย ช่อง endpoint, model และ token ใช้เฉพาะในเซสชันของหน้านี้และไม่ถูกจัดเก็บ

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="เขียนหรือวางข้อความ แล้วใช้ปุ่ม AI บนแถบเครื่องมือ..."
/>

## โหมด Backend endpoint {#backend-endpoint-mode}

สลับช่อง **Mode** เป็น **Backend endpoint** เพื่อให้ tiptapify คุยกับแบ็กเอนด์ของคุณโดยตรง โดยไม่ต้องใช้ `aiProvider` แบบกำหนดเอง จะส่ง payload ขั้นต่ำ (`prompt`, `instruction` และฟิลด์ทางเลือก `stream`, `thinking`, `reasoning_effort`, `model`) ไปยัง endpoint และรองรับการตอบกลับเป็น JSON ธรรมดา, `{ content }` หรือสตรีมมิง SSE — ดูข้อกำหนดฉบับเต็มได้ที่[คู่มือ AI](/th/guide/ai#backend-generation-aiendpoint)

## LM Studio ในเครื่อง {#local-lm-studio}

สำหรับ LM Studio ให้ใช้ endpoint เช่น:

```txt
http://localhost:1234/v1/chat/completions
```

หาก LM Studio ทำงานบนเครื่องอื่น ให้ใช้โฮสต์นั้นแทน เช่น:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

สำหรับเดโมบนเบราว์เซอร์ ให้ใช้ dev proxy หากผู้ให้บริการไม่อนุญาต CORS
