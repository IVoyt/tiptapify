# Médias {#media}

## Images {#images}

Insérez des images à partir d'une URL :

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

Le bouton Image ouvre la boîte de dialogue d'image :

- **Par URL** ou **Importer**. Sans [point de terminaison d'import](/fr/guide/uploads), le fichier choisi est intégré sous forme d'URL de données base64 ; avec un point de terminaison, le fichier est envoyé à votre serveur.
- **Texte alternatif** (la boîte de dialogue vous le rappelle lorsqu'il est vide) et une **légende** sous l'image.
- **Taille** : originale, largeur du texte, ou largeur × hauteur personnalisées avec verrouillage des proportions.
- **Position** : centrée sur sa propre ligne, ou flottante à gauche ou à droite du texte.

Une image sélectionnée dispose de poignées de redimensionnement (chaque redimensionnement correspond à une étape d'annulation) et d'une barre d'outils au-dessus : flottement à gauche ou à droite, téléchargement, modification, suppression. Un double-clic ouvre la boîte de dialogue.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Vidéos {#videos}

Intégrez des vidéos YouTube et Vimeo, ou un fichier vidéo :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Le bouton Vidéo ouvre la boîte de dialogue de vidéo :

- **Un lien YouTube ou Vimeo** devient leur lecteur ; la boîte de dialogue affiche le fournisseur reconnu et un aperçu, ainsi que **Début à** (prérempli depuis `?t=`) lorsque le lecteur le permet.
- **Un lien vers un fichier vidéo** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) devient une balise `<video>` avec une miniature, des commandes, la lecture automatique (sans son) et la lecture en boucle. Le lien doit comporter son protocole (`https://`, `http://`), `//host` ou un `/path` : la boîte de dialogue n'en devine jamais un.
- **Importer** envoie un fichier vidéo à votre serveur ; l'option n'apparaît qu'avec un [point de terminaison d'import](/fr/guide/uploads).
- **Taille** : adaptative 16:9, ou largeur × hauteur personnalisées avec verrouillage des proportions.

Une URL YouTube collée dans le texte est également intégrée. Un clic sur un lecteur le sélectionne au lieu de le lancer, afin que le bouton de la barre d'outils l'affiche ; un double-clic ouvre la boîte de dialogue.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Collez une URL YouTube pour intégrer une vidéo..." />

## Iframes {#iframes}

Intégrez une page par son adresse ou par le code iframe de son menu Partager ou Intégrer :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

La boîte de dialogue d'iframe lit un code collé (adresse, taille, titre, autorisations, sandbox, chargement différé, plein écran) et indique ce qu'elle en a retenu ; un code contenant des scripts ou d'autres balises est refusé. Elle affiche un aperçu et propose un **titre pour les lecteurs d'écran**, la taille (adaptative selon les proportions du code, ou personnalisée avec verrouillage des proportions) et, sous **Avancé**, le nom, `allow`, `sandbox`, le chargement différé et une bordure. L'adresse doit commencer par `https://` ou `http://`. Un double-clic sur une intégration ouvre la boîte de dialogue.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Saisissez une URL à intégrer comme iframe..." />

## Tableaux {#tables}

Insérez et modifiez des tableaux :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Après avoir inséré un tableau, vous pouvez :
- Ajouter ou supprimer des lignes et des colonnes
- Sélectionner des cellules
- Supprimer le tableau entier

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Utilisez le bouton Tableau pour insérer un tableau..." />

## Liens {#links}

Insérez des liens hypertextes :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

La boîte de dialogue de lien prend l'adresse telle qu'elle est saisie : `https://…`, tout autre schéma (`ftp://`, `ssh://`, un schéma interne), `mailto:`, `tel:`, `#anchor` ou `/page`. Elle n'ajoute jamais de protocole d'elle-même : une adresse sans protocole (`example.com`, `internal.host:8080`) affiche des puces pour ajouter `https://`, `http://` ou `ftp://`, et reste telle quelle si vous n'en ajoutez aucune. Les adresses `javascript:`, `vbscript:` et `data:` sont refusées.

La boîte de dialogue propose aussi le texte du lien, **Ouvrir dans un nouvel onglet** (qui ajoute `noopener noreferrer`) et, sous **Avancé**, les valeurs `rel` sous forme de puces (toute valeur : Entrée, espace ou virgule l'ajoute) ainsi qu'une classe CSS.

Avec la prop [`linkPreview`](/fr/api/props#linkpreview), la même boîte de dialogue affiche un lien sous forme de carte avec l'image, le titre et la description de la page, et une URL collée sur une ligne vide propose **Lien / Carte** — voir [Cartes de lien](/fr/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Sélectionnez du texte et cliquez sur Lien pour ajouter un lien hypertexte..." />

## Emoji {#emoji}

Insérez des emoji depuis le sélecteur intégré, qui comporte 10 catégories :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Le sélecteur d'emoji inclut un champ de recherche/filtre pour trouver rapidement un emoji précis.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Cliquez sur le bouton Emoji pour insérer un emoji..." />

## Caractères spéciaux (Charmap) {#special-characters-charmap}

Insérez des caractères spéciaux, des flèches, des lettres grecques, des symboles mathématiques et plus encore :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Les catégories comprennent :
- Flèches
- Devises
- Lettres grecques
- Symboles mathématiques
- Divers

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Cliquez sur Charmap pour insérer des caractères spéciaux..." />

## Combiner les outils média {#combining-media-tools}

Une barre d'outils média complète :

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Barre d'outils média complète..." />
