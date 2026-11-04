# Media {#media}

## Afbeeldingen {#images}

Afbeeldingen invoegen via een URL:

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

De afbeeldingsknop opent de afbeeldingsdialoog:

- **Via URL** of **Uploaden**. Zonder [uploadendpoint](/nl/guide/uploads) wordt een gekozen bestand als base64-data-URL ingesloten; met een endpoint gaat het bestand naar je server.
- **Alt-tekst** (de dialoog herinnert je eraan als die leeg is) en een **bijschrift** onder de afbeelding.
- **Grootte**: origineel, tekstbreedte, of een aangepaste breedte × hoogte met vergrendelde verhouding.
- **Positie**: gecentreerd op een eigen regel, of links of rechts van de tekst zwevend.

Een geselecteerde afbeelding heeft formaatgrepen (elke formaatwijziging is één stap ongedaan maken) en een werkbalk erboven: links of rechts laten zweven, downloaden, bewerken, verwijderen. Een dubbelklik opent de dialoog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video's {#videos}

Sluit YouTube- en Vimeo-video's of een videobestand in:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

De videoknop opent de videodialoog:

- **Een YouTube- of Vimeo-link** wordt hun speler; de dialoog toont de herkende aanbieder en een voorbeeld, en **Starten bij** (vooraf ingevuld vanuit `?t=`) waar de speler dat ondersteunt.
- **Een link naar een videobestand** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) wordt een `<video>` met poster, bediening, automatisch afspelen (gedempt) en herhalen. De link heeft zijn protocol nodig (`https://`, `http://`), `//host` of een `/path`: de dialoog raadt er nooit een.
- **Uploaden** stuurt een videobestand naar je server; het verschijnt alleen met een [uploadendpoint](/nl/guide/uploads).
- **Grootte**: responsief 16:9, of een aangepaste breedte × hoogte met vergrendelde verhouding.

Een in de tekst geplakte YouTube-URL wordt ook ingesloten. Een klik op een speler selecteert die in plaats van af te spelen, zodat de toolbarknop hem toont; een dubbelklik opent de dialoog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Plak een YouTube-URL om een video in te sluiten..." />

## Iframes {#iframes}

Sluit een pagina in via het adres of via de iframe-code uit het menu Delen of Insluiten:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

De iframe-dialoog leest een geplakte code (adres, grootte, titel, machtigingen, sandbox, uitgesteld laden, volledig scherm) en meldt wat hij eruit heeft overgenomen; een code met scripts of andere tags wordt geweigerd. Hij toont een voorbeeld en heeft een **titel voor schermlezers**, de grootte (responsief in de verhoudingen van de code, of aangepast met vergrendelde verhouding) en onder **Geavanceerd** de naam, `allow`, `sandbox`, uitgesteld laden en een rand. Het adres moet beginnen met `https://` of `http://`. Een dubbelklik op een insluiting opent de dialoog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Voer een URL in om als iframe in te sluiten..." />

## Tabellen {#tables}

Tabellen invoegen en bewerken:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Na het invoegen van een tabel kun je:
- Rijen en kolommen toevoegen of verwijderen
- Cellen selecteren
- De hele tabel verwijderen

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Gebruik de tabelknop om een tabel in te voegen..." />

## Links {#links}

Hyperlinks invoegen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

De linkdialoog neemt het adres over zoals het is getypt: `https://…`, elk ander schema (`ftp://`, `ssh://`, een intern schema), `mailto:`, `tel:`, `#anchor` of `/page`. Hij voegt nooit zelf een protocol toe: een adres zonder protocol (`example.com`, `internal.host:8080`) krijgt chips om `https://`, `http://` of `ftp://` toe te voegen, en blijft zoals getypt als je er geen toevoegt. Adressen met `javascript:`, `vbscript:` en `data:` worden geweigerd.

De dialoog heeft ook de linktekst, **Openen in een nieuw tabblad** (wat `noopener noreferrer` toevoegt) en onder **Geavanceerd** de `rel`-waarden als chips (elke waarde: Enter, spatie of komma voegt hem toe) en een CSS-klasse.

Met de prop [`linkPreview`](/nl/api/props#linkpreview) toont dezelfde dialoog een link als kaart met de afbeelding, titel en beschrijving van de pagina, en een in een lege regel geplakte URL biedt **Link / Kaart** aan — zie [Linkkaarten](/nl/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Selecteer tekst en klik op link om een hyperlink toe te voegen..." />

## Emoji {#emoji}

Voeg emoji in met de ingebouwde kiezer met 10 categorieën:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

De emojikiezer bevat een zoek-/filterveld om snel specifieke emoji te vinden.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Klik op de emojiknop om een emoji in te voegen..." />

## Speciale tekens (Charmap) {#special-characters-charmap}

Voeg speciale tekens, pijlen, Griekse letters, wiskundige symbolen en meer in:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Categorieën zijn onder andere:
- Pijlen
- Valuta
- Griekse letters
- Wiskundige symbolen
- Diversen

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Klik op charmap om speciale tekens in te voegen..." />

## Mediatools combineren {#combining-media-tools}

Een volledige mediatoolbar:

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
placeholder="Volledige mediatoolbar..." />
