# Skins {#skins}

Un **skin** es un aspecto del cromado del editor: la barra de herramientas, los botones y grupos que contiene, los menús de burbuja, los menús desplegables, los diálogos, el marco alrededor del contenido y el cromado de selección de imágenes. La prop `skin` lo selecciona:

```vue
<Tiptapify skin="pastel" />
```

Un skin consta de dos cosas: los **tokens** (colores y tamaños como variables CSS) y la **forma** (variantes estructurales que un token no puede expresar). Los dos skins integrados son `default` — el aspecto clásico, una barra de herramientas elevada con grupos de botones elevados — y `pastel`, el aspecto discreto. Los skins personalizados son de primera clase: `registerSkin()` y los objetos de skin en línea se resuelven exactamente con el mismo mecanismo, y los skins integrados son skins registrados, no casos especiales.

## Terminología: skin frente a tema de Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin**: el término de cara al usuario para un aspecto del cromado del editor: tokens + forma. La prop es `skin`, los tipos son `TiptapifySkin*`, el registro es `registerSkin()` y la clase raíz es `tiptapify-skin-{name}`.
- **tema** (theme): reservado para los temas claro/oscuro de Vuetify. Los componentes de Tiptapify mantienen sus props `theme` alimentadas con el nombre del tema actual de Vuetify; el sistema de skins nunca los toca.

Se combinan: la mayoría de los colores de tokens integrados hacen referencia a variables de tema de Vuetify (`rgb(var(--v-theme-surface))`, …), así que los skins siguen automáticamente el modo claro/oscuro. Las celdas de oscuro fijo de la columna classic (el tirador de redimensionado (`rgba(0, 0, 0, .5/.8)`), el contorno de imagen simple, la sombra de la burbuja y las sombras de elevación de menús y diálogos) son deliberadas: el aspecto clásico pinta un cromado oscuro neutro en ambos temas, y la línea base medida las fija. Un skin personalizado puede hacer referencia libremente a variables de tema; consulta la tabla de tokens.

## Concepto {#concept}

### Tokens {#tokens}

Un token es una propiedad CSS personalizada llamada `--tf-*`. La clave del catálogo es el camelCase del sufijo CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Los valores son cadenas simples: colores, abreviaturas de borde completas, sombras, paddings, radios.

Cada regla de skin de la biblioteca existe **una sola vez** y lee su token con un valor de reserva igual al valor classic (base):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Un skin resuelto emite como variables solo sus **sobrescrituras**; los valores de reserva de CSS llevan la base. Las variables se aplican en la raíz del editor y, como los menús y diálogos se teletransportan fuera de ella, en el contenedor `SkinScope` de cada menú y en la propia tarjeta del diálogo, de modo que los tokens siguen a cada superficie.

### Forma {#shape}

Seis indicadores deciden qué conjuntos de reglas se aplican; los tokens los pintan:

| indicador | valores | qué conmuta |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevación de VToolbar y sin línea fina interior frente a una barra plana teñida |
| `groups` | `box` · `flat` | secciones de la barra de herramientas como cajas **VBtnGroup** elevadas (marcado de 0.3.2: botones unidos, los tokens de grupo pintan la caja) frente a tramos simples de div flex |
| `buttons` | `vuetify` · `quiet` | botones nativos de Vuetify frente a botones fantasma con un estado pulsado neutro |
| `bubble` | `card` · `flat` | se mantiene por compatibilidad: los menús de burbuja son una fila de botones de iconos pintada por tokens en ambas formas (sus botones siguen a `buttons`) |
| `dialog` | `classic` · `soft` | línea divisoria bajo el título y cierre elevado frente a tarjeta suave y cierre de texto |
| `menu` | `vuetify` · `soft` | menús desplegables: lista de Vuetify frente a la tarjeta clara con padding |

La forma resuelta se codifica en la raíz del editor como seis clases `.tiptapify-shape-{flag}-{value}` y se expone como `shape: ComputedRef<ResolvedShape>` en [`useTiptapifyConfig()`](/es/api/types#usetiptapifyconfig) para los componentes personalizados de la barra de herramientas.

### Extends {#extends}

Un skin se resuelve sobre la base classic, luego su cadena `extends` desde la raíz y, por último, sus propios miembros:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Los eslabones que faltan se resuelven a la cadena acumulada (con una advertencia en desarrollo); un ciclo se resuelve a classic (con una advertencia en desarrollo). Un skin registrado se referencia por nombre; un objeto de skin en línea puede hacer `extends` de un nombre registrado y nunca entra en el registro global: los skins personalizados nunca se filtran entre editores. Las claves de token desconocidas se ignoran con una advertencia en desarrollo.

Hay demos en vivo de las tres formas en la [página de ejemplos de Skins](/es/examples/skins).

## Catálogo de tokens {#token-catalog}

Las tablas siguientes son el **contrato v1**: las claves del catálogo (`TiptapifySkinColors` / `TiptapifySkinMetrics`) son los nombres que puedes establecer. Las celdas classic son los valores de reserva de CSS: el valor que pintan las reglas base cuando ningún skin sobrescribe el token.

### Barra de herramientas / barra {#toolbar-bar}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementos / grupos / divisores {#items-groups-dividers}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevación 2 de Vuetify [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (separador: margen `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ La celda classic medida es `normal`, el valor flex nativo de Vuetify, que es lo que lleva el valor de reserva de CSS. El valor base del catálogo `0px` es la longitud explícita equivalente para las sobrescrituras de skin.

<a id="shadow-cells"></a>² Las celdas que dicen «elevación *n* de Vuetify» son descriptivas: la cadena exacta de triple sombra es el valor medido en el fixture de línea base confirmado (`src/skins/__fixtures__/skin-baseline.json`) y es el valor de reserva de CSS. Para `groupShadow` es la **elevación 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`): con `groups: 'box'` la sección es un VBtnGroup (`elevation="4"`), y la regla del token pinta la caja con este triple sobre la elevación propia del grupo: la caja posee la elevación y los botones hijos unidos no llevan ninguna.

### Botones {#buttons}

Estos tokens se consumen **solo con `buttons: 'quiet'`**; consulta [Alcance](#reachability).

| token | variable CSS | valor quiet (classic: Vuetify nativo) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Menús de burbuja (selección, línea vacía, imagen) {#bubble-menus-selection-empty-line-image}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | igual |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | igual |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | igual |

### Menús desplegables {#dropdown-menus}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevación 8 de Vuetify [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ La caja de la **lista** (radio, sombra, padding de la lista) del menú classic es hoy una regla de skin: el contenedor de tokens `SkinScope` se sitúa entre la regla hija propia de Vuetify y la lista, así que la biblioteca restaura esos píxeles como reglas de skin que leen los tokens anteriores. Los píxeles de los **elementos** siguen siendo los nativos de Vuetify (el fixture mide ahí los valores predeterminados de Vuetify): los cuatro tokens de elemento no tienen efecto mientras `menu: 'vuetify'`.

### Diálogos {#dialogs}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevación de VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | predeterminado del campo (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Marco (contenedor del borde del editor) {#frame-editor-border-wrapper}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, sin borde superior | borde completo |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Con la forma de barra de herramientas plana, el marco también pinta un delta por lado (un borde superior y el borde inferior con una opacidad de borde de 1,6×). Ese delta pertenece a la forma, no a un token: no se puede alcanzar con tokens.

### Imágenes y tiradores de redimensionado {#images-and-resize-handles}

| token | variable CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (seleccionada) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

La barra de herramientas de la imagen sigue el indicador `buttons`: con la forma quiet obtiene la superficie quiet; su espaciado de 2px/4px lee `--tf-bubble-gap` / `--tf-bubble-padding` con los valores de reserva del menú de imagen; no hay un token específico para la barra de herramientas de la imagen.

### Fuera del catálogo (territorio de la vía de escape) {#not-in-the-catalog-escape-hatch-territory}

Algunas dimensiones mencionadas en el resumen de diseño no tienen token de catálogo en la v1: **altura de la barra de herramientas, ancho del marco, radio del marco, ancho del botón, padding del botón, ancho del diálogo**. Las tablas del catálogo anteriores son el contrato; para estos píxeles abre la [vía de escape](#escape-hatch-the-root-class) y aplica estilos directamente a las clases estables.

## Alcance {#reachability}

El contrato, enunciado una sola vez y respetado por cada grupo anterior:

> Un token pinta una superficie solo cuando la forma activa esa superficie; los elementos visuales nativos de Vuetify se estilizan mediante los colores del tema de Vuetify.

Por grupo:

- **Barra de herramientas, marco, cromado de imagen/tiradores**: activos en todas las formas; los tokens los pintan y las celdas classic son el aspecto nativo al que recurren los tokens.
- **Caja de grupos** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`): con `groups: 'box'` la sección es un VBtnGroup (estructura de 0.3.2: los botones se unen y la caja lleva la elevación); las reglas de la caja la pintan con los tokens de grupo, y `--tf-group-height` mantiene el contrato de 32px con un `!important` (la regla de densidad de Vuetify lucha contra él, como en 0.3.2). Con `groups: 'flat'` las secciones son tramos simples de div (transparentes, sin sombra, y el radio 0 es la base de la forma).
- **Líneas finas de los divisores** (`dividerWidth/Height/Color`): la línea fina visible es una prestación de `groups: 'flat'`; en la forma box el divisor es un separador de tamaño cero (`margin: 0 4px` de la regla base).
- **Padding y espacios de los elementos**: el tramo compacto `6px 8px` depende de la barra plana (`toolbar: 'flat'`), y los espacios de grupo de las secciones planas (`groups: 'flat'`); la barra elevada mantiene las métricas classic.
- **Botones** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`): sin efecto con `buttons: 'vuetify'`: los botones nativos de Vuetify pintan sus propios estados. Estilízalos con los colores del tema de Vuetify (`primary`, `surface`, …); las formas classic los heredan deliberadamente.
- **Métricas de los elementos de menú** (`menuItemRadius/Padding/MinHeight/ActiveBg`): sin efecto con `menu: 'vuetify'`; Vuetify controla esos píxeles de los elementos. La caja de la **lista** del menú (radio/sombra/padding) la pinta el skin en ambas formas (consulta la [nota del menú](#menu-classic-note)).
- **Cromado suave del diálogo** (`dialogActionBtn*`, `dialogFieldRadius`, los paddings suaves, el divisor ausente): se pinta con `dialog: 'soft'`; con `dialog: 'classic'` el diálogo es un VCard con los paddings classic.
- **Cromado de burbuja**: los menús de selección, línea vacía e imagen son una fila de botones de iconos en ambas formas, pintada por los tokens de burbuja; `bubble` ya no cambia su marcado.

Una sobrescritura igual a la base del catálogo **no se emite**: con una forma no classic, la base propia de la forma pinta mediante el valor de reserva de CSS, así que «restaurar» un valor classic (por ejemplo, volver a poner `buttonActiveBg` en `rgb(var(--v-theme-primary))` con `buttons: 'quiet'`) no hace nada en silencio. Para forzar un valor de aspecto classic con una forma no classic, define una sobrescritura que difiera de la base del catálogo: un literal equivalente como `rgba(var(--v-theme-primary), 1)` pinta igual y sobrevive a la omisión.

Los tokens deliberadamente no se conectan a las rutas nativas: eso es lo que mantiene `default` idéntico píxel a píxel al aspecto classic mientras todo pasa por el catálogo.

## Recetas {#recipes}

### Extender pastel {#extend-pastel}

Hereda la forma quiet y repinta unas pocas superficies. Los nombres registrados funcionan en cualquier editor:

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

La forma (flat/quiet/soft) viene de pastel; los tokens sin tocar conservan los valores de pastel: el fondo del botón quiet sigue siendo neutro, solo se mueve lo que sobrescribes. Este es el skin renderizado en vivo en la [página de ejemplos](/es/examples/skins#custom-mint).

### Extender default {#extend-default}

Conserva la estructura classic y ajusta la pintura:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` es la raíz implícita, así que se puede omitir la clave: `{ toolbar: 'flat', … }` también parte de classic.

### Personalizado completo {#full-custom}

Sin `extends` ni registro: pasa el objeto a la prop `skin` y define libremente indicadores de forma y tokens. Un `name` pone tu propia etiqueta en la clase raíz (ver abajo); sin él es `tiptapify-skin-inline`.

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

`defineSkin` es el helper de identidad para definiciones const tipadas (no entra en ningún registro). Los indicadores de forma se pueden definir individualmente: cada indicador que omitas sigue siendo classic.

## Vía de escape: la clase raíz {#escape-hatch-the-root-class}

Cada raíz de editor lleva `tiptapify-skin-{name}` (`tiptapify-skin-inline` para un objeto en línea sin nombre). La biblioteca **nunca basa ninguna regla en un nombre de skin**: la clase es tuya:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Los puntos de enganche estables sobre los que escribir:

| clase | dónde |
|---|---|
| `tiptapify-skin-{name}` | raíz del editor |
| `tiptapify-shape-{flag}-{value}` ×6 | raíz del editor: la forma resuelta |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | la barra de herramientas y sus secciones |
| `tiptapify-quiet-buttons` | raíces de la barra de herramientas y de las burbujas con `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | la fila de cada menú de burbuja y la línea fina entre sus grupos |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | las filas de los menús de selección, línea vacía e imagen |
| `tiptapify-btn--active` | un botón pulsado de un menú de burbuja (una marca activa, el flotado de la imagen) |
| `tiptapify-menu` · `tiptapify-menu--soft` | contenido de la superposición desplegable, portador de las reglas del menú suave |
| `tiptapify-skin-scope` | el div de ámbito de tokens dentro de los menús teletransportados |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | la tarjeta del diálogo y su portador suave |
| `tiptapify-frame` | el contenedor del borde del editor |

**Defensa frente a temas del consumidor.** La capa de skins está construida para sobrevivir a temas de administración que añaden padding y repintan elementos internos de Vuetify: las reglas dependen de clases de forma y de portador, usan clases duplicadas (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) para la especificidad y mantienen `!important` solo donde el caso del tema de administración del commit base demostró que era necesario (el conjunto de defensa de menu.css). Convenciones que mantienen tus propias sobrescrituras funcionando en el mismo campo de batalla:

- limita tu CSS a `.tiptapify-skin-{name}` (o a una clase de forma), nunca a elementos internos de Vuetify sin más;
- prefiere tokens (`--tf-*`) para las dimensiones del catálogo y clases para el resto;
- iguala la duplicación al sobrescribir componentes de Vuetify (un solo `.v-list-item` pierde frente a las reglas del skin).

## Contrato visual (nota para colaboradores) {#visual-contract-contributor-note}

Los estilos calculados de los skins integrados están fijados por el fixture de línea base `src/skins/__fixtures__/skin-baseline.json` (13 secciones × claro/oscuro): la capa CSS está terminada cuando la matriz medida coincide con él. Notas de lectura del fixture:

- Las dimensiones de hover/activo no se pueden forzar desde la página, así que la grabación lee el **texto de declaración de la regla CSSOM de primer acierto** de cada selector hover y lo resuelve mediante un elemento de sonda dentro de la raíz del skin (el campo `resolved`): es el contrato de la regla ganadora, no una instantánea de `:hover` en vivo.
- `_meta.selectors.menu` registra el texto del selector anterior a `SkinScope`. El fixture está congelado (valores normativos), así que el campo está obsoleto a propósito; el paquete de grabación fija el selector actual.
- El fixture lleva sus cambios autorizados en `_meta.notes`: la restauración del 2026-10-18 del marcado VBtnGroup con `groups: 'box'` volvió a medir los campos de botón hijo classic `groupBtn`/`buttonsActive` (esquinas unidas, la caja posee la elevación). Los campos de pastel no se tocan: un cambio visual deliberado actualiza solo las celdas classic afectadas, registra una nota y se publica con una línea en el CHANGELOG.

## Véase también {#see-also}

- [Ejemplos de Skins](/es/examples/skins): classic, pastel y el skin mint personalizado, en vivo.
- [Prop `skin`](/es/api/props#skin) · [tipos de skin](/es/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/es/api/types#tiptapifyskininput).
