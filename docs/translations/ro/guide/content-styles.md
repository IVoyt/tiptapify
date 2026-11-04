# Stiluri de conținut {#content-styles}

O parte din ceea ce salvează editorul are nevoie de un aspect propriu în pagina care îl afișează: carduri de link, imagini cu legendă și poziționare, videoclipuri și încorporări care se potrivesc lățimii textului, liste de sarcini cu o casetă de bifat lângă fiecare element. Fără el, un card de link este un simplu link cu imaginea și textele lipite una de alta.

Prop-ul `contentStyles` spune cum poartă HTML-ul salvat acest aspect:

| `contentStyles` | HTML-ul salvat | pe site |
|---|---|---|
| `inline` (implicit) | aspectul este scris în atributele `style` ale acestor elemente | nu e nimic de încărcat: HTML-ul se afișează așa cum este |
| `classes` | doar clase și atribute `data-` | încărcați `tiptapify/content.css` și puneți HTML-ul într-un element cu clasa `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Ambele poartă aceleași reguli, cele cu care editorul însuși afișează conținutul, deci o pagină arată ca editorul în ambele cazuri. Doar aceste elemente le primesc: titlurile, paragrafele, listele, tabelele și restul textului păstrează stilurile proprii ale site-ului.

## Stiluri inline {#inline-styles}

Varianta implicită. Un card de link compact este salvat astfel:

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

- **Culorile rămân ale site-ului.** Textul își moștenește culoarea; textul estompat și chenarele folosesc opacitate și un gri semitransparent, deci funcționează la fel pe o pagină deschisă și pe una întunecată. Setați culoarea textului pentru o temă pe site, ca de obicei.
- **Nu sunt necesare media queries.** Un card compact își pune singur imaginea deasupra textelor într-o coloană îngustă; videoclipurile și încorporările nu devin niciodată mai late decât textul.
- **Un site le poate totuși restiliza**, clasele rămân. Un stil inline are prioritate față de o regulă de clasă, deci o astfel de regulă are nevoie de `!important`.
- **Un sanitizer trebuie să păstreze atributul `style`** pe aceste elemente, altfel își pierd aspectul.

## Clase și content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` este mic și nu conține Vue sau Vuetify. Regulile sale sunt învelite în `:where(.tiptapify-content)`, deci nu au greutate: orice regulă a site-ului are prioritate fără `!important`. Folosiți-l când site-ul vrea aspectul într-un singur loc sau își stilizează singur conținutul.

`contentCss(scope)` dă aceeași foaie de stiluri ca șir de caractere, pentru o altă clasă decât `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Încărcarea HTML-ului înapoi {#loading-html-back}

Editorul citește aceste elemente doar după atributele și clasele lor: un card de link după `data-link-card`, o imagine după `src`, dimensiune și poziționare, o sarcină după `data-checked`. Stilurile lor inline sunt ignorate la încărcarea HTML-ului și scrise din nou la salvare. Astfel același HTML merge înainte și înapoi neschimbat, un document salvat cu `inline` se încarcă curat cu `classes` și invers, iar o versiune ulterioară a editorului actualizează aspectul unui document la următoarea salvare.

Formatarea textului nu este atinsă: culoarea sau dimensiunea unui text și alinierea unui paragraf sunt conținut, iar editorul continuă să le citească din stilurile lor.

Pentru a transforma HTML cu clase în HTML cu stiluri inline în afara editorului (un document mai vechi, un e-mail), folosiți `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Are nevoie de un DOM (un browser sau jsdom pe server) și fără el returnează HTML-ul așa cum este.

## Slidere de imagini {#image-sliders}

Editorul marchează imaginile aflate pe un rând ca slider cât timp scrieți (vezi prop-ul `imageSlider`); HTML-ul salvat le păstrează ca figuri una după alta. Afișarea lor ca slider depinde de scriptul propriu al site-ului.
