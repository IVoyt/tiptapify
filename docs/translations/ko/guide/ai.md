# AI 확장 {#ai-extension}

AI 확장은 프롬프트 대화상자를 여는 툴바 버튼을 추가합니다. 사용자가 선택한 제공자에 요청을 보내고, 스트리밍되는 결과를 보여 주며, 모드별 동작 버튼(**삽입** / **바꾸기** / **끝에 추가**)으로 결과를 에디터에 넣습니다.

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

`ai` prop은 `true`(기본값이 적용된 옵션) 또는 옵션 객체(`TiptapifyAiOptions`)를 받습니다. 툴바의 `ai` 항목은 항상 등록되지만, `aiProvider`가 설정되지 않으면 버튼은 **비활성화**됩니다.

실행 가능한 데모는 [AI 예제](/ko/examples/ai)를, 전체 옵션 레퍼런스는 [Props](/ko/api/props#ai)를 참고하세요.

## 아키텍처 {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify`는 `ai` prop을 정규화합니다. `ai: true`는 빈 옵션 객체가 되고, `promptExamples`는 현지화된 기본값으로 대체되며, 그 결과는 `inject('tiptapifyAi')`(`TiptapifyAiResolvedOptions` 또는 `false`)를 통해 하위 컴포넌트에 노출됩니다.
- 툴바 항목(`src/components/Toolbar/ai.ts`)은 `Button.vue`를 렌더링합니다. 이 버튼은 `aiProvider` 사용 가능 여부를 확인하고 `Dialog.vue`를 엽니다.
- `Dialog.vue`가 요청 생명주기 전체를 담당합니다: 요청 구성, 제공자 호출, 스트리밍, 결과 삽입.

## 제공자 규약 {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

제공자는 직접 구현하는 평범한 비동기 함수입니다. tiptapify는 어떤 API도 직접 호출하지 않으므로, OpenAI 호환 `request` 객체를 처리할 수 있는 것이라면 무엇이든(fetch, SDK, 백엔드 어댑터) 사용할 수 있습니다. 예외는 `aiEndpoint` 백엔드 모드([백엔드 생성](#backend-generation-aiendpoint) 참고)로, 이 경우 tiptapify가 엔드포인트로 요청을 보냅니다.

**요청**(`TiptapifyAiRequest`)은 `chatCompletionOptions`를 펼친 다음 플러그인이 값을 덧붙여 만들어집니다.

| 필드 | 출처 |
| --- | --- |
| `messages` | `createMessages(context)`가 제공되면 그 결과, 아니면 기본 쌍: 시스템 메시지(`systemPrompt` 또는 내장 기본값)와, 프롬프트, 선택한 에디터 텍스트와 그 주변 텍스트, 그리고 선택 영역에 대해서만(선택이 없으면 전체 텍스트에 대해) 답하라는 규칙을 담은 사용자 메시지 |
| `model` | 설정된 경우 `model` 옵션 |
| `temperature` | 설정된 경우 `temperature` 옵션 |
| `stream` | `stream` 옵션 또는 `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | 사고 토글 / 추론 레벨 드롭다운 — 아래 참고 |

**컨텍스트**(`TiptapifyAiEditorContext`)는 제공자에게 에디터의 전체 상태를 제공합니다: `prompt`, `selectedText`, `textBefore` / `textAfter`(선택 영역이 속한 문단에서 그 앞뒤 텍스트, 각각 최대 500자), `text`, `html`, `json`, `mode`(`insert` / `replace` / `append`).

단어 중간에서 시작하거나 끝나는 선택 영역은 단어 전체로 확장되며, 기본 메시지는 선택 영역 주변 텍스트와 함께 선택 영역에 대해서만 답하라는 규칙을 보냅니다. 조각만 주어지면 모델이 그것을 전체 텍스트로 착각해 이어서 완성해 버리고, 그 결과 교체된 텍스트가 선택 영역 뒤에 오는 내용을 반복하게 되기 때문입니다.

**응답**: 제공자는 콘텐츠를 일반 `string`, `{ content }`(`TiptapifyAiResponse`), 또는 OpenAI 호환 `choices` 페이로드(`TiptapifyAiOpenAiResponse`)로 반환할 수 있습니다. 대화상자는 이 순서로 콘텐츠를 추출하고 앞쪽 공백을 제거합니다. 거부(reject)되면 오류 메시지(오류가 `Error` 인스턴스가 아니면 `ai.error`)가 대화상자에 표시되며 대화상자는 열린 상태로 유지됩니다.

## Backend generation (`aiEndpoint`) {#backend-generation-aiendpoint}

`aiProvider`를 구현하는 대신 AI 기능을 백엔드 LLM 엔드포인트에 연결할 수 있습니다.

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

그러면 tiptapify가 요청을 직접 구성해 엔드포인트로 POST합니다. 둘 다 설정되어 있으면 명시적인 `aiProvider`가 항상 우선합니다.

**요청** — 최소한의 JSON 페이로드(`TiptapifyAiBackendRequest`):

| 필드 | 전송 조건 |
| --- | --- |
| `prompt` | 항상 — 대화상자에 입력한 요청 |
| `instruction` | 항상 — `systemPrompt`, 커스텀 `createMessages`의 시스템 메시지, 또는 내장 기본값 |
| `stream` | `stream: true`일 때만 |
| `thinking` | 대화상자의 **사고** 토글이 켜져 있을 때만 |
| `reasoning_effort` | 사용자가 레벨을 선택했을 때만(`default`가 아닌 경우) |
| `model` | `model` 옵션이 설정되어 있을 때만 |

**응답** — 유연하게 허용됩니다: 일반 문자열, `{ content }` 객체, 또는 OpenAI 호환 `choices` 페이로드.

**스트리밍** — 요청에 `stream: true`가 있으면 응답 본문을 SSE 스트림(`data:` 줄, `data: [DONE]`으로 종료)으로 읽습니다. 허용되는 청크 형식은 다음과 같습니다.

- OpenAI 스타일 — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- 단순형 — `data: {"type":"content"|"reasoning","data":"…"}`
- 평면형 — `data: {"content":"…","reasoning_content":"…"}`
- 일반 텍스트 — `data: some text`(JSON이 아닌 `data` 줄은 콘텐츠 청크)

`content` 청크는 `onChunk`를 통해 결과 필드를 갱신하고, `reasoning_content` 청크는 `onReasoning`을 통해 **사고** 패널에 전달됩니다. 백엔드가 `stream`을 무시하고 일반 본문으로 응답하면 그 본문을 대신 사용합니다. **중지**를 클릭하거나 대화상자를 닫으면 요청이 중단되며, 그때까지 스트리밍된 콘텐츠는 결과 필드에 남습니다.

**헤더** — `aiHeaders`(`Record<string, string>`)는 `Content-Type: application/json` 위에 병합됩니다. `aiHeaders`에 `Authorization` 헤더가 있으면 그대로 유지되고, 없으면 `tokenProvider`의 토큰이 `Authorization: Bearer <token>`으로 전송됩니다.

**오류** — OK가 아닌 응답이 오면 백엔드의 오류 메시지(JSON `{ error }` / `{ message }` 또는 원문 본문)가 대화상자에 표시됩니다.

## 스트리밍 {#streaming}

`stream: true`(또는 `chatCompletionOptions.stream`이 `true`)이면 대화상자는 세 번째 인수로 `TiptapifyAiStream` 객체를 전달합니다.

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — `fetch`(또는 SDK 호출)에 전달하세요. 사용자가 **중지**를 클릭하거나 대화상자를 닫으면 중단되므로 진행 중인 요청이 계속 실행되지 않습니다.
- **`onChunk`** — 각 콘텐츠 청크를 결과 필드에 덧붙입니다. 생성 중에는 결과 필드가 읽기 전용이며 스트리밍된 부분 콘텐츠는 유지됩니다(중지한 뒤 삽입하거나 버릴 수 있습니다).
- **`onReasoning`** — 모델의 추론/사고 출력(예: Qwen/DeepSeek/o 시리즈의 `reasoning_content` 델타)을 결과 위의 접을 수 있는 **사고** 패널로 전달합니다. 이 패널은 스트리밍 중에 자동으로 펼쳐지고 자동으로 스크롤됩니다. 추론 출력은 표시용일 뿐이며 에디터에는 삽입되지 않습니다.

스트리밍하지 않는 제공자는 `stream` 인수를 무시해도 되며, 이 인수는 선택 사항입니다.

## 사고와 추론 레벨 {#thinking-and-reasoning-effort}

대화상자의 두 가지 사용자 제어가 요청 필드에 대응합니다. 둘 다 옵션으로 켜야 하는 선택 기능이며 플러그인이 관리하므로, `chatCompletionOptions`에서 이 필드를 직접 설정하지 않아야 합니다(설정할 필요도 없습니다).

- **`thinking: true`**는 **사고** 토글을 표시합니다(기본값은 켜짐이며 대화상자를 열 때마다 초기화됩니다). 플러그인은 토글 값을 `enable_thinking: true | false`로 요청에 기록합니다.
- **`thinking`이 없거나 `thinking: false`**이면 토글이 숨겨지고 플러그인이 `enable_thinking: false`를 보내므로, 기본적으로 사고하는 모델도 사고하지 않습니다.
- **`reasoningEffort: { options, default? }`**는 **추론 레벨** 드롭다운을 표시합니다. `options`에는 제공할 사용자 지정 레벨(`'low' | 'medium' | 'high' | 'xhigh' | 'max'`)을 나열합니다. 확장이 `default` 항목(사고 모드의 기준값)을 항상 직접 추가하므로 설정에 `default`를 나열해서는 안 됩니다. `default` 필드는 대화상자를 열 때 사용자 지정 레벨 중 하나를 미리 선택하며, 생략하면 `default`가 미리 선택됩니다. 값은 열 때마다 초기화됩니다. 드롭다운은 `options`가 비어 있지 않은 목록이고, `thinking`이 활성화되어 있으며, 사고 토글이 켜져 있을 때만 렌더링됩니다.
- **`showReasoning`**(기본값 `false`)은 모델의 추론 과정(`reasoning_content` 델타)을 스트리밍하는 접을 수 있는 **사고** 패널을 제어합니다. 사고를 켠 채로 이 패널을 표시하려면 `showReasoning: true`로 설정하세요. 모델은 그대로 추론하고 결과도 같은 방식으로 적용되며, 단계별 추론 과정만 추가로 표시됩니다.

제공자(특히 vLLM/LM Studio)는 `enable_thinking`과 `reasoning_effort`가 한 요청에 함께 있으면 거부하므로, 플러그인은 둘 중 정확히 하나만 보냅니다.

| 상태 | 요청 필드 |
| --- | --- |
| 사고 켜짐, 레벨 = `default`(또는 설정된 레벨 없음) | `enable_thinking`(토글 값) |
| 사고 켜짐, 레벨 = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort`(드롭다운 값). 토글은 비활성화됨 |
| 사고 꺼짐(토글이 꺼졌거나 설정에서 `thinking`이 활성화되지 않음) | `enable_thinking: false`. `reasoning_effort`는 전송되지 않음 |

## 오류 {#errors}

요청이 실패하면 대화상자는 원시 오류를 그대로 보여 주는 대신 원인을 설명하고, 그 뒤에 서비스가 보낸 메시지를 덧붙입니다.

| 상황 | 설명 |
| --- | --- |
| 브라우저가 응답을 받지 못함(`Failed to fetch`, `NetworkError…`, `Load failed`) | 서비스가 중단되었거나 연결할 수 없거나 CORS가 응답을 차단한 것입니다. 브라우저 콘솔에서 어느 쪽인지 확인할 수 있습니다 |
| `401` / `403` | API 키 또는 접근 권한을 확인하세요 |
| `404` | 엔드포인트 경로를 확인하세요 |
| `408` / `504` / 타임아웃 | 서비스가 제때 응답하지 않았습니다 |
| `429` | 요청이 너무 많습니다 |
| `5xx` | 서비스를 사용할 수 없습니다(모델을 불러오는 중이거나 사용량이 많음) |

`aiEndpoint`를 사용하면 상태는 응답에서 가져옵니다. 커스텀 `aiProvider`는 `status`가 있는 오류를 던지면 동일한 설명을 받을 수 있습니다.

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

그 밖의 오류는 해당 오류의 메시지가 그대로 표시됩니다.

## 결과 삽입 {#inserting-the-result}

동작 버튼 — 모드에 따라 **삽입**, **바꾸기**, **끝에 추가** — 을 누르면 대화상자가 `result`를 에디터에 넣습니다.

- **모드** — 대화상자의 동작 버튼은 분할 버튼입니다. 주 영역은 미리 선택된 모드(**삽입** / **바꾸기** / **끝에 추가**)로 결과를 적용합니다. `mode` 옵션이 이를 미리 선택하며, 옵션이 없으면 대화상자를 열 때 텍스트가 선택되어 있었다면 **바꾸기**, 아니면 **삽입**입니다. 버튼 오른쪽의 작은 "더보기"(⋮) 영역은 나머지 모드의 메뉴를 열며, 하나를 클릭하면 그 모드로 결과가 즉시 적용됩니다. **삽입**은 커서 위치에 결과를 넣고, **바꾸기**는 선택한 텍스트(**생성**을 클릭한 시점에 저장된 선택 영역)를 교체하며, **끝에 추가**는 문서 끝에 덧붙입니다.
- **글자 수 제한** — 에디터에 `limit`가 설정된 경우(`CharacterCount` 확장은 붙여넣기가 아닌 트랜잭션 중 문서가 제한을 넘기게 되는 것을 모두 거부합니다) 결과 필드 아래에 `generated / limit` 글자 수 카운터가 표시되고(스트리밍 중에는 실시간으로 갱신, 제한을 초과하게 되면 옅은 빨간색), 결과가 제한을 초과하면 생성 직후 대화상자에 `ai.limit_exceeded` 경고가 표시됩니다. 이때 **삽입** 버튼과 다른 모드 메뉴는 비활성화됩니다. 결과는 전부 적용하거나 전혀 적용하지 않는 방식이므로 적용하기 전에 결과를 줄여야 합니다.