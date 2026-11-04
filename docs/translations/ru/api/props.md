# Props {#props}

## Props компонента `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Тип:** `String | Object`
- **По умолчанию:** `''`

Начальное содержимое редактора. Принимает HTML-строку или объект Tiptap JSON.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` задаёт только **начальное** содержимое; для двусторонней привязки используйте `v-model` (см. `modelValue`).

### `modelValue` {#modelvalue}

- **Тип:** `String | Object`
- **По умолчанию:** `''`

Значение для двусторонней привязки через `v-model`. Используйте `v-model`, чтобы реактивное значение оставалось синхронизированным с редактором. При каждом изменении компонент генерирует `update:modelValue` с актуальным HTML, а `v-model` записывает его обратно в ваш ref. Если используется только `v-model` (без `:content`), связанное значение становится начальным содержимым редактора.

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
- **По умолчанию:** `''`

Текст-подсказка, который показывается, когда редактор пуст.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Тип:** `Number`
- **По умолчанию:** `null`

Минимальная высота области содержимого редактора в пикселях.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Показать или скрыть панель инструментов.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Тип:** `Array<String> | Object`
- **По умолчанию:** `[]`

Элементы панели инструментов для отображения. Передайте массив имён элементов или объект с именованными секциями. См. [Элементы панели инструментов](/ru/api/toolbar-items).
В массиве `'|'` разделяет элементы на группы (в указанном порядке, независимо от того, к каким секциям относятся кнопки), а `'~'` сдвигает следующие за ним элементы в конец панели инструментов. При наличии групп имя, не являющееся встроенным элементом, резервирует место для пользовательской кнопки с этим именем из `customExtensions`; если такой кнопки нет, место отбрасывается.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Тип:** `Boolean`
- **По умолчанию:** `false`

Если `true`, prop `items` задаёт элементы, которые нужно **исключить**, а не включить.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Показывать bubble-меню при выделении текста: один ряд кнопок-иконок, сгруппированных так — жирный, курсив, подчёркивание, зачёркивание | верхний индекс, нижний индекс | выделение цветом, встроенный код | ссылка | очистка форматирования. У каждой кнопки есть подсказка с сочетанием клавиш, и она подсвечивается, если соответствующая метка применена к выделению. Меню скрывается при выделенном блоке (изображение, виджет), внутри кода и когда выделен весь документ.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Показывать плавающее меню на пустых строках: заголовок 1, заголовок 2 и маркированный список — в том же ряду кнопок-иконок, что и bubble-меню.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Включить меню slash-команд (вызывается вводом `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Показывать количество слов в нижней панели редактора.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Показывать количество символов в нижней панели редактора.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Тип:** `Number | null`
- **По умолчанию:** `null`

Максимальное количество символов, допустимое расширением Tiptap `CharacterCount`. Задайте `null` или не указывайте prop, чтобы редактирование не ограничивалось. Если задано значение больше `0`, в нижней панели показывается круговой SVG-индикатор прогресса с цветовыми порогами.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Тип:** `String`
- **По умолчанию:** `'purple'`

Цвет по умолчанию кругового индикатора прогресса в нижней панели при заданном `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Тип:** `String`
- **По умолчанию:** `'orange'`

Цвет индикатора прогресса, когда использовано более 75% лимита.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Тип:** `String`
- **По умолчанию:** `'red'`

Цвет индикатора прогресса, когда лимит символов достигнут.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Тип:** `TiptapifyFooterAlignment`
- **По умолчанию:** `'end'`

Выравнивание элементов состояния в нижней панели. Принимает `'start'`, `'center'` или `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Тип:** `Boolean | TiptapifyAiOptions`
- **По умолчанию:** `false`

Включает элемент панели инструментов `ai`. Редактор формирует OpenAI-совместимый запрос `/v1/chat/completions` и передаёт его в `aiProvider`. Используйте колбэк провайдера, чтобы обратиться к вашему бэкенду, BFF, endpoint с OAuth-защитой, LM Studio или обёртке над SDK.

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

Пример с локальной LLM в LM Studio:

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

Потоковый вывод поддерживается: задайте `stream: true` и передавайте токены через аргумент `stream` у `aiProvider`. Поле результата в диалоге AI обновляется в реальном времени по мере поступления чанков, а кнопка **Остановить** отменяет выполняющийся запрос:

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

Передайте `stream.signal` в `fetch` (или в вызов вашего SDK), чтобы запрос отменялся, когда пользователь нажимает **Остановить** или закрывает диалог. Частично полученное содержимое остаётся в поле результата, его можно применить или отбросить. Провайдеры без потоковой передачи могут вообще игнорировать аргумент `stream` — он необязателен и обратно совместим.

Модели с рассуждениями (Qwen thinking, DeepSeek, o-series) передают свои «мысли» отдельной дельтой `reasoning_content`. Перенаправляйте эти чанки через `stream.onReasoning()` — при `showReasoning: true` диалог отображает их в сворачиваемой панели **Размышление** над полем результата (по умолчанию панель скрыта). Вывод рассуждений только отображается и никогда не вставляется в редактор.

Чтобы пользователь мог включать режим размышления модели для каждого запроса, задайте `thinking: true` в параметрах AI. Тогда диалог показывает переключатель **Размышление** (включён по умолчанию, сбрасывается при каждом открытии); плагин записывает значение переключателя в запрос как `enable_thinking: true | false`, поэтому вам больше не нужно (и не следует) задавать `enable_thinking` самостоятельно в `chatCompletionOptions`:

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

Если `thinking` равно `false` или не указан, переключатель не показывается, а плагин отправляет `enable_thinking: false`, поэтому модели, которые по умолчанию размышляют (Qwen3, DeepSeek, …), не размышляют.

Чтобы пользователь мог выбирать уровень рассуждения для каждого запроса, задайте `reasoningEffort` в параметрах AI. Тогда диалог показывает выпадающий список **Уровень размышления**, заполненный из `options` — пользовательских уровней (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Расширение всегда само добавляет в список пункт `default` (базовый уровень режима размышления), поэтому `default` в вашей конфигурации перечислять не нужно; поле `default` параметра предварительно выбирает один из ваших уровней при открытии диалога (иначе предварительно выбран `default`), а значение сбрасывается при каждом открытии.
Выбранное значение определяет, что плагин запишет в запрос: `default` сохраняет режим размышления — переключатель **Размышление** остаётся активным и управляет `enable_thinking`; любое другое значение отправляется как `reasoning_effort`, а переключатель Размышление при этом отключён (провайдеры отклоняют `enable_thinking` и `reasoning_effort` в одном запросе).
Список показывается, только если `thinking` включён и переключатель Размышление включён — выключение размышления скрывает его, и `reasoning_effort` не отправляется (запрос возвращается к `enable_thinking: false`). Если `options` отсутствует или пуст, список вообще не отображается:

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

Панель **Размышление** по умолчанию скрыта (`showReasoning` по умолчанию равно `false`). Задайте `showReasoning: true`, чтобы показывать сворачиваемую панель, в которую потоком выводится процесс рассуждения модели (дельта `reasoning_content`), не выключая размышление: модель по-прежнему рассуждает, результат применяется так же, лишь дополнительно отображаются пошаговые рассуждения:

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

Пользовательские примеры запросов заменяют локализованные значения по умолчанию:

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

`tokenProvider` и `storage` — необязательные хуки на стороне потребителя для прямых интеграций из браузера. API-ключи или токены провайдера, помещённые в браузерный код или хранилище браузера, видны пользователям и не должны считаться секретами. Для секретов в продакшене предпочитайте описанный выше паттерн с бэкенд-адаптером.

Используйте `mode: 'insert' | 'replace' | 'append'`, чтобы предварительно выбрать режим вставки на кнопке действия диалога (**Вставить** / **Заменить** / **Добавить в конец**). Без `mode` кнопка по умолчанию работает как **Заменить**, если при открытии диалога выделен текст, и как **Вставить** в остальных случаях. Кнопка действия — split-кнопка: основная часть применяет результат в предварительно выбранном режиме, а небольшая секция «ещё» (⋮) справа открывает меню с остальными режимами — щелчок по одному из них сразу применяет результат в этом режиме.

Если у редактора задан `limit` (лимит символов), под полем результата сразу после генерации показывается счётчик символов `generated / limit` (обновляется в реальном времени во время потоковой передачи и становится мягко-красным, когда лимит был бы превышен).
Диалог также показывает предупреждение `ai.limit_exceeded` сразу после генерации, если вывод AI превысит лимит.
В этом состоянии кнопка **Вставить** и меню её альтернативных режимов отключены — расширение `CharacterCount` отклоняет любую вставку, которая увеличила бы документ сверх лимита, поэтому результат применяется целиком или не применяется: он вставляется полностью, если помещается, и не вставляется совсем, если превышает лимит.
Сократите результат, чтобы снова включить действие:

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

Используйте `systemPrompt`, `temperature`, `chatCompletionOptions` или `createMessages(context)`, чтобы настроить OpenAI-совместимый запрос chat-completions. `context` содержит `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` — текст абзаца выделения вокруг него (до 500 символов с каждой стороны, пусто без выделения) — отправляйте их вместе с выделением, иначе модель примет фрагмент за весь текст и допишет его.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Тип:** `String`
- **По умолчанию:** `undefined`

Альтернатива пользовательскому `aiProvider`: направьте AI-функцию на endpoint LLM на вашем бэкенде, и tiptapify сам сформирует и отправит запрос. Бэкенд получает минимальный JSON-payload:

- **Всегда:** `prompt` (запрос, введённый в диалоге) и `instruction` (ваш `systemPrompt`, системное сообщение пользовательского `createMessages` или встроенное значение по умолчанию).
- **Необязательно, отправляется только если задано:** `stream` (только `true`), `thinking` (переключатель **Размышление** в диалоге, только `true`), `reasoning_effort` (выбранный уровень) и `model`.

Ответ принимается нестрого: обычная строка, объект `{ content }` или OpenAI-совместимый payload `choices`. Если в запросе `stream: true`, тело ответа читается как поток SSE (строки `data:`, завершается `data: [DONE]`): допускаются дельты в стиле OpenAI (`choices[0].delta.content` / `.reasoning_content`), простой чанк `{ type: 'content' | 'reasoning', data }`, плоский чанк `{ content, reasoning_content }` и строки `data` с обычным текстом. Если бэкенд игнорирует `stream` и отвечает обычным телом, используется это тело. Ответ с ошибочным статусом выводит в диалоге сообщение об ошибке бэкенда (JSON `{ error }` / `{ message }` или сырое тело). Кнопка **Остановить** и закрытие диалога прерывают выполняющийся запрос; частично полученное содержимое остаётся в поле результата.

Если заданы и `aiProvider`, и `aiEndpoint`, приоритет у `aiProvider`.

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
- **По умолчанию:** `undefined`

Дополнительные заголовки, отправляемые с запросом `aiEndpoint`; накладываются поверх `Content-Type: application/json`. Заголовок `Authorization`, заданный здесь, сохраняется как есть; иначе токен из `tokenProvider` (если задан) отправляется как `Authorization: Bearer <token>`.

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
- **По умолчанию:** `'Inter'`

Шрифт по умолчанию для содержимого редактора.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Тип:** `String`
- **По умолчанию:** `'px'`

Единица измерения значений размера шрифта.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Тип:** `String`
- **По умолчанию:** `'0'`

Радиус скругления контейнера редактора. Принимает значения радиуса Vuetify (`sm`, `md`, `lg`, `xl`, `pill` и т. д.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Тип:** `variantBtnTypes`
- **По умолчанию:** `'tonal'`

Вариант кнопок Vuetify для кнопок панели инструментов. Значение передаётся всем компонентам панели инструментов через конфигурацию редактора — пользовательские компоненты могут прочитать его с помощью [`useTiptapifyConfig`](/ru/api/types#usetiptapifyconfig). См. [`variantBtnTypes`](/ru/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Тип:** `variantFieldTypes`
- **По умолчанию:** `'outlined'`

Вариант Vuetify для выпадающих полей панели инструментов. Значение передаётся всем компонентам панели инструментов через конфигурацию редактора — пользовательские компоненты могут прочитать его с помощью [`useTiptapifyConfig`](/ru/api/types#usetiptapifyconfig). См. [`variantFieldTypes`](/ru/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Тип:** `Array<toolbarSections>`
- **По умолчанию:** `[]`

Задайте пользовательские секции панели инструментов, чтобы расширить её или добавить элементы. Компоненты каждой секции могут читать общую конфигурацию редактора с помощью [`useTiptapifyConfig`](/ru/api/types#usetiptapifyconfig). См. [Своя панель инструментов](/ru/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Тип:** `Boolean`
- **По умолчанию:** `true`

Включить интерактивное применение стилей.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Тип:** `Boolean`
- **По умолчанию:** `false`

Показывать неопределённый индикатор прогресса, пока редактор загружается.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Тип:** `String`
- **По умолчанию:** `'default'`

Цвет индикатора загрузки. Принимает значения цветов темы Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Тип:** `String`
- **По умолчанию:** `'1px'`

Высота индикатора загрузки.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Тип:** `Number`
- **По умолчанию:** `0`

Начиная с такого количества изображений подряд (без чего-либо между ними) редактор раскладывает их в нумерованную сетку из трёх колонок — для сайтов, которые показывают такие изображения как слайдер. `0` отключает это.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Тип:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/ru/api/types#tiptapifyskininput))
- **По умолчанию:** `'default'`

Внешний вид оболочки редактора: панель инструментов, bubble-меню, выпадающие списки, диалоги, нижняя панель.

- `default` — классический вид: приподнятая панель инструментов, группы кнопок как приподнятые блоки, кнопки Vuetify с основным цветом для нажатого состояния.
- `pastel` — спокойный вид: плоская тонированная панель инструментов под тонкой линией, «призрачные» кнопки с нейтральным нажатым состоянием, лёгкие выпадающие списки, мягкие диалоги.

Функциональность (подписи к изображениям, слайдеры, выпадающий список выравнивания, стили списков) одинакова в обоих скинах.

```vue
<Tiptapify skin="pastel" />
```

Можно также передать объект инлайн-скина: переопределения токенов (`colors` / `metrics`) и флаги формы, при необходимости с `extends` от зарегистрированного скина. Он разрешается поверх `default` (или своей основы), отображается с классом `tiptapify-skin-inline` (`tiptapify-skin-{name}`, если у объекта есть `name`), а его токены попадают в корневой элемент редактора как CSS-переменные `--tf-*`. Пользовательские имена появляются через `registerSkin('mint', { … })` — таблицу токенов и рецепты см. в [руководстве по скинам](/ru/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/ru/api/types#tiptapifyuploadoptions))
- **По умолчанию:** `null`

Endpoint для [загрузки файлов](/ru/guide/uploads): файлы, выбранные в диалогах изображения и видео (а также обложка видео и изображение карточки ссылки), отправляются на него через `POST {endpoint}` (multipart `file` и `kind`), а документ хранит URL, который он вернёт (`{ "url": … }`).

Без него диалог изображения всё равно принимает файл: выбранное изображение (и обложка видео) встраивается в документ как base64 data URL, а base64-изображения сохраняются при загрузке документа. Диалог видео предлагает **Загрузить** только при наличии этого prop. Если задан `upload`, base64-изображения удаляются при загрузке документа.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Тип:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/ru/api/types#tiptapifycontentstyles))
- **По умолчанию:** `'inline'`

Как сохранённый HTML несёт внешний вид карточек-ссылок, изображений с подписями, видео, встраиваний и списков задач (см. [Стили содержимого](/ru/guide/content-styles)): `inline` записывает его в атрибуты `style` этих элементов, так что сайт показывает HTML как есть; `classes` оставляет только классы, для сайта, который подключает `tiptapify/content.css`. Редактор игнорирует эти стили при загрузке HTML, поэтому оба вида HTML загружаются одинаково.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/ru/api/types#tiptapifylinkpreviewoptions))
- **По умолчанию:** `null`

Backend endpoint для [карточек ссылок](/ru/guide/link-cards): он читает данные OpenGraph страниц, что браузер сделать не может (CORS). Редактор проверяет его handshake при запуске (`GET {endpoint}` должен ответить `200 { "tiptapifyLinkPreview": 1 }`); пока он не ответит, карточка нигде не предлагается.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## События {#events}

### `editor-ready` {#editor-ready}

Срабатывает, когда экземпляр редактора готов.

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

Срабатывает при изменении содержимого редактора.

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

Поддерживает привязку `v-model`.

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

Экземпляр редактора и функция `t` доступны через provide/inject Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
