# Commandes slash {#slash-commands}

Les commandes slash offrent un menu d'insertion rapide qui s'affiche lorsque vous tapez `/` au début d'une ligne.

## Activer les commandes slash {#enabling-slash-commands}

Les commandes slash sont activées par défaut. Pour les contrôler explicitement :

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Démo des commandes slash..."
:slash-commands="true"
/>

## Commandes disponibles {#available-commands}

Tapez `/` dans l'éditeur pour afficher la palette de commandes. Les commandes disponibles comprennent :

| Commande        | Description                                  |
|-----------------|----------------------------------------------|
| `/h1` - `/h6`   | Insérer un titre (niveaux 1 à 6)             |
| `/bulletList`   | Insérer une liste à puces                    |
| `/numberedList` | Insérer une liste numérotée                  |
| `/taskList`     | Insérer une liste de tâches                  |
| `/code`         | Insérer du code en ligne                     |
| `/codeBlock`    | Insérer un bloc de code                      |
| `/quote`        | Insérer une citation                         |
| `/image`        | Insérer une image (ouvre la boîte d'URL)     |
| `/video`        | Intégrer une vidéo YouTube                   |
| `/table`        | Insérer un tableau                           |
| `/link`         | Insérer un lien hypertexte                   |
| `/divider`      | Insérer une ligne horizontale                |
| `/emoji`        | Ouvrir le sélecteur d'emoji                  |
| `/specialChars` | Ouvrir les caractères spéciaux               |

## Fonctionnement {#how-it-works}

1. Placez le curseur au début d'une ligne ou après une espace
2. Tapez `/` — la palette de commandes apparaît
3. Continuez à taper pour filtrer les commandes
4. Appuyez sur `Enter` ou cliquez pour insérer la commande sélectionnée

## Désactiver les commandes slash {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Commandes slash et menu flottant {#slash-commands-with-floating-menu}

Combinez les commandes slash avec le menu flottant pour une expérience d'édition optimale :

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Commandes slash** (`/`) — déclenchées en tapant `/` au début d'une ligne
- **Menu flottant** — apparaît lorsque vous placez le curseur sur une ligne vide (propose des actions au niveau des blocs)
- **Menu bulle** — apparaît lorsque vous sélectionnez du texte (propose la mise en forme en ligne)

## Filtrer les commandes disponibles {#filtering-available-commands}

Vous pouvez choisir les commandes à inclure en passant un tableau d'identifiants de commandes :

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Identifiants de commandes disponibles {#available-command-ids}

| ID             | Description                  |
|----------------|------------------------------|
| `h1` - `h6`    | Titres de niveaux 1 à 6      |
| `bulletList`   | Liste à puces                |
| `numberedList` | Liste numérotée              |
| `taskList`     | Liste de tâches              |
| `code`         | Code en ligne                |
| `codeBlock`    | Bloc de code                 |
| `quote`        | Citation                     |
| `image`        | Image                        |
| `video`        | Vidéo YouTube                |
| `table`        | Tableau                      |
| `link`         | Lien                         |
| `divider`      | Ligne horizontale            |
| `emoji`        | Emoji                        |
| `specialChars` | Caractères spéciaux          |
