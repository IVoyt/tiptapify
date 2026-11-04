# Meedia {#media}

## Pildid {#images}

Lisa pilte URL-i kaudu:

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

Pildinupp avab pildidialoogi:

- **URL-i kaudu** või **Laadi üles**. Ilma [üleslaadimise lõpp-punktita](/et/guide/uploads) manustatakse valitud fail base64 data URL-ina; lõpp-punktiga läheb fail sinu serverisse.
- **Alternatiivtekst** (dialoog tuletab meelde, kui see on tühi) ja **pildiallkiri** pildi all.
- **Suurus**: originaal, teksti laius või kohandatud laius × kõrgus suhte lukuga.
- **Asukoht**: keskel eraldi real või ujuvalt teksti vasakul või paremal.

Valitud pildil on suuruse muutmise käepidemed (iga suuruse muutmine on üks samm tagasivõtmisel) ja selle kohal tööriistariba: ujuta vasakule või paremale, laadi alla, muuda, kustuta. Topeltklõps avab dialoogi.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videod {#videos}

Manusta YouTube’i ja Vimeo videoid või videofail:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Videonupp avab videodialoogi:

- **YouTube’i või Vimeo link** muutub nende pleieriks; dialoog näitab tuvastatud teenusepakkujat ja eelvaadet ning välja **Algus** (eeltäidetud väärtusest `?t=`), kui pleier seda toetab.
- **Link videofailile** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) muutub elemendiks `<video>` kaanepildi, juhtnuppude, automaatesituse (ilma helita) ja kordusega. Link vajab protokolli (`https://`, `http://`), `//host` või `/path`: dialoog ei arva seda kunagi ära.
- **Laadi üles** saadab videofaili sinu serverisse; see kuvatakse ainult koos [üleslaadimise lõpp-punktiga](/et/guide/uploads).
- **Suurus**: kohanduv 16:9 või kohandatud laius × kõrgus suhte lukuga.

Tekstisse kleebitud YouTube’i URL manustatakse samuti. Klõps pleieril valib selle esitamise asemel, nii et tööriistariba nupp näitab seda; topeltklõps avab dialoogi.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Kleebi YouTube’i URL, et video manustada..." />

## Iframe’id {#iframes}

Manusta leht selle aadressi või menüüst Jaga (Share) või Manusta (Embed) saadud iframe-koodi järgi:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe’i dialoog loeb kleebitud koodi (aadress, suurus, pealkiri, õigused, sandbox, viivitatud laadimine, täisekraan) ja ütleb, mille ta sealt võttis; skriptide või muude märgenditega kood lükatakse tagasi. See näitab eelvaadet ning sisaldab **pealkirja ekraanilugejatele**, suurust (kohanduv koodi proportsioonides või kohandatud suhte lukuga) ja jaotises **Täpsemalt** nime, `allow`, `sandbox`, viivitatud laadimist ja äärist. Aadress vajab `https://` või `http://`. Topeltklõps manusel avab dialoogi.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Sisesta URL, mida iframe’ina manustada..." />

## Tabelid {#tables}

Tabelite lisamine ja muutmine:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Pärast tabeli lisamist saad:
- Lisada/eemaldada ridu ja veerge
- Valida lahtreid
- Kustutada kogu tabeli

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Tabeli lisamiseks kasuta tabelinuppu..." />

## Lingid {#links}

Hüperlinkide lisamine:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Linkidialoog võtab aadressi vastu täpselt nii, nagu see on sisestatud: `https://…`, mis tahes muu skeem (`ftp://`, `ssh://`, sisemine), `mailto:`, `tel:`, `#anchor` või `/page`. See ei lisa kunagi ise protokolli: aadress ilma protokollita (`example.com`, `internal.host:8080`) saab kiibid `https://`, `http://` või `ftp://` lisamiseks ja jääb sisestatud kujule, kui sa ühtegi ei lisa. Aadressid `javascript:`, `vbscript:` ja `data:` lükatakse tagasi.

Dialoogis on ka lingi tekst, **Ava uuel vahelehel** (mis lisab `noopener noreferrer`) ning jaotises **Täpsemalt** `rel` väärtused kiibidena (mis tahes väärtus: Enter, tühik või koma lisab selle) ja CSS-klass.

Propiga [`linkPreview`](/et/api/props#linkpreview) näitab sama dialoog linki kaardina koos lehe pildi, pealkirja ja kirjeldusega ning tühjale reale kleebitud URL pakub **Link / Kaart** — vaata [lingikaarte](/et/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Vali tekst ja klõpsa lingil, et lisada hüperlink..." />

## Emotikonid {#emoji}

Lisa emotikone sisseehitatud valijast, kus on 10 kategooriat:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emotikonide valijas on otsingu-/filtrisisend, millega leiab kindla emotikoni kiiresti üles.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Emotikoni lisamiseks klõpsa emotikoninupul..." />

## Erimärgid (Charmap) {#special-characters-charmap}

Lisa erimärke, nooli, kreeka tähti, matemaatikasümboleid ja muud:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategooriad on:
- Nooled
- Valuutad
- Kreeka tähed
- Matemaatikasümbolid
- Mitmesugused

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Erimärkide lisamiseks klõpsa charmapil..." />

## Meediatööriistade kombineerimine {#combining-media-tools}

Täisfunktsionaalne meediatööriistariba:

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
placeholder="Täielik meediatööriistariba..." />
