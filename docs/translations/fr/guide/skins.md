# Thèmes visuels {#skins}

Un **skin** est une apparence de l'interface de l'éditeur : la barre d'outils, ses boutons et ses groupes, les menus flottants, les menus déroulants, les boîtes de dialogue, le cadre autour du contenu et l'interface de sélection des images. La prop `skin` le sélectionne :

```vue
<Tiptapify skin="pastel" />
```

Un skin se compose de deux choses : des **tokens** (couleurs et tailles sous forme de variables CSS) et la **forme** (des variantes structurelles qu'un token ne peut pas exprimer). Les deux skins intégrés sont `default` — l'apparence classique, une barre d'outils en relief avec des groupes de boutons en relief — et `pastel`, l'apparence discrète. Les skins personnalisés sont des citoyens à part entière : `registerSkin()` et les objets skin en ligne passent exactement par le même mécanisme, et les skins intégrés sont des skins enregistrés, pas des cas particuliers.

## Terminologie : skin ou thème Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — le terme côté utilisateur pour une apparence de l'interface de l'éditeur : tokens + forme. La prop est `skin`, les types sont `TiptapifySkin*`, le registre est `registerSkin()`, la classe racine est `tiptapify-skin-{name}`.
- **thème** — réservé aux thèmes clair/sombre de Vuetify. Les composants Tiptapify continuent d'alimenter leurs props `theme` à partir du nom du thème Vuetify courant ; le système de skins n'y touche jamais.

Ils se combinent : la plupart des couleurs de tokens intégrées font référence à des variables du thème Vuetify (`rgb(var(--v-theme-surface))`, …), de sorte que les skins suivent automatiquement le mode clair/sombre. Les cellules en sombre fixe de la colonne classic — la poignée de redimensionnement (`rgba(0, 0, 0, .5/.8)`), le contour d'image simple, l'ombre du menu flottant et les ombres d'élévation des menus et dialogues — sont voulues : l'apparence classique peint une interface sombre neutre dans les deux thèmes, et la base de référence mesurée les fige. Un skin personnalisé peut librement faire référence aux variables du thème — voir le tableau des tokens.

## Concept {#concept}

### Tokens {#tokens}

Un token est une propriété personnalisée CSS nommée `--tf-*`. La clé du catalogue est le camelCase du suffixe CSS : `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Les valeurs sont de simples chaînes — couleurs, raccourcis de bordure complets, ombres, marges intérieures, rayons.

Chaque règle de skin de la bibliothèque existe **une seule fois**, en lisant son token avec une valeur de repli égale à la valeur classique (de base) :

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Un skin résolu n'émet que ses **surcharges** sous forme de variables ; les valeurs de repli CSS portent la base. Les variables atterrissent sur la racine de l'éditeur — et, comme les menus et les dialogues sont téléportés hors de celle-ci, sur l'enveloppe `SkinScope` de chaque menu et sur la carte du dialogue elle-même, de sorte que les tokens suivent chaque surface.

### Forme {#shape}

Six indicateurs déterminent quels jeux de règles s'appliquent ; les tokens les peignent :

| indicateur | valeurs | ce qu'il commute |
|---|---|---|
| `toolbar` | `raised` · `flat` | élévation de VToolbar + pas de filet intérieur, ou barre plate teintée |
| `groups` | `box` · `flat` | sections de la barre d'outils sous forme de boîtes **VBtnGroup** en relief (balisage 0.3.2 : boutons joints, les tokens de groupe peignent la boîte) ou suites de div flex simples |
| `buttons` | `vuetify` · `quiet` | boutons Vuetify natifs ou boutons « ghost » avec un état pressé neutre |
| `bubble` | `card` · `flat` | conservé pour la compatibilité : les menus flottants sont une rangée de boutons d'icônes peinte par des tokens dans les deux formes (leurs boutons suivent `buttons`) |
| `dialog` | `classic` · `soft` | filet sous le titre et bouton de fermeture surélevé, ou carte douce et fermeture textuelle |
| `menu` | `vuetify` · `soft` | menus déroulants : liste Vuetify ou carte claire avec marge intérieure |

La forme résolue est encodée sur la racine de l'éditeur sous la forme de six classes `.tiptapify-shape-{flag}-{value}`, et exposée sous la forme `shape: ComputedRef<ResolvedShape>` dans [`useTiptapifyConfig()`](/fr/api/types#usetiptapifyconfig) pour les composants de barre d'outils personnalisés.

### Extends {#extends}

Un skin est résolu à partir de la base classique, puis de sa chaîne `extends` en partant de la racine, puis de ses propres membres :

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Les maillons manquants se résolvent vers la chaîne accumulée (avec un avertissement en développement) ; un cycle se résout vers classic (avec un avertissement en développement). Un skin enregistré est référencé par son nom ; un objet de skin en ligne peut faire `extends` d'un nom enregistré et n'entre jamais dans le registre global — les skins personnalisés ne fuient jamais d'un éditeur à l'autre. Les clés de token inconnues sont ignorées avec un avertissement en développement.

Des démos en direct des trois formes se trouvent sur la [page d'exemples des thèmes](/fr/examples/skins).

## Catalogue des tokens {#token-catalog}

Les tableaux ci-dessous constituent le **contrat v1** : les clés du catalogue (`TiptapifySkinColors` / `TiptapifySkinMetrics`) sont les noms que vous pouvez définir. Les cellules classic sont les valeurs de repli CSS — la valeur que peignent les règles de base lorsqu'aucun skin ne surcharge le token.

### Barre d'outils / barre {#toolbar-bar}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Éléments / groupes / séparateurs {#items-groups-dividers}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | élévation Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (espaceur : marge `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ La cellule classic mesurée est `normal` — la valeur flex native de Vuetify, qui est ce que porte la valeur de repli CSS. La valeur de base du catalogue `0px` est la longueur explicite équivalente pour les surcharges de skin.

<a id="shadow-cells"></a>² Les cellules indiquant « élévation Vuetify *n* » sont descriptives : la chaîne exacte à triple ombre est la valeur mesurée dans le fichier de référence versionné (`src/skins/__fixtures__/skin-baseline.json`) et constitue la valeur de repli CSS. Pour `groupShadow`, il s'agit de l'**élévation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — avec `groups: 'box'`, la section est un VBtnGroup (`elevation="4"`), et la règle du token peint la boîte avec ce triplet par-dessus l'élévation propre au groupe : la boîte possède l'élévation, les boutons enfants joints n'en portent aucune.

### Boutons {#buttons}

Ces tokens ne sont consommés **que sous `buttons: 'quiet'`** — voir [Portée](#reachability).

| token | variable CSS | valeur quiet (classic : Vuetify natif) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Menus flottants (sélection, ligne vide, image) {#bubble-menus-selection-empty-line-image}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | idem |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | idem |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | idem |

### Menus déroulants {#dropdown-menus}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | élévation Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Le cadre de la **liste** (rayon, ombre, marge intérieure de la liste) du menu classic est aujourd'hui une règle de skin — l'enveloppe de tokens `SkinScope` se situe entre la règle enfant propre à Vuetify et la liste, la bibliothèque restaure donc ces pixels sous forme de règles de skin lisant les tokens ci-dessus. Les pixels des **éléments** restent ceux de Vuetify natif (le fichier de référence mesure les valeurs par défaut de Vuetify à cet endroit) : les quatre tokens d'élément sont inertes tant que `menu: 'vuetify'`.

### Boîtes de dialogue {#dialogs}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | élévation de VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | valeur par défaut du champ (`4px`) | `8px` (avec contour) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Cadre (enveloppe de bordure de l'éditeur) {#frame-editor-border-wrapper}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, sans bord supérieur | bordure complète |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Avec la forme de barre d'outils plate, le cadre peint aussi un delta par côté (un bord supérieur, et le bord inférieur à 1,6× l'opacité de la bordure). Ce delta relève de la forme, et non d'un token : il n'est pas accessible par token.

### Images et poignées de redimensionnement {#images-and-resize-handles}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (sélectionnée) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (survol) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

La barre d'outils d'image suit l'indicateur `buttons` : avec la forme quiet, elle reçoit la surface quiet — ses espacements de 2px/4px lisent `--tf-bubble-gap` / `--tf-bubble-padding` avec les valeurs de repli du menu d'image ; il n'existe pas de token dédié à la barre d'outils d'image.

### Hors du catalogue (domaine de la porte de sortie) {#not-in-the-catalog-escape-hatch-territory}

Certaines dimensions citées dans la présentation de conception n'ont pas de token de catalogue en v1 : **hauteur de la barre d'outils, largeur du cadre, rayon du cadre, largeur des boutons, marge intérieure des boutons, largeur des dialogues**. Les tableaux du catalogue ci-dessus font foi ; pour ces pixels, ouvrez la [porte de sortie](#escape-hatch-the-root-class) et stylez directement les classes stables.

## Portée {#reachability}

Le contrat, énoncé une fois et respecté par chaque groupe ci-dessus :

> Un token ne peint une surface que lorsque la forme active cette surface ; les visuels Vuetify natifs sont stylés via les couleurs du thème Vuetify.

Par groupe :

- **Barre d'outils, cadre, interface des images/poignées** — actifs dans toutes les formes ; les tokens les peignent, les cellules classic sont l'apparence native vers laquelle les tokens se replient.
- **Boîte de groupes** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — avec `groups: 'box'`, la section est un VBtnGroup (structure 0.3.2 : les boutons sont joints, la boîte porte l'élévation) ; les règles de la boîte la peignent avec les tokens de groupe, et `--tf-group-height` maintient le contrat de 32px avec un `!important` (la règle de densité de Vuetify lui résiste, comme en 0.3.2). Avec `groups: 'flat'`, les sections sont de simples suites de div (transparentes, sans ombre, rayon 0 étant la base de la forme).
- **Filets des séparateurs** (`dividerWidth/Height/Color`) — le filet visible est une possibilité de `groups: 'flat'` ; dans la forme box, le séparateur est un espaceur de taille nulle (`margin: 0 4px` issu de la règle de base).
- **Marges intérieures et espacements des éléments** — la suite compacte `6px 8px` est conditionnée à la barre plate (`toolbar: 'flat'`), les espacements de groupes aux sections plates (`groups: 'flat'`) ; la barre en relief conserve les métriques classic.
- **Boutons** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inertes avec `buttons: 'vuetify'` : les boutons Vuetify natifs peignent eux-mêmes leurs états. Stylez-les avec les couleurs du thème Vuetify (`primary`, `surface`, …) — les formes classic en héritent volontairement.
- **Métriques des éléments de menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inertes avec `menu: 'vuetify'` ; Vuetify possède ces pixels d'éléments. Le cadre de la **liste** du menu (rayon/ombre/marge intérieure) est peint par le skin dans les deux formes (voir la [note sur le menu](#menu-classic-note)).
- **Interface douce des dialogues** (`dialogActionBtn*`, `dialogFieldRadius`, les marges intérieures douces, le filet absent) — peinte avec `dialog: 'soft'` ; avec `dialog: 'classic'`, le dialogue est un VCard avec les marges intérieures classic.
- **Interface des menus flottants** — les menus de sélection, de ligne vide et d'image sont une seule rangée de boutons d'icônes dans les deux formes, peinte par les tokens de menu flottant ; `bubble` ne modifie plus leur balisage.

Une surcharge égale à la base du catalogue **n'est pas émise** — avec une forme non classic, la base propre à la forme est peinte via la valeur de repli CSS ; « restaurer » une valeur classic (par exemple remettre `buttonActiveBg` à `rgb(var(--v-theme-primary))` avec `buttons: 'quiet'`) ne fait donc silencieusement rien. Pour imposer une valeur d'aspect classic avec une forme non classic, définissez une surcharge qui diffère de la base du catalogue — un littéral équivalent comme `rgba(var(--v-theme-primary), 1)` peint de façon identique et échappe à cette omission.

Les tokens ne sont volontairement pas branchés sur les chemins natifs — c'est ce qui garde `default` identique au pixel près à l'apparence classique tout en faisant passer tout le reste par le catalogue.

## Recettes {#recipes}

### Étendre pastel {#extend-pastel}

Héritez de la forme quiet et repeignez quelques surfaces. Les noms enregistrés fonctionnent sur n'importe quel éditeur :

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

La forme (flat/quiet/soft) vient de pastel ; les tokens non touchés gardent les valeurs de pastel — le fond des boutons quiet reste neutre, seul ce que vous surchargez change. C'est le skin affiché en direct sur la [page d'exemples](/fr/examples/skins#custom-mint).

### Étendre default {#extend-default}

Conservez la structure classique et ajustez la peinture :

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` est la racine implicite, la clé peut donc être omise : `{ toolbar: 'flat', … }` part aussi de classic.

### Entièrement personnalisé {#full-custom}

Pas d'`extends`, pas d'enregistrement : transmettez l'objet à la prop `skin` et définissez librement indicateurs de forme et tokens. Un `name` place votre propre libellé sur la classe racine (voir ci-dessous) ; sans lui, c'est `tiptapify-skin-inline`.

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

`defineSkin` est l'assistant d'identité pour les définitions const typées (il n'entre dans aucun registre). Les indicateurs de forme peuvent être définis individuellement — chaque indicateur omis reste classic.

## Porte de sortie : la classe racine {#escape-hatch-the-root-class}

Chaque racine d'éditeur porte `tiptapify-skin-{name}` (`tiptapify-skin-inline` pour un objet en ligne sans nom). La bibliothèque **ne fonde jamais aucune règle sur un nom de skin** — la classe est à vous :

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Les points d'accroche stables sur lesquels écrire votre CSS :

| classe | où |
|---|---|
| `tiptapify-skin-{name}` | racine de l'éditeur |
| `tiptapify-shape-{flag}-{value}` ×6 | racine de l'éditeur — la forme résolue |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | la barre d'outils et ses sections |
| `tiptapify-quiet-buttons` | racines de la barre d'outils et des menus flottants avec `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | la rangée de chaque menu flottant et le filet entre ses groupes |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | les rangées des menus de sélection, de ligne vide et d'image |
| `tiptapify-btn--active` | un bouton pressé d'un menu flottant (une marque active, le flottement de l'image) |
| `tiptapify-menu` · `tiptapify-menu--soft` | contenu de la surcouche du menu déroulant, porteur des règles du menu doux |
| `tiptapify-skin-scope` | la div de portée des tokens dans les menus téléportés |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | la carte du dialogue et son porteur doux |
| `tiptapify-frame` | l'enveloppe de bordure de l'éditeur |

**Défense contre les thèmes consommateurs.** La couche de skin est conçue pour survivre aux thèmes d'administration qui ajoutent des marges et repeignent les internes de Vuetify : les règles se conditionnent aux classes de forme/porteur, utilisent des classes doublées (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) pour la spécificité, et ne gardent `!important` que là où le cas du thème d'administration du commit de base a prouvé que c'était nécessaire (l'ensemble de défense de menu.css). Conventions qui permettent à vos propres surcharges de fonctionner sur ce même terrain :

- limitez la portée de votre CSS sous `.tiptapify-skin-{name}` (ou une classe de forme) — jamais sur les internes bruts de Vuetify ;
- préférez les tokens (`--tf-*`) pour les dimensions du catalogue, et les classes pour le reste ;
- reproduisez le doublement lorsque vous surchargez des composants Vuetify (un simple `.v-list-item` perd face aux règles du skin).

## Contrat visuel (note pour les contributeurs) {#visual-contract-contributor-note}

Les styles calculés des skins intégrés sont figés par le fichier de référence `src/skins/__fixtures__/skin-baseline.json` (13 sections × clair/sombre) : la couche CSS est terminée lorsque la matrice mesurée y correspond. Notes de lecture du fichier de référence :

- Les dimensions de survol/actif ne peuvent pas être forcées depuis la page ; l'enregistrement lit donc le **texte de déclaration de la première règle CSSOM correspondante** pour chaque sélecteur de survol et le résout via un élément sonde à l'intérieur de la racine du skin (le champ `resolved`) — c'est le contrat de la règle gagnante, et non un instantané `:hover` en direct.
- `_meta.selectors.menu` enregistre le texte du sélecteur antérieur à `SkinScope`. Le fichier de référence est figé (valeurs normatives), ce champ est donc périmé volontairement ; le lot d'enregistrement fige le sélecteur actuel.
- Le fichier de référence consigne ses changements autorisés dans `_meta.notes` : la restauration du balisage VBtnGroup du 18/10/2026 avec `groups: 'box'` a entraîné une nouvelle mesure des champs des boutons enfants classic `groupBtn`/`buttonsActive` (coins joints, la boîte possède l'élévation). Les champs pastel sont intacts — un changement visuel délibéré ne met à jour que les cellules classic concernées, consigne une note et ajoute une ligne au CHANGELOG.

## Voir aussi {#see-also}

- [Exemples de skins](/fr/examples/skins) — classic, pastel et le skin personnalisé mint, en direct.
- [Prop `skin`](/fr/api/props#skin) · [types de skin](/fr/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/fr/api/types#tiptapifyskininput).
