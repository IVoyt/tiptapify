# Stili del contenuto {#content-styles}

Alcuni elementi salvati dall'editor hanno bisogno di un aspetto proprio nella pagina che li mostra: link card, immagini con didascalia e float, video ed embed che si adattano alla larghezza del testo, elenchi di attività con una casella accanto a ogni voce. Senza di esso una link card è un semplice link con immagine e testi ammassati.

La prop `contentStyles` stabilisce come l'HTML salvato porta con sé questo aspetto:

| `contentStyles` | l'HTML salvato | sul sito |
|---|---|---|
| `inline` (predefinito) | l'aspetto è scritto negli attributi `style` di questi elementi | niente da caricare: l'HTML si mostra così com'è |
| `classes` | solo classi e attributi `data-` | carica `tiptapify/content.css` e inserisci l'HTML in un elemento con la classe `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Entrambi portano le stesse regole, quelle con cui l'editor stesso mostra il contenuto, quindi in ogni caso la pagina appare come nell'editor. Solo questi elementi le ricevono: titoli, paragrafi, elenchi, tabelle e il resto del testo mantengono gli stili del sito.

## Stili inline {#inline-styles}

È l'impostazione predefinita. Una link card compatta viene salvata così:

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

- **I colori restano quelli del sito.** Il testo eredita il colore; testi attenuati e bordi usano l'opacità e un grigio semitrasparente, così funzionano sia su una pagina chiara sia su una scura. Imposta il colore del testo per un tema sul sito, come al solito.
- **Non servono media query.** Una card compatta mette da sola l'immagine sopra i testi in una colonna stretta; video ed embed non diventano mai più larghi del testo.
- **Un sito può comunque ridefinirne lo stile**, le classi restano. Uno stile inline ha la precedenza su una regola di classe, quindi una regola simile richiede `!important`.
- **Un sanitizer deve mantenere l'attributo `style`** su questi elementi, altrimenti perdono il loro aspetto.

## Classi e content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` è piccolo e non contiene né Vue né Vuetify. Le sue regole sono racchiuse in `:where(.tiptapify-content)`, quindi hanno peso nullo: qualsiasi regola del sito prevale su di esse senza `!important`. Usalo quando il sito vuole l'aspetto in un unico posto, oppure applica da sé gli stili al proprio contenuto.

`contentCss(scope)` fornisce lo stesso foglio di stile come stringa, per una classe diversa da `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Ricaricare l'HTML {#loading-html-back}

L'editor legge questi elementi solo dai loro attributi e dalle loro classi: una link card da `data-link-card`, un'immagine da `src`, dimensione e float, un'attività da `data-checked`. I loro stili inline vengono ignorati quando l'HTML viene caricato e riscritti al salvataggio. Così lo stesso HTML va avanti e indietro senza modifiche, un documento salvato con `inline` si carica senza problemi con `classes` e viceversa, e una versione successiva dell'editor aggiorna l'aspetto di un documento al salvataggio successivo.

La formattazione del testo non viene toccata: il colore o la dimensione di un testo e l'allineamento di un paragrafo sono contenuto, e l'editor continua a leggerli dai loro stili.

Per trasformare l'HTML con classi in HTML con stili inline fuori dall'editor (un documento più vecchio, un'email), usa `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Richiede un DOM (un browser, o jsdom su un server) e senza di esso restituisce l'HTML così com'è.

## Slider di immagini {#image-sliders}

Mentre scrivi, l'editor contrassegna le immagini in fila come slider (vedi la prop `imageSlider`); l'HTML salvato le mantiene come figure una dopo l'altra. Mostrarle come slider spetta allo script del sito.
