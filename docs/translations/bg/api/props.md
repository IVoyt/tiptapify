# Пропъртита {#props}

## Пропъртита на `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Тип:** `String | Object`
- **По подразбиране:** `''`

Начално съдържание на редактора. Приема HTML низ или Tiptap JSON обект.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` е само **началното** съдържание; за двупосочна връзка използвайте `v-model` (вижте `modelValue`).

### `modelValue` {#modelvalue}

- **Тип:** `String | Object`
- **По подразбиране:** `''`

Стойност за двупосочна връзка с `v-model`. Използвайте `v-model`, за да държите реактивна стойност синхронизирана с редактора. При всяка промяна компонентът излъчва `update:modelValue` с последния HTML, който `v-model` записва обратно във вашия ref. Когато се използва само `v-model` (без `:content`), свързаната стойност е началното съдържание на редактора.

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
- **По подразбиране:** `''`

Текст на заместителя, показван, когато редакторът е празен.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Тип:** `Number`
- **По подразбиране:** `null`

Минимална височина на областта със съдържанието на редактора в пиксели.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Показване или скриване на лентата с инструменти.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Тип:** `Array<String> | Object`
- **По подразбиране:** `[]`

Елементи на лентата за показване. Подайте масив с имена на елементи или обект с именувани секции. Вижте [Елементи на лентата](/bg/api/toolbar-items).
В масив `'|'` разделя елементите на групи (в този ред, от каквито и секции да идват бутоните), а `'~'` избутва елементите след него в края на лентата. При групи име, което не е вграден елемент, запазва място за собствения бутон с това име от `customExtensions`; без такъв бутон мястото се премахва.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Тип:** `Boolean`
- **По подразбиране:** `false`

Когато е `true`, пропъртито `items` задава елементите, които да се **изключат**, а не да се включат.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Показва bubble менюто, когато текст е избран: един ред икони-бутони в групи — получер, курсив, подчертан, зачертан | горен индекс, долен индекс | маркиране, код в реда | линк | изчистване на форматирането. Всеки бутон има подсказка с клавишната си комбинация и се показва активен, когато неговият маркер е върху селекцията. Скрива се при избран блок (изображение, уиджет), в код и когато целият документ е избран.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Показва плаващото меню на празни редове: заглавие 1, заглавие 2 и списък с водещи символи, в същия ред от икони-бутони като bubble менюто.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Включва менюто със slash команди (въведете `/`, за да го отворите).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Показва броя думи в долния колонтитул на редактора.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Показва броя символи в долния колонтитул на редактора.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Тип:** `Number | null`
- **По подразбиране:** `null`

Максимален брой символи, позволен от разширението `CharacterCount` на Tiptap. Задайте `null` или пропуснете пропъртито, за да остане редактирането неограничено. Когато е зададена стойност, по-голяма от `0`, колонтитулът показва SVG кръгов индикатор за напредък с цветово кодирани прагове.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Тип:** `String`
- **По подразбиране:** `'purple'`

Цвят по подразбиране на кръговия индикатор за напредък в колонтитула, когато е зададен `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Тип:** `String`
- **По подразбиране:** `'orange'`

Цвят на индикатора за напредък, когато използването надхвърли 75% от лимита.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Тип:** `String`
- **По подразбиране:** `'red'`

Цвят на индикатора за напредък, когато лимитът на символите е достигнат.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Тип:** `TiptapifyFooterAlignment`
- **По подразбиране:** `'end'`

Подравняване на елементите на статуса в колонтитула. Приема `'start'`, `'center'` или `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Тип:** `Boolean | TiptapifyAiOptions`
- **По подразбиране:** `false`

Включва елемента `ai` на лентата. Редакторът изгражда OpenAI-съвместима заявка към `/v1/chat/completions` и я подава на `aiProvider`. Използвайте callback-а на доставчика, за да извикате вашия backend, BFF, защитена с OAuth крайна точка, LM Studio или SDK обвивка.

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

Пример с локален LLM в LM Studio:

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

Поточният изход се поддържа чрез задаване на `stream: true` и подаване на токените през аргумента `stream` на `aiProvider`. Полето с резултата в AI диалога се обновява на живо, докато пристигат частите, а бутонът **Спри** отменя заявката в процес:

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

Подайте `stream.signal` на `fetch` (или на извикването на вашия SDK), за да се отмени заявката, когато потребителят щракне **Спри** или затвори диалога. Частично получено съдържание остава в полето с резултата и може да бъде приложено или отхвърлено. Доставчици, които не предават поточно, могат изцяло да игнорират аргумента `stream` — той е незадължителен и обратно съвместим.

Моделите с разсъждение (Qwen thinking, DeepSeek, o-series) предават своите „мисли“ в отделна делта `reasoning_content`. Препращайте тези части през `stream.onReasoning()` — при `showReasoning: true` диалогът ги рендира в сгъваем панел **Мислене** над полето с резултата (панелът е скрит по подразбиране). Изходът от разсъжденията е само за показване и никога не се вмъква в редактора.

За да позволите на потребителя да превключва режима на мислене на модела за всяка заявка, задайте `thinking: true` в AI опциите. Диалогът тогава показва превключвател **Мислене** (включен по подразбиране, нулира се при всяко отваряне); плъгинът записва стойността на превключвателя в заявката като `enable_thinking: true | false`, така че вече не е нужно (и не бива) сами да задавате `enable_thinking` в `chatCompletionOptions`:

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

Когато `thinking` е `false` или е пропуснато, превключвателят не се показва и плъгинът изпраща `enable_thinking: false`, така че моделите, които мислят по подразбиране (Qwen3, DeepSeek, …), не мислят.

За да позволите на потребителя да избира нивото на разсъждение за всяка заявка, задайте `reasoningEffort` в AI опциите. Диалогът тогава показва падащо меню **Труд на разсъждения**, попълнено от `options` — собствени нива (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Разширението винаги само добавя елемент `default` в падащото меню (базовото ниво на режима на мислене), така че никога не изброявате `default` във вашата конфигурация; полето `default` на опцията предизбира едно от вашите собствени нива при отваряне на диалога (иначе е предизбран `default`), а стойността се нулира при всяко отваряне.
Избраната стойност решава какво плъгинът записва в заявката: `default` запазва режима на мислене — превключвателят **Мислене** остава активен и управлява `enable_thinking`; всяка друга стойност се изпраща вместо това като `reasoning_effort`, а превключвателят Мислене е деактивиран, докато е избрана тя (доставчиците отхвърлят `enable_thinking` и `reasoning_effort` в една заявка).
Падащото меню се показва само когато `thinking` е включено и превключвателят Мислене е включен — изключването на мисленето го скрива и `reasoning_effort` не се изпраща (заявката се връща към `enable_thinking: false`). Когато `options` липсва или е празен, падащото меню изобщо не се рендира:

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

Панелът **Мислене** е скрит по подразбиране (`showReasoning` е `false` по подразбиране). Задайте `showReasoning: true`, за да покажете сгъваем панел, който предава поточно процеса на разсъждение на модела (делтата `reasoning_content`), като мисленето остава включено — моделът пак разсъждава и резултатът се прилага по същия начин, само стъпка по стъпка разсъжденията се показват допълнително:

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

Собствени примери за промпти заменят локализираните стойности по подразбиране:

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

`tokenProvider` и `storage` са незадължителни hook-ове, притежавани от потребителя, за директна интеграция в браузъра. API ключове или токени на доставчика, поставени в код на браузъра или в хранилище на браузъра, са видими за потребителите и не бива да се считат за тайни. За продукционни тайни предпочитайте описания по-горе модел с backend адаптер.

Използвайте `mode: 'insert' | 'replace' | 'append'`, за да предизберете режима на вмъкване на бутона за действие в диалога (**Вмъкване** / **Замяна на избраното** / **Добавяне в края**). Без `mode` бутонът е по подразбиране **Замяна на избраното**, когато при отваряне на диалога има избран текст, и **Вмъкване** в противен случай. Бутонът за действие е split бутон: основната му част прилага резултата в предизбрания режим, а малка секция „още“ (⋮) вдясно отваря меню със списък на останалите режими — щракване върху един от тях прилага резултата веднага в този режим.

Когато редакторът има `limit` (лимит на символите), брояч `generated / limit` се показва под полето с резултата веднага щом бъде генериран резултат (обновява се на живо по време на поточното предаване и става мек червен, когато лимитът би бил надвишен).
Диалогът показва и предупреждението `ai.limit_exceeded` веднага след генерирането, ако изходът на AI би надвишил лимита.
В това състояние бутонът **Вмъкване** и менюто му с алтернативни режими са деактивирани — разширението `CharacterCount` отхвърля всяко вмъкване, което би увеличило документа над лимита, така че резултатът се прилага изцяло или никак: вмъква се напълно, когато се побира, или изобщо не се вмъква, когато надхвърля лимита.
Съкратете резултата, за да активирате отново действието:

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

Използвайте `systemPrompt`, `temperature`, `chatCompletionOptions` или `createMessages(context)`, за да настроите OpenAI-съвместимата chat-completions заявка. `context` съдържа `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` са текстът на абзаца на селекцията около нея (до 500 символа от всяка страна, празни без селекция) — изпращайте ги заедно със селекцията, иначе моделът взема фрагмента за целия текст и го допълва.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Тип:** `String`
- **По подразбиране:** `undefined`

Алтернатива на собствен `aiProvider`: насочете AI функцията към backend LLM крайна точка и tiptapify сам изгражда и изпраща заявката. Backend получава минимален JSON payload:

- **Винаги:** `prompt` (заявката, въведена в диалога) и `instruction` (вашият `systemPrompt`, системното съобщение на собствен `createMessages` или вграденият по подразбиране).
- **По избор, изпраща се само когато е зададено:** `stream` (само `true`), `thinking` (превключвателят **Мислене** в диалога, само `true`), `reasoning_effort` (избраното ниво на разсъждение) и `model`.

Отговорът се приема свободно: обикновен низ, обект `{ content }` или OpenAI-съвместим payload с `choices`. Когато заявката има `stream: true`, тялото на отговора се чете като SSE поток (редове `data:`, завършващи с `data: [DONE]`): приемат се делти в стил OpenAI (`choices[0].delta.content` / `.reasoning_content`), опростена част `{ type: 'content' | 'reasoning', data }`, плоска част `{ content, reasoning_content }` и редове `data` с обикновен текст. Ако backend игнорира `stream` и отговаря с обикновено тяло, използва се то. Отговор, който не е OK, показва в диалога съобщението за грешка на backend (JSON `{ error }` / `{ message }` или суровото тяло). Бутонът **Спри** и затварянето на диалога прекъсват заявката в процес; частично получено съдържание се запазва в полето с резултата.

Ако са зададени и `aiProvider`, и `aiEndpoint`, `aiProvider` има предимство.

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
- **По подразбиране:** `undefined`

Допълнителни хедъри, изпращани със заявката към `aiEndpoint`, слети върху `Content-Type: application/json`. Хедърът `Authorization`, зададен тук, се запазва както е; иначе токен от `tokenProvider` (когато е зададен) се изпраща като `Authorization: Bearer <token>`.

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
- **По подразбиране:** `'Inter'`

Шрифт по подразбиране за съдържанието на редактора.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Тип:** `String`
- **По подразбиране:** `'px'`

Мерна единица за стойностите на размера на шрифта.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Тип:** `String`
- **По подразбиране:** `'0'`

Радиус на рамката на контейнера на редактора. Приема стойностите за радиус на Vuetify (`sm`, `md`, `lg`, `xl`, `pill` и др.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Тип:** `variantBtnTypes`
- **По подразбиране:** `'tonal'`

Вариант на бутоните на Vuetify за бутоните в лентата. Стойността се споделя с всеки компонент на лентата чрез конфигурацията на редактора — собствените компоненти могат да я четат с [`useTiptapifyConfig`](/bg/api/types#usetiptapifyconfig). Вижте [`variantBtnTypes`](/bg/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Тип:** `variantFieldTypes`
- **По подразбиране:** `'outlined'`

Вариант на Vuetify за падащите полета в лентата. Стойността се споделя с всеки компонент на лентата чрез конфигурацията на редактора — собствените компоненти могат да я четат с [`useTiptapifyConfig`](/bg/api/types#usetiptapifyconfig). Вижте [`variantFieldTypes`](/bg/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Тип:** `Array<toolbarSections>`
- **По подразбиране:** `[]`

Задайте собствени секции на лентата, за да разширите или добавите елементи. Компонентите на всяка секция могат да четат споделената конфигурация на редактора с [`useTiptapifyConfig`](/bg/api/types#usetiptapifyconfig). Вижте [Собствена лента с инструменти](/bg/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Тип:** `Boolean`
- **По подразбиране:** `true`

Включва интерактивното прилагане на стилове.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Тип:** `Boolean`
- **По подразбиране:** `false`

Показва неопределена лента за напредък, докато редакторът се зарежда.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Тип:** `String`
- **По подразбиране:** `'default'`

Цвят на лентата за напредък при зареждане. Приема цветовете от темата на Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Тип:** `String`
- **По подразбиране:** `'1px'`

Височина на лентата за напредък при зареждане.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Тип:** `Number`
- **По подразбиране:** `0`

От толкова изображения в един ред (без нищо между тях) редакторът ги подрежда в номерирана мрежа с три колони, за сайтове, които показват такива изображения като слайдер. `0` го изключва.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Тип:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/bg/api/types#tiptapifyskininput))
- **По подразбиране:** `'default'`

Външният вид на рамката на редактора: лента, bubble менюта, падащи менюта, диалози, колонтитул.

- `default` — класическият вид: издигната лента с инструменти, групи бутони като издигнати кутии, бутони на Vuetify с основно състояние при натискане.
- `pastel` — спокойният вид: плоска оцветена лента с инструменти под тънка линия, прозрачни бутони с неутрално състояние при натискане, леки падащи менюта, меки диалози.

Функциите (надписи на изображения, слайдери, падащото меню за подравняване, стилове на списъци) работят еднакво и в двата скина.

```vue
<Tiptapify skin="pastel" />
```

Можете да подадете и вграден обект на скин: преопределения на токени (`colors` / `metrics`) и флагове за форма, по избор `extends` на регистриран скин. Той се разрешава върху `default` (или своята основа), рендира се с класа `tiptapify-skin-inline` (`tiptapify-skin-{name}`, когато обектът съдържа `name`), а токените му попадат като CSS променливи `--tf-*` в корена на редактора. Собствените имена идват от `registerSkin('mint', { … })` — вижте [ръководството за скиновете](/bg/guide/skins) за таблицата с токени и рецептите.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/bg/api/types#tiptapifyuploadoptions))
- **По подразбиране:** `null`

Крайната точка на [качването на файлове](/bg/guide/uploads): файловете, избрани в диалозите за изображение и видео (както и корица на видео и изображението на карта на линк), се изпращат към нея с `POST {endpoint}` (multipart `file` и `kind`), а документът пази URL, с който тя отговаря (`{ "url": … }`).

Без него диалогът за изображение пак приема файл: избраното изображение (и корица на видео) се вгражда в документа като base64 data URL, а base64 изображенията се запазват при зареждане на документа. Диалогът за видео предлага **Качване** само с това пропърти. При зададен `upload` base64 изображенията се отхвърлят при зареждане на документа.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Тип:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/bg/api/types#tiptapifycontentstyles))
- **По подразбиране:** `'inline'`

Как запазеният HTML носи външния вид на карти с връзки, изображения с надписи, видеа, вграждания и списъци със задачи (вижте [Стилове на съдържанието](/bg/guide/content-styles)): `inline` го записва в атрибутите им `style`, така че сайтът показва HTML както е; `classes` оставя само класове, за сайт, който зарежда `tiptapify/content.css`. Редакторът игнорира тези стилове при зареждане на HTML, така че и двата вида HTML се зареждат по един и същ начин.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Тип:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/bg/api/types#tiptapifylinkpreviewoptions))
- **По подразбиране:** `null`

Backend крайната точка на [картите на линкове](/bg/guide/link-cards): тя чете OpenGraph данните на страниците, което браузърът не може (CORS). Редакторът я проверява с handshake при стартиране (`GET {endpoint}` трябва да отговори `200 { "tiptapifyLinkPreview": 1 }`); докато не отговори, нищо не предлага карта.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Събития {#events}

### `editor-ready` {#editor-ready}

Излъчва се, когато екземплярът на редактора е готов.

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

Излъчва се, когато съдържанието на редактора се промени.

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

Поддържа свързване с `v-model`.

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

Екземплярът на редактора и функцията `t` са достъпни чрез provide/inject на Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
