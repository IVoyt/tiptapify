# Média {#media}

## Képek {#images}

Kép beszúrása URL-ből:

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

A képgomb megnyitja a képpárbeszédablakot:

- **URL alapján** vagy **Feltöltés**. [Feltöltési végpont](/hu/guide/uploads) nélkül a kiválasztott fájl base64 data URL-ként ágyazódik be; végponttal a fájl a szerveredre kerül.
- **Helyettesítő szöveg** (a párbeszédablak figyelmeztet, ha üres) és **képaláírás** a kép alatt.
- **Méret**: eredeti, szövegszélesség, vagy egyéni szélesség × magasság arányzárral.
- **Elhelyezés**: külön sorban középen, vagy a szövegtől balra vagy jobbra lebegve.

A kijelölt képnek átméretező fogantyúi vannak (minden átméretezés egy visszavonási lépés), és felette egy eszköztár: balra vagy jobbra lebegtetés, letöltés, szerkesztés, törlés. A dupla kattintás megnyitja a párbeszédablakot.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videók {#videos}

YouTube- és Vimeo-videók vagy videófájl beágyazása:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

A videógomb megnyitja a videópárbeszédablakot:

- **YouTube- vagy Vimeo-hivatkozásból** azok lejátszója lesz; a párbeszédablak megmutatja a felismert szolgáltatót és egy előnézetet, valamint a **Kezdés** mezőt (a `?t=` alapján előtöltve), ahol a lejátszó támogatja.
- **Videófájlra mutató hivatkozásból** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) `<video>` lesz borítóképpel, vezérlőkkel, automatikus (némított) lejátszással és ismétléssel. A hivatkozásnak tartalmaznia kell a protokollt (`https://`, `http://`), `//host` vagy `/path` formát: a párbeszédablak soha nem találgat.
- A **Feltöltés** videófájlt küld a szerveredre; csak [feltöltési végponttal](/hu/guide/uploads) jelenik meg.
- **Méret**: reszponzív 16:9, vagy egyéni szélesség × magasság arányzárral.

A szövegbe illesztett YouTube URL is beágyazódik. A lejátszóra kattintva az kijelölődik a lejátszás helyett, így az eszköztárgomb megjelenik; a dupla kattintás megnyitja a párbeszédablakot.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Illessz be egy YouTube URL-t a videó beágyazásához..." />

## Iframe-ek {#iframes}

Ágyazz be egy oldalt a címe alapján vagy a Megosztás vagy Beágyazás menüből származó iframe-kóddal:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Az iframe-párbeszédablak beolvassa a beillesztett kódot (cím, méret, név, engedélyek, sandbox, késleltetett betöltés, teljes képernyő), és jelzi, mit vett át belőle; a szkriptet vagy más címkéket tartalmazó kódot elutasítja. Előnézetet mutat, és van benne **cím képernyőolvasóknak**, méret (reszponzív a kód arányaival, vagy egyéni arányzárral), valamint a **Speciális** alatt a név, az `allow`, a `sandbox`, a késleltetett betöltés és a szegély. A címnek `https://` vagy `http://` előtag kell. A beágyazásra kattintva duplán megnyílik a párbeszédablak.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Adj meg egy URL-t az iframe-ként való beágyazáshoz..." />

## Táblázatok {#tables}

Táblázatok beszúrása és szerkesztése:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

A táblázat beszúrása után a következőket teheted:
- Sorok és oszlopok hozzáadása/eltávolítása
- Cellák kijelölése
- A teljes táblázat törlése

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="A táblázatgombbal szúrj be egy táblázatot..." />

## Hivatkozások {#links}

Hivatkozások beszúrása:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

A hivatkozás-párbeszédablak a címet úgy veszi át, ahogy begépelték: `https://…`, bármilyen más séma (`ftp://`, `ssh://`, belső séma), `mailto:`, `tel:`, `#anchor` vagy `/page`. Soha nem ad hozzá magától protokollt: a protokoll nélküli címhez (`example.com`, `internal.host:8080`) chipek jelennek meg a `https://`, `http://` vagy `ftp://` hozzáadására, és ha egyiket sem adod hozzá, a cím úgy marad, ahogy begépelted. A `javascript:`, `vbscript:` és `data:` címeket elutasítja.

A párbeszédablakban ott van még a hivatkozás szövege, a **Megnyitás új lapon** (amely hozzáadja a `noopener noreferrer` értéket), valamint a **Speciális** alatt a `rel` értékek chipként (bármilyen érték: Enter, szóköz vagy vessző hozzáadja) és egy CSS-osztály.

A [`linkPreview`](/hu/api/props#linkpreview) proppal ugyanez a párbeszédablak a hivatkozást kártyaként mutatja az oldal képével, címével és leírásával, az üres sorba illesztett URL pedig a **Hivatkozás / Kártya** választást kínálja — lásd a [hivatkozáskártyákat](/hu/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Jelölj ki szöveget, és kattints a hivatkozásra a link hozzáadásához..." />

## Emoji {#emoji}

Emoji beszúrása a beépített, 10 kategóriás választóból:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Az emojiválasztó keresőmezőt is tartalmaz, amellyel gyorsan megtalálhatod a kívánt emojit.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kattints az emojigombra egy emoji beszúrásához..." />

## Speciális karakterek (Charmap) {#special-characters-charmap}

Speciális karakterek, nyilak, görög betűk, matematikai szimbólumok és más jelek beszúrása:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

A kategóriák:
- Nyilak
- Pénznemek
- Görög betűk
- Matematikai szimbólumok
- Egyéb

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kattints a charmapra a speciális karakterek beszúrásához..." />

## Médiaeszközök kombinálása {#combining-media-tools}

Teljes funkcionalitású médiaeszköztár:

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
placeholder="Teljes médiaeszköztár..." />
