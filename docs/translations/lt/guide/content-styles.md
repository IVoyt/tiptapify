# Turinio stiliai {#content-styles}

Daliai to, ką išsaugo redaktorius, reikia savo išvaizdos puslapyje, kuris tai rodo: nuorodų kortelėms, paveikslėliams su parašu ir apliejimu, vaizdo įrašams ir įterpiamiems elementams, prisitaikantiems prie teksto pločio, užduočių sąrašams su žymimuoju langeliu prie kiekvieno punkto. Be jos nuorodos kortelė yra plika nuoroda, kurioje paveikslėlis ir tekstai susilieja.

Savybė `contentStyles` nurodo, kaip išsaugotas HTML perduoda tą išvaizdą:

| `contentStyles` | išsaugotas HTML | svetainėje |
|---|---|---|
| `inline` (numatytoji) | išvaizda įrašoma į šių elementų `style` atributus | nieko nereikia įkelti: HTML rodomas toks, koks yra |
| `classes` | tik klasės ir `data-` atributai | įkelkite `tiptapify/content.css` ir įdėkite HTML į elementą su klase `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Abu perduoda tas pačias taisykles, kuriomis pats redaktorius rodo turinį, todėl puslapis abiem atvejais atrodo kaip redaktorius. Jas gauna tik šie elementai: antraštės, pastraipos, sąrašai, lentelės ir kitas tekstas išlaiko svetainės savo stilius.

## Įterptieji stiliai {#inline-styles}

Numatytasis būdas. Kompaktiška nuorodos kortelė išsaugoma taip:

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

- **Spalvos lieka svetainės.** Tekstas paveldi savo spalvą; pritemdytas tekstas ir kraštinės naudoja nepermatomumą ir pusiau permatomą pilką, todėl vienodai tinka šviesiam ir tamsiam puslapiui. Temos teksto spalvą nustatykite svetainėje kaip įprasta.
- **Medijos užklausų nereikia.** Kompaktiška kortelė siaurame stulpelyje pati padeda paveikslėlį virš tekstų; vaizdo įrašai ir įterpiami elementai niekada nebūna platesni už tekstą.
- **Svetainė vis tiek gali juos perstiliuoti**, klasės lieka. Įterptasis stilius nugali klasės taisyklę, todėl tokiai taisyklei reikia `!important`.
- **Sanitizatorius turi išlaikyti atributą `style`** šiuose elementuose, kitaip jie praranda savo išvaizdą.

## Klasės ir content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` yra mažas ir jame nėra nei Vue, nei Vuetify. Jo taisyklės apgaubtos `:where(.tiptapify-content)`, todėl jos nieko nesveria: bet kuri svetainės taisyklė nugali jas be `!important`. Naudokite tai, kai svetainė nori išvaizdos vienoje vietoje arba pati stilizuoja savo turinį.

`contentCss(scope)` pateikia tą patį stilių lapą kaip eilutę kitai klasei nei `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## HTML įkėlimas atgal {#loading-html-back}

Redaktorius šiuos elementus skaito tik pagal jų atributus ir klases: nuorodos kortelę pagal `data-link-card`, paveikslėlį pagal jo `src`, dydį ir apliejimą, užduotį pagal `data-checked`. Jų įterptieji stiliai įkeliant HTML ignoruojami, o išsaugant įrašomi iš naujo. Todėl tas pats HTML keliauja pirmyn ir atgal nepakitęs, dokumentas, išsaugotas su `inline`, švariai įkeliamas su `classes` ir atvirkščiai, o vėlesnė redaktoriaus versija atnaujina dokumento išvaizdą kitą kartą jį išsaugant.

Teksto formatavimas neliečiamas: teksto spalva ar dydis ir pastraipos lygiavimas yra turinys, ir redaktorius toliau juos skaito iš jų stilių.

Norėdami klasėmis paremtą HTML paversti HTML su įterptaisiais stiliais už redaktoriaus ribų (senesnis dokumentas, el. laiškas), naudokite `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Jam reikia DOM (naršyklės arba jsdom serveryje), o be jo grąžina HTML tokį, koks yra.

## Paveikslėlių skaidrės {#image-sliders}

Redaktorius rašant pažymi iš eilės einančius paveikslėlius kaip skaidrių demonstraciją (žr. savybę `imageSlider`); išsaugotas HTML palieka juos kaip figūras viena po kitos. Rodyti juos kaip skaidrių demonstraciją yra paties svetainės scenarijaus reikalas.
