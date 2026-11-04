# Inhaltsstile {#content-styles}

Manches, was der Editor speichert, braucht auf der Seite, die es anzeigt, ein eigenes Aussehen: Link-Karten, Bilder mit Bildunterschrift und Umfluss, Videos und Einbettungen, die in die Textbreite passen, Aufgabenlisten mit einem Kontrollkästchen neben jedem Eintrag. Ohne das ist eine Link-Karte ein bloßer Link, in dem Bild und Texte ineinanderlaufen.

Die Prop `contentStyles` legt fest, wie das gespeicherte HTML dieses Aussehen trägt:

| `contentStyles` | das gespeicherte HTML | auf der Website |
|---|---|---|
| `inline` (Standard) | das Aussehen steht in den `style`-Attributen dieser Elemente | nichts zu laden: das HTML wird unverändert angezeigt |
| `classes` | nur Klassen und `data-`-Attribute | `tiptapify/content.css` laden und das HTML in ein Element mit der Klasse `tiptapify-content` setzen |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Beide tragen dieselben Regeln, mit denen der Editor selbst den Inhalt anzeigt, sodass eine Seite in beiden Fällen wie der Editor aussieht. Nur diese Elemente bekommen sie: Überschriften, Absätze, Listen, Tabellen und der übrige Text behalten die Stile der Website.

## Inline-Stile {#inline-styles}

Die Standardeinstellung. Eine kompakte Link-Karte wird so gespeichert:

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

- **Farben bleiben die der Website.** Text erbt seine Farbe; gedämpfter Text und Rahmen nutzen Deckkraft und ein halbtransparentes Grau und funktionieren daher auf einer hellen wie auf einer dunklen Seite. Die Textfarbe für ein Theme legen Sie wie gewohnt auf der Website fest.
- **Media Queries sind nicht nötig.** Eine kompakte Karte setzt ihr Bild in einer schmalen Spalte von selbst über die Texte; Videos und Einbettungen werden nie breiter als der Text.
- **Eine Website kann sie weiterhin umgestalten**, die Klassen bleiben. Ein Inline-Stil schlägt eine Klassenregel, eine solche Regel braucht daher `!important`.
- **Ein Sanitizer muss das Attribut `style`** an diesen Elementen behalten, sonst verlieren sie ihr Aussehen.

## Klassen und content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` ist klein und enthält weder Vue noch Vuetify. Ihre Regeln sind in `:where(.tiptapify-content)` gekapselt und haben daher kein Gewicht: Jede Regel der Website setzt sich ohne `!important` dagegen durch. Nutzen Sie das, wenn die Website das Aussehen an einer Stelle haben will oder ihren Inhalt selbst gestaltet.

`contentCss(scope)` liefert dasselbe Stylesheet als String, für eine andere Klasse als `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML wieder laden {#loading-html-back}

Der Editor liest diese Elemente nur anhand ihrer Attribute und Klassen: eine Link-Karte an `data-link-card`, ein Bild an `src`, Größe und Umfluss, eine Aufgabe an `data-checked`. Ihre Inline-Stile werden beim Laden von HTML ignoriert und beim Speichern neu geschrieben. So geht dasselbe HTML unverändert hin und her, ein mit `inline` gespeichertes Dokument lässt sich sauber mit `classes` laden und umgekehrt, und eine spätere Version des Editors aktualisiert das Aussehen eines Dokuments beim nächsten Speichern.

Die Textformatierung bleibt unberührt: Farbe oder Größe eines Textes und die Ausrichtung eines Absatzes sind Inhalt, und der Editor liest sie weiterhin aus den Stilen.

Um HTML mit Klassen außerhalb des Editors in HTML mit Inline-Stilen umzuwandeln (ein älteres Dokument, eine E-Mail), verwenden Sie `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Es braucht ein DOM (einen Browser oder jsdom auf einem Server) und gibt ohne eines das HTML unverändert zurück.

## Bildslider {#image-sliders}

Der Editor markiert Bilder in einer Reihe beim Schreiben als Slider (siehe die Prop `imageSlider`); das gespeicherte HTML behält sie als Figures hintereinander. Sie als Slider darzustellen, ist Sache des eigenen Skripts der Website.
