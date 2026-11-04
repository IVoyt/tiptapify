# Elementi della barra degli strumenti {#toolbar-items}

Tutti gli elementi disponibili della barra degli strumenti, organizzati per sezione.

## Azioni {#actions}

| Elemento | Descrizione                      |
|----------|----------------------------------|
| `undo`   | Annulla l'ultima modifica        |
| `redo`   | Ripristina l'ultima modifica annullata |

## AI {#ai}

| Elemento | Descrizione                                     |
|------|-------------------------------------------------|
| `ai` | Apre la finestra del prompt AI, se configurata  |

## Formato {#format}

| Elemento    | Descrizione              |
|-------------|--------------------------|
| `bold`      | Attiva/disattiva il grassetto |
| `italic`    | Attiva/disattiva il corsivo |
| `underline` | Attiva/disattiva la sottolineatura |
| `strike`    | Attiva/disattiva il barrato |

## Formato extra {#format-extra}

| Elemento     | Descrizione                                  |
|--------------|----------------------------------------------|
| `sup`        | Attiva/disattiva l'apice                     |
| `sub`        | Attiva/disattiva il pedice                   |
| `code`       | Attiva/disattiva il codice inline            |
| `codeBlock`  | Inserisce un blocco di codice con evidenziazione della sintassi |
| `blockquote` | Inserisce una citazione                      |

## Stile {#style}

| Elemento         | Descrizione                                |
|------------------|--------------------------------------------|
| `heading`        | Menu a discesa per scegliere il livello del titolo (H1-H6) |
| `fontFamily`     | Menu a discesa per scegliere il tipo di carattere |
| `fontSize`       | Menu a discesa per scegliere la dimensione del carattere |
| `lineHeight`     | Imposta l'altezza di riga                  |
| `textColor`      | Colore del testo: palette, colori recenti, HEX, contagocce, selettore personalizzato |
| `highlightColor` | Colore di evidenziazione: lo stesso selettore, con "Nessuna evidenziazione" per primo |

L'elemento `heading` accetta opzioni dopo i due punti: i livelli del titolo, `p` per aggiungere una voce di paragrafo e `inline` per mostrarli come pulsanti separati anziché in un menu a discesa:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Allineamento {#alignment}

| Elemento  | Descrizione       |
|-----------|-------------------|
| `left`    | Allinea il testo a sinistra |
| `center`  | Centra il testo   |
| `right`   | Allinea il testo a destra |
| `justify` | Giustifica il testo |
| `align`   | Menu a discesa dell'allineamento; `align:left,center,right` ne limita le opzioni |

## Elenchi {#list}

| Elemento       | Descrizione                   |
|----------------|-------------------------------|
| `bulletList`   | Attiva/disattiva l'elenco puntato |
| `orderedList`  | Attiva/disattiva l'elenco numerato |
| `taskList`     | Attiva/disattiva l'elenco di attività (caselle di controllo) |
| `indent`       | Aumenta il rientro del blocco corrente |
| `outdent`      | Riduce il rientro del blocco corrente |

## Media {#media}

| Elemento  | Descrizione                       |
|-----------|-----------------------------------|
| `link`    | Inserisce/modifica un link, o una [scheda link](/it/guide/link-cards) con `linkPreview` |
| `image`   | Inserisce/modifica un'immagine: da URL o caricamento, testo alternativo, didascalia, dimensione, posizione |
| `video`   | Inserisce/modifica un video di YouTube, Vimeo o un file video (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Incorpora una pagina tramite il suo indirizzo o il suo codice iframe |
| `emoji`   | Apre il selettore di emoji (10 categorie) |
| `charmap` | Apre il selettore dei caratteri speciali |
| `table`   | Inserisce una tabella             |

## Varie {#misc}

| Elemento        | Descrizione                                |
|-----------------|--------------------------------------------|
| `line`          | Inserisce una linea orizzontale            |
| `pagebreak`     | Inserisce un'interruzione di pagina        |
| `source`        | Attiva/disattiva la vista del sorgente HTML |
| `preview`       | Attiva/disattiva la modalità anteprima HTML |
| `fullscreen`    | Attiva/disattiva la modalità di modifica a schermo intero |
| `formatClear`   | Rimuove tutta la formattazione dalla selezione |
| `invisibleChar` | Inserisce caratteri invisibili (spazi, ecc.) |

## Separatori {#separators}

Usa `|` come separatore tra i gruppi di pulsanti nella prop `items` in forma di array:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Esempio di barra degli strumenti completa {#complete-toolbar-example}

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
