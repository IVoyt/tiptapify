# Skins {#skins}

Uma **skin** é um aspeto do cromado do editor: a barra de ferramentas, os botões e grupos nela contidos, os menus flutuantes, os menus pendentes, os diálogos, a moldura à volta do conteúdo e o cromado de seleção de imagens. A prop `skin` seleciona-a:

```vue
<Tiptapify skin="pastel" />
```

Uma skin é feita de duas coisas: **tokens** (cores e tamanhos como variáveis CSS) e **forma** (variantes estruturais que um token não consegue exprimir). As duas skins incorporadas são `default` — o aspeto clássico, uma barra de ferramentas elevada com grupos de botões elevados — e `pastel`, o aspeto discreto. As skins personalizadas são de primeira classe: `registerSkin()` e os objetos de skin em linha são resolvidos exatamente pelo mesmo mecanismo, e as skins incorporadas são skins registadas, não casos especiais.

## Terminologia: skin vs tema do Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — o termo, voltado para o utilizador, para um aspeto do cromado do editor: tokens + forma. A prop é `skin`, os tipos são `TiptapifySkin*`, o registo é `registerSkin()` e a classe da raiz é `tiptapify-skin-{name}`.
- **tema** — reservado para os temas claro/escuro do Vuetify. Os componentes do Tiptapify mantêm as suas props `theme` alimentadas pelo nome do tema atual do Vuetify; o sistema de skins nunca lhes toca.

Combinam-se: a maioria das cores de token integradas referencia variáveis do tema do Vuetify (`rgb(var(--v-theme-surface))`, …), pelo que as skins acompanham automaticamente o modo claro/escuro. As células de cor escura fixa na coluna clássica — a alça de redimensionamento (`rgba(0, 0, 0, .5/.8)`), o contorno simples da imagem, a sombra do menu flutuante e as sombras de elevação dos menus/diálogos — são deliberadas: o aspeto clássico pinta um cromado escuro neutro nos dois temas, e a base de referência medida fixa-as. Uma skin personalizada pode referenciar livremente as variáveis do tema — consulte a tabela de tokens.

## Conceito {#concept}

### Tokens {#tokens}

Um token é uma propriedade personalizada CSS com o nome `--tf-*`. A chave do catálogo é o camelCase do sufixo CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Os valores são strings simples — cores, abreviaturas completas de contorno, sombras, preenchimentos, raios.

Cada regra de skin da biblioteca existe **uma só vez**, lendo o seu token com um valor de recurso igual ao valor clássico (base):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Uma skin resolvida emite como variáveis apenas as suas **substituições**; os valores de recurso do CSS transportam a base. As variáveis são aplicadas na raiz do editor — e, como os menus e diálogos são teletransportados para fora dela, no invólucro `SkinScope` de cada menu e no próprio cartão do diálogo, para que os tokens acompanhem todas as superfícies.

### Forma {#shape}

Seis flags decidem que conjuntos de regras se aplicam; os tokens pintam-nos:

| flag | valores | o que alterna |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevação do VToolbar + sem linha fina interior vs barra plana tingida |
| `groups` | `box` · `flat` | secções da barra de ferramentas como caixas **VBtnGroup** elevadas (marcação da 0.3.2: botões unidos, os tokens de grupo pintam a caixa) vs simples sequências de divs flex |
| `buttons` | `vuetify` · `quiet` | botões Vuetify nativos vs botões fantasma com um estado premido neutro |
| `bubble` | `card` · `flat` | mantida por compatibilidade: os menus flutuantes de seleção são uma linha de botões de ícones pintada por tokens nas duas formas (os seus botões seguem `buttons`) |
| `dialog` | `classic` · `soft` | divisória sob o título, fecho elevado vs cartão suave, fecho em texto |
| `menu` | `vuetify` · `soft` | menus pendentes: lista do Vuetify vs o cartão claro com preenchimento |

A forma resolvida é codificada na raiz do editor como seis classes `.tiptapify-shape-{flag}-{value}` e exposta como `shape: ComputedRef<ResolvedShape>` em [`useTiptapifyConfig()`](/pt/api/types#usetiptapifyconfig) para os componentes personalizados da barra de ferramentas.

### Extends {#extends}

Uma skin é resolvida sobre a base clássica, depois pela sua cadeia `extends` a partir da raiz e, por fim, pelos seus próprios membros:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

As ligações em falta resolvem-se para a cadeia acumulada (com um aviso em desenvolvimento); um ciclo resolve-se para a clássica (com um aviso em desenvolvimento). Uma skin registada é referenciada pelo nome; um objeto de skin em linha pode fazer `extends` de um nome registado e nunca entra no registo global — as skins personalizadas nunca passam de um editor para outro. As chaves de token desconhecidas são ignoradas com um aviso em desenvolvimento.

Há demonstrações em direto das três formas na [página de exemplos de skins](/pt/examples/skins).

## Catálogo de tokens {#token-catalog}

As tabelas abaixo são o **contrato v1**: as chaves do catálogo (`TiptapifySkinColors` / `TiptapifySkinMetrics`) são os nomes que pode definir. As células clássicas são os valores de recurso do CSS — o valor que as regras base pintam quando nenhuma skin substitui o token.

### Barra de ferramentas / barra {#toolbar-bar}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Itens / grupos / divisórias {#items-groups-dividers}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevação 2 do Vuetify [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (espaçador: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ A célula clássica medida é `normal` — o valor flex nativo do Vuetify, que é o que o valor de recurso do CSS transporta. O valor base do catálogo, `0px`, é o comprimento explícito equivalente para as substituições de skin.

<a id="shadow-cells"></a>² As células que dizem "elevação *n* do Vuetify" são descritivas: a string exata de sombra tripla é o valor medido no ficheiro de referência versionado (`src/skins/__fixtures__/skin-baseline.json`) e é o valor de recurso do CSS. Para `groupShadow`, é a **elevação 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — com `groups: 'box'` a secção é um VBtnGroup (`elevation="4"`), e a regra do token pinta a caixa com este trio sobre a elevação própria do grupo: a caixa detém a elevação, os botões filhos unidos não têm nenhuma.

### Botões {#buttons}

Estes tokens são consumidos **apenas com `buttons: 'quiet'`** — consulte [Alcance](#reachability).

| token | variável CSS | valor quiet (clássica: Vuetify nativo) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Menus flutuantes (seleção, linha vazia, imagem) {#bubble-menus-selection-empty-line-image}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | igual |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | igual |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | igual |

### Menus pendentes {#dropdown-menus}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevação 8 do Vuetify [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ A caixa da **lista** (raio, sombra, preenchimento da lista) do menu clássico é hoje uma regra de skin — o invólucro de tokens `SkinScope` fica entre a regra filha própria do Vuetify e a lista, pelo que a biblioteca restaura esses píxeis como regras de skin que leem os tokens acima. Os píxeis dos **itens** continuam a ser os nativos do Vuetify (o ficheiro de referência mede aí os valores predefinidos do Vuetify): os quatro tokens de item são inertes enquanto `menu: 'vuetify'`.

### Diálogos {#dialogs}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevação do VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | predefinição do campo (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Moldura (contorno do editor) {#frame-editor-border-wrapper}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, sem margem superior | contorno completo |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Com a forma de barra de ferramentas plana, a moldura pinta também um delta por lado (uma margem superior e a margem inferior a 1,6× a opacidade do contorno). Esse delta pertence à forma, não a um token: não é alcançável por tokens.

### Imagens e alças de redimensionamento {#images-and-resize-handles}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (selecionada) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

A barra de ferramentas da imagem segue a flag `buttons`: com a forma quiet obtém a superfície quiet — o seu espaçamento de 2px/4px lê `--tf-bubble-gap` / `--tf-bubble-padding` com os valores de recurso do menu de imagem; não existe nenhum token dedicado à barra de ferramentas da imagem.

### Fora do catálogo (território da válvula de escape) {#not-in-the-catalog-escape-hatch-territory}

Algumas dimensões referidas na visão geral do design não têm token no catálogo da v1: **altura da barra de ferramentas, largura da moldura, raio da moldura, largura do botão, preenchimento do botão, largura do diálogo**. As tabelas do catálogo acima são o contrato; para estes píxeis, abra a [válvula de escape](#escape-hatch-the-root-class) e estilize diretamente as classes estáveis.

## Alcance {#reachability}

O contrato, enunciado uma só vez e respeitado por todos os grupos acima:

> Um token só pinta uma superfície quando a forma ativa essa superfície; os visuais nativos do Vuetify são estilizados através das cores do tema do Vuetify.

Por grupo:

- **Barra de ferramentas, moldura, cromado de imagem/alças** — ativos em todas as formas; os tokens pintam-nos, e as células clássicas são o aspeto nativo para o qual os tokens recorrem.
- **Caixa de grupos** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — com `groups: 'box'` a secção é um VBtnGroup (estrutura da 0.3.2: os botões unem-se, a caixa detém a elevação); as regras da caixa pintam-na com os tokens de grupo, e `--tf-group-height` mantém o contrato de 32px com um `!important` (a regra de densidade do Vuetify luta contra ele, como na 0.3.2). Com `groups: 'flat'` as secções são simples sequências de divs (transparentes, sem sombra; raio 0 é a base da forma).
- **Linhas finas das divisórias** (`dividerWidth/Height/Color`) — a linha fina visível é uma facilidade de `groups: 'flat'`; na forma box a divisória é um espaçador de tamanho zero (`margin: 0 4px` da regra base).
- **Preenchimento/espaçamentos dos itens** — a sequência compacta `6px 8px` depende da barra plana (`toolbar: 'flat'`), e os espaçamentos entre grupos das secções planas (`groups: 'flat'`); a barra elevada mantém as métricas clássicas.
- **Botões** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inertes com `buttons: 'vuetify'`: os botões Vuetify nativos pintam os seus próprios estados. Estilize-os com as cores do tema do Vuetify (`primary`, `surface`, …) — as formas clássicas herdam-nas deliberadamente.
- **Métricas dos itens de menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inertes com `menu: 'vuetify'`; o Vuetify é o dono desses píxeis dos itens. A caixa da **lista** do menu (raio/sombra/preenchimento) é pintada pela skin nas duas formas (consulte a [nota do menu](#menu-classic-note)).
- **Cromado suave do diálogo** (`dialogActionBtn*`, `dialogFieldRadius`, os preenchimentos suaves, a divisória em falta) — pintado com `dialog: 'soft'`; com `dialog: 'classic'` o diálogo é um VCard com os preenchimentos clássicos.
- **Cromado do menu flutuante** — os menus de seleção, de linha vazia e de imagem são uma linha de botões de ícones nas duas formas, pintada pelos tokens do menu flutuante; `bubble` já não altera a sua marcação.

Uma substituição igual à base do catálogo **não é emitida** — com uma forma não clássica, a base própria da forma pinta através do valor de recurso do CSS, pelo que "restaurar" um valor clássico (por exemplo, repor `buttonActiveBg` em `rgb(var(--v-theme-primary))` com `buttons: 'quiet'`) não faz silenciosamente nada. Para forçar um valor de aspeto clássico com uma forma não clássica, defina uma substituição que difira da base do catálogo — um literal equivalente como `rgba(var(--v-theme-primary), 1)` pinta de forma idêntica e sobrevive à omissão.

Os tokens deliberadamente não estão ligados a caminhos nativos — é isso que mantém `default` idêntico ao pixel ao aspeto clássico, enquanto tudo passa pelo catálogo.

## Receitas {#recipes}

### Estender a pastel {#extend-pastel}

Herde a forma discreta e volte a pintar algumas superfícies. Os nomes registados funcionam em qualquer editor:

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

A forma (flat/quiet/soft) vem da pastel; os tokens não alterados mantêm os valores da pastel — a cor de fundo dos botões quiet continua neutra, só se move o que substituir. Esta é a skin renderizada em direto na [página de exemplos](/pt/examples/skins#custom-mint).

### Estender a default {#extend-default}

Mantenha a estrutura clássica e ajuste a pintura:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` é a raiz implícita, pelo que a chave pode ser omitida: `{ toolbar: 'flat', … }` também parte da clássica.

### Totalmente personalizada {#full-custom}

Sem `extends`, sem registo: passe o objeto à prop `skin` e defina livremente flags de forma e tokens. Um `name` coloca a sua própria etiqueta na classe da raiz (ver abaixo); sem ele, é `tiptapify-skin-inline`.

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

`defineSkin` é o auxiliar de identidade para definições const tipadas (não entra em nenhum registo). As flags de forma podem ser definidas individualmente — cada flag que omitir mantém-se clássica.

## Válvula de escape: a classe da raiz {#escape-hatch-the-root-class}

Cada raiz de editor tem `tiptapify-skin-{name}` (`tiptapify-skin-inline` para um objeto em linha sem nome). A biblioteca **nunca baseia nenhuma regra num nome de skin** — a classe é sua:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Os ganchos estáveis em que se basear:

| classe | onde |
|---|---|
| `tiptapify-skin-{name}` | raiz do editor |
| `tiptapify-shape-{flag}-{value}` ×6 | raiz do editor — a forma resolvida |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | a barra de ferramentas e as suas secções |
| `tiptapify-quiet-buttons` | raízes da barra de ferramentas e dos menus flutuantes com `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | a linha de cada menu flutuante e a linha fina entre os seus grupos |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | as linhas dos menus de seleção, de linha vazia e de imagem |
| `tiptapify-btn--active` | um botão premido de um menu flutuante (uma marca ativa, o flutuar da imagem) |
| `tiptapify-menu` · `tiptapify-menu--soft` | conteúdo da sobreposição do menu pendente, o portador das regras do menu suave |
| `tiptapify-skin-scope` | o div de âmbito de tokens dentro dos menus teletransportados |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | o cartão do diálogo e o seu portador suave |
| `tiptapify-frame` | o invólucro do contorno do editor |

**Defesa contra temas do consumidor.** A camada de skins foi concebida para sobreviver a temas de administração que acrescentam preenchimento e repintam elementos internos do Vuetify: as regras dependem das classes de forma/portador, usam classes duplicadas (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) para a especificidade e mantêm `!important` apenas onde o caso do tema de administração do commit base provou que era necessário (o conjunto de defesa do menu.css). Convenções que mantêm as suas próprias substituições a funcionar no mesmo campo de batalha:

- delimite o seu CSS sob `.tiptapify-skin-{name}` (ou uma classe de forma) — nunca sobre elementos internos do Vuetify em bruto;
- prefira tokens (`--tf-*`) para as dimensões do catálogo e classes para o resto;
- repita a duplicação ao substituir componentes do Vuetify (um único `.v-list-item` perde para as regras da skin).

## Contrato visual (nota para colaboradores) {#visual-contract-contributor-note}

Os estilos computados das skins integradas estão fixados pelo ficheiro de referência `src/skins/__fixtures__/skin-baseline.json` (13 secções × claro/escuro): a camada CSS está concluída quando a matriz medida corresponde a ele. Notas de leitura do ficheiro de referência:

- As dimensões de hover/ativo não podem ser forçadas a partir da página, por isso a gravação lê o **texto de declaração da primeira regra CSSOM correspondente** de cada seletor de hover e resolve-o através de um elemento de sonda dentro da raiz da skin (o campo `resolved`) — é o contrato da regra vencedora, não um instantâneo de `:hover` em direto.
- `_meta.selectors.menu` regista o texto do seletor anterior a `SkinScope`. O ficheiro de referência está congelado (valores normativos), pelo que o campo está desatualizado de propósito; o pacote de gravação fixa o seletor atual.
- O ficheiro de referência regista as suas alterações autorizadas em `_meta.notes`: a restauração, em 2026-10-18, da marcação VBtnGroup com `groups: 'box'` voltou a medir os campos clássicos `groupBtn`/`buttonsActive` dos botões filhos (cantos unidos, a caixa detém a elevação). Os campos da pastel não foram tocados — uma alteração visual deliberada atualiza apenas as células clássicas afetadas, regista uma nota e acompanha uma linha no CHANGELOG.

## Ver também {#see-also}

- [Exemplos de skins](/pt/examples/skins) — clássica, pastel e a skin mint personalizada, em direto.
- [Prop `skin`](/pt/api/props#skin) · [tipos de skin](/pt/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/pt/api/types#tiptapifyskininput).
