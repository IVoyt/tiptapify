# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **타입:** `String | Object`
- **기본값:** `''`

에디터의 초기 콘텐츠입니다. HTML 문자열 또는 Tiptap JSON 객체를 받습니다.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content`는 **초기** 콘텐츠일 뿐이며, 양방향 바인딩에는 `v-model`을 사용하세요(`modelValue` 참고).

### `modelValue` {#modelvalue}

- **타입:** `String | Object`
- **기본값:** `''`

`v-model`용 양방향 바인딩 값입니다. `v-model`을 사용하면 반응형 값을 에디터와 동기화할 수 있습니다. 편집할 때마다 컴포넌트가 최신 HTML과 함께 `update:modelValue`를 발행하고, `v-model`이 이를 ref에 다시 기록합니다. `v-model`만 사용하고 `:content`를 지정하지 않으면 바인딩된 값이 에디터의 초기 콘텐츠가 됩니다.

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

- **타입:** `String`
- **기본값:** `''`

에디터가 비어 있을 때 표시되는 플레이스홀더 텍스트입니다.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **타입:** `Number`
- **기본값:** `null`

에디터 콘텐츠 영역의 최소 높이(픽셀)입니다.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **타입:** `Boolean`
- **기본값:** `true`

툴바를 표시하거나 숨깁니다.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **타입:** `Array<String> | Object`
- **기본값:** `[]`

표시할 툴바 항목입니다. 항목 이름의 배열 또는 이름 있는 섹션을 가진 객체를 전달합니다. [툴바 항목](/ko/api/toolbar-items)을 참고하세요.
배열에서 `'|'`는 항목을 그룹으로 나누고(버튼이 어느 섹션에 속하든 나열한 순서대로), `'~'`는 그 뒤의 항목을 툴바 끝으로 밀어냅니다. 그룹을 사용할 때 내장 항목이 아닌 이름은 `customExtensions`에 있는 같은 이름의 커스텀 버튼 자리를 확보하며, 해당 버튼이 없으면 그 자리는 제거됩니다.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **타입:** `Boolean`
- **기본값:** `false`

`true`이면 `items` prop이 포함할 항목이 아니라 **제외할** 항목을 지정합니다.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **타입:** `Boolean`
- **기본값:** `true`

텍스트를 선택하면 버블 메뉴를 표시합니다. 그룹으로 나뉜 아이콘 버튼 한 줄이며, 굵게, 기울임, 밑줄, 취소선 | 위 첨자, 아래 첨자 | 강조, 인라인 코드 | 링크 | 서식 지우기로 구성됩니다. 각 버튼에는 단축키가 표시된 툴팁이 있고, 선택 영역에 해당 마크가 적용되어 있으면 활성 상태로 표시됩니다. 블록(이미지, 위젯)을 선택했을 때, 코드 안에서, 문서 전체를 선택했을 때는 숨겨집니다.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **타입:** `Boolean`
- **기본값:** `true`

빈 줄에 플로팅 메뉴를 표시합니다. 제목 1, 제목 2, 글머리 기호 목록이 버블 메뉴와 같은 아이콘 버튼 줄에 표시됩니다.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **타입:** `Boolean`
- **기본값:** `true`

슬래시 명령 메뉴를 활성화합니다(`/`를 입력하면 실행).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **타입:** `Boolean`
- **기본값:** `true`

에디터 푸터에 단어 수를 표시합니다.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **타입:** `Boolean`
- **기본값:** `true`

에디터 푸터에 글자 수를 표시합니다.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **타입:** `Number | null`
- **기본값:** `null`

Tiptap `CharacterCount` 확장이 허용하는 최대 글자 수입니다. `null`로 설정하거나 prop을 생략하면 제한 없이 편집할 수 있습니다. `0`보다 큰 값으로 설정하면 푸터에 임계값별로 색이 달라지는 SVG 원형 진행 표시기가 나타납니다.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **타입:** `String`
- **기본값:** `'purple'`

`limit`가 설정되었을 때 푸터에 표시되는 원형 진행 표시기의 기본 색상입니다.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **타입:** `String`
- **기본값:** `'orange'`

사용량이 제한의 75%를 넘을 때 진행 표시기의 색상입니다.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **타입:** `String`
- **기본값:** `'red'`

글자 수 제한에 도달했을 때 진행 표시기의 색상입니다.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **타입:** `TiptapifyFooterAlignment`
- **기본값:** `'end'`

푸터 상태 항목의 정렬입니다. `'start'`, `'center'`, `'end'`를 받습니다.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **타입:** `Boolean | TiptapifyAiOptions`
- **기본값:** `false`

`ai` 툴바 항목을 활성화합니다. 에디터는 OpenAI 호환 `/v1/chat/completions` 요청을 만들어 `aiProvider`에 전달합니다. 제공자 콜백에서 백엔드, BFF, OAuth로 보호된 엔드포인트, LM Studio 또는 SDK 래퍼를 호출하세요.

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

로컬 LLM LM Studio 예제:

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

`stream: true`로 설정하고 `aiProvider`의 `stream` 인수로 토큰을 전달하면 스트리밍 출력이 지원됩니다. 청크가 도착하는 동안 AI 대화상자의 결과 필드가 실시간으로 갱신되며, **중지** 버튼으로 진행 중인 요청을 취소할 수 있습니다.

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

사용자가 **중지**를 클릭하거나 대화상자를 닫을 때 요청이 취소되도록 `stream.signal`을 `fetch`(또는 SDK 호출)에 전달하세요. 부분적으로 스트리밍된 콘텐츠는 결과 필드에 남아 적용하거나 버릴 수 있습니다. 스트리밍하지 않는 제공자는 `stream` 인수를 완전히 무시해도 됩니다. 이 인수는 선택 사항이며 하위 호환됩니다.

추론 모델(Qwen thinking, DeepSeek, o 시리즈)은 "생각"을 별도의 `reasoning_content` 델타로 스트리밍합니다. 이 청크를 `stream.onReasoning()`으로 전달하세요. `showReasoning: true`이면 대화상자가 결과 필드 위의 접을 수 있는 **사고** 패널에 이를 렌더링합니다(패널은 기본적으로 숨겨져 있습니다). 추론 출력은 표시용일 뿐이며 에디터에는 삽입되지 않습니다.

요청마다 모델의 사고 모드를 사용자가 전환할 수 있게 하려면 AI 옵션에 `thinking: true`를 설정하세요. 그러면 대화상자에 **사고** 토글이 표시되며(기본값은 켜짐이고 열 때마다 초기화됨), 플러그인이 토글 값을 `enable_thinking: true | false`로 요청에 기록하므로 `chatCompletionOptions`에서 `enable_thinking`을 직접 설정할 필요가 없습니다(설정해서도 안 됩니다).

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

`thinking`이 `false`이거나 생략되면 토글이 표시되지 않고 플러그인이 `enable_thinking: false`를 보내므로, 기본적으로 사고하는 모델(Qwen3, DeepSeek, …)도 사고하지 않습니다.

요청마다 추론 레벨을 사용자가 선택할 수 있게 하려면 AI 옵션에 `reasoningEffort`를 설정하세요. 그러면 대화상자에 `options`(`'low' | 'medium' | 'high' | 'xhigh' | 'max'` 같은 사용자 지정 레벨)로 채워진 **추론 레벨** 드롭다운이 표시됩니다.
확장이 드롭다운에 `default` 항목(사고 모드의 기준값)을 항상 직접 추가하므로 설정에 `default`를 나열하지 않습니다. 옵션의 `default` 필드는 대화상자를 열 때 사용자 지정 레벨 중 하나를 미리 선택하며(없으면 `default`가 선택됨), 값은 열 때마다 초기화됩니다.
선택한 값이 플러그인이 요청에 기록할 내용을 결정합니다. `default`는 사고 모드를 유지하여 **사고** 토글이 활성 상태로 `enable_thinking`을 제어하고, 다른 값은 대신 `reasoning_effort`로 전송되며 해당 값이 선택된 동안 사고 토글은 비활성화됩니다(제공자는 `enable_thinking`과 `reasoning_effort`가 한 요청에 함께 있으면 거부합니다).
드롭다운은 `thinking`이 활성화되어 있고 사고 토글이 켜져 있을 때만 표시됩니다. 사고를 끄면 드롭다운이 숨겨지고 `reasoning_effort`는 전송되지 않습니다(요청은 `enable_thinking: false`로 되돌아갑니다). `options`가 없거나 비어 있으면 드롭다운은 렌더링되지 않습니다.

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

**사고** 패널은 기본적으로 숨겨져 있습니다(`showReasoning`의 기본값은 `false`). `showReasoning: true`로 설정하면 사고를 켜 둔 채 모델의 추론 과정(`reasoning_content` 델타)을 스트리밍하는 접을 수 있는 패널이 표시됩니다. 모델은 그대로 추론하고 결과도 같은 방식으로 적용되며, 단계별 추론 과정만 추가로 표시됩니다.

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

사용자 지정 프롬프트 예시는 현지화된 기본값을 대체합니다.

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

`tokenProvider`와 `storage`는 브라우저에서 직접 연동하는 경우를 위한, 사용자가 소유하는 선택적 훅입니다. 브라우저 코드나 브라우저 저장소에 넣은 API 키나 제공자 토큰은 사용자에게 보이므로 비밀로 취급해서는 안 됩니다. 프로덕션의 비밀 값에는 위의 백엔드 어댑터 패턴을 권장합니다.

`mode: 'insert' | 'replace' | 'append'`로 대화상자 동작 버튼(**삽입** / **바꾸기** / **끝에 추가**)의 삽입 모드를 미리 선택합니다. `mode`가 없으면 대화상자를 열 때 텍스트가 선택되어 있으면 **바꾸기**, 아니면 **삽입**이 기본값입니다. 동작 버튼은 분할 버튼으로, 주 영역은 미리 선택된 모드로 결과를 적용하고 오른쪽의 작은 "더보기"(⋮) 영역은 나머지 모드를 나열한 메뉴를 엽니다. 하나를 클릭하면 그 모드로 결과가 즉시 적용됩니다.

에디터에 `limit`(글자 수 제한)가 있으면, 결과가 생성되는 즉시 결과 필드 아래에 `generated / limit` 글자 수 카운터가 표시됩니다(스트리밍 중에는 실시간으로 갱신되고, 제한을 초과하게 되면 옅은 빨간색으로 바뀝니다).
AI 출력이 제한을 초과하면 생성 직후 대화상자에 `ai.limit_exceeded` 경고도 표시됩니다.
이 상태에서는 **삽입** 버튼과 다른 모드 메뉴가 비활성화됩니다. `CharacterCount` 확장이 문서를 제한 이상으로 키우는 삽입을 거부하므로 결과는 전부 적용하거나 전혀 적용하지 않는 방식입니다. 제한 안에 들어오면 전체가 삽입되고, 초과하면 전혀 삽입되지 않습니다.
결과를 줄이면 동작이 다시 활성화됩니다.

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

`systemPrompt`, `temperature`, `chatCompletionOptions` 또는 `createMessages(context)`로 OpenAI 호환 chat-completions 요청을 사용자 지정할 수 있습니다. `context`에는 `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`가 들어 있습니다. `textBefore` / `textAfter`는 선택 영역이 속한 문단에서 그 앞뒤 텍스트입니다(각각 최대 500자, 선택이 없으면 비어 있음). 선택 영역과 함께 전송하세요. 그렇지 않으면 모델이 그 조각을 전체 텍스트로 착각해 이어서 완성해 버립니다.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **타입:** `String`
- **기본값:** `undefined`

커스텀 `aiProvider`의 대안입니다. AI 기능을 백엔드 LLM 엔드포인트에 연결하면 tiptapify가 요청을 직접 구성해 보냅니다. 백엔드는 최소한의 JSON 페이로드를 받습니다.

- **항상:** `prompt`(대화상자에 입력한 요청)와 `instruction`(`systemPrompt`, 커스텀 `createMessages`의 시스템 메시지, 또는 내장 기본값).
- **선택 사항, 설정된 경우에만 전송:** `stream`(`true`일 때만), `thinking`(대화상자의 **사고** 토글, `true`일 때만), `reasoning_effort`(선택한 추론 레벨), `model`.

응답은 유연하게 허용됩니다: 일반 문자열, `{ content }` 객체, 또는 OpenAI 호환 `choices` 페이로드. 요청에 `stream: true`가 있으면 응답 본문을 SSE 스트림(`data:` 줄, `data: [DONE]`으로 종료)으로 읽습니다. OpenAI 스타일 델타(`choices[0].delta.content` / `.reasoning_content`), 단순한 `{ type: 'content' | 'reasoning', data }` 청크, 평면형 `{ content, reasoning_content }` 청크, 일반 텍스트 `data` 줄이 모두 허용됩니다. 백엔드가 `stream`을 무시하고 일반 본문으로 응답하면 그 본문을 대신 사용합니다. OK가 아닌 응답이 오면 백엔드의 오류 메시지(JSON `{ error }` / `{ message }` 또는 원문 본문)가 대화상자에 표시됩니다. **중지** 버튼을 누르거나 대화상자를 닫으면 진행 중인 요청이 중단되며, 그때까지 스트리밍된 콘텐츠는 결과 필드에 남습니다.

`aiProvider`와 `aiEndpoint`가 모두 설정되어 있으면 `aiProvider`가 우선합니다.

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

- **타입:** `Record<string, string>`
- **기본값:** `undefined`

`aiEndpoint` 요청과 함께 전송되는 추가 헤더로, `Content-Type: application/json` 위에 병합됩니다. 여기에 설정한 `Authorization` 헤더는 그대로 유지되며, 없으면 `tokenProvider`의 토큰(설정된 경우)이 `Authorization: Bearer <token>`으로 전송됩니다.

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

- **타입:** `String`
- **기본값:** `'Inter'`

에디터 콘텐츠의 기본 글꼴입니다.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **타입:** `String`
- **기본값:** `'px'`

글꼴 크기 값의 측정 단위입니다.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **타입:** `String`
- **기본값:** `'0'`

에디터 컨테이너의 모서리 반경입니다. Vuetify 반경 값(`sm`, `md`, `lg`, `xl`, `pill` 등)을 받습니다.

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **타입:** `variantBtnTypes`
- **기본값:** `'tonal'`

툴바 버튼에 적용하는 Vuetify 버튼 variant입니다. 이 값은 에디터 설정을 통해 모든 툴바 컴포넌트와 공유되며, 커스텀 컴포넌트는 [`useTiptapifyConfig`](/ko/api/types#usetiptapifyconfig)로 읽을 수 있습니다. [`variantBtnTypes`](/ko/api/types#variantbtntypes)를 참고하세요.

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **타입:** `variantFieldTypes`
- **기본값:** `'outlined'`

툴바 드롭다운 필드에 적용하는 Vuetify variant입니다. 이 값은 에디터 설정을 통해 모든 툴바 컴포넌트와 공유되며, 커스텀 컴포넌트는 [`useTiptapifyConfig`](/ko/api/types#usetiptapifyconfig)로 읽을 수 있습니다. [`variantFieldTypes`](/ko/api/types#variantfieldtypes)를 참고하세요.

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **타입:** `Array<toolbarSections>`
- **기본값:** `[]`

툴바 항목을 확장하거나 추가하는 커스텀 툴바 섹션을 제공합니다. 각 섹션의 컴포넌트는 [`useTiptapifyConfig`](/ko/api/types#usetiptapifyconfig)로 공유 에디터 설정을 읽을 수 있습니다. [커스텀 툴바](/ko/examples/custom-toolbar#custom-toolbar-components)를 참고하세요.

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **타입:** `Boolean`
- **기본값:** `true`

인터랙티브 스타일 적용을 활성화합니다.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **타입:** `Boolean`
- **기본값:** `false`

에디터를 불러오는 동안 불확정 진행 표시줄을 표시합니다.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **타입:** `String`
- **기본값:** `'default'`

로딩 진행 표시줄의 색상입니다. Vuetify 테마 색상 값을 받습니다.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **타입:** `String`
- **기본값:** `'1px'`

로딩 진행 표시줄의 높이입니다.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **타입:** `Number`
- **기본값:** `0`

이미지가 (사이에 아무것도 없이) 이 개수 이상 연속으로 나오면, 에디터는 이를 번호가 매겨진 3열 그리드로 배치합니다. 이런 이미지를 슬라이더로 보여 주는 사이트를 위한 기능입니다. `0`이면 꺼집니다.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **타입:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/ko/api/types#tiptapifyskininput))
- **기본값:** `'default'`

에디터 UI(툴바, 버블 메뉴, 드롭다운, 대화상자, 푸터)의 외관입니다.

- `default` — 클래식한 모습: 도드라진 툴바, 도드라진 상자 형태의 버튼 그룹, 눌림 상태에 기본 색상을 쓰는 Vuetify 버튼.
- `pastel` — 차분한 모습: 가는 선 아래에 놓인 평평하고 색조가 들어간 툴바, 눌림 상태가 중립적인 고스트 버튼, 가벼운 드롭다운, 부드러운 대화상자.

기능(이미지 캡션, 슬라이더, 정렬 드롭다운, 목록 스타일)은 두 스킨에서 동일하게 동작합니다.

```vue
<Tiptapify skin="pastel" />
```

인라인 스킨 객체를 전달할 수도 있습니다. 토큰 덮어쓰기(`colors` / `metrics`)와 shape 플래그를 담고, 선택적으로 등록된 스킨을 `extends`합니다. `default`(또는 그 기반) 위에서 해석되고, `tiptapify-skin-inline` 클래스(객체에 `name`이 있으면 `tiptapify-skin-{name}`)로 렌더링되며, 토큰은 에디터 루트의 `--tf-*` CSS 변수로 적용됩니다. 커스텀 이름은 `registerSkin('mint', { … })`로 만들며, 토큰 표와 레시피는 [스킨 가이드](/ko/guide/skins)를 참고하세요.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **타입:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/ko/api/types#tiptapifyuploadoptions))
- **기본값:** `null`

[업로드](/ko/guide/uploads)의 엔드포인트입니다. 이미지 및 동영상 대화상자에서 선택한 파일(그리고 동영상 포스터, 링크 카드의 이미지)이 `POST {endpoint}`(multipart `file`과 `kind`)로 전송되며, 문서에는 엔드포인트가 응답한 URL(`{ "url": … }`)이 남습니다.

이 prop이 없어도 이미지 대화상자는 파일을 받습니다. 선택한 이미지(그리고 동영상 포스터)는 base64 데이터 URL로 문서에 포함되며, 문서를 불러올 때 base64 이미지는 유지됩니다. 동영상 대화상자는 이 prop이 있을 때만 **업로드**를 제공합니다. `upload`를 설정하면 문서를 불러올 때 base64 이미지가 제거됩니다.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **타입:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/ko/api/types#tiptapifycontentstyles))
- **기본값:** `'inline'`

저장된 HTML이 링크 카드, 캡션이 있는 이미지, 동영상, 임베드, 작업 목록의 모양을 어떻게 담을지 정합니다([콘텐츠 스타일](/ko/guide/content-styles) 참고). `inline`은 모양을 요소의 `style` 속성에 기록하므로 사이트에서 HTML을 그대로 보여 줍니다. `classes`는 클래스만 남기며, `tiptapify/content.css`를 불러오는 사이트에 적합합니다. 에디터는 HTML을 불러올 때 이 스타일을 무시하므로, 어느 쪽 HTML이든 똑같이 불러옵니다.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **타입:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/ko/api/types#tiptapifylinkpreviewoptions))
- **기본값:** `null`

[링크 카드](/ko/guide/link-cards)의 백엔드 엔드포인트입니다. 브라우저는 CORS 때문에 읽을 수 없는 페이지의 OpenGraph 데이터를 이 엔드포인트가 읽습니다. 에디터는 시작할 때 핸드셰이크로 이를 확인하며(`GET {endpoint}`가 `200 { "tiptapifyLinkPreview": 1 }`로 응답해야 함), 응답할 때까지는 카드가 제안되지 않습니다.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## 이벤트 {#events}

### `editor-ready` {#editor-ready}

에디터 인스턴스가 준비되면 발생합니다.

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

에디터 콘텐츠가 변경되면 발생합니다.

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

`v-model` 바인딩을 지원합니다.

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

에디터 인스턴스와 `t` 함수는 Vue의 provide/inject를 통해 사용할 수 있습니다.

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
