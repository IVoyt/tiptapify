# Media {#media}

## Bilder {#images}

Infoga bilder från en URL:

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

Bildknappen öppnar bilddialogen:

- **Via URL** eller **Ladda upp**. Utan en [uppladdningsendpoint](/sv/guide/uploads) bäddas en vald fil in som en base64-data-URL; med en skickas filen till din server.
- **Alternativtext** (dialogen påminner dig när den är tom) och en **bildtext** under bilden.
- **Storlek**: original, textbredd eller egen bredd × höjd med proportionslåset.
- **Placering**: centrerad på en egen rad, eller flytande till vänster eller höger om texten.

En markerad bild har handtag för storleksändring (varje ändring är ett ångra-steg) och ett verktygsfält över sig: flyta till vänster eller höger, ladda ned, redigera, ta bort. Ett dubbelklick öppnar dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videor {#videos}

Bädda in YouTube- och Vimeo-videor, eller en videofil:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Videoknappen öppnar videodialogen:

- **En YouTube- eller Vimeo-länk** blir deras spelare; dialogen visar den identifierade leverantören och en förhandsgranskning, samt **Starta vid** (förifyllt från `?t=`) där spelaren stöder det.
- **En länk till en videofil** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) blir en `<video>` med affisch, kontroller, automatisk uppspelning (ljudlös) och loop. Länken behöver sitt protokoll (`https://`, `http://`), `//host` eller en `/path`: dialogen gissar aldrig något.
- **Ladda upp** skickar en videofil till din server; det visas bara med en [uppladdningsendpoint](/sv/guide/uploads).
- **Storlek**: responsiv 16:9, eller egen bredd × höjd med proportionslåset.

En YouTube-URL som klistras in i texten bäddas också in. Ett klick på en spelare markerar den i stället för att spela upp den, så att verktygsfältsknappen visar den; ett dubbelklick öppnar dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Klistra in en YouTube-URL för att bädda in en video..." />

## Iframes {#iframes}

Bädda in en sida via dess adress eller via iframe-koden från dess meny Dela eller Bädda in:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe-dialogen läser en inklistrad kod (adress, storlek, titel, behörigheter, sandbox, fördröjd inläsning, helskärm) och talar om vad den hämtade från den; en kod med skript eller andra taggar nekas. Den visar en förhandsgranskning och har en **titel för skärmläsare**, storleken (responsiv i kodens proportioner, eller egen med proportionslåset) och under **Avancerat** namnet, `allow`, `sandbox`, fördröjd inläsning och en ram. Adressen måste börja med `https://` eller `http://`. Ett dubbelklick på en inbäddning öppnar dialogen.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Ange en URL att bädda in som iframe..." />

## Tabeller {#tables}

Infoga och redigera tabeller:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

När du har infogat en tabell kan du:
- Lägga till/ta bort rader och kolumner
- Markera celler
- Ta bort hela tabellen

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Använd tabellknappen för att infoga en tabell..." />

## Länkar {#links}

Infoga hyperlänkar:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Länkdialogen tar emot adressen precis som den skrivs: `https://…`, vilket annat schema som helst (`ftp://`, `ssh://`, ett internt), `mailto:`, `tel:`, `#anchor` eller `/page`. Den lägger aldrig till ett protokoll på egen hand: en adress utan protokoll (`example.com`, `internal.host:8080`) får chips för att lägga till `https://`, `http://` eller `ftp://`, och förblir som den skrevs om du inte lägger till något. Adresser med `javascript:`, `vbscript:` och `data:` nekas.

Dialogen har också länktexten, **Öppna i ny flik** (som lägger till `noopener noreferrer`) och under **Avancerat** `rel`-värdena som chips (valfritt värde: Enter, mellanslag eller komma lägger till det) samt en CSS-klass.

Med propen [`linkPreview`](/sv/api/props#linkpreview) visar samma dialog en länk som ett kort med sidans bild, titel och beskrivning, och en URL som klistras in på en tom rad erbjuder **Länk / Kort** — se [Länkkort](/sv/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Markera text och klicka på länk för att lägga till en hyperlänk..." />

## Emoji {#emoji}

Infoga emoji från den inbyggda väljaren med 10 kategorier:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emojiväljaren har ett sök-/filterfält för att snabbt hitta specifika emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Klicka på emojiknappen för att infoga en emoji..." />

## Specialtecken (Charmap) {#special-characters-charmap}

Infoga specialtecken, pilar, grekiska bokstäver, matematiska symboler och mer:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorier är bland annat:
- Pilar
- Valutor
- Grekiska bokstäver
- Matematiska symboler
- Övrigt

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Klicka på charmap för att infoga specialtecken..." />

## Kombinera mediaverktyg {#combining-media-tools}

Ett fullständigt mediaverktygsfält:

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
placeholder="Fullständigt mediaverktygsfält..." />
