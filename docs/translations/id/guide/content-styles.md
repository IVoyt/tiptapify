# Gaya konten {#content-styles}

Sebagian dari yang disimpan editor membutuhkan tampilan tersendiri di halaman yang menampilkannya: kartu tautan, gambar dengan keterangan dan float-nya, video dan embed yang pas dengan lebar teks, serta daftar tugas dengan kotak centang di samping tiap item. Tanpa itu, kartu tautan hanyalah tautan polos dengan gambar dan teks yang menyatu.

Prop `contentStyles` menentukan bagaimana HTML yang disimpan membawa tampilan itu:

| `contentStyles` | HTML yang disimpan | di situs |
|---|---|---|
| `inline` (default) | tampilan ditulis ke atribut `style` elemen-elemen ini | tidak ada yang perlu dimuat: HTML tampil apa adanya |
| `classes` | hanya class dan atribut `data-` | muat `tiptapify/content.css` dan letakkan HTML di dalam elemen dengan class `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Keduanya membawa aturan yang sama, yaitu aturan yang dipakai editor sendiri untuk menampilkan konten, sehingga halaman terlihat seperti editor dalam kedua kasus. Hanya elemen-elemen ini yang mendapatkannya: judul, paragraf, daftar, tabel, dan teks lainnya tetap memakai gaya milik situs.

## Gaya inline {#inline-styles}

Ini default-nya. Kartu tautan compact disimpan sebagai:

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

- **Warna tetap milik situs.** Teks mewarisi warnanya; teks pudar dan border memakai opasitas serta abu-abu setengah transparan, sehingga bekerja baik di halaman terang maupun gelap. Atur warna teks untuk sebuah tema di situs seperti biasa.
- **Tidak perlu media query.** Kartu compact menempatkan gambarnya di atas teks dengan sendirinya pada kolom sempit; video dan embed tidak pernah lebih lebar dari teks.
- **Situs tetap bisa menata ulang tampilannya**, class-nya tetap ada. Gaya inline mengalahkan aturan class, sehingga aturan semacam itu memerlukan `!important`.
- **Sanitizer harus mempertahankan atribut `style`** pada elemen-elemen ini, jika tidak tampilannya hilang.

## Class dan content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` berukuran kecil dan tidak mengandung Vue atau Vuetify. Aturannya dibungkus dalam `:where(.tiptapify-content)`, sehingga tidak memiliki bobot: aturan apa pun dari situs mengalahkannya tanpa `!important`. Gunakan ini jika situs menginginkan tampilan di satu tempat, atau menata gaya kontennya sendiri.

`contentCss(scope)` memberikan stylesheet yang sama sebagai string, untuk class selain `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Memuat kembali HTML {#loading-html-back}

Editor membaca elemen-elemen ini hanya dari atribut dan class-nya: kartu tautan dari `data-link-card`, gambar dari `src`, ukuran, dan float-nya, tugas dari `data-checked`. Gaya inline-nya diabaikan saat HTML dimuat, dan ditulis ulang saat disimpan. Jadi HTML yang sama bisa bolak-balik tanpa berubah, dokumen yang disimpan dengan `inline` dimuat dengan baik dengan `classes` dan sebaliknya, dan editor versi berikutnya memperbarui tampilan dokumen saat dokumen itu disimpan lagi.

Pemformatan teks tidak disentuh: warna atau ukuran teks dan perataan paragraf adalah konten, dan editor terus membacanya dari gayanya.

Untuk mengubah HTML berbasis class menjadi HTML bergaya inline di luar editor (dokumen lama, email), gunakan `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Fungsi ini memerlukan DOM (browser, atau jsdom di server) dan mengembalikan HTML apa adanya tanpa DOM.

## Slider gambar {#image-sliders}

Editor menandai gambar yang berderet dalam satu baris sebagai slider saat Anda menulis (lihat prop `imageSlider`); HTML yang disimpan menyimpannya sebagai figure yang berurutan. Menampilkannya sebagai slider diserahkan pada skrip situs itu sendiri.
