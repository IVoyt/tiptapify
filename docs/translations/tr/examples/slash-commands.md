# Slash Komutları {#slash-commands}

Slash komutları, bir satırın başında `/` yazdığınızda açılan bir hızlı ekleme menüsü sağlar.

## Slash Komutlarını Etkinleştirme {#enabling-slash-commands}

Slash komutları varsayılan olarak etkindir. Bunları açıkça denetlemek için:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Slash komutları demosu..."
:slash-commands="true"
/>

## Kullanılabilir Komutlar {#available-commands}

Komut paletini görmek için düzenleyicide `/` yazın. Kullanılabilir komutlar şunlardır:

| Komut         | Açıklama                          |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Başlık ekler (1-6. seviye)      |
| `/bulletList`   | Madde işaretli liste ekler               |
| `/numberedList` | Numaralı liste ekler             |
| `/taskList`     | Görev listesi ekler                 |
| `/code`         | Satır içi kod ekler                 |
| `/codeBlock`    | Kod bloğu ekler                |
| `/quote`        | Alıntı bloğu ekler                |
| `/image`        | Görsel ekler (URL diyaloğunu açar) |
| `/video`        | YouTube videosu gömer              |
| `/table`        | Tablo ekler                     |
| `/link`         | Bağlantı ekler                 |
| `/divider`      | Yatay çizgi ekler           |
| `/emoji`        | Emoji seçiciyi açar                  |
| `/specialChars` | Özel karakterleri açar            |

## Nasıl Çalışır {#how-it-works}

1. İmlecinizi bir satırın başına veya bir boşluktan sonraya getirin
2. `/` yazın — komut paleti açılır
3. Komutları filtrelemek için yazmaya devam edin
4. Seçilen komutu eklemek için `Enter` tuşuna basın veya tıklayın

## Slash Komutlarını Devre Dışı Bırakma {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash Komutları ve Kayan Menü {#slash-commands-with-floating-menu}

En iyi düzenleme deneyimi için slash komutlarını kayan menüyle birlikte kullanın:

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

- **Slash komutları** (`/`) — bir satırın başında `/` yazılınca tetiklenir
- **Kayan menü** — imlecinizi boş bir satıra getirdiğinizde görünür (blok düzeyinde eylemler sunar)
- **Balon menü** — metin seçtiğinizde görünür (satır içi biçimlendirme sunar)

## Kullanılabilir Komutları Filtreleme {#filtering-available-commands}

Bir komut kimliği dizisi vererek hangi komutların dahil edileceğini belirleyebilirsiniz:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Kullanılabilir Komut Kimlikleri {#available-command-ids}

| ID             | Açıklama          |
|----------------|----------------------|
| `h1` - `h6`    | Başlık seviyeleri 1-6   |
| `bulletList`   | Madde işaretli liste          |
| `numberedList` | Numaralı liste        |
| `taskList`     | Görev listesi            |
| `code`         | Satır içi kod          |
| `codeBlock`    | Kod bloğu           |
| `quote`        | Alıntı bloğu           |
| `image`        | Görsel                |
| `video`        | YouTube videosu        |
| `table`        | Tablo                |
| `link`         | Bağlantı                 |
| `divider`      | Yatay çizgi      |
| `emoji`        | Emoji                |
| `specialChars` | Özel karakterler   |
