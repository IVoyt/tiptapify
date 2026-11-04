# Tööriistariba üksused {#toolbar-items}

Kõik saadaolevad tööriistariba üksused sektsioonide kaupa.

## Toimingud {#actions}

| Üksus    | Kirjeldus                          |
|----------|------------------------------------|
| `undo`   | Võta viimane muudatus tagasi       |
| `redo`   | Tee viimati tagasivõetud muudatus uuesti |

## AI {#ai}

| Üksus | Kirjeldus                                      |
|------|------------------------------------------------|
| `ai` | Ava AI viiba dialoog, kui see on seadistatud   |

## Vorming {#format}

| Üksus       | Kirjeldus                 |
|-------------|---------------------------|
| `bold`      | Lülita paks tekst sisse/välja |
| `italic`    | Lülita kursiivtekst sisse/välja |
| `underline` | Lülita allakriipsutus sisse/välja |
| `strike`    | Lülita läbikriipsutus sisse/välja |

## Lisavorming {#format-extra}

| Üksus        | Kirjeldus                                      |
|--------------|------------------------------------------------|
| `sup`        | Lülita ülaindeks sisse/välja                   |
| `sub`        | Lülita alaindeks sisse/välja                   |
| `code`       | Lülita reasisene kood sisse/välja              |
| `codeBlock`  | Lisa süntaksi esiletõstuga koodiplokk          |
| `blockquote` | Lisa tsitaat                                   |

## Stiil {#style}

| Üksus            | Kirjeldus                                  |
|------------------|--------------------------------------------|
| `heading`        | Rippmenüü pealkirjataseme valimiseks (H1-H6) |
| `fontFamily`     | Rippmenüü fondiperekonna valimiseks        |
| `fontSize`       | Rippmenüü fondisuuruse valimiseks          |
| `lineHeight`     | Määra reakõrgus                            |
| `textColor`      | Tekstivärv: palett, hiljutised värvid, HEX, pipett, kohandatud valija |
| `highlightColor` | Esiletõstuvärv: sama valija, esimesena „Ilma esiletõstuta“ |

Üksus `heading` aktsepteerib pärast koolonit valikuid: pealkirjatasemeid, `p` lõigu üksuse lisamiseks ja `inline`, et näidata neid rippmenüü asemel eraldi nuppudena:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Joondus {#alignment}

| Üksus     | Kirjeldus              |
|-----------|------------------------|
| `left`    | Joonda tekst vasakule  |
| `center`  | Joonda tekst keskele   |
| `right`   | Joonda tekst paremale  |
| `justify` | Joonda tekst rööpselt  |
| `align`   | Joonduse rippmenüü; `align:left,center,right` piirab selle valikuid |

## Loend {#list}

| Üksus          | Kirjeldus                          |
|----------------|------------------------------------|
| `bulletList`   | Lülita täpploend sisse/välja       |
| `orderedList`  | Lülita nummerdatud loend sisse/välja |
| `taskList`     | Lülita ülesandeloend (märkeruudud) sisse/välja |
| `indent`       | Suurenda praeguse ploki taanet     |
| `outdent`      | Vähenda praeguse ploki taanet      |

## Meedia {#media}

| Üksus     | Kirjeldus                         |
|-----------|-----------------------------------|
| `link`    | Lisa/muuda linki või [lingikaarti](/et/guide/link-cards) valikuga `linkPreview` |
| `image`   | Lisa/muuda pilti: URL-i või üleslaadimise kaudu, alt, pildiallkiri, suurus, asukoht |
| `video`   | Lisa/muuda YouTube'i, Vimeo või videofaili (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Manusta leht selle aadressi või iframe'i koodi järgi |
| `emoji`   | Ava emotikonide valija (10 kategooriat) |
| `charmap` | Ava erimärkide valija             |
| `table`   | Lisa tabel                        |

## Muu {#misc}

| Üksus           | Kirjeldus                                  |
|-----------------|--------------------------------------------|
| `line`          | Lisa horisontaaljoon                       |
| `pagebreak`     | Lisa lehevahetus                           |
| `source`        | Lülita toores HTML-lähtekoodi vaade sisse/välja |
| `preview`       | Lülita HTML-eelvaate režiim sisse/välja    |
| `fullscreen`    | Lülita täisekraani redigeerimisrežiim sisse/välja |
| `formatClear`   | Eemalda valikult kogu vormindus            |
| `invisibleChar` | Lisa nähtamatuid märke (tühikud jms)       |

## Eraldajad {#separators}

Kasuta massiivi stiilis propis `items` eraldajana nuppude rühmade vahel märki `|`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Täielik tööriistariba näide {#complete-toolbar-example}

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
