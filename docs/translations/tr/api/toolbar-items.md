# Araç Çubuğu Öğeleri {#toolbar-items}

Bölümlere göre düzenlenmiş, kullanılabilir tüm araç çubuğu öğeleri.

## Eylemler {#actions}

| Öğe      | Açıklama                    |
|----------|-----------------------------|
| `undo`   | Son değişikliği geri alır   |
| `redo`   | Geri alınan son değişikliği yineler |

## AI {#ai}

| Öğe  | Açıklama                                 |
|------|------------------------------------------|
| `ai` | Yapılandırılmışsa AI istek diyaloğunu açar |

## Biçim {#format}

| Öğe         | Açıklama             |
|-------------|----------------------|
| `bold`      | Kalın metni açar/kapatır |
| `italic`    | İtalik metni açar/kapatır |
| `underline` | Altı çizili metni açar/kapatır |
| `strike`    | Üstü çizili metni açar/kapatır |

## Ek Biçim {#format-extra}

| Öğe          | Açıklama                                     |
|--------------|----------------------------------------------|
| `sup`        | Üst simgeyi açar/kapatır                     |
| `sub`        | Alt simgeyi açar/kapatır                     |
| `code`       | Satır içi kodu açar/kapatır                  |
| `codeBlock`  | Sözdizimi vurgulamalı bir kod bloğu ekler    |
| `blockquote` | Bir alıntı bloğu ekler                       |

## Stil {#style}

| Öğe              | Açıklama                                   |
|------------------|--------------------------------------------|
| `heading`        | Başlık düzeyini (H1-H6) seçmek için açılır menü |
| `fontFamily`     | Yazı tipi ailesini seçmek için açılır menü |
| `fontSize`       | Yazı tipi boyutunu seçmek için açılır menü |
| `lineHeight`     | Satır yüksekliğini ayarlar                 |
| `textColor`      | Metin rengi: palet, son renkler, HEX, damlalık, özel seçici |
| `highlightColor` | Vurgu rengi: aynı seçici, başta "Vurgu yok" |

`heading` öğesi iki nokta üst üsteden sonra seçenekler alır: başlık düzeyleri, bir paragraf öğesi eklemek için `p` ve bunları açılır menü yerine ayrı düğmeler olarak göstermek için `inline`:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Hizalama {#alignment}

| Öğe       | Açıklama          |
|-----------|-------------------|
| `left`    | Metni sola hizalar |
| `center`  | Metni ortalar     |
| `right`   | Metni sağa hizalar |
| `justify` | Metni iki yana yaslar |
| `align`   | Hizalama açılır menüsü; `align:left,center,right` seçeneklerini sınırlar |

## Liste {#list}

| Öğe            | Açıklama                      |
|----------------|-------------------------------|
| `bulletList`   | Madde işaretli listeyi açar/kapatır |
| `orderedList`  | Numaralı listeyi açar/kapatır |
| `taskList`     | Görev listesini (onay kutuları) açar/kapatır |
| `indent`       | Geçerli bloğu girintiler      |
| `outdent`      | Geçerli bloğun girintisini azaltır |

## Medya {#media}

| Öğe       | Açıklama                          |
|-----------|-----------------------------------|
| `link`    | Bağlantı ekler/düzenler veya `linkPreview` ile bir [bağlantı kartı](/tr/guide/link-cards) |
| `image`   | Görsel ekler/düzenler: URL ile veya yükleyerek, alternatif metin, açıklama, boyut, konum |
| `video`   | Bir YouTube, Vimeo veya video dosyası (`.mp4`, `.webm`, `.ogg`, `.mov`) ekler/düzenler |
| `iframe`  | Bir sayfayı adresiyle veya iframe koduyla gömer |
| `emoji`   | Emoji seçiciyi açar (10 kategori) |
| `charmap` | Özel karakter seçiciyi açar       |
| `table`   | Tablo ekler                       |

## Çeşitli {#misc}

| Öğe             | Açıklama                                   |
|-----------------|--------------------------------------------|
| `line`          | Yatay çizgi ekler                          |
| `pagebreak`     | Sayfa sonu ekler                           |
| `source`        | Ham HTML kaynak görünümünü açar/kapatır    |
| `preview`       | HTML önizleme modunu açar/kapatır          |
| `fullscreen`    | Tam ekran düzenleme modunu açar/kapatır    |
| `formatClear`   | Seçimdeki tüm biçimlendirmeyi temizler     |
| `invisibleChar` | Görünmez karakterler (boşluklar vb.) ekler |

## Ayırıcılar {#separators}

Dizi biçimli `items` prop'unda düğme grupları arasında ayırıcı olarak `|` kullanın:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Eksiksiz Araç Çubuğu Örneği {#complete-toolbar-example}

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
