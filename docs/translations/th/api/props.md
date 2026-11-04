# Props {#props}

## Props ของ `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **ประเภท:** `String | Object`
- **ค่าเริ่มต้น:** `''`

เนื้อหาเริ่มต้นของเอดิเตอร์ รับสตริง HTML หรือออบเจกต์ JSON ของ Tiptap

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` เป็นเนื้อหา**เริ่มต้น**เท่านั้น สำหรับ two-way binding ให้ใช้ `v-model` (ดู `modelValue`)

### `modelValue` {#modelvalue}

- **ประเภท:** `String | Object`
- **ค่าเริ่มต้น:** `''`

ค่าสำหรับ two-way binding ของ `v-model` ใช้ `v-model` เพื่อให้ค่า reactive ซิงก์กับเอดิเตอร์ ทุกครั้งที่แก้ไข คอมโพเนนต์จะส่งอีเวนต์ `update:modelValue` พร้อม HTML ล่าสุด ซึ่ง `v-model` จะเขียนกลับไปยัง ref ของคุณ เมื่อใช้เฉพาะ `v-model` (ไม่มี `:content`) ค่าที่ผูกไว้คือเนื้อหาเริ่มต้นของเอดิเตอร์

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

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `''`

ข้อความตัวอย่างที่แสดงเมื่อเอดิเตอร์ว่าง

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **ประเภท:** `Number`
- **ค่าเริ่มต้น:** `null`

ความสูงขั้นต่ำของพื้นที่เนื้อหาเอดิเตอร์ เป็นพิกเซล

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

แสดงหรือซ่อนแถบเครื่องมือ

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **ประเภท:** `Array<String> | Object`
- **ค่าเริ่มต้น:** `[]`

รายการบนแถบเครื่องมือที่จะแสดง ส่งอาร์เรย์ของชื่อรายการหรือออบเจกต์ที่มีเซกชันที่ตั้งชื่อ ดู[รายการบนแถบเครื่องมือ](/th/api/toolbar-items)
ในอาร์เรย์ `'|'` จะแบ่งรายการเป็นกลุ่ม (ตามลำดับนั้น ไม่ว่าปุ่มจะมาจากเซกชันใด) และ `'~'` จะดันรายการหลังจากนั้นไปท้ายแถบเครื่องมือ เมื่อมีกลุ่ม ชื่อที่ไม่ใช่รายการในตัวจะจองที่ไว้ให้ปุ่มแบบกำหนดเองชื่อนั้นจาก `customExtensions` หากไม่มีปุ่มดังกล่าว ที่นั้นจะถูกตัดออก

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `false`

เมื่อเป็น `true` prop `items` จะระบุรายการที่จะ**ยกเว้น**แทนที่จะรวม

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

แสดง bubble menu เมื่อเลือกข้อความ: แถวปุ่มไอคอนเดียวที่แบ่งเป็นกลุ่ม — ตัวหนา ตัวเอียง ขีดเส้นใต้ ขีดฆ่า | ตัวยก ตัวห้อย | ไฮไลต์ โค้ดอินไลน์ | ลิงก์ | ล้างการจัดรูปแบบ แต่ละปุ่มมีทูลทิปพร้อมคีย์ลัดและแสดงสถานะเมื่อมาร์กนั้นอยู่บนส่วนที่เลือก เมนูจะซ่อนเมื่อเลือกบล็อก (รูปภาพ วิดเจ็ต) ภายในโค้ด และเมื่อเลือกทั้งเอกสาร

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

แสดง floating menu บนบรรทัดว่าง: หัวข้อ 1 หัวข้อ 2 และรายการแบบหัวข้อย่อย ในแถวปุ่มไอคอนเดียวกับ bubble menu

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

เปิดใช้เมนู slash command (พิมพ์ `/` เพื่อเรียกใช้)

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

แสดงจำนวนคำในส่วนท้ายของเอดิเตอร์

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

แสดงจำนวนอักขระในส่วนท้ายของเอดิเตอร์

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **ประเภท:** `Number | null`
- **ค่าเริ่มต้น:** `null`

จำนวนอักขระสูงสุดที่เอ็กซ์เทนชัน `CharacterCount` ของ Tiptap อนุญาต ตั้งเป็น `null` หรือไม่ระบุ prop เพื่อให้แก้ไขได้ไม่จำกัด เมื่อตั้งค่ามากกว่า `0` ส่วนท้ายจะแสดงตัวบอกความคืบหน้าแบบวงกลม SVG ที่มีสีตามเกณฑ์

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'purple'`

สีเริ่มต้นของตัวบอกความคืบหน้าแบบวงกลมที่แสดงในส่วนท้ายเมื่อตั้งค่า `limit`

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'orange'`

สีของตัวบอกความคืบหน้าเมื่อการใช้งานเกิน 75% ของขีดจำกัด

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'red'`

สีของตัวบอกความคืบหน้าเมื่อถึงขีดจำกัดอักขระแล้ว

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **ประเภท:** `TiptapifyFooterAlignment`
- **ค่าเริ่มต้น:** `'end'`

การจัดแนวของรายการสถานะในส่วนท้าย รับ `'start'`, `'center'` หรือ `'end'`

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **ประเภท:** `Boolean | TiptapifyAiOptions`
- **ค่าเริ่มต้น:** `false`

เปิดใช้รายการ `ai` บนแถบเครื่องมือ เอดิเตอร์สร้างคำขอ `/v1/chat/completions` แบบที่รองรับ OpenAI และส่งให้ `aiProvider` ใช้คอลแบ็กของผู้ให้บริการเพื่อเรียกแบ็กเอนด์ BFF endpoint ที่ป้องกันด้วย OAuth LM Studio หรือตัวห่อ SDK ของคุณ

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

ตัวอย่าง LLM ในเครื่องด้วย LM Studio:

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

รองรับเอาต์พุตแบบสตรีมโดยตั้ง `stream: true` และส่งโทเค็นผ่านอาร์กิวเมนต์ `stream` ของ `aiProvider` ช่องผลลัพธ์ในกล่องโต้ตอบ AI อัปเดตสดขณะที่ชังก์เข้ามา และปุ่ม **หยุด** จะยกเลิกคำขอที่กำลังดำเนินอยู่:

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

ส่ง `stream.signal` ให้ `fetch` (หรือการเรียก SDK ของคุณ) เพื่อให้คำขอถูกยกเลิกเมื่อผู้ใช้คลิก **หยุด** หรือปิดกล่องโต้ตอบ เนื้อหาที่สตรีมมาบางส่วนจะอยู่ในช่องผลลัพธ์และนำไปใช้หรือทิ้งได้ ผู้ให้บริการที่ไม่สตรีมจะไม่สนใจอาร์กิวเมนต์ `stream` ได้เลย — เป็นทางเลือกและเข้ากันได้ย้อนหลัง

โมเดลที่ให้เหตุผล (Qwen thinking, DeepSeek, ซีรีส์ o) สตรีม "ความคิด" ของมันในเดลตา `reasoning_content` แยกต่างหาก ส่งชังก์เหล่านั้นผ่าน `stream.onReasoning()` — เมื่อ `showReasoning: true` กล่องโต้ตอบจะแสดงในแผง **การคิด** แบบพับได้เหนือช่องผลลัพธ์ (แผงซ่อนอยู่โดยค่าเริ่มต้น) ผลลัพธ์การให้เหตุผลใช้แสดงเท่านั้นและไม่เคยถูกแทรกลงในเอดิเตอร์

หากต้องการให้ผู้ใช้สลับโหมดการคิดของโมเดลต่อคำขอ ให้ตั้ง `thinking: true` ในตัวเลือก AI กล่องโต้ตอบจะแสดงสวิตช์ **การคิด** (เปิดโดยค่าเริ่มต้น รีเซ็ตทุกครั้งที่เปิด) ปลั๊กอินเขียนค่าของสวิตช์ลงในคำขอเป็น `enable_thinking: true | false` คุณจึงไม่ต้อง (และไม่ควร) ตั้ง `enable_thinking` เองใน `chatCompletionOptions` อีกต่อไป:

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

เมื่อ `thinking` เป็น `false` หรือไม่ระบุ สวิตช์จะไม่แสดงและปลั๊กอินส่ง `enable_thinking: false` โมเดลที่คิดโดยค่าเริ่มต้น (Qwen3, DeepSeek, …) จึงไม่คิด

หากต้องการให้ผู้ใช้เลือกระดับการให้เหตุผลต่อคำขอ ให้ตั้ง `reasoningEffort` ในตัวเลือก AI กล่องโต้ตอบจะแสดงดรอปดาวน์ **ระดับการให้เหตุผล** ที่เติมจาก `options` — ระดับความพยายามแบบกำหนดเอง (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`)
เอ็กซ์เทนชันจะเพิ่มรายการ `default` ลงในดรอปดาวน์ให้เอง (ค่าพื้นฐานของโหมดการคิด) คุณจึงไม่ต้องใส่ `default` ในคอนฟิก ฟิลด์ `default` ของตัวเลือกจะเลือกระดับแบบกำหนดเองไว้ล่วงหน้าเมื่อเปิดกล่องโต้ตอบ (มิฉะนั้นจะเลือก `default` ไว้ล่วงหน้า) และค่าจะรีเซ็ตทุกครั้งที่เปิด
ค่าที่เลือกเป็นตัวกำหนดว่าปลั๊กอินจะเขียนอะไรลงในคำขอ: `default` คงโหมดการคิดไว้ — สวิตช์ **การคิด** ยังใช้งานได้และควบคุม `enable_thinking` ส่วนค่าอื่นจะถูกส่งเป็น `reasoning_effort` แทน และสวิตช์การคิดจะถูกปิดใช้งานขณะเลือกค่านั้น (ผู้ให้บริการปฏิเสธ `enable_thinking` และ `reasoning_effort` ในคำขอเดียวกัน)
ดรอปดาวน์จะแสดงเมื่อเปิด `thinking` และสวิตช์การคิดเปิดอยู่เท่านั้น — การปิดการคิดจะซ่อนดรอปดาวน์และไม่ส่ง `reasoning_effort` (คำขอถอยกลับไปเป็น `enable_thinking: false`) เมื่อ `options` ไม่มีหรือว่าง ดรอปดาวน์จะไม่ถูกเรนเดอร์เลย:

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

แผง **การคิด** ซ่อนอยู่โดยค่าเริ่มต้น (`showReasoning` มีค่าเริ่มต้นเป็น `false`) ตั้ง `showReasoning: true` เพื่อแสดงแผงแบบพับได้ที่สตรีมกระบวนการให้เหตุผลของโมเดล (เดลตา `reasoning_content`) โดยยังเปิดการคิดอยู่ — โมเดลยังคงให้เหตุผลและผลลัพธ์ถูกนำไปใช้เหมือนเดิม เพียงแต่แสดงการให้เหตุผลทีละขั้นเพิ่มเติม:

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

ตัวอย่างคำสั่งแบบกำหนดเองจะแทนที่ค่าเริ่มต้นตามภาษา:

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

`tokenProvider` และ `storage` เป็นฮุกที่ผู้ใช้เป็นเจ้าของเอง (ไม่บังคับ) สำหรับการเชื่อมต่อโดยตรงจากเบราว์เซอร์ คีย์ API หรือโทเค็นของผู้ให้บริการที่อยู่ในโค้ดหรือที่เก็บข้อมูลของเบราว์เซอร์ผู้ใช้มองเห็นได้และต้องไม่ถือเป็นความลับ สำหรับความลับใน production ควรใช้รูปแบบอะแดปเตอร์ฝั่งแบ็กเอนด์ข้างต้น

ใช้ `mode: 'insert' | 'replace' | 'append'` เพื่อเลือกโหมดการแทรกไว้ล่วงหน้าบนปุ่มการทำงานของกล่องโต้ตอบ (**แทรก** / **แทนที่** / **เพิ่มที่ท้าย**) หากไม่มี `mode` ปุ่มจะเป็น **แทนที่** เมื่อมีการเลือกข้อความตอนเปิดกล่องโต้ตอบ และเป็น **แทรก** ในกรณีอื่น ปุ่มการทำงานเป็นปุ่มแบบแยกส่วน: ส่วนหลักใช้ผลลัพธ์ในโหมดที่เลือกไว้ล่วงหน้า และส่วน "เพิ่มเติม" (⋮) เล็ก ๆ ทางขวาจะเปิดเมนูรายการโหมดอื่น — การคลิกโหมดใดจะใช้ผลลัพธ์ในโหมดนั้นทันที

เมื่อเอดิเตอร์มี `limit` (ขีดจำกัดจำนวนอักขระ) ตัวนับอักขระ `generated / limit` จะแสดงใต้ช่องผลลัพธ์ทันทีที่สร้างผลลัพธ์ (อัปเดตสดขณะสตรีม และเป็นสีแดงอ่อนเมื่อจะเกินขีดจำกัด)
กล่องโต้ตอบยังแสดงคำเตือน `ai.limit_exceeded` ทันทีหลังการสร้างหากเอาต์พุตของ AI จะเกินขีดจำกัด
ในสถานะนั้นปุ่ม **แทรก** และเมนูโหมดอื่นจะถูกปิดใช้งาน — เอ็กซ์เทนชัน `CharacterCount` ปฏิเสธการแทรกใด ๆ ที่ทำให้เอกสารยาวเกินขีดจำกัด ผลลัพธ์จึงถูกใช้แบบทั้งหมดหรือไม่เลย: แทรกครบเมื่อพอดี หรือไม่แทรกเลยเมื่อเกินขีดจำกัด
ทำให้ผลลัพธ์สั้นลงเพื่อเปิดใช้การทำงานอีกครั้ง:

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

ใช้ `systemPrompt`, `temperature`, `chatCompletionOptions` หรือ `createMessages(context)` เพื่อปรับแต่งคำขอ chat-completions แบบที่รองรับ OpenAI `context` ประกอบด้วย `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` คือข้อความของย่อหน้าที่มีส่วนที่เลือกอยู่รอบ ๆ ส่วนที่เลือก (ด้านละไม่เกิน 500 อักขระ ว่างเมื่อไม่มีส่วนที่เลือก) — ส่งไปพร้อมกับส่วนที่เลือก มิฉะนั้นโมเดลจะนึกว่าเศษข้อความเป็นข้อความทั้งหมดแล้วต่อให้จบ

### `ai.aiEndpoint` {#ai-aiendpoint}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `undefined`

ทางเลือกแทน `aiProvider` แบบกำหนดเอง: ชี้ฟีเจอร์ AI ไปที่ endpoint LLM ของแบ็กเอนด์ แล้ว tiptapify จะสร้างและส่งคำขอเอง แบ็กเอนด์จะได้รับเพย์โหลด JSON ขั้นต่ำ:

- **ส่งเสมอ:** `prompt` (คำขอที่พิมพ์ในกล่องโต้ตอบ) และ `instruction` (`systemPrompt` ของคุณ system message ของ `createMessages` แบบกำหนดเอง หรือค่าเริ่มต้นในตัว)
- **ไม่บังคับ ส่งเมื่อมีการตั้งค่าเท่านั้น:** `stream` (`true` เท่านั้น), `thinking` (สวิตช์ **การคิด** ของกล่องโต้ตอบ `true` เท่านั้น), `reasoning_effort` (ระดับความพยายามที่เลือก) และ `model`

การตอบกลับยอมรับอย่างยืดหยุ่น: สตริงธรรมดา ออบเจกต์ `{ content }` หรือเพย์โหลด `choices` แบบที่รองรับ OpenAI เมื่อคำขอมี `stream: true` เนื้อหาการตอบกลับจะถูกอ่านเป็นสตรีม SSE (บรรทัด `data:` สิ้นสุดด้วย `data: [DONE]`): รองรับทั้งเดลตาแบบ OpenAI (`choices[0].delta.content` / `.reasoning_content`) ชังก์แบบง่าย `{ type: 'content' | 'reasoning', data }` ชังก์แบบแบน `{ content, reasoning_content }` และบรรทัด `data` แบบข้อความธรรมดา หากแบ็กเอนด์ไม่สนใจ `stream` และตอบกลับเป็นเนื้อหาธรรมดา จะใช้เนื้อหานั้นแทน การตอบกลับที่ไม่ใช่ OK จะแสดงข้อความผิดพลาดของแบ็กเอนด์ (JSON `{ error }` / `{ message }` หรือเนื้อหาดิบ) ในกล่องโต้ตอบ ปุ่ม **หยุด** และการปิดกล่องโต้ตอบจะยกเลิกคำขอที่กำลังดำเนินอยู่ เนื้อหาที่สตรีมมาบางส่วนจะยังคงอยู่ในช่องผลลัพธ์

หากตั้งทั้ง `aiProvider` และ `aiEndpoint` `aiProvider` จะมีผลเหนือกว่า

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

- **ประเภท:** `Record<string, string>`
- **ค่าเริ่มต้น:** `undefined`

headers เพิ่มเติมที่ส่งไปกับคำขอ `aiEndpoint` รวมทับ `Content-Type: application/json` header `Authorization` ที่ตั้งที่นี่จะคงไว้ตามเดิม มิฉะนั้นโทเค็นจาก `tokenProvider` (เมื่อตั้งค่า) จะถูกส่งเป็น `Authorization: Bearer <token>`

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

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'Inter'`

แบบอักษรเริ่มต้นสำหรับเนื้อหาของเอดิเตอร์

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'px'`

หน่วยวัดสำหรับค่าขนาดอักษร

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'0'`

รัศมีมุมของคอนเทนเนอร์เอดิเตอร์ รับค่ารัศมีของ Vuetify (`sm`, `md`, `lg`, `xl`, `pill` ฯลฯ)

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **ประเภท:** `variantBtnTypes`
- **ค่าเริ่มต้น:** `'tonal'`

variant ของปุ่ม Vuetify สำหรับปุ่มบนแถบเครื่องมือ ค่านี้ใช้ร่วมกับทุกคอมโพเนนต์บนแถบเครื่องมือผ่านคอนฟิกของเอดิเตอร์ — คอมโพเนนต์แบบกำหนดเองอ่านได้ด้วย [`useTiptapifyConfig`](/th/api/types#usetiptapifyconfig) ดู [`variantBtnTypes`](/th/api/types#variantbtntypes)

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **ประเภท:** `variantFieldTypes`
- **ค่าเริ่มต้น:** `'outlined'`

variant ของ Vuetify สำหรับช่องดรอปดาวน์บนแถบเครื่องมือ ค่านี้ใช้ร่วมกับทุกคอมโพเนนต์บนแถบเครื่องมือผ่านคอนฟิกของเอดิเตอร์ — คอมโพเนนต์แบบกำหนดเองอ่านได้ด้วย [`useTiptapifyConfig`](/th/api/types#usetiptapifyconfig) ดู [`variantFieldTypes`](/th/api/types#variantfieldtypes)

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **ประเภท:** `Array<toolbarSections>`
- **ค่าเริ่มต้น:** `[]`

จัดเตรียมเซกชันแถบเครื่องมือแบบกำหนดเองเพื่อขยายหรือเพิ่มรายการบนแถบเครื่องมือ คอมโพเนนต์ของแต่ละเซกชันอ่านคอนฟิกเอดิเตอร์ที่ใช้ร่วมกันได้ด้วย [`useTiptapifyConfig`](/th/api/types#usetiptapifyconfig) ดู[แถบเครื่องมือที่กำหนดเอง](/th/examples/custom-toolbar#custom-toolbar-components)

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `true`

เปิดใช้การนำสไตล์แบบอินเทอร์แอกทีฟไปใช้

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **ประเภท:** `Boolean`
- **ค่าเริ่มต้น:** `false`

แสดงแถบความคืบหน้าแบบไม่ระบุค่าขณะที่เอดิเตอร์กำลังโหลด

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'default'`

สีของแถบความคืบหน้าการโหลด รับค่าสีธีมของ Vuetify

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **ประเภท:** `String`
- **ค่าเริ่มต้น:** `'1px'`

ความสูงของแถบความคืบหน้าการโหลด

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **ประเภท:** `Number`
- **ค่าเริ่มต้น:** `0`

เมื่อมีรูปภาพต่อเนื่องกันตามจำนวนนี้ (ไม่มีอะไรคั่น) เอดิเตอร์จะจัดวางเป็นกริดสามคอลัมน์ที่มีเลขลำดับ สำหรับเว็บไซต์ที่แสดงรูปภาพเช่นนั้นเป็นสไลเดอร์ `0` คือปิด

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **ประเภท:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/th/api/types#tiptapifyskininput))
- **ค่าเริ่มต้น:** `'default'`

รูปลักษณ์ของส่วนประกอบรอบเอดิเตอร์: แถบเครื่องมือ bubble menu ดรอปดาวน์ กล่องโต้ตอบ ส่วนท้าย

- `default` — หน้าตาแบบคลาสสิก: แถบเครื่องมือแบบนูน กลุ่มปุ่มเป็นกล่องนูน ปุ่มของ Vuetify ที่ใช้สีหลักในสถานะกด
- `pastel` — หน้าตาแบบสงบ: แถบเครื่องมือแบนที่ลงสีอ่อนใต้เส้นบาง ปุ่มแบบ ghost ที่มีสถานะกดเป็นสีกลาง ดรอปดาวน์แบบเบา กล่องโต้ตอบแบบนุ่มนวล

ฟีเจอร์ต่าง ๆ (คำบรรยายภาพ สไลเดอร์ ดรอปดาวน์การจัดแนว สไตล์รายการ) ทำงานเหมือนกันในทั้งสองสกิน

```vue
<Tiptapify skin="pastel" />
```

คุณยังส่งออบเจกต์สกินแบบอินไลน์ได้: การแทนที่โทเค็น (`colors` / `metrics`) และแฟลกรูปทรง โดยอาจ `extends` สกินที่ลงทะเบียนไว้ จะถูกประมวลผลทับ `default` (หรือฐานของมัน) แสดงผลด้วยคลาส `tiptapify-skin-inline` (`tiptapify-skin-{name}` เมื่อออบเจกต์มี `name`) และโทเค็นของมันจะปรากฏเป็นตัวแปร CSS `--tf-*` บนรูทของเอดิเตอร์ ชื่อแบบกำหนดเองมาจาก `registerSkin('mint', { … })` — ดู[คู่มือสกิน](/th/guide/skins)สำหรับตารางโทเค็นและสูตรการปรับแต่ง

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **ประเภท:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/th/api/types#tiptapifyuploadoptions))
- **ค่าเริ่มต้น:** `null`

endpoint ของ[การอัปโหลด](/th/guide/uploads): ไฟล์ที่เลือกในกล่องโต้ตอบรูปภาพและวิดีโอ (รวมถึงโปสเตอร์วิดีโอและรูปภาพของการ์ดลิงก์) จะถูกส่งไปด้วย `POST {endpoint}` (multipart `file` และ `kind`) และเอกสารเก็บ URL ที่ endpoint ตอบกลับ (`{ "url": … }`)

หากไม่มี กล่องโต้ตอบรูปภาพยังรับไฟล์ได้: รูปภาพที่เลือก (และโปสเตอร์วิดีโอ) จะถูกฝังลงในเอกสารเป็น base64 data URL และรูปภาพ base64 จะถูกเก็บไว้เมื่อโหลดเอกสาร กล่องโต้ตอบวิดีโอเสนอ **อัปโหลด** เฉพาะเมื่อมี prop นี้ เมื่อตั้งค่า `upload` รูปภาพ base64 จะถูกตัดออกเมื่อโหลดเอกสาร

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **ชนิด:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/th/api/types#tiptapifycontentstyles))
- **ค่าเริ่มต้น:** `'inline'`

กำหนดว่า HTML ที่บันทึกจะพกรูปลักษณ์ของลิงก์การ์ด รูปภาพที่มีคำบรรยาย วิดีโอ เนื้อหาฝัง และรายการงานไปอย่างไร (ดู [สไตล์เนื้อหา](/th/guide/content-styles)): `inline` เขียนรูปลักษณ์ลงในแอตทริบิวต์ `style` ขององค์ประกอบเหล่านี้ ทำให้เว็บไซต์แสดง HTML ได้ตามที่เป็น ส่วน `classes` เก็บไว้เพียงคลาส สำหรับเว็บไซต์ที่โหลด `tiptapify/content.css` ตัวแก้ไขจะไม่สนใจสไตล์เหล่านี้ตอนโหลด HTML ดังนั้น HTML ทั้งสองแบบจึงโหลดกลับมาได้เหมือนกัน

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **ประเภท:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/th/api/types#tiptapifylinkpreviewoptions))
- **ค่าเริ่มต้น:** `null`

endpoint แบ็กเอนด์ของ[การ์ดลิงก์](/th/guide/link-cards): อ่านข้อมูล OpenGraph ของหน้าเว็บ ซึ่งเบราว์เซอร์อ่านเองไม่ได้ (CORS) เอดิเตอร์ตรวจสอบด้วย handshake ตอนเริ่มทำงาน (`GET {endpoint}` ต้องตอบ `200 { "tiptapifyLinkPreview": 1 }`) จนกว่าจะตอบ จะไม่มีตัวเลือกการ์ดใด ๆ

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## อีเวนต์ {#events}

### `editor-ready` {#editor-ready}

ถูกเรียกเมื่ออินสแตนซ์ของเอดิเตอร์พร้อมใช้งาน

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

ถูกเรียกเมื่อเนื้อหาของเอดิเตอร์เปลี่ยนแปลง

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

รองรับการผูก `v-model`

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

อินสแตนซ์ของเอดิเตอร์และฟังก์ชัน `t` ใช้ได้ผ่าน provide/inject ของ Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
