# Ekstensi AI {#ai-extension}

Ekstensi AI menambahkan tombol toolbar yang membuka dialog prompt, mengirim permintaan ke penyedia pilihan Anda, menampilkan hasil yang di-stream, dan menyisipkannya ke editor melalui tombol aksi sesuai mode (**Sisipkan** / **Ganti** / **Tambahkan di akhir**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

Prop `ai` menerima `true` (opsi dengan nilai default) atau objek opsi (`TiptapifyAiOptions`). Item toolbar `ai` selalu terdaftar, tetapi tombolnya **dinonaktifkan** kecuali `aiProvider` diatur.

Lihat [contoh AI](/id/examples/ai) untuk demo yang dapat dijalankan dan [Props](/id/api/props#ai) untuk referensi opsi lengkap.

## Arsitektur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` menormalkan prop `ai`: `ai: true` menjadi objek opsi kosong, `promptExamples` kembali ke default yang dilokalkan, dan hasilnya diekspos ke turunan melalui `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` atau `false`).
- Item toolbar (`src/components/Toolbar/ai.ts`) merender `Button.vue`. Tombol memeriksa ketersediaan `aiProvider` dan membuka `Dialog.vue`.
- `Dialog.vue` memegang seluruh siklus hidup permintaan: menyusun permintaan, memanggil penyedia, streaming, dan menyisipkan hasil.

## Kontrak provider {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Provider adalah fungsi async biasa yang Anda implementasikan. tiptapify tidak memanggil API apa pun sendiri — apa pun yang dapat memproses objek `request` yang kompatibel dengan OpenAI dapat digunakan (fetch, SDK, adaptor backend). Pengecualiannya adalah mode backend `aiEndpoint` (lihat [Pembuatan lewat backend](#backend-generation-aiendpoint)), di mana tiptapify mengirim permintaan ke endpoint Anda.

**Request** (`TiptapifyAiRequest`) diambil dari `chatCompletionOptions` Anda, lalu ditambah oleh plugin:

| Kolom | Sumber |
| --- | --- |
| `messages` | `createMessages(context)` jika disediakan, jika tidak pasangan default: pesan sistem (`systemPrompt` Anda atau default bawaan) dan pesan pengguna yang memuat prompt beserta teks editor yang dipilih dengan teks di sekitarnya dan aturan untuk menjawab hanya untuk pilihan (atau seluruh teks jika tidak ada yang dipilih) |
| `model` | opsi `model`, jika diatur |
| `temperature` | opsi `temperature`, jika diatur |
| `stream` | opsi `stream`, atau `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | toggle thinking / dropdown effort — lihat di bawah |

**Context** (`TiptapifyAiEditorContext`) memberi provider status editor lengkap: `prompt`, `selectedText`, `textBefore` / `textAfter` (teks paragraf tempat pilihan berada di sekelilingnya, hingga 500 karakter masing-masing), `text`, `html`, `json`, dan `mode` (`insert` / `replace` / `append`).

Pilihan yang dimulai atau berakhir di tengah kata mengambil seluruh kata, dan pesan default mengirim teks di sekitar pilihan beserta aturan untuk menjawab hanya untuk pilihan: jika hanya diberi fragmen, model menganggapnya seluruh teks dan melengkapinya, dan penggantinya akan mengulang apa yang mengikuti pilihan.

**Response**: provider dapat mengembalikan konten sebagai `string` biasa, sebagai `{ content }` (`TiptapifyAiResponse`), atau sebagai payload `choices` yang kompatibel dengan OpenAI (`TiptapifyAiOpenAiResponse`). Dialog mengekstrak konten dengan urutan itu dan memangkas spasi di awal. Jika ditolak, pesan error ditampilkan di dialog (atau `ai.error` jika error bukan instance `Error`) dan dialog tetap terbuka.

## Pembuatan lewat backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Alih-alih mengimplementasikan `aiProvider`, arahkan fitur AI ke endpoint LLM backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify lalu menyusun permintaan dan mengirimkannya ke endpoint itu sendiri. `aiProvider` yang eksplisit selalu menang jika keduanya diatur.

**Request** — payload JSON minimal (`TiptapifyAiBackendRequest`):

| Kolom | Dikirim |
| --- | --- |
| `prompt` | selalu — permintaan yang diketik di dialog |
| `instruction` | selalu — `systemPrompt` Anda, pesan sistem dari `createMessages` kustom, atau default bawaan |
| `stream` | hanya saat `stream: true` |
| `thinking` | hanya saat toggle **Berpikir** di dialog aktif |
| `reasoning_effort` | hanya saat pengguna memilih tingkat (bukan `default`) |
| `model` | hanya saat opsi `model` diatur |

**Response** — diterima secara longgar: string biasa, objek `{ content }`, atau payload `choices` yang kompatibel dengan OpenAI.

**Streaming** — saat permintaan memiliki `stream: true`, body respons dibaca sebagai stream SSE (baris `data:`, diakhiri `data: [DONE]`). Format chunk yang diterima:

- Gaya OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Sederhana — `data: {"type":"content"|"reasoning","data":"…"}`
- Datar — `data: {"content":"…","reasoning_content":"…"}`
- Teks biasa — `data: some text` (baris `data` non-JSON adalah chunk konten)

Chunk `content` memperbarui kolom hasil melalui `onChunk`, chunk `reasoning_content` mengisi panel **Berpikir** melalui `onReasoning`. Jika backend mengabaikan `stream` dan menjawab dengan body biasa, body itulah yang digunakan. Klik **Hentikan** atau menutup dialog membatalkan permintaan; konten yang sudah ter-stream sebagian tetap disimpan di kolom hasil.

**Header** — `aiHeaders` (sebuah `Record<string, string>`) digabungkan di atas `Content-Type: application/json`. Header `Authorization` di `aiHeaders` dipertahankan apa adanya; jika tidak, token dari `tokenProvider` dikirim sebagai `Authorization: Bearer <token>`.

**Error** — respons non-OK menampilkan pesan error backend (JSON `{ error }` / `{ message }` atau body mentah) di dialog.

## Streaming {#streaming}

Saat `stream: true` (atau `chatCompletionOptions.stream` bernilai `true`), dialog meneruskan objek `TiptapifyAiStream` sebagai argumen ketiga:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — teruskan ke `fetch` (atau panggilan SDK Anda). Sinyal ini membatalkan saat pengguna mengklik **Hentikan** atau menutup dialog, sehingga permintaan yang sedang berjalan tidak terus berlangsung.
- **`onChunk`** — tambahkan setiap chunk konten ke kolom hasil. Selama pembuatan, kolom hasil bersifat hanya-baca dan konten yang sudah ter-stream sebagian dipertahankan (Anda dapat menghentikan, lalu menyisipkan atau membuangnya).
- **`onReasoning`** — teruskan keluaran reasoning/thinking model (mis. delta `reasoning_content` dari Qwen/DeepSeek/seri o) ke panel **Berpikir** yang dapat diciutkan di atas hasil. Panel otomatis mengembang dan menggulir otomatis saat streaming. Keluaran reasoning hanya untuk ditampilkan dan tidak pernah disisipkan ke editor.

Provider yang tidak melakukan streaming mengabaikan argumen `stream` — argumen ini opsional.

## Thinking dan reasoning effort {#thinking-and-reasoning-effort}

Dua kontrol pengguna di dialog dipetakan ke kolom permintaan. Keduanya bersifat opt-in lewat opsi dan dimiliki oleh plugin — Anda tidak (dan sebaiknya tidak) mengatur kolom ini sendiri di `chatCompletionOptions`.

- **`thinking: true`** menampilkan toggle **Berpikir** (aktif secara default, direset setiap dialog dibuka). Plugin menuliskan nilai toggle ke permintaan sebagai `enable_thinking: true | false`.
- **`thinking` tidak ada atau `thinking: false`** menyembunyikan toggle dan plugin mengirim `enable_thinking: false`, sehingga model yang berpikir secara default tidak berpikir.
- **`reasoningEffort: { options, default? }`** menampilkan dropdown **Usaha penalaran**. `options` mendaftar tingkat effort kustom yang ingin Anda tawarkan (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); ekstensi selalu menambahkan item `default` sendiri (dasar mode thinking), jadi Anda tidak pernah mencantumkan `default` di konfigurasi. Kolom `default` memilih salah satu tingkat kustom Anda sejak awal saat dialog dibuka — jika dihilangkan, `default` yang dipilih. Nilainya direset setiap kali dibuka. Dropdown hanya dirender bila `options` berupa daftar tidak kosong, `thinking` diaktifkan, dan toggle Berpikir aktif.
- **`showReasoning`** (default `false`) mengendalikan panel **Berpikir** yang dapat diciutkan yang men-stream proses penalaran model (delta `reasoning_content`). Atur `showReasoning: true` untuk menampilkan panel itu sambil tetap mengaktifkan thinking — model tetap bernalar, hasil diterapkan dengan cara yang sama, hanya penalaran langkah demi langkahnya yang ditampilkan tambahan.

Karena provider (terutama vLLM/LM Studio) menolak `enable_thinking` dan `reasoning_effort` dalam satu permintaan, plugin mengirim tepat salah satu dari keduanya:

| Status | Kolom permintaan |
| --- | --- |
| Thinking aktif, effort = `default` (atau tidak ada effort yang dikonfigurasi) | `enable_thinking` (dari toggle) |
| Thinking aktif, effort = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (dari dropdown); toggle dinonaktifkan |
| Thinking nonaktif (toggle mati, atau `thinking` tidak diaktifkan di konfigurasi) | `enable_thinking: false`; `reasoning_effort` tidak dikirim |

## Error {#errors}

Dialog menjelaskan permintaan yang gagal alih-alih menampilkan error mentah, dan menambahkan pesan dari layanan itu sendiri setelahnya:

| Yang terjadi | Penjelasan |
| --- | --- |
| Browser tidak mendapat respons (`Failed to fetch`, `NetworkError…`, `Load failed`) | Layanan mati, tidak terjangkau, atau CORS memblokir jawabannya; konsol browser menunjukkan penyebabnya |
| `401` / `403` | Periksa kunci API atau hak akses |
| `404` | Periksa path endpoint |
| `408` / `504` / timeout | Layanan tidak menjawab tepat waktu |
| `429` | Terlalu banyak permintaan |
| `5xx` | Layanan tidak tersedia (sedang memuat model, sibuk) |

Dengan `aiEndpoint`, status berasal dari respons. `aiProvider` kustom mendapat penjelasan yang sama dengan melempar error yang memiliki `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Error lain ditampilkan dengan pesannya sendiri.

## Menyisipkan hasil {#inserting-the-result}

Pada tombol aksi — **Sisipkan**, **Ganti** atau **Tambahkan di akhir**, tergantung mode — dialog menempatkan `result` ke editor:

- **Mode** — tombol aksi dialog adalah split button. Bagian utamanya menerapkan hasil pada mode yang dipilih sebelumnya (**Sisipkan** / **Ganti** / **Tambahkan di akhir**): opsi `mode` memilihnya sejak awal, atau **Ganti** jika ada teks yang dipilih saat dialog dibuka dan **Sisipkan** jika tidak. Bagian "lainnya" (⋮) yang kecil di sisi kanan tombol membuka menu berisi mode yang tersisa — mengklik salah satunya langsung menerapkan hasil pada mode itu. **Sisipkan** menempatkan hasil di kursor, **Ganti** mengganti teks yang dipilih (ditangkap saat **Hasilkan** diklik), dan **Tambahkan di akhir** menambahkannya di akhir dokumen.
- **Batas karakter** — saat editor dikonfigurasi dengan `limit` (ekstensi `CharacterCount` menolak setiap transaksi non-tempel yang akan membuat dokumen melewati batas), penghitung karakter `generated / limit` ditampilkan di bawah kolom hasil (langsung saat streaming, merah lembut saat batas akan terlampaui) dan dialog menampilkan peringatan `ai.limit_exceeded` tepat setelah pembuatan saat hasil akan melebihi batas. Tombol **Sisipkan** dan menu mode alternatifnya kemudian dinonaktifkan: hasil diterapkan secara semua-atau-tidak-sama-sekali, jadi Anda harus memperpendeknya sebelum menerapkannya.