# Pasvirojo brūkšnio komandos {#slash-commands}

Pasvirojo brūkšnio komandos suteikia greito įterpimo meniu, kuris pasirodo įvedus `/` eilutės pradžioje.

## Pasvirojo brūkšnio komandų įjungimas {#enabling-slash-commands}

Pasvirojo brūkšnio komandos įjungtos pagal numatytuosius nustatymus. Kad jas valdytumėte aiškiai:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Pasvirojo brūkšnio komandų demonstracija..."
:slash-commands="true"
/>

## Galimos komandos {#available-commands}

Redaktoriuje įveskite `/`, kad pamatytumėte komandų paletę. Galimos komandos:

| Komanda         | Aprašas                            |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Įterpti antraštę (1–6 lygių)       |
| `/bulletList`   | Įterpti ženklelių sąrašą           |
| `/numberedList` | Įterpti numeruotą sąrašą           |
| `/taskList`     | Įterpti užduočių sąrašą            |
| `/code`         | Įterpti kodą eilutėje              |
| `/codeBlock`    | Įterpti kodo bloką                 |
| `/quote`        | Įterpti citatos bloką              |
| `/image`        | Įterpti paveikslą (atidaro URL dialogą) |
| `/video`        | Įterpti YouTube vaizdo įrašą       |
| `/table`        | Įterpti lentelę                    |
| `/link`         | Įterpti nuorodą                    |
| `/divider`      | Įterpti horizontalią liniją        |
| `/emoji`        | Atidaryti emoji pasirinkiklį       |
| `/specialChars` | Atidaryti specialiuosius simbolius |

## Kaip tai veikia {#how-it-works}

1. Padėkite žymeklį eilutės pradžioje arba po tarpo
2. Įveskite `/` – pasirodo komandų paletė
3. Toliau rašykite, kad filtruotumėte komandas
4. Paspauskite `Enter` arba spustelėkite, kad įterptumėte pasirinktą komandą

## Pasvirojo brūkšnio komandų išjungimas {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Pasvirojo brūkšnio komandos su slankiuoju meniu {#slash-commands-with-floating-menu}

Sujunkite pasvirojo brūkšnio komandas su slankiuoju meniu, kad redaguoti būtų patogiausia:

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

- **Pasvirojo brūkšnio komandos** (`/`) – iškviečiamos įvedus `/` eilutės pradžioje
- **Slankusis meniu** – pasirodo, kai žymeklį padedate tuščioje eilutėje (siūlo blokų lygio veiksmus)
- **Burbulo meniu** – pasirodo pažymėjus tekstą (siūlo formatavimą eilutėje)

## Galimų komandų filtravimas {#filtering-available-commands}

Galite nurodyti, kurias komandas įtraukti, perduodami komandų ID masyvą:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Galimi komandų ID {#available-command-ids}

| ID             | Aprašas                |
|----------------|------------------------|
| `h1` - `h6`    | 1–6 lygių antraštės    |
| `bulletList`   | Ženklelių sąrašas      |
| `numberedList` | Numeruotas sąrašas     |
| `taskList`     | Užduočių sąrašas       |
| `code`         | Kodas eilutėje         |
| `codeBlock`    | Kodo blokas            |
| `quote`        | Citatos blokas         |
| `image`        | Paveikslas             |
| `video`        | YouTube vaizdo įrašas  |
| `table`        | Lentelė                |
| `link`         | Nuoroda                |
| `divider`      | Horizontali linija     |
| `emoji`        | Emoji                  |
| `specialChars` | Specialieji simboliai  |
