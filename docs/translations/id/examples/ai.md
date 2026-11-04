# AI {#ai}

Gunakan demo ini dengan penyedia apa pun yang kompatibel dengan OpenAI `/v1/chat/completions`. Kolom endpoint, model, dan token hanya digunakan selama sesi halaman ini dan tidak disimpan.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Tulis atau tempel teks, lalu gunakan tombol toolbar AI..."
/>

## Mode endpoint backend {#backend-endpoint-mode}

Ubah kolom **Mode** menjadi **Endpoint backend** agar tiptapify berkomunikasi langsung dengan backend Anda, tanpa `aiProvider` kustom. Ia mengirim payload minimal (`prompt`, `instruction`, serta kolom opsional `stream`, `thinking`, `reasoning_effort`, `model`) ke endpoint dan menerima respons JSON biasa, `{ content }`, atau streaming SSE — lihat [panduan AI](/id/guide/ai#backend-generation-aiendpoint) untuk kontrak lengkapnya.

## LM Studio Lokal {#local-lm-studio}

Untuk LM Studio, gunakan endpoint seperti:

```txt
http://localhost:1234/v1/chat/completions
```

Jika LM Studio berjalan di mesin lain, gunakan host tersebut, misalnya:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Untuk demo berbasis browser, gunakan dev proxy jika penyedia Anda tidak mengizinkan CORS.
