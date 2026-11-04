# İçerik stilleri {#content-styles}

Editörün kaydettiklerinin bir kısmı, onu gösteren sayfada kendine ait bir görünüme ihtiyaç duyar: bağlantı kartları, açıklaması ve hizalaması olan görseller, metin genişliğine sığan videolar ve gömülü içerikler, her öğenin yanında bir onay kutusu bulunan görev listeleri. Bu olmadan bağlantı kartı, görseli ve metinleri iç içe geçmiş çıplak bir bağlantıdan ibaret kalır.

`contentStyles` prop'u, kaydedilen HTML'in bu görünümü nasıl taşıdığını belirler:

| `contentStyles` | kaydedilen HTML | sitede |
|---|---|---|
| `inline` (varsayılan) | görünüm bu öğelerin `style` özniteliklerine yazılır | yüklenecek bir şey yok: HTML olduğu gibi görünür |
| `classes` | yalnızca sınıflar ve `data-` öznitelikleri | `tiptapify/content.css` dosyasını yükleyin ve HTML'i `tiptapify-content` sınıfına sahip bir öğenin içine koyun |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

İkisi de aynı kuralları taşır; bunlar editörün içeriği kendisinin gösterdiği kurallardır, dolayısıyla sayfa her iki durumda da editöre benzer. Bu kurallar yalnızca bu öğelere uygulanır: başlıklar, paragraflar, listeler, tablolar ve metnin geri kalanı sitenin kendi stillerini korur.

## Satır içi stiller {#inline-styles}

Varsayılan olandır. Kompakt bir bağlantı kartı şöyle kaydedilir:

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

- **Renkler sitenin kendisine ait kalır.** Metin rengini devralır; soluk metin ve kenarlıklar opaklık ve yarı saydam bir gri kullanır, bu yüzden açık ve koyu sayfada aynı şekilde çalışır. Bir tema için metin rengini sitede her zamanki gibi ayarlayın.
- **Media query gerekmez.** Kompakt kart, dar bir sütunda görselini kendiliğinden metinlerin üstüne alır; videolar ve gömülü içerikler metinden hiç geniş olmaz.
- **Bir site yine de bunları yeniden biçimlendirebilir**, sınıflar durur. Satır içi stil sınıf kuralının önüne geçer, bu yüzden böyle bir kural `!important` ister.
- **Bir sanitizer bu öğelerde `style` özniteliğini korumalıdır**, yoksa öğeler görünümlerini kaybeder.

## Sınıflar ve content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` küçüktür ve içinde Vue ya da Vuetify yoktur. Kuralları `:where(.tiptapify-content)` içine sarılıdır, bu yüzden ağırlıkları yoktur: sitenin herhangi bir kuralı `!important` olmadan onların önüne geçer. Site görünümü tek bir yerde istiyorsa ya da içeriğini kendisi biçimlendiriyorsa bunu kullanın.

`contentCss(scope)` aynı stil sayfasını, `tiptapify-content` dışında bir sınıf için dize olarak verir:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML'i geri yükleme {#loading-html-back}

Editör bu öğeleri yalnızca öznitelik ve sınıflarından okur: bağlantı kartını `data-link-card` ile, görseli `src`, boyut ve hizalamasıyla, görevi `data-checked` ile. Satır içi stilleri HTML yüklenirken yok sayılır, kaydedilirken yeniden yazılır. Böylece aynı HTML değişmeden gidip gelir; `inline` ile kaydedilen belge `classes` ile sorunsuz yüklenir ve tersi de geçerlidir, editörün sonraki bir sürümü de belgenin görünümünü bir sonraki kaydedişte günceller.

Metin biçimlendirmesine dokunulmaz: bir metnin rengi ya da boyutu ve bir paragrafın hizalaması içeriktir, editör bunları stillerinden okumaya devam eder.

Sınıflı HTML'i editörün dışında (eski bir belge, bir e-posta) satır içi stilli HTML'e çevirmek için `inlineContentStyles` kullanın:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Bir DOM gerektirir (tarayıcı veya sunucuda jsdom); DOM yoksa HTML'i olduğu gibi döndürür.

## Görsel slider'ları {#image-sliders}

Editör, siz yazarken bir satırdaki görselleri slider olarak işaretler (bkz. `imageSlider` prop'u); kaydedilen HTML bunları art arda figure'lar olarak tutar. Bunları slider olarak göstermek sitenin kendi betiğine kalmıştır.
