# 콘텐츠 스타일 {#content-styles}

에디터가 저장하는 내용 중 일부는 이를 보여 주는 페이지에서 고유한 모양이 필요합니다. 링크 카드, 캡션과 float가 있는 이미지, 본문 너비에 맞는 동영상과 임베드, 항목마다 체크박스가 있는 작업 목록 등이 그렇습니다. 이것이 없으면 링크 카드는 이미지와 텍스트가 뒤섞인 평범한 링크가 됩니다.

`contentStyles` prop은 저장된 HTML이 그 모양을 어떻게 담을지 정합니다.

| `contentStyles` | 저장된 HTML | 사이트에서 |
|---|---|---|
| `inline`(기본값) | 모양이 이 요소들의 `style` 속성에 기록됨 | 불러올 것이 없음: HTML이 그대로 표시됨 |
| `classes` | 클래스와 `data-` 속성만 | `tiptapify/content.css`를 불러오고 HTML을 `tiptapify-content` 클래스가 있는 요소에 넣음 |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

둘 다 같은 규칙, 즉 에디터 자체가 콘텐츠를 보여 줄 때 쓰는 규칙을 담고 있으므로 어느 쪽이든 페이지는 에디터와 똑같이 보입니다. 이 규칙은 해당 요소에만 적용됩니다. 제목, 단락, 목록, 표 등 나머지 텍스트에는 사이트 고유의 스타일이 그대로 쓰입니다.

## 인라인 스타일 {#inline-styles}

기본 방식입니다. 컴팩트 링크 카드는 다음과 같이 저장됩니다.

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **색상은 사이트의 것을 따릅니다.** 텍스트는 색상을 상속하고, 흐린 텍스트와 테두리는 불투명도와 반투명 회색을 사용하므로 밝은 페이지와 어두운 페이지 모두에서 잘 동작합니다. 테마별 텍스트 색상은 평소처럼 사이트에서 설정하세요.
- **미디어 쿼리가 필요 없습니다.** 컴팩트 카드는 좁은 칼럼에서 이미지를 텍스트 위에 알아서 배치하며, 동영상과 임베드는 본문보다 넓어지지 않습니다.
- **사이트에서 다시 스타일을 지정할 수도 있습니다**. 클래스는 그대로 남아 있습니다. 인라인 스타일은 클래스 규칙보다 우선하므로 이런 규칙에는 `!important`가 필요합니다.
- **새니타이저는 이 요소들의 `style` 속성을 유지해야 합니다**. 그렇지 않으면 모양을 잃습니다.

## 클래스와 content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css`는 작고 Vue나 Vuetify가 들어 있지 않습니다. 규칙이 `:where(.tiptapify-content)`로 감싸져 있어 우선순위가 0이므로, 사이트의 어떤 규칙이든 `!important` 없이 이를 덮어씁니다. 사이트에서 모양을 한곳에서 관리하고 싶거나 콘텐츠를 직접 스타일링할 때 사용하세요.

`contentCss(scope)`는 `tiptapify-content`가 아닌 다른 클래스를 위해 같은 스타일시트를 문자열로 돌려줍니다.

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML 다시 불러오기 {#loading-html-back}

에디터는 이 요소들을 속성과 클래스만으로 읽습니다. 링크 카드는 `data-link-card`, 이미지는 `src`와 크기, float, 작업은 `data-checked`로 읽습니다. 인라인 스타일은 HTML을 불러올 때 무시되고 저장할 때 다시 기록됩니다. 그래서 같은 HTML이 바뀌지 않고 오갈 수 있으며, `inline`으로 저장한 문서를 `classes`로 문제없이 불러올 수 있고 그 반대도 마찬가지입니다. 또한 에디터의 이후 버전은 문서를 다음에 저장할 때 모양을 갱신합니다.

텍스트 서식은 건드리지 않습니다. 텍스트의 색상이나 크기, 단락 정렬은 콘텐츠이며, 에디터는 계속 해당 스타일에서 읽어 옵니다.

클래스 기반 HTML을 에디터 밖에서(오래된 문서, 이메일 등) 인라인 스타일 HTML로 바꾸려면 `inlineContentStyles`를 사용하세요.

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

DOM(브라우저, 또는 서버의 jsdom)이 필요하며, DOM이 없으면 HTML을 그대로 돌려줍니다.

## 이미지 슬라이더 {#image-sliders}

에디터는 작성 중에 나란히 놓인 이미지를 슬라이더로 표시합니다(`imageSlider` prop 참고). 저장된 HTML에서는 이들이 차례로 이어지는 figure로 남습니다. 슬라이더로 보여 줄지는 사이트 고유의 스크립트에 달려 있습니다.
