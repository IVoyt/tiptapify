# Skinovi {#skins}

**Skin** je jedan izgled okvira uređivača: trake sa alatima, dugmadi i grupa u njoj, bubble menija, padajućih menija, dijaloga, okvira oko sadržaja i okvira za izbor slike. Prop `skin` ga bira:

```vue
<Tiptapify skin="pastel" />
```

Skin se sastoji od dve stvari: **tokena** (boje i veličine kao CSS promenljive) i **oblika** (strukturnih varijanti koje token ne može da izrazi). Dva ugrađena skina su `default` — klasičan izgled, podignuta alatna traka sa podignutim grupama dugmadi — i `pastel`, miran izgled. Prilagođeni skinovi su ravnopravni: `registerSkin()` i inline objekti skinova razrešavaju se potpuno istim mehanizmom, a ugrađeni skinovi su registrovani skinovi, a ne posebni slučajevi.

## Terminologija: skin naspram Vuetify teme {#terminology-skin-vs-vuetify-theme}

- **skin** — korisnički termin za jedan izgled okvira uređivača: tokeni + oblik. Prop je `skin`, tipovi su `TiptapifySkin*`, registar je `registerSkin()`, korena klasa je `tiptapify-skin-{name}`.
- **tema** (theme) — rezervisano za Vuetify svetle/tamne teme. Tiptapify komponente zadržavaju svoje `theme` propove napajane trenutnim nazivom Vuetify teme; sistem skinova ih nikada ne dodiruje.

Oni se kombinuju: većina boja ugrađenih tokena upućuje na promenljive Vuetify teme (`rgb(var(--v-theme-surface))`, …), pa skinovi automatski prate svetli/tamni režim. Ćelije fiksno tamne boje u koloni classic — ručica za promenu veličine (`rgba(0, 0, 0, .5/.8)`), obična ivica slike, senka bubble menija i senke uzvišenja menija/dijaloga — namerne su: klasičan izgled boji neutralan tamni okvir u obe teme, a izmerena osnova ih fiksira. Prilagođeni skin može slobodno upućivati na promenljive teme — pogledajte tabelu tokena.

## Koncept {#concept}

### Tokeni {#tokens}

Token je CSS custom property sa imenom `--tf-*`. Ključ kataloga je camelCase oblik CSS sufiksa: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Vrednosti su obični stringovi — boje, kompletne skraćenice ivica, senke, razmaci, radijusi.

Svako pravilo skina u biblioteci postoji **jednom** i čita svoj token sa rezervnom vrednošću jednakom klasičnoj (osnovnoj) vrednosti:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Razrešeni skin emituje samo svoja **preklapanja** kao promenljive; CSS rezervne vrednosti nose osnovu. Promenljive se pojavljuju u korenu uređivača — i, pošto se meniji i dijalozi teleportuju iz njega, na `SkinScope` omotaču svakog menija i na samoj kartici dijaloga, pa tokeni prate svaku površinu.

### Oblik {#shape}

Šest oznaka odlučuje koji se skupovi pravila primenjuju; tokeni ih boje:

| oznaka | vrednosti | šta prebacuje |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar uzvišenje + bez unutrašnje tanke linije naspram ravne obojene trake |
| `groups` | `box` · `flat` | odeljci trake sa alatima kao izdignuti **VBtnGroup** okviri (markup iz 0.3.2: spojena dugmad, tokeni grupe boje okvir) naspram običnih flex div nizova |
| `buttons` | `vuetify` · `quiet` | izvorna Vuetify dugmad naspram „ghost“ dugmadi sa neutralnim stanjem pritiska |
| `bubble` | `card` · `flat` | zadržano radi kompatibilnosti: bubble meniji su jedan red dugmadi sa ikonama obojen tokenima u oba oblika (njihova dugmad prate `buttons`) |
| `dialog` | `classic` · `soft` | razdelnik ispod naslova, izdignuto zatvaranje naspram meke kartice, tekstualno zatvaranje |
| `menu` | `vuetify` · `soft` | padajući meniji: Vuetify lista naspram lagane kartice sa razmakom |

Razrešeni oblik je kodiran na korenu uređivača kao šest klasa `.tiptapify-shape-{flag}-{value}` i izložen kao `shape: ComputedRef<ResolvedShape>` na [`useTiptapifyConfig()`](/sr/api/types#usetiptapifyconfig) za prilagođene komponente trake sa alatima.

### Extends {#extends}

Skin se razrešava nad klasičnom osnovom, zatim njegovim lancem `extends` od korena, pa njegovim sopstvenim članovima:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Karike koje nedostaju razrešavaju se na akumulirani lanac (sa upozorenjem u razvoju); ciklus se razrešava na classic (sa upozorenjem u razvoju). Registrovani skin se referencira po imenu; inline objekat skina može da `extends` registrovano ime i nikada ne ulazi u globalni registar — prilagođeni skinovi nikada ne cure između uređivača. Nepoznati ključevi tokena se ignorišu uz upozorenje u razvoju.

Demonstracije uživo sva tri oblika nalaze se na [stranici primera skinova](/sr/examples/skins).

## Katalog tokena {#token-catalog}

Tabele u nastavku su **v1 ugovor**: ključevi kataloga (`TiptapifySkinColors` / `TiptapifySkinMetrics`) su imena koja možete postaviti. Ćelije classic su CSS rezervne vrednosti — vrednost koju osnovna pravila boje kada nijedan skin ne preklapa token.

### Traka sa alatima / traka {#toolbar-bar}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Stavke / grupe / razdelnici {#items-groups-dividers}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Izmerena classic ćelija je `normal` — izvorna flex vrednost Vuetify-a, koju nosi CSS rezervna vrednost. Osnovna vrednost kataloga `0px` je ekvivalentna eksplicitna dužina za preklapanja skina.

<a id="shadow-cells"></a>² Ćelije koje glase „Vuetify elevation *n*“ su opisne: tačan string trostruke senke je izmerena vrednost u pohranjenom baznom fixture-u (`src/skins/__fixtures__/skin-baseline.json`) i ujedno CSS rezervna vrednost. Za `groupShadow` to je **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — pod `groups: 'box'` odeljak je VBtnGroup (`elevation="4"`), a pravilo tokena boji okvir ovom trojkom preko sopstvenog uzvišenja grupe: okvir poseduje uzvišenje, spojena dečja dugmad ga ne nose.

### Dugmad {#buttons}

Ovi tokeni se koriste **samo pod `buttons: 'quiet'`** — pogledajte [Dostupnost](#reachability).

| token | CSS promenljiva | quiet vrednost (classic: izvorni Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble meniji (izbor, prazan red, slika) {#bubble-menus-selection-empty-line-image}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | isto |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | isto |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | isto |

### Padajući meniji {#dropdown-menus}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Okvir **liste** (radijus, senka, razmak liste) classic menija je danas pravilo skina — omotač tokena `SkinScope` stoji između sopstvenog dečjeg pravila Vuetify-a i liste, pa biblioteka vraća te piksele kao pravila skina koja čitaju gornje tokene. Pikseli **stavki** ostaju izvorni Vuetify (fixture meri Vuetify podrazumevane vrednosti): četiri tokena stavki su neaktivna dok je `menu: 'vuetify'`.

### Dijalozi {#dialogs}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | podrazumevano polje (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Okvir (omotač ivice uređivača) {#frame-editor-border-wrapper}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez gornje ivice | puna ivica |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Pod oblikom ravne trake sa alatima okvir boji i deltu po stranama (gornju ivicu i donju ivicu pri 1,6× neprozirnosti ivice). Ta delta pripada obliku, a ne tokenu: nije dostupna preko tokena.

### Slike i ručice za promenu veličine {#images-and-resize-handles}

| token | CSS promenljiva | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (izabrana) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Traka sa alatima slike prati oznaku `buttons`: pod quiet oblikom dobija quiet površinu — njen razmak od 2px/4px čita `--tf-bubble-gap` / `--tf-bubble-padding` sa rezervnim vrednostima menija slike; ne postoji poseban token trake sa alatima slike.

### Nije u katalogu (teritorija izlaza u nuždi) {#not-in-the-catalog-escape-hatch-territory}

Neke dimenzije pomenute u pregledu dizajna nemaju token u katalogu u v1: **visina trake sa alatima, širina okvira, radijus okvira, širina dugmeta, razmak dugmeta, širina dijaloga**. Tabele kataloga iznad su ugovor; za te piksele otvorite [izlaz u nuždi](#escape-hatch-the-root-class) i stilizujte stabilne klase direktno.

## Dostupnost {#reachability}

Ugovor, naveden jednom i poštovan u svakoj grupi iznad:

> Token boji površinu samo kada je oblik aktivira; izvorni Vuetify vizuali stilizuju se bojama Vuetify teme.

Po grupi:

- **Traka sa alatima, okvir, okvir slike/ručice** — aktivni u svakom obliku; tokeni ih boje, classic ćelije su izvorni izgled na koji se tokeni vraćaju.
- **Okvir grupa** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — pod `groups: 'box'` odeljak je VBtnGroup (struktura iz 0.3.2: dugmad se spajaju, okvir nosi uzvišenje); pravila okvira boje ga tokenima grupe, a `--tf-group-height` drži ugovor od 32px sa `!important` (Vuetify pravilo gustine se bori protiv njega, kao u 0.3.2). Pod `groups: 'flat'` odeljci su obični div nizovi (providni, bez senke, radijus 0 je osnova tog oblika).
- **Tanke linije razdelnika** (`dividerWidth/Height/Color`) — vidljiva tanka linija je mogućnost oblika `groups: 'flat'`; u obliku box razdelnik je razmaknica nulte veličine (`margin: 0 4px` iz osnovnog pravila).
- **Razmaci/pomeraji stavki** — kompaktan niz `6px 8px` vezan je za ravnu traku (`toolbar: 'flat'`), razmaci grupa za ravne odeljke (`groups: 'flat'`); izdignuta traka zadržava classic metrike.
- **Dugmad** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — neaktivni pod `buttons: 'vuetify'`: izvorna Vuetify dugmad boje svoja stanja. Stilizujte ih bojama Vuetify teme (`primary`, `surface`, …) — classic oblici ih namerno nasleđuju.
- **Metrike stavki menija** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — neaktivne pod `menu: 'vuetify'`; Vuetify poseduje te piksele stavki. Okvir **liste** menija (radijus/senka/razmak) boji skin u oba oblika (pogledajte [napomenu o meniju](#menu-classic-note)).
- **Meki izgled dijaloga** (`dialogActionBtn*`, `dialogFieldRadius`, meki razmaci, odsutni razdelnik) — boji se pod `dialog: 'soft'`; pod `dialog: 'classic'` dijalog je VCard sa classic razmacima.
- **Bubble okvir** — meniji izbora, praznog reda i slike su jedan red dugmadi sa ikonama u oba oblika, obojen bubble tokenima; `bubble` više ne menja njihov markup.

Preklapanje jednako osnovi kataloga **ne emituje se** — pod ne-classic oblikom sopstvena osnova oblika boji se preko CSS rezervne vrednosti, pa „vraćanje“ classic vrednosti (npr. postavljanje `buttonActiveBg` nazad na `rgb(var(--v-theme-primary))` pod `buttons: 'quiet'`) tiho ne radi ništa. Da biste nametnuli vrednost classic izgleda pod ne-classic oblikom, postavite preklapanje koje se razlikuje od osnove kataloga — ekvivalentan literal poput `rgba(var(--v-theme-primary), 1)` boji identično i preživljava preskakanje.

Tokeni namerno nisu povezani u izvorne putanje — to je ono što drži `default` identičnim piksel po piksel classic izgledu, dok sve prolazi kroz katalog.

## Recepti {#recipes}

### Proširenje pastela {#extend-pastel}

Nasledite quiet oblik i prefarbajte nekoliko površina. Registrovani nazivi rade na bilo kom uređivaču:

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

Oblik (flat/quiet/soft) dolazi iz pastela; netaknuti tokeni zadržavaju pastel vrednosti — quiet pozadina dugmadi ostaje neutralna, pomera se samo ono što preklopite. Ovo je skin prikazan uživo na [stranici primera](/sr/examples/skins#custom-mint).

### Proširenje default skina {#extend-default}

Zadržite classic strukturu, podesite boje:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` je podrazumevani koren, pa se ključ može izostaviti: `{ toolbar: 'flat', … }` takođe polazi od classic.

### Potpuno prilagođeni {#full-custom}

Bez `extends`, bez registracije: prosledite objekat u prop `skin` i slobodno postavite oznake oblika i tokene. `name` stavlja vašu oznaku na korenu klasu (pogledajte ispod); bez njega je `tiptapify-skin-inline`.

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

`defineSkin` je pomoćna identitetska funkcija za tipizirane konstantne definicije (ne ulazi ni u jedan registar). Oznake oblika mogu se postavljati pojedinačno — svaka izostavljena oznaka ostaje classic.

## Izlaz u nuždi: korena klasa {#escape-hatch-the-root-class}

Svaki koren uređivača nosi `tiptapify-skin-{name}` (`tiptapify-skin-inline` za inline objekat bez imena). Biblioteka **nikada ne vezuje nijedno pravilo za naziv skina** — klasa je vaša:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilne kuke za koje možete pisati pravila:

| klasa | gde |
|---|---|
| `tiptapify-skin-{name}` | koren uređivača |
| `tiptapify-shape-{flag}-{value}` ×6 | koren uređivača — razrešeni oblik |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | traka sa alatima i njeni odeljci |
| `tiptapify-quiet-buttons` | koreni trake sa alatima i bubble menija pod `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | red svakog bubble menija i tanka linija između njegovih grupa |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | redovi menija izbora, praznog reda i slike |
| `tiptapify-btn--active` | pritisnuto dugme bubble menija (aktivna oznaka, plutanje slike) |
| `tiptapify-menu` · `tiptapify-menu--soft` | sadržaj preklopa padajućeg menija, nosilac pravila mekog menija |
| `tiptapify-skin-scope` | div opsega tokena unutar teleportovanih menija |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | kartica dijaloga i njen meki nosilac |
| `tiptapify-frame` | omotač ivice uređivača |

**Odbrana od tema potrošača.** Sloj skinova je napravljen da preživi admin teme koje dodaju razmake i prefarbavaju unutrašnjost Vuetify-a: pravila se vezuju za klase oblika/nosioca, koriste udvojene klase (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) radi specifičnosti i zadržavaju `!important` samo tamo gde se u slučaju admin teme iz osnovnog commit-a pokazalo da je neophodan (skup odbrane menu.css). Konvencije koje održavaju vaša preklapanja na istom bojnom polju:

- ograničite svoj CSS na `.tiptapify-skin-{name}` (ili klasu oblika) — nikada na gole unutrašnje delove Vuetify-a;
- za dimenzije iz kataloga birajte tokene (`--tf-*`), a za ostalo klase;
- uskladite udvajanje pri preklapanju Vuetify komponenti (pojedinačna `.v-list-item` gubi od pravila skina).

## Vizuelni ugovor (napomena za saradnike) {#visual-contract-contributor-note}

Izračunati stilovi ugrađenih skinova fiksirani su baznim fixture-om `src/skins/__fixtures__/skin-baseline.json` (13 odeljaka × svetlo/tamno): CSS sloj je gotov kada se izmerena matrica poklapa sa njim. Napomene za čitanje fixture-a:

- Hover/active dimenzije ne mogu se nametnuti sa stranice, pa snimak čita **tekst deklaracije prvog pogođenog CSSOM pravila** za svaki hover selektor i razrešava ga preko probnog elementa unutar korena skina (polje `resolved`) — to je ugovor pobedničkog pravila, a ne živi snimak `:hover`.
- `_meta.selectors.menu` beleži tekst selektora pre `SkinScope`. Fixture je zamrznut (normativne vrednosti), pa je to polje namerno zastarelo; paket snimanja fiksira trenutni selektor.
- Fixture nosi svoje odobrene izmene u `_meta.notes`: restauracija VBtnGroup markupa od 2026-10-18 pod `groups: 'box'` ponovo je izmerila polja dečje dugmadi `groupBtn`/`buttonsActive` iz classic skina (spojeni uglovi, okvir poseduje uzvišenje). Pastel polja su netaknuta — namerna vizuelna promena ažurira samo zahvaćene classic ćelije, beleži napomenu i isporučuje se sa linijom u CHANGELOG-u.

## Pogledajte i {#see-also}

- [Primeri skinova](/sr/examples/skins) — classic, pastel i prilagođeni mint skin, uživo.
- [Prop `skin`](/sr/api/props#skin) · [tipovi skina](/sr/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/sr/api/types#tiptapifyskininput).
