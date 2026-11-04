# Estilos de conteúdo {#content-styles}

Parte do que o editor salva precisa de uma aparência própria na página que o exibe: cartões de link, imagens com legenda e float, vídeos e embeds que se ajustam à largura do texto, listas de tarefas com uma caixa de seleção ao lado de cada item. Sem ela, um cartão de link é apenas um link com imagem e textos misturados.

A prop `contentStyles` define como o HTML salvo carrega essa aparência:

| `contentStyles` | o HTML salvo | no site |
|---|---|---|
| `inline` (padrão) | a aparência é gravada nos atributos `style` desses elementos | nada a carregar: o HTML aparece como está |
| `classes` | apenas classes e atributos `data-` | carregue `tiptapify/content.css` e coloque o HTML em um elemento com a classe `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Ambos carregam as mesmas regras, as que o próprio editor usa para exibir o conteúdo, então a página fica igual ao editor nos dois casos. Somente esses elementos as recebem: títulos, parágrafos, listas, tabelas e o restante do texto mantêm os estilos do site.

## Estilos inline {#inline-styles}

O padrão. Um cartão de link compacto é salvo assim:

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

- **As cores continuam sendo as do site.** O texto herda a cor; textos esmaecidos e bordas usam opacidade e um cinza semitransparente, então funcionam tanto em uma página clara quanto em uma escura. Defina a cor do texto de um tema no site como de costume.
- **Não são necessárias media queries.** Um cartão compacto coloca a imagem acima dos textos por conta própria em uma coluna estreita; vídeos e embeds nunca ficam mais largos que o texto.
- **Um site ainda pode reestilizá-los**, as classes permanecem. Um estilo inline vence uma regra de classe, então uma regra assim precisa de `!important`.
- **Um sanitizador precisa manter o atributo `style`** nesses elementos, senão eles perdem a aparência.

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

`content.css` é pequeno e não tem Vue nem Vuetify dentro. Suas regras são envolvidas em `:where(.tiptapify-content)`, então não têm peso algum: qualquer regra do site vence sobre elas sem `!important`. Use quando o site quiser a aparência em um só lugar ou estilizar o próprio conteúdo.

`contentCss(scope)` fornece a mesma folha de estilos como string, para uma classe diferente de `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Carregando o HTML de volta {#loading-html-back}

O editor lê esses elementos apenas pelos atributos e classes: um cartão de link por `data-link-card`, uma imagem por `src`, tamanho e float, uma tarefa por `data-checked`. Os estilos inline são ignorados quando o HTML é carregado e gravados de novo quando ele é salvo. Assim, o mesmo HTML vai e volta sem mudanças, um documento salvo com `inline` carrega sem problemas com `classes` e vice-versa, e uma versão posterior do editor atualiza a aparência de um documento na próxima vez em que ele for salvo.

A formatação do texto não é alterada: a cor ou o tamanho de um texto e o alinhamento de um parágrafo são conteúdo, e o editor continua lendo isso de seus estilos.

Para transformar HTML com classes em HTML com estilos inline fora do editor (um documento antigo, um e-mail), use `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Ele precisa de um DOM (um navegador, ou jsdom em um servidor) e, sem um, devolve o HTML como está.

## Sliders de imagens {#image-sliders}

O editor marca imagens em sequência como um slider enquanto você escreve (veja a prop `imageSlider`); o HTML salvo as mantém como figuras uma após a outra. Exibi-las como slider fica a cargo do script do próprio site.
