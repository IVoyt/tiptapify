# Slash команди {#slash-commands}

Slash командите предлагат меню за бързо вмъкване, което се появява, когато въведете `/` в началото на ред.

## Включване на slash командите {#enabling-slash-commands}

Slash командите са включени по подразбиране. За да ги управлявате изрично:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Демонстрация на slash команди..."
:slash-commands="true"
/>

## Налични команди {#available-commands}

Въведете `/` в редактора, за да видите палитрата с команди. Наличните команди включват:

| Команда         | Описание                           |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Вмъква заглавие (нива 1-6)         |
| `/bulletList`   | Вмъква списък с водещи символи     |
| `/numberedList` | Вмъква номериран списък            |
| `/taskList`     | Вмъква списък със задачи           |
| `/code`         | Вмъква код в реда                  |
| `/codeBlock`    | Вмъква блок с код                  |
| `/quote`        | Вмъква цитат                       |
| `/image`        | Вмъква изображение (отваря диалог за URL) |
| `/video`        | Вгражда YouTube видео              |
| `/table`        | Вмъква таблица                     |
| `/link`         | Вмъква хипервръзка                 |
| `/divider`      | Вмъква хоризонтална линия          |
| `/emoji`        | Отваря избора на емоджи            |
| `/specialChars` | Отваря специалните символи         |

## Как работи {#how-it-works}

1. Поставете курсора в началото на ред или след интервал
2. Въведете `/` — появява се палитрата с команди
3. Продължете да пишете, за да филтрирате командите
4. Натиснете `Enter` или щракнете, за да вмъкнете избраната команда

## Изключване на slash командите {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash команди с плаващо меню {#slash-commands-with-floating-menu}

Комбинирайте slash командите с плаващото меню за най-добро изживяване при редактиране:

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

- **Slash команди** (`/`) — задействат се с въвеждане на `/` в началото на ред
- **Плаващо меню** — появява се, когато поставите курсора на празен ред (предлага действия на ниво блок)
- **Bubble меню** — появява се, когато маркирате текст (предлага форматиране в реда)

## Филтриране на наличните команди {#filtering-available-commands}

Можете да зададете кои команди да се включат, като подадете масив с идентификатори на команди:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Налични идентификатори на команди {#available-command-ids}

| ID             | Описание             |
|----------------|----------------------|
| `h1` - `h6`    | Нива на заглавие 1-6 |
| `bulletList`   | Списък с водещи символи |
| `numberedList` | Номериран списък     |
| `taskList`     | Списък със задачи    |
| `code`         | Код в реда           |
| `codeBlock`    | Блок с код           |
| `quote`        | Цитат                |
| `image`        | Изображение          |
| `video`        | YouTube видео        |
| `table`        | Таблица              |
| `link`         | Линк                 |
| `divider`      | Хоризонтална линия   |
| `emoji`        | Емоджи               |
| `specialChars` | Специални символи    |
