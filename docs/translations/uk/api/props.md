# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Тип:** `String | Object`
- **За замовчуванням:** `''`

Початковий вміст редактора. Приймає HTML-рядок або JSON-об'єкт Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` — це лише **початковий** вміст; для двосторонньої прив'язки використовуйте `v-model` (див. `modelValue`).

### `modelValue` {#modelvalue}

- **Тип:** `String | Object`
- **За замовчуванням:** `''`

Значення для двосторонньої прив'язки `v-model`. Використовуйте `v-model`, щоб тримати реактивне значення синхронізованим з редактором. Після кожного редагування компонент емітує `update:modelValue` з останнім HTML, який `v-model` записує назад у ваш ref. Якщо використовується лише `v-model` (без `:content`), прив'язане значення є початковим вмістом редактора.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Тип:** `String`
- **За замовчуванням:** `''`

Текст-заповнювач, що показується, коли редактор порожній.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Тип:** `Number`
- **За замовчуванням:** `null`

Мінімальна висота області вмісту редактора в пікселях.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Показати або сховати панель інструментів.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Тип:** `Array<String> | Object`
- **За замовчуванням:** `[]`

Елементи панелі інструментів для показу. Передайте масив назв елементів або об'єкт з іменованими секціями. Див. [Елементи панелі інструментів](/uk/api/toolbar-items).
У масиві `'|'` розбиває елементи на групи (у цьому порядку, з яких би секцій не походили кнопки), а `'~'` відсуває елементи після нього в кінець панелі інструментів. За наявності груп назва, що не є вбудованим елементом, резервує місце для власної кнопки з такою назвою з `customExtensions`; якщо такої кнопки немає, місце відкидається.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Тип:** `Boolean`
- **За замовчуванням:** `false`

Коли `true`, проп `items` задає елементи, які треба **виключити**, а не включити.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Показувати bubble-меню, коли виділено текст: один рядок іконок-кнопок у групах — жирний, курсив, підкреслення, закреслення | верхній індекс, нижній індекс | виділення, inline-код | посилання | очищення форматування. Кожна кнопка має підказку зі скороченням і показується, коли її позначка є на виділенні. Меню ховається для виділеного блока (зображення, віджет), всередині коду та коли виділено весь документ.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Показувати плаваюче меню на порожніх рядках: заголовок 1, заголовок 2 і маркований список у тому самому рядку іконок-кнопок, що й bubble-меню.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Увімкнути меню slash-команд (введіть `/`, щоб викликати).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Показувати кількість слів у футері редактора.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Показувати кількість символів у футері редактора.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Тип:** `Number | null`
- **За замовчуванням:** `null`

Максимальна кількість символів, дозволена розширенням Tiptap `CharacterCount`. Задайте `null` або опустіть проп, щоб редагування було необмеженим. Якщо задано значення більше за `0`, футер показує SVG-індикатор круглого прогресу з кольоровими порогами.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Тип:** `String`
- **За замовчуванням:** `'purple'`

Колір круглого індикатора прогресу за замовчуванням, що показується у футері, коли задано `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Тип:** `String`
- **За замовчуванням:** `'orange'`

Колір індикатора прогресу, коли використання перевищує 75% ліміту.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Тип:** `String`
- **За замовчуванням:** `'red'`

Колір індикатора прогресу, коли ліміт символів досягнуто.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Тип:** `TiptapifyFooterAlignment`
- **За замовчуванням:** `'end'`

Вирівнювання елементів стану у футері. Приймає `'start'`, `'center'` або `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Тип:** `Boolean | TiptapifyAiOptions`
- **За замовчуванням:** `false`

Вмикає елемент панелі інструментів `ai`. Редактор будує OpenAI-сумісний запит `/v1/chat/completions` і передає його в `aiProvider`. Використовуйте колбек провайдера, щоб звернутися до вашого бекенду, BFF, endpoint із захистом OAuth, LM Studio або обгортки SDK.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Приклад із локальним LLM LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Потоковий вивід підтримується встановленням `stream: true` і передаванням токенів через аргумент `stream` в `aiProvider`. Поле результату в діалозі AI оновлюється наживо, поки надходять чанки, а кнопка **Зупинити** скасовує запит, що виконується:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Передайте `stream.signal` у `fetch` (або виклик вашого SDK), щоб запит скасовувався, коли користувач клацає **Зупинити** або закриває діалог. Частково отриманий вміст лишається в полі результату й може бути застосований або відкинутий. Провайдери, що не підтримують потокову передачу, можуть повністю ігнорувати аргумент `stream` — він необов'язковий і сумісний зі старим кодом.

Моделі з міркуваннями (Qwen thinking, DeepSeek, o-series) передають свої «думки» окремою дельтою `reasoning_content`. Перенаправляйте ці чанки через `stream.onReasoning()` — коли `showReasoning: true`, діалог рендерить їх у згортній панелі **Роздумування** над полем результату (за замовчуванням панель прихована). Вивід міркувань призначений лише для показу й ніколи не вставляється в редактор.

Щоб дати користувачеві змогу перемикати режим роздумування моделі для кожного запиту, задайте `thinking: true` у параметрах AI. Тоді діалог показує перемикач **Роздумування** (за замовчуванням увімкнений, скидається при кожному відкритті); плагін записує значення перемикача в запит як `enable_thinking: true | false`, тож вам більше не потрібно (і не слід) задавати `enable_thinking` самостійно в `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Коли `thinking` дорівнює `false` або пропущений, перемикач не показується, а плагін надсилає `enable_thinking: false`, тож моделі, що за замовчуванням розмірковують (Qwen3, DeepSeek, …), не розмірковують.

Щоб дати користувачеві змогу вибирати рівень роздумів для кожного запиту, задайте `reasoningEffort` у параметрах AI. Тоді діалог показує випадний список **Рівень роздумів**, заповнений з `options` — власних рівнів зусиль (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Розширення завжди саме додає до списку елемент `default` (базовий рівень режиму роздумування), тож `default` у конфігурації ніколи не перелічуйте; поле `default` параметра попередньо вибирає один із ваших власних рівнів при відкритті діалогу (інакше попередньо вибирається `default`), а значення скидається при кожному відкритті.
Вибране значення визначає, що плагін запише в запит: `default` зберігає режим роздумування — перемикач **Роздумування** лишається активним і керує `enable_thinking`; будь-яке інше значення надсилається натомість як `reasoning_effort`, а перемикач Роздумування вимикається, поки вибрано це значення (провайдери відхиляють `enable_thinking` і `reasoning_effort` в одному запиті).
Випадний список показується лише тоді, коли `thinking` увімкнено і перемикач Роздумування ввімкнений — вимкнення роздумування ховає його, а `reasoning_effort` не надсилається (запит повертається до `enable_thinking: false`). Коли `options` відсутній або порожній, список не рендериться взагалі:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

Панель **Роздумування** за замовчуванням прихована (`showReasoning` за замовчуванням дорівнює `false`). Задайте `showReasoning: true`, щоб показати згортну панель, що потоком виводить процес міркувань моделі (дельта `reasoning_content`), лишаючи роздумування ввімкненим — модель усе одно розмірковує, результат застосовується так само, лише додатково відображаються покрокові міркування:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Власні приклади запитів замінюють локалізовані значення за замовчуванням:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` і `storage` — необов'язкові хуки на стороні споживача для прямих браузерних інтеграцій. API-ключі чи токени провайдера в коді браузера або у сховищі браузера видимі користувачам і не повинні вважатися секретами. Для продакшн-секретів віддавайте перевагу описаному вище шаблону бекенд-адаптера.

Використовуйте `mode: 'insert' | 'replace' | 'append'`, щоб попередньо вибрати режим вставлення на кнопці дії діалогу (**Вставити** / **Замінити виділене** / **Додати в кінець**). Без `mode` кнопка за замовчуванням має **Замінити виділене**, якщо при відкритті діалогу текст виділено, і **Вставити** в іншому разі. Кнопка дії є розділеною: основна частина застосовує результат у попередньо вибраному режимі, а маленька секція «більше» (⋮) праворуч відкриває меню з рештою режимів — клацання по одному одразу застосовує результат у цьому режимі.

Коли в редактора є `limit` (ліміт кількості символів), під полем результату одразу після генерації показується лічильник символів `generated / limit` (оновлюється наживо під час потоку й м'яко червоніє, коли ліміт буде перевищено).
Діалог також показує попередження `ai.limit_exceeded` одразу після генерації, якщо вивід AI перевищить ліміт.
У цьому стані кнопка **Вставити** та її меню альтернативних режимів вимкнені — розширення `CharacterCount` відхиляє будь-яке вставлення, що збільшило б документ понад ліміт, тож результат застосовується повністю або не застосовується взагалі: він вставляється цілком, якщо вміщається, або не вставляється зовсім, якщо перевищує ліміт.
Скоротіть результат, щоб знову увімкнути дію:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Використовуйте `systemPrompt`, `temperature`, `chatCompletionOptions` або `createMessages(context)`, щоб налаштувати OpenAI-сумісний запит chat-completions. `context` містить `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` — це текст абзацу виділення навколо нього (до 500 символів у кожному, порожні без виділення) — надсилайте їх разом із виділенням, інакше модель сприйме фрагмент за весь текст і допише його.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Тип:** `String`
- **За замовчуванням:** `undefined`

Альтернатива власному `aiProvider`: спрямуйте AI-функцію на бекенд-endpoint LLM, і tiptapify сам будує та надсилає запит. Бекенд отримує мінімальний JSON-payload:

- **Завжди:** `prompt` (запит, введений у діалозі) та `instruction` (ваш `systemPrompt`, системне повідомлення власного `createMessages` або вбудований типовий).
- **Необов'язково, надсилається лише коли задано:** `stream` (лише `true`), `thinking` (перемикач **Роздумування** в діалозі, лише `true`), `reasoning_effort` (вибраний рівень) і `model`.

Відповідь приймається поблажливо: звичайний рядок, об'єкт `{ content }` або OpenAI-сумісний payload `choices`. Коли запит має `stream: true`, тіло відповіді читається як потік SSE (рядки `data:`, завершені `data: [DONE]`): приймаються дельти у стилі OpenAI (`choices[0].delta.content` / `.reasoning_content`), простий чанк `{ type: 'content' | 'reasoning', data }`, плаский чанк `{ content, reasoning_content }` та рядки `data` із простим текстом. Якщо бекенд ігнорує `stream` і відповідає звичайним тілом, використовується це тіло. Відповідь не-OK показує в діалозі повідомлення про помилку бекенду (JSON `{ error }` / `{ message }` або необроблене тіло). Кнопка **Зупинити** та закриття діалогу перериває запит, що виконується; частково отриманий вміст зберігається в полі результату.

Якщо задано і `aiProvider`, і `aiEndpoint`, перемагає `aiProvider`.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Тип:** `Record<string, string>`
- **За замовчуванням:** `undefined`

Додаткові заголовки, що надсилаються із запитом `aiEndpoint`, злиті поверх `Content-Type: application/json`. Заголовок `Authorization`, заданий тут, зберігається як є; інакше токен із `tokenProvider` (якщо задано) надсилається як `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Тип:** `String`
- **За замовчуванням:** `'Inter'`

Гарнітура шрифту за замовчуванням для вмісту редактора.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Тип:** `String`
- **За замовчуванням:** `'px'`

Одиниця виміру для значень розміру шрифту.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Тип:** `String`
- **За замовчуванням:** `'0'`

Радіус рамки контейнера редактора. Приймає значення радіусів Vuetify (`sm`, `md`, `lg`, `xl`, `pill` тощо).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Тип:** `variantBtnTypes`
- **За замовчуванням:** `'tonal'`

Варіант кнопок Vuetify для кнопок панелі інструментів. Значення спільне для кожного компонента панелі інструментів через конфігурацію редактора — власні компоненти можуть читати його за допомогою [`useTiptapifyConfig`](/uk/api/types#usetiptapifyconfig). Див. [`variantBtnTypes`](/uk/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Тип:** `variantFieldTypes`
- **За замовчуванням:** `'outlined'`

Варіант Vuetify для випадних полів панелі інструментів. Значення спільне для кожного компонента панелі інструментів через конфігурацію редактора — власні компоненти можуть читати його за допомогою [`useTiptapifyConfig`](/uk/api/types#usetiptapifyconfig). Див. [`variantFieldTypes`](/uk/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Тип:** `Array<toolbarSections>`
- **За замовчуванням:** `[]`

Надайте власні секції панелі інструментів, щоб розширити її або додати елементи. Компоненти кожної секції можуть читати спільну конфігурацію редактора за допомогою [`useTiptapifyConfig`](/uk/api/types#usetiptapifyconfig). Див. [Власна панель інструментів](/uk/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Тип:** `Boolean`
- **За замовчуванням:** `true`

Увімкнути інтерактивне застосування стилів.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Тип:** `Boolean`
- **За замовчуванням:** `false`

Показувати індикатор невизначеного прогресу, поки редактор завантажується.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Тип:** `String`
- **За замовчуванням:** `'default'`

Колір індикатора прогресу завантаження. Приймає значення кольорів теми Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Тип:** `String`
- **За замовчуванням:** `'1px'`

Висота індикатора прогресу завантаження.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Тип:** `Number`
- **За замовчуванням:** `0`

Починаючи з такої кількості зображень поспіль (без нічого між ними) редактор розкладає їх у нумеровану сітку з трьох колонок — для сайтів, що показують такі зображення як слайдер. `0` вимикає це.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Тип:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/uk/api/types#tiptapifyskininput))
- **За замовчуванням:** `'default'`

Вигляд оболонки редактора: панелі інструментів, bubble-меню, випадних списків, діалогів, футера.

- `default` — класичний вигляд: піднятий тулбар, групи кнопок як підняті блоки, кнопки Vuetify з основним кольором для натиснутого стану.
- `pastel` — тихий вигляд: плаский тонований тулбар під тонкою лінією, «примарні» кнопки з нейтральним натиснутим станом, легкі випадні списки, м'які діалоги.

Функції (підписи до зображень, слайдери, випадний список вирівнювання, стилі списків) працюють однаково в обох скінах.

```vue
<Tiptapify skin="pastel" />
```

Можна також передати inline-об'єкт скіну: перевизначення токенів (`colors` / `metrics`) і прапорці форми, за потреби з `extends` на зареєстрований скін. Він розв'язується поверх `default` (або своєї бази), рендериться з класом `tiptapify-skin-inline` (`tiptapify-skin-{name}`, якщо в об'єкта є `name`), а його токени потрапляють як CSS-змінні `--tf-*` на корінь редактора. Власні назви надходять з `registerSkin('mint', { … })` — таблицю токенів і рецепти дивіться в [посібнику зі скінів](/uk/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/uk/api/types#tiptapifyuploadoptions))
- **За замовчуванням:** `null`

Endpoint [завантаження файлів](/uk/guide/uploads): файли, вибрані в діалогах зображень і відео (а також постер відео та зображення картки посилання), надсилаються на нього через `POST {endpoint}` (multipart `file` і `kind`), а документ зберігає URL, який він повертає (`{ "url": … }`).

Без нього діалог зображення все одно приймає файл: вибране зображення (і постер відео) вбудовується в документ як base64 data URL, а base64-зображення зберігаються під час завантаження документа. Діалог відео пропонує **Завантажити** лише з цим пропом. Коли задано `upload`, base64-зображення відкидаються під час завантаження документа.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Тип:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/uk/api/types#tiptapifycontentstyles))
- **Типово:** `'inline'`

Як збережений HTML передає вигляд карток-посилань, зображень із підписами, відео, вбудовувань і списків завдань (див. [Стилі вмісту](/uk/guide/content-styles)): `inline` записує його в атрибути `style` цих елементів, тож сайт показує HTML як є; `classes` залишає лише класи, для сайту, що підключає `tiptapify/content.css`. Редактор ігнорує ці стилі під час завантаження HTML, тому обидва види HTML завантажуються однаково.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/uk/api/types#tiptapifylinkpreviewoptions))
- **За замовчуванням:** `null`

Бекенд-endpoint [карток посилань](/uk/guide/link-cards): він читає дані OpenGraph сторінок, чого браузер зробити не може (CORS). Редактор перевіряє його handshake'ом під час запуску (`GET {endpoint}` має відповісти `200 { "tiptapifyLinkPreview": 1 }`); доки він не відповість, жодної картки ніщо не пропонує.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Події {#events}

### `editor-ready` {#editor-ready}

Викликається, коли екземпляр редактора готовий.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Викликається, коли вміст редактора змінюється.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Підтримує прив'язку `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

Екземпляр редактора та функція `t` доступні через provide/inject Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
