# สไตล์เนื้อหา {#content-styles}

เนื้อหาบางอย่างที่ตัวแก้ไขบันทึกต้องมีรูปลักษณ์เฉพาะบนหน้าที่แสดงมัน เช่น ลิงก์การ์ด รูปภาพพร้อมคำบรรยายและการลอย (float) วิดีโอและเนื้อหาฝังที่พอดีกับความกว้างของข้อความ และรายการงานที่มีช่องทำเครื่องหมายข้างแต่ละรายการ หากไม่มี ลิงก์การ์ดจะเป็นเพียงลิงก์เปล่าที่รูปและข้อความติดกันไปหมด

prop `contentStyles` กำหนดว่า HTML ที่บันทึกจะพกรูปลักษณ์นั้นไปอย่างไร:

| `contentStyles` | HTML ที่บันทึก | บนเว็บไซต์ |
|---|---|---|
| `inline` (ค่าเริ่มต้น) | รูปลักษณ์ถูกเขียนลงในแอตทริบิวต์ `style` ขององค์ประกอบเหล่านี้ | ไม่ต้องโหลดอะไร: HTML แสดงตามที่เป็น |
| `classes` | มีเฉพาะคลาสและแอตทริบิวต์ `data-` | โหลด `tiptapify/content.css` และวาง HTML ไว้ในองค์ประกอบที่มีคลาส `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

ทั้งสองแบบพกกฎชุดเดียวกัน คือกฎที่ตัวแก้ไขใช้แสดงเนื้อหาเอง หน้าเว็บจึงดูเหมือนตัวแก้ไขไม่ว่าจะใช้แบบใด กฎเหล่านี้ใช้กับองค์ประกอบเหล่านี้เท่านั้น: หัวข้อ ย่อหน้า รายการ ตาราง และข้อความส่วนที่เหลือยังคงใช้สไตล์ของเว็บไซต์เอง

## อินไลน์สไตล์ {#inline-styles}

เป็นค่าเริ่มต้น ลิงก์การ์ดแบบ compact จะถูกบันทึกดังนี้:

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **สียังเป็นของเว็บไซต์** ข้อความสืบทอดสีของมัน ส่วนข้อความที่จางและเส้นขอบใช้ความโปร่งใสและสีเทากึ่งโปร่งใส จึงใช้ได้ทั้งบนหน้าสว่างและหน้ามืด ตั้งสีข้อความของแต่ละธีมบนเว็บไซต์ตามปกติ
- **ไม่ต้องใช้ media query** การ์ด compact จะวางรูปไว้เหนือข้อความเองในคอลัมน์แคบ วิดีโอและเนื้อหาฝังจะไม่กว้างเกินข้อความ
- **เว็บไซต์ยังปรับสไตล์ใหม่ได้** เพราะคลาสยังอยู่ อินไลน์สไตล์มีน้ำหนักเหนือกฎของคลาส กฎแบบนั้นจึงต้องใช้ `!important`
- **ตัวกรอง (sanitizer) ต้องเก็บแอตทริบิวต์ `style`** บนองค์ประกอบเหล่านี้ไว้ ไม่เช่นนั้นจะเสียรูปลักษณ์

## คลาสและ content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` มีขนาดเล็กและไม่มี Vue หรือ Vuetify อยู่ภายใน กฎของมันถูกห่อด้วย `:where(.tiptapify-content)` จึงมีน้ำหนักเป็นศูนย์: กฎใดของเว็บไซต์ก็ชนะมันได้โดยไม่ต้องใช้ `!important` ใช้วิธีนี้เมื่อเว็บไซต์ต้องการให้รูปลักษณ์อยู่ในที่เดียว หรือจัดสไตล์เนื้อหาเอง

`contentCss(scope)` ให้สไตล์ชีตชุดเดียวกันเป็นสตริง สำหรับคลาสอื่นที่ไม่ใช่ `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## การโหลด HTML กลับมา {#loading-html-back}

ตัวแก้ไขอ่านองค์ประกอบเหล่านี้จากแอตทริบิวต์และคลาสเท่านั้น: ลิงก์การ์ดจาก `data-link-card` รูปภาพจาก `src` ขนาด และการลอย งานจาก `data-checked` อินไลน์สไตล์ของมันจะถูกละเว้นตอนโหลด HTML และเขียนใหม่ตอนบันทึก HTML เดียวกันจึงไปมาได้โดยไม่เปลี่ยนแปลง เอกสารที่บันทึกด้วย `inline` โหลดกับ `classes` ได้อย่างสะอาดและกลับกัน และตัวแก้ไขเวอร์ชันถัดไปจะอัปเดตรูปลักษณ์ของเอกสารเมื่อบันทึกครั้งต่อไป

การจัดรูปแบบข้อความไม่ถูกแตะต้อง: สีหรือขนาดของข้อความและการจัดแนวของย่อหน้าเป็นเนื้อหา และตัวแก้ไขยังคงอ่านค่าเหล่านั้นจากสไตล์ของมัน

หากต้องการแปลง HTML แบบคลาสเป็น HTML แบบอินไลน์สไตล์นอกตัวแก้ไข (เอกสารเก่า อีเมล) ให้ใช้ `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

ต้องมี DOM (เบราว์เซอร์ หรือ jsdom บนเซิร์ฟเวอร์) และหากไม่มีจะคืน HTML กลับไปตามเดิม

## สไลเดอร์รูปภาพ {#image-sliders}

ตัวแก้ไขจะทำเครื่องหมายรูปภาพที่เรียงกันเป็นแถวว่าเป็นสไลเดอร์ขณะที่คุณเขียน (ดู prop `imageSlider`) HTML ที่บันทึกจะเก็บรูปเหล่านั้นเป็น figure ที่ต่อกันไป การแสดงเป็นสไลเดอร์ขึ้นอยู่กับสคริปต์ของเว็บไซต์เอง
