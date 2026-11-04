# Média {#media}

## Obrázky {#images}

Vložení obrázků z adresy URL:

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

Tlačítko obrázku otevře dialog obrázku:

- **Z URL** nebo **Nahrát**. Bez [endpointu pro nahrávání](/cs/guide/uploads) se vybraný soubor vloží jako data URL v base64; s endpointem se soubor odešle na váš server.
- **Alternativní text** (dialog upozorní, když je prázdný) a **popisek** pod obrázkem.
- **Velikost**: původní, šířka textu, nebo vlastní šířka × výška se zámkem poměru stran.
- **Umístění**: na střed na samostatném řádku, nebo obtékaný vlevo či vpravo od textu.

Vybraný obrázek má úchyty pro změnu velikosti (každá změna velikosti je jeden krok zpět) a nad sebou panel nástrojů: obtékání vlevo nebo vpravo, stažení, úprava, smazání. Dvojklik otevře dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videa {#videos}

Vložení videí z YouTube a Vimeo nebo videosouboru:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Tlačítko videa otevře dialog videa:

- **Odkaz na YouTube nebo Vimeo** se změní na jejich přehrávač; dialog zobrazí rozpoznaného poskytovatele a náhled a také **Začít od** (předvyplněno z `?t=`), pokud to přehrávač podporuje.
- **Odkaz na videosoubor** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) se změní na `<video>` s náhledovým obrázkem, ovládacími prvky, automatickým přehráváním (ztlumeně) a smyčkou. Odkaz musí mít protokol (`https://`, `http://`), `//host` nebo `/path`: dialog žádný nedomýšlí.
- **Nahrát** odešle videosoubor na váš server; zobrazuje se jen s [endpointem pro nahrávání](/cs/guide/uploads).
- **Velikost**: responzivní 16:9, nebo vlastní šířka × výška se zámkem poměru stran.

Adresa YouTube vložená do textu se také vloží jako přehrávač. Kliknutí na přehrávač ho vybere místo přehrání, takže ho tlačítko panelu nástrojů zobrazí; dvojklik otevře dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Vložte adresu YouTube a vložte tak video..." />

## Iframy {#iframes}

Vložení stránky podle její adresy nebo podle kódu iframe z její nabídky Sdílet nebo Vložit:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Dialog iframe přečte vložený kód (adresu, velikost, titulek, oprávnění, sandbox, líné načítání, celou obrazovku) a oznámí, co z něj převzal; kód se skripty nebo jinými značkami odmítne. Zobrazuje náhled a obsahuje **titulek pro čtečky obrazovky**, velikost (responzivní v poměru stran z kódu, nebo vlastní se zámkem poměru) a v části **Pokročilé** název, `allow`, `sandbox`, líné načítání a rámeček. Adresa musí začínat `https://` nebo `http://`. Dvojklik na vložený obsah otevře dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Zadejte adresu URL pro vložení jako iframe..." />

## Tabulky {#tables}

Vkládání a úprava tabulek:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Po vložení tabulky můžete:
- Přidávat a odebírat řádky a sloupce
- Vybírat buňky
- Smazat celou tabulku

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Tlačítkem tabulky vložte tabulku..." />

## Odkazy {#links}

Vkládání hypertextových odkazů:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Dialog odkazu přijímá adresu tak, jak byla zadána: `https://…`, jakékoli jiné schéma (`ftp://`, `ssh://`, interní), `mailto:`, `tel:`, `#anchor` nebo `/page`. Protokol nikdy nedoplňuje sám: u adresy bez něj (`example.com`, `internal.host:8080`) se zobrazí čipy pro doplnění `https://`, `http://` nebo `ftp://` a pokud žádný nepřidáte, zůstane adresa tak, jak byla zadána. Adresy `javascript:`, `vbscript:` a `data:` se odmítají.

Dialog obsahuje také text odkazu, volbu **Otevřít na nové kartě** (která přidá `noopener noreferrer`) a v části **Pokročilé** hodnoty `rel` jako čipy (přidat lze libovolnou hodnotu: Enter, mezerník nebo čárka) a CSS třídu.

S prop [`linkPreview`](/cs/api/props#linkpreview) zobrazí stejný dialog odkaz jako kartu s obrázkem, názvem a popisem stránky a adresa vložená na prázdný řádek nabídne **Odkaz / Karta** — viz [Karty odkazů](/cs/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Vyberte text a kliknutím na odkaz přidejte hypertextový odkaz..." />

## Emoji {#emoji}

Vložení emoji z vestavěného výběru s 10 kategoriemi:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Výběr emoji obsahuje pole pro hledání a filtrování, kterým rychle najdete konkrétní emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Tlačítkem emoji vložte emoji..." />

## Speciální znaky (Charmap) {#special-characters-charmap}

Vkládání speciálních znaků, šipek, řeckých písmen, matematických symbolů a dalšího:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorie zahrnují:
- Šipky
- Měny
- Řecká písmena
- Matematické symboly
- Různé

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknutím na charmap vložte speciální znaky..." />

## Kombinace nástrojů pro média {#combining-media-tools}

Plnohodnotný panel nástrojů pro média:

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
placeholder="Kompletní panel nástrojů pro média..." />
