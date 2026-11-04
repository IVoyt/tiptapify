<script setup>
</script>

# Tiptapify {#tiptapify}

**Vuetify 3 툴바를 구현한 Vue 3용 Tiptap 3 리치 텍스트 에디터**

::: info 베타 상태
이 프로젝트는 현재 **베타** 단계입니다. 기능은 모두 갖추었지만 아직 수정해야 할 버그가 남아 있을 수 있습니다.
:::

## 주요 기능 {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 컴포넌트</h3>
    <p>Vuetify 3 컴포넌트만으로 구현한 아름다운 Material Design 툴바</p>
  </div>
  <div class="feature">
    <h3>30개 이상의 확장</h3>
    <p>리치 텍스트 서식, 미디어 임베드, 표, 구문 강조가 적용된 코드 블록</p>
  </div>
  <div class="feature">
    <h3>슬래시 명령</h3>
    <p><code>/</code>를 입력하면 제목, 목록, 미디어 등을 빠르게 삽입하는 메뉴가 열립니다</p>
  </div>
  <div class="feature">
    <h3>다국어 지원</h3>
    <p>vue-i18n을 통해 20개 이상의 언어를 지원합니다</p>
  </div>
  <div class="feature">
    <h3>다크 테마</h3>
    <p>Vuetify 테마와 연동되는 다크/라이트 모드를 자동으로 지원합니다</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>모든 툴바 항목과 props의 타입을 내보내는 완전한 TypeScript 지원</p>
  </div>
</div>

## 빠른 시작 {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip 피어 의존성
Tiptapify를 사용하려면 피어 의존성으로 **Vue 3.x**, **Vuetify 3.x 또는 4.x**, **vue-i18n 11+**, **@mdi/js**가 필요합니다. 전체 설정은 [설치 가이드](/ko/guide/installation)를 참고하세요.
:::

## 라이선스 {#license}

MIT — [GitHub 저장소](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
