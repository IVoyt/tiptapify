# Mediji {#media}

## Slike {#images}

Umetnite slike preko URL-a:

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

Dugme za sliku otvara dijalog za slike:

- **Preko URL-a** ili **Otpremi**. Bez [endpointa za otpremanje](/sr/guide/uploads) izabrani fajl se ugrađuje kao base64 data URL; sa njim fajl odlazi na vaš server.
- **Alt tekst** (dijalog vas podseća kada je prazan) i **opis** ispod slike.
- **Veličina**: originalna, širina teksta ili prilagođena širina × visina sa zaključavanjem razmere.
- **Položaj**: centrirana u zasebnom redu ili plutajuća levo ili desno od teksta.

Izabrana slika ima ručice za promenu veličine (svaka promena je jedan korak poništavanja) i traku iznad sebe: plutanje levo ili desno, preuzimanje, uređivanje, brisanje. Dvostruki klik otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video snimci {#videos}

Ugradite YouTube i Vimeo video snimke ili video fajl:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Dugme za video otvara dijalog za video:

- **YouTube ili Vimeo veza** postaje njihov plejer; dijalog prikazuje prepoznatog provajdera i pregled, kao i **Počni od** (unapred popunjeno iz `?t=`) gde plejer to podržava.
- **Veza ka video fajlu** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) postaje `<video>` sa posterom, kontrolama, automatskim pokretanjem (bez zvuka) i ponavljanjem. Veza mora imati protokol (`https://`, `http://`), `//host` ili `/path`: dijalog ga nikada ne pogađa.
- **Otpremi** šalje video fajl na vaš server; prikazuje se samo uz [endpoint za otpremanje](/sr/guide/uploads).
- **Veličina**: responzivna 16:9 ili prilagođena širina × visina sa zaključavanjem razmere.

YouTube URL nalepljen u tekst takođe se ugrađuje. Klik na plejer ga bira umesto da ga pokrene, pa ga dugme na traci sa alatima prikazuje; dvostruki klik otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Nalepite YouTube URL da ugradite video..." />

## Iframe-ovi {#iframes}

Ugradite stranicu preko njene adrese ili preko iframe koda iz njenog menija Share ili Embed:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dijalog za iframe čita nalepljeni kod (adresu, veličinu, naslov, dozvole, sandbox, lenjo učitavanje, ceo ekran) i kaže šta je iz njega preuzeo; kod sa skriptama ili drugim tagovima se odbija. Prikazuje pregled i ima **naslov za čitače ekrana**, veličinu (responzivnu u razmeri koda ili prilagođenu sa zaključavanjem razmere), a pod **Napredno** ime, `allow`, `sandbox`, lenjo učitavanje i ivicu. Adresa mora imati `https://` ili `http://`. Dvostruki klik na ugrađeni sadržaj otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Unesite URL koji će se ugraditi kao iframe..." />

## Tabele {#tables}

Umetnite i uredite tabele:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Nakon umetanja tabele možete:
- Dodavati/uklanjati redove i kolone
- Birati ćelije
- Obrisati celu tabelu

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Dugmetom za tabelu umetnite tabelu..." />

## Veze {#links}

Umetnite hiperveze:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dijalog za vezu prima adresu onako kako je ukucana: `https://…`, bilo koju drugu šemu (`ftp://`, `ssh://`, internu), `mailto:`, `tel:`, `#anchor` ili `/page`. Nikada sam ne dodaje protokol: adresa bez njega (`example.com`, `internal.host:8080`) dobija čipove za dodavanje `https://`, `http://` ili `ftp://`, a ostaje kako je ukucana ako nijedan ne dodate. Adrese `javascript:`, `vbscript:` i `data:` se odbijaju.

Dijalog takođe ima tekst veze, **Otvori u novoj kartici** (što dodaje `noopener noreferrer`), a pod **Napredno** vrednosti `rel` kao čipove (bilo koja vrednost: Enter, razmak ili zarez je dodaje) i CSS klasu.

Uz prop [`linkPreview`](/sr/api/props#linkpreview) isti dijalog prikazuje vezu kao karticu sa slikom, naslovom i opisom stranice, a URL nalepljen u prazan red nudi **Veza / Kartica** — pogledajte [Kartice veza](/sr/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Izaberite tekst i kliknite na vezu da dodate hipervezu..." />

## Emodži {#emoji}

Umetnite emodži iz ugrađenog izbora sa 10 kategorija:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Izbor emodžija uključuje polje za pretragu/filtriranje za brzo pronalaženje određenih emodžija.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kliknite na dugme za emodži da umetnete emodži..." />

## Posebni znakovi (Charmap) {#special-characters-charmap}

Umetnite posebne znakove, strelice, grčka slova, matematičke simbole i drugo:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorije uključuju:
- Strelice
- Valute
- Grčka slova
- Matematičke simbole
- Razno

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknite na charmap da umetnete posebne znakove..." />

## Kombinovanje medijskih alata {#combining-media-tools}

Potpuna medijska traka sa alatima:

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
placeholder="Potpuna medijska traka sa alatima..." />
