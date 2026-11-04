# Slash Commands {#slash-commands}

Slash commands คือเมนูแทรกด่วนที่ปรากฏเมื่อพิมพ์ `/` ที่ต้นบรรทัด

## การเปิดใช้ Slash Commands {#enabling-slash-commands}

Slash commands เปิดใช้งานโดยค่าเริ่มต้น หากต้องการควบคุมอย่างชัดเจน:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="เดโม Slash commands..."
:slash-commands="true"
/>

## คำสั่งที่มีให้ใช้ {#available-commands}

พิมพ์ `/` ในเอดิเตอร์เพื่อเปิดพาเลตคำสั่ง คำสั่งที่มีให้ใช้ ได้แก่:

| คำสั่ง          | คำอธิบาย                           |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | แทรกหัวข้อ (ระดับ 1-6)             |
| `/bulletList`   | แทรกรายการแบบหัวข้อย่อย            |
| `/numberedList` | แทรกรายการแบบลำดับเลข              |
| `/taskList`     | แทรกรายการงาน                      |
| `/code`         | แทรกโค้ดแบบอินไลน์                 |
| `/codeBlock`    | แทรกบล็อกโค้ด                      |
| `/quote`        | แทรกบล็อกคำอ้างอิง                 |
| `/image`        | แทรกรูปภาพ (เปิดกล่องโต้ตอบ URL)   |
| `/video`        | ฝังวิดีโอ YouTube                  |
| `/table`        | แทรกตาราง                          |
| `/link`         | แทรกไฮเปอร์ลิงก์                   |
| `/divider`      | แทรกเส้นแบ่งแนวนอน                 |
| `/emoji`        | เปิดตัวเลือกอีโมจิ                 |
| `/specialChars` | เปิดอักขระพิเศษ                    |

## วิธีการทำงาน {#how-it-works}

1. วางเคอร์เซอร์ไว้ที่ต้นบรรทัดหรือหลังช่องว่าง
2. พิมพ์ `/` — พาเลตคำสั่งจะปรากฏขึ้น
3. พิมพ์ต่อเพื่อกรองคำสั่ง
4. กด `Enter` หรือคลิกเพื่อแทรกคำสั่งที่เลือก

## การปิด Slash Commands {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash Commands ร่วมกับ Floating Menu {#slash-commands-with-floating-menu}

ใช้ slash commands ร่วมกับ floating menu เพื่อประสบการณ์การแก้ไขที่ดีที่สุด:

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

- **Slash commands** (`/`) — เรียกใช้โดยพิมพ์ `/` ที่ต้นบรรทัด
- **Floating menu** — ปรากฏเมื่อวางเคอร์เซอร์บนบรรทัดว่าง (มีการทำงานระดับบล็อก)
- **Bubble menu** — ปรากฏเมื่อเลือกข้อความ (มีการจัดรูปแบบอินไลน์)

## การกรองคำสั่งที่มีให้ใช้ {#filtering-available-commands}

ระบุคำสั่งที่ต้องการรวมได้โดยส่งอาร์เรย์ของ ID คำสั่ง:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### ID คำสั่งที่มีให้ใช้ {#available-command-ids}

| ID             | คำอธิบาย              |
|----------------|-----------------------|
| `h1` - `h6`    | หัวข้อระดับ 1-6       |
| `bulletList`   | รายการแบบหัวข้อย่อย   |
| `numberedList` | รายการแบบลำดับเลข     |
| `taskList`     | รายการงาน             |
| `code`         | โค้ดแบบอินไลน์        |
| `codeBlock`    | บล็อกโค้ด             |
| `quote`        | บล็อกคำอ้างอิง        |
| `image`        | รูปภาพ                |
| `video`        | วิดีโอ YouTube        |
| `table`        | ตาราง                 |
| `link`         | ลิงก์                 |
| `divider`      | เส้นแบ่งแนวนอน        |
| `emoji`        | อีโมจิ                |
| `specialChars` | อักขระพิเศษ           |
