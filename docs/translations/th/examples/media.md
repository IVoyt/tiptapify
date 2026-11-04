# สื่อ {#media}

## รูปภาพ {#images}

แทรกรูปภาพจาก URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

ปุ่มรูปภาพจะเปิดกล่องโต้ตอบรูปภาพ:

- **จาก URL** หรือ **อัปโหลด** หากไม่มี[endpoint สำหรับอัปโหลด](/th/guide/uploads) ไฟล์ที่เลือกจะถูกฝังเป็น base64 data URL แต่หากมี ไฟล์จะถูกส่งไปยังเซิร์ฟเวอร์ของคุณ
- **ข้อความแสดงแทน** (กล่องโต้ตอบจะเตือนเมื่อเว้นว่าง) และ**คำบรรยายภาพ**ใต้รูป
- **ขนาด**: ต้นฉบับ ความกว้างเท่าข้อความ หรือกำหนดความกว้าง × ความสูงเองพร้อมล็อกสัดส่วน
- **ตำแหน่ง**: กึ่งกลางบนบรรทัดของตัวเอง หรือลอยชิดซ้ายหรือขวาของข้อความ

รูปภาพที่เลือกจะมีจุดปรับขนาด (การปรับขนาดแต่ละครั้งเป็นหนึ่งขั้นตอนของการเลิกทำ) และแถบเครื่องมือเหนือรูป: ลอยชิดซ้ายหรือขวา ดาวน์โหลด แก้ไข ลบ ดับเบิลคลิกเพื่อเปิดกล่องโต้ตอบ

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## วิดีโอ {#videos}

ฝังวิดีโอ YouTube และ Vimeo หรือไฟล์วิดีโอ:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

ปุ่มวิดีโอจะเปิดกล่องโต้ตอบวิดีโอ:

- **ลิงก์ YouTube หรือ Vimeo** จะกลายเป็นเพลเยอร์ของบริการนั้น กล่องโต้ตอบจะแสดงผู้ให้บริการที่รู้จักและตัวอย่าง รวมถึง **เริ่มที่** (กรอกไว้ให้จาก `?t=`) เมื่อเพลเยอร์รองรับ
- **ลิงก์ไปยังไฟล์วิดีโอ** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) จะกลายเป็น `<video>` พร้อมโปสเตอร์ ปุ่มควบคุม เล่นอัตโนมัติ (ปิดเสียง) และเล่นวนซ้ำ ลิงก์ต้องมีโพรโทคอล (`https://`, `http://`), `//host` หรือ `/path` เพราะกล่องโต้ตอบไม่เดาให้
- **อัปโหลด** จะส่งไฟล์วิดีโอไปยังเซิร์ฟเวอร์ของคุณ และจะแสดงเมื่อมี[endpoint สำหรับอัปโหลด](/th/guide/uploads)เท่านั้น
- **ขนาด**: ปรับตามหน้าจอแบบ 16:9 หรือกำหนดความกว้าง × ความสูงเองพร้อมล็อกสัดส่วน

URL ของ YouTube ที่วางลงในข้อความก็จะถูกฝังเช่นกัน การคลิกที่เพลเยอร์จะเป็นการเลือกแทนการเล่น เพื่อให้ปุ่มบนแถบเครื่องมือแสดงขึ้นมา ดับเบิลคลิกเพื่อเปิดกล่องโต้ตอบ

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="วาง URL ของ YouTube เพื่อฝังวิดีโอ..." />

## Iframe {#iframes}

ฝังหน้าเว็บด้วยที่อยู่ หรือด้วยโค้ด iframe จากเมนูแชร์หรือฝังของหน้านั้น:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

กล่องโต้ตอบ iframe อ่านโค้ดที่วาง (ที่อยู่ ขนาด ชื่อเรื่อง สิทธิ์ sandbox การโหลดแบบหน่วงเวลา เต็มหน้าจอ) และบอกว่าได้ค่าอะไรจากโค้ดนั้น โค้ดที่มีสคริปต์หรือแท็กอื่นจะถูกปฏิเสธ กล่องโต้ตอบแสดงตัวอย่าง และมี**ชื่อเรื่องสำหรับโปรแกรมอ่านหน้าจอ** ขนาด (ปรับตามหน้าจอตามสัดส่วนของโค้ด หรือกำหนดเองพร้อมล็อกสัดส่วน) และภายใต้ **ขั้นสูง** มีชื่อ `allow` `sandbox` การโหลดแบบหน่วงเวลา และเส้นขอบ ที่อยู่ต้องขึ้นต้นด้วย `https://` หรือ `http://` ดับเบิลคลิกที่เนื้อหาฝังเพื่อเปิดกล่องโต้ตอบ

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="ป้อน URL เพื่อฝังเป็น iframe..." />

## ตาราง {#tables}

แทรกและแก้ไขตาราง:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

หลังแทรกตารางแล้ว คุณสามารถ:
- เพิ่ม/ลบแถวและคอลัมน์
- เลือกเซลล์
- ลบตารางทั้งตาราง

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="ใช้ปุ่มตารางเพื่อแทรกตาราง..." />

## ลิงก์ {#links}

แทรกไฮเปอร์ลิงก์:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

กล่องโต้ตอบลิงก์รับที่อยู่ตามที่พิมพ์: `https://…` โครงร่างอื่น ๆ (`ftp://`, `ssh://` หรือโครงร่างภายใน) `mailto:` `tel:` `#anchor` หรือ `/page` กล่องโต้ตอบจะไม่เพิ่มโพรโทคอลให้เอง: ที่อยู่ที่ไม่มีโพรโทคอล (`example.com`, `internal.host:8080`) จะมีชิปให้เพิ่ม `https://`, `http://` หรือ `ftp://` และจะคงไว้ตามที่พิมพ์หากไม่เพิ่ม ที่อยู่แบบ `javascript:`, `vbscript:` และ `data:` จะถูกปฏิเสธ

กล่องโต้ตอบยังมีข้อความของลิงก์ **เปิดในแท็บใหม่** (ซึ่งเพิ่ม `noopener noreferrer`) และภายใต้ **ขั้นสูง** มีค่า `rel` เป็นชิป (ค่าใดก็ได้: กด Enter เว้นวรรค หรือจุลภาคเพื่อเพิ่ม) และคลาส CSS

เมื่อใช้ prop [`linkPreview`](/th/api/props#linkpreview) กล่องโต้ตอบเดียวกันจะแสดงลิงก์เป็นการ์ดพร้อมรูปภาพ หัวข้อ และคำอธิบายของหน้า และเมื่อวาง URL ลงในบรรทัดว่างจะมีตัวเลือก **ลิงก์ / การ์ด** — ดู[การ์ดลิงก์](/th/guide/link-cards)

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="เลือกข้อความแล้วคลิกลิงก์เพื่อเพิ่มไฮเปอร์ลิงก์..." />

## อีโมจิ {#emoji}

แทรกอีโมจิจากตัวเลือกในตัวที่มี 10 หมวดหมู่:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

ตัวเลือกอีโมจิมีช่องค้นหา/กรองเพื่อหาอีโมจิที่ต้องการได้อย่างรวดเร็ว

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="คลิกปุ่มอีโมจิเพื่อแทรกอีโมจิ..." />

## อักขระพิเศษ (Charmap) {#special-characters-charmap}

แทรกอักขระพิเศษ ลูกศร อักษรกรีก สัญลักษณ์ทางคณิตศาสตร์ และอื่น ๆ:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

หมวดหมู่ประกอบด้วย:
- ลูกศร
- สกุลเงิน
- อักษรกรีก
- สัญลักษณ์ทางคณิตศาสตร์
- เบ็ดเตล็ด

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="คลิก charmap เพื่อแทรกอักขระพิเศษ..." />

## การรวมเครื่องมือสื่อ {#combining-media-tools}

แถบเครื่องมือสื่อแบบครบทุกฟีเจอร์:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="แถบเครื่องมือสื่อแบบเต็ม..." />
