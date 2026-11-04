# Slash-команди {#slash-commands}

Slash-команди дають меню швидкої вставки, яке з'являється, коли ввести `/` на початку рядка.

## Увімкнення slash-команд {#enabling-slash-commands}

Slash-команди увімкнені за замовчуванням. Щоб керувати ними явно:

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

## Доступні команди {#available-commands}

Введіть `/` в редакторі, щоб побачити палітру команд. Серед доступних команд:

| Команда         | Опис                                    |
|-----------------|-----------------------------------------|
| `/h1` - `/h6`   | Вставити заголовок (рівні 1-6)          |
| `/bulletList`   | Вставити маркований список              |
| `/numberedList` | Вставити нумерований список             |
| `/taskList`     | Вставити список завдань                 |
| `/code`         | Вставити inline-код                     |
| `/codeBlock`    | Вставити блок коду                      |
| `/quote`        | Вставити цитату                         |
| `/image`        | Вставити зображення (відкриває діалог URL) |
| `/video`        | Вбудувати відео з YouTube               |
| `/table`        | Вставити таблицю                        |
| `/link`         | Вставити гіперпосилання                 |
| `/divider`      | Вставити горизонтальну лінію            |
| `/emoji`        | Відкрити вибір емодзі                   |
| `/specialChars` | Відкрити спеціальні символи             |

## Як це працює {#how-it-works}

1. Розмістіть курсор на початку рядка або після пробілу
2. Введіть `/` — з'явиться палітра команд
3. Продовжуйте вводити текст, щоб відфільтрувати команди
4. Натисніть `Enter` або клацніть, щоб вставити вибрану команду

## Вимкнення slash-команд {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash-команди з плаваючим меню {#slash-commands-with-floating-menu}

Поєднайте slash-команди з плаваючим меню для найзручнішого редагування:

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

- **Slash-команди** (`/`) — викликаються введенням `/` на початку рядка
- **Плаваюче меню** — з'являється, коли курсор стоїть на порожньому рядку (пропонує дії рівня блоків)
- **Bubble-меню** — з'являється, коли виділено текст (пропонує inline-форматування)

## Фільтрація доступних команд {#filtering-available-commands}

Можна вказати, які команди включити, передавши масив ідентифікаторів команд:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Доступні ідентифікатори команд {#available-command-ids}

| ID             | Опис                 |
|----------------|----------------------|
| `h1` - `h6`    | Заголовки рівнів 1-6 |
| `bulletList`   | Маркований список    |
| `numberedList` | Нумерований список   |
| `taskList`     | Список завдань       |
| `code`         | Inline-код           |
| `codeBlock`    | Блок коду            |
| `quote`        | Цитата               |
| `image`        | Зображення           |
| `video`        | Відео з YouTube      |
| `table`        | Таблиця              |
| `link`         | Посилання            |
| `divider`      | Горизонтальна лінія  |
| `emoji`        | Емодзі               |
| `specialChars` | Спеціальні символи   |
