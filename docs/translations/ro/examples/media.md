# Media {#media}

## Imagini {#images}

Inserează imagini dintr-un URL:

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

Butonul de imagine deschide dialogul pentru imagine:

- **Din URL** sau **Încarcă**. Fără un [endpoint de încărcare](/ro/guide/uploads), un fișier ales este încorporat ca URL de date base64; cu unul, fișierul ajunge pe serverul tău.
- **Text alternativ** (dialogul îți amintește când este gol) și o **legendă** sub imagine.
- **Dimensiune**: originală, lățimea textului sau lățime × înălțime personalizate, cu blocarea proporției.
- **Poziție**: centrată pe propria linie sau plutind în stânga ori în dreapta textului.

O imagine selectată are mânere de redimensionare (fiecare redimensionare este un singur pas de anulare) și o bară de instrumente deasupra: plutire la stânga sau la dreapta, descărcare, editare, ștergere. Un dublu clic deschide dialogul.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videoclipuri {#videos}

Încorporează videoclipuri YouTube și Vimeo sau un fișier video:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Butonul video deschide dialogul pentru video:

- **Un link YouTube sau Vimeo** devine playerul lor; dialogul afișează furnizorul recunoscut și o previzualizare, plus **Începe de la** (precompletat din `?t=`) acolo unde playerul îl acceptă.
- **Un link către un fișier video** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) devine un `<video>` cu copertă, controale, redare automată (fără sunet) și repetare. Linkul are nevoie de protocol (`https://`, `http://`), `//host` sau o `/path`: dialogul nu ghicește niciodată unul.
- **Încarcă** trimite un fișier video pe serverul tău; apare doar cu un [endpoint de încărcare](/ro/guide/uploads).
- **Dimensiune**: adaptivă 16:9 sau lățime × înălțime personalizate, cu blocarea proporției.

Un URL YouTube lipit în text este încorporat și el. Un clic pe un player îl selectează în loc să-l redea, astfel încât butonul din bara de instrumente îl arată; un dublu clic deschide dialogul.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Lipește un URL YouTube pentru a încorpora un videoclip..." />

## Iframe-uri {#iframes}

Încorporează o pagină după adresa ei sau după codul iframe din meniul său Distribuie sau Încorporează:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dialogul iframe citește un cod lipit (adresă, dimensiune, titlu, permisiuni, sandbox, încărcare amânată, ecran complet) și spune ce a preluat din el; un cod cu scripturi sau alte etichete este refuzat. Afișează o previzualizare și are un **titlu pentru cititoarele de ecran**, dimensiunea (adaptivă în proporțiile codului sau personalizată, cu blocarea proporției) și, la **Avansat**, numele, `allow`, `sandbox`, încărcarea amânată și un chenar. Adresa are nevoie de `https://` sau `http://`. Un dublu clic pe o încorporare deschide dialogul.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Introdu un URL de încorporat ca iframe..." />

## Tabele {#tables}

Inserează și editează tabele:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

După inserarea unui tabel, poți:
- Adăuga/elimina rânduri și coloane
- Selecta celule
- Șterge întregul tabel

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Folosește butonul de tabel pentru a insera un tabel..." />

## Linkuri {#links}

Inserează hyperlinkuri:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dialogul de link preia adresa așa cum este tastată: `https://…`, orice altă schemă (`ftp://`, `ssh://`, una internă), `mailto:`, `tel:`, `#anchor` sau `/page`. Nu adaugă niciodată singur un protocol: o adresă fără protocol (`example.com`, `internal.host:8080`) primește chipuri pentru a adăuga `https://`, `http://` sau `ftp://` și rămâne așa cum a fost tastată dacă nu adaugi niciunul. Adresele `javascript:`, `vbscript:` și `data:` sunt refuzate.

Dialogul are și textul linkului, **Deschide într-o filă nouă** (care adaugă `noopener noreferrer`) și, la **Avansat**, valorile `rel` ca chipuri (orice valoare: Enter, spațiu sau virgulă o adaugă) și o clasă CSS.

Cu proprietatea [`linkPreview`](/ro/api/props#linkpreview), același dialog afișează un link ca pe un card cu imaginea, titlul și descrierea paginii, iar un URL lipit pe o linie goală oferă **Link / Card** — vezi [Carduri de link](/ro/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Selectează textul și dă clic pe link pentru a adăuga un hyperlink..." />

## Emoji {#emoji}

Inserează emoji din selectorul încorporat, cu 10 categorii:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Selectorul de emoji include un câmp de căutare/filtrare pentru a găsi rapid anumite emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Dă clic pe butonul de emoji pentru a insera un emoji..." />

## Caractere speciale (Charmap) {#special-characters-charmap}

Inserează caractere speciale, săgeți, litere grecești, simboluri matematice și altele:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Categoriile includ:
- Săgeți
- Monedă
- Litere grecești
- Simboluri matematice
- Diverse

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Dă clic pe charmap pentru a insera caractere speciale..." />

## Combinarea instrumentelor media {#combining-media-tools}

O bară de instrumente media completă:

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
placeholder="Bară de instrumente media completă..." />
