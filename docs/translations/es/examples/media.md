# Multimedia {#media}

## Imágenes {#images}

Inserta imágenes desde una URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

El botón de imagen abre el diálogo de imagen:

- **Por URL** o **Subir**. Sin un [endpoint de subida](/es/guide/uploads), el archivo elegido se incrusta como URL de datos base64; con uno, el archivo va a tu servidor.
- **Texto alternativo** (el diálogo te lo recuerda cuando está vacío) y un **pie de foto** bajo la imagen.
- **Tamaño**: original, ancho del texto o ancho × alto personalizados con el bloqueo de proporción.
- **Posición**: centrada en su propia línea, o flotando a la izquierda o a la derecha del texto.

Una imagen seleccionada tiene tiradores de redimensionado (cada cambio de tamaño es un paso de deshacer) y una barra de herramientas encima: flotar a la izquierda o a la derecha, descargar, editar, eliminar. Un doble clic abre el diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videos {#videos}

Incrusta videos de YouTube y Vimeo, o un archivo de video:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

El botón de video abre el diálogo de video:

- **Un enlace de YouTube o Vimeo** se convierte en su reproductor; el diálogo muestra el proveedor reconocido y una vista previa, y **Empezar en** (rellenado desde `?t=`) cuando el reproductor lo admite.
- **Un enlace a un archivo de video** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) se convierte en un `<video>` con portada, controles, reproducción automática (sin sonido) y repetición. El enlace necesita su protocolo (`https://`, `http://`), `//host` o una `/path`: el diálogo nunca lo adivina.
- **Subir** envía un archivo de video a tu servidor; solo aparece con un [endpoint de subida](/es/guide/uploads).
- **Tamaño**: adaptable 16:9, o ancho × alto personalizados con el bloqueo de proporción.

Una URL de YouTube pegada en el texto también se incrusta. Un clic en un reproductor lo selecciona en lugar de reproducirlo, de modo que el botón de la barra de herramientas lo muestra; un doble clic abre el diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Pega una URL de YouTube para incrustar un video..." />

## Iframes {#iframes}

Incrusta una página por su dirección o por el código iframe de su menú Compartir o Insertar:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

El diálogo de iframe lee un código pegado (dirección, tamaño, título, permisos, sandbox, carga diferida, pantalla completa) y indica qué ha tomado de él; un código con scripts u otras etiquetas se rechaza. Muestra una vista previa y tiene un **título para lectores de pantalla**, el tamaño (adaptable con las proporciones del código, o personalizado con el bloqueo de proporción) y, en **Avanzado**, el nombre, `allow`, `sandbox`, la carga diferida y un borde. La dirección necesita `https://` o `http://`. Un doble clic en un elemento incrustado abre el diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Introduce una URL para incrustarla como iframe..." />

## Tablas {#tables}

Inserta y edita tablas:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Después de insertar una tabla, puedes:
- Añadir o quitar filas y columnas
- Seleccionar celdas
- Eliminar la tabla completa

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Usa el botón de tabla para insertar una tabla..." />

## Enlaces {#links}

Inserta hipervínculos:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

El diálogo de enlace toma la dirección tal como se escribe: `https://…`, cualquier otro esquema (`ftp://`, `ssh://`, uno interno), `mailto:`, `tel:`, `#anchor` o `/page`. Nunca añade un protocolo por sí mismo: una dirección sin protocolo (`example.com`, `internal.host:8080`) muestra chips para añadir `https://`, `http://` o `ftp://`, y se queda tal como está escrita si no añades ninguno. Las direcciones `javascript:`, `vbscript:` y `data:` se rechazan.

El diálogo también tiene el texto del enlace, **Abrir en una pestaña nueva** (que añade `noopener noreferrer`) y, en **Avanzado**, los valores de `rel` como chips (cualquier valor: Intro, espacio o coma lo añade) y una clase CSS.

Con la prop [`linkPreview`](/es/api/props#linkpreview), el mismo diálogo muestra un enlace como una tarjeta con la imagen, el título y la descripción de la página, y una URL pegada en una línea vacía ofrece **Enlace / Tarjeta**; consulta [Tarjetas de enlace](/es/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Selecciona texto y haz clic en enlace para añadir un hipervínculo..." />

## Emoji {#emoji}

Inserta emojis desde el selector integrado con 10 categorías:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

El selector de emojis incluye un campo de búsqueda y filtro para encontrar rápidamente un emoji concreto.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Haz clic en el botón de emoji para insertar un emoji..." />

## Caracteres especiales (Charmap) {#special-characters-charmap}

Inserta caracteres especiales, flechas, letras griegas, símbolos matemáticos y más:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Las categorías incluyen:
- Flechas
- Monedas
- Letras griegas
- Símbolos matemáticos
- Varios

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Haz clic en charmap para insertar caracteres especiales..." />

## Combinar herramientas multimedia {#combining-media-tools}

Una barra de herramientas multimedia completa:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Barra de herramientas multimedia completa..." />
