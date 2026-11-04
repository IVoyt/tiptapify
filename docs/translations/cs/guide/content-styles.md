# Styly obsahu {#content-styles}

Některé prvky, které editor ukládá, potřebují na stránce, kde se zobrazují, vlastní vzhled: karty odkazů, obrázky s popiskem a obtékáním, videa a vložené prvky, které se vejdou do šířky textu, seznamy úkolů s zaškrtávacím políčkem u každé položky. Bez něj je karta odkazu jen holý odkaz, v němž obrázek a texty splývají.

Vlastnost `contentStyles` určuje, jak uložené HTML tento vzhled nese:

| `contentStyles` | uložené HTML | na webu |
|---|---|---|
| `inline` (výchozí) | vzhled je zapsán v atributech `style` těchto prvků | není co načítat: HTML se zobrazí tak, jak je |
| `classes` | pouze třídy a atributy `data-` | načtěte `tiptapify/content.css` a HTML vložte do prvku s třídou `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba způsoby nesou stejná pravidla, jimiž editor sám obsah zobrazuje, takže stránka vypadá jako editor v obou případech. Dostanou je jen tyto prvky: nadpisy, odstavce, seznamy, tabulky a ostatní text si ponechají vlastní styly webu.

## Vložené styly {#inline-styles}

Výchozí varianta. Kompaktní karta odkazu se uloží takto:

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

- **Barvy zůstávají barvami webu.** Text dědí svou barvu; tlumený text a okraje používají průhlednost a poloprůhlednou šedou, takže fungují na světlé i tmavé stránce. Barvu textu pro motiv nastavte na webu jako obvykle.
- **Media queries nejsou potřeba.** Kompaktní karta v úzkém sloupci sama umístí obrázek nad texty; videa a vložené prvky nikdy nejsou širší než text.
- **Web je může stále upravovat**, třídy zůstávají. Vložený styl má přednost před pravidlem třídy, takové pravidlo proto potřebuje `!important`.
- **Sanitizér musí u těchto prvků zachovat atribut `style`**, jinak o svůj vzhled přijdou.

## Třídy a content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` je malý a neobsahuje Vue ani Vuetify. Jeho pravidla jsou zabalena do `:where(.tiptapify-content)`, takže nemají žádnou váhu: každé pravidlo webu je přebije bez `!important`. Použijte ho, když web chce mít vzhled na jednom místě, nebo si svůj obsah stylizuje sám.

`contentCss(scope)` vrací stejnou šablonu stylů jako řetězec, pro jinou třídu než `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Zpětné načtení HTML {#loading-html-back}

Editor tyto prvky čte jen podle jejich atributů a tříd: kartu odkazu podle `data-link-card`, obrázek podle `src`, velikosti a obtékání, úkol podle `data-checked`. Jejich vložené styly se při načítání HTML ignorují a při uložení se zapíšou znovu. Totéž HTML tak putuje tam i zpět beze změny, dokument uložený s `inline` se čistě načte s `classes` i naopak a pozdější verze editoru aktualizuje vzhled dokumentu při jeho dalším uložení.

Formátování textu se nemění: barva či velikost textu a zarovnání odstavce jsou obsah a editor je dál čte z jejich stylů.

Chcete-li HTML s třídami převést na HTML s vloženými styly mimo editor (starší dokument, e-mail), použijte `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Potřebuje DOM (prohlížeč, nebo jsdom na serveru); bez něj vrátí HTML beze změny.

## Slidery obrázků {#image-sliders}

Editor při psaní označí obrázky v řadě jako slider (viz vlastnost `imageSlider`); uložené HTML je ponechá jako obrázky s popisky za sebou. Zobrazit je jako slider je věcí vlastního skriptu webu.
