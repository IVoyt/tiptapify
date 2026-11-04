# Työkalurivin kohteet {#toolbar-items}

Kaikki käytettävissä olevat työkalurivin kohteet osioittain.

## Toiminnot {#actions}

| Kohde    | Kuvaus                      |
|----------|-----------------------------|
| `undo`   | Kumoa viimeisin muutos      |
| `redo`   | Tee uudelleen viimeksi kumottu muutos |
| `resetChanges` | Hylkää kaikki muutokset editorin avaamisen jälkeen ja tyhjentää historian (kysyy ensin) |

## AI {#ai}

| Kohde | Kuvaus                                   |
|------|------------------------------------------|
| `ai` | Avaa AI-kehotedialogin, jos se on määritetty |

## Muotoilu {#format}

| Kohde       | Kuvaus               |
|-------------|----------------------|
| `bold`      | Lihavoi tekstiä päälle/pois |
| `italic`    | Kursivoi tekstiä päälle/pois |
| `underline` | Alleviivaa päälle/pois |
| `strike`    | Yliviivaa päälle/pois |

## Lisämuotoilu {#format-extra}

| Kohde        | Kuvaus                                       |
|--------------|----------------------------------------------|
| `sup`        | Yläindeksi päälle/pois                       |
| `sub`        | Alaindeksi päälle/pois                       |
| `code`       | Koodi tekstin sekaan päälle/pois             |
| `codeBlock`  | Lisää koodilohko syntaksikorostuksella       |
| `blockquote` | Lisää lainaus                                |

## Tyyli {#style}

| Kohde            | Kuvaus                                     |
|------------------|--------------------------------------------|
| `heading`        | Pudotusvalikko otsikkotason valintaan (H1-H6) |
| `fontFamily`     | Pudotusvalikko fonttiperheen valintaan     |
| `fontSize`       | Pudotusvalikko fonttikoon valintaan        |
| `lineHeight`     | Aseta riviväli                             |
| `textColor`      | Tekstin väri: paletti, viimeisimmät värit, HEX, pipetti, oma valitsin |
| `highlightColor` | Korostusväri: sama valitsin, ensimmäisenä "Ei korostusta" |

`heading`-kohde hyväksyy asetuksia kaksoispisteen jälkeen: otsikkotasot, `p` kappalekohteen lisäämiseksi ja `inline` näyttämään ne erillisinä painikkeina pudotusvalikon sijaan:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Tasaus {#alignment}

| Kohde     | Kuvaus            |
|-----------|-------------------|
| `left`    | Tasaa teksti vasemmalle |
| `center`  | Keskitä teksti    |
| `right`   | Tasaa teksti oikealle |
| `justify` | Tasaa teksti molemmista reunoista |
| `align`   | Tasauksen pudotusvalikko; `align:left,center,right` rajaa sen vaihtoehdot |

## Luettelo {#list}

| Kohde          | Kuvaus                        |
|----------------|-------------------------------|
| `bulletList`   | Luettelo päälle/pois          |
| `orderedList`  | Numeroitu luettelo päälle/pois |
| `taskList`     | Tehtäväluettelo (valintaruudut) päälle/pois |
| `indent`       | Sisennä nykyistä lohkoa       |
| `outdent`      | Pienennä nykyisen lohkon sisennystä |

## Media {#media}

| Kohde     | Kuvaus                            |
|-----------|-----------------------------------|
| `link`    | Lisää/muokkaa linkkiä tai [linkkikorttia](/fi/guide/link-cards) `linkPreview`-asetuksella |
| `image`   | Lisää/muokkaa kuvaa: URL-osoitteella tai latauksella, vaihtoehtoinen teksti, kuvateksti, koko, sijainti |
| `video`   | Lisää/muokkaa YouTube-, Vimeo- tai videotiedostoa (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Upota sivu osoitteensa tai iframe-koodinsa avulla |
| `emoji`   | Avaa emojivalitsin (10 luokkaa)   |
| `charmap` | Avaa erikoismerkkien valitsin     |
| `table`   | Lisää taulukko                    |

## Muut {#misc}

| Kohde           | Kuvaus                                     |
|-----------------|--------------------------------------------|
| `line`          | Lisää vaakaviiva                           |
| `pagebreak`     | Lisää sivunvaihto                          |
| `source`        | HTML-lähdekoodinäkymä päälle/pois          |
| `preview`       | HTML-esikatselutila päälle/pois            |
| `fullscreen`    | Koko näytön muokkaustila päälle/pois       |
| `formatClear`   | Poista kaikki muotoilu valinnasta          |
| `invisibleChar` | Lisää näkymättömiä merkkejä (välilyöntejä jne.) |

## Erottimet {#separators}

Käytä `|`-merkkiä erottimena painikeryhmien välillä taulukkomuotoisessa `items`-propsissa:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Täydellinen työkalurivin esimerkki {#complete-toolbar-example}

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
