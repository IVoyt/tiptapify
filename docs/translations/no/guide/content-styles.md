# Innholdsstiler {#content-styles}

Noe av det editoren lagrer trenger et eget utseende på siden som viser det: lenkekort, bilder med bildetekst og flyt, videoer og innebygde elementer som tilpasses tekstbredden, oppgavelister med en avkrysningsboks ved hvert punkt. Uten det er et lenkekort bare en bar lenke der bildet og tekstene flyter sammen.

Propen `contentStyles` bestemmer hvordan den lagrede HTML-en bærer dette utseendet:

| `contentStyles` | den lagrede HTML-en | på nettstedet |
|---|---|---|
| `inline` (standard) | utseendet skrives i `style`-attributtene til disse elementene | ingenting å laste: HTML-en vises som den er |
| `classes` | bare klasser og `data-`-attributter | last `tiptapify/content.css` og legg HTML-en i et element med klassen `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Begge bærer de samme reglene, de som editoren selv viser innholdet med, så en side ser ut som editoren i begge tilfeller. Bare disse elementene får dem: overskrifter, avsnitt, lister, tabeller og resten av teksten beholder nettstedets egne stiler.

## Inline-stiler {#inline-styles}

Standardvalget. Et kompakt lenkekort lagres som:

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

- **Fargene forblir nettstedets.** Teksten arver fargen sin; dempet tekst og kanter bruker opasitet og en halvgjennomsiktig grå, så de fungerer like godt på en lys og en mørk side. Sett tekstfargen for et tema på nettstedet som vanlig.
- **Du trenger ingen media queries.** Et kompakt kort legger bildet over tekstene av seg selv i en smal kolonne; videoer og innebygde elementer blir aldri bredere enn teksten.
- **Et nettsted kan fortsatt style dem om**, klassene beholdes. En inline-stil går foran en klasseregel, så en slik regel trenger `!important`.
- **En sanitizer må beholde `style`-attributtet** på disse elementene, ellers mister de utseendet sitt.

## Klasser og content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` er liten og har verken Vue eller Vuetify i seg. Reglene er pakket inn i `:where(.tiptapify-content)`, så de veier ingenting: enhver regel på nettstedet går foran dem uten `!important`. Bruk dette når nettstedet vil ha utseendet på ett sted, eller styler innholdet selv.

`contentCss(scope)` gir det samme stilarket som en streng, for en annen klasse enn `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Laste HTML inn igjen {#loading-html-back}

Editoren leser disse elementene bare via attributter og klasser: et lenkekort via `data-link-card`, et bilde via `src`, størrelse og flyt, en oppgave via `data-checked`. Inline-stilene deres ignoreres når HTML lastes inn, og skrives på nytt når den lagres. Derfor går den samme HTML-en fram og tilbake uendret, et dokument lagret med `inline` lastes rent med `classes` og omvendt, og en senere versjon av editoren oppdaterer utseendet til et dokument neste gang det lagres.

Tekstformateringen røres ikke: fargen eller størrelsen på en tekst og justeringen av et avsnitt er innhold, og editoren leser dem fortsatt fra stilene deres.

For å gjøre om klasse-HTML til HTML med inline-stiler utenfor editoren (et eldre dokument, en e-post), bruk `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Den trenger et DOM (en nettleser, eller jsdom på en server) og returnerer HTML-en som den er uten et slikt.

## Bildespill {#image-sliders}

Editoren markerer bilder på rad som et bildespill mens du skriver (se propen `imageSlider`); den lagrede HTML-en beholder dem som figurer etter hverandre. Å vise dem som et bildespill er opp til nettstedets eget skript.
