# AI {#ai}

이 데모는 OpenAI 호환 `/v1/chat/completions` 제공자라면 무엇이든 사용할 수 있습니다. 엔드포인트, 모델, 토큰 필드는 이 페이지 세션에서만 사용되며 저장되지 않습니다.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="텍스트를 작성하거나 붙여넣은 다음 AI 툴바 버튼을 사용하세요..."
/>

## 백엔드 엔드포인트 모드 {#backend-endpoint-mode}

**모드** 필드를 **백엔드 엔드포인트**로 바꾸면 커스텀 `aiProvider` 없이 tiptapify가 백엔드와 직접 통신합니다. 엔드포인트에 최소한의 페이로드(`prompt`, `instruction`, 그리고 선택 필드인 `stream`, `thinking`, `reasoning_effort`, `model`)를 POST하며, 일반 JSON, `{ content }`, SSE 스트리밍 응답을 받을 수 있습니다. 전체 규약은 [AI 가이드](/ko/guide/ai#backend-generation-aiendpoint)를 참고하세요.

## 로컬 LM Studio {#local-lm-studio}

LM Studio를 사용하는 경우 다음과 같은 엔드포인트를 사용합니다.

```txt
http://localhost:1234/v1/chat/completions
```

LM Studio가 다른 컴퓨터에서 실행 중이라면 해당 호스트를 사용하세요. 예를 들면 다음과 같습니다.

```txt
http://192.168.0.107:1234/v1/chat/completions
```

브라우저 기반 데모에서 제공자가 CORS를 허용하지 않는다면 개발용 프록시를 사용하세요.
