# 슬래시 명령 {#slash-commands}

슬래시 명령은 줄 맨 앞에서 `/`를 입력하면 나타나는 빠른 삽입 메뉴입니다.

## 슬래시 명령 활성화 {#enabling-slash-commands}

슬래시 명령은 기본적으로 활성화되어 있습니다. 명시적으로 제어하려면 다음과 같이 합니다.

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="슬래시 명령 데모..."
:slash-commands="true"
/>

## 사용 가능한 명령 {#available-commands}

에디터에서 `/`를 입력하면 명령 팔레트가 표시됩니다. 사용 가능한 명령은 다음과 같습니다.

| 명령            | 설명                               |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | 제목 삽입(레벨 1-6)                |
| `/bulletList`   | 글머리 기호 목록 삽입              |
| `/numberedList` | 번호 목록 삽입                     |
| `/taskList`     | 작업 목록 삽입                     |
| `/code`         | 인라인 코드 삽입                   |
| `/codeBlock`    | 코드 블록 삽입                     |
| `/quote`        | 인용문 삽입                        |
| `/image`        | 이미지 삽입(URL 대화상자 열림)     |
| `/video`        | YouTube 동영상 임베드              |
| `/table`        | 표 삽입                            |
| `/link`         | 하이퍼링크 삽입                    |
| `/divider`      | 가로줄 삽입                        |
| `/emoji`        | 이모지 선택기 열기                 |
| `/specialChars` | 특수 문자 열기                     |

## 동작 방식 {#how-it-works}

1. 커서를 줄의 시작이나 공백 뒤에 둡니다
2. `/`를 입력하면 명령 팔레트가 나타납니다
3. 계속 입력해 명령을 필터링합니다
4. `Enter`를 누르거나 클릭해 선택한 명령을 삽입합니다

## 슬래시 명령 비활성화 {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## 플로팅 메뉴와 함께 쓰는 슬래시 명령 {#slash-commands-with-floating-menu}

슬래시 명령과 플로팅 메뉴를 함께 사용하면 최적의 편집 환경을 만들 수 있습니다.

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

- **슬래시 명령**(`/`) — 줄 맨 앞에서 `/`를 입력하면 실행됩니다
- **플로팅 메뉴** — 빈 줄에 커서를 두면 나타납니다(블록 수준 작업 제공)
- **버블 메뉴** — 텍스트를 선택하면 나타납니다(인라인 서식 제공)

## 사용 가능한 명령 필터링 {#filtering-available-commands}

명령 ID 배열을 전달해 포함할 명령을 지정할 수 있습니다.

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### 사용 가능한 명령 ID {#available-command-ids}

| ID             | 설명                 |
|----------------|----------------------|
| `h1` - `h6`    | 제목 레벨 1-6        |
| `bulletList`   | 글머리 기호 목록     |
| `numberedList` | 번호 목록            |
| `taskList`     | 작업 목록            |
| `code`         | 인라인 코드          |
| `codeBlock`    | 코드 블록            |
| `quote`        | 인용문               |
| `image`        | 이미지               |
| `video`        | YouTube 동영상       |
| `table`        | 표                   |
| `link`         | 링크                 |
| `divider`      | 가로줄               |
| `emoji`        | 이모지               |
| `specialChars` | 특수 문자            |
