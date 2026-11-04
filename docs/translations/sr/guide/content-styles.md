# Stilovi sadržaja {#content-styles}

Neki elementi koje uređivač čuva trebaju sopstveni izgled na stranici koja ih prikazuje: kartice veza, slike sa opisom i obtokom, video-snimci i ugrađeni sadržaji koji staju u širinu teksta, liste zadataka sa poljem za potvrdu uz svaku stavku. Bez toga je kartica veze gola veza u kojoj se slika i tekstovi spajaju.

Svojstvo `contentStyles` određuje kako sačuvani HTML nosi taj izgled:

| `contentStyles` | sačuvani HTML | na sajtu |
|---|---|---|
| `inline` (podrazumevano) | izgled je upisan u atribute `style` tih elemenata | nema šta da se učita: HTML se prikazuje onakav kakav jeste |
| `classes` | samo klase i atributi `data-` | učitajte `tiptapify/content.css` i stavite HTML u element sa klasom `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba načina nose ista pravila, kojima i sam uređivač prikazuje sadržaj, pa stranica u oba slučaja izgleda kao uređivač. Dobijaju ih samo ovi elementi: naslovi, pasusi, liste, tabele i ostatak teksta zadržavaju stilove sajta.

## Ugrađeni stilovi {#inline-styles}

Podrazumevani način. Kompaktna kartica veze čuva se ovako:

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

- **Boje ostaju boje sajta.** Tekst nasleđuje svoju boju; prigušen tekst i ivice koriste providnost i poluprovidnu sivu, pa rade i na svetloj i na tamnoj stranici. Boju teksta za temu podesite na sajtu kao i obično.
- **Media query-ji nisu potrebni.** Kompaktna kartica u uskoj koloni sama stavlja sliku iznad tekstova; video-snimci i ugrađeni sadržaji nikad nisu širi od teksta.
- **Sajt ih i dalje može preoblikovati**, klase ostaju. Ugrađeni stil nadjačava pravilo klase, pa takvo pravilo traži `!important`.
- **Sanitizer mora da zadrži atribut `style`** na ovim elementima, inače gube izgled.

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

`content.css` je mali i u sebi nema Vue ni Vuetify. Njegova pravila su umotana u `:where(.tiptapify-content)`, pa nemaju težinu: svako pravilo sajta nadjačava ih bez `!important`. Koristite ga kad sajt želi izgled na jednom mestu ili sam stilizuje svoj sadržaj.

`contentCss(scope)` daje isti stilski list kao nisku, za drugu klasu od `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Ponovno učitavanje HTML-a {#loading-html-back}

Uređivač ove elemente čita samo prema njihovim atributima i klasama: karticu veze prema `data-link-card`, sliku prema `src`, veličini i obtoku, zadatak prema `data-checked`. Njihovi ugrađeni stilovi se ignorišu pri učitavanju HTML-a, a pri čuvanju se ponovo upisuju. Tako isti HTML putuje tamo i nazad nepromenjen, dokument sačuvan sa `inline` čisto se učitava sa `classes` i obrnuto, a kasnija verzija uređivača ažurira izgled dokumenta pri sledećem čuvanju.

Oblikovanje teksta se ne dira: boja ili veličina teksta i poravnanje pasusa jesu sadržaj, a uređivač ih i dalje čita iz njihovih stilova.

Za pretvaranje HTML-a sa klasama u HTML sa ugrađenim stilovima van uređivača (stariji dokument, e-pošta) koristite `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Potreban mu je DOM (pregledač ili jsdom na serveru); bez njega vraća HTML nepromenjen.

## Klizači slika {#image-sliders}

Uređivač tokom pisanja slike u nizu označava kao klizač (pogledajte svojstvo `imageSlider`); sačuvani HTML ih zadržava kao slike sa opisima jednu za drugom. Prikaz u obliku klizača posao je skripte sajta.
