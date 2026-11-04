# Éléments de la barre d'outils {#toolbar-items}

Tous les éléments de la barre d'outils disponibles, organisés par section.

## Actions {#actions}

| Élément  | Description                       |
|----------|-----------------------------------|
| `undo`   | Annuler la dernière modification  |
| `redo`   | Rétablir la dernière modification annulée |

## IA {#ai}

| Élément | Description                                              |
|---------|----------------------------------------------------------|
| `ai`    | Ouvrir la boîte de dialogue de demande IA si elle est configurée |

## Format {#format}

| Élément     | Description                    |
|-------------|--------------------------------|
| `bold`      | Activer/désactiver le gras     |
| `italic`    | Activer/désactiver l'italique  |
| `underline` | Activer/désactiver le souligné |
| `strike`    | Activer/désactiver le barré    |

## Format (suite) {#format-extra}

| Élément      | Description                                          |
|--------------|------------------------------------------------------|
| `sup`        | Activer/désactiver l'exposant                        |
| `sub`        | Activer/désactiver l'indice                          |
| `code`       | Activer/désactiver le code en ligne                  |
| `codeBlock`  | Insérer un bloc de code avec coloration syntaxique   |
| `blockquote` | Insérer une citation                                 |

## Style {#style}

| Élément          | Description                                |
|------------------|--------------------------------------------|
| `heading`        | Liste déroulante pour choisir le niveau de titre (H1-H6) |
| `fontFamily`     | Liste déroulante pour choisir la police    |
| `fontSize`       | Liste déroulante pour choisir la taille de police |
| `lineHeight`     | Définir la hauteur de ligne                |
| `textColor`      | Couleur du texte : palette, couleurs récentes, HEX, pipette, sélecteur personnalisé |
| `highlightColor` | Couleur de surbrillance : le même sélecteur, avec « Sans surbrillance » en premier |

L'élément `heading` accepte des options après un deux-points : les niveaux de titre, `p` pour ajouter un élément paragraphe, et `inline` pour les afficher comme des boutons séparés au lieu d'une liste déroulante :

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Alignement {#alignment}

| Élément   | Description                    |
|-----------|--------------------------------|
| `left`    | Aligner le texte à gauche      |
| `center`  | Centrer le texte               |
| `right`   | Aligner le texte à droite      |
| `justify` | Justifier le texte             |
| `align`   | Liste déroulante d'alignement ; `align:left,center,right` limite ses options |

## Liste {#list}

| Élément        | Description                                      |
|----------------|--------------------------------------------------|
| `bulletList`   | Activer/désactiver la liste à puces              |
| `orderedList`  | Activer/désactiver la liste numérotée            |
| `taskList`     | Activer/désactiver la liste de tâches (cases à cocher) |
| `indent`       | Augmenter l'indentation du bloc courant          |
| `outdent`      | Diminuer l'indentation du bloc courant           |

## Médias {#media}

| Élément   | Description                       |
|-----------|-----------------------------------|
| `link`    | Insérer/modifier un lien, ou une [carte de lien](/fr/guide/link-cards) avec `linkPreview` |
| `image`   | Insérer/modifier une image : par URL ou import, texte alternatif, légende, taille, position |
| `video`   | Insérer/modifier une vidéo YouTube, Vimeo ou un fichier vidéo (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Intégrer une page par son adresse ou son code iframe |
| `emoji`   | Ouvrir le sélecteur d'emoji (10 catégories) |
| `charmap` | Ouvrir le sélecteur de caractères spéciaux |
| `table`   | Insérer un tableau                |

## Divers {#misc}

| Élément         | Description                                      |
|-----------------|--------------------------------------------------|
| `line`          | Insérer une ligne horizontale                    |
| `pagebreak`     | Insérer un saut de page                          |
| `source`        | Activer/désactiver l'affichage du code source HTML brut |
| `preview`       | Activer/désactiver le mode d'aperçu HTML         |
| `fullscreen`    | Activer/désactiver le mode d'édition plein écran |
| `formatClear`   | Effacer toute la mise en forme de la sélection   |
| `invisibleChar` | Insérer des caractères invisibles (espaces, etc.) |

## Séparateurs {#separators}

Utilisez `|` comme séparateur entre les groupes de boutons dans la prop `items` de type tableau :

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Exemple de barre d'outils complète {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
