# Položky lišty nástrojov {#toolbar-items}

Všetky dostupné položky lišty nástrojov usporiadané podľa sekcií.

## Akcie {#actions}

| Položka  | Popis                       |
|----------|-----------------------------|
| `undo`   | Vráti poslednú zmenu        |
| `redo`   | Zopakuje naposledy vrátenú zmenu |
| `resetChanges` | Zahodí všetky zmeny od otvorenia editora a vymaže históriu (najprv sa opýta) |

## AI {#ai}

| Položka | Popis                                     |
|---------|-------------------------------------------|
| `ai`    | Otvorí dialóg s promptom AI, ak je nakonfigurovaný |

## Formát {#format}

| Položka     | Popis                    |
|-------------|--------------------------|
| `bold`      | Prepne tučný text        |
| `italic`    | Prepne text v kurzíve    |
| `underline` | Prepne podčiarknutie     |
| `strike`    | Prepne prečiarknutie     |

## Rozšírený formát {#format-extra}

| Položka      | Popis                                          |
|--------------|------------------------------------------------|
| `sup`        | Prepne horný index                             |
| `sub`        | Prepne dolný index                             |
| `code`       | Prepne inline kód                              |
| `codeBlock`  | Vloží blok kódu so zvýrazňovaním syntaxe       |
| `blockquote` | Vloží citáciu                                  |

## Štýl {#style}

| Položka          | Popis                                      |
|------------------|--------------------------------------------|
| `heading`        | Rozbaľovacia ponuka na výber úrovne nadpisu (H1-H6) |
| `fontFamily`     | Rozbaľovacia ponuka na výber rodiny písma  |
| `fontSize`       | Rozbaľovacia ponuka na výber veľkosti písma |
| `lineHeight`     | Nastaví výšku riadka                       |
| `textColor`      | Farba textu: paleta, nedávne farby, HEX, pipeta, vlastný výber |
| `highlightColor` | Farba zvýraznenia: rovnaký výber, na prvom mieste „Bez zvýraznenia“ |

Položka `heading` prijíma voľby za dvojbodkou: úrovne nadpisov, `p` na pridanie položky odseku a `inline` na zobrazenie ako samostatných tlačidiel namiesto rozbaľovacej ponuky:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Zarovnanie {#alignment}

| Položka   | Popis             |
|-----------|-------------------|
| `left`    | Zarovná text doľava |
| `center`  | Zarovná text na stred |
| `right`   | Zarovná text doprava |
| `justify` | Zarovná text do bloku |
| `align`   | Rozbaľovacia ponuka zarovnania; `align:left,center,right` obmedzí jej možnosti |

## Zoznam {#list}

| Položka        | Popis                         |
|----------------|-------------------------------|
| `bulletList`   | Prepne odrážkový zoznam       |
| `orderedList`  | Prepne číslovaný zoznam       |
| `taskList`     | Prepne úlohový zoznam (zaškrtávacie polia) |
| `indent`       | Zvýši odsadenie aktuálneho bloku |
| `outdent`      | Zníži odsadenie aktuálneho bloku |

## Médiá {#media}

| Položka   | Popis                             |
|-----------|-----------------------------------|
| `link`    | Vloží alebo upraví odkaz, prípadne [kartu odkazu](/sk/guide/link-cards) s `linkPreview` |
| `image`   | Vloží alebo upraví obrázok: cez URL alebo nahratím, alt, popis, veľkosť, umiestnenie |
| `video`   | Vloží alebo upraví YouTube, Vimeo alebo videosúbor (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Vloží stránku podľa jej adresy alebo kódu iframe |
| `emoji`   | Otvorí výber emoji (10 kategórií) |
| `charmap` | Otvorí výber špeciálnych znakov   |
| `table`   | Vloží tabuľku                     |

## Rôzne {#misc}

| Položka         | Popis                                      |
|-----------------|--------------------------------------------|
| `line`          | Vloží vodorovnú čiaru                      |
| `pagebreak`     | Vloží zlom strany                          |
| `source`        | Prepne zobrazenie zdrojového HTML          |
| `preview`       | Prepne režim náhľadu HTML                  |
| `fullscreen`    | Prepne režim úprav na celej obrazovke      |
| `formatClear`   | Odstráni všetko formátovanie z výberu      |
| `invisibleChar` | Vloží neviditeľné znaky (medzery a pod.)   |

## Oddeľovače {#separators}

Ako oddeľovač medzi skupinami tlačidiel v prope `items` zadanom ako pole použite `|`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Úplný príklad lišty nástrojov {#complete-toolbar-example}

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
