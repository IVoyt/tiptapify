# สกิน {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

prop `skin` ใช้เลือกรูปลักษณ์ของส่วนประกอบรอบเอดิเตอร์ ได้แก่ แถบเครื่องมือ bubble menu ดรอปดาวน์ และกล่องโต้ตอบ
ฟีเจอร์ทำงานเหมือนกันในทุกสกิน แนวคิด ตารางโทเค็น และสูตรการปรับแต่งอยู่ใน
[คู่มือสกิน](/th/guide/skins)

## Classic (ค่าเริ่มต้น) {#classic-default}

แถบเครื่องมือแบบยกนูน กลุ่มปุ่มเป็นกล่องยกนูน และ bubble menu แบบการ์ด:

<InteractiveEditor :bubble-menu="true" placeholder="สกิน Classic..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## Pastel {#pastel}

แถบเครื่องมือแบนที่ลงสีอ่อนใต้เส้นบาง ปุ่มแบบ ghost ที่มีสถานะกดเป็นสีกลาง ดรอปดาวน์แบบเบา:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="สกิน Pastel..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## แบบกำหนดเอง: mint {#custom-mint}

`registerSkin` เพิ่มชื่อเข้าไปในรีจิสทรี สกินนี้ขยายจาก `pastel` และแทนที่โทเค็นไม่กี่ตัว ได้แก่ สีมินต์อ่อนบนพื้นแถบเครื่องมือ และสีเขียวเข้มสำหรับเส้นขอบรูปภาพและจุดปรับขนาด รูปทรงที่นุ่มนวลสืบทอดมาจาก pastel ส่วนที่ไม่ได้แทนที่ (สถานะปุ่ม เมนู กล่องโต้ตอบ) ใช้ค่าของ pastel ต่อไป:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="สกิน Mint..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

รูทของเอดิเตอร์มีคลาส `tiptapify-skin-mint` — ทางออกสำหรับมิติที่แคตตาล็อกโทเค็นไม่ครอบคลุม (ดู[ทางออกฉุกเฉิน](/th/guide/skins#escape-hatch-the-root-class))

## สกินแบบอินไลน์ {#inline-skin}

prop `skin` รับออบเจกต์ได้ด้วย ซึ่งประกอบด้วยการแทนที่โทเค็นและแฟลกรูปทรง โดยสืบทอดจากสกินที่ลงทะเบียนไว้ผ่าน `extends` ถูกประมวลผลผ่านลำดับเดียวกัน ไม่เข้าสู่รีจิสทรี และแสดงผลด้วยคลาส `tiptapify-skin-inline` (หรือ `tiptapify-skin-{name}` เมื่อออบเจกต์มี `name`) โทเค็นของสกินจะปรากฏเป็นตัวแปร CSS `--tf-*` บนรูทของเอดิเตอร์

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
