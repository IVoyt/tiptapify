# Štýly obsahu {#content-styles}

Niektoré prvky, ktoré editor ukladá, potrebujú na stránke, kde sa zobrazujú, vlastný vzhľad: karty odkazov, obrázky s popiskom a obtekaním, videá a vložené prvky, ktoré sa zmestia do šírky textu, zoznamy úloh so zaškrtávacím políčkom pri každej položke. Bez neho je karta odkazu iba holý odkaz, v ktorom obrázok a texty splývajú.

Vlastnosť `contentStyles` určuje, ako uložené HTML tento vzhľad nesie:

| `contentStyles` | uložené HTML | na webe |
|---|---|---|
| `inline` (predvolené) | vzhľad je zapísaný v atribútoch `style` týchto prvkov | nie je čo načítať: HTML sa zobrazí tak, ako je |
| `classes` | iba triedy a atribúty `data-` | načítajte `tiptapify/content.css` a HTML vložte do prvku s triedou `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba spôsoby nesú rovnaké pravidlá, ktorými editor sám obsah zobrazuje, takže stránka vyzerá ako editor v oboch prípadoch. Dostanú ich len tieto prvky: nadpisy, odseky, zoznamy, tabuľky a ostatný text si ponechajú vlastné štýly webu.

## Vložené štýly {#inline-styles}

Predvolený spôsob. Kompaktná karta odkazu sa uloží takto:

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

- **Farby ostávajú farbami webu.** Text dedí svoju farbu; tlmený text a okraje používajú priehľadnosť a polopriehľadnú sivú, takže fungujú na svetlej aj tmavej stránke. Farbu textu pre tému nastavte na webe ako zvyčajne.
- **Media queries nie sú potrebné.** Kompaktná karta v úzkom stĺpci sama umiestni obrázok nad texty; videá a vložené prvky nikdy nie sú širšie ako text.
- **Web ich môže stále upravovať**, triedy ostávajú. Vložený štýl má prednosť pred pravidlom triedy, takéto pravidlo preto potrebuje `!important`.
- **Sanitizér musí pri týchto prvkoch zachovať atribút `style`**, inak o svoj vzhľad prídu.

## Triedy a content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` je malý a neobsahuje Vue ani Vuetify. Jeho pravidlá sú zabalené do `:where(.tiptapify-content)`, takže nemajú žiadnu váhu: každé pravidlo webu ich prebije bez `!important`. Použite ho, keď web chce mať vzhľad na jednom mieste, alebo si svoj obsah štýluje sám.

`contentCss(scope)` vráti ten istý štýlový súbor ako reťazec, pre inú triedu než `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Spätné načítanie HTML {#loading-html-back}

Editor tieto prvky číta iba podľa ich atribútov a tried: kartu odkazu podľa `data-link-card`, obrázok podľa `src`, veľkosti a obtekania, úlohu podľa `data-checked`. Ich vložené štýly sa pri načítaní HTML ignorujú a pri uložení sa zapíšu znova. Rovnaké HTML tak putuje tam aj späť bez zmeny, dokument uložený s `inline` sa čisto načíta s `classes` a naopak a neskoršia verzia editora aktualizuje vzhľad dokumentu pri jeho ďalšom uložení.

Formátovanie textu sa nemení: farba či veľkosť textu a zarovnanie odseku sú obsah a editor ich naďalej číta z ich štýlov.

Ak chcete HTML s triedami previesť na HTML s vloženými štýlmi mimo editora (starší dokument, e-mail), použite `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Potrebuje DOM (prehliadač, alebo jsdom na serveri); bez neho vráti HTML bez zmeny.

## Slidery obrázkov {#image-sliders}

Editor pri písaní označí obrázky v rade ako slider (pozri vlastnosť `imageSlider`); uložené HTML ich ponechá ako obrázky s popiskami za sebou. Zobraziť ich ako slider je vecou vlastného skriptu webu.
