# Contentstijlen {#content-styles}

Een deel van wat de editor opslaat heeft op de pagina die het toont een eigen weergave nodig: linkkaarten, afbeeldingen met bijschrift en float, video's en embeds die in de tekstbreedte passen, takenlijsten met een selectievakje naast elk item. Zonder die weergave is een linkkaart een kale link waarin de afbeelding en de teksten door elkaar lopen.

De prop `contentStyles` bepaalt hoe de opgeslagen HTML die weergave meedraagt:

| `contentStyles` | de opgeslagen HTML | op de site |
|---|---|---|
| `inline` (standaard) | de weergave staat in de `style`-attributen van deze elementen | niets te laden: de HTML wordt getoond zoals hij is |
| `classes` | alleen klassen en `data-`-attributen | laad `tiptapify/content.css` en zet de HTML in een element met de klasse `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Beide dragen dezelfde regels mee, die waarmee de editor zelf de content toont, dus een pagina ziet er in beide gevallen uit als de editor. Alleen deze elementen krijgen ze: koppen, alinea's, lijsten, tabellen en de rest van de tekst behouden de eigen stijlen van de site.

## Inline stijlen {#inline-styles}

De standaard. Een compacte linkkaart wordt zo opgeslagen:

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

- **Kleuren blijven die van de site.** Tekst erft zijn kleur; gedempte tekst en randen gebruiken doorzichtigheid en een half transparant grijs, zodat ze op een lichte en op een donkere pagina allebei werken. Stel de tekstkleur voor een thema op de site gewoon in.
- **Media queries zijn niet nodig.** Een compacte kaart zet zijn afbeelding in een smalle kolom uit zichzelf boven de teksten; video's en embeds worden nooit breder dan de tekst.
- **Een site kan ze nog steeds anders opmaken**, de klassen blijven bestaan. Een inline stijl wint van een klasseregel, dus zo'n regel heeft `!important` nodig.
- **Een sanitizer moet het `style`-attribuut behouden** op deze elementen, anders verliezen ze hun weergave.

## Klassen en content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` is klein en bevat geen Vue of Vuetify. De regels zijn verpakt in `:where(.tiptapify-content)`, dus ze wegen niets: elke regel van de site wint ervan zonder `!important`. Gebruik dit als de site de weergave op één plek wil, of zijn content zelf opmaakt.

`contentCss(scope)` geeft hetzelfde stylesheet als string, voor een andere klasse dan `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML weer inladen {#loading-html-back}

De editor leest deze elementen alleen aan de hand van hun attributen en klassen: een linkkaart aan `data-link-card`, een afbeelding aan `src`, grootte en float, een taak aan `data-checked`. Hun inline stijlen worden genegeerd bij het laden van HTML en opnieuw geschreven bij het opslaan. Zo gaat dezelfde HTML ongewijzigd heen en weer, laadt een document dat met `inline` is opgeslagen probleemloos met `classes` en andersom, en werkt een latere versie van de editor de weergave van een document bij de eerstvolgende keer opslaan bij.

Tekstopmaak blijft onaangeroerd: de kleur of grootte van een tekst en de uitlijning van een alinea zijn content, en de editor blijft ze uit hun stijlen lezen.

Om klasse-HTML buiten de editor om te zetten in HTML met inline stijlen (een ouder document, een e-mail), gebruik je `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Het heeft een DOM nodig (een browser, of jsdom op een server) en geeft zonder DOM de HTML ongewijzigd terug.

## Afbeeldingssliders {#image-sliders}

De editor markeert afbeeldingen op een rij tijdens het schrijven als een slider (zie de prop `imageSlider`); de opgeslagen HTML bewaart ze als figuren na elkaar. Ze als slider tonen is aan het eigen script van de site.
