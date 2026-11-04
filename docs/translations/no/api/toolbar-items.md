# Verktøylinjeelementer {#toolbar-items}

Alle tilgjengelige verktøylinjeelementer ordnet etter seksjon.

## Handlinger {#actions}

| Element  | Beskrivelse                       |
|----------|-----------------------------------|
| `undo`   | Angre siste endring               |
| `redo`   | Gjør om siste angrede endring     |

## AI {#ai}

| Element | Beskrivelse                                         |
|---------|-----------------------------------------------------|
| `ai`    | Åpner AI-prompt-dialogen hvis den er konfigurert    |

## Format {#format}

| Element     | Beskrivelse                |
|-------------|----------------------------|
| `bold`      | Slå fet tekst av/på        |
| `italic`    | Slå kursiv tekst av/på     |
| `underline` | Slå understreking av/på    |
| `strike`    | Slå gjennomstreking av/på  |

## Ekstra format {#format-extra}

| Element      | Beskrivelse                                         |
|--------------|-----------------------------------------------------|
| `sup`        | Slå hevet skrift av/på                              |
| `sub`        | Slå senket skrift av/på                             |
| `code`       | Slå innebygd kode av/på                             |
| `codeBlock`  | Sett inn en kodeblokk med syntaksutheving           |
| `blockquote` | Sett inn et sitat                                   |

## Stil {#style}

| Element          | Beskrivelse                                                        |
|------------------|--------------------------------------------------------------------|
| `heading`        | Nedtrekksliste for valg av overskriftsnivå (H1-H6)                 |
| `fontFamily`     | Nedtrekksliste for valg av skriftfamilie                           |
| `fontSize`       | Nedtrekksliste for valg av skriftstørrelse                         |
| `lineHeight`     | Angi linjehøyde                                                    |
| `textColor`      | Tekstfarge: palett, nylige farger, HEX, pipette, egendefinert velger |
| `highlightColor` | Uthevingsfarge: samme velger, «Ingen utheving» først               |

Elementet `heading` tar imot alternativer etter et kolon: overskriftsnivåer, `p` for å legge til et avsnittselement og `inline` for å vise dem som separate knapper i stedet for en nedtrekksliste:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Justering {#alignment}

| Element   | Beskrivelse                                                         |
|-----------|---------------------------------------------------------------------|
| `left`    | Venstrejuster tekst                                                 |
| `center`  | Sentrer tekst                                                       |
| `right`   | Høyrejuster tekst                                                   |
| `justify` | Blokkjuster tekst                                                   |
| `align`   | Nedtrekksliste for justering; `align:left,center,right` begrenser alternativene |

## Liste {#list}

| Element        | Beskrivelse                           |
|----------------|---------------------------------------|
| `bulletList`   | Slå punktliste av/på                  |
| `orderedList`  | Slå nummerert liste av/på             |
| `taskList`     | Slå oppgaveliste (avkrysningsbokser) av/på |
| `indent`       | Rykk inn gjeldende blokk              |
| `outdent`      | Fjern innrykk på gjeldende blokk      |

## Medier {#media}

| Element   | Beskrivelse                                                                |
|-----------|----------------------------------------------------------------------------|
| `link`    | Sett inn/rediger en lenke, eller et [lenkekort](/no/guide/link-cards) med `linkPreview` |
| `image`   | Sett inn/rediger et bilde: via URL eller opplasting, alt-tekst, bildetekst, størrelse, plassering |
| `video`   | Sett inn/rediger en YouTube-, Vimeo- eller videofil (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Bygg inn en side via adressen eller iframe-koden                           |
| `emoji`   | Åpne emoji-velgeren (10 kategorier)                                        |
| `charmap` | Åpne velgeren for spesialtegn                                              |
| `table`   | Sett inn en tabell                                                         |

## Diverse {#misc}

| Element         | Beskrivelse                                         |
|-----------------|-----------------------------------------------------|
| `line`          | Sett inn en horisontal linje                        |
| `pagebreak`     | Sett inn et sideskift                               |
| `source`        | Slå visning av rå HTML-kilde av/på                  |
| `preview`       | Slå HTML-forhåndsvisning av/på                      |
| `fullscreen`    | Slå fullskjermmodus for redigering av/på            |
| `formatClear`   | Fjern all formatering fra utvalget                  |
| `invisibleChar` | Sett inn usynlige tegn (mellomrom osv.)             |

## Skilletegn {#separators}

Bruk `|` som skilletegn mellom knappegrupper i `items`-prop-en i listeformat:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Fullstendig verktøylinjeeksempel {#complete-toolbar-example}

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
