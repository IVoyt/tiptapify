# 커스텀 툴바 {#custom-toolbar}

## 특정 항목만 표시 {#showing-specific-items}

`items` prop으로 필요한 툴바 버튼만 표시합니다. 항목 이름의 배열을 전달하세요.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

버튼 그룹 사이의 구분선으로는 `|`를 사용합니다.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="커스텀 툴바..." />

## 목록 스타일 드롭다운 {#list-styles-dropdown}

`:styles` 접미사를 붙이면 목록 버튼이 글머리/번호 스타일 드롭다운으로 바뀝니다. 목록 버튼이 `list-style-type` 옵션 그리드를 열고, 선택한 값은 인라인 스타일로 저장됩니다. 이 그리드는 스킨의 메뉴 표면 안에 렌더링되므로 활성 스킨을 따릅니다([스킨 가이드](/ko/guide/skins)).

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="목록 스타일 드롭다운을 열어 보세요..." />

## 항목 제외 {#excluding-items}

`items`와 함께 `items-exclude`를 사용하면 대부분의 툴바 항목을 표시하되 특정 항목만 제외할 수 있습니다.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="원하지 않는 항목 제외..." />

## 커스텀 섹션 {#custom-sections}

객체를 사용해 항목을 직접 이름 붙인 섹션으로 묶습니다.

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="커스텀 섹션 툴바..." />

## 툴바 섹션 레퍼런스 {#toolbar-sections-reference}

툴바 항목은 섹션별로 구성됩니다. 사용 가능한 모든 섹션은 다음과 같습니다.

| 섹션           | 항목                                                                                    |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## 툴바 숨기기 {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="툴바 없음..." />

## 커스텀 툴바 컴포넌트 {#custom-toolbar-components}

`customExtensions` prop으로 직접 만든 버튼을 추가합니다. 각 항목은 [툴바 섹션](/ko/api/types#section)입니다. 기존 그룹에 버튼을 합치려면 내장 섹션 이름(`misc`, `media` 등)을, 내장 섹션 뒤에 별도 그룹으로 표시하려면 새 이름을 사용하세요.

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

커스텀 컴포넌트는 `<Tiptapify>` 안에서 렌더링되므로 내장 버튼과 같은 공유 값, 즉 에디터, 번역, 에디터 수준 설정에 접근할 수 있습니다.

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()`는 에디터 수준 설정(`variantBtn`, `variantField`)을 반환하므로 커스텀 컴포넌트가 내장 툴바의 스타일에 자동으로 맞춰집니다.
- 하위 호환성을 위해 `variantBtn` prop은 여전히 모든 툴바 컴포넌트에 전달됩니다. 공유 설정 이전에 작성된 컴포넌트도 그대로 동작합니다.
- `inject('tiptapifyI18n')`은 내장 버튼이 사용하는 것과 같은 번역 함수를 제공합니다.
