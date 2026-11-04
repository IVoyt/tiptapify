# Skinovi {#skins}

**Skin** je jedan izgled okvira uređivača: alatne trake, gumba i grupa u njoj, bubble izbornika, padajućih izbornika, dijaloga, okvira oko sadržaja i okvira za odabir slike. Odabire ga prop `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skin se sastoji od dvije stvari: **tokena** (boje i veličine kao CSS varijable) i **oblika** (strukturnih varijanti koje token ne može izraziti). Dva ugrađena skina su `default` — klasičan izgled, podignuta alatna traka s podignutim grupama gumba — i `pastel`, smiren izgled. Prilagođeni skinovi ravnopravni su: `registerSkin()` i inline objekti skinova razrješavaju se potpuno istim mehanizmom, a ugrađeni skinovi su registrirani skinovi, a ne posebni slučajevi.

## Terminologija: skin naspram Vuetify teme {#terminology-skin-vs-vuetify-theme}

- **skin** — korisnički pojam za jedan izgled okvira uređivača: tokeni + oblik. Prop je `skin`, tipovi su `TiptapifySkin*`, registar je `registerSkin()`, korijenska klasa je `tiptapify-skin-{name}`.
- **tema** — rezervirano za Vuetifyjeve svijetle/tamne teme. Tiptapify komponente svoje propove `theme` hrane imenom trenutne Vuetify teme; sustav skinova ih nikad ne dira.

Oni se kombiniraju: većina boja ugrađenih tokena upućuje na varijable Vuetify teme (`rgb(var(--v-theme-surface))`, …), pa skinovi automatski prate svijetli/tamni način. Ćelije s fiksnom tamnom bojom u stupcu classic — ručka za promjenu veličine (`rgba(0, 0, 0, .5/.8)`), običan obrub slike, sjena bubble izbornika i sjene uzdignutosti izbornika/dijaloga — namjerne su: klasičan izgled u obje teme crta neutralan tamni okvir, a izmjerena osnovica ih fiksira. Prilagođeni skin može slobodno upućivati na varijable teme — vidi tablicu tokena.

## Koncept {#concept}

### Tokeni {#tokens}

Token je CSS prilagođeno svojstvo imena `--tf-*`. Ključ kataloga je camelCase oblik CSS sufiksa: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Vrijednosti su obični stringovi — boje, potpune skraćene oznake obruba, sjene, razmaci, radijusi.

Svako pravilo skina u biblioteci postoji **jednom** i čita svoj token s rezervnom vrijednošću jednakom klasičnoj (osnovnoj) vrijednosti:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Razriješeni skin emitira kao varijable samo svoja **nadjačavanja**; CSS rezervne vrijednosti nose osnovicu. Varijable završavaju na korijenu uređivača — i, jer se izbornici i dijalozi teleportiraju izvan njega, na `SkinScope` omotaču svakog izbornika i na samoj kartici dijaloga, pa tokeni prate svaku površinu.

### Oblik {#shape}

Šest zastavica odlučuje koji se skupovi pravila primjenjuju; tokeni ih boje:

| zastavica | vrijednosti | što prebacuje |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar uzdignutost + bez unutarnje tanke crte naspram ravne obojene trake |
| `groups` | `box` · `flat` | odjeljci alatne trake kao podignuti okviri **VBtnGroup** (oznake iz 0.3.2: spojeni gumbi, tokeni grupe boje okvir) naspram običnih flex div nizova |
| `buttons` | `vuetify` · `quiet` | izvorni Vuetify gumbi naspram ghost gumba s neutralnim stanjem pritisnutosti |
| `bubble` | `card` · `flat` | zadržano radi kompatibilnosti: bubble izbornici su u oba oblika jedan red ikonskih gumba obojen tokenima (njihovi gumbi prate `buttons`) |
| `dialog` | `classic` · `soft` | razdjelnik ispod naslova, uzdignuto zatvaranje naspram meke kartice, tekstualno zatvaranje |
| `menu` | `vuetify` · `soft` | padajući izbornici: Vuetify popis naspram lagane kartice s razmakom |

Razriješeni oblik kodiran je na korijenu uređivača kao šest klasa `.tiptapify-shape-{flag}-{value}` i izložen kao `shape: ComputedRef<ResolvedShape>` na [`useTiptapifyConfig()`](/hr/api/types#usetiptapifyconfig) za prilagođene komponente alatne trake.

### Extends {#extends}

Skin se razrješava nad klasičnom osnovicom, zatim njegovim lancem `extends` od korijena prema dolje, pa njegovim vlastitim članovima:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Karike koje nedostaju razrješavaju se u dotad skupljeni lanac (uz razvojno upozorenje); ciklus se razrješava u classic (uz razvojno upozorenje). Registrirani skin referencira se imenom; inline objekt skina može `extends` registrirano ime i nikad ne ulazi u globalni registar — prilagođeni skinovi nikad ne cure između uređivača. Nepoznati ključevi tokena zanemaruju se uz razvojno upozorenje.

Demonstracije uživo sva tri oblika nalaze se na [stranici primjera skinova](/hr/examples/skins).

## Katalog tokena {#token-catalog}

Tablice u nastavku su **ugovor v1**: ključevi kataloga (`TiptapifySkinColors` / `TiptapifySkinMetrics`) su imena koja možete postaviti. Ćelije classic su CSS rezervne vrijednosti — vrijednost koju osnovna pravila crtaju kad nijedan skin ne nadjačava token.

### Alatna traka / traka {#toolbar-bar}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Stavke / grupe / razdjelnici {#items-groups-dividers}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify uzdignutost 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (razmaknica: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Izmjerena classic ćelija je `normal` — izvorna flex vrijednost Vuetifyja, koju nosi CSS rezervna vrijednost. Osnovna vrijednost kataloga `0px` je ekvivalentna izričita duljina za nadjačavanja skina.

<a id="shadow-cells"></a>² Ćelije koje glase „Vuetify uzdignutost *n*“ su opisne: točan string trostruke sjene je izmjerena vrijednost u pohranjenom baseline fixtureu (`src/skins/__fixtures__/skin-baseline.json`) i ujedno je CSS rezervna vrijednost. Za `groupShadow` to je **uzdignutost 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — pod `groups: 'box'` odjeljak je VBtnGroup (`elevation="4"`), a pravilo tokena boji okvir ovom trojkom preko vlastite uzdignutosti grupe: okvir posjeduje uzdignutost, spojeni potomci gumbi je ne nose.

### Gumbi {#buttons}

Ovi tokeni koriste se **samo pod `buttons: 'quiet'`** — vidi [Dohvatljivost](#reachability).

| token | CSS varijabla | quiet vrijednost (classic: izvorni Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble izbornici (odabir, prazan redak, slika) {#bubble-menus-selection-empty-line-image}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | isto |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | isto |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | isto |

### Padajući izbornici {#dropdown-menus}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify uzdignutost 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ **Okvir popisa** (radijus, sjena, razmak popisa) klasičnog izbornika danas je pravilo skina — omotač tokena `SkinScope` nalazi se između Vuetifyjeva vlastitog pravila potomka i popisa, pa biblioteka te piksele vraća kao pravila skina koja čitaju gornje tokene. Pikseli **stavki** ostaju izvorni Vuetify (fixture mjeri Vuetifyjeve zadane vrijednosti): četiri tokena stavke su neaktivna dok je `menu: 'vuetify'`.

### Dijalozi {#dialogs}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard uzdignutost [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | zadano za polje (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Okvir (omotač obruba uređivača) {#frame-editor-border-wrapper}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez gornjeg ruba | puni obrub |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Pod oblikom ravne alatne trake okvir crta i razliku po strani (gornji rub i donji rub na 1,6× neprozirnosti obruba). Ta razlika pripada obliku, a ne tokenu: nije dohvatljiva tokenom.

### Slike i ručke za promjenu veličine {#images-and-resize-handles}

| token | CSS varijabla | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (odabrano) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Alatna traka slike prati zastavicu `buttons`: pod oblikom quiet dobiva quiet površinu — njezini razmaci od 2px/4px čitaju `--tf-bubble-gap` / `--tf-bubble-padding` s rezervnim vrijednostima izbornika slike; ne postoji poseban token za alatnu traku slike.

### Nije u katalogu (područje izlaza za nuždu) {#not-in-the-catalog-escape-hatch-territory}

Neke dimenzije navedene u pregledu dizajna u v1 nemaju token u katalogu: **visina alatne trake, širina okvira, radijus okvira, širina gumba, razmak gumba, širina dijaloga**. Tablice kataloga gore su ugovor; za te piksele otvorite [izlaz za nuždu](#escape-hatch-the-root-class) i stilizirajte stabilne klase izravno.

## Dohvatljivost {#reachability}

Ugovor, naveden jednom i poštovan u svakoj gornjoj skupini:

> Token boji površinu samo kad oblik tu površinu aktivira; izvorni Vuetify vizuali stiliziraju se bojama Vuetify teme.

Po skupinama:

- **Alatna traka, okvir, okvir slike/ručke** — aktivni u svakom obliku; tokeni ih boje, classic ćelije su izvorni izgled na koji se tokeni vraćaju.
- **Okvir grupa** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — pod `groups: 'box'` odjeljak je VBtnGroup (struktura iz 0.3.2: gumbi se spajaju, okvir nosi uzdignutost); pravila okvira boje ga tokenima grupe, a `--tf-group-height` drži ugovor od 32px s `!important` (Vuetifyjevo pravilo gustoće se bori protiv njega, kao u 0.3.2). Pod `groups: 'flat'` odjeljci su obični div nizovi (prozirni, bez sjene, radijus 0 je osnovica oblika).
- **Tanke crte razdjelnika** (`dividerWidth/Height/Color`) — vidljiva tanka crta je mogućnost oblika `groups: 'flat'`; u obliku box razdjelnik je razmaknica nulte veličine (`margin: 0 4px` iz osnovnog pravila).
- **Razmak/praznine stavki** — kompaktni niz `6px 8px` ograničen je na ravnu traku (`toolbar: 'flat'`), praznine grupa na ravne odjeljke (`groups: 'flat'`); podignuta traka zadržava klasične metrike.
- **Gumbi** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — neaktivni pod `buttons: 'vuetify'`: izvorni Vuetify gumbi crtaju vlastita stanja. Stilizirajte ih bojama Vuetify teme (`primary`, `surface`, …) — klasični oblici ih namjerno nasljeđuju.
- **Metrike stavki izbornika** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — neaktivne pod `menu: 'vuetify'`; Vuetify posjeduje te piksele stavki. **Okvir popisa** izbornika (radijus/sjena/razmak) crta skin u oba oblika (vidi [napomenu o izborniku](#menu-classic-note)).
- **Meki okvir dijaloga** (`dialogActionBtn*`, `dialogFieldRadius`, meki razmaci, nepostojeći razdjelnik) — crta se pod `dialog: 'soft'`; pod `dialog: 'classic'` dijalog je VCard s klasičnim razmacima.
- **Bubble okvir** — izbornici odabira, praznog retka i slike su u oba oblika jedan red ikonskih gumba, obojen bubble tokenima; `bubble` im više ne mijenja oznake.

Nadjačavanje jednako osnovici kataloga **ne emitira se** — pod ne-klasičnim oblikom osnovicu oblika crta CSS rezervna vrijednost, pa „vraćanje“ klasične vrijednosti (npr. postavljanje `buttonActiveBg` natrag na `rgb(var(--v-theme-primary))` pod `buttons: 'quiet'`) tiho ne radi ništa. Da biste pod ne-klasičnim oblikom iznudili klasičnu vrijednost, postavite nadjačavanje koje se razlikuje od osnovice kataloga — ekvivalentan literal poput `rgba(var(--v-theme-primary), 1)` crta identično i preživljava preskakanje.

Tokeni namjerno nisu spojeni na izvorne putanje — to je ono što drži `default` identičnim klasičnom izgledu do na piksel, dok sve prolazi kroz katalog.

## Recepti {#recipes}

### Proširivanje pastela {#extend-pastel}

Naslijedite quiet oblik i prebojite nekoliko površina. Registrirana imena rade na svakom uređivaču:

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

Oblik (flat/quiet/soft) dolazi iz pastela; neizmijenjeni tokeni zadržavaju vrijednosti pastela — quiet neutralna boja gumba ostaje neutralna, mijenja se samo ono što nadjačate. Ovo je skin prikazan uživo na [stranici primjera](/hr/examples/skins#custom-mint).

### Proširivanje zadanog skina {#extend-default}

Zadržite klasičnu strukturu, prilagodite boje:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` je implicitni korijen, pa se ključ može izostaviti: `{ toolbar: 'flat', … }` također kreće od classic.

### Potpuno prilagođeni {#full-custom}

Bez `extends`, bez registracije: proslijedite objekt propu `skin` i slobodno postavite zastavice oblika i tokene. `name` stavlja vašu oznaku na korijensku klasu (vidi dolje); bez njega to je `tiptapify-skin-inline`.

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

`defineSkin` je pomoćna identitetna funkcija za tipizirane const definicije (ne ulazi ni u jedan registar). Zastavice oblika mogu se postavljati pojedinačno — svaka izostavljena zastavica ostaje classic.

## Izlaz za nuždu: korijenska klasa {#escape-hatch-the-root-class}

Svaki korijen uređivača nosi `tiptapify-skin-{name}` (`tiptapify-skin-inline` za inline objekt bez imena). Biblioteka **nikad ne veže nijedno pravilo za ime skina** — klasa je vaša:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilne kuke za pisanje stilova:

| klasa | gdje |
|---|---|
| `tiptapify-skin-{name}` | korijen uređivača |
| `tiptapify-shape-{flag}-{value}` ×6 | korijen uređivača — razriješeni oblik |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | alatna traka i njezini odjeljci |
| `tiptapify-quiet-buttons` | korijeni alatne trake i bubble izbornika pod `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | red svakog bubble izbornika i tanka crta između njegovih grupa |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | redovi izbornika odabira, praznog retka i slike |
| `tiptapify-btn--active` | pritisnuti gumb bubble izbornika (aktivna oznaka, plutanje slike) |
| `tiptapify-menu` · `tiptapify-menu--soft` | sadržaj preklapanja padajućeg izbornika, nositelj pravila mekog izbornika |
| `tiptapify-skin-scope` | div opsega tokena unutar teleportiranih izbornika |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | kartica dijaloga i njezin meki nositelj |
| `tiptapify-frame` | omotač obruba uređivača |

**Obrana od korisničke teme.** Sloj skinova izgrađen je da preživi admin teme koje dodaju razmake i prebojavaju unutrašnjost Vuetifyja: pravila se ograničavaju klasama oblika/nositelja, koriste udvostručene klase (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) radi specifičnosti i `!important` zadržavaju samo gdje se u slučaju admin teme iz osnovnog commita pokazao nužnim (skup obrane iz menu.css). Konvencije koje održavaju vaša vlastita nadjačavanja ispravnima na istom bojištu:

- ograničite svoj CSS pod `.tiptapify-skin-{name}` (ili klasu oblika) — nikad na goli unutarnji Vuetify;
- za dimenzije iz kataloga radije koristite tokene (`--tf-*`), a klase za ostalo;
- uskladite udvostručenje pri nadjačavanju Vuetify komponenti (jedan `.v-list-item` gubi od pravila skina).

## Vizualni ugovor (napomena za suradnike) {#visual-contract-contributor-note}

Izračunati stilovi ugrađenih skinova fiksirani su baseline fixtureom `src/skins/__fixtures__/skin-baseline.json` (13 odjeljaka × svijetlo/tamno): CSS sloj je gotov kad izmjerena matrica odgovara fixtureu. Napomene za čitanje fixturea:

- Hover/active dimenzije ne mogu se iznuditi sa stranice, pa snimanje čita **tekst deklaracije prvog pogođenog CSSOM pravila** za svaki hover selektor i razrješava ga kroz probni element unutar korijena skina (polje `resolved`) — to je ugovor pobjedničkog pravila, a ne snimka stvarnog `:hover`.
- `_meta.selectors.menu` bilježi tekst selektora prije `SkinScope`. Fixture je zamrznut (normativne vrijednosti), pa je to polje namjerno zastarjelo; bundle snimanja fiksira trenutni selektor.
- Fixture nosi svoje odobrene promjene u `_meta.notes`: obnova VBtnGroup oznaka pod `groups: 'box'` od 2026-10-18 ponovno je izmjerila classic polja potomaka `groupBtn`/`buttonsActive` (spojeni kutovi, okvir posjeduje uzdignutost). Polja pastela nisu dirana — namjerna vizualna promjena ažurira samo zahvaćene classic ćelije, bilježi napomenu i isporučuje redak u CHANGELOG-u.

## Vidi i {#see-also}

- [Primjeri skinova](/hr/examples/skins) — classic, pastel i prilagođeni mint skin, uživo.
- [prop `skin`](/hr/api/props#skin) · [tipovi skinova](/hr/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/hr/api/types#tiptapifyskininput).
