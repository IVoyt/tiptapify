# Mediji {#media}

## Slike {#images}

Vstavite slike iz URL-ja:

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

Gumb za slike odpre pogovorno okno za slike:

- **Prek URL-ja** ali **Naloži**. Brez [končne točke za nalaganje](/sl/guide/uploads) se izbrana datoteka vdela kot podatkovni URL base64; z njo gre datoteka na vaš strežnik.
- **Nadomestno besedilo** (pogovorno okno opozori, če je prazno) in **napis** pod sliko.
- **Velikost**: izvirna, širina besedila ali poljubna širina × višina z zaklepom razmerja.
- **Položaj**: sredinsko v lastni vrstici ali plavajoče levo oziroma desno od besedila.

Izbrana slika ima ročice za spreminjanje velikosti (vsaka sprememba je en korak razveljavitve) in orodno vrstico nad seboj: plavanje levo ali desno, prenos, urejanje, brisanje. Dvojni klik odpre pogovorno okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videi {#videos}

Vdelajte videe YouTube in Vimeo ali video datoteko:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Gumb za video odpre pogovorno okno za video:

- **Povezava YouTube ali Vimeo** postane njun predvajalnik; pogovorno okno prikaže prepoznanega ponudnika in predogled ter **Začni pri** (vnaprej izpolnjeno iz `?t=`), kjer to predvajalnik podpira.
- **Povezava do video datoteke** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) postane `<video>` s plakatom, kontrolniki, samodejnim predvajanjem (brez zvoka) in ponavljanjem. Povezava potrebuje svoj protokol (`https://`, `http://`), `//host` ali `/path`: pogovorno okno ga nikoli ne ugiba.
- **Naloži** pošlje video datoteko na vaš strežnik; prikaže se samo s [končno točko za nalaganje](/sl/guide/uploads).
- **Velikost**: odzivno 16:9 ali poljubna širina × višina z zaklepom razmerja.

Tudi naslov YouTube, prilepljen v besedilo, se vdela. Klik na predvajalnik ga izbere, namesto da bi ga predvajal, zato ga gumb v orodni vrstici prikaže; dvojni klik odpre pogovorno okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Prilepite URL YouTube za vdelavo videa..." />

## Iframi {#iframes}

Vdelajte stran prek njenega naslova ali kode iframe iz njenega menija Deli ali Vdelaj:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Pogovorno okno za iframe prebere prilepljeno kodo (naslov, velikost, naslov elementa, dovoljenja, sandbox, odloženo nalaganje, celozaslonski način) in sporoči, kaj je iz nje prevzelo; koda s skripti ali drugimi oznakami je zavrnjena. Prikaže predogled in ima **naslov za bralnike zaslona**, velikost (odzivna v razmerju kode ali poljubna z zaklepom razmerja) ter pod **Napredno** ime, `allow`, `sandbox`, odloženo nalaganje in obrobo. Naslov potrebuje `https://` ali `http://`. Dvojni klik na vdelavo odpre pogovorno okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Vnesite URL za vdelavo kot iframe..." />

## Tabele {#tables}

Vstavljajte in urejajte tabele:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Po vstavitvi tabele lahko:
- dodajate/odstranjujete vrstice in stolpce
- izbirate celice
- izbrišete celotno tabelo

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Z gumbom za tabelo vstavite tabelo..." />

## Povezave {#links}

Vstavljajte hiperpovezave:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Pogovorno okno za povezave sprejme naslov, kot je vnesen: `https://…`, katero koli drugo shemo (`ftp://`, `ssh://`, notranjo), `mailto:`, `tel:`, `#anchor` ali `/page`. Protokola nikoli ne doda samo: naslov brez njega (`example.com`, `internal.host:8080`) dobi čipe za dodajanje `https://`, `http://` ali `ftp://` in ostane, kot je vnesen, če nobenega ne dodate. Naslovi `javascript:`, `vbscript:` in `data:` so zavrnjeni.

Pogovorno okno ima tudi besedilo povezave, **Odpri v novem zavihku** (kar doda `noopener noreferrer`) in pod **Napredno** vrednosti `rel` kot čipe (poljubna vrednost: dodate jo z Enter, presledkom ali vejico) ter razred CSS.

Z lastnostjo [`linkPreview`](/sl/api/props#linkpreview) isto pogovorno okno prikaže povezavo kot kartico s sliko, naslovom in opisom strani, URL, prilepljen v prazno vrstico, pa ponudi **Povezava / Kartica** — glejte [Kartice povezav](/sl/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Izberite besedilo in kliknite povezavo za dodajanje hiperpovezave..." />

## Emoji {#emoji}

Vstavljajte emoji iz vgrajenega izbirnika z 10 kategorijami:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Izbirnik emojijev vključuje polje za iskanje/filtriranje, s katerim hitro najdete določen emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kliknite gumb za emoji za vstavljanje emojija..." />

## Posebni znaki (Charmap) {#special-characters-charmap}

Vstavljajte posebne znake, puščice, grške črke, matematične simbole in več:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorije vključujejo:
- puščice
- valute
- grške črke
- matematične simbole
- razno

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknite charmap za vstavljanje posebnih znakov..." />

## Združevanje orodij za medije {#combining-media-tools}

Orodna vrstica za medije z vsemi funkcijami:

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
placeholder="Polna orodna vrstica za medije..." />
