# Skins {#skins}

Uma **skin** é uma aparência do chrome do editor: a barra de ferramentas, os botões e grupos dela, os bubble menus, os menus suspensos, os diálogos, a moldura ao redor do conteúdo e o chrome de seleção de imagem. A prop `skin` a seleciona:

```vue
<Tiptapify skin="pastel" />
```

Uma skin é feita de duas coisas: **tokens** (cores e tamanhos como variáveis CSS) e **forma** (variantes estruturais que um token não consegue expressar). As duas skins nativas são `default` — o visual clássico, uma barra de ferramentas elevada com grupos de botões elevados — e `pastel`, o visual discreto. Skins personalizadas são cidadãs de primeira classe: `registerSkin()` e objetos de skin inline são resolvidos exatamente pelo mesmo mecanismo, e as skins nativas são skins registradas, não casos especiais.

## Terminologia: skin vs tema do Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — o termo voltado ao usuário para uma aparência do chrome do editor: tokens + forma. A prop é `skin`, os tipos são `TiptapifySkin*`, o registro é `registerSkin()`, a classe raiz é `tiptapify-skin-{name}`.
- **tema** — reservado para os temas claro/escuro do Vuetify. Os componentes do Tiptapify mantêm suas props `theme` alimentadas pelo nome do tema atual do Vuetify; o sistema de skins nunca mexe nelas.

Elas se combinam: a maioria das cores dos tokens nativos referencia variáveis de tema do Vuetify (`rgb(var(--v-theme-surface))`, …), então as skins acompanham o claro/escuro automaticamente. As células de escuro fixo na coluna clássica — a alça de redimensionamento (`rgba(0, 0, 0, .5/.8)`), o contorno simples da imagem, a sombra do bubble e as sombras de elevação de menus/diálogos — são deliberadas: a aparência clássica pinta um chrome escuro neutro nos dois temas, e a base medida as fixa. Uma skin personalizada pode referenciar variáveis de tema livremente — veja a tabela de tokens.

## Conceito {#concept}

### Tokens {#tokens}

Um token é uma propriedade CSS personalizada chamada `--tf-*`. A chave do catálogo é o camelCase do sufixo CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Os valores são strings simples — cores, shorthands de borda completos, sombras, paddings, raios.

Cada regra de skin da biblioteca existe **uma única vez**, lendo o seu token com um fallback igual ao valor clássico (base):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Uma skin resolvida emite como variáveis apenas as suas **sobrescritas**; os fallbacks do CSS carregam a base. As variáveis chegam à raiz do editor — e, como menus e diálogos são teleportados para fora dela, ao wrapper `SkinScope` de cada menu e ao próprio card do diálogo, de modo que os tokens acompanham todas as superfícies.

### Forma {#shape}

Seis flags decidem quais conjuntos de regras se aplicam; os tokens os pintam:

| flag | valores | o que alterna |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevação do VToolbar + sem linha fina interna vs barra plana tingida |
| `groups` | `box` · `flat` | seções da barra de ferramentas como caixas **VBtnGroup** elevadas (marcação da 0.3.2: botões unidos, os tokens de grupo pintam a caixa) vs sequências simples de divs flex |
| `buttons` | `vuetify` · `quiet` | botões nativos do Vuetify vs botões ghost com estado pressionado neutro |
| `bubble` | `card` · `flat` | mantida por compatibilidade: os bubble menus são uma linha de botões de ícone pintada por tokens nas duas formas (seus botões seguem `buttons`) |
| `dialog` | `classic` · `soft` | divisor sob o título, botão de fechar elevado vs card suave, botão de fechar de texto |
| `menu` | `vuetify` · `soft` | menus suspensos: lista do Vuetify vs card claro com padding |

A forma resolvida é codificada na raiz do editor como seis classes `.tiptapify-shape-{flag}-{value}` e exposta como `shape: ComputedRef<ResolvedShape>` em [`useTiptapifyConfig()`](/pt-br/api/types#usetiptapifyconfig) para componentes personalizados da barra de ferramentas.

### Extends {#extends}

Uma skin é resolvida sobre a base clássica, depois pela sua cadeia `extends` a partir da raiz e, por fim, pelos seus próprios membros:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Elos ausentes são resolvidos para a cadeia acumulada (com um aviso em desenvolvimento); um ciclo é resolvido para a clássica (com um aviso em desenvolvimento). Uma skin registrada é referenciada pelo nome; um objeto de skin inline pode usar `extends` com um nome registrado e nunca entra no registro global — skins personalizadas nunca vazam entre editores. Chaves de token desconhecidas são ignoradas, com um aviso em desenvolvimento.

Demos ao vivo das três formas estão na [página de exemplos de Skins](/pt-br/examples/skins).

## Catálogo de tokens {#token-catalog}

As tabelas abaixo são o **contrato v1**: as chaves do catálogo (`TiptapifySkinColors` / `TiptapifySkinMetrics`) são os nomes que você pode definir. As células clássicas são os fallbacks do CSS — o valor que as regras base pintam quando nenhuma skin sobrescreve o token.

### Barra de ferramentas / barra {#toolbar-bar}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Itens / grupos / divisores {#items-groups-dividers}

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

<a id="items-gap-note"></a>¹ A célula clássica medida é `normal` — o valor flex nativo do Vuetify, que é o que o fallback do CSS carrega. O valor base do catálogo, `0px`, é o comprimento explícito equivalente para sobrescritas de skin.

<a id="shadow-cells"></a>² As células que dizem "elevação *n* do Vuetify" são descritivas: a string exata de sombra tripla é o valor medido na fixture de baseline versionada (`src/skins/__fixtures__/skin-baseline.json`) e é o fallback do CSS. Para `groupShadow`, isso é a **elevação 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — com `groups: 'box'`, a seção é um VBtnGroup (`elevation="4"`), e a regra do token pinta a caixa com essa sombra tripla sobre a elevação do próprio grupo: a caixa é dona da elevação, e os botões filhos unidos não têm nenhuma.

### Botões {#buttons}

Estes tokens são consumidos **somente com `buttons: 'quiet'`** — veja [Alcance](#reachability).

| token | variável CSS | valor quiet (clássica: Vuetify nativo) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menus (seleção, linha vazia, imagem) {#bubble-menus-selection-empty-line-image}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | igual |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | igual |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | igual |

### Menus suspensos {#dropdown-menus}

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

<a id="menu-classic-note"></a>³ A caixa da **lista** (raio, sombra, padding da lista) do menu clássico é hoje uma regra de skin — o wrapper de tokens `SkinScope` fica entre a regra filha do próprio Vuetify e a lista, então a biblioteca restaura esses pixels como regras de skin que leem os tokens acima. Os pixels dos **itens** continuam sendo os do Vuetify nativo (a fixture mede ali os padrões do Vuetify): os quatro tokens de item ficam inertes enquanto `menu: 'vuetify'`.

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
| `dialogFieldRadius` | `--tf-dialog-field-radius` | padrão do campo (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Moldura (wrapper da borda do editor) {#frame-editor-border-wrapper}

| token | variável CSS | clássica | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, sem borda superior | borda completa |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Com a forma de barra de ferramentas plana, a moldura também pinta um delta por lado (uma borda superior e a borda inferior com 1,6× a opacidade da borda). Esse delta pertence à forma, não a um token: ele não é alcançável por token.

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

A barra de ferramentas da imagem segue a flag `buttons`: com a forma quiet, ela recebe a superfície quiet — seus espaçamentos de 2px/4px leem `--tf-bubble-gap` / `--tf-bubble-padding` com os fallbacks do menu de imagem; não há um token dedicado à barra de ferramentas da imagem.

### Fora do catálogo (território da saída de emergência) {#not-in-the-catalog-escape-hatch-territory}

Algumas dimensões citadas na visão geral do design não têm token no catálogo da v1: **altura da barra de ferramentas, largura da moldura, raio da moldura, largura do botão, padding do botão, largura do diálogo**. As tabelas do catálogo acima são o contrato; para esses pixels, abra a [saída de emergência](#escape-hatch-the-root-class) e estilize diretamente as classes estáveis.

## Alcance {#reachability}

O contrato, enunciado uma única vez e respeitado por todos os grupos acima:

> Um token só pinta uma superfície quando a forma ativa essa superfície; os visuais nativos do Vuetify são estilizados pelas cores do tema do Vuetify.

Por grupo:

- **Barra de ferramentas, moldura, chrome de imagem/alças** — ativos em todas as formas; os tokens os pintam, e as células clássicas são a aparência nativa a que os tokens recorrem como fallback.
- **Caixa de grupos** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — com `groups: 'box'`, a seção é um VBtnGroup (estrutura da 0.3.2: os botões se unem, a caixa carrega a elevação); as regras da caixa a pintam com os tokens de grupo, e `--tf-group-height` mantém o contrato dos 32px com um `!important` (a regra de densidade do Vuetify briga com ele, como na 0.3.2). Com `groups: 'flat'`, as seções são sequências simples de divs (transparentes, sem sombra, raio 0 é a base da forma).
- **Linhas finas dos divisores** (`dividerWidth/Height/Color`) — a linha fina visível é uma característica de `groups: 'flat'`; na forma box, o divisor é um espaçador de tamanho zero (`margin: 0 4px` da regra base).
- **Padding/espaçamentos dos itens** — a sequência compacta `6px 8px` depende da barra plana (`toolbar: 'flat'`), e os espaçamentos de grupo, das seções planas (`groups: 'flat'`); a barra elevada mantém as métricas clássicas.
- **Botões** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inertes com `buttons: 'vuetify'`: os botões nativos do Vuetify pintam seus próprios estados. Estilize-os com as cores do tema do Vuetify (`primary`, `surface`, …) — as formas clássicas as herdam deliberadamente.
- **Métricas dos itens de menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inertes com `menu: 'vuetify'`; o Vuetify é dono desses pixels dos itens. A caixa da **lista** do menu (raio/sombra/padding) é pintada pela skin nas duas formas (veja a [nota do menu](#menu-classic-note)).
- **Chrome suave do diálogo** (`dialogActionBtn*`, `dialogFieldRadius`, os paddings suaves, o divisor ausente) — pintado com `dialog: 'soft'`; com `dialog: 'classic'`, o diálogo é um VCard com os paddings clássicos.
- **Chrome do bubble** — os menus de seleção, de linha vazia e de imagem são uma linha de botões de ícone nas duas formas, pintada pelos tokens de bubble; `bubble` não altera mais a marcação deles.

Uma sobrescrita igual à base do catálogo **não é emitida** — com uma forma não clássica, a base da própria forma é pintada pelo fallback do CSS, então "restaurar" um valor clássico (por exemplo, voltar `buttonActiveBg` para `rgb(var(--v-theme-primary))` com `buttons: 'quiet'`) silenciosamente não faz nada. Para forçar um valor com aparência clássica sob uma forma não clássica, defina uma sobrescrita diferente da base do catálogo — um literal equivalente como `rgba(var(--v-theme-primary), 1)` pinta de forma idêntica e escapa da omissão.

Os tokens deliberadamente não são ligados aos caminhos nativos — é isso que mantém `default` idêntico, pixel a pixel, à aparência clássica enquanto tudo passa pelo catálogo.

## Receitas {#recipes}

### Estender a pastel {#extend-pastel}

Herde a forma quiet e repinte algumas superfícies. Nomes registrados funcionam em qualquer editor:

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

A forma (flat/quiet/soft) vem da pastel; os tokens não alterados mantêm os valores da pastel — o tom neutro dos botões quiet permanece, só se move o que você sobrescreve. Esta é a skin renderizada ao vivo na [página de exemplos](/pt-br/examples/skins#custom-mint).

### Estender a default {#extend-default}

Mantenha a estrutura clássica e ajuste a pintura:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` é a raiz implícita, então a chave pode ser omitida: `{ toolbar: 'flat', … }` também parte da clássica.

### Totalmente personalizada {#full-custom}

Sem `extends`, sem registro: passe o objeto à prop `skin` e defina flags de forma e tokens livremente. Um `name` coloca o seu próprio rótulo na classe raiz (veja abaixo); sem ele, é `tiptapify-skin-inline`.

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

`defineSkin` é o helper de identidade para definições const tipadas (ele não entra em nenhum registro). As flags de forma podem ser definidas individualmente — toda flag omitida permanece clássica.

## Saída de emergência: a classe raiz {#escape-hatch-the-root-class}

Toda raiz de editor carrega `tiptapify-skin-{name}` (`tiptapify-skin-inline` para um objeto inline sem nome). A biblioteca **nunca baseia nenhuma regra em um nome de skin** — a classe é sua:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Os hooks estáveis para escrever seu CSS:

| classe | onde |
|---|---|
| `tiptapify-skin-{name}` | raiz do editor |
| `tiptapify-shape-{flag}-{value}` ×6 | raiz do editor — a forma resolvida |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | a barra de ferramentas e suas seções |
| `tiptapify-quiet-buttons` | raízes da barra de ferramentas e do bubble com `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | a linha de cada bubble menu e a linha fina entre os seus grupos |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | as linhas dos menus de seleção, de linha vazia e de imagem |
| `tiptapify-btn--active` | um botão pressionado de um bubble menu (uma marca ativa, o float da imagem) |
| `tiptapify-menu` · `tiptapify-menu--soft` | conteúdo do overlay do menu suspenso, o portador das regras do menu suave |
| `tiptapify-skin-scope` | a div de escopo dos tokens dentro dos menus teleportados |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | o card do diálogo e o seu portador suave |
| `tiptapify-frame` | o wrapper da borda do editor |

**Defesa contra temas do consumidor.** A camada de skins foi construída para sobreviver a temas de administração que adicionam padding e repintam partes internas do Vuetify: as regras dependem de classes de forma/portador, usam classes duplicadas (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) para ganhar especificidade e mantêm `!important` apenas onde o caso do tema de administração no commit base provou que era necessário (o conjunto de defesa do menu.css). Convenções que mantêm as suas próprias sobrescritas funcionando nesse mesmo campo de batalha:

- limite o seu CSS a `.tiptapify-skin-{name}` (ou a uma classe de forma) — nunca a partes internas puras do Vuetify;
- prefira tokens (`--tf-*`) para as dimensões do catálogo e classes para o resto;
- repita a duplicação ao sobrescrever componentes do Vuetify (um único `.v-list-item` perde para as regras da skin).

## Contrato visual (nota para contribuidores) {#visual-contract-contributor-note}

Os estilos computados das skins nativas são fixados pela fixture de baseline `src/skins/__fixtures__/skin-baseline.json` (13 seções × claro/escuro): a camada de CSS está pronta quando a matriz medida bate com ela. Notas de leitura da fixture:

- Dimensões de hover/active não podem ser forçadas pela página, então a gravação lê o **texto da declaração da primeira regra CSSOM correspondente** de cada seletor de hover e o resolve por meio de um elemento de sonda dentro da raiz da skin (o campo `resolved`) — é o contrato da regra vencedora, não um instantâneo de `:hover` ao vivo.
- `_meta.selectors.menu` registra o texto do seletor anterior ao `SkinScope`. A fixture é congelada (valores normativos), então o campo está desatualizado de propósito; o bundle de gravação fixa o seletor atual.
- A fixture traz as suas alterações autorizadas em `_meta.notes`: a restauração, em 18/10/2026, da marcação do VBtnGroup com `groups: 'box'` mediu novamente os campos clássicos `groupBtn`/`buttonsActive` dos botões filhos (cantos unidos, a caixa é dona da elevação). Os campos da pastel permanecem intocados — uma mudança visual deliberada atualiza apenas as células clássicas afetadas, registra uma nota e entrega uma linha no CHANGELOG.

## Veja também {#see-also}

- [Exemplos de Skins](/pt-br/examples/skins) — clássica, pastel e a skin personalizada mint, ao vivo.
- [Prop `skin`](/pt-br/api/props#skin) · [tipos de skin](/pt-br/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/pt-br/api/types#tiptapifyskininput).
