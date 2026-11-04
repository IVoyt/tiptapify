# Médiá {#media}

## Obrázky {#images}

Vloženie obrázkov z URL:

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

Tlačidlo obrázka otvorí dialóg obrázka:

- **Z URL** alebo **Nahrať**. Bez [endpointu na nahrávanie](/sk/guide/uploads) sa vybraný súbor vloží ako base64 data URL; s ním sa súbor odošle na váš server.
- **Alternatívny text** (dialóg vás upozorní, keď je prázdny) a **popis** pod obrázkom.
- **Veľkosť**: pôvodná, šírka textu alebo vlastná šírka × výška so zámkom pomeru strán.
- **Umiestnenie**: na stred na samostatnom riadku, alebo obtekané vľavo či vpravo od textu.

Vybraný obrázok má úchyty na zmenu veľkosti (každá zmena je jeden krok späť) a nad sebou lištu: obtekanie vľavo alebo vpravo, stiahnutie, úprava, odstránenie. Dvojklik otvorí dialóg.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videá {#videos}

Vkladajte videá z YouTube a Vimeo alebo videosúbor:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Tlačidlo videa otvorí dialóg videa:

- **Odkaz na YouTube alebo Vimeo** sa zmení na ich prehrávač; dialóg zobrazí rozpoznaného poskytovateľa a náhľad, a pole **Začať od** (predvyplnené z `?t=`) všade, kde ho prehrávač podporuje.
- **Odkaz na videosúbor** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) sa zmení na `<video>` s náhľadovým obrázkom, ovládacími prvkami, automatickým prehrávaním (bez zvuku) a opakovaním. Odkaz musí mať protokol (`https://`, `http://`), `//host` alebo `/path`: dialóg ho nikdy neuhaduje.
- **Nahrať** odošle videosúbor na váš server; zobrazuje sa iba s [endpointom na nahrávanie](/sk/guide/uploads).
- **Veľkosť**: responzívna 16:9 alebo vlastná šírka × výška so zámkom pomeru strán.

Vloží sa aj adresa YouTube vložená do textu. Kliknutie na prehrávač ho vyberie namiesto prehrania, takže ho zobrazí tlačidlo na lište nástrojov; dvojklik otvorí dialóg.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Vložte adresu YouTube a vložte video..." />

## Iframy {#iframes}

Vložte stránku podľa jej adresy alebo podľa kódu iframe z ponuky Zdieľať alebo Vložiť:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dialóg iframe prečíta vložený kód (adresa, veľkosť, titulok, povolenia, sandbox, oneskorené načítanie, celá obrazovka) a povie, čo z neho prevzal; kód so skriptmi alebo inými značkami odmietne. Zobrazuje náhľad a obsahuje **titulok pre čítačky obrazovky**, veľkosť (responzívnu v pomere kódu alebo vlastnú so zámkom pomeru strán) a v časti **Rozšírené** názov, `allow`, `sandbox`, oneskorené načítanie a rámček. Adresa musí začínať `https://` alebo `http://`. Dvojklik na vložený obsah otvorí dialóg.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Zadajte adresu URL na vloženie ako iframe..." />

## Tabuľky {#tables}

Vkladanie a úprava tabuliek:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Po vložení tabuľky môžete:
- Pridávať a odstraňovať riadky a stĺpce
- Vyberať bunky
- Odstrániť celú tabuľku

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Tabuľku vložíte tlačidlom tabuľky..." />

## Odkazy {#links}

Vkladanie hypertextových odkazov:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dialóg odkazu berie adresu tak, ako ju napíšete: `https://…`, ľubovoľná iná schéma (`ftp://`, `ssh://`, interná), `mailto:`, `tel:`, `#anchor` alebo `/page`. Protokol nikdy nepridáva sám: adresa bez neho (`example.com`, `internal.host:8080`) dostane čipy na pridanie `https://`, `http://` alebo `ftp://` a ak nepridáte žiadny, zostane tak, ako je napísaná. Adresy `javascript:`, `vbscript:` a `data:` sa odmietajú.

Dialóg obsahuje aj text odkazu, voľbu **Otvoriť na novej karte** (ktorá pridá `noopener noreferrer`) a v časti **Rozšírené** hodnoty `rel` ako čipy (ľubovoľná hodnota: pridáte ju klávesom Enter, medzerou alebo čiarkou) a triedu CSS.

S propom [`linkPreview`](/sk/api/props#linkpreview) ten istý dialóg zobrazí odkaz ako kartu s obrázkom, názvom a popisom stránky a adresa URL vložená do prázdneho riadka ponúkne **Odkaz / Karta** — pozri [Karty odkazov](/sk/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Vyberte text a kliknutím na odkaz pridajte hypertextový odkaz..." />

## Emoji {#emoji}

Vkladajte emoji zo vstavaného výberu s 10 kategóriami:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Výber emoji obsahuje pole na vyhľadávanie a filtrovanie, ktoré pomáha rýchlo nájsť konkrétne emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kliknutím na tlačidlo emoji vložte emoji..." />

## Špeciálne znaky (Charmap) {#special-characters-charmap}

Vkladajte špeciálne znaky, šípky, grécke písmená, matematické symboly a ďalšie:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategórie zahŕňajú:
- Šípky
- Meny
- Grécke písmená
- Matematické symboly
- Rôzne

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknutím na charmap vložte špeciálne znaky..." />

## Kombinovanie nástrojov pre médiá {#combining-media-tools}

Plne vybavená lišta nástrojov pre médiá:

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
placeholder="Lišta nástrojov pre médiá so všetkými funkciami..." />
