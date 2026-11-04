# Stilovi sadržaja {#content-styles}

Neki elementi koje uređivač sprema trebaju vlastiti izgled na stranici koja ih prikazuje: kartice poveznica, slike s opisom i obtjecanjem, videozapisi i ugrađeni sadržaji koji stanu u širinu teksta, popisi zadataka s kvačicom uz svaku stavku. Bez toga je kartica poveznice gola poveznica u kojoj se slika i tekstovi stapaju.

Svojstvo `contentStyles` određuje kako spremljeni HTML nosi taj izgled:

| `contentStyles` | spremljeni HTML | na web-mjestu |
|---|---|---|
| `inline` (zadano) | izgled je upisan u atribute `style` tih elemenata | nema što učitavati: HTML se prikazuje onakav kakav jest |
| `classes` | samo klase i atributi `data-` | učitajte `tiptapify/content.css` i HTML stavite u element s klasom `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba načina nose ista pravila, kojima i sam uređivač prikazuje sadržaj, pa stranica u oba slučaja izgleda kao uređivač. Dobivaju ih samo ti elementi: naslovi, odlomci, popisi, tablice i ostatak teksta zadržavaju stilove web-mjesta.

## Ugrađeni stilovi {#inline-styles}

Zadani način. Kompaktna kartica poveznice sprema se ovako:

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

- **Boje ostaju boje web-mjesta.** Tekst nasljeđuje svoju boju; prigušeni tekst i rubovi koriste prozirnost i napola prozirnu sivu, pa rade i na svijetloj i na tamnoj stranici. Boju teksta za temu postavite na web-mjestu kao i obično.
- **Media queryji nisu potrebni.** Kompaktna kartica u uskom stupcu sama stavlja sliku iznad tekstova; videozapisi i ugrađeni sadržaji nikad nisu širi od teksta.
- **Web-mjesto ih i dalje može preoblikovati**, klase ostaju. Ugrađeni stil nadjačava pravilo klase, pa takvo pravilo treba `!important`.
- **Sanitizer mora zadržati atribut `style`** na tim elementima, inače gube izgled.

## Klase i content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` je malen i u sebi nema Vue ni Vuetify. Njegova pravila omotana su u `:where(.tiptapify-content)`, pa nemaju težinu: svako pravilo web-mjesta nadjačava ih bez `!important`. Koristite ga kad web-mjesto želi izgled na jednom mjestu ili samo stilizira svoj sadržaj.

`contentCss(scope)` daje isti stilski list kao niz znakova, za drugu klasu od `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Ponovno učitavanje HTML-a {#loading-html-back}

Uređivač te elemente čita samo prema njihovim atributima i klasama: karticu poveznice prema `data-link-card`, sliku prema `src`, veličini i obtjecanju, zadatak prema `data-checked`. Njihovi ugrađeni stilovi zanemaruju se pri učitavanju HTML-a, a pri spremanju se ponovno upisuju. Tako isti HTML putuje tamo i natrag nepromijenjen, dokument spremljen s `inline` čisto se učitava s `classes` i obrnuto, a kasnija verzija uređivača ažurira izgled dokumenta pri sljedećem spremanju.

Oblikovanje teksta se ne dira: boja ili veličina teksta i poravnanje odlomka jesu sadržaj, a uređivač ih i dalje čita iz njihovih stilova.

Za pretvaranje HTML-a s klasama u HTML s ugrađenim stilovima izvan uređivača (stariji dokument, e-pošta) koristite `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Treba mu DOM (preglednik ili jsdom na poslužitelju); bez njega vraća HTML nepromijenjen.

## Klizači slika {#image-sliders}

Uređivač tijekom pisanja slike u nizu označava kao klizač (vidi svojstvo `imageSlider`); spremljeni HTML ih zadržava kao slike s opisima jednu za drugom. Prikaz u obliku klizača posao je skripte web-mjesta.
