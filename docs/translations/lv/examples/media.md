# Multivide {#media}

## Attēli {#images}

Ievietojiet attēlus no URL:

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

Attēla poga atver attēla dialoglodziņu:

- **No saites** vai **Augšupielādēt**. Bez [augšupielādes galapunkta](/lv/guide/uploads) izvēlēts fails tiek iegults kā base64 datu URL; ar to fails nonāk jūsu serverī.
- **Alternatīvais teksts** (dialoglodziņš atgādina, ja tas ir tukšs) un **paraksts** zem attēla.
- **Izmērs**: oriģināls, teksta platumā vai pielāgots platums × augstums ar proporciju bloķēšanu.
- **Novietojums**: centrēts atsevišķā rindā vai peldošs pa kreisi vai pa labi no teksta.

Atlasītam attēlam ir izmēra maiņas turi (katra izmēra maiņa ir viens atsaukšanas solis) un virs tā rīkjosla: peldēt pa kreisi vai pa labi, lejupielādēt, rediģēt, dzēst. Dubultklikšķis atver dialoglodziņu.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Video {#videos}

Iegulstiet YouTube un Vimeo video vai video failu:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Video poga atver video dialoglodziņu:

- **YouTube vai Vimeo saite** kļūst par to atskaņotāju; dialoglodziņš parāda atpazīto pakalpojumu un priekšskatījumu, kā arī **Sākt no** (aizpildīts iepriekš no `?t=`), ja atskaņotājs to atbalsta.
- **Saite uz video failu** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) kļūst par `<video>` ar vāka attēlu, vadīklām, automātisko atskaņošanu (bez skaņas) un atkārtošanu. Saitei vajadzīgs protokols (`https://`, `http://`), `//host` vai `/path`: dialoglodziņš to nekad neuzmin.
- **Augšupielādēt** nosūta video failu uz jūsu serveri; tas parādās tikai ar [augšupielādes galapunktu](/lv/guide/uploads).
- **Izmērs**: adaptīvs 16:9 vai pielāgots platums × augstums ar proporciju bloķēšanu.

Tekstā ielīmēts YouTube URL arī tiek iegults. Klikšķis uz atskaņotāja to atlasa, nevis atskaņo, tāpēc rīkjoslas poga to parāda; dubultklikšķis atver dialoglodziņu.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Ielīmējiet YouTube URL, lai iegultu video..." />

## Iframe {#iframes}

Iegulstiet lapu pēc tās adreses vai pēc iframe koda no tās izvēlnes “Kopīgot” vai “Iegult”:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe dialoglodziņš nolasa ielīmētu kodu (adresi, izmēru, virsrakstu, atļaujas, sandbox, atliktu ielādi, pilnekrānu) un paziņo, ko no tā paņēmis; kods ar skriptiem vai citiem tagiem tiek noraidīts. Tas rāda priekšskatījumu un satur **virsrakstu ekrāna lasītājiem**, izmēru (adaptīvs koda proporcijās vai pielāgots ar proporciju bloķēšanu), bet sadaļā **Papildu** — nosaukumu, `allow`, `sandbox`, atlikto ielādi un apmali. Adresei vajadzīgs `https://` vai `http://`. Dubultklikšķis uz iegultā satura atver dialoglodziņu.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Ievadiet URL, ko iegult kā iframe..." />

## Tabulas {#tables}

Ievietojiet un rediģējiet tabulas:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Pēc tabulas ievietošanas varat:
- Pievienot/noņemt rindas un kolonnas
- Atlasīt šūnas
- Dzēst visu tabulu

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Izmantojiet tabulas pogu, lai ievietotu tabulu..." />

## Saites {#links}

Ievietojiet hipersaites:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Saites dialoglodziņš pieņem adresi tādu, kāda tā ievadīta: `https://…`, jebkuru citu shēmu (`ftp://`, `ssh://`, iekšējo), `mailto:`, `tel:`, `#anchor` vai `/page`. Tas nekad pats nepievieno protokolu: adresei bez protokola (`example.com`, `internal.host:8080`) tiek piedāvāti čipi, lai pievienotu `https://`, `http://` vai `ftp://`, un tā paliek tāda, kāda ievadīta, ja nepievienojat nevienu. Adreses ar `javascript:`, `vbscript:` un `data:` tiek noraidītas.

Dialoglodziņā ir arī saites teksts, **Atvērt jaunā cilnē** (kas pievieno `noopener noreferrer`), bet sadaļā **Papildu** — `rel` vērtības kā čipi (jebkura vērtība: to pievieno Enter, atstarpe vai komats) un CSS klase.

Ar rekvizītu [`linkPreview`](/lv/api/props#linkpreview) tas pats dialoglodziņš rāda saiti kā kartīti ar lapas attēlu, virsrakstu un aprakstu, un tukšā rindā ielīmēts URL piedāvā **Saite / Kartīte** — skatiet [Saites kartītes](/lv/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Atlasiet tekstu un noklikšķiniet uz saites, lai pievienotu hipersaiti..." />

## Emocijzīmes {#emoji}

Ievietojiet emocijzīmes no iebūvētās izvēles ar 10 kategorijām:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emocijzīmju izvēlē ir meklēšanas/filtra lauks, lai ātri atrastu konkrētas emocijzīmes.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Noklikšķiniet uz emocijzīmju pogas, lai ievietotu emocijzīmi..." />

## Īpašās rakstzīmes (Charmap) {#special-characters-charmap}

Ievietojiet īpašās rakstzīmes, bultiņas, grieķu burtus, matemātikas simbolus un citu:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorijas ir:
- Bultiņas
- Valūta
- Grieķu burti
- Matemātikas simboli
- Dažādi

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Noklikšķiniet uz charmap, lai ievietotu īpašās rakstzīmes..." />

## Multivides rīku apvienošana {#combining-media-tools}

Pilnvērtīga multivides rīkjosla:

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
placeholder="Pilna multivides rīkjosla..." />
