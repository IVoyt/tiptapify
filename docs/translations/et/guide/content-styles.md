# Sisu stiilid {#content-styles}

Osa sellest, mida redaktor salvestab, vajab seda näitaval lehel oma ilmet: linkide kaardid, pildid koos pealdise ja ümbervooluga, videod ja manusesisu, mis sobivad teksti laiusega, ülesandeloendid, kus iga punkti kõrval on märkeruut. Ilma selleta on linkide kaart paljas link, kus pilt ja tekstid jooksevad kokku.

Prop `contentStyles` määrab, kuidas salvestatud HTML seda ilmet kannab:

| `contentStyles` | salvestatud HTML | saidil |
|---|---|---|
| `inline` (vaikimisi) | ilme kirjutatakse nende elementide `style`-atribuutidesse | pole midagi laadida: HTML kuvatakse sellisena, nagu see on |
| `classes` | ainult klassid ja `data-`-atribuudid | laadi `tiptapify/content.css` ja pane HTML elementi, millel on klass `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Mõlemad kannavad samu reegleid, mille järgi redaktor ise sisu näitab, nii et leht näeb mõlemal juhul välja nagu redaktor. Neid saavad ainult need elemendid: pealkirjad, lõigud, loendid, tabelid ja ülejäänud tekst säilitavad saidi enda stiilid.

## Inline-stiilid {#inline-styles}

Vaikevalik. Kompaktne linkide kaart salvestatakse nii:

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

- **Värvid jäävad saidi omaks.** Tekst pärib oma värvi; summutatud tekst ja äärised kasutavad läbipaistmatust ja pooleldi läbipaistvat halli, nii et need sobivad võrdselt nii heledale kui ka tumedale lehele. Teema tekstivärv määra saidil nagu tavaliselt.
- **Meediapäringuid pole vaja.** Kompaktne kaart paneb pildi kitsas veerus ise tekstide kohale; videod ja manusesisu ei saa kunagi teksti laiusest laiemaks.
- **Sait võib neid ikkagi ümber stiliseerida**, klassid jäävad alles. Inline-stiil on tähtsam kui klassireegel, seega vajab selline reegel `!important`.
- **Sanitiseerija peab säilitama atribuudi `style`** nendel elementidel, muidu kaotavad need oma ilme.

## Klassid ja content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` on väike ning selles pole Vue-d ega Vuetifyt. Selle reeglid on mähitud `:where(.tiptapify-content)` sisse, seega neil pole kaalu: iga saidi reegel on tähtsam ilma `!important`-ita. Kasuta seda, kui sait tahab ilmet ühes kohas või stiliseerib oma sisu ise.

`contentCss(scope)` annab sama stiililehe stringina, muu klassi jaoks kui `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML-i tagasi laadimine {#loading-html-back}

Redaktor loeb neid elemente ainult atribuutide ja klasside järgi: linkide kaarti `data-link-card` järgi, pilti selle `src`, suuruse ja ümbervoolu järgi, ülesannet `data-checked` järgi. Nende inline-stiile HTML-i laadimisel eiratakse ja salvestamisel kirjutatakse uuesti. Seega liigub sama HTML edasi-tagasi muutumatuna, `inline`-iga salvestatud dokument laaditakse puhtalt `classes`-iga ja vastupidi ning redaktori hilisem versioon uuendab dokumendi ilmet järgmisel salvestamisel.

Teksti vormindust ei puututa: teksti värv või suurus ja lõigu joondus on sisu ning redaktor loeb neid edasi nende stiilidest.

Klassidega HTML-i muutmiseks inline-stiilidega HTML-iks väljaspool redaktorit (vanem dokument, e-kiri) kasuta `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

See vajab DOM-i (brauser või serveris jsdom) ning ilma selleta tagastab HTML-i sellisena, nagu see on.

## Pildiliugurid {#image-sliders}

Redaktor märgib järjest olevad pildid kirjutamise ajal pildiliuguriks (vt propi `imageSlider`); salvestatud HTML hoiab need järjestikuste figuuridena. Nende liugurina näitamine on saidi enda skripti asi.
