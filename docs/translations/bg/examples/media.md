# Медия {#media}

## Изображения {#images}

Вмъкване на изображения от URL:

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

Бутонът за изображение отваря диалога за изображение:

- **От URL** или **Качване**. Без [крайна точка за качване](/bg/guide/uploads) избраният файл се вгражда като base64 data URL; с такава файлът отива на вашия сървър.
- **Алтернативен текст** (диалогът ви напомня, когато е празен) и **надпис** под изображението.
- **Размер**: оригинален, ширина на текста или собствена ширина × височина със заключване на пропорцията.
- **Позиция**: центрирано на собствен ред или плаващо вляво или вдясно от текста.

Избраното изображение има дръжки за преоразмеряване (всяко преоразмеряване е една стъпка за отмяна) и лента над него: плаване вляво или вдясно, изтегляне, редактиране, изтриване. Двойно щракване отваря диалога.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Видео {#videos}

Вграждане на видео от YouTube и Vimeo или на видеофайл:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Бутонът за видео отваря диалога за видео:

- **Линк към YouTube или Vimeo** се превръща в техния плейър; диалогът показва разпознатия доставчик и преглед, както и **Начало от** (попълва се от `?t=`), където плейърът го поддържа.
- **Линк към видеофайл** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) се превръща в `<video>` с корица, контроли, автоматично пускане (без звук) и повторение. Линкът трябва да има протокол (`https://`, `http://`), `//host` или `/path`: диалогът никога не налучква такъв.
- **Качване** изпраща видеофайл на вашия сървър; показва се само при [крайна точка за качване](/bg/guide/uploads).
- **Размер**: адаптивен 16:9 или собствена ширина × височина със заключване на пропорцията.

YouTube URL, поставен в текста, също се вгражда. Щракване върху плейъра го избира, вместо да го пусне, така че бутонът в лентата го показва; двойно щракване отваря диалога.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Поставете YouTube URL, за да вградите видео..." />

## Iframe-ове {#iframes}

Вградете страница по нейния адрес или по iframe кода от менюто ѝ „Споделяне“ или „Вграждане“:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Диалогът за iframe чете поставен код (адрес, размер, заглавие, разрешения, sandbox, отложено зареждане, цял екран) и казва какво е взел от него; код със скриптове или други тагове се отхвърля. Показва преглед и има **заглавие за екранни четци**, размер (адаптивен в пропорциите на кода или собствен със заключване на пропорцията), а под **Разширени** — името, `allow`, `sandbox`, отложено зареждане и рамка. Адресът трябва да започва с `https://` или `http://`. Двойно щракване върху вграждане отваря диалога.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Въведете URL за вграждане като iframe..." />

## Таблици {#tables}

Вмъкване и редактиране на таблици:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

След вмъкване на таблица можете да:
- Добавяте/премахвате редове и колони
- Избирате клетки
- Изтривате цялата таблица

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Използвайте бутона за таблица, за да вмъкнете таблица..." />

## Линкове {#links}

Вмъкване на хипервръзки:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Диалогът за линк приема адреса така, както е въведен: `https://…`, всяка друга схема (`ftp://`, `ssh://`, вътрешна), `mailto:`, `tel:`, `#anchor` или `/page`. Той никога не добавя протокол сам: адрес без такъв (`example.com`, `internal.host:8080`) получава чипове за добавяне на `https://`, `http://` или `ftp://` и остава както е въведен, ако не добавите нито един. Адреси с `javascript:`, `vbscript:` и `data:` се отхвърлят.

Диалогът има още текст на линка, **Отваряне в нов раздел** (което добавя `noopener noreferrer`), а под **Разширени** — стойностите на `rel` като чипове (всяка стойност: Enter, интервал или запетая я добавя) и CSS клас.

С пропъртито [`linkPreview`](/bg/api/props#linkpreview) същият диалог показва линка като карта с изображението, заглавието и описанието на страницата, а URL, поставен на празен ред, предлага **Линк / Карта** — вижте [Карти на линкове](/bg/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Маркирайте текст и щракнете върху линк, за да добавите хипервръзка..." />

## Емоджи {#emoji}

Вмъкване на емоджи от вградения избор с 10 категории:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Изборът на емоджи включва поле за търсене/филтриране, за да намерите бързо конкретно емоджи.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Щракнете върху бутона за емоджи, за да вмъкнете емоджи..." />

## Специални символи (Charmap) {#special-characters-charmap}

Вмъкване на специални символи, стрелки, гръцки букви, математически символи и други:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Категориите включват:
- Стрелки
- Валути
- Гръцки букви
- Математически символи
- Разни

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Щракнете върху charmap, за да вмъкнете специални символи..." />

## Комбиниране на медийни инструменти {#combining-media-tools}

Пълноценна медийна лента:

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
placeholder="Пълна медийна лента..." />
