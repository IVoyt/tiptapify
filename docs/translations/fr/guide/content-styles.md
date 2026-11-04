# Styles de contenu {#content-styles}

Une partie de ce que l'éditeur enregistre a besoin d'une apparence propre sur la page qui l'affiche : cartes de lien, images avec leur légende et leur habillage, vidéos et intégrations qui s'ajustent à la largeur du texte, listes de tâches avec une case à cocher à côté de chaque élément. Sans cela, une carte de lien n'est qu'un lien nu, où l'image et les textes se mélangent.

La prop `contentStyles` indique comment le HTML enregistré porte cette apparence :

| `contentStyles` | le HTML enregistré | sur le site |
|---|---|---|
| `inline` (par défaut) | l'apparence est écrite dans les attributs `style` de ces éléments | rien à charger : le HTML s'affiche tel quel |
| `classes` | uniquement des classes et des attributs `data-` | charger `tiptapify/content.css` et placer le HTML dans un élément portant la classe `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Les deux portent les mêmes règles, celles avec lesquelles l'éditeur lui-même affiche le contenu, si bien qu'une page ressemble à l'éditeur dans les deux cas. Seuls ces éléments les reçoivent : titres, paragraphes, listes, tableaux et le reste du texte gardent les styles du site.

## Styles en ligne {#inline-styles}

Le mode par défaut. Une carte de lien compacte est enregistrée ainsi :

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

- **Les couleurs restent celles du site.** Le texte hérite de sa couleur ; le texte atténué et les bordures utilisent l'opacité et un gris semi-transparent, et fonctionnent donc aussi bien sur une page claire que sombre. Définissez la couleur du texte pour un thème sur le site comme d'habitude.
- **Aucune media query n'est nécessaire.** Une carte compacte place d'elle-même son image au-dessus des textes dans une colonne étroite ; les vidéos et les intégrations ne dépassent jamais la largeur du texte.
- **Un site peut toujours les restyler**, les classes restent. Un style en ligne l'emporte sur une règle de classe : une telle règle a donc besoin de `!important`.
- **Un sanitizer doit conserver l'attribut `style`** sur ces éléments, sinon ils perdent leur apparence.

## Classes et content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` est petit et ne contient ni Vue ni Vuetify. Ses règles sont enveloppées dans `:where(.tiptapify-content)`, elles ne pèsent donc rien : toute règle du site l'emporte sur elles sans `!important`. Utilisez-le quand le site veut l'apparence en un seul endroit, ou style lui-même son contenu.

`contentCss(scope)` fournit la même feuille de style sous forme de chaîne, pour une autre classe que `tiptapify-content` :

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Recharger le HTML {#loading-html-back}

L'éditeur lit ces éléments uniquement par leurs attributs et leurs classes : une carte de lien par `data-link-card`, une image par son `src`, sa taille et son habillage, une tâche par `data-checked`. Leurs styles en ligne sont ignorés au chargement du HTML et réécrits à l'enregistrement. Le même HTML fait donc l'aller-retour sans changement, un document enregistré avec `inline` se charge proprement avec `classes` et inversement, et une version ultérieure de l'éditeur met à jour l'apparence d'un document à son prochain enregistrement.

La mise en forme du texte n'est pas touchée : la couleur ou la taille d'un texte et l'alignement d'un paragraphe font partie du contenu, et l'éditeur continue de les lire dans leurs styles.

Pour transformer du HTML à classes en HTML à styles en ligne hors de l'éditeur (un ancien document, un e-mail), utilisez `inlineContentStyles` :

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Elle a besoin d'un DOM (un navigateur, ou jsdom sur un serveur) et renvoie le HTML tel quel sans lui.

## Diaporamas d'images {#image-sliders}

L'éditeur marque les images d'une même rangée comme un diaporama pendant que vous écrivez (voir la prop `imageSlider`) ; le HTML enregistré les garde comme des figures à la suite. Les afficher en diaporama relève du script propre au site.
