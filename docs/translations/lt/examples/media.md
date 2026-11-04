# Medija {#media}

## Paveikslai {#images}

Įterpkite paveikslus iš URL:

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

Paveikslo mygtukas atidaro paveikslo dialogą:

- **Iš URL** arba **Įkelti**. Be [įkėlimo galinio taško](/lt/guide/uploads) pasirinktas failas įterpiamas kaip base64 duomenų URL; su juo failas siunčiamas į jūsų serverį.
- **Alternatyvusis tekstas** (dialogas primena, kai jis tuščias) ir paveikslo **aprašas** po juo.
- **Dydis**: originalus, pagal teksto plotį arba pasirinktinis plotis × aukštis su proporcijos užraktu.
- **Padėtis**: centre atskiroje eilutėje arba kairėje ar dešinėje nuo teksto.

Pažymėtas paveikslas turi dydžio keitimo rankenėles (kiekvienas dydžio keitimas yra vienas atšaukimo žingsnis) ir virš jo esančią įrankių juostą: lygiuoti kairėje arba dešinėje, atsisiųsti, redaguoti, ištrinti. Dukart spustelėjus atidaromas dialogas.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Vaizdo įrašai {#videos}

Įterpkite YouTube ir Vimeo vaizdo įrašus arba vaizdo įrašo failą:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Vaizdo įrašo mygtukas atidaro vaizdo įrašo dialogą:

- **YouTube ar Vimeo nuoroda** tampa jų grotuvu; dialogas parodo atpažintą tiekėją ir peržiūrą, o **Pradėti nuo** (iš anksto užpildoma iš `?t=`) – ten, kur grotuvas tai palaiko.
- **Nuoroda į vaizdo įrašo failą** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) tampa `<video>` su viršeliu, valdikliais, automatiniu paleidimu (be garso) ir kartojimu. Nuoroda turi turėti protokolą (`https://`, `http://`), `//host` arba `/path`: dialogas jo niekada neatspėja.
- **Įkelti** išsiunčia vaizdo įrašo failą į jūsų serverį; rodoma tik su [įkėlimo galiniu tašku](/lt/guide/uploads).
- **Dydis**: prisitaikantis 16:9 arba pasirinktinis plotis × aukštis su proporcijos užraktu.

Į tekstą įklijuotas YouTube URL taip pat įterpiamas. Spustelėjus grotuvą jis pažymimas, o ne paleidžiamas, todėl įrankių juostos mygtukas jį parodo; dukart spustelėjus atidaromas dialogas.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Įklijuokite YouTube URL, kad įterptumėte vaizdo įrašą..." />

## Iframe {#iframes}

Įterpkite puslapį pagal jo adresą arba pagal iframe kodą iš jo meniu „Bendrinti“ arba „Įterpti“:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Iframe dialogas nuskaito įklijuotą kodą (adresą, dydį, antraštę, leidimus, sandbox, atidėtą įkėlimą, visą ekraną) ir praneša, ką iš jo paėmė; kodas su scenarijais ar kitomis žymėmis atmetamas. Jis rodo peržiūrą ir turi **antraštę ekrano skaitytuvams**, dydį (prisitaikantį kodo proporcijomis arba pasirinktinį su proporcijos užraktu), o skiltyje **Išplėstiniai** – pavadinimą, `allow`, `sandbox`, atidėtą įkėlimą ir rėmelį. Adresas turi prasidėti `https://` arba `http://`. Dukart spustelėjus įterptą turinį atidaromas dialogas.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Įveskite URL, kad įterptumėte kaip iframe..." />

## Lentelės {#tables}

Įterpkite ir redaguokite lenteles:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Įterpę lentelę, galite:
- Pridėti / šalinti eilutes ir stulpelius
- Pažymėti ląsteles
- Ištrinti visą lentelę

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Naudokite lentelės mygtuką lentelei įterpti..." />

## Nuorodos {#links}

Įterpkite hipernuorodas:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Nuorodos dialogas priima adresą taip, kaip jis įvestas: `https://…`, bet kokią kitą schemą (`ftp://`, `ssh://`, vidinę), `mailto:`, `tel:`, `#anchor` arba `/page`. Jis niekada pats nepriduria protokolo: adresui be jo (`example.com`, `internal.host:8080`) pateikiami žetonai `https://`, `http://` ar `ftp://` pridėti, o jei nepridėsite, jis lieka toks, kaip įvestas. `javascript:`, `vbscript:` ir `data:` adresai atmetami.

Dialoge taip pat yra nuorodos tekstas, **Atidaryti naujame skirtuke** (pridedama `noopener noreferrer`), o skiltyje **Išplėstiniai** – `rel` reikšmės kaip žetonai (bet kokia reikšmė: ją prideda Enter, tarpas arba kablelis) ir CSS klasė.

Su savybe [`linkPreview`](/lt/api/props#linkpreview) tas pats dialogas parodo nuorodą kaip kortelę su puslapio paveikslu, antraštė ir aprašu, o į tuščią eilutę įklijuotas URL siūlo **Nuoroda / Kortelė** – žr. [Nuorodų kortelės](/lt/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Pažymėkite tekstą ir spustelėkite nuorodą, kad pridėtumėte hipernuorodą..." />

## Emoji {#emoji}

Įterpkite emoji iš įtaisyto pasirinkiklio su 10 kategorijų:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Emoji pasirinkiklis turi paieškos / filtro lauką, kad greitai rastumėte konkrečius emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Spustelėkite emoji mygtuką, kad įterptumėte emoji..." />

## Specialieji simboliai (Charmap) {#special-characters-charmap}

Įterpkite specialiuosius simbolius, rodykles, graikiškas raides, matematikos simbolius ir kt.:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorijos:
- Rodyklės
- Valiuta
- Graikiškos raidės
- Matematikos simboliai
- Įvairūs

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Spustelėkite charmap, kad įterptumėte specialiuosius simbolius..." />

## Medijos įrankių derinimas {#combining-media-tools}

Visų funkcijų medijos įrankių juosta:

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
placeholder="Visų medijos funkcijų įrankių juosta..." />
