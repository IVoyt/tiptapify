# Media {#media}

## Kuvat {#images}

Lisää kuvia URL-osoitteesta:

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

Kuvapainike avaa kuvadialogin:

- **URL-osoitteesta** tai **Lataa**. Ilman [lataus-päätepistettä](/fi/guide/uploads) valittu tiedosto upotetaan base64-data-URL-osoitteena; sen kanssa tiedosto menee palvelimellesi.
- **Vaihtoehtoinen teksti** (dialogi muistuttaa, kun se on tyhjä) ja **kuvateksti** kuvan alla.
- **Koko**: alkuperäinen, tekstin levyinen tai mukautettu leveys × korkeus suhteen lukituksella.
- **Sijainti**: keskitettynä omalla rivillään tai kelluen tekstin vasemmalla tai oikealla puolella.

Valitussa kuvassa on koonmuutoskahvat (jokainen koonmuutos on yksi kumoamisaskel) ja sen päällä työkalurivi: kellunta vasemmalle tai oikealle, lataus, muokkaus, poisto. Kaksoisnapsautus avaa dialogin.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videot {#videos}

Upota YouTube- ja Vimeo-videoita tai videotiedosto:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Videopainike avaa videodialogin:

- **YouTube- tai Vimeo-linkistä** tulee niiden soitin; dialogi näyttää tunnistetun palveluntarjoajan ja esikatselun sekä **Aloituskohta**-kentän (esitäytetty `?t=`-arvosta), kun soitin tukee sitä.
- **Linkistä videotiedostoon** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) tulee `<video>`, jossa on esikatselukuva, säätimet, automaattinen toisto (ilman ääntä) ja jatkuva toisto. Linkissä on oltava protokolla (`https://`, `http://`), `//host` tai `/path`: dialogi ei koskaan arvaa sitä.
- **Lataa** lähettää videotiedoston palvelimellesi; se näkyy vain [lataus-päätepisteen](/fi/guide/uploads) kanssa.
- **Koko**: responsiivinen 16:9 tai mukautettu leveys × korkeus suhteen lukituksella.

Myös tekstiin liitetty YouTube-URL upotetaan. Soittimen napsautus valitsee sen toistamisen sijaan, jotta työkalurivin painike näyttää sen; kaksoisnapsautus avaa dialogin.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Liitä YouTube-URL upottaaksesi videon..." />

## Iframet {#iframes}

Upota sivu osoitteensa tai Jaa- tai Upota-valikon iframe-koodin avulla:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe-dialogi lukee liitetyn koodin (osoite, koko, otsikko, käyttöoikeudet, sandbox, viivästetty lataus, koko näyttö) ja kertoo, mitä se siitä otti; koodi, jossa on skriptejä tai muita tageja, hylätään. Se näyttää esikatselun ja siinä on **otsikko ruudunlukijoille**, koko (responsiivinen koodin mittasuhteissa tai mukautettu suhteen lukituksella) ja kohdassa **Lisäasetukset** nimi, `allow`, `sandbox`, viivästetty lataus ja reunus. Osoitteessa on oltava `https://` tai `http://`. Upotuksen kaksoisnapsautus avaa dialogin.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Anna URL upotettavaksi iframena..." />

## Taulukot {#tables}

Lisää ja muokkaa taulukoita:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Taulukon lisäämisen jälkeen voit:
- Lisätä tai poistaa rivejä ja sarakkeita
- Valita soluja
- Poistaa koko taulukon

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Lisää taulukko taulukkopainikkeella..." />

## Linkit {#links}

Lisää hyperlinkkejä:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Linkkidialogi ottaa osoitteen sellaisenaan kuin se kirjoitetaan: `https://…`, mikä tahansa muu skeema (`ftp://`, `ssh://`, sisäinen), `mailto:`, `tel:`, `#anchor` tai `/page`. Se ei koskaan lisää protokollaa itse: osoite ilman sitä (`example.com`, `internal.host:8080`) saa chipit `https://`-, `http://`- tai `ftp://`-protokollan lisäämiseksi ja pysyy kirjoitettuna, jos et lisää mitään. `javascript:`-, `vbscript:`- ja `data:`-osoitteet hylätään.

Dialogissa on myös linkin teksti, **Avaa uudessa välilehdessä** (joka lisää `noopener noreferrer`) ja kohdassa **Lisäasetukset** `rel`-arvot chippeinä (mikä tahansa arvo: Enter, välilyönti tai pilkku lisää sen) sekä CSS-luokka.

[`linkPreview`](/fi/api/props#linkpreview)-propsin kanssa sama dialogi näyttää linkin korttina, jossa on sivun kuva, otsikko ja kuvaus, ja tyhjälle riville liitetty URL tarjoaa vaihtoehtoa **Linkki / Kortti** — katso [Linkkikortit](/fi/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Valitse teksti ja napsauta linkkiä lisätäksesi hyperlinkin..." />

## Emoji {#emoji}

Lisää emojeita sisäänrakennetusta valitsimesta, jossa on 10 luokkaa:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emojivalitsimessa on haku-/suodatuskenttä, jolla löydät tietyt emojit nopeasti.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Napsauta emojipainiketta lisätäksesi emojin..." />

## Erikoismerkit (Charmap) {#special-characters-charmap}

Lisää erikoismerkkejä, nuolia, kreikkalaisia kirjaimia, matematiikkasymboleja ja muuta:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Luokkia ovat:
- Nuolet
- Valuutat
- Kreikkalaiset kirjaimet
- Matematiikkasymbolit
- Sekalaiset

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Napsauta charmapia lisätäksesi erikoismerkkejä..." />

## Mediatyökalujen yhdistäminen {#combining-media-tools}

Täyspiirteinen mediatyökalurivi:

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
placeholder="Täysi mediatyökalurivi..." />
