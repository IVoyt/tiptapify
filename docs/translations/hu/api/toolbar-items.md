# Eszköztárelemek {#toolbar-items}

Az összes elérhető eszköztárelem szakaszok szerint rendezve.

## Műveletek {#actions}

| Elem     | Leírás                      |
|----------|-----------------------------|
| `undo`   | Az utolsó módosítás visszavonása |
| `redo`   | Az utoljára visszavont módosítás újra végrehajtása |
| `resetChanges` | A szerkesztő megnyitása óta végzett összes változtatás elvetése és az előzmények törlése (előbb rákérdez) |

## AI {#ai}

| Elem | Leírás                                   |
|------|------------------------------------------|
| `ai` | Megnyitja az AI-prompt párbeszédablakot, ha be van állítva |

## Formázás {#format}

| Elem        | Leírás               |
|-------------|----------------------|
| `bold`      | Félkövér szöveg be/ki |
| `italic`    | Dőlt szöveg be/ki    |
| `underline` | Aláhúzás be/ki       |
| `strike`    | Áthúzás be/ki        |

## További formázás {#format-extra}

| Elem         | Leírás                                       |
|--------------|----------------------------------------------|
| `sup`        | Felső index be/ki                            |
| `sub`        | Alsó index be/ki                             |
| `code`       | Beágyazott kód be/ki                         |
| `codeBlock`  | Kódblokk beszúrása szintaxiskiemeléssel      |
| `blockquote` | Idézetblokk beszúrása                        |

## Stílus {#style}

| Elem             | Leírás                                     |
|------------------|--------------------------------------------|
| `heading`        | Legördülő menü a címsorszint kiválasztásához (H1-H6) |
| `fontFamily`     | Legördülő menü a betűcsalád kiválasztásához |
| `fontSize`       | Legördülő menü a betűméret kiválasztásához |
| `lineHeight`     | Sormagasság beállítása                     |
| `textColor`      | Szövegszín: paletta, legutóbbi színek, HEX, színszedő, egyéni választó |
| `highlightColor` | Kiemelőszín: ugyanaz a választó, elöl a „Nincs kiemelés” |

A `heading` elem kettőspont után opciókat fogad: címsorszinteket, a `p`-t bekezdéselem hozzáadásához, és az `inline`-t, amely a legördülő menü helyett külön gombokként jeleníti meg őket:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Igazítás {#alignment}

| Elem      | Leírás            |
|-----------|-------------------|
| `left`    | Balra igazítás    |
| `center`  | Középre igazítás  |
| `right`   | Jobbra igazítás   |
| `justify` | Sorkizárás        |
| `align`   | Igazítás legördülő menü; az `align:left,center,right` korlátozza a lehetőségeit |

## Lista {#list}

| Elem           | Leírás                        |
|----------------|-------------------------------|
| `bulletList`   | Felsorolás be/ki              |
| `orderedList`  | Számozott lista be/ki         |
| `taskList`     | Feladatlista (jelölőnégyzetek) be/ki |
| `indent`       | Az aktuális blokk behúzása    |
| `outdent`      | Az aktuális blokk behúzásának csökkentése |

## Média {#media}

| Elem      | Leírás                            |
|-----------|-----------------------------------|
| `link`    | Hivatkozás beszúrása/szerkesztése, vagy [hivatkozáskártya](/hu/guide/link-cards) a `linkPreview` esetén |
| `image`   | Kép beszúrása/szerkesztése: URL vagy feltöltés, helyettesítő szöveg, képaláírás, méret, elhelyezés |
| `video`   | YouTube, Vimeo vagy videófájl (`.mp4`, `.webm`, `.ogg`, `.mov`) beszúrása/szerkesztése |
| `iframe`  | Oldal beágyazása a címe vagy az iframe-kódja alapján |
| `emoji`   | Emojiválasztó megnyitása (10 kategória) |
| `charmap` | Speciális karakterek választójának megnyitása |
| `table`   | Táblázat beszúrása                |

## Egyéb {#misc}

| Elem            | Leírás                                     |
|-----------------|--------------------------------------------|
| `line`          | Vízszintes vonal beszúrása                 |
| `pagebreak`     | Oldaltörés beszúrása                       |
| `source`        | Nyers HTML-forrás nézet be/ki              |
| `preview`       | HTML-előnézeti mód be/ki                   |
| `fullscreen`    | Teljes képernyős szerkesztési mód be/ki    |
| `formatClear`   | A kijelölés összes formázásának törlése    |
| `invisibleChar` | Láthatatlan karakterek (szóközök stb.) beszúrása |

## Elválasztók {#separators}

A tömb stílusú `items` propban a `|` jelet használd elválasztóként a gombcsoportok között:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Teljes eszköztár példa {#complete-toolbar-example}

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
