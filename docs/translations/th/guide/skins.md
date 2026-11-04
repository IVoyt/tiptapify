# สกิน {#skins}

**สกิน** คือรูปลักษณ์หนึ่งของส่วนประกอบรอบเอดิเตอร์: แถบเครื่องมือ ปุ่มและกลุ่มปุ่มในนั้น bubble menu เมนูดรอปดาวน์ กล่องโต้ตอบ กรอบรอบเนื้อหา และส่วนประกอบเมื่อเลือกรูปภาพ prop `skin` ใช้เลือกสกิน:

```vue
<Tiptapify skin="pastel" />
```

สกินประกอบด้วยสองส่วน: **โทเคน** (สีและขนาดในรูปแบบตัวแปร CSS) และ **รูปทรง** (ตัวแปรเชิงโครงสร้างที่โทเคนไม่สามารถแสดงได้) สกินในตัวทั้งสองคือ `default` — หน้าตาแบบคลาสสิก แถบเครื่องมือแบบนูนพร้อมกลุ่มปุ่มแบบนูน — และ `pastel` ซึ่งเป็นหน้าตาแบบสงบ สกินที่กำหนดเองได้รับการปฏิบัติอย่างเท่าเทียม: `registerSkin()` และออบเจ็กต์สกินแบบอินไลน์ถูกประมวลผลด้วยกลไกเดียวกันทุกประการ และสกินในตัวก็เป็นเพียงสกินที่ลงทะเบียนไว้ ไม่ใช่กรณีพิเศษ

## คำศัพท์: สกิน กับ ธีมของ Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin (สกิน)** — คำที่ผู้ใช้เห็นสำหรับรูปลักษณ์หนึ่งของส่วนประกอบรอบเอดิเตอร์: โทเค็น + รูปทรง prop คือ `skin` ไทป์คือ `TiptapifySkin*` รีจิสทรีคือ `registerSkin()` และคลาสที่รูทคือ `tiptapify-skin-{name}`
- **theme (ธีม)** — สงวนไว้สำหรับธีมสว่าง/มืดของ Vuetify คอมโพเนนต์ของ Tiptapify ยังคงรับ prop `theme` จากชื่อธีมปัจจุบันของ Vuetify โดยระบบสกินไม่แตะต้อง

ทั้งสองทำงานร่วมกัน: สีโทเค็นในตัวส่วนใหญ่อ้างอิงตัวแปรธีมของ Vuetify (`rgb(var(--v-theme-surface))`, …) สกินจึงเปลี่ยนตามโหมดสว่าง/มืดโดยอัตโนมัติ เซลล์สีมืดคงที่ในคอลัมน์ classic — จุดปรับขนาด (`rgba(0, 0, 0, .5/.8)`) เส้นขอบรูปภาพธรรมดา เงาของ bubble และเงา elevation ของเมนู/กล่องโต้ตอบ — เป็นความตั้งใจ: รูปลักษณ์คลาสสิกใช้ส่วนประกอบสีมืดกลาง ๆ ทั้งในสองธีม และเส้นฐานที่วัดไว้ตรึงค่าเหล่านี้ สกินแบบกำหนดเองอ้างอิงตัวแปรธีมได้อย่างอิสระ — ดูตารางโทเค็น

## แนวคิด {#concept}

### โทเค็น {#tokens}

โทเค็นคือ CSS custom property ที่ชื่อ `--tf-*` คีย์ในแคตตาล็อกคือ camelCase ของส่วนต่อท้ายของ CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size` ค่าเป็นสตริงธรรมดา — สี shorthand ของเส้นขอบแบบเต็ม เงา ช่องไฟ และรัศมีมุม

กฎของสกินทุกข้อในไลบรารีมี**เพียงหนึ่งเดียว** โดยอ่านโทเค็นของตนพร้อมค่าสำรองที่เท่ากับค่าคลาสสิก (ค่าฐาน):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

สกินที่ประมวลผลแล้วจะปล่อยเฉพาะ**ค่าที่แทนที่**ออกมาเป็นตัวแปร โดยค่าสำรองใน CSS เป็นผู้ถือค่าฐาน ตัวแปรจะอยู่ที่รูทของเอดิเตอร์ — และเนื่องจากเมนูและกล่องโต้ตอบถูกย้ายออกจากรูท จึงอยู่ที่ wrapper `SkinScope` ของแต่ละเมนูและที่การ์ดของกล่องโต้ตอบเอง โทเค็นจึงตามไปทุกพื้นผิว

### รูปทรง {#shape}

แฟลกหกตัวกำหนดว่าชุดกฎใดถูกใช้ ส่วนโทเค็นเป็นตัวลงสี:

| แฟลก | ค่า | สิ่งที่สลับ |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar แบบยกนูนและไม่มีเส้นบางภายใน เทียบกับแถบแบนที่ลงสีอ่อน |
| `groups` | `box` · `flat` | เซกชันของแถบเครื่องมือเป็นกล่อง **VBtnGroup** ยกนูน (มาร์กอัปของ 0.3.2: ปุ่มเชื่อมกัน โทเค็นกลุ่มลงสีกล่อง) เทียบกับชุด div แบบ flex ธรรมดา |
| `buttons` | `vuetify` · `quiet` | ปุ่ม Vuetify ดั้งเดิม เทียบกับปุ่มแบบ ghost ที่มีสถานะกดเป็นสีกลาง |
| `bubble` | `card` · `flat` | คงไว้เพื่อความเข้ากันได้: bubble menu เป็นแถวปุ่มไอคอนที่ลงสีด้วยโทเค็นในทั้งสองรูปทรง (ปุ่มของมันเปลี่ยนตาม `buttons`) |
| `dialog` | `classic` · `soft` | เส้นแบ่งใต้ชื่อเรื่องและปุ่มปิดแบบยกนูน เทียบกับการ์ดนุ่มนวลและปุ่มปิดแบบข้อความ |
| `menu` | `vuetify` · `soft` | เมนูดรอปดาวน์: รายการของ Vuetify เทียบกับการ์ดสีสว่างที่มีช่องไฟ |

รูปทรงที่ประมวลผลแล้วถูกเข้ารหัสไว้บนรูทของเอดิเตอร์เป็นหกคลาส `.tiptapify-shape-{flag}-{value}` และเปิดเผยเป็น `shape: ComputedRef<ResolvedShape>` บน [`useTiptapifyConfig()`](/th/api/types#usetiptapifyconfig) สำหรับคอมโพเนนต์แถบเครื่องมือแบบกำหนดเอง

### Extends {#extends}

สกินถูกประมวลผลทับฐานคลาสสิก จากนั้นตามสาย `extends` เริ่มจากราก แล้วจึงเป็นสมาชิกของตัวเอง:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

ลิงก์ที่ขาดหายจะถูกประมวลผลเป็นสายที่สะสมมา (พร้อมคำเตือนในโหมดพัฒนา) วงวนจะประมวลผลเป็น classic (พร้อมคำเตือนในโหมดพัฒนา) สกินที่ลงทะเบียนไว้อ้างอิงด้วยชื่อ ออบเจกต์สกินแบบอินไลน์ `extends` ชื่อที่ลงทะเบียนไว้ได้และไม่เข้าสู่รีจิสทรีส่วนกลาง — สกินแบบกำหนดเองจึงไม่รั่วไหลระหว่างเอดิเตอร์ คีย์โทเค็นที่ไม่รู้จักจะถูกข้ามพร้อมคำเตือนในโหมดพัฒนา

เดโมสดของทั้งสามรูปแบบอยู่ที่[หน้าตัวอย่างสกิน](/th/examples/skins)

## แคตตาล็อกโทเค็น {#token-catalog}

ตารางด้านล่างคือ**สัญญา v1**: คีย์ในแคตตาล็อก (`TiptapifySkinColors` / `TiptapifySkinMetrics`) คือชื่อที่คุณตั้งค่าได้ เซลล์ classic คือค่าสำรองของ CSS — ค่าที่กฎฐานลงสีเมื่อไม่มีสกินแทนที่โทเค็น

### แถบเครื่องมือ / แถบ {#toolbar-bar}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### รายการ / กลุ่ม / เส้นแบ่ง {#items-groups-dividers}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (ตัวเว้นระยะ: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ ค่า classic ที่วัดได้คือ `normal` — ค่า flex ดั้งเดิมของ Vuetify ซึ่งเป็นสิ่งที่ค่าสำรองของ CSS ถือไว้ ส่วนค่าฐานในแคตตาล็อก `0px` คือความยาวที่ระบุชัดเจนซึ่งเทียบเท่า สำหรับใช้แทนที่ในสกิน

<a id="shadow-cells"></a>² เซลล์ที่เขียนว่า "Vuetify elevation *n*" เป็นเพียงคำอธิบาย: สตริงเงาสามชั้นที่แน่นอนคือค่าที่วัดได้ในไฟล์ฐานที่คอมมิตไว้ (`src/skins/__fixtures__/skin-baseline.json`) และเป็นค่าสำรองของ CSS สำหรับ `groupShadow` นั่นคือ **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — ภายใต้ `groups: 'box'` เซกชันคือ VBtnGroup (`elevation="4"`) และกฎของโทเค็นลงสีกล่องด้วยเงาสามชั้นนี้ทับ elevation ของกลุ่มเอง: กล่องเป็นเจ้าของ elevation ส่วนปุ่มลูกที่เชื่อมกันไม่มี

### ปุ่ม {#buttons}

โทเค็นเหล่านี้ถูกใช้**เฉพาะภายใต้ `buttons: 'quiet'`** — ดู[ความเข้าถึงได้](#reachability)

| โทเค็น | ตัวแปร CSS | ค่าแบบ quiet (classic: Vuetify ดั้งเดิม) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menu (การเลือก บรรทัดว่าง รูปภาพ) {#bubble-menus-selection-empty-line-image}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | เหมือนกัน |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | เหมือนกัน |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | เหมือนกัน |

### เมนูดรอปดาวน์ {#dropdown-menus}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ กล่อง**รายการ** (รัศมีมุม เงา ช่องไฟของรายการ) ของเมนูคลาสสิกปัจจุบันเป็นกฎของสกิน — wrapper โทเค็น `SkinScope` อยู่ระหว่างกฎลูกของ Vuetify เองกับรายการ ไลบรารีจึงคืนพิกเซลเหล่านั้นเป็นกฎของสกินที่อ่านโทเค็นข้างต้น พิกเซลของ**ไอเทม**ยังเป็นของ Vuetify ดั้งเดิม (ไฟล์ฐานวัดค่าเริ่มต้นของ Vuetify ไว้ตรงนั้น): โทเค็นไอเทมทั้งสี่ไม่มีผลขณะ `menu: 'vuetify'`

### กล่องโต้ตอบ {#dialogs}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | ค่าเริ่มต้นของฟิลด์ (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### กรอบ (ตัวห่อเส้นขอบของเอดิเตอร์) {#frame-editor-border-wrapper}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ไม่มีขอบบน | ขอบเต็ม |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

ภายใต้รูปทรงแถบเครื่องมือแบบแบน กรอบยังลงสีส่วนต่างรายด้าน (ขอบบน และขอบล่างที่ความทึบของเส้นขอบ 1.6 เท่า) ส่วนต่างนั้นเป็นของรูปทรง ไม่ใช่ของโทเค็น: โทเค็นเข้าถึงไม่ได้

### รูปภาพและจุดปรับขนาด {#images-and-resize-handles}

| โทเค็น | ตัวแปร CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (เมื่อเลือก) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (เมื่อวางเมาส์) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

แถบเครื่องมือของรูปภาพทำตามแฟลก `buttons`: ภายใต้รูปทรง quiet จะได้พื้นผิวแบบ quiet — ระยะห่าง 2px/4px อ่าน `--tf-bubble-gap` / `--tf-bubble-padding` พร้อมค่าสำรองของเมนูรูปภาพ ไม่มีโทเค็นเฉพาะสำหรับแถบเครื่องมือรูปภาพ

### ไม่อยู่ในแคตตาล็อก (ขอบเขตของทางออกฉุกเฉิน) {#not-in-the-catalog-escape-hatch-territory}

มิติบางอย่างที่กล่าวถึงในภาพรวมการออกแบบไม่มีโทเค็นในแคตตาล็อกของ v1: **ความสูงแถบเครื่องมือ ความกว้างกรอบ รัศมีมุมกรอบ ความกว้างปุ่ม ช่องไฟของปุ่ม ความกว้างกล่องโต้ตอบ** ตารางแคตตาล็อกข้างต้นคือสัญญา สำหรับพิกเซลเหล่านี้ให้เปิด[ทางออกฉุกเฉิน](#escape-hatch-the-root-class)และจัดสไตล์คลาสที่คงที่โดยตรง

## ความเข้าถึงได้ {#reachability}

สัญญาที่ระบุไว้ครั้งเดียวและทุกกลุ่มข้างต้นปฏิบัติตาม:

> โทเค็นลงสีพื้นผิวก็ต่อเมื่อรูปทรงเปิดใช้พื้นผิวนั้น ส่วนภาพดั้งเดิมของ Vuetify จัดสไตล์ผ่านสีธีมของ Vuetify

แยกตามกลุ่ม:

- **แถบเครื่องมือ กรอบ ส่วนประกอบรูปภาพ/จุดปรับขนาด** — ใช้งานในทุกรูปทรง โทเค็นลงสีให้ และเซลล์ classic คือรูปลักษณ์ดั้งเดิมที่โทเค็นถอยกลับไปใช้
- **กล่องของกลุ่ม** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — ภายใต้ `groups: 'box'` เซกชันคือ VBtnGroup (โครงสร้างของ 0.3.2: ปุ่มเชื่อมกัน กล่องถือ elevation) กฎของกล่องลงสีด้วยโทเค็นของกลุ่ม และ `--tf-group-height` รักษาสัญญา 32px ด้วย `!important` (กฎ density ของ Vuetify ต่อสู้กับมัน เหมือนใน 0.3.2) ภายใต้ `groups: 'flat'` เซกชันเป็นชุด div ธรรมดา (โปร่งใส ไม่มีเงา รัศมีมุม 0 คือค่าฐานของรูปทรง)
- **เส้นแบ่งบาง** (`dividerWidth/Height/Color`) — เส้นบางที่มองเห็นได้เป็นฟีเจอร์ของ `groups: 'flat'` ในรูปทรงกล่อง เส้นแบ่งเป็นตัวเว้นระยะขนาดศูนย์ (`margin: 0 4px` จากกฎฐาน)
- **ช่องไฟ/ระยะห่างของรายการ** — ชุด `6px 8px` แบบกระชับถูกจำกัดไว้กับแถบแบน (`toolbar: 'flat'`) ส่วนระยะห่างของกลุ่มจำกัดไว้กับเซกชันแบน (`groups: 'flat'`) แถบยกนูนคงเมตริกคลาสสิกไว้
- **ปุ่ม** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — ไม่มีผลภายใต้ `buttons: 'vuetify'`: ปุ่ม Vuetify ดั้งเดิมลงสีสถานะของตัวเอง จัดสไตล์ด้วยสีธีมของ Vuetify (`primary`, `surface`, …) — รูปทรงคลาสสิกสืบทอดสีเหล่านั้นโดยเจตนา
- **เมตริกของไอเทมเมนู** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — ไม่มีผลภายใต้ `menu: 'vuetify'` Vuetify เป็นเจ้าของพิกเซลของไอเทมเหล่านั้น กล่อง**รายการ**ของเมนู (รัศมีมุม/เงา/ช่องไฟ) สกินลงสีในทั้งสองรูปทรง (ดู[หมายเหตุเมนู](#menu-classic-note))
- **ส่วนประกอบแบบนุ่มนวลของกล่องโต้ตอบ** (`dialogActionBtn*`, `dialogFieldRadius`, ช่องไฟแบบนุ่มนวล เส้นแบ่งที่หายไป) — ลงสีภายใต้ `dialog: 'soft'` ภายใต้ `dialog: 'classic'` กล่องโต้ตอบคือ VCard พร้อมช่องไฟแบบคลาสสิก
- **ส่วนประกอบของ Bubble** — เมนูการเลือก บรรทัดว่าง และรูปภาพเป็นแถวปุ่มไอคอนแถวเดียวในทั้งสองรูปทรง ลงสีด้วยโทเค็นของ bubble `bubble` ไม่เปลี่ยนมาร์กอัปของมันอีกต่อไป

ค่าที่แทนที่ซึ่งเท่ากับค่าฐานในแคตตาล็อก**จะไม่ถูกปล่อยออกมา** — ภายใต้รูปทรงที่ไม่ใช่คลาสสิก ค่าฐานของรูปทรงเองจะลงสีผ่านค่าสำรองของ CSS ดังนั้นการ "คืน" ค่าคลาสสิก (เช่นตั้ง `buttonActiveBg` กลับเป็น `rgb(var(--v-theme-primary))` ภายใต้ `buttons: 'quiet'`) จึงไม่เกิดผลใด ๆ อย่างเงียบ ๆ หากต้องการบังคับค่าที่ดูเหมือนคลาสสิกภายใต้รูปทรงที่ไม่ใช่คลาสสิก ให้ตั้งค่าที่แทนที่ซึ่งต่างจากค่าฐานในแคตตาล็อก — ค่าลิเทอรัลที่เทียบเท่า เช่น `rgba(var(--v-theme-primary), 1)` ลงสีเหมือนกันทุกประการและไม่ถูกข้าม

โทเค็นไม่ได้ถูกเชื่อมเข้ากับเส้นทางดั้งเดิมโดยเจตนา — นั่นคือสิ่งที่ทำให้ `default` เหมือนรูปลักษณ์คลาสสิกทุกพิกเซลในขณะที่ทุกอย่างผ่านแคตตาล็อก

## สูตรการปรับแต่ง {#recipes}

### ขยาย pastel {#extend-pastel}

สืบทอดรูปทรง quiet และลงสีใหม่ในบางพื้นผิว ชื่อที่ลงทะเบียนไว้ใช้ได้กับทุกเอดิเตอร์:

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

รูปทรง (flat/quiet/soft) มาจาก pastel โทเค็นที่ไม่ได้แตะต้องคงค่าของ pastel ไว้ — พื้นสีของปุ่ม quiet ยังเป็นสีกลาง เฉพาะสิ่งที่คุณแทนที่เท่านั้นที่เปลี่ยน นี่คือสกินที่เรนเดอร์สดอยู่บน[หน้าตัวอย่าง](/th/examples/skins#custom-mint)

### ขยาย default {#extend-default}

คงโครงสร้างคลาสสิกไว้ ปรับแต่งสี:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` คือรากโดยปริยาย จึงละคีย์ได้: `{ toolbar: 'flat', … }` ก็เริ่มจากคลาสสิกเช่นกัน

### กำหนดเองทั้งหมด {#full-custom}

ไม่มี `extends` ไม่ต้องลงทะเบียน: ส่งออบเจกต์ให้ prop `skin` แล้วตั้งแฟลกรูปทรงและโทเค็นได้อย่างอิสระ `name` ใช้ใส่ป้ายของคุณเองบนคลาสที่รูท (ดูด้านล่าง) หากไม่มีจะเป็น `tiptapify-skin-inline`

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin` เป็นฟังก์ชันช่วยแบบ identity สำหรับนิยามค่าคงที่ที่มีไทป์ (ไม่เข้าสู่รีจิสทรีใด ๆ) แฟลกรูปทรงตั้งทีละตัวได้ — แฟลกที่คุณละไว้ยังเป็น classic

## ทางออกฉุกเฉิน: คลาสที่รูท {#escape-hatch-the-root-class}

รูทของเอดิเตอร์ทุกตัวมี `tiptapify-skin-{name}` (`tiptapify-skin-inline` สำหรับออบเจกต์อินไลน์ที่ไม่มีชื่อ) ไลบรารี**ไม่เคยผูกกฎใด ๆ กับชื่อสกิน** — คลาสนี้เป็นของคุณ:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

จุดเกาะที่คงที่สำหรับเขียนสไตล์:

| คลาส | อยู่ที่ |
|---|---|
| `tiptapify-skin-{name}` | รูทของเอดิเตอร์ |
| `tiptapify-shape-{flag}-{value}` ×6 | รูทของเอดิเตอร์ — รูปทรงที่ประมวลผลแล้ว |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | แถบเครื่องมือและเซกชันของมัน |
| `tiptapify-quiet-buttons` | รูทของแถบเครื่องมือและ bubble ภายใต้ `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | แถวของ bubble menu ทุกตัวและเส้นบางระหว่างกลุ่ม |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | แถวของเมนูการเลือก บรรทัดว่าง และรูปภาพ |
| `tiptapify-btn--active` | ปุ่มที่ถูกกดของ bubble menu (มาร์กที่ใช้งานอยู่ การลอยของรูปภาพ) |
| `tiptapify-menu` · `tiptapify-menu--soft` | เนื้อหา overlay ของดรอปดาวน์ ตัวพากฎของเมนูแบบนุ่มนวล |
| `tiptapify-skin-scope` | div ขอบเขตโทเค็นภายในเมนูที่ถูกย้ายออก |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | การ์ดของกล่องโต้ตอบและตัวพาแบบนุ่มนวล |
| `tiptapify-frame` | ตัวห่อเส้นขอบของเอดิเตอร์ |

**การป้องกันธีมของผู้ใช้** เลเยอร์สกินสร้างขึ้นให้อยู่รอดภายใต้ธีมแอดมินที่เพิ่มช่องไฟและลงสีทับส่วนภายในของ Vuetify: กฎถูกจำกัดด้วยคลาสของรูปทรง/ตัวพา ใช้คลาสซ้ำสองชั้น (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) เพื่อเพิ่ม specificity และคง `!important` ไว้เฉพาะที่กรณีธีมแอดมินของคอมมิตฐานพิสูจน์ว่าจำเป็น (ชุดป้องกันใน menu.css) ข้อตกลงที่ช่วยให้การแทนที่ของคุณเองใช้งานได้ในสนามเดียวกัน:

- จำกัดขอบเขต CSS ของคุณภายใต้ `.tiptapify-skin-{name}` (หรือคลาสของรูปทรง) — ไม่ใช่บนส่วนภายในเปล่า ๆ ของ Vuetify
- ควรใช้โทเค็น (`--tf-*`) สำหรับมิติในแคตตาล็อก และใช้คลาสสำหรับส่วนที่เหลือ
- ใช้การซ้ำคลาสให้ตรงกันเมื่อแทนที่คอมโพเนนต์ของ Vuetify (`.v-list-item` เดี่ยว ๆ จะแพ้กฎของสกิน)

## ข้อตกลงด้านภาพ (หมายเหตุสำหรับผู้ร่วมพัฒนา) {#visual-contract-contributor-note}

สไตล์ที่คำนวณแล้วของสกินในตัวถูกตรึงไว้ด้วยไฟล์ฐาน `src/skins/__fixtures__/skin-baseline.json` (13 เซกชัน × สว่าง/มืด): เลเยอร์ CSS เสร็จสมบูรณ์เมื่อเมทริกซ์ที่วัดได้ตรงกับไฟล์นั้น หมายเหตุสำหรับการอ่านไฟล์ฐาน:

- มิติของ hover/active ไม่สามารถบังคับจากหน้าได้ การบันทึกจึงอ่าน**ข้อความประกาศของกฎ CSSOM ที่พบเป็นอันดับแรก**สำหรับแต่ละตัวเลือก hover และประมวลผลผ่านอิลิเมนต์ probe ภายในรูทของสกิน (ฟิลด์ `resolved`) — นี่คือสัญญาของกฎที่ชนะ ไม่ใช่ภาพสแนปช็อต `:hover` สด
- `_meta.selectors.menu` บันทึกข้อความตัวเลือกก่อนมี `SkinScope` ไฟล์ฐานถูกตรึง (ค่ามาตรฐาน) ฟิลด์นี้จึงล้าสมัยโดยตั้งใจ ชุดบันทึกปัจจุบันตรึงตัวเลือกปัจจุบัน
- ไฟล์ฐานเก็บการเปลี่ยนแปลงที่ได้รับอนุญาตไว้ใน `_meta.notes`: การคืนมาร์กอัป VBtnGroup ภายใต้ `groups: 'box'` เมื่อวันที่ 2026-10-18 ได้วัดฟิลด์ปุ่มลูก `groupBtn`/`buttonsActive` ของ classic ใหม่ (มุมที่เชื่อมกัน กล่องเป็นเจ้าของ elevation) ฟิลด์ของ pastel ไม่ถูกแตะ — การเปลี่ยนภาพโดยเจตนาจะอัปเดตเฉพาะเซลล์ classic ที่ได้รับผลกระทบ บันทึกหมายเหตุ และส่งพร้อมบรรทัดใน CHANGELOG

## ดูเพิ่มเติม {#see-also}

- [ตัวอย่างสกิน](/th/examples/skins) — classic, pastel และสกิน mint แบบกำหนดเอง แบบสด
- [prop `skin`](/th/api/props#skin) · [ไทป์ของสกิน](/th/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/th/api/types#tiptapifyskininput)
