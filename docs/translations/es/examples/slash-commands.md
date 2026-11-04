# Comandos con barra {#slash-commands}

Los comandos con barra ofrecen un menú de inserción rápida que aparece al escribir `/` al principio de una línea.

## Activar los comandos con barra {#enabling-slash-commands}

Los comandos con barra están activados de forma predeterminada. Para controlarlos explícitamente:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo de comandos con barra..."
:slash-commands="true"
/>

## Comandos disponibles {#available-commands}

Escribe `/` en el editor para ver la paleta de comandos. Los comandos disponibles incluyen:

| Comando         | Descripción                                 |
|-----------------|---------------------------------------------|
| `/h1` - `/h6`   | Inserta un encabezado (niveles 1-6)         |
| `/bulletList`   | Inserta una lista con viñetas               |
| `/numberedList` | Inserta una lista numerada                  |
| `/taskList`     | Inserta una lista de tareas                 |
| `/code`         | Inserta código en línea                     |
| `/codeBlock`    | Inserta un bloque de código                 |
| `/quote`        | Inserta una cita                            |
| `/image`        | Inserta una imagen (abre el diálogo de URL) |
| `/video`        | Incrusta un video de YouTube                |
| `/table`        | Inserta una tabla                           |
| `/link`         | Inserta un hipervínculo                     |
| `/divider`      | Inserta una línea horizontal                |
| `/emoji`        | Abre el selector de emojis                  |
| `/specialChars` | Abre los caracteres especiales              |

## Cómo funciona {#how-it-works}

1. Coloca el cursor al principio de una línea o después de un espacio
2. Escribe `/`: aparece la paleta de comandos
3. Sigue escribiendo para filtrar los comandos
4. Pulsa `Enter` o haz clic para insertar el comando seleccionado

## Desactivar los comandos con barra {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Comandos con barra y menú flotante {#slash-commands-with-floating-menu}

Combina los comandos con barra con el menú flotante para disfrutar de la mejor experiencia de edición:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Comandos con barra** (`/`): se activan al escribir `/` al principio de una línea
- **Menú flotante**: aparece al colocar el cursor en una línea vacía (ofrece acciones a nivel de bloque)
- **Menú de burbuja**: aparece al seleccionar texto (ofrece formato en línea)

## Filtrar los comandos disponibles {#filtering-available-commands}

Puedes indicar qué comandos incluir pasando un array de ID de comando:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### ID de comando disponibles {#available-command-ids}

| ID             | Descripción                  |
|----------------|------------------------------|
| `h1` - `h6`    | Encabezados de nivel 1-6     |
| `bulletList`   | Lista con viñetas            |
| `numberedList` | Lista numerada               |
| `taskList`     | Lista de tareas              |
| `code`         | Código en línea              |
| `codeBlock`    | Bloque de código             |
| `quote`        | Cita                         |
| `image`        | Imagen                       |
| `video`        | Video de YouTube             |
| `table`        | Tabla                        |
| `link`         | Enlace                       |
| `divider`      | Línea horizontal             |
| `emoji`        | Emoji                        |
| `specialChars` | Caracteres especiales        |
