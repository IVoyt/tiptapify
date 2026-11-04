# Tartalomstílusok {#content-styles}

A szerkesztő által mentett tartalom egy része saját megjelenést igényel azon az oldalon, amely megjeleníti: linkkártyák, felirattal és körbefutással ellátott képek, a szöveg szélességéhez igazodó videók és beágyazások, minden elem mellett jelölőnégyzetet tartalmazó feladatlisták. Enélkül a linkkártya csupasz link, amelyben a kép és a szövegek összefolynak.

A `contentStyles` prop határozza meg, hogyan hordozza a mentett HTML ezt a megjelenést:

| `contentStyles` | a mentett HTML | az oldalon |
|---|---|---|
| `inline` (alapértelmezett) | a megjelenés ezeknek az elemeknek a `style` attribútumaiba kerül | nincs mit betölteni: a HTML úgy jelenik meg, ahogy van |
| `classes` | csak osztályok és `data-` attribútumok | töltse be a `tiptapify/content.css` fájlt, és tegye a HTML-t `tiptapify-content` osztályú elembe |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Mindkettő ugyanazokat a szabályokat hordozza, amelyekkel maga a szerkesztő megjeleníti a tartalmat, így az oldal mindkét esetben úgy néz ki, mint a szerkesztő. Csak ezek az elemek kapják meg őket: a címsorok, bekezdések, listák, táblázatok és a szöveg többi része az oldal saját stílusát megtartja.

## Inline stílusok {#inline-styles}

Az alapértelmezett. Egy kompakt linkkártya így mentődik:

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

- **A színek az oldalé maradnak.** A szöveg örökli a színét; a halvány szöveg és a keretek áttetszőséget és félig átlátszó szürkét használnak, így világos és sötét oldalon egyaránt működnek. A téma szövegszínét az oldalon állítsa be a szokásos módon.
- **Média lekérdezésekre nincs szükség.** A kompakt kártya keskeny oszlopban magától a szövegek fölé teszi a képét; a videók és beágyazások sosem lesznek szélesebbek a szövegnél.
- **Az oldal továbbra is átstílusozhatja őket**, az osztályok megmaradnak. Az inline stílus erősebb az osztályszabálynál, ezért egy ilyen szabályhoz `!important` kell.
- **A sanitizernek meg kell tartania a `style` attribútumot** ezeken az elemeken, különben elveszítik a megjelenésüket.

## Osztályok és a content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

A `content.css` kicsi, és nincs benne Vue vagy Vuetify. A szabályai `:where(.tiptapify-content)` közé vannak csomagolva, így nulla súlyúak: az oldal bármely szabálya felülírja őket `!important` nélkül. Akkor használja, ha az oldal egy helyen szeretné a megjelenést, vagy maga stílusozza a tartalmát.

A `contentCss(scope)` ugyanezt a stíluslapot adja karakterláncként, a `tiptapify-content` helyett másik osztályhoz:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## A HTML visszatöltése {#loading-html-back}

A szerkesztő ezeket az elemeket kizárólag az attribútumaik és osztályaik alapján olvassa: a linkkártyát a `data-link-card`, a képet a `src`, a méret és a körbefutás, a feladatot a `data-checked` alapján. Az inline stílusaikat a HTML betöltésekor figyelmen kívül hagyja, mentéskor pedig újra beírja. Így ugyanaz a HTML változatlanul oda-vissza mozog, az `inline` móddal mentett dokumentum tisztán betöltődik `classes` móddal és fordítva, a szerkesztő későbbi verziója pedig a dokumentum következő mentésekor frissíti a megjelenését.

A szövegformázáshoz nem nyúl: a szöveg színe vagy mérete és a bekezdés igazítása tartalom, és a szerkesztő továbbra is a stílusaikból olvassa őket.

Ha a szerkesztőn kívül (régebbi dokumentum, e-mail) osztályos HTML-t szeretne inline stílusúvá alakítani, használja az `inlineContentStyles` függvényt:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

DOM-ot igényel (böngészőt, vagy jsdom-ot szerveren), és nélküle változatlanul adja vissza a HTML-t.

## Képcsúszkák {#image-sliders}

A szerkesztő írás közben csúszkaként jelöli a sorban álló képeket (lásd az `imageSlider` propot); a mentett HTML ábrákként tartja őket egymás után. Hogy csúszkaként jelennek-e meg, az az oldal saját scriptjének dolga.
