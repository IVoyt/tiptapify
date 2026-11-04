# 스킨 {#skins}

**스킨**은 에디터 UI의 한 가지 외관입니다. 툴바, 그 안의 버튼과 그룹, 버블 메뉴, 드롭다운 메뉴, 대화상자, 콘텐츠를 둘러싼 프레임, 이미지 선택 UI가 여기에 포함됩니다. `skin` prop으로 선택합니다.

```vue
<Tiptapify skin="pastel" />
```

스킨은 **토큰**(CSS 변수로 표현한 색상과 크기)과 **형태**(토큰으로는 표현할 수 없는 구조적 변형) 두 가지로 이루어집니다. 기본 제공 스킨은 `default`(클래식한 모습, 도드라진 버튼 그룹을 가진 도드라진 툴바)와 차분한 모습의 `pastel` 두 가지입니다. 커스텀 스킨도 동등하게 취급됩니다. `registerSkin()`과 인라인 스킨 객체는 완전히 같은 방식으로 처리되며, 기본 제공 스킨 역시 특별한 경우가 아니라 등록된 스킨입니다.

## 용어: 스킨과 Vuetify 테마 {#terminology-skin-vs-vuetify-theme}

- **skin** — 에디터 UI의 한 가지 외관(토큰 + shape)을 가리키는 사용자용 용어입니다. prop은 `skin`, 타입은 `TiptapifySkin*`, 레지스트리는 `registerSkin()`, 루트 클래스는 `tiptapify-skin-{name}`입니다.
- **theme** — Vuetify의 라이트/다크 테마 전용으로 남겨 둔 용어입니다. Tiptapify 컴포넌트는 `theme` prop에 Vuetify의 현재 테마 이름을 계속 전달하며, 스킨 시스템은 이를 전혀 건드리지 않습니다.

둘은 함께 동작합니다. 내장 토큰 색상 대부분이 Vuetify 테마 변수(`rgb(var(--v-theme-surface))`, …)를 참조하므로 스킨은 라이트/다크를 자동으로 따릅니다. classic 열에서 어두운 색으로 고정된 셀, 즉 크기 조절 핸들(`rgba(0, 0, 0, .5/.8)`), 기본 이미지 윤곽선, 버블 그림자, 메뉴/대화상자의 엘리베이션 그림자는 의도된 것입니다. 클래식 룩은 두 테마 모두에서 중립적인 어두운 UI를 그리며, 측정된 기준값이 이를 고정합니다. 커스텀 스킨은 테마 변수를 자유롭게 참조할 수 있습니다. 토큰 표를 참고하세요.

## 개념 {#concept}

### 토큰 {#tokens}

토큰은 `--tf-*`라는 이름의 CSS 사용자 정의 속성입니다. 카탈로그 키는 CSS 접미사의 camelCase 형태입니다: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. 값은 색상, 전체 border 단축 속성, 그림자, 패딩, 모서리 반경 같은 평범한 문자열입니다.

라이브러리의 모든 스킨 규칙은 **한 번만** 존재하며, 클래식(기본) 값과 같은 폴백을 두고 토큰을 읽습니다.

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

해석된 스킨은 **덮어쓴 값**만 변수로 출력하고, 기본값은 CSS 폴백이 담당합니다. 변수는 에디터 루트에 적용되며, 메뉴와 대화상자는 루트 밖으로 텔레포트되므로 각 메뉴의 `SkinScope` 래퍼와 대화상자 카드 자체에도 적용되어 토큰이 모든 표면을 따라갑니다.

### Shape(형태) {#shape}

여섯 개의 플래그가 어떤 규칙 집합을 적용할지 결정하고, 토큰이 그 규칙을 칠합니다.

| 플래그 | 값 | 전환 대상 |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar 엘리베이션 + 안쪽 헤어라인 없음 / 평평하고 옅은 색조의 바 |
| `groups` | `box` · `flat` | 툴바 섹션을 입체 **VBtnGroup** 상자로 표시(0.3.2 마크업: 버튼이 붙어 있고 그룹 토큰이 상자를 칠함) / 일반 flex div 나열 |
| `buttons` | `vuetify` · `quiet` | 기본 Vuetify 버튼 / 눌림 상태가 중립색인 고스트 버튼 |
| `bubble` | `card` · `flat` | 호환성을 위해 유지됨: 버블 메뉴는 두 shape 모두에서 토큰으로 칠한 아이콘 버튼 한 줄입니다(버튼은 `buttons`를 따름) |
| `dialog` | `classic` · `soft` | 제목 아래 구분선과 입체 닫기 버튼 / 부드러운 카드와 텍스트 닫기 버튼 |
| `menu` | `vuetify` · `soft` | 드롭다운 메뉴: Vuetify 목록 / 패딩이 있는 밝은 카드 |

해석된 shape는 에디터 루트에 여섯 개의 `.tiptapify-shape-{flag}-{value}` 클래스로 인코딩되며, 커스텀 툴바 컴포넌트를 위해 [`useTiptapifyConfig()`](/ko/api/types#usetiptapifyconfig)에 `shape: ComputedRef<ResolvedShape>`로 노출됩니다.

### Extends(확장) {#extends}

스킨은 클래식 기본값 위에서, 그다음 `extends` 체인의 루트부터 순서대로, 마지막으로 자신의 멤버 순으로 해석됩니다.

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

끊어진 연결은 지금까지 누적된 체인으로 해석되며(개발 모드 경고 포함), 순환은 classic으로 해석됩니다(개발 모드 경고 포함). 등록된 스킨은 이름으로 참조하며, 인라인 스킨 객체는 등록된 이름을 `extends`할 수 있지만 전역 레지스트리에는 들어가지 않습니다. 커스텀 스킨이 에디터 사이에 새어 나가는 일은 없습니다. 알 수 없는 토큰 키는 개발 모드 경고와 함께 무시됩니다.

세 가지 형태의 라이브 데모는 [스킨 예제 페이지](/ko/examples/skins)에 있습니다.

## 토큰 카탈로그 {#token-catalog}

아래 표는 **v1 규약**입니다. 카탈로그 키(`TiptapifySkinColors` / `TiptapifySkinMetrics`)가 설정할 수 있는 이름입니다. classic 셀은 CSS 폴백, 즉 어떤 스킨도 토큰을 덮어쓰지 않았을 때 기본 규칙이 그리는 값입니다.

### 툴바 / 바 {#toolbar-bar}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### 항목 / 그룹 / 구분선 {#items-groups-dividers}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify 엘리베이션 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px`(스페이서: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ 측정된 classic 셀은 `normal`로, Vuetify의 기본 flex 값이며 CSS 폴백이 담고 있는 값입니다. 카탈로그 기본값 `0px`은 스킨에서 덮어쓸 때 쓸 수 있는 동등한 명시적 길이입니다.

<a id="shadow-cells"></a>² "Vuetify 엘리베이션 *n*"이라고 적힌 셀은 설명용입니다. 정확한 3중 그림자 문자열은 커밋된 기준 픽스처(`src/skins/__fixtures__/skin-baseline.json`)에 있는 측정값이며 CSS 폴백입니다. `groupShadow`의 경우 **엘리베이션 2**(`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`)입니다. `groups: 'box'`에서는 섹션이 VBtnGroup(`elevation="4"`)이며, 토큰 규칙이 그룹 자체의 엘리베이션 위에 이 3중 그림자로 상자를 칠합니다. 엘리베이션은 상자가 가지고, 붙어 있는 자식 버튼에는 없습니다.

### 버튼 {#buttons}

이 토큰은 **`buttons: 'quiet'`에서만** 사용됩니다. [도달 가능성](#reachability)을 참고하세요.

| 토큰 | CSS 변수 | quiet 값(classic: 기본 Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### 버블 메뉴(선택, 빈 줄, 이미지) {#bubble-menus-selection-empty-line-image}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | 동일 |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | 동일 |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | 동일 |

### 드롭다운 메뉴 {#dropdown-menus}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify 엘리베이션 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ classic 메뉴의 **목록** 상자(반경, 그림자, 목록 패딩)는 현재 스킨 규칙입니다. `SkinScope` 토큰 래퍼가 Vuetify 자체의 자식 규칙과 목록 사이에 놓이기 때문에, 라이브러리가 위 토큰을 읽는 스킨 규칙으로 해당 픽셀을 복원합니다. **항목** 픽셀은 기본 Vuetify 그대로이며(픽스처가 그 부분의 Vuetify 기본값을 측정합니다), 네 개의 항목 토큰은 `menu: 'vuetify'`인 동안 동작하지 않습니다.

### 대화상자 {#dialogs}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard 엘리베이션 [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | 필드 기본값(`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### 프레임(에디터 테두리 래퍼) {#frame-editor-border-wrapper}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, 위쪽 가장자리 없음 | 전체 테두리 |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

평평한 툴바 shape에서는 프레임이 변의 방향별 차이(위쪽 가장자리, 그리고 border 불투명도 1.6배의 아래쪽 가장자리)도 칠합니다. 이 차이는 토큰이 아니라 shape에 속하므로 토큰으로는 도달할 수 없습니다.

### 이미지와 크기 조절 핸들 {#images-and-resize-handles}

| 토큰 | CSS 변수 | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (선택됨) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (호버) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

이미지 툴바는 `buttons` 플래그를 따릅니다. quiet shape에서는 quiet 표면이 적용되며, 2px/4px 간격은 이미지 메뉴 폴백과 함께 `--tf-bubble-gap` / `--tf-bubble-padding`을 읽습니다. 전용 이미지 툴바 토큰은 없습니다.

### 카탈로그에 없는 것(탈출구 영역) {#not-in-the-catalog-escape-hatch-territory}

디자인 개요에 언급된 일부 치수는 v1 카탈로그에 토큰이 없습니다: **툴바 높이, 프레임 너비, 프레임 반경, 버튼 너비, 버튼 패딩, 대화상자 너비**. 위의 카탈로그 표가 규약이며, 이 픽셀 값은 [탈출구](#escape-hatch-the-root-class)를 열어 안정적인 클래스를 직접 스타일링하세요.

## 도달 가능성 {#reachability}

위의 모든 그룹이 따르는 규약을 한 번만 정리하면 다음과 같습니다.

> 토큰은 shape가 해당 표면을 활성화할 때만 그 표면을 칠합니다. 기본 Vuetify 시각 요소는 Vuetify 테마 색상으로 스타일링됩니다.

그룹별로 보면 다음과 같습니다.

- **툴바, 프레임, 이미지/핸들 UI** — 모든 shape에서 활성입니다. 토큰이 이를 칠하며, classic 셀은 토큰이 폴백하는 기본 모습입니다.
- **그룹 상자**(`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — `groups: 'box'`에서는 섹션이 VBtnGroup(0.3.2 구조: 버튼이 붙어 있고 상자가 엘리베이션을 가짐)이며, 상자 규칙이 그룹 토큰으로 이를 칠합니다. `--tf-group-height`는 `!important`로 32px 규약을 유지합니다(0.3.2와 마찬가지로 Vuetify의 density 규칙이 이와 충돌합니다). `groups: 'flat'`에서는 섹션이 일반 div 나열입니다(투명, 그림자 없음, 반경 0이 shape의 기본값).
- **구분선 헤어라인**(`dividerWidth/Height/Color`) — 눈에 보이는 헤어라인은 `groups: 'flat'`의 기능입니다. box shape에서 구분선은 크기가 0인 스페이서입니다(기본 규칙의 `margin: 0 4px`).
- **항목 패딩/간격** — 촘촘한 `6px 8px` 나열은 평평한 바(`toolbar: 'flat'`)에, 그룹 간격은 평평한 섹션(`groups: 'flat'`)에 한정됩니다. 입체 바는 클래식 수치를 유지합니다.
- **버튼**(`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — `buttons: 'vuetify'`에서는 동작하지 않습니다. 기본 Vuetify 버튼이 자체 상태를 그리기 때문입니다. Vuetify 테마 색상(`primary`, `surface`, …)으로 스타일링하세요. 클래식 shape는 의도적으로 이 색상을 상속합니다.
- **메뉴 항목 수치**(`menuItemRadius/Padding/MinHeight/ActiveBg`) — `menu: 'vuetify'`에서는 동작하지 않으며, 해당 항목 픽셀은 Vuetify가 담당합니다. 메뉴 **목록** 상자(반경/그림자/패딩)는 두 shape 모두에서 스킨이 칠합니다([메뉴 각주](#menu-classic-note) 참고).
- **대화상자의 soft UI**(`dialogActionBtn*`, `dialogFieldRadius`, soft 패딩, 없어진 구분선) — `dialog: 'soft'`에서 칠해집니다. `dialog: 'classic'`에서는 대화상자가 클래식 패딩의 VCard입니다.
- **버블 UI** — 선택, 빈 줄, 이미지 메뉴는 두 shape 모두에서 아이콘 버튼 한 줄이며 버블 토큰이 칠합니다. `bubble`은 더 이상 마크업을 바꾸지 않습니다.

카탈로그 기본값과 같은 덮어쓰기는 **출력되지 않습니다**. classic이 아닌 shape에서는 shape 자체의 기본값이 CSS 폴백으로 칠해지므로, 클래식 값을 "복원"하는 것(예: `buttons: 'quiet'`에서 `buttonActiveBg`를 `rgb(var(--v-theme-primary))`로 되돌리기)은 아무 효과 없이 조용히 무시됩니다. classic이 아닌 shape에서 클래식처럼 보이는 값을 강제하려면 카탈로그 기본값과 다른 덮어쓰기를 지정하세요. `rgba(var(--v-theme-primary), 1)` 같은 동등한 리터럴은 똑같이 칠해지면서 생략되지 않습니다.

토큰은 의도적으로 기본 경로에 연결되지 않습니다. 모든 것이 카탈로그를 거치면서도 `default`가 클래식 룩과 픽셀 단위로 동일하게 유지되는 이유입니다.

## 레시피 {#recipes}

### pastel 확장 {#extend-pastel}

quiet shape를 상속하고 몇 가지 표면만 다시 칠합니다. 등록된 이름은 어떤 에디터에서든 사용할 수 있습니다.

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

shape(flat/quiet/soft)는 pastel에서 가져오고, 건드리지 않은 토큰은 pastel의 값을 유지합니다. quiet 버튼의 배경은 중립색으로 남고 덮어쓴 부분만 바뀝니다. 이 스킨은 [예제 페이지](/ko/examples/skins#custom-mint)에서 실시간으로 확인할 수 있습니다.

### default 확장 {#extend-default}

클래식 구조는 유지하고 색만 조정합니다.

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'`는 암묵적인 루트이므로 키를 생략할 수 있습니다. `{ toolbar: 'flat', … }`도 classic에서 시작합니다.

### 완전한 커스텀 {#full-custom}

`extends`도 등록도 필요 없습니다. 객체를 `skin` prop에 전달하고 shape 플래그와 토큰을 자유롭게 설정하세요. `name`을 지정하면 루트 클래스에 직접 정한 이름이 붙고(아래 참고), 없으면 `tiptapify-skin-inline`입니다.

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin`은 타입이 지정된 const 정의를 위한 항등 헬퍼입니다(레지스트리에 들어가지 않습니다). shape 플래그는 개별적으로 설정할 수 있으며, 생략한 플래그는 모두 classic으로 유지됩니다.

## 탈출구: 루트 클래스 {#escape-hatch-the-root-class}

모든 에디터 루트에는 `tiptapify-skin-{name}`(이름 없는 인라인 객체는 `tiptapify-skin-inline`)이 붙습니다. 라이브러리는 **스킨 이름을 기준으로 규칙을 만들지 않으므로** 이 클래스는 사용자의 것입니다.

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

스타일을 작성할 때 기준으로 삼을 수 있는 안정적인 훅은 다음과 같습니다.

| 클래스 | 위치 |
|---|---|
| `tiptapify-skin-{name}` | 에디터 루트 |
| `tiptapify-shape-{flag}-{value}` ×6 | 에디터 루트 — 해석된 shape |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | 툴바와 그 섹션 |
| `tiptapify-quiet-buttons` | `buttons: 'quiet'`일 때의 툴바 및 버블 루트 |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | 모든 버블 메뉴의 행과 그룹 사이의 헤어라인 |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | 선택, 빈 줄, 이미지 메뉴 행 |
| `tiptapify-btn--active` | 버블 메뉴에서 눌린 버튼(활성 마크, 이미지 float) |
| `tiptapify-menu` · `tiptapify-menu--soft` | 드롭다운 오버레이 콘텐츠이자 soft 메뉴 규칙의 매개체 |
| `tiptapify-skin-scope` | 텔레포트된 메뉴 안의 토큰 스코프 div |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | 대화상자 카드와 soft 매개체 |
| `tiptapify-frame` | 에디터 테두리 래퍼 |

**소비자 테마 방어.** 스킨 레이어는 Vuetify 내부에 패딩을 주고 다시 칠하는 관리자 테마에서도 살아남도록 만들어졌습니다. 규칙은 shape/매개체 클래스를 조건으로 하고, 특이도를 위해 중복 클래스(`.v-list.v-list`, `.v-btn.v-btn.v-btn`)를 사용하며, `!important`는 기준 커밋에서 관리자 테마 사례로 꼭 필요함이 입증된 곳(menu.css 방어 세트)에만 남겨 둡니다. 같은 환경에서 직접 작성한 덮어쓰기가 계속 동작하게 하는 규칙은 다음과 같습니다.

- CSS는 `.tiptapify-skin-{name}`(또는 shape 클래스) 아래로 범위를 한정하세요. Vuetify 내부 요소에 직접 적용하지 마세요.
- 카탈로그에 있는 치수는 토큰(`--tf-*`)을, 나머지는 클래스를 사용하세요.
- Vuetify 컴포넌트를 덮어쓸 때는 중복 방식을 맞추세요(`.v-list-item` 하나만으로는 스킨 규칙에 밀립니다).

## 시각 규약(기여자용 노트) {#visual-contract-contributor-note}

내장 스킨의 계산된 스타일은 기준 픽스처 `src/skins/__fixtures__/skin-baseline.json`(13개 섹션 × 라이트/다크)으로 고정되어 있으며, 측정된 매트릭스가 이와 일치하면 CSS 레이어가 완성된 것입니다. 픽스처를 읽을 때의 참고 사항은 다음과 같습니다.

- 호버/활성 치수는 페이지에서 강제로 만들 수 없으므로, 기록 단계에서는 각 호버 셀렉터의 **첫 번째로 일치한 CSSOM 규칙의 선언 텍스트**를 읽어 스킨 루트 안의 프로브 요소로 해석합니다(`resolved` 필드). 이는 실제 `:hover` 스냅샷이 아니라 우선 적용되는 규칙의 규약입니다.
- `_meta.selectors.menu`는 `SkinScope` 도입 이전의 셀렉터 텍스트를 기록합니다. 픽스처는 동결되어 있으므로(규범 값) 이 필드는 의도적으로 오래된 상태이며, 기록 번들이 현재 셀렉터를 고정합니다.
- 픽스처는 승인된 변경 사항을 `_meta.notes`에 담고 있습니다. 2026-10-18에 `groups: 'box'`에서 VBtnGroup 마크업을 복원하면서 classic `groupBtn`/`buttonsActive` 자식 버튼 필드(맞닿은 모서리, 엘리베이션은 상자가 소유)를 다시 측정했습니다. pastel 필드는 건드리지 않았습니다. 의도적인 시각 변경은 영향받는 classic 셀만 갱신하고, 노트를 기록하며, CHANGELOG 한 줄과 함께 배포합니다.

## 함께 보기 {#see-also}

- [스킨 예제](/ko/examples/skins) — classic, pastel, 커스텀 mint 스킨을 실시간으로 확인합니다.
- [`skin` prop](/ko/api/props#skin) · [스킨 타입](/ko/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/ko/api/types#tiptapifyskininput)
