# Medier {#media}

## Bilder {#images}

Sett inn bilder fra en URL:

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

Bildeknappen åpner bildedialogen:

- **Fra URL** eller **Last opp**. Uten et [opplastingsendepunkt](/no/guide/uploads) bygges en valgt fil inn som en base64-data-URL. Med et endepunkt sendes filen til serveren din.
- **Alternativ tekst** (dialogen minner deg på det når feltet er tomt) og en **bildetekst** under bildet.
- **Størrelse**: original, tekstbredde eller egendefinert bredde × høyde med proporsjonslås.
- **Plassering**: sentrert på egen linje, eller flytende til venstre eller høyre for teksten.

Et valgt bilde har håndtak for å endre størrelse (hver størrelsesendring er ett angretrinn) og en verktøylinje over seg: flyt til venstre eller høyre, last ned, rediger, slett. Et dobbeltklikk åpner dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videoer {#videos}

Bygg inn YouTube- og Vimeo-videoer, eller en videofil:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Videoknappen åpner videodialogen:

- **En YouTube- eller Vimeo-lenke** blir til spilleren deres. Dialogen viser den gjenkjente leverandøren og en forhåndsvisning, og **Start ved** (forhåndsutfylt fra `?t=`) der spilleren støtter det.
- **En lenke til en videofil** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) blir til en `<video>` med plakatbilde, kontroller, autoavspilling (uten lyd) og gjentakelse. Lenken må ha protokollen sin (`https://`, `http://`), `//host` eller en `/path`: dialogen gjetter aldri en.
- **Last opp** sender en videofil til serveren din. Det vises bare med et [opplastingsendepunkt](/no/guide/uploads).
- **Størrelse**: responsiv 16:9, eller egendefinert bredde × høyde med proporsjonslås.

En YouTube-URL som limes inn i teksten, bygges også inn. Et klikk på en spiller markerer den i stedet for å spille den av, slik at verktøylinjeknappen viser den. Et dobbeltklikk åpner dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Lim inn en YouTube-URL for å bygge inn en video..." />

## Iframes {#iframes}

Bygg inn en side via adressen eller via iframe-koden fra Del- eller Bygg inn-menyen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe-dialogen leser en innlimt kode (adresse, størrelse, tittel, tillatelser, sandbox, lat lasting, fullskjerm) og sier hva den hentet ut. En kode med skript eller andre tagger avvises. Den viser en forhåndsvisning og har en **tittel for skjermlesere**, størrelsen (responsiv i kodens proporsjoner, eller egendefinert med proporsjonslås), og under **Avansert** navnet, `allow`, `sandbox`, lat lasting og en kant. Adressen må starte med `https://` eller `http://`. Et dobbeltklikk på en innbygging åpner dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Skriv inn en URL som skal bygges inn som iframe..." />

## Tabeller {#tables}

Sett inn og rediger tabeller:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Etter at du har satt inn en tabell, kan du:
- Legge til/fjerne rader og kolonner
- Markere celler
- Slette hele tabellen

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Bruk tabellknappen for å sette inn en tabell..." />

## Lenker {#links}

Sett inn hyperlenker:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Lenkedialogen tar imot adressen slik den skrives: `https://…`, ethvert annet skjema (`ftp://`, `ssh://`, et internt et), `mailto:`, `tel:`, `#anchor` eller `/page`. Den legger aldri til en protokoll på egen hånd: en adresse uten protokoll (`example.com`, `internal.host:8080`) får brikker for å legge til `https://`, `http://` eller `ftp://`, og blir stående som skrevet hvis du ikke velger noen. Adresser med `javascript:`, `vbscript:` og `data:` avvises.

Dialogen har også lenketeksten, **Åpne i ny fane** (som legger til `noopener noreferrer`), og under **Avansert** `rel`-verdiene som brikker (en hvilken som helst verdi: Enter, mellomrom eller komma legger den til) og en CSS-klasse.

Med [`linkPreview`](/no/api/props#linkpreview)-prop-en viser den samme dialogen en lenke som et kort med sidens bilde, tittel og beskrivelse, og en URL limt inn på en tom linje tilbyr **Lenke / Kort** — se [Link cards](/no/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Marker tekst og klikk på lenke for å legge til en hyperlenke..." />

## Emoji {#emoji}

Sett inn emoji fra den innebygde velgeren med 10 kategorier:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emoji-velgeren har et søke-/filterfelt for å finne bestemte emoji raskt.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Klikk på emoji-knappen for å sette inn en emoji..." />

## Spesialtegn (Charmap) {#special-characters-charmap}

Sett inn spesialtegn, piler, greske bokstaver, matematiske symboler og mer:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategoriene omfatter:
- Piler
- Valuta
- Greske bokstaver
- Matematiske symboler
- Diverse

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Klikk på charmap for å sette inn spesialtegn..." />

## Kombinere medieverktøy {#combining-media-tools}

En fullverdig medieverktøylinje:

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
placeholder="Full medieverktøylinje..." />
