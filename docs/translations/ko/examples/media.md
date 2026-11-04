# 미디어 {#media}

## 이미지 {#images}

URL로 이미지를 삽입합니다.

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

이미지 버튼을 누르면 이미지 대화상자가 열립니다.

- **URL로** 또는 **업로드**. [업로드 엔드포인트](/ko/guide/uploads)가 없으면 선택한 파일은 base64 데이터 URL로 포함되고, 있으면 파일이 서버로 전송됩니다.
- **화면 낭독기용 대체 텍스트**(비어 있으면 대화상자가 알려 줍니다)와 이미지 아래의 **캡션**.
- **크기**: 원본, 텍스트 너비, 또는 비율 고정을 지원하는 사용자 지정 너비 × 높이.
- **위치**: 한 줄을 차지하며 가운데 정렬, 또는 텍스트의 왼쪽이나 오른쪽에 떠 있도록 배치.

선택한 이미지에는 크기 조절 핸들(조절 한 번이 실행 취소 한 단계)과 위쪽 툴바가 표시됩니다. 툴바에서는 왼쪽/오른쪽 배치, 다운로드, 편집, 삭제를 할 수 있습니다. 더블 클릭하면 대화상자가 열립니다.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## 동영상 {#videos}

YouTube와 Vimeo 동영상 또는 동영상 파일을 임베드합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

동영상 버튼을 누르면 동영상 대화상자가 열립니다.

- **YouTube 또는 Vimeo 링크**는 해당 플레이어로 바뀝니다. 대화상자에는 인식된 제공자와 미리보기가 표시되고, 플레이어가 지원하는 경우 **시작 시간**(`?t=`에서 미리 채워짐)도 지정할 수 있습니다.
- **동영상 파일 링크**(`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`)는 포스터, 컨트롤, 자동 재생(음소거), 반복 재생을 갖춘 `<video>`로 바뀝니다. 링크에는 프로토콜(`https://`, `http://`), `//host` 또는 `/path`가 있어야 하며, 대화상자가 임의로 추측해 붙이지 않습니다.
- **업로드**는 동영상 파일을 서버로 보내며, [업로드 엔드포인트](/ko/guide/uploads)가 있을 때만 표시됩니다.
- **크기**: 반응형 16:9, 또는 비율 고정을 지원하는 사용자 지정 너비 × 높이.

텍스트에 붙여넣은 YouTube URL도 임베드됩니다. 플레이어를 클릭하면 재생되는 대신 선택되어 툴바 버튼이 이를 표시하며, 더블 클릭하면 대화상자가 열립니다.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="YouTube URL을 붙여넣어 동영상을 임베드하세요..." />

## iframe {#iframes}

페이지의 주소 또는 공유(Share)나 퍼가기(Embed) 메뉴의 iframe 코드로 페이지를 임베드합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

iframe 대화상자는 붙여넣은 코드(주소, 크기, 제목, 권한, sandbox, 지연 로딩, 전체 화면)를 읽고 무엇을 가져왔는지 알려 주며, 스크립트나 다른 태그가 포함된 코드는 거부합니다. 미리보기를 보여 주고, **화면 낭독기용 제목**, 크기(코드의 비율을 따르는 반응형 또는 비율 고정을 지원하는 사용자 지정), 그리고 **고급** 아래에 이름, `allow`, `sandbox`, 지연 로딩, 테두리 항목이 있습니다. 주소는 `https://` 또는 `http://`로 시작해야 합니다. 임베드를 더블 클릭하면 대화상자가 열립니다.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="iframe으로 임베드할 URL을 입력하세요..." />

## 표 {#tables}

표를 삽입하고 편집합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

표를 삽입한 뒤에는 다음 작업을 할 수 있습니다.
- 행과 열 추가/삭제
- 셀 선택
- 표 전체 삭제

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="표 버튼을 사용해 표를 삽입하세요..." />

## 링크 {#links}

하이퍼링크를 삽입합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

링크 대화상자는 입력한 주소를 그대로 받습니다: `https://…`, 그 밖의 스킴(`ftp://`, `ssh://`, 내부용 스킴), `mailto:`, `tel:`, `#anchor`, `/page`. 프로토콜을 스스로 추가하는 일은 없습니다. 프로토콜이 없는 주소(`example.com`, `internal.host:8080`)에는 `https://`, `http://`, `ftp://`를 추가하는 칩이 표시되며, 아무것도 추가하지 않으면 입력한 그대로 유지됩니다. `javascript:`, `vbscript:`, `data:` 주소는 거부됩니다.

대화상자에는 링크 텍스트, **새 탭에서 열기**(`noopener noreferrer`가 추가됨)도 있으며, **고급** 아래에 칩 형태의 `rel` 값(어떤 값이든 가능: Enter, 스페이스 또는 쉼표로 추가)과 CSS 클래스가 있습니다.

[`linkPreview`](/ko/api/props#linkpreview) prop을 지정하면 같은 대화상자에서 링크를 페이지의 이미지, 제목, 설명이 담긴 카드로 표시할 수 있으며, 빈 줄에 URL을 붙여넣으면 **링크 / 카드**가 제안됩니다. 자세한 내용은 [링크 카드](/ko/guide/link-cards)를 참고하세요.

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="텍스트를 선택하고 링크를 눌러 하이퍼링크를 추가하세요..." />

## 이모지 {#emoji}

10개 카테고리로 구성된 내장 선택기에서 이모지를 삽입합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

이모지 선택기에는 원하는 이모지를 빠르게 찾을 수 있는 검색/필터 입력란이 있습니다.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="이모지 버튼을 눌러 이모지를 삽입하세요..." />

## 특수 문자(Charmap) {#special-characters-charmap}

특수 문자, 화살표, 그리스 문자, 수학 기호 등을 삽입합니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

카테고리는 다음과 같습니다.
- 화살표
- 통화
- 그리스 문자
- 수학 기호
- 기타

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="charmap을 눌러 특수 문자를 삽입하세요..." />

## 미디어 도구 조합 {#combining-media-tools}

모든 기능을 갖춘 미디어 툴바입니다.

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="전체 미디어 툴바..." />
