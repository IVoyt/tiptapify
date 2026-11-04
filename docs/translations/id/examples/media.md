# Media {#media}

## Gambar {#images}

Sisipkan gambar dari URL:

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

Tombol gambar membuka dialog gambar:

- **Lewat URL** atau **Unggah**. Tanpa [endpoint unggahan](/id/guide/uploads), berkas yang dipilih disematkan sebagai data URL base64; dengan endpoint, berkas dikirim ke server Anda.
- **Teks alternatif** (dialog mengingatkan Anda saat kosong) dan **keterangan** di bawah gambar.
- **Ukuran**: asli, selebar teks, atau lebar × tinggi kustom dengan kunci rasio.
- **Posisi**: di tengah pada barisnya sendiri, atau mengambang di kiri atau kanan teks.

Gambar yang dipilih memiliki handle pengubah ukuran (setiap perubahan ukuran adalah satu langkah urungkan) dan toolbar di atasnya: mengambang ke kiri atau kanan, unduh, edit, hapus. Klik ganda membuka dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video {#videos}

Sematkan video YouTube dan Vimeo, atau berkas video:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Tombol video membuka dialog video:

- **Tautan YouTube atau Vimeo** menjadi pemutar mereka; dialog menampilkan penyedia yang dikenali dan pratinjau, serta **Mulai pada** (terisi otomatis dari `?t=`) jika pemutar mendukungnya.
- **Tautan ke berkas video** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) menjadi `<video>` dengan poster, kontrol, putar otomatis (tanpa suara), dan loop. Tautan memerlukan protokolnya (`https://`, `http://`), `//host` atau `/path`: dialog tidak pernah menebaknya.
- **Unggah** mengirim berkas video ke server Anda; hanya muncul bila ada [endpoint unggahan](/id/guide/uploads).
- **Ukuran**: responsif 16:9, atau lebar × tinggi kustom dengan kunci rasio.

URL YouTube yang ditempel ke teks juga disematkan. Klik pada pemutar memilihnya alih-alih memutarnya, sehingga tombol toolbar menampilkannya; klik ganda membuka dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Tempel URL YouTube untuk menyematkan video..." />

## Iframe {#iframes}

Sematkan halaman lewat alamatnya atau lewat kode iframe dari menu Bagikan atau Sematkan-nya:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dialog iframe membaca kode yang ditempel (alamat, ukuran, judul, izin, sandbox, pemuatan lambat, layar penuh) dan menyebutkan apa yang diambilnya; kode dengan skrip atau tag lain ditolak. Dialog menampilkan pratinjau dan memiliki **judul untuk pembaca layar**, ukuran (responsif dengan proporsi kode, atau kustom dengan kunci rasio), dan di bawah **Lanjutan** ada nama, `allow`, `sandbox`, pemuatan lambat, dan bingkai. Alamat memerlukan `https://` atau `http://`. Klik ganda pada sematan membuka dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Masukkan URL untuk disematkan sebagai iframe..." />

## Tabel {#tables}

Sisipkan dan edit tabel:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Setelah menyisipkan tabel, Anda dapat:
- Menambah/menghapus baris dan kolom
- Memilih sel
- Menghapus seluruh tabel

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Gunakan tombol tabel untuk menyisipkan tabel..." />

## Tautan {#links}

Sisipkan hyperlink:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dialog tautan menerima alamat apa adanya seperti diketik: `https://…`, skema lain (`ftp://`, `ssh://`, skema internal), `mailto:`, `tel:`, `#anchor` atau `/page`. Dialog tidak pernah menambahkan protokol sendiri: alamat tanpa protokol (`example.com`, `internal.host:8080`) mendapat chip untuk menambahkan `https://`, `http://` atau `ftp://`, dan tetap seperti diketik jika Anda tidak menambahkan apa pun. Alamat `javascript:`, `vbscript:` dan `data:` ditolak.

Dialog ini juga memiliki teks tautan, **Buka di tab baru** (yang menambahkan `noopener noreferrer`), dan di bawah **Lanjutan** nilai `rel` sebagai chip (nilai apa pun: Enter, spasi, atau koma menambahkannya) serta class CSS.

Dengan prop [`linkPreview`](/id/api/props#linkpreview), dialog yang sama menampilkan tautan sebagai kartu dengan gambar, judul, dan deskripsi halaman, dan URL yang ditempel pada baris kosong menawarkan **Tautan / Kartu** — lihat [Kartu tautan](/id/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Pilih teks lalu klik tautan untuk menambahkan hyperlink..." />

## Emoji {#emoji}

Sisipkan emoji dari pemilih bawaan dengan 10 kategori:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Pemilih emoji menyertakan kolom pencarian/filter untuk menemukan emoji tertentu dengan cepat.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Klik tombol emoji untuk menyisipkan emoji..." />

## Karakter Khusus (Charmap) {#special-characters-charmap}

Sisipkan karakter khusus, panah, huruf Yunani, simbol matematika, dan lainnya:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategori meliputi:
- Panah
- Mata uang
- Huruf Yunani
- Simbol Matematika
- Lain-lain

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Klik charmap untuk menyisipkan karakter khusus..." />

## Menggabungkan Alat Media {#combining-media-tools}

Toolbar media dengan fitur lengkap:

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
placeholder="Toolbar media lengkap..." />
