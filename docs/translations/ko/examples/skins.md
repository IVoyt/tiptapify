# 스킨 {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

`skin` prop은 툴바, 버블 메뉴, 드롭다운, 대화상자 등 에디터 UI의 외관을 선택합니다.
기능은 어떤 스킨에서도 동일하게 동작합니다. 개념, 토큰 표, 레시피는
[스킨 가이드](/ko/guide/skins)에 있습니다.

## 클래식 (기본값) {#classic-default}

입체감 있는 툴바, 입체 상자 형태의 버튼 그룹, 카드 스타일의 버블 메뉴입니다.

<InteractiveEditor :bubble-menu="true" placeholder="클래식 스킨..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## 파스텔 {#pastel}

가는 선 아래에 놓인 평평하고 색조가 들어간 툴바, 눌림 상태가 중립적인 고스트 버튼, 가벼운 드롭다운:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="파스텔 스킨..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## 커스텀: 민트 {#custom-mint}

`registerSkin`은 레지스트리에 이름을 추가합니다. 이 스킨은 `pastel`을 확장하여 몇 가지 토큰만 덮어씁니다. 툴바 배경은 민트 색조로, 이미지 윤곽선과 크기 조절 핸들은 짙은 녹색으로 바꿉니다. 차분한 형태는 pastel에서 그대로 이어받고, 덮어쓰지 않은 모든 것(버튼 상태, 메뉴, 대화상자)은 pastel 값을 유지합니다.

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="민트 스킨..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

에디터 루트에는 `tiptapify-skin-mint` 클래스가 붙습니다. 토큰 카탈로그가 다루지 않는 영역을 위한 탈출구입니다([탈출구](/ko/guide/skins#escape-hatch-the-root-class) 참고).

## 인라인 스킨 {#inline-skin}

`skin` prop은 객체도 받습니다. 토큰 덮어쓰기와 형태 플래그를 담고, `extends`로 등록된 스킨을 상속합니다. 같은 체인으로 해석되지만 레지스트리에는 등록되지 않으며, `tiptapify-skin-inline` 클래스(객체에 `name`이 있으면 `tiptapify-skin-{name}`)로 렌더링됩니다. 토큰은 에디터 루트의 `--tf-*` CSS 변수로 적용됩니다.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
