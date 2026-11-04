# Medya {#media}

## Görseller {#images}

Bir URL'den görsel ekleyin:

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

Görsel düğmesi görsel diyaloğunu açar:

- **URL ile** veya **Yükle**. [Yükleme uç noktası](/tr/guide/uploads) yoksa seçilen dosya base64 veri URL'si olarak gömülür; varsa dosya sunucunuza gider.
- **Alternatif metin** (boş olduğunda diyalog sizi uyarır) ve görselin altında bir **açıklama**.
- **Boyut**: orijinal, metin genişliği veya oran kilidiyle özel genişlik × yükseklik.
- **Konum**: kendi satırında ortalanmış veya metnin soluna ya da sağına yüzen.

Seçili bir görselin yeniden boyutlandırma tutamaçları (her yeniden boyutlandırma tek bir geri alma adımıdır) ve üzerinde bir araç çubuğu vardır: sola veya sağa yüzdürme, indirme, düzenleme, silme. Çift tıklama diyaloğu açar.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videolar {#videos}

YouTube ve Vimeo videolarını veya bir video dosyasını gömün:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Video düğmesi video diyaloğunu açar:

- **Bir YouTube veya Vimeo bağlantısı** kendi oynatıcılarına dönüşür; diyalog tanınan sağlayıcıyı ve bir önizlemeyi, oynatıcının desteklediği yerlerde ise **Başlangıç** zamanını (`?t=` değerinden önceden doldurulur) gösterir.
- **Bir video dosyasının bağlantısı** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) kapak görseli, denetimler, otomatik oynatma (sessiz) ve döngü içeren bir `<video>` olur. Bağlantının protokolü (`https://`, `http://`), `//host` veya `/path` biçimi olmalıdır: diyalog hiçbirini tahmin etmez.
- **Yükle**, bir video dosyasını sunucunuza gönderir; yalnızca bir [yükleme uç noktası](/tr/guide/uploads) varsa görünür.
- **Boyut**: duyarlı 16:9 veya oran kilidiyle özel genişlik × yükseklik.

Metne yapıştırılan bir YouTube URL'si de gömülür. Oynatıcıya tıklamak onu oynatmak yerine seçer; böylece araç çubuğu düğmesi onu gösterir; çift tıklama diyaloğu açar.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Video gömmek için bir YouTube URL'si yapıştırın..." />

## Iframe'ler {#iframes}

Bir sayfayı adresiyle veya Paylaş ya da Göm menüsündeki iframe koduyla gömün:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe diyaloğu yapıştırılan kodu (adres, boyut, başlık, izinler, sandbox, gecikmeli yükleme, tam ekran) okur ve ondan neleri aldığını söyler; betik veya başka etiketler içeren kod reddedilir. Bir önizleme gösterir ve bir **ekran okuyucular için başlık**, boyut (kodun oranlarında duyarlı veya oran kilidiyle özel) ile **Gelişmiş** altında ad, `allow`, `sandbox`, gecikmeli yükleme ve bir kenarlık sunar. Adres `https://` veya `http://` ile başlamalıdır. Bir gömmeye çift tıklamak diyaloğu açar.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Iframe olarak gömmek için bir URL girin..." />

## Tablolar {#tables}

Tablo ekleyin ve düzenleyin:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Bir tablo ekledikten sonra şunları yapabilirsiniz:
- Satır ve sütun ekleme/kaldırma
- Hücre seçme
- Tablonun tamamını silme

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Tablo eklemek için tablo düğmesini kullanın..." />

## Bağlantılar {#links}

Köprü ekleyin:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Bağlantı diyaloğu adresi yazıldığı gibi alır: `https://…`, başka herhangi bir şema (`ftp://`, `ssh://`, dahili bir şema), `mailto:`, `tel:`, `#anchor` veya `/page`. Kendiliğinden hiçbir zaman protokol eklemez: protokolsüz bir adres (`example.com`, `internal.host:8080`) için `https://`, `http://` veya `ftp://` ekleyen çipler sunulur ve hiçbirini eklemezseniz yazıldığı gibi kalır. `javascript:`, `vbscript:` ve `data:` adresleri reddedilir.

Diyalogda ayrıca bağlantı metni, **Yeni sekmede aç** (`noopener noreferrer` ekler) ve **Gelişmiş** altında çip olarak `rel` değerleri (herhangi bir değer: Enter, boşluk veya virgül ekler) ile bir CSS sınıfı bulunur.

[`linkPreview`](/tr/api/props#linkpreview) prop'uyla aynı diyalog bir bağlantıyı sayfanın görseli, başlığı ve açıklamasıyla bir kart olarak gösterir; boş bir satıra yapıştırılan URL ise **Bağlantı / Kart** seçeneğini sunar — bkz. [Bağlantı kartları](/tr/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Köprü eklemek için metni seçip bağlantıya tıklayın..." />

## Emoji {#emoji}

10 kategorili yerleşik seçiciden emoji ekleyin:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emoji seçici, belirli emojileri hızla bulmak için bir arama/filtre alanı içerir.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Emoji eklemek için emoji düğmesine tıklayın..." />

## Özel Karakterler (Charmap) {#special-characters-charmap}

Özel karakterler, oklar, Yunan harfleri, matematik simgeleri ve daha fazlasını ekleyin:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategoriler şunlardır:
- Oklar
- Para birimleri
- Yunan Harfleri
- Matematik Simgeleri
- Çeşitli

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Özel karakter eklemek için charmap'e tıklayın..." />

## Medya Araçlarını Birleştirme {#combining-media-tools}

Tüm özellikleriyle bir medya araç çubuğu:

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
placeholder="Tam medya araç çubuğu..." />
