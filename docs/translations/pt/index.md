<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor de texto formatado Tiptap 3 para Vue 3 com uma barra de ferramentas implementada em Vuetify 3**

::: info Estado Beta
Este projeto encontra-se atualmente em **Beta**. Tem todas as funcionalidades previstas, mas ainda pode ter alguns erros por corrigir.
:::

## Funcionalidades {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Componentes Vuetify 3</h3>
    <p>Uma bonita barra de ferramentas Material Design construída inteiramente com componentes Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Mais de 30 extensões</h3>
    <p>Formatação de texto, incorporação de multimédia, tabelas e blocos de código com realce de sintaxe</p>
  </div>
  <div class="feature">
    <h3>Comandos de barra</h3>
    <p>Escreva <code>/</code> para abrir o menu de inserção rápida de títulos, listas, multimédia e mais</p>
  </div>
  <div class="feature">
    <h3>Internacionalização</h3>
    <p>Mais de 20 idiomas suportados através do vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tema escuro</h3>
    <p>Suporte automático para modo escuro/claro, integrado com o seu tema do Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Suporte total para TypeScript, com tipos exportados para todos os itens da barra de ferramentas e props</p>
  </div>
</div>

## Início rápido {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip Dependências peer
O Tiptapify requer **Vue 3.x**, **Vuetify 3.x ou 4.x**, **vue-i18n 11+** e **@mdi/js** como dependências peer. Consulte o [guia de instalação](/pt/guide/installation) para a configuração completa.
:::

## Licença {#license}

MIT — [Repositório do GitHub](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
