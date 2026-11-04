# Slogi vsebine {#content-styles}

Nekateri elementi, ki jih urejevalnik shrani, potrebujejo na strani, ki jih prikazuje, lasten videz: kartice povezav, slike s podnapisom in obtekanjem, videoposnetki in vdelane vsebine, ki se prilegajo širini besedila, seznami opravil s potrditvenim poljem ob vsaki postavki. Brez njega je kartica povezave le gola povezava, v kateri se slika in besedila zlivajo.

Lastnost `contentStyles` določa, kako shranjeni HTML nosi ta videz:

| `contentStyles` | shranjeni HTML | na spletnem mestu |
|---|---|---|
| `inline` (privzeto) | videz je zapisan v atributih `style` teh elementov | ni česa naložiti: HTML se prikaže, kakršen je |
| `classes` | samo razredi in atributi `data-` | naložite `tiptapify/content.css` in HTML vstavite v element z razredom `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba načina nosita ista pravila, s katerimi urejevalnik sam prikazuje vsebino, zato stran v obeh primerih izgleda kot urejevalnik. Dobijo jih samo ti elementi: naslovi, odstavki, seznami, tabele in preostalo besedilo obdržijo slog spletnega mesta.

## Vrstični slogi {#inline-styles}

Privzeti način. Kompaktna kartica povezave se shrani takole:

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

- **Barve ostanejo barve spletnega mesta.** Besedilo podeduje svojo barvo; zatemnjeno besedilo in robovi uporabljajo prosojnost in napol prosojno sivo, zato delujejo na svetli in temni strani. Barvo besedila za temo nastavite na spletnem mestu kot običajno.
- **Media queries niso potrebni.** Kompaktna kartica v ozkem stolpcu sama postavi sliko nad besedila; videoposnetki in vdelane vsebine nikoli niso širši od besedila.
- **Spletno mesto jih še vedno lahko preoblikuje**, razredi ostanejo. Vrstični slog prevlada nad pravilom razreda, zato tako pravilo potrebuje `!important`.
- **Sanitizer mora pri teh elementih ohraniti atribut `style`**, sicer izgubijo svoj videz.

## Razredi in content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` je majhen in ne vsebuje Vue ali Vuetify. Njegova pravila so ovita v `:where(.tiptapify-content)`, zato nimajo teže: vsako pravilo spletnega mesta jih preglasi brez `!important`. Uporabite ga, kadar želi spletno mesto videz na enem mestu ali si vsebino oblikuje samo.

`contentCss(scope)` vrne isto slogovno datoteko kot niz, za drug razred kot `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Ponovno nalaganje HTML {#loading-html-back}

Urejevalnik te elemente bere samo po atributih in razredih: kartico povezave po `data-link-card`, sliko po `src`, velikosti in obtekanju, opravilo po `data-checked`. Njihovi vrstični slogi se pri nalaganju HTML prezrejo, ob shranjevanju pa se znova zapišejo. Tako isti HTML potuje sem in tja nespremenjen, dokument, shranjen z `inline`, se čisto naloži s `classes` in obratno, poznejša različica urejevalnika pa videz dokumenta posodobi ob naslednjem shranjevanju.

Oblikovanje besedila ostane nedotaknjeno: barva ali velikost besedila in poravnava odstavka so vsebina, urejevalnik pa ju še naprej bere iz njunih slogov.

Če želite HTML z razredi izven urejevalnika pretvoriti v HTML z vrstičnimi slogi (starejši dokument, e-pošta), uporabite `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Potrebuje DOM (brskalnik ali jsdom na strežniku); brez njega vrne HTML nespremenjen.

## Drsniki slik {#image-sliders}

Urejevalnik med pisanjem slike v vrsti označi kot drsnik (glej lastnost `imageSlider`); shranjeni HTML jih obdrži kot slike s podnapisi ena za drugo. Prikaz kot drsnik je stvar skripte spletnega mesta.
