# Mediji {#media}

## Slike {#images}

Umetnite slike putem URL-a:

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

Gumb za sliku otvara dijalog za slike:

- **Putem URL-a** ili **Prijenos**. Bez [krajnje točke za prijenos](/hr/guide/uploads) odabrana datoteka ugrađuje se kao base64 data URL; s njom datoteka ide na vaš poslužitelj.
- **Alternativni tekst** (dijalog vas podsjeti kad je prazan) i **opis slike** ispod slike.
- **Veličina**: izvorna, širina teksta ili prilagođena širina × visina s zaključavanjem omjera.
- **Položaj**: centrirano u zasebnom retku ili plutajuće lijevo ili desno od teksta.

Odabrana slika ima ručke za promjenu veličine (svaka promjena je jedan korak poništavanja) i alatnu traku iznad sebe: plutanje lijevo ili desno, preuzimanje, uređivanje, brisanje. Dvostruki klik otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videozapisi {#videos}

Ugradite YouTube i Vimeo videozapise ili videodatoteku:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Gumb za video otvara dijalog za video:

- **YouTube ili Vimeo poveznica** postaje njihov player; dijalog prikazuje prepoznatog pružatelja i pregled, te **Počni od** (unaprijed popunjeno iz `?t=`) gdje player to podržava.
- **Poveznica na videodatoteku** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) postaje `<video>` s naslovnom slikom, kontrolama, automatskom reprodukcijom (bez zvuka) i petljom. Poveznica treba protokol (`https://`, `http://`), `//host` ili `/path`: dijalog ga nikad ne pogađa.
- **Prijenos** šalje videodatoteku na vaš poslužitelj; prikazuje se samo uz [krajnju točku za prijenos](/hr/guide/uploads).
- **Veličina**: prilagodljiva 16:9 ili prilagođena širina × visina s zaključavanjem omjera.

YouTube URL zalijepljen u tekst također se ugrađuje. Klik na player odabire ga umjesto da ga pokrene, pa ga gumb na alatnoj traci prikazuje; dvostruki klik otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Zalijepite YouTube URL za ugradnju videozapisa..." />

## Iframeovi {#iframes}

Ugradite stranicu putem njezine adrese ili iframe koda iz izbornika Dijeli ili Ugradi:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dijalog za iframe čita zalijepljeni kôd (adresu, veličinu, naslov, dopuštenja, sandbox, odgođeno učitavanje, cijeli zaslon) i javlja što je iz njega preuzeo; kôd sa skriptama ili drugim oznakama se odbija. Prikazuje pregled i ima **naslov za čitače zaslona**, veličinu (prilagodljivu u omjeru koda ili prilagođenu sa zaključavanjem omjera) te pod **Napredno** ime, `allow`, `sandbox`, odgođeno učitavanje i obrub. Adresa treba `https://` ili `http://`. Dvostruki klik na ugrađeni sadržaj otvara dijalog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Unesite URL za ugradnju kao iframe..." />

## Tablice {#tables}

Umetanje i uređivanje tablica:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Nakon umetanja tablice možete:
- Dodavati/uklanjati retke i stupce
- Odabirati ćelije
- Izbrisati cijelu tablicu

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Upotrijebite gumb za tablicu da umetnete tablicu..." />

## Poveznice {#links}

Umetanje hiperpoveznica:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dijalog za poveznice prima adresu onako kako je upisana: `https://…`, bilo koju drugu shemu (`ftp://`, `ssh://`, internu), `mailto:`, `tel:`, `#anchor` ili `/page`. Nikad sam ne dodaje protokol: adresa bez njega (`example.com`, `internal.host:8080`) dobiva čipove za dodavanje `https://`, `http://` ili `ftp://` i ostaje kako je upisana ako nijedan ne dodate. Adrese `javascript:`, `vbscript:` i `data:` se odbijaju.

Dijalog ima i tekst poveznice, **Otvori u novoj kartici** (što dodaje `noopener noreferrer`) te pod **Napredno** vrijednosti `rel` kao čipove (bilo koja vrijednost: Enter, razmak ili zarez je dodaje) i CSS klasu.

Uz prop [`linkPreview`](/hr/api/props#linkpreview) isti dijalog prikazuje poveznicu kao karticu sa slikom, naslovom i opisom stranice, a URL zalijepljen u prazan redak nudi **Poveznica / Kartica** — vidi [Kartice poveznica](/hr/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Odaberite tekst i kliknite poveznicu za dodavanje hiperpoveznice..." />

## Emoji {#emoji}

Umetnite emoji iz ugrađenog birača s 10 kategorija:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Birač emojija uključuje polje za pretraživanje/filtriranje za brzo pronalaženje određenog emojija.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kliknite gumb za emoji da umetnete emoji..." />

## Posebni znakovi (Charmap) {#special-characters-charmap}

Umetnite posebne znakove, strelice, grčka slova, matematičke simbole i više:

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
- Matematički simboli
- Razno

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknite charmap za umetanje posebnih znakova..." />

## Kombiniranje medijskih alata {#combining-media-tools}

Potpuna medijska alatna traka:

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
placeholder="Potpuna medijska alatna traka..." />
