# Item Toolbar {#toolbar-items}

Semua item toolbar yang tersedia, disusun menurut seksi.

## Aksi {#actions}

| Item     | Deskripsi                     |
|----------|-------------------------------|
| `undo`   | Urungkan perubahan terakhir   |
| `redo`   | Ulangi perubahan yang diurungkan terakhir |

## AI {#ai}

| Item | Deskripsi                                      |
|------|------------------------------------------------|
| `ai` | Buka dialog prompt AI jika sudah dikonfigurasi |

## Format {#format}

| Item        | Deskripsi               |
|-------------|-------------------------|
| `bold`      | Aktifkan/nonaktifkan teks tebal |
| `italic`    | Aktifkan/nonaktifkan teks miring |
| `underline` | Aktifkan/nonaktifkan garis bawah |
| `strike`    | Aktifkan/nonaktifkan teks coret |

## Format Tambahan {#format-extra}

| Item         | Deskripsi                                      |
|--------------|------------------------------------------------|
| `sup`        | Aktifkan/nonaktifkan superskrip                |
| `sub`        | Aktifkan/nonaktifkan subskrip                  |
| `code`       | Aktifkan/nonaktifkan kode inline               |
| `codeBlock`  | Sisipkan blok kode dengan penyorotan sintaks   |
| `blockquote` | Sisipkan kutipan blok                          |

## Gaya {#style}

| Item             | Deskripsi                                  |
|------------------|--------------------------------------------|
| `heading`        | Dropdown untuk memilih tingkat judul (H1-H6) |
| `fontFamily`     | Dropdown untuk memilih jenis font          |
| `fontSize`       | Dropdown untuk memilih ukuran font         |
| `lineHeight`     | Atur tinggi baris                          |
| `textColor`      | Warna teks: palet, warna terbaru, HEX, eyedropper, pemilih kustom |
| `highlightColor` | Warna sorotan: pemilih yang sama, "Tanpa sorotan" di urutan pertama |

Item `heading` menerima opsi setelah titik dua: tingkat judul, `p` untuk menambahkan item paragraf, dan `inline` untuk menampilkannya sebagai tombol terpisah, bukan dropdown:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Perataan {#alignment}

| Item      | Deskripsi         |
|-----------|-------------------|
| `left`    | Rata kiri         |
| `center`  | Rata tengah       |
| `right`   | Rata kanan        |
| `justify` | Rata kiri-kanan   |
| `align`   | Dropdown perataan; `align:left,center,right` membatasi opsinya |

## Daftar {#list}

| Item           | Deskripsi                       |
|----------------|---------------------------------|
| `bulletList`   | Aktifkan/nonaktifkan daftar berpoin |
| `orderedList`  | Aktifkan/nonaktifkan daftar bernomor |
| `taskList`     | Aktifkan/nonaktifkan daftar tugas (kotak centang) |
| `indent`       | Geser blok saat ini ke dalam    |
| `outdent`      | Geser blok saat ini ke luar     |

## Media {#media}

| Item      | Deskripsi                         |
|-----------|-----------------------------------|
| `link`    | Sisipkan/edit tautan, atau [kartu tautan](/id/guide/link-cards) dengan `linkPreview` |
| `image`   | Sisipkan/edit gambar: lewat URL atau unggahan, teks alternatif, keterangan, ukuran, posisi |
| `video`   | Sisipkan/edit video YouTube, Vimeo, atau berkas video (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Sematkan halaman lewat alamatnya atau kode iframe-nya |
| `emoji`   | Buka pemilih emoji (10 kategori)  |
| `charmap` | Buka pemilih karakter khusus      |
| `table`   | Sisipkan tabel                    |

## Lain-lain {#misc}

| Item            | Deskripsi                                  |
|-----------------|--------------------------------------------|
| `line`          | Sisipkan garis horizontal                  |
| `pagebreak`     | Sisipkan pemisah halaman                   |
| `source`        | Aktifkan/nonaktifkan tampilan sumber HTML mentah |
| `preview`       | Aktifkan/nonaktifkan mode pratinjau HTML   |
| `fullscreen`    | Aktifkan/nonaktifkan mode edit layar penuh |
| `formatClear`   | Hapus semua pemformatan dari pilihan       |
| `invisibleChar` | Sisipkan karakter tak terlihat (spasi, dll.) |

## Pemisah {#separators}

Gunakan `|` sebagai pemisah antar grup tombol pada prop `items` bergaya array:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Contoh Toolbar Lengkap {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
