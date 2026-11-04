# Elementos de la barra de herramientas {#toolbar-items}

Todos los elementos de la barra de herramientas disponibles, organizados por sección.

## Acciones {#actions}

| Elemento | Descripción                        |
|----------|------------------------------------|
| `undo`   | Deshace el último cambio           |
| `redo`   | Rehace el último cambio deshecho   |
| `resetChanges` | Descarta todos los cambios desde que se abrió el editor y borra el historial (pide confirmación) |

## IA {#ai}

| Elemento | Descripción                                          |
|----------|------------------------------------------------------|
| `ai`     | Abre el diálogo de solicitud de IA, si está configurada |

## Formato {#format}

| Elemento    | Descripción               |
|-------------|---------------------------|
| `bold`      | Activa o desactiva la negrita |
| `italic`    | Activa o desactiva la cursiva |
| `underline` | Activa o desactiva el subrayado |
| `strike`    | Activa o desactiva el tachado |

## Formato adicional {#format-extra}

| Elemento     | Descripción                                               |
|--------------|-----------------------------------------------------------|
| `sup`        | Activa o desactiva el superíndice                         |
| `sub`        | Activa o desactiva el subíndice                           |
| `code`       | Activa o desactiva el código en línea                     |
| `codeBlock`  | Inserta un bloque de código con resaltado de sintaxis     |
| `blockquote` | Inserta una cita                                          |

## Estilo {#style}

| Elemento         | Descripción                                |
|------------------|--------------------------------------------|
| `heading`        | Desplegable para elegir el nivel de encabezado (H1-H6) |
| `fontFamily`     | Desplegable para elegir la familia tipográfica |
| `fontSize`       | Desplegable para elegir el tamaño de fuente |
| `lineHeight`     | Establece el interlineado                  |
| `textColor`      | Color del texto: paleta, colores recientes, HEX, cuentagotas, selector personalizado |
| `highlightColor` | Color de resaltado: el mismo selector, con «Sin resaltado» primero |

El elemento `heading` acepta opciones después de dos puntos: los niveles de encabezado, `p` para añadir un elemento de párrafo e `inline` para mostrarlos como botones independientes en lugar de un desplegable:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Alineación {#alignment}

| Elemento  | Descripción                |
|-----------|----------------------------|
| `left`    | Alinea el texto a la izquierda |
| `center`  | Centra el texto            |
| `right`   | Alinea el texto a la derecha |
| `justify` | Justifica el texto         |
| `align`   | Desplegable de alineación; `align:left,center,right` limita sus opciones |

## Lista {#list}

| Elemento       | Descripción                                   |
|----------------|-----------------------------------------------|
| `bulletList`   | Activa o desactiva la lista con viñetas       |
| `orderedList`  | Activa o desactiva la lista numerada          |
| `taskList`     | Activa o desactiva la lista de tareas (casillas) |
| `indent`       | Aumenta la sangría del bloque actual          |
| `outdent`      | Reduce la sangría del bloque actual           |

## Multimedia {#media}

| Elemento  | Descripción                                    |
|-----------|------------------------------------------------|
| `link`    | Inserta o edita un enlace, o una [tarjeta de enlace](/es/guide/link-cards) con `linkPreview` |
| `image`   | Inserta o edita una imagen: por URL o subiendo un archivo, texto alternativo, pie de foto, tamaño, posición |
| `video`   | Inserta o edita un video de YouTube, Vimeo o un archivo de video (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Incrusta una página por su dirección o por su código iframe |
| `emoji`   | Abre el selector de emojis (10 categorías)     |
| `charmap` | Abre el selector de caracteres especiales      |
| `table`   | Inserta una tabla                              |

## Varios {#misc}

| Elemento        | Descripción                                          |
|-----------------|------------------------------------------------------|
| `line`          | Inserta una línea horizontal                         |
| `pagebreak`     | Inserta un salto de página                           |
| `source`        | Activa o desactiva la vista del código HTML          |
| `preview`       | Activa o desactiva el modo de vista previa HTML      |
| `fullscreen`    | Activa o desactiva el modo de edición a pantalla completa |
| `formatClear`   | Borra todo el formato de la selección                |
| `invisibleChar` | Inserta caracteres invisibles (espacios, etc.)       |

## Separadores {#separators}

Usa `|` como separador entre grupos de botones en la prop `items` con formato de array:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Ejemplo de barra de herramientas completa {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
