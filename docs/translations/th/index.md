<script setup>
</script>

# Tiptapify {#tiptapify}

**เอดิเตอร์ rich text Tiptap 3 สำหรับ Vue 3 พร้อมแถบเครื่องมือที่สร้างด้วย Vuetify 3**

::: info สถานะเบต้า
ขณะนี้โปรเจกต์อยู่ในสถานะ **Beta** ฟีเจอร์ครบถ้วนแล้ว แต่ยังอาจมีบั๊กที่ต้องแก้ไข
:::

## ฟีเจอร์ {#features}

<div class="features-grid">
  <div class="feature">
    <h3>คอมโพเนนต์ Vuetify 3</h3>
    <p>แถบเครื่องมือแบบ Material Design ที่สวยงาม สร้างขึ้นจากคอมโพเนนต์ Vuetify 3 ทั้งหมด</p>
  </div>
  <div class="feature">
    <h3>เอ็กซ์เทนชันกว่า 30 รายการ</h3>
    <p>การจัดรูปแบบข้อความ การฝังสื่อ ตาราง และบล็อกโค้ดพร้อมไฮไลต์ไวยากรณ์</p>
  </div>
  <div class="feature">
    <h3>Slash Commands</h3>
    <p>พิมพ์ <code>/</code> เพื่อเปิดเมนูแทรกด่วนสำหรับหัวข้อ รายการ สื่อ และอื่น ๆ</p>
  </div>
  <div class="feature">
    <h3>การแปลภาษา</h3>
    <p>รองรับกว่า 20 ภาษาผ่าน vue-i18n</p>
  </div>
  <div class="feature">
    <h3>ธีมมืด</h3>
    <p>รองรับโหมดมืด/สว่างอัตโนมัติ และทำงานร่วมกับธีม Vuetify ของคุณ</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>รองรับ TypeScript เต็มรูปแบบ พร้อมไทป์ที่ export ไว้สำหรับรายการแถบเครื่องมือและ props ทั้งหมด</p>
  </div>
</div>

## เริ่มต้นอย่างรวดเร็ว {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip Peer Dependencies
Tiptapify ต้องการ **Vue 3.x**, **Vuetify 3.x หรือ 4.x**, **vue-i18n 11+** และ **@mdi/js** เป็น peer dependencies ดูขั้นตอนการตั้งค่าทั้งหมดได้ที่[คู่มือการติดตั้ง](/th/guide/installation)
:::

## สัญญาอนุญาต {#license}

MIT — [GitHub Repository](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
