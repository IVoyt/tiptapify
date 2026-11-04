# Sisältötyylit {#content-styles}

Osa editorin tallentamasta sisällöstä tarvitsee oman ulkoasunsa sivulla, joka sen näyttää: linkkikortit, kuvat kuvatekstineen ja kelluvuuksineen, tekstin leveyteen mukautuvat videot ja upotukset sekä tehtävälistat, joissa jokaisen kohdan vieressä on valintaruutu. Ilman sitä linkkikortti on pelkkä linkki, jossa kuva ja tekstit ovat yhtenä sotkuna.

`contentStyles`-propi määrää, miten tallennettu HTML kantaa tämän ulkoasun:

| `contentStyles` | tallennettu HTML | sivustolla |
|---|---|---|
| `inline` (oletus) | ulkoasu kirjoitetaan näiden elementtien `style`-attribuutteihin | mitään ei tarvitse ladata: HTML näkyy sellaisenaan |
| `classes` | vain luokat ja `data-`-attribuutit | lataa `tiptapify/content.css` ja laita HTML elementtiin, jolla on luokka `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Molemmat kantavat samat säännöt, joilla editori itse näyttää sisällön, joten sivu näyttää editorilta kummassakin tapauksessa. Vain nämä elementit saavat ne: otsikot, kappaleet, listat, taulukot ja muu teksti säilyttävät sivuston omat tyylit.

## Inline-tyylit {#inline-styles}

Oletus. Kompakti linkkikortti tallennetaan näin:

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

- **Värit pysyvät sivuston omina.** Teksti perii värinsä; himmeä teksti ja reunat käyttävät läpinäkyvyyttä ja puoliksi läpinäkyvää harmaata, joten ne toimivat yhtä hyvin vaalealla ja tummalla sivulla. Aseta teemakohtainen tekstin väri sivustolla tavalliseen tapaan.
- **Media queryja ei tarvita.** Kompakti kortti asettaa kuvansa itse tekstien yläpuolelle kapeassa sarakkeessa; videot ja upotukset eivät koskaan ole tekstiä leveämpiä.
- **Sivusto voi silti muotoilla ne uudelleen**, luokat säilyvät. Inline-tyyli voittaa luokkasäännön, joten tällainen sääntö tarvitsee `!important`-merkinnän.
- **Sanitizerin on säilytettävä `style`-attribuutti** näissä elementeissä, muuten ne menettävät ulkoasunsa.

## Luokat ja content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` on pieni, eikä siinä ole Vueta tai Vuetifyä. Sen säännöt on kääritty muotoon `:where(.tiptapify-content)`, joten niillä ei ole painoarvoa: mikä tahansa sivuston sääntö voittaa ne ilman `!important`-merkintää. Käytä sitä, kun sivusto haluaa ulkoasun yhteen paikkaan tai tyylittelee sisältönsä itse.

`contentCss(scope)` antaa saman tyylitiedoston merkkijonona, muulle luokalle kuin `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML:n lataaminen takaisin {#loading-html-back}

Editori lukee nämä elementit vain niiden attribuuttien ja luokkien perusteella: linkkikortin `data-link-card`-attribuutista, kuvan `src`-arvosta, koosta ja kelluvuudesta, tehtävän `data-checked`-attribuutista. Niiden inline-tyylit ohitetaan HTML:ää ladattaessa ja kirjoitetaan uudelleen tallennettaessa. Näin sama HTML kulkee edestakaisin muuttumattomana, `inline`-tilassa tallennettu dokumentti latautuu puhtaasti `classes`-tilassa ja päinvastoin, ja editorin myöhempi versio päivittää dokumentin ulkoasun seuraavalla tallennuskerralla.

Tekstin muotoiluun ei kosketa: tekstin väri tai koko ja kappaleen tasaus ovat sisältöä, ja editori lukee ne edelleen niiden tyyleistä.

Jos haluat muuttaa luokkapohjaisen HTML:n inline-tyylitetyksi HTML:ksi editorin ulkopuolella (vanhempi dokumentti, sähköposti), käytä `inlineContentStyles`-funktiota:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Se tarvitsee DOMin (selaimen tai palvelimella jsdomin) ja palauttaa ilman sitä HTML:n sellaisenaan.

## Kuvaliukusäätimet {#image-sliders}

Editori merkitsee peräkkäiset kuvat liukusäätimeksi kirjoittaessasi (katso `imageSlider`-propi); tallennettu HTML säilyttää ne peräkkäisinä kuvina. Niiden näyttäminen liukusäätimenä on sivuston oman skriptin tehtävä.
