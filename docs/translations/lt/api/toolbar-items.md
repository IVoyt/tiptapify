# Įrankių juostos elementai {#toolbar-items}

Visi galimi įrankių juostos elementai, suskirstyti pagal skyrius.

## Veiksmai {#actions}

| Elementas | Aprašas                     |
|----------|-----------------------------|
| `undo`   | Atšaukti paskutinį pakeitimą |
| `redo`   | Pakartoti paskutinį atšauktą pakeitimą |

## DI {#ai}

| Elementas | Aprašas                                  |
|------|------------------------------------------|
| `ai` | Atidaryti DI užklausos dialogą, jei sukonfigūruota |

## Formatas {#format}

| Elementas   | Aprašas              |
|-------------|----------------------|
| `bold`      | Įjungti / išjungti paryškintą tekstą |
| `italic`    | Įjungti / išjungti kursyvą |
| `underline` | Įjungti / išjungti pabraukimą |
| `strike`    | Įjungti / išjungti perbraukimą |

## Papildomas formatas {#format-extra}

| Elementas    | Aprašas                                      |
|--------------|----------------------------------------------|
| `sup`        | Įjungti / išjungti viršutinį indeksą         |
| `sub`        | Įjungti / išjungti apatinį indeksą           |
| `code`       | Įjungti / išjungti kodą eilutėje             |
| `codeBlock`  | Įterpti kodo bloką su sintaksės paryškinimu  |
| `blockquote` | Įterpti citatos bloką                        |

## Stilius {#style}

| Elementas        | Aprašas                                    |
|------------------|--------------------------------------------|
| `heading`        | Išskleidžiamasis sąrašas antraštės lygiui pasirinkti (H1–H6) |
| `fontFamily`     | Išskleidžiamasis sąrašas šriftui pasirinkti |
| `fontSize`       | Išskleidžiamasis sąrašas šrifto dydžiui pasirinkti |
| `lineHeight`     | Nustatyti eilutės aukštį                   |
| `textColor`      | Teksto spalva: paletė, naujausios spalvos, HEX, pipetė, pasirinktinis parinkiklis |
| `highlightColor` | Paryškinimo spalva: tas pats parinkiklis, pirmiausia „Be paryškinimo“ |

Elementas `heading` priima parinktis po dvitaškio: antraštės lygius, `p` pastraipos elementui pridėti ir `inline`, kad jie būtų rodomi kaip atskiri mygtukai, o ne išskleidžiamasis sąrašas:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Lygiavimas {#alignment}

| Elementas | Aprašas           |
|-----------|-------------------|
| `left`    | Lygiuoti tekstą kairėje |
| `center`  | Lygiuoti tekstą centre |
| `right`   | Lygiuoti tekstą dešinėje |
| `justify` | Lygiuoti tekstą pločiu |
| `align`   | Lygiavimo išskleidžiamasis sąrašas; `align:left,center,right` apriboja jo parinktis |

## Sąrašas {#list}

| Elementas      | Aprašas                       |
|----------------|-------------------------------|
| `bulletList`   | Įjungti / išjungti ženklelių sąrašą |
| `orderedList`  | Įjungti / išjungti numeruotą sąrašą |
| `taskList`     | Įjungti / išjungti užduočių sąrašą (žymimieji langeliai) |
| `indent`       | Padidinti dabartinio bloko įtrauką |
| `outdent`      | Sumažinti dabartinio bloko įtrauką |

## Medija {#media}

| Elementas | Aprašas                           |
|-----------|-----------------------------------|
| `link`    | Įterpti / redaguoti nuorodą arba, su `linkPreview`, [nuorodos kortelę](/lt/guide/link-cards) |
| `image`   | Įterpti / redaguoti paveikslą: pagal URL arba įkėlimą, alt, aprašas, dydis, padėtis |
| `video`   | Įterpti / redaguoti YouTube, Vimeo arba vaizdo įrašo failą (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Įterpti puslapį pagal jo adresą arba iframe kodą |
| `emoji`   | Atidaryti emoji pasirinkiklį (10 kategorijų) |
| `charmap` | Atidaryti specialiųjų simbolių pasirinkiklį |
| `table`   | Įterpti lentelę                   |

## Įvairūs {#misc}

| Elementas       | Aprašas                                    |
|-----------------|--------------------------------------------|
| `line`          | Įterpti horizontalią liniją                |
| `pagebreak`     | Įterpti puslapio lūžį                      |
| `source`        | Įjungti / išjungti neapdoroto HTML šaltinio rodinį |
| `preview`       | Įjungti / išjungti HTML peržiūros režimą   |
| `fullscreen`    | Įjungti / išjungti viso ekrano redagavimo režimą |
| `formatClear`   | Išvalyti visą pažymėto teksto formatavimą  |
| `invisibleChar` | Įterpti nematomus simbolius (tarpus ir pan.) |

## Skirtukai {#separators}

Naudokite `|` kaip skirtuką tarp mygtukų grupių masyvo stiliaus savybėje `items`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Pilnas įrankių juostos pavyzdys {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
