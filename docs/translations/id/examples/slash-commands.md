# Perintah Garis Miring {#slash-commands}

Perintah garis miring menyediakan menu sisip cepat yang muncul saat Anda mengetik `/` di awal baris.

## Mengaktifkan Perintah Garis Miring {#enabling-slash-commands}

Perintah garis miring aktif secara default. Untuk mengendalikannya secara eksplisit:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo perintah garis miring..."
:slash-commands="true"
/>

## Perintah yang Tersedia {#available-commands}

Ketik `/` di editor untuk melihat palet perintah. Perintah yang tersedia meliputi:

| Perintah        | Deskripsi                          |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Sisipkan judul (tingkat 1-6)       |
| `/bulletList`   | Sisipkan daftar berpoin            |
| `/numberedList` | Sisipkan daftar bernomor           |
| `/taskList`     | Sisipkan daftar tugas              |
| `/code`         | Sisipkan kode inline               |
| `/codeBlock`    | Sisipkan blok kode                 |
| `/quote`        | Sisipkan kutipan blok              |
| `/image`        | Sisipkan gambar (membuka dialog URL) |
| `/video`        | Sematkan video YouTube             |
| `/table`        | Sisipkan tabel                     |
| `/link`         | Sisipkan hyperlink                 |
| `/divider`      | Sisipkan garis horizontal          |
| `/emoji`        | Buka pemilih emoji                 |
| `/specialChars` | Buka karakter khusus               |

## Cara Kerjanya {#how-it-works}

1. Tempatkan kursor di awal baris atau setelah spasi
2. Ketik `/` — palet perintah muncul
3. Lanjutkan mengetik untuk menyaring perintah
4. Tekan `Enter` atau klik untuk menyisipkan perintah yang dipilih

## Menonaktifkan Perintah Garis Miring {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Perintah Garis Miring dengan Floating Menu {#slash-commands-with-floating-menu}

Gabungkan perintah garis miring dengan floating menu untuk pengalaman mengedit terbaik:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Perintah garis miring** (`/`) — dipicu dengan mengetik `/` di awal baris
- **Floating menu** — muncul saat Anda menempatkan kursor di baris kosong (menawarkan aksi tingkat blok)
- **Bubble menu** — muncul saat Anda memilih teks (menawarkan pemformatan inline)

## Menyaring Perintah yang Tersedia {#filtering-available-commands}

Anda dapat menentukan perintah mana yang disertakan dengan memberikan array ID perintah:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### ID Perintah yang Tersedia {#available-command-ids}

| ID             | Deskripsi            |
|----------------|----------------------|
| `h1` - `h6`    | Judul tingkat 1-6    |
| `bulletList`   | Daftar berpoin       |
| `numberedList` | Daftar bernomor      |
| `taskList`     | Daftar tugas         |
| `code`         | Kode inline          |
| `codeBlock`    | Blok kode            |
| `quote`        | Kutipan blok         |
| `image`        | Gambar               |
| `video`        | Video YouTube        |
| `table`        | Tabel                |
| `link`         | Tautan               |
| `divider`      | Garis horizontal     |
| `emoji`        | Emoji                |
| `specialChars` | Karakter khusus      |
