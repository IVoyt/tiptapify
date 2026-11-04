# Slash-команды {#slash-commands}

Slash-команды — это меню быстрой вставки, которое появляется, когда вы вводите `/` в начале строки.

## Включение slash-команд {#enabling-slash-commands}

Slash-команды включены по умолчанию. Чтобы управлять ими явно:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Демо slash-команд..."
:slash-commands="true"
/>

## Доступные команды {#available-commands}

Введите `/` в редакторе, чтобы увидеть палитру команд. Доступны, в частности, такие команды:

| Команда         | Описание                                  |
|-----------------|-------------------------------------------|
| `/h1` - `/h6`   | Вставить заголовок (уровни 1–6)           |
| `/bulletList`   | Вставить маркированный список             |
| `/numberedList` | Вставить нумерованный список              |
| `/taskList`     | Вставить список задач                     |
| `/code`         | Вставить встроенный код                   |
| `/codeBlock`    | Вставить блок кода                        |
| `/quote`        | Вставить цитату                           |
| `/image`        | Вставить изображение (откроет диалог URL) |
| `/video`        | Встроить видео с YouTube                  |
| `/table`        | Вставить таблицу                          |
| `/link`         | Вставить гиперссылку                      |
| `/divider`      | Вставить горизонтальную линию             |
| `/emoji`        | Открыть выбор эмодзи                      |
| `/specialChars` | Открыть специальные символы               |

## Как это работает {#how-it-works}

1. Поместите курсор в начало строки или после пробела
2. Введите `/` — появится палитра команд
3. Продолжайте вводить текст, чтобы отфильтровать команды
4. Нажмите `Enter` или щёлкните, чтобы вставить выбранную команду

## Отключение slash-команд {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash-команды с плавающим меню {#slash-commands-with-floating-menu}

Сочетайте slash-команды с плавающим меню для максимально удобного редактирования:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Slash-команды** (`/`) — вызываются вводом `/` в начале строки
- **Плавающее меню** — появляется, когда курсор стоит на пустой строке (предлагает действия уровня блока)
- **Bubble-меню** — появляется при выделении текста (предлагает встроенное форматирование)

## Фильтрация доступных команд {#filtering-available-commands}

Вы можете указать, какие команды включить, передав массив идентификаторов команд:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Доступные идентификаторы команд {#available-command-ids}

| ID             | Описание                    |
|----------------|-----------------------------|
| `h1` - `h6`    | Заголовки уровней 1–6       |
| `bulletList`   | Маркированный список        |
| `numberedList` | Нумерованный список         |
| `taskList`     | Список задач                |
| `code`         | Встроенный код              |
| `codeBlock`    | Блок кода                   |
| `quote`        | Цитата                      |
| `image`        | Изображение                 |
| `video`        | Видео с YouTube             |
| `table`        | Таблица                     |
| `link`         | Ссылка                      |
| `divider`      | Горизонтальная линия        |
| `emoji`        | Эмодзи                      |
| `specialChars` | Специальные символы         |
