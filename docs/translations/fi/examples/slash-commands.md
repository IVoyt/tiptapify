# Vinoviivakomennot {#slash-commands}

Vinoviivakomennot tarjoavat pikalisäysvalikon, joka avautuu, kun kirjoitat `/` rivin alkuun.

## Vinoviivakomentojen käyttöönotto {#enabling-slash-commands}

Vinoviivakomennot ovat oletuksena käytössä. Voit hallita niitä myös erikseen:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Vinoviivakomentojen demo..."
:slash-commands="true"
/>

## Käytettävissä olevat komennot {#available-commands}

Kirjoita editoriin `/` nähdäksesi komentopaletin. Käytettävissä olevia komentoja ovat:

| Komento         | Kuvaus                             |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Lisää otsikko (tasot 1-6)          |
| `/bulletList`   | Lisää luettelo                     |
| `/numberedList` | Lisää numeroitu luettelo           |
| `/taskList`     | Lisää tehtäväluettelo              |
| `/code`         | Lisää koodi tekstin sekaan         |
| `/codeBlock`    | Lisää koodilohko                   |
| `/quote`        | Lisää lainaus                      |
| `/image`        | Lisää kuva (avaa URL-dialogin)     |
| `/video`        | Upota YouTube-video                |
| `/table`        | Lisää taulukko                     |
| `/link`         | Lisää hyperlinkki                  |
| `/divider`      | Lisää vaakaviiva                   |
| `/emoji`        | Avaa emojivalitsin                 |
| `/specialChars` | Avaa erikoismerkit                 |

## Miten se toimii {#how-it-works}

1. Aseta kohdistin rivin alkuun tai välilyönnin jälkeen
2. Kirjoita `/` — komentopaletti avautuu
3. Jatka kirjoittamista suodattaaksesi komentoja
4. Paina `Enter` tai napsauta lisätäksesi valitun komennon

## Vinoviivakomentojen poistaminen käytöstä {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Vinoviivakomennot ja kelluva valikko {#slash-commands-with-floating-menu}

Yhdistä vinoviivakomennot ja kelluva valikko parhaan muokkauskokemuksen saamiseksi:

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

- **Vinoviivakomennot** (`/`) — käynnistyvät kirjoittamalla `/` rivin alkuun
- **Kelluva valikko** — tulee näkyviin, kun asetat kohdistimen tyhjälle riville (tarjoaa lohkotason toimintoja)
- **Kuplavalikko** — tulee näkyviin, kun valitset tekstiä (tarjoaa tekstin sisäisen muotoilun)

## Käytettävissä olevien komentojen suodattaminen {#filtering-available-commands}

Voit määrittää, mitkä komennot otetaan mukaan, antamalla komentotunnisteiden taulukon:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Käytettävissä olevat komentotunnisteet {#available-command-ids}

| Tunniste       | Kuvaus               |
|----------------|----------------------|
| `h1` - `h6`    | Otsikkotasot 1-6     |
| `bulletList`   | Luettelo             |
| `numberedList` | Numeroitu luettelo   |
| `taskList`     | Tehtäväluettelo      |
| `code`         | Koodi tekstin sekaan |
| `codeBlock`    | Koodilohko           |
| `quote`        | Lainaus              |
| `image`        | Kuva                 |
| `video`        | YouTube-video        |
| `table`        | Taulukko             |
| `link`         | Linkki               |
| `divider`      | Vaakaviiva           |
| `emoji`        | Emoji                |
| `specialChars` | Erikoismerkit        |
