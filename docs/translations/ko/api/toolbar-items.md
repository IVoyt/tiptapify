# 툴바 항목 {#toolbar-items}

사용 가능한 모든 툴바 항목을 섹션별로 정리했습니다.

## 액션 {#actions}

| 항목     | 설명                        |
|----------|-----------------------------|
| `undo`   | 마지막 변경 실행 취소       |
| `redo`   | 취소한 변경 다시 실행       |

## AI {#ai}

| 항목 | 설명                                   |
|------|----------------------------------------|
| `ai` | 설정된 경우 AI 프롬프트 대화상자 열기  |

## 서식 {#format}

| 항목        | 설명            |
|-------------|-----------------|
| `bold`      | 굵게 전환       |
| `italic`    | 기울임 전환     |
| `underline` | 밑줄 전환       |
| `strike`    | 취소선 전환     |

## 추가 서식 {#format-extra}

| 항목         | 설명                                |
|--------------|-------------------------------------|
| `sup`        | 위 첨자 전환                        |
| `sub`        | 아래 첨자 전환                      |
| `code`       | 인라인 코드 전환                    |
| `codeBlock`  | 구문 강조가 적용된 코드 블록 삽입   |
| `blockquote` | 인용문 삽입                         |

## 스타일 {#style}

| 항목             | 설명                                       |
|------------------|--------------------------------------------|
| `heading`        | 제목 레벨(H1-H6)을 선택하는 드롭다운       |
| `fontFamily`     | 글꼴을 선택하는 드롭다운                   |
| `fontSize`       | 글꼴 크기를 선택하는 드롭다운              |
| `lineHeight`     | 줄 높이 설정                               |
| `textColor`      | 글자 색상: 팔레트, 최근 색상, HEX, 스포이트, 사용자 지정 선택기 |
| `highlightColor` | 강조 색상: 같은 선택기이며 "강조 없음"이 맨 앞에 있음 |

`heading` 항목은 콜론 뒤에 옵션을 받을 수 있습니다. 제목 레벨, 문단 항목을 추가하는 `p`, 드롭다운 대신 개별 버튼으로 표시하는 `inline`을 지정할 수 있습니다.

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## 정렬 {#alignment}

| 항목      | 설명              |
|-----------|-------------------|
| `left`    | 왼쪽 정렬         |
| `center`  | 가운데 정렬       |
| `right`   | 오른쪽 정렬       |
| `justify` | 양쪽 정렬         |
| `align`   | 정렬 드롭다운. `align:left,center,right`로 옵션을 제한할 수 있음 |

## 목록 {#list}

| 항목           | 설명                          |
|----------------|-------------------------------|
| `bulletList`   | 글머리 기호 목록 전환         |
| `orderedList`  | 번호 목록 전환                |
| `taskList`     | 작업 목록(체크박스) 전환      |
| `indent`       | 현재 블록 들여쓰기            |
| `outdent`      | 현재 블록 내어쓰기            |

## 미디어 {#media}

| 항목      | 설명                              |
|-----------|-----------------------------------|
| `link`    | 링크 삽입/편집. `linkPreview`가 있으면 [링크 카드](/ko/guide/link-cards) 삽입/편집 |
| `image`   | 이미지 삽입/편집: URL 또는 업로드, 대체 텍스트, 캡션, 크기, 위치 |
| `video`   | YouTube, Vimeo 또는 동영상 파일(`.mp4`, `.webm`, `.ogg`, `.mov`) 삽입/편집 |
| `iframe`  | 주소 또는 iframe 코드로 페이지 임베드 |
| `emoji`   | 이모지 선택기 열기(10개 카테고리) |
| `charmap` | 특수 문자 선택기 열기             |
| `table`   | 표 삽입                           |

## 기타 {#misc}

| 항목            | 설명                                       |
|-----------------|--------------------------------------------|
| `line`          | 가로줄 삽입                                |
| `pagebreak`     | 페이지 나누기 삽입                         |
| `source`        | HTML 소스 보기 전환                        |
| `preview`       | HTML 미리보기 모드 전환                    |
| `fullscreen`    | 전체 화면 편집 모드 전환                   |
| `formatClear`   | 선택 영역의 모든 서식 지우기               |
| `invisibleChar` | 보이지 않는 문자(공백 등) 삽입             |

## 구분선 {#separators}

배열 형식의 `items` prop에서 버튼 그룹 사이의 구분선으로 `|`를 사용합니다.

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## 전체 툴바 예제 {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
