# Props {#props}

## Props `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tipe:** `String | Object`
- **Default:** `''`

Konten awal editor. Menerima string HTML atau objek JSON Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` hanya konten **awal**; untuk pengikatan dua arah gunakan `v-model` (lihat `modelValue`).

### `modelValue` {#modelvalue}

- **Tipe:** `String | Object`
- **Default:** `''`

Nilai pengikatan dua arah untuk `v-model`. Gunakan `v-model` agar nilai reaktif tetap sinkron dengan editor. Pada setiap pengeditan komponen mengeluarkan `update:modelValue` dengan HTML terbaru, yang ditulis kembali oleh `v-model` ke ref Anda. Jika hanya `v-model` yang digunakan (tanpa `:content`), nilai terikat menjadi konten awal editor.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Tipe:** `String`
- **Default:** `''`

Teks placeholder yang ditampilkan saat editor kosong.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipe:** `Number`
- **Default:** `null`

Tinggi minimum area konten editor dalam piksel.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipe:** `Boolean`
- **Default:** `true`

Tampilkan atau sembunyikan toolbar.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipe:** `Array<String> | Object`
- **Default:** `[]`

Item toolbar yang ditampilkan. Berikan array nama item atau objek dengan seksi bernama. Lihat [Item Toolbar](/id/api/toolbar-items).
Di dalam array, `'|'` membagi item menjadi grup (sesuai urutan itu, dari seksi mana pun tombol berasal) dan `'~'` mendorong item setelahnya ke akhir toolbar. Pada grup, nama yang bukan item bawaan menyediakan tempat untuk tombol kustom dengan nama itu dari `customExtensions`; tanpa tombol seperti itu, tempatnya dibuang.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipe:** `Boolean`
- **Default:** `false`

Jika `true`, prop `items` menentukan item yang **dikecualikan**, bukan yang disertakan.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipe:** `Boolean`
- **Default:** `true`

Tampilkan bubble menu saat teks dipilih: satu baris tombol ikon dalam grup — tebal, miring, garis bawah, coret | superskrip, subskrip | sorot, kode inline | tautan | hapus pemformatan. Setiap tombol memiliki tooltip dengan pintasannya dan menyala saat mark-nya aktif pada pilihan. Menu disembunyikan untuk blok yang dipilih (gambar, widget), di dalam kode, dan saat seluruh dokumen dipilih.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipe:** `Boolean`
- **Default:** `true`

Tampilkan floating menu pada baris kosong: judul 1, judul 2, dan daftar berpoin, dalam baris tombol ikon yang sama dengan bubble menu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipe:** `Boolean`
- **Default:** `true`

Aktifkan menu perintah garis miring (ketik `/` untuk memicunya).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipe:** `Boolean`
- **Default:** `true`

Tampilkan jumlah kata di footer editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipe:** `Boolean`
- **Default:** `true`

Tampilkan jumlah karakter di footer editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipe:** `Number | null`
- **Default:** `null`

Jumlah karakter maksimum yang diizinkan oleh ekstensi Tiptap `CharacterCount`. Atur `null` atau hilangkan prop untuk mengedit tanpa batas. Jika diatur ke nilai lebih besar dari `0`, footer menampilkan indikator kemajuan melingkar SVG dengan ambang berkode warna.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipe:** `String`
- **Default:** `'purple'`

Warna default indikator kemajuan melingkar yang ditampilkan di footer saat `limit` diatur.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipe:** `String`
- **Default:** `'orange'`

Warna indikator kemajuan saat penggunaan melebihi 75% dari batas.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipe:** `String`
- **Default:** `'red'`

Warna indikator kemajuan saat batas karakter telah tercapai.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipe:** `TiptapifyFooterAlignment`
- **Default:** `'end'`

Perataan item status footer. Menerima `'start'`, `'center'`, atau `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipe:** `Boolean | TiptapifyAiOptions`
- **Default:** `false`

Mengaktifkan item toolbar `ai`. Editor menyusun permintaan `/v1/chat/completions` yang kompatibel dengan OpenAI dan meneruskannya ke `aiProvider`. Gunakan callback provider untuk memanggil backend, BFF, endpoint yang dilindungi OAuth, LM Studio, atau pembungkus SDK Anda.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Contoh LLM lokal LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Output streaming didukung dengan mengatur `stream: true` dan mendorong token melalui argumen `stream` dari `aiProvider`. Kolom hasil di dialog AI diperbarui langsung saat chunk tiba, dan tombol **Hentikan** membatalkan permintaan yang sedang berjalan:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Teruskan `stream.signal` ke `fetch` (atau panggilan SDK Anda) agar permintaan dibatalkan saat pengguna mengklik **Hentikan** atau menutup dialog. Konten yang sudah ter-stream sebagian tetap di kolom hasil dan dapat diterapkan atau dibuang. Provider yang tidak melakukan streaming dapat mengabaikan argumen `stream` sepenuhnya — argumen ini opsional dan kompatibel mundur.

Model reasoning (Qwen thinking, DeepSeek, seri o) men-stream "pikiran" mereka dalam delta `reasoning_content` terpisah. Teruskan chunk tersebut melalui `stream.onReasoning()` — saat `showReasoning: true`, dialog merendernya di panel **Berpikir** yang dapat diciutkan di atas kolom hasil (panel disembunyikan secara default). Keluaran reasoning hanya untuk ditampilkan dan tidak pernah disisipkan ke editor.

Agar pengguna dapat mengganti mode thinking model per permintaan, atur `thinking: true` di opsi AI. Dialog lalu menampilkan toggle **Berpikir** (aktif secara default, direset setiap dibuka); plugin menuliskan nilai toggle ke permintaan sebagai `enable_thinking: true | false`, sehingga Anda tidak perlu lagi (dan sebaiknya tidak) mengatur `enable_thinking` sendiri di `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Jika `thinking` bernilai `false` atau dihilangkan, toggle tidak ditampilkan dan plugin mengirim `enable_thinking: false`, sehingga model yang berpikir secara default (Qwen3, DeepSeek, …) tidak berpikir.

Agar pengguna dapat memilih usaha penalaran per permintaan, atur `reasoningEffort` di opsi AI. Dialog lalu menampilkan dropdown **Usaha penalaran** yang diisi dari `options` — tingkat effort kustom (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Ekstensi selalu menambahkan item `default` ke dropdown sendiri (dasar mode thinking), jadi Anda tidak pernah mencantumkan `default` di konfigurasi; kolom `default` pada opsi memilih salah satu tingkat kustom Anda sejak awal saat dialog dibuka (jika tidak, `default` yang dipilih), dan nilainya direset setiap dibuka.
Nilai yang dipilih menentukan apa yang ditulis plugin ke permintaan: `default` mempertahankan mode thinking — toggle **Berpikir** tetap aktif dan mengendalikan `enable_thinking`; nilai lain dikirim sebagai `reasoning_effort`, dan toggle Berpikir dinonaktifkan selama nilai itu dipilih (provider menolak `enable_thinking` dan `reasoning_effort` dalam satu permintaan).
Dropdown hanya ditampilkan bila `thinking` diaktifkan dan toggle Berpikir menyala — mematikan thinking menyembunyikannya dan `reasoning_effort` tidak dikirim (permintaan kembali ke `enable_thinking: false`). Jika `options` tidak ada atau kosong, dropdown tidak dirender sama sekali:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

Panel **Berpikir** disembunyikan secara default (`showReasoning` bernilai default `false`). Atur `showReasoning: true` untuk menampilkan panel yang dapat diciutkan yang men-stream proses penalaran model (delta `reasoning_content`) sambil tetap mengaktifkan thinking — model tetap bernalar dan hasil diterapkan dengan cara yang sama, hanya penalaran langkah demi langkahnya yang ditampilkan tambahan:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Contoh prompt kustom menggantikan default yang dilokalkan:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` dan `storage` adalah hook opsional milik konsumen untuk integrasi browser langsung. Kunci API atau token provider yang ditaruh di kode browser atau penyimpanan browser terlihat oleh pengguna dan tidak boleh dianggap rahasia. Utamakan pola adaptor backend di atas untuk rahasia produksi.

Gunakan `mode: 'insert' | 'replace' | 'append'` untuk memilih sejak awal mode sisip pada tombol aksi dialog (**Sisipkan** / **Ganti** / **Tambahkan di akhir**). Tanpa `mode`, tombol default ke **Ganti** jika ada teks yang dipilih saat dialog dibuka dan ke **Sisipkan** jika tidak. Tombol aksi adalah split button: bagian utama menerapkan hasil pada mode yang dipilih sebelumnya, dan bagian "lainnya" (⋮) yang kecil di kanannya membuka menu yang mendaftar mode lain — mengklik salah satunya langsung menerapkan hasil pada mode itu.

Jika editor memiliki `limit` (batas jumlah karakter), penghitung karakter `generated / limit` ditampilkan di bawah kolom hasil begitu hasil dibuat (diperbarui langsung saat streaming dan menjadi merah lembut saat batas akan terlampaui).
Dialog juga menampilkan peringatan `ai.limit_exceeded` tepat setelah pembuatan jika keluaran AI akan melebihi batas.
Pada kondisi itu tombol **Sisipkan** dan menu mode alternatifnya dinonaktifkan — ekstensi `CharacterCount` menolak penyisipan apa pun yang membuat dokumen melewati batas, sehingga hasil diterapkan semua-atau-tidak-sama-sekali: disisipkan penuh jika muat, atau tidak disisipkan sama sekali jika melebihi batas.
Perpendek hasil untuk mengaktifkan kembali aksinya:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Gunakan `systemPrompt`, `temperature`, `chatCompletionOptions`, atau `createMessages(context)` untuk menyesuaikan permintaan chat-completions yang kompatibel dengan OpenAI. `context` berisi `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` adalah teks paragraf tempat pilihan berada di sekelilingnya (hingga 500 karakter masing-masing, kosong tanpa pilihan) — kirim bersama pilihan, atau model menganggap fragmen itu seluruh teks dan melengkapinya.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipe:** `String`
- **Default:** `undefined`

Alternatif untuk `aiProvider` kustom: arahkan fitur AI ke endpoint LLM backend dan tiptapify menyusun serta mengirim permintaan sendiri. Backend menerima payload JSON minimal:

- **Selalu:** `prompt` (permintaan yang diketik di dialog) dan `instruction` (`systemPrompt` Anda, pesan sistem dari `createMessages` kustom, atau default bawaan).
- **Opsional, dikirim hanya jika diatur:** `stream` (hanya `true`), `thinking` (toggle **Berpikir** di dialog, hanya `true`), `reasoning_effort` (tingkat effort yang dipilih), dan `model`.

Respons diterima secara longgar: string biasa, objek `{ content }`, atau payload `choices` yang kompatibel dengan OpenAI. Saat permintaan memiliki `stream: true`, body respons dibaca sebagai stream SSE (baris `data:`, diakhiri `data: [DONE]`): delta gaya OpenAI (`choices[0].delta.content` / `.reasoning_content`), chunk sederhana `{ type: 'content' | 'reasoning', data }`, chunk datar `{ content, reasoning_content }`, dan baris `data` teks biasa semuanya diterima. Jika backend mengabaikan `stream` dan menjawab dengan body biasa, body itulah yang digunakan. Respons non-OK menampilkan pesan error backend (JSON `{ error }` / `{ message }` atau body mentah) di dialog. Tombol **Hentikan** dan menutup dialog membatalkan permintaan yang sedang berjalan; konten yang sudah ter-stream sebagian tetap disimpan di kolom hasil.

Jika `aiProvider` dan `aiEndpoint` sama-sama diatur, `aiProvider` yang menang.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Tipe:** `Record<string, string>`
- **Default:** `undefined`

Header tambahan yang dikirim bersama permintaan `aiEndpoint`, digabungkan di atas `Content-Type: application/json`. Header `Authorization` yang diatur di sini dipertahankan apa adanya; jika tidak, token dari `tokenProvider` (bila diatur) dikirim sebagai `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Tipe:** `String`
- **Default:** `'Inter'`

Jenis font default untuk konten editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipe:** `String`
- **Default:** `'px'`

Satuan ukuran untuk nilai ukuran font.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipe:** `String`
- **Default:** `'0'`

Radius border untuk kontainer editor. Menerima nilai radius Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, dll.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipe:** `variantBtnTypes`
- **Default:** `'tonal'`

Varian tombol Vuetify untuk tombol toolbar. Nilainya dibagikan ke setiap komponen toolbar melalui konfigurasi editor — komponen kustom dapat membacanya dengan [`useTiptapifyConfig`](/id/api/types#usetiptapifyconfig). Lihat [`variantBtnTypes`](/id/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipe:** `variantFieldTypes`
- **Default:** `'outlined'`

Varian Vuetify untuk kolom dropdown toolbar. Nilainya dibagikan ke setiap komponen toolbar melalui konfigurasi editor — komponen kustom dapat membacanya dengan [`useTiptapifyConfig`](/id/api/types#usetiptapifyconfig). Lihat [`variantFieldTypes`](/id/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipe:** `Array<toolbarSections>`
- **Default:** `[]`

Sediakan seksi toolbar kustom untuk memperluas atau menambah item toolbar. Komponen setiap seksi dapat membaca konfigurasi editor bersama dengan [`useTiptapifyConfig`](/id/api/types#usetiptapifyconfig). Lihat [Toolbar Kustom](/id/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipe:** `Boolean`
- **Default:** `true`

Aktifkan penerapan gaya interaktif.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipe:** `Boolean`
- **Default:** `false`

Tampilkan bilah kemajuan indeterminate saat editor sedang dimuat.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipe:** `String`
- **Default:** `'default'`

Warna bilah kemajuan pemuatan. Menerima nilai warna tema Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipe:** `String`
- **Default:** `'1px'`

Tinggi bilah kemajuan pemuatan.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipe:** `Number`
- **Default:** `0`

Mulai dari sekian gambar berturut-turut (tanpa apa pun di antaranya), editor menata gambar-gambar itu sebagai kisi tiga kolom bernomor, untuk situs yang menampilkan gambar semacam itu sebagai slider. `0` menonaktifkannya.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipe:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/id/api/types#tiptapifyskininput))
- **Default:** `'default'`

Tampilan chrome editor: toolbar, bubble menu, dropdown, dialog, footer.

- `default` — tampilan klasik: toolbar timbul, grup tombol sebagai kotak timbul, tombol Vuetify dengan status ditekan berwarna primer.
- `pastel` — tampilan tenang: toolbar datar berwarna lembut di bawah garis tipis, tombol ghost dengan status ditekan netral, dropdown ringan, dialog lembut.

Fitur (keterangan gambar, slider, dropdown perataan, gaya daftar) bekerja sama di kedua skin.

```vue
<Tiptapify skin="pastel" />
```

Anda juga dapat memberikan objek skin inline: penimpaan token (`colors` / `metrics`) dan flag shape, dengan opsi `extends` skin terdaftar. Objek ini diselesaikan di atas `default` (atau dasarnya), dirender dengan class `tiptapify-skin-inline` (`tiptapify-skin-{name}` jika objek memiliki `name`), dan token-nya muncul sebagai variabel CSS `--tf-*` pada root editor. Nama kustom berasal dari `registerSkin('mint', { … })` — lihat [panduan Skin](/id/guide/skins) untuk tabel token dan resepnya.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipe:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/id/api/types#tiptapifyuploadoptions))
- **Default:** `null`

Endpoint [unggahan](/id/guide/uploads): berkas yang dipilih di dialog gambar dan video (serta poster video, gambar kartu tautan) dikirim ke sana dengan `POST {endpoint}` (`file` dan `kind` multipart), dan dokumen menyimpan URL yang dijawabnya (`{ "url": … }`).

Tanpanya dialog gambar tetap menerima berkas: gambar yang dipilih (dan poster video) disematkan ke dokumen sebagai data URL base64, dan gambar base64 dipertahankan saat dokumen dimuat. Dialog video menawarkan **Unggah** hanya dengan prop ini. Dengan `upload` diatur, gambar base64 dibuang saat dokumen dimuat.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipe:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/id/api/types#tiptapifycontentstyles))
- **Default:** `'inline'`

Cara HTML yang disimpan membawa tampilan kartu tautan, gambar dengan keterangan, video, embed, dan daftar tugas (lihat [Gaya konten](/id/guide/content-styles)): `inline` menuliskannya ke atribut `style` elemen-elemen tersebut, sehingga situs menampilkan HTML apa adanya; `classes` hanya menyimpan class, untuk situs yang memuat `tiptapify/content.css`. Editor mengabaikan gaya ini saat HTML dimuat, sehingga kedua jenis HTML dimuat dengan hasil yang sama.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipe:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/id/api/types#tiptapifylinkpreviewoptions))
- **Default:** `null`

Endpoint backend [kartu tautan](/id/guide/link-cards): ia membaca data OpenGraph halaman, yang tidak dapat dibaca browser (CORS). Editor memeriksanya dengan handshake saat dimulai (`GET {endpoint}` harus menjawab `200 { "tiptapifyLinkPreview": 1 }`); sampai ia menjawab, tidak ada yang menawarkan kartu.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Event {#events}

### `editor-ready` {#editor-ready}

Dipicu saat instance editor siap.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Dipicu saat konten editor berubah.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Mendukung pengikatan `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

Instance editor dan fungsi `t` tersedia melalui provide/inject Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
