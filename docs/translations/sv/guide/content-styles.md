# Innehållsstilar {#content-styles}

En del av det som redigeraren sparar behöver ett eget utseende på sidan som visar det: länkkort, bilder med bildtext och flytning, videor och inbäddningar som passar textbredden, uppgiftslistor med en kryssruta vid varje punkt. Utan det är ett länkkort bara en naken länk där bilden och texterna flyter ihop.

Propen `contentStyles` anger hur den sparade HTML-koden bär det utseendet:

| `contentStyles` | den sparade HTML-koden | på webbplatsen |
|---|---|---|
| `inline` (standard) | utseendet skrivs i `style`-attributen på dessa element | inget att ladda: HTML-koden visas som den är |
| `classes` | bara klasser och `data-`-attribut | ladda `tiptapify/content.css` och lägg HTML-koden i ett element med klassen `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Båda bär samma regler, de som redigeraren själv visar innehållet med, så en sida ser ut som redigeraren i båda fallen. Bara dessa element får dem: rubriker, stycken, listor, tabeller och övrig text behåller webbplatsens egna stilar.

## Inline-stilar {#inline-styles}

Standardläget. Ett kompakt länkkort sparas som:

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

- **Färgerna förblir webbplatsens.** Texten ärver sin färg; dämpad text och ramar använder opacitet och en halvtransparent grå, så de fungerar på en ljus och en mörk sida lika bra. Ställ in textfärgen för ett tema på webbplatsen som vanligt.
- **Inga media queries behövs.** Ett kompakt kort lägger bilden ovanför texterna av sig självt i en smal kolumn; videor och inbäddningar blir aldrig bredare än texten.
- **En webbplats kan fortfarande ändra deras stil**, klasserna finns kvar. En inline-stil går före en klassregel, så en sådan regel behöver `!important`.
- **En sanitizer måste behålla attributet `style`** på dessa element, annars förlorar de sitt utseende.

## Klasser och content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` är liten och har varken Vue eller Vuetify inuti. Dess regler är inslagna i `:where(.tiptapify-content)`, så de väger ingenting: alla regler på webbplatsen går före dem utan `!important`. Använd detta när webbplatsen vill ha utseendet på ett ställe, eller stilar sitt innehåll själv.

`contentCss(scope)` ger samma stilmall som en sträng, för en annan klass än `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Läsa in HTML igen {#loading-html-back}

Redigeraren läser dessa element bara via deras attribut och klasser: ett länkkort via `data-link-card`, en bild via `src`, storlek och flytning, en uppgift via `data-checked`. Deras inline-stilar ignoreras när HTML läses in och skrivs på nytt när den sparas. Därför går samma HTML fram och tillbaka oförändrad, ett dokument sparat med `inline` laddas rent med `classes` och tvärtom, och en senare version av redigeraren uppdaterar dokumentets utseende nästa gång det sparas.

Textformateringen rörs inte: färgen eller storleken på en text och justeringen av ett stycke är innehåll, och redigeraren fortsätter läsa dem från deras stilar.

För att göra om klass-HTML till HTML med inline-stilar utanför redigeraren (ett äldre dokument, ett e-postmeddelande), använd `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Den behöver ett DOM (en webbläsare, eller jsdom på en server) och returnerar HTML-koden som den är utan ett sådant.

## Bildspel {#image-sliders}

Redigeraren markerar bilder i rad som ett bildspel medan du skriver (se propen `imageSlider`); den sparade HTML-koden behåller dem som figurer efter varandra. Att visa dem som ett bildspel är upp till webbplatsens eget skript.
