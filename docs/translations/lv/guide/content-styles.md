# Satura stili {#content-styles}

Daļai no tā, ko redaktors saglabā, vajadzīgs savs izskats lapā, kas to rāda: saišu kartēm, attēliem ar parakstu un apliekšanu, video un iegultajiem elementiem, kas pielāgojas teksta platumam, uzdevumu sarakstiem ar izvēles rūtiņu pie katra punkta. Bez tā saišu karte ir kaila saite, kurā attēls un teksti saplūst.

Rekvizīts `contentStyles` nosaka, kā saglabātais HTML nes šo izskatu:

| `contentStyles` | saglabātais HTML | vietnē |
|---|---|---|
| `inline` (noklusējums) | izskats tiek ierakstīts šo elementu `style` atribūtos | nekas nav jāielādē: HTML tiek rādīts tāds, kāds tas ir |
| `classes` | tikai klases un `data-` atribūti | ielādē `tiptapify/content.css` un ievieto HTML elementā ar klasi `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Abi nes vienus un tos pašus noteikumus, ar kuriem redaktors pats rāda saturu, tāpēc lapa abos gadījumos izskatās kā redaktors. Tos saņem tikai šie elementi: virsraksti, rindkopas, saraksti, tabulas un pārējais teksts saglabā vietnes paša stilus.

## Iekļautie stili {#inline-styles}

Noklusējuma veids. Kompakta saišu karte tiek saglabāta šādi:

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

- **Krāsas paliek vietnes krāsas.** Teksts manto savu krāsu; pelēkināts teksts un apmales izmanto necaurredzamību un pustransparentu pelēko, tāpēc tie vienādi labi darbojas gaišā un tumšā lapā. Tēmas teksta krāsu iestati vietnē kā parasti.
- **Multivides vaicājumi nav vajadzīgi.** Kompakta karte šaurā kolonnā pati novieto attēlu virs teksta; video un iegultie elementi nekad nepārsniedz teksta platumu.
- **Vietne tos joprojām var pārstilizēt**, klases paliek. Iekļautais stils ir svarīgāks par klases noteikumu, tāpēc šādam noteikumam vajag `!important`.
- **Sanitizētājam jāsaglabā atribūts `style`** šiem elementiem, citādi tie zaudē savu izskatu.

## Klases un content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` ir neliels, un tajā nav ne Vue, ne Vuetify. Tā noteikumi ir ietīti `:where(.tiptapify-content)`, tāpēc tiem nav svara: jebkurš vietnes noteikums ir svarīgāks bez `!important`. Izmanto to, kad vietne vēlas izskatu vienuviet vai pati stilizē savu saturu.

`contentCss(scope)` dod to pašu stilu lapu kā virkni citai klasei nekā `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML ielāde atpakaļ {#loading-html-back}

Redaktors šos elementus nolasa tikai pēc to atribūtiem un klasēm: saišu karti pēc `data-link-card`, attēlu pēc tā `src`, izmēra un apliekšanas, uzdevumu pēc `data-checked`. To iekļautie stili HTML ielādes laikā tiek ignorēti un saglabāšanas laikā ierakstīti no jauna. Tāpēc viens un tas pats HTML virzās turp un atpakaļ nemainīts, dokuments, kas saglabāts ar `inline`, tīri ielādējas ar `classes` un otrādi, un vēlāka redaktora versija atjaunina dokumenta izskatu nākamajā saglabāšanas reizē.

Teksta formatējums netiek skarts: teksta krāsa vai izmērs un rindkopas līdzinājums ir saturs, un redaktors tos turpina nolasīt no to stiliem.

Lai klašu HTML pārvērstu par HTML ar iekļautajiem stiliem ārpus redaktora (vecāks dokuments, e-pasts), izmanto `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Tam vajag DOM (pārlūku vai serverī jsdom), un bez tā tas atgriež HTML tādu, kāds tas ir.

## Attēlu slaidrādes {#image-sliders}

Redaktors rakstīšanas laikā atzīmē pēc kārtas esošus attēlus kā slaidrādi (skat. rekvizītu `imageSlider`); saglabātais HTML tos patur kā figūras vienu aiz otras. To rādīšana kā slaidrāde ir vietnes paša skripta ziņā.
