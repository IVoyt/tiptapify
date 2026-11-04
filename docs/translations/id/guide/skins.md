# Skin {#skins}

**Skin** adalah satu tampilan chrome editor: toolbar, tombol dan grup di dalamnya, bubble menu, dropdown menu, dialog, bingkai di sekitar konten, dan chrome pemilihan gambar. Prop `skin` memilihnya:

```vue
<Tiptapify skin="pastel" />
```

Skin terdiri dari dua hal: **token** (warna dan ukuran sebagai variabel CSS) dan **bentuk** (varian struktural yang tidak dapat diungkapkan token). Dua skin bawaan adalah `default` — tampilan klasik, toolbar timbul dengan grup tombol timbul — dan `pastel`, tampilan yang tenang. Skin kustom diperlakukan setara: `registerSkin()` dan objek skin inline diselesaikan melalui mekanisme yang persis sama, dan skin bawaan adalah skin terdaftar, bukan kasus khusus.

## Terminologi: skin vs tema Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — istilah untuk pengguna bagi satu tampilan chrome editor: token + shape. Propnya `skin`, tipenya `TiptapifySkin*`, registry-nya `registerSkin()`, class root-nya `tiptapify-skin-{name}`.
- **theme** — dicadangkan untuk tema terang/gelap Vuetify. Komponen Tiptapify menjaga prop `theme` mereka tetap diisi dari nama tema Vuetify saat ini; sistem skin tidak pernah menyentuhnya.

Keduanya saling melengkapi: sebagian besar warna token bawaan merujuk variabel tema Vuetify (`rgb(var(--v-theme-surface))`, …), sehingga skin mengikuti terang/gelap secara otomatis. Sel gelap-tetap di kolom classic — handle pengubah ukuran (`rgba(0, 0, 0, .5/.8)`), garis tepi gambar polos, bayangan bubble, dan bayangan elevasi menu/dialog — disengaja: tampilan klasik melukis chrome gelap netral di kedua tema, dan baseline terukur menguncinya. Skin kustom bebas merujuk variabel tema — lihat tabel token.

## Konsep {#concept}

### Token {#tokens}

Token adalah properti kustom CSS bernama `--tf-*`. Key katalog adalah camelCase dari akhiran CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Nilainya string biasa — warna, shorthand border lengkap, bayangan, padding, radius.

Setiap aturan skin di pustaka ada **sekali**, membaca tokennya dengan fallback yang sama dengan nilai classic (dasar):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Skin yang telah diselesaikan hanya mengeluarkan **penimpaan**-nya sebagai variabel; fallback CSS membawa nilai dasarnya. Variabel diletakkan pada root editor — dan, karena menu dan dialog di-teleport keluar darinya, pada wrapper `SkinScope` setiap menu dan pada kartu dialog itu sendiri, sehingga token mengikuti setiap permukaan.

### Shape {#shape}

Enam flag menentukan kumpulan aturan mana yang berlaku; token yang mewarnainya:

| flag | nilai | yang diubahnya |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevasi VToolbar + tanpa garis tipis di dalam vs bar datar berwarna lembut |
| `groups` | `box` · `flat` | seksi toolbar sebagai kotak **VBtnGroup** menonjol (markup 0.3.2: tombol menyatu, token grup mewarnai kotak) vs rangkaian div flex biasa |
| `buttons` | `vuetify` · `quiet` | tombol Vuetify asli vs tombol ghost dengan status ditekan netral |
| `bubble` | `card` · `flat` | dipertahankan demi kompatibilitas: bubble menu adalah satu baris tombol ikon yang diwarnai token pada kedua shape (tombolnya mengikuti `buttons`) |
| `dialog` | `classic` · `soft` | pemisah di bawah judul, tombol tutup menonjol vs kartu lembut, tombol tutup teks |
| `menu` | `vuetify` · `soft` | dropdown menu: daftar Vuetify vs kartu ringan berpadding |

Shape yang telah diselesaikan dikodekan pada root editor sebagai enam class `.tiptapify-shape-{flag}-{value}`, dan diekspos sebagai `shape: ComputedRef<ResolvedShape>` pada [`useTiptapifyConfig()`](/id/api/types#usetiptapifyconfig) untuk komponen toolbar kustom.

### Extends {#extends}

Skin diselesaikan di atas dasar classic, lalu rantai `extends`-nya dari akar, lalu anggotanya sendiri:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Mata rantai yang hilang diselesaikan ke rantai yang terkumpul (dengan peringatan dev); siklus diselesaikan ke classic (dengan peringatan dev). Skin terdaftar dirujuk dengan nama; objek skin inline boleh `extends` nama terdaftar dan tidak pernah masuk ke registry global — skin kustom tidak pernah bocor antar editor. Key token yang tidak dikenal diabaikan dengan peringatan dev.

Demo langsung ketiga bentuk ada di [halaman contoh Skin](/id/examples/skins).

## Katalog token {#token-catalog}

Tabel di bawah adalah **kontrak v1**: key katalog (`TiptapifySkinColors` / `TiptapifySkinMetrics`) adalah nama yang dapat Anda atur. Sel classic adalah fallback CSS — nilai yang dilukis aturan dasar saat tidak ada skin yang menimpa token.

### Toolbar / bar {#toolbar-bar}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Item / grup / pemisah {#items-groups-dividers}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevasi Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Sel classic yang terukur adalah `normal` — nilai flex asli Vuetify, yang dibawa fallback CSS. Nilai dasar katalog `0px` adalah panjang eksplisit yang setara untuk penimpaan skin.

<a id="shadow-cells"></a>² Sel yang berbunyi "elevasi Vuetify *n*" bersifat deskriptif: string triple-shadow yang tepat adalah nilai terukur di fixture baseline yang di-commit (`src/skins/__fixtures__/skin-baseline.json`) dan merupakan fallback CSS. Untuk `groupShadow` itu adalah **elevasi 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — pada `groups: 'box'` seksi adalah VBtnGroup (`elevation="4"`), dan aturan token melukis kotak dengan triple ini di atas elevasi grup itu sendiri: kotak memiliki elevasi, tombol anak yang menyatu tidak membawa elevasi.

### Tombol {#buttons}

Token ini digunakan **hanya pada `buttons: 'quiet'`** — lihat [Keterjangkauan](#reachability).

| token | variabel CSS | nilai quiet (classic: Vuetify asli) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menu (pilihan, baris kosong, gambar) {#bubble-menus-selection-empty-line-image}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | sama |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | sama |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | sama |

### Dropdown menu {#dropdown-menus}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevasi Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Kotak **daftar** (radius, bayangan, padding daftar) menu classic saat ini adalah aturan skin — wrapper token `SkinScope` berada di antara aturan anak Vuetify sendiri dan daftar, sehingga pustaka memulihkan piksel itu sebagai aturan skin yang membaca token di atas. Piksel **item** tetap asli Vuetify (fixture mengukur default Vuetify di sana): keempat token item tidak aktif selama `menu: 'vuetify'`.

### Dialog {#dialogs}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevasi VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | bawaan field (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Bingkai (pembungkus border editor) {#frame-editor-border-wrapper}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, tanpa sisi atas | border penuh |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Pada shape toolbar datar, bingkai juga melukis delta per sisi (sisi atas, dan sisi bawah pada opasitas border 1,6×). Delta itu milik shape, bukan token: tidak dapat dijangkau lewat token.

### Gambar dan handle pengubah ukuran {#images-and-resize-handles}

| token | variabel CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (terpilih) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Toolbar gambar mengikuti flag `buttons`: pada shape quiet ia mendapat permukaan quiet — jaraknya 2px/4px membaca `--tf-bubble-gap` / `--tf-bubble-padding` dengan fallback menu gambar; tidak ada token toolbar gambar khusus.

### Tidak ada di katalog (wilayah escape hatch) {#not-in-the-catalog-escape-hatch-territory}

Beberapa dimensi yang disebut dalam gambaran desain tidak memiliki token katalog di v1: **tinggi toolbar, lebar bingkai, radius bingkai, lebar tombol, padding tombol, lebar dialog**. Tabel katalog di atas adalah kontraknya; untuk piksel ini buka [escape hatch](#escape-hatch-the-root-class) dan beri gaya langsung pada class yang stabil.

## Keterjangkauan {#reachability}

Kontraknya, dinyatakan sekali dan dipatuhi oleh setiap grup di atas:

> Token hanya melukis permukaan ketika shape mengaktifkan permukaan itu; visual Vuetify asli diberi gaya lewat warna tema Vuetify.

Per grup:

- **Toolbar, bingkai, chrome gambar/handle** — aktif di setiap shape; token melukisnya, sel classic adalah tampilan asli yang menjadi fallback token.
- **Kotak grup** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — pada `groups: 'box'` seksi adalah VBtnGroup (struktur 0.3.2: tombol menyatu, kotak membawa elevasi); aturan kotak melukisnya dengan token grup, dan `--tf-group-height` menjaga kontrak 32px dengan `!important` (aturan density Vuetify melawannya, seperti di 0.3.2). Pada `groups: 'flat'` seksi adalah rangkaian div biasa (transparan, tanpa bayangan, radius 0 adalah dasar shape).
- **Garis tipis pemisah** (`dividerWidth/Height/Color`) — garis tipis yang terlihat adalah fasilitas `groups: 'flat'`; pada shape box pemisah adalah spacer berukuran nol (`margin: 0 4px` dari aturan dasar).
- **Padding/jarak item** — rangkaian ringkas `6px 8px` dibatasi pada bar datar (`toolbar: 'flat'`), jarak grup pada seksi datar (`groups: 'flat'`); bar menonjol mempertahankan metrik classic.
- **Tombol** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — tidak aktif pada `buttons: 'vuetify'`: tombol Vuetify asli melukis statusnya sendiri. Beri gaya dengan warna tema Vuetify (`primary`, `surface`, …) — shape classic sengaja mewarisinya.
- **Metrik item menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — tidak aktif pada `menu: 'vuetify'`; Vuetify memiliki piksel item tersebut. Kotak **daftar** menu (radius/bayangan/padding) dilukis skin di kedua shape (lihat [catatan menu](#menu-classic-note)).
- **Chrome lembut dialog** (`dialogActionBtn*`, `dialogFieldRadius`, padding lembut, pemisah yang hilang) — dilukis pada `dialog: 'soft'`; pada `dialog: 'classic'` dialog adalah VCard dengan padding classic.
- **Chrome bubble** — menu pilihan, baris kosong, dan gambar adalah satu baris tombol ikon di kedua shape, dilukis oleh token bubble; `bubble` tidak lagi mengubah markup-nya.

Penimpaan yang sama dengan dasar katalog **tidak dikeluarkan** — pada shape non-classic, dasar shape itu sendiri dilukis lewat fallback CSS, sehingga "memulihkan" nilai classic (mis. mengatur `buttonActiveBg` kembali ke `rgb(var(--v-theme-primary))` pada `buttons: 'quiet'`) diam-diam tidak berpengaruh. Untuk memaksa nilai bergaya classic pada shape non-classic, atur penimpaan yang berbeda dari dasar katalog — literal setara seperti `rgba(var(--v-theme-primary), 1)` melukis identik dan lolos dari pelewatan itu.

Token sengaja tidak dihubungkan ke jalur asli — itulah yang menjaga `default` identik piksel dengan tampilan classic sementara semuanya melewati katalog.

## Resep {#recipes}

### Memperluas pastel {#extend-pastel}

Warisi shape quiet dan lukis ulang beberapa permukaan. Nama terdaftar berfungsi di editor mana pun:

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

Shape (flat/quiet/soft) berasal dari pastel; token yang tidak disentuh mempertahankan nilai pastel — wash tombol quiet tetap netral, hanya yang Anda timpa yang bergeser. Ini adalah skin yang dirender langsung di [halaman contoh](/id/examples/skins#custom-mint).

### Memperluas default {#extend-default}

Pertahankan struktur classic, atur warnanya:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` adalah akar implisit, jadi key-nya dapat dihilangkan: `{ toolbar: 'flat', … }` juga dimulai dari classic.

### Kustom penuh {#full-custom}

Tanpa `extends`, tanpa registrasi: berikan objek ke prop `skin` dan atur flag shape serta token dengan bebas. `name` memberi label Anda sendiri pada class root (lihat di bawah); tanpanya menjadi `tiptapify-skin-inline`.

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

`defineSkin` adalah helper identitas untuk definisi const bertipe (tidak masuk registry mana pun). Flag shape dapat diatur satu per satu — setiap flag yang Anda hilangkan tetap classic.

## Escape hatch: class root {#escape-hatch-the-root-class}

Setiap root editor membawa `tiptapify-skin-{name}` (`tiptapify-skin-inline` untuk objek inline tanpa nama). Pustaka **tidak pernah mengaitkan aturan apa pun pada nama skin** — class ini milik Anda:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Hook stabil untuk dijadikan acuan penulisan:

| class | lokasi |
|---|---|
| `tiptapify-skin-{name}` | root editor |
| `tiptapify-shape-{flag}-{value}` ×6 | root editor — shape yang telah diselesaikan |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | toolbar dan seksinya |
| `tiptapify-quiet-buttons` | root toolbar dan bubble pada `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | baris setiap bubble menu dan garis tipis di antara grupnya |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | baris menu pilihan, baris kosong, dan gambar |
| `tiptapify-btn--active` | tombol bubble menu yang ditekan (mark aktif, float gambar) |
| `tiptapify-menu` · `tiptapify-menu--soft` | konten overlay dropdown, pembawa aturan menu lembut |
| `tiptapify-skin-scope` | div cakupan token di dalam menu yang di-teleport |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | kartu dialog dan pembawa lembutnya |
| `tiptapify-frame` | pembungkus border editor |

**Pertahanan tema konsumen.** Lapisan skin dibangun agar bertahan dari tema admin yang menambah padding dan melukis ulang internal Vuetify: aturan dibatasi pada class shape/pembawa, menggunakan class ganda (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) untuk spesifisitas, dan menyimpan `!important` hanya di tempat kasus tema admin pada commit dasar membuktikan perlunya (kumpulan pertahanan menu.css). Konvensi agar penimpaan Anda sendiri tetap berfungsi di medan yang sama:

- batasi CSS Anda di bawah `.tiptapify-skin-{name}` (atau class shape) — jangan pernah pada internal Vuetify polos;
- utamakan token (`--tf-*`) untuk dimensi katalog, class untuk sisanya;
- samakan penggandaan saat menimpa komponen Vuetify (`.v-list-item` tunggal kalah dari aturan skin).

## Kontrak visual (catatan kontributor) {#visual-contract-contributor-note}

Gaya terkomputasi skin bawaan dikunci oleh fixture baseline `src/skins/__fixtures__/skin-baseline.json` (13 seksi × terang/gelap): lapisan CSS selesai ketika matriks terukur cocok dengannya. Catatan membaca untuk fixture:

- Dimensi hover/aktif tidak dapat dipaksakan dari halaman, jadi perekaman membaca **teks deklarasi aturan CSSOM yang pertama cocok** untuk setiap selektor hover dan menyelesaikannya lewat elemen probe di dalam root skin (kolom `resolved`) — itu adalah kontrak aturan pemenang, bukan snapshot `:hover` langsung.
- `_meta.selectors.menu` mencatat teks selektor sebelum-`SkinScope`. Fixture dibekukan (nilai normatif), jadi kolom itu sengaja usang; bundel perekaman mengunci selektor saat ini.
- Fixture membawa perubahan yang diizinkan di `_meta.notes`: pemulihan markup VBtnGroup pada 2026-10-18 di bawah `groups: 'box'` mengukur ulang kolom tombol anak classic `groupBtn`/`buttonsActive` (sudut menyatu, kotak memiliki elevasi). Kolom pastel tidak tersentuh — perubahan visual yang disengaja hanya memperbarui sel classic yang terdampak, mencatat sebuah note, dan menyertakan satu baris CHANGELOG.

## Lihat juga {#see-also}

- [Contoh Skin](/id/examples/skins) — classic, pastel, dan skin mint kustom, secara langsung.
- [Prop `skin`](/id/api/props#skin) · [tipe skin](/id/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/id/api/types#tiptapifyskininput).
