# Estilos de conteúdo {#content-styles}

Parte do que o editor guarda precisa de um aspeto próprio na página que o apresenta: cartões de ligação, imagens com legenda e float, vídeos e embeds que se ajustam à largura do texto, listas de tarefas com uma caixa de seleção ao lado de cada item. Sem ele, um cartão de ligação é apenas uma ligação com a imagem e os textos misturados.

A propriedade `contentStyles` define como o HTML guardado transporta esse aspeto:

| `contentStyles` | o HTML guardado | no site |
|---|---|---|
| `inline` (predefinição) | o aspeto é escrito nos atributos `style` destes elementos | nada a carregar: o HTML aparece tal como está |
| `classes` | apenas classes e atributos `data-` | carregue `tiptapify/content.css` e coloque o HTML num elemento com a classe `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Ambos transportam as mesmas regras, as que o próprio editor usa para mostrar o conteúdo, pelo que a página fica igual ao editor nos dois casos. Só estes elementos as recebem: títulos, parágrafos, listas, tabelas e o resto do texto mantêm os estilos do site.

## Estilos inline {#inline-styles}

A predefinição. Um cartão de ligação compacto é guardado assim:

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

- **As cores continuam a ser as do site.** O texto herda a cor; os textos atenuados e os contornos usam opacidade e um cinzento semitransparente, pelo que funcionam tanto numa página clara como numa escura. Defina a cor do texto de um tema no site como habitualmente.
- **Não são necessárias media queries.** Um cartão compacto coloca a imagem acima dos textos por si só numa coluna estreita; os vídeos e os embeds nunca ficam mais largos do que o texto.
- **Um site pode, ainda assim, alterar-lhes o estilo**, as classes permanecem. Um estilo inline prevalece sobre uma regra de classe, por isso uma regra dessas precisa de `!important`.
- **Um sanitizador tem de manter o atributo `style`** nestes elementos, caso contrário perdem o seu aspeto.

## Classes e content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` é pequeno e não tem Vue nem Vuetify no seu interior. As suas regras estão envolvidas em `:where(.tiptapify-content)`, pelo que não têm peso nenhum: qualquer regra do site prevalece sobre elas sem `!important`. Use-o quando o site quiser o aspeto num só sítio ou estilizar ele próprio o seu conteúdo.

`contentCss(scope)` devolve a mesma folha de estilos como string, para uma classe diferente de `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Carregar o HTML de volta {#loading-html-back}

O editor lê estes elementos apenas pelos atributos e classes: um cartão de ligação por `data-link-card`, uma imagem por `src`, tamanho e float, uma tarefa por `data-checked`. Os estilos inline são ignorados quando o HTML é carregado e escritos de novo quando é guardado. Assim, o mesmo HTML vai e volta sem alterações, um documento guardado com `inline` carrega sem problemas com `classes` e vice-versa, e uma versão posterior do editor atualiza o aspeto de um documento da próxima vez que este for guardado.

A formatação do texto não é alterada: a cor ou o tamanho de um texto e o alinhamento de um parágrafo são conteúdo, e o editor continua a lê-los a partir dos seus estilos.

Para converter HTML com classes em HTML com estilos inline fora do editor (um documento antigo, um e-mail), use `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Precisa de um DOM (um navegador, ou jsdom num servidor) e, sem ele, devolve o HTML tal como está.

## Sliders de imagens {#image-sliders}

O editor marca as imagens seguidas como um slider enquanto escreve (consulte a propriedade `imageSlider`); o HTML guardado mantém-nas como figuras umas a seguir às outras. Mostrá-las como slider fica a cargo do script do próprio site.
