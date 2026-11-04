# Estilos de contenido {#content-styles}

Parte de lo que guarda el editor necesita un aspecto propio en la página que lo muestra: tarjetas de enlace, imágenes con su pie de foto y su flotado, vídeos e incrustaciones que se ajustan al ancho del texto, listas de tareas con una casilla junto a cada elemento. Sin él, una tarjeta de enlace es un enlace desnudo en el que la imagen y los textos se mezclan.

La prop `contentStyles` indica cómo lleva el HTML guardado ese aspecto:

| `contentStyles` | el HTML guardado | en el sitio |
|---|---|---|
| `inline` (por defecto) | el aspecto se escribe en los atributos `style` de estos elementos | nada que cargar: el HTML se muestra tal cual |
| `classes` | solo clases y atributos `data-` | cargar `tiptapify/content.css` y poner el HTML en un elemento con la clase `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Ambos llevan las mismas reglas, las mismas con las que el propio editor muestra el contenido, así que una página se ve como el editor en los dos casos. Solo estos elementos las reciben: encabezados, párrafos, listas, tablas y el resto del texto conservan los estilos del sitio.

## Estilos en línea {#inline-styles}

El modo por defecto. Una tarjeta de enlace compacta se guarda así:

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

- **Los colores siguen siendo los del sitio.** El texto hereda su color; el texto atenuado y los bordes usan opacidad y un gris semitransparente, así que funcionan igual en una página clara que en una oscura. Define el color del texto para un tema en el sitio como de costumbre.
- **No hacen falta media queries.** Una tarjeta compacta pone sola su imagen sobre los textos en una columna estrecha; los vídeos y las incrustaciones nunca superan el ancho del texto.
- **Un sitio aún puede cambiarles el estilo**, las clases permanecen. Un estilo en línea gana a una regla de clase, por lo que esa regla necesita `!important`.
- **Un sanitizador debe conservar el atributo `style`** en estos elementos, o perderán su aspecto.

## Clases y content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` es pequeño y no incluye Vue ni Vuetify. Sus reglas van envueltas en `:where(.tiptapify-content)`, así que no pesan nada: cualquier regla del sitio gana sobre ellas sin `!important`. Úsalo cuando el sitio quiera el aspecto en un solo lugar o estilice su contenido por sí mismo.

`contentCss(scope)` da la misma hoja de estilos como cadena, para otra clase distinta de `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Volver a cargar el HTML {#loading-html-back}

El editor lee estos elementos solo por sus atributos y clases: una tarjeta de enlace por `data-link-card`, una imagen por su `src`, tamaño y flotado, una tarea por `data-checked`. Sus estilos en línea se ignoran al cargar el HTML y se escriben de nuevo al guardarlo. Así, el mismo HTML va y vuelve sin cambios, un documento guardado con `inline` se carga limpiamente con `classes` y al revés, y una versión posterior del editor actualiza el aspecto de un documento la próxima vez que se guarde.

El formato del texto no se toca: el color o el tamaño de un texto y la alineación de un párrafo son contenido, y el editor sigue leyéndolos de sus estilos.

Para convertir HTML con clases en HTML con estilos en línea fuera del editor (un documento antiguo, un correo), usa `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Necesita un DOM (un navegador, o jsdom en un servidor) y, sin él, devuelve el HTML tal cual.

## Carruseles de imágenes {#image-sliders}

El editor marca las imágenes de una fila como un carrusel mientras escribes (véase la prop `imageSlider`); el HTML guardado las conserva como figuras una tras otra. Mostrarlas como carrusel depende del propio script del sitio.
