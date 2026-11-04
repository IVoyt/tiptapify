# Temalar {#skins}

**Tema** (skin), düzenleyici arayüzünün tek bir görünümüdür: araç çubuğu, içindeki düğmeler ve gruplar, balon menüler, açılır menüler, diyaloglar, içeriğin etrafındaki çerçeve ve görsel seçim arayüzü. `skin` prop'u onu seçer:

```vue
<Tiptapify skin="pastel" />
```

Bir skin iki şeyden oluşur: **token'lar** (CSS değişkenleri olarak renkler ve boyutlar) ve **şekil** (token'ın ifade edemediği yapısal varyantlar). İki yerleşik skin `default` — klasik görünüm, yükseltilmiş düğme gruplarına sahip yükseltilmiş bir araç çubuğu — ve sakin görünümlü `pastel`'dir. Özel skin'ler birinci sınıf desteklenir: `registerSkin()` ve satır içi skin nesneleri tamamen aynı mekanizmayla çözümlenir; yerleşik skin'ler de özel durum değil, kayıtlı skin'lerdir.

## Terminoloji: skin ve Vuetify theme {#terminology-skin-vs-vuetify-theme}

- **skin** — düzenleyici arayüzünün tek bir görünümü için kullanıcıya dönük terim: token'lar + biçim. Prop `skin`, tipler `TiptapifySkin*`, kayıt defteri `registerSkin()`, kök sınıf `tiptapify-skin-{name}`.
- **theme** — Vuetify'ın açık/koyu temaları için ayrılmıştır. Tiptapify bileşenleri `theme` prop'larını Vuetify'ın geçerli tema adından alır; skin sistemi onlara hiç dokunmaz.

Birlikte çalışırlar: yerleşik token renklerinin çoğu Vuetify tema değişkenlerine başvurur (`rgb(var(--v-theme-surface))`, …), böylece temalar açık/koyu moda otomatik uyar. Classic sütunundaki sabit koyu hücreler — yeniden boyutlandırma tutamacı (`rgba(0, 0, 0, .5/.8)`), düz görsel çerçevesi, balon gölgesi ve menü/diyalog yükselti gölgeleri — bilinçlidir: klasik görünüm her iki temada da nötr koyu bir arayüz boyar ve ölçülen taban çizgi bunları sabitler. Özel bir tema tema değişkenlerine özgürce başvurabilir — token tablosuna bakın.

## Kavram {#concept}

### Token'lar {#tokens}

Token, `--tf-*` adlı bir CSS özel özelliğidir. Katalog anahtarı, CSS son ekinin camelCase halidir: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Değerler düz dizelerdir — renkler, tam kenarlık kısaltmaları, gölgeler, dolgular, yarıçaplar.

Kütüphanedeki her tema kuralı **bir kez** bulunur ve token'ını klasik (taban) değere eşit bir yedekle okur:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Çözümlenmiş bir tema yalnızca **geçersiz kılmalarını** değişken olarak yayımlar; CSS yedekleri tabanı taşır. Değişkenler düzenleyici köküne — ve menüler ile diyaloglar ondan dışarı ışınlandığı için, her menünün `SkinScope` sarmalayıcısına ve diyalog kartının kendisine — yerleşir; böylece token'lar her yüzeyi izler.

### Biçim {#shape}

Altı bayrak hangi kural kümelerinin uygulanacağını belirler; token'lar onları boyar:

| bayrak | değerler | neyi değiştirir |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar yükseltisi + iç ince çizgi yok / düz renk tonlu çubuk |
| `groups` | `box` · `flat` | araç çubuğu bölümleri yükseltilmiş **VBtnGroup** kutuları olarak (0.3.2 işaretlemesi: birleşik düğmeler, kutuyu grup token'ları boyar) / düz flex div dizileri |
| `buttons` | `vuetify` · `quiet` | yerel Vuetify düğmeleri / nötr basılı durumlu hayalet düğmeler |
| `bubble` | `card` · `flat` | uyumluluk için korunur: balon menüler her iki biçimde de token ile boyanan tek sıra ikon düğmesidir (düğmeleri `buttons` değerini izler) |
| `dialog` | `classic` · `soft` | başlığın altında ayırıcı, yükseltilmiş kapat düğmesi / yumuşak kart, metin kapat düğmesi |
| `menu` | `vuetify` · `soft` | açılır menüler: Vuetify listesi / açık renkli dolgulu kart |

Çözümlenen biçim, düzenleyici kökünde altı `.tiptapify-shape-{flag}-{value}` sınıfı olarak kodlanır ve özel araç çubuğu bileşenleri için [`useTiptapifyConfig()`](/tr/api/types#usetiptapifyconfig) üzerinde `shape: ComputedRef<ResolvedShape>` olarak sunulur.

### Extends {#extends}

Bir tema önce klasik tabanın üzerinden, sonra `extends` zincirinden kökten başlayarak, sonra kendi üyeleriyle çözümlenir:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Eksik halkalar birikmiş zincire çözümlenir (geliştirme uyarısıyla); bir döngü klasiğe çözümlenir (geliştirme uyarısıyla). Kayıtlı bir tema adıyla başvurulur; satır içi bir tema nesnesi kayıtlı bir adı `extends` edebilir ve genel kayıt defterine hiç girmez — özel temalar düzenleyiciler arasında sızmaz. Bilinmeyen token anahtarları geliştirme uyarısıyla yok sayılır.

Üç biçimin canlı demoları [Temalar örnekleri sayfasındadır](/tr/examples/skins).

## Token kataloğu {#token-catalog}

Aşağıdaki tablolar **v1 sözleşmesidir**: katalog anahtarları (`TiptapifySkinColors` / `TiptapifySkinMetrics`) ayarlayabileceğiniz adlardır. Classic hücreleri CSS yedekleridir — hiçbir tema token'ı geçersiz kılmadığında taban kuralların boyadığı değer.

### Araç çubuğu / çubuk {#toolbar-bar}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Öğeler / gruplar / ayırıcılar {#items-groups-dividers}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify yükselti 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (ara parça: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Ölçülen classic hücresi `normal`'dir — Vuetify'ın yerel flex değeri; CSS yedeğinin taşıdığı değer budur. Katalog taban değeri `0px`, tema geçersiz kılmaları için eşdeğer açık uzunluktur.

<a id="shadow-cells"></a>² "Vuetify yükselti *n*" yazan hücreler açıklayıcıdır: tam üçlü gölge dizesi, işlenmiş taban çizgi fixture'ındaki (`src/skins/__fixtures__/skin-baseline.json`) ölçülen değerdir ve CSS yedeğidir. `groupShadow` için bu **yükselti 2**'dir (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — `groups: 'box'` altında bölüm bir VBtnGroup'tur (`elevation="4"`) ve token kuralı kutuyu grubun kendi yükseltisinin üzerine bu üçlüyle boyar: yükselti kutuya aittir, birleşik alt düğmeler yükselti taşımaz.

### Düğmeler {#buttons}

Bu token'lar **yalnızca `buttons: 'quiet'` altında** kullanılır — bkz. [Erişilebilirlik](#reachability).

| token | CSS değişkeni | quiet değeri (classic: yerel Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Balon menüler (seçim, boş satır, görsel) {#bubble-menus-selection-empty-line-image}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | aynı |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | aynı |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | aynı |

### Açılır menüler {#dropdown-menus}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify yükselti 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Klasik menünün **liste** kutusu (yarıçap, gölge, liste dolgusu) bugün bir tema kuralıdır — `SkinScope` token sarmalayıcısı Vuetify'ın kendi alt kuralı ile liste arasında durur; bu yüzden kütüphane bu pikselleri yukarıdaki token'ları okuyan tema kuralları olarak geri yükler. **Öğe** pikselleri yerel Vuetify olarak kalır (fixture orada Vuetify varsayılanlarını ölçer): dört öğe token'ı `menu: 'vuetify'` iken etkisizdir.

### Diyaloglar {#dialogs}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard yükselti [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | alan varsayılanı (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Çerçeve (düzenleyici kenarlık sarmalayıcısı) {#frame-editor-border-wrapper}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, üst kenar yok | tam kenarlık |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Düz araç çubuğu biçimi altında çerçeve ayrıca kenar başına bir fark da boyar (bir üst kenar ve 1,6× kenarlık opaklığında alt kenar). Bu fark token'a değil biçime aittir: token ile erişilemez.

### Görseller ve yeniden boyutlandırma tutamaçları {#images-and-resize-handles}

| token | CSS değişkeni | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (seçili) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (üzerine gelince) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Görsel araç çubuğu `buttons` bayrağını izler: sakin biçim altında sakin yüzeyi alır — 2px/4px boşlukları görsel menüsü yedekleriyle `--tf-bubble-gap` / `--tf-bubble-padding` değerlerini okur; ayrılmış bir görsel araç çubuğu token'ı yoktur.

### Katalogda yok (kaçış yolu alanı) {#not-in-the-catalog-escape-hatch-territory}

Tasarım genel bakışında adı geçen bazı boyutların v1'de katalog token'ı yoktur: **araç çubuğu yüksekliği, çerçeve genişliği, çerçeve yarıçapı, düğme genişliği, düğme dolgusu, diyalog genişliği**. Yukarıdaki katalog tabloları sözleşmedir; bu pikseller için [kaçış yolunu](#escape-hatch-the-root-class) açın ve kararlı sınıfları doğrudan biçimlendirin.

## Erişilebilirlik {#reachability}

Bir kez belirtilen ve yukarıdaki her grubun uyduğu sözleşme:

> Bir token, bir yüzeyi yalnızca biçim o yüzeyi etkinleştirdiğinde boyar; yerel Vuetify görselleri Vuetify tema renkleriyle biçimlendirilir.

Grup başına:

- **Araç çubuğu, çerçeve, görsel/tutamaç arayüzü** — her biçimde etkindir; token'lar onları boyar, classic hücreleri token'ların geri döndüğü yerel görünümdür.
- **Grup kutusu** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — `groups: 'box'` altında bölüm bir VBtnGroup'tur (0.3.2 yapısı: düğmeler birleşir, yükseltiyi kutu taşır); kutu kuralları onu grup token'larıyla boyar ve `--tf-group-height`, 32px sözleşmesini bir `!important` ile korur (Vuetify'ın yoğunluk kuralı 0.3.2'de olduğu gibi buna karşı çıkar). `groups: 'flat'` altında bölümler düz div dizileridir (saydam, gölgesiz, yarıçap 0 biçimin tabanıdır).
- **Ayırıcı ince çizgiler** (`dividerWidth/Height/Color`) — görünür ince çizgi bir `groups: 'flat'` olanağıdır; kutu biçiminde ayırıcı sıfır boyutlu bir ara parçadır (taban kuraldan `margin: 0 4px`).
- **Öğe dolgusu/boşlukları** — kompakt `6px 8px` dizisi düz çubuğa (`toolbar: 'flat'`), grup boşlukları düz bölümlere (`groups: 'flat'`) bağlıdır; yükseltilmiş çubuk klasik ölçüleri korur.
- **Düğmeler** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — `buttons: 'vuetify'` altında etkisizdir: yerel Vuetify düğmeleri kendi durumlarını boyar. Onları Vuetify tema renkleriyle (`primary`, `surface`, …) biçimlendirin — klasik biçimler bunları bilerek miras alır.
- **Menü öğesi ölçüleri** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — `menu: 'vuetify'` altında etkisizdir; bu öğe piksellerinin sahibi Vuetify'dır. Menü **liste** kutusu (yarıçap/gölge/dolgu) her iki biçimde de tema tarafından boyanır ([menü notuna](#menu-classic-note) bakın).
- **Diyalog yumuşak arayüzü** (`dialogActionBtn*`, `dialogFieldRadius`, yumuşak dolgular, eksik ayırıcı) — `dialog: 'soft'` altında boyanır; `dialog: 'classic'` altında diyalog klasik dolgulara sahip bir VCard'dır.
- **Balon arayüzü** — seçim, boş satır ve görsel menüleri her iki biçimde de balon token'larıyla boyanan tek sıra ikon düğmesidir; `bubble` artık işaretlemelerini değiştirmez.

Katalog tabanına eşit bir geçersiz kılma **yayımlanmaz** — klasik olmayan bir biçim altında biçimin kendi tabanı CSS yedeğiyle boyar; bu yüzden bir klasik değeri "geri yüklemek" (örneğin `buttons: 'quiet'` altında `buttonActiveBg` değerini `rgb(var(--v-theme-primary))` olarak geri ayarlamak) sessizce hiçbir şey yapmaz. Klasik olmayan bir biçim altında klasik görünümlü bir değeri zorlamak için katalog tabanından farklı bir geçersiz kılma ayarlayın — `rgba(var(--v-theme-primary), 1)` gibi eşdeğer bir değişmez, aynı şekilde boyar ve atlamadan kurtulur.

Token'lar yerel yollara bilerek bağlanmaz — her şey kataloğa yönlenirken `default` temasının klasik görünümle piksel piksel aynı kalmasını sağlayan budur.

## Tarifler {#recipes}

### pastel'i genişletme {#extend-pastel}

Sakin biçimi miras alın ve birkaç yüzeyi yeniden boyayın. Kayıtlı adlar her düzenleyicide çalışır:

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

Biçim (flat/quiet/soft) pastel'den gelir; dokunulmayan token'lar pastel'in değerlerini korur — sakin düğme tonu nötr kalır, yalnızca geçersiz kıldığınız şey değişir. Bu, [örnekler sayfasında](/tr/examples/skins#custom-mint) canlı işlenen temadır.

### default'u genişletme {#extend-default}

Klasik yapıyı koruyun, boyayı ayarlayın:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` örtük köktür, bu yüzden anahtar atlanabilir: `{ toolbar: 'flat', … }` de klasikten başlar.

### Tam özel {#full-custom}

`extends` yok, kayıt yok: nesneyi `skin` prop'una verin ve biçim bayraklarını ile token'ları özgürce ayarlayın. Bir `name`, kök sınıfa kendi etiketinizi koyar (aşağıya bakın); olmadan `tiptapify-skin-inline` olur.

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

`defineSkin`, tiplenmiş sabit tanımlar için bir özdeşlik yardımcısıdır (hiçbir kayıt defterine girmez). Biçim bayrakları tek tek ayarlanabilir — atladığınız her bayrak klasik kalır.

## Kaçış yolu: kök sınıf {#escape-hatch-the-root-class}

Her düzenleyici kökü `tiptapify-skin-{name}` sınıfını taşır (adsız satır içi bir nesne için `tiptapify-skin-inline`). Kütüphane **hiçbir kuralı bir tema adına bağlamaz** — sınıf sizindir:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Üzerine yazı yazılabilecek kararlı kancalar:

| sınıf | nerede |
|---|---|
| `tiptapify-skin-{name}` | düzenleyici kökü |
| `tiptapify-shape-{flag}-{value}` ×6 | düzenleyici kökü — çözümlenen biçim |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | araç çubuğu ve bölümleri |
| `tiptapify-quiet-buttons` | `buttons: 'quiet'` altında araç çubuğu ve balon kökleri |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | her balon menünün satırı ve grupları arasındaki ince çizgi |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | seçim, boş satır ve görsel menüsü satırları |
| `tiptapify-btn--active` | bir balon menünün basılı düğmesi (etkin bir işaret, görsel yüzdürme) |
| `tiptapify-menu` · `tiptapify-menu--soft` | açılır menü katman içeriği, yumuşak menü kurallarının taşıyıcısı |
| `tiptapify-skin-scope` | ışınlanan menülerin içindeki token kapsam div'i |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | diyalog kartı ve yumuşak taşıyıcısı |
| `tiptapify-frame` | düzenleyici kenarlık sarmalayıcısı |

**Tüketici teması savunması.** Tema katmanı, Vuetify iç yapılarına dolgu ekleyen ve onları yeniden boyayan yönetici temalarından sağ çıkacak şekilde tasarlanmıştır: kurallar biçim/taşıyıcı sınıflarına bağlanır, özgüllük için ikiye katlanmış sınıflar (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) kullanır ve `!important` değerini yalnızca temel commit'in yönetici teması durumunun gerekli olduğunu kanıtladığı yerde (menu.css savunma kümesi) tutar. Kendi geçersiz kılmalarınızın aynı savaş alanında çalışmaya devam etmesini sağlayan kurallar:

- CSS'inizi `.tiptapify-skin-{name}` (veya bir biçim sınıfı) altında kapsamlandırın — çıplak Vuetify iç yapılarına asla uygulamayın;
- katalog boyutları için token'ları (`--tf-*`), geri kalanı için sınıfları tercih edin;
- Vuetify bileşenlerini geçersiz kılarken ikiye katlamayı eşleştirin (tek bir `.v-list-item`, tema kurallarına yenilir).

## Görsel sözleşme (katkıda bulunanlar için not) {#visual-contract-contributor-note}

Yerleşik temaların hesaplanmış stilleri `src/skins/__fixtures__/skin-baseline.json` taban çizgi fixture'ı ile sabitlenir (13 bölüm × açık/koyu): ölçülen matris onunla eşleştiğinde CSS katmanı tamamdır. Fixture için okuma notları:

- Üzerine gelme/etkin boyutlar sayfadan zorlanamaz, bu yüzden kayıt her üzerine gelme seçicisi için **ilk eşleşen CSSOM kuralının bildirim metnini** okur ve onu tema kökü içindeki bir prob öğesi üzerinden çözümler (`resolved` alanı) — canlı bir `:hover` anlık görüntüsü değil, kazanan kuralın sözleşmesidir.
- `_meta.selectors.menu`, `SkinScope` öncesi seçici metnini kaydeder. Fixture dondurulmuştur (normatif değerler), bu yüzden alan bilerek eskidir; kayıt paketi güncel seçiciyi sabitler.
- Fixture onaylanmış değişikliklerini `_meta.notes` içinde taşır: `groups: 'box'` altında VBtnGroup işaretlemesinin 18.10.2026'daki geri yüklenmesi, klasik `groupBtn`/`buttonsActive` alt düğme alanlarını yeniden ölçtü (birleşik köşeler, yükseltiyi kutu taşır). Pastel alanlarına dokunulmamıştır — bilinçli bir görsel değişiklik yalnızca etkilenen classic hücrelerini günceller, bir not kaydeder ve bir CHANGELOG satırıyla yayımlanır.

## Ayrıca bakın {#see-also}

- [Temalar örnekleri](/tr/examples/skins) — classic, pastel ve özel mint teması, canlı.
- [`skin` prop'u](/tr/api/props#skin) · [tema tipleri](/tr/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/tr/api/types#tiptapifyskininput).
