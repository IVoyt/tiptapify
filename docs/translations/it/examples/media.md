# Media {#media}

## Immagini {#images}

Inserisci immagini da un URL:

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

Il pulsante dell'immagine apre la finestra di dialogo dell'immagine:

- **Da URL** o **Carica**. Senza un [endpoint di upload](/it/guide/uploads) il file scelto viene incorporato come data URL base64; con un endpoint il file va al tuo server.
- **Testo alternativo** (la finestra ti avvisa quando è vuoto) e una **didascalia** sotto l'immagine.
- **Dimensione**: originale, larghezza del testo, oppure larghezza × altezza personalizzate con il blocco delle proporzioni.
- **Posizione**: centrata su una riga a sé, oppure affiancata a sinistra o a destra del testo.

Un'immagine selezionata ha le maniglie di ridimensionamento (ogni ridimensionamento è un singolo passo di annullamento) e una barra degli strumenti sopra di essa: affianca a sinistra o a destra, scarica, modifica, elimina. Un doppio clic apre la finestra di dialogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video {#videos}

Incorpora video di YouTube e Vimeo, oppure un file video:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Il pulsante del video apre la finestra di dialogo del video:

- **Un link di YouTube o Vimeo** diventa il loro player; la finestra mostra il provider riconosciuto e un'anteprima, e **Inizia da** (precompilato da `?t=`) dove il player lo supporta.
- **Un link a un file video** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) diventa un `<video>` con poster, controlli, riproduzione automatica (senza audio) e ciclo continuo. Il link richiede il suo protocollo (`https://`, `http://`), `//host` o un `/path`: la finestra non ne indovina mai uno.
- **Carica** invia un file video al tuo server; compare solo con un [endpoint di upload](/it/guide/uploads).
- **Dimensione**: 16:9 responsive, oppure larghezza × altezza personalizzate con il blocco delle proporzioni.

Anche un URL di YouTube incollato nel testo viene incorporato. Un clic su un player lo seleziona invece di avviarlo, così il pulsante della barra degli strumenti lo mostra; un doppio clic apre la finestra di dialogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Incolla un URL di YouTube per incorporare un video..." />

## Iframe {#iframes}

Incorpora una pagina tramite il suo indirizzo o il codice iframe del suo menu Condividi o Incorpora:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

La finestra dell'iframe legge un codice incollato (indirizzo, dimensioni, titolo, permessi, sandbox, caricamento lazy, schermo intero) e indica cosa ne ha ricavato; un codice con script o altri tag viene rifiutato. Mostra un'anteprima e ha un **titolo per gli screen reader**, le dimensioni (responsive nelle proporzioni del codice, oppure personalizzate con il blocco delle proporzioni) e, sotto **Avanzate**, il nome, `allow`, `sandbox`, il caricamento lazy e un bordo. L'indirizzo richiede `https://` o `http://`. Un doppio clic su un incorporamento apre la finestra di dialogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Inserisci un URL da incorporare come iframe..." />

## Tabelle {#tables}

Inserisci e modifica tabelle:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Dopo aver inserito una tabella puoi:
- Aggiungere/rimuovere righe e colonne
- Selezionare celle
- Eliminare l'intera tabella

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Usa il pulsante della tabella per inserire una tabella..." />

## Link {#links}

Inserisci collegamenti ipertestuali:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

La finestra del link accetta l'indirizzo così come viene digitato: `https://…`, qualsiasi altro schema (`ftp://`, `ssh://`, uno interno), `mailto:`, `tel:`, `#anchor` o `/page`. Non aggiunge mai un protocollo da sola: un indirizzo senza protocollo (`example.com`, `internal.host:8080`) mostra dei chip per aggiungere `https://`, `http://` o `ftp://`, e resta come digitato se non ne aggiungi nessuno. Gli indirizzi `javascript:`, `vbscript:` e `data:` vengono rifiutati.

La finestra ha anche il testo del link, **Apri in una nuova scheda** (che aggiunge `noopener noreferrer`) e, sotto **Avanzate**, i valori `rel` come chip (qualsiasi valore: Invio, spazio o virgola lo aggiunge) e una classe CSS.

Con la prop [`linkPreview`](/it/api/props#linkpreview) la stessa finestra mostra un link come scheda con l'immagine, il titolo e la descrizione della pagina, e un URL incollato in una riga vuota offre **Collegamento / Scheda**: vedi [Schede dei link](/it/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Seleziona del testo e fai clic su link per aggiungere un collegamento..." />

## Emoji {#emoji}

Inserisci emoji dal selettore integrato con 10 categorie:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Il selettore di emoji include un campo di ricerca/filtro per trovare rapidamente emoji specifiche.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Fai clic sul pulsante emoji per inserire un'emoji..." />

## Caratteri speciali (Charmap) {#special-characters-charmap}

Inserisci caratteri speciali, frecce, lettere greche, simboli matematici e altro:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Le categorie includono:
- Frecce
- Valute
- Lettere greche
- Simboli matematici
- Varie

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Fai clic su charmap per inserire caratteri speciali..." />

## Combinare gli strumenti media {#combining-media-tools}

Una barra degli strumenti media completa:

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
placeholder="Barra degli strumenti media completa..." />
