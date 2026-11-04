# แถบเครื่องมือที่กำหนดเอง {#custom-toolbar}

## การแสดงเฉพาะบางรายการ {#showing-specific-items}

ใช้ prop `items` เพื่อแสดงเฉพาะปุ่มบนแถบเครื่องมือที่ต้องการ โดยส่งอาร์เรย์ของชื่อรายการ:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

ใช้ `|` เป็นตัวคั่นระหว่างกลุ่มปุ่ม

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="แถบเครื่องมือที่กำหนดเอง..." />

## ดรอปดาวน์สไตล์รายการ {#list-styles-dropdown}

ส่วนต่อท้าย `:styles` จะเปลี่ยนปุ่มรายการให้เป็นดรอปดาวน์สไตล์เครื่องหมาย/การเรียงลำดับ: ปุ่มรายการจะเปิดตารางตัวเลือก `list-style-type` ที่บันทึกเป็นอินไลน์สไตล์ ตารางนี้เรนเดอร์ภายในพื้นผิวเมนูของสกิน จึงเปลี่ยนตามสกินที่ใช้อยู่ ([คู่มือสกิน](/th/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="เปิดดรอปดาวน์สไตล์รายการ..." />

## การยกเว้นรายการ {#excluding-items}

ใช้ `items-exclude` ร่วมกับ `items` เพื่อแสดงรายการบนแถบเครื่องมือส่วนใหญ่ แต่ยกเว้นบางรายการ:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="ยกเว้นรายการที่ไม่ต้องการ..." />

## เซกชันที่กำหนดเอง {#custom-sections}

จัดกลุ่มรายการเป็นเซกชันที่มีชื่อของคุณเองโดยใช้ออบเจกต์:

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="แถบเครื่องมือแบบเซกชันที่กำหนดเอง..." />

## เอกสารอ้างอิงเซกชันของแถบเครื่องมือ {#toolbar-sections-reference}

รายการบนแถบเครื่องมือถูกจัดเป็นเซกชัน เซกชันที่มีทั้งหมดมีดังนี้:

| เซกชัน         | รายการ                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## การซ่อนแถบเครื่องมือ {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="ไม่มีแถบเครื่องมือ..." />

## คอมโพเนนต์แถบเครื่องมือที่กำหนดเอง {#custom-toolbar-components}

เพิ่มปุ่มของคุณเองด้วย prop `customExtensions` แต่ละรายการคือ[เซกชันของแถบเครื่องมือ](/th/api/types#section) — ใช้ชื่อเซกชันที่มีในตัว (`misc`, `media`, …) เพื่อรวมปุ่มของคุณเข้ากับกลุ่มที่มีอยู่ หรือใช้ชื่อใหม่เพื่อสร้างกลุ่มแยกที่แสดงต่อจากเซกชันในตัว:

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

คอมโพเนนต์แบบกำหนดเองถูกเรนเดอร์ภายใน `<Tiptapify>` จึงเข้าถึงค่าที่ใช้ร่วมกันเดียวกับปุ่มในตัวได้ ได้แก่ เอดิเตอร์ คำแปล และคอนฟิกระดับเอดิเตอร์:

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()` ส่งคืนคอนฟิกระดับเอดิเตอร์ (`variantBtn`, `variantField`) คอมโพเนนต์แบบกำหนดเองจึงมีสไตล์ตรงกับแถบเครื่องมือในตัวโดยอัตโนมัติ
- prop `variantBtn` ยังคงถูกส่งให้ทุกคอมโพเนนต์บนแถบเครื่องมือเพื่อความเข้ากันได้ย้อนหลัง — คอมโพเนนต์ที่เขียนก่อนมีคอนฟิกที่ใช้ร่วมกันยังทำงานได้เหมือนเดิม
- `inject('tiptapifyI18n')` ให้ฟังก์ชันแปลเดียวกับที่ปุ่มในตัวใช้
