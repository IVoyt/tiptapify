<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor de rich text do Tiptap 3 para Vue 3, com uma barra de ferramentas implementada em Vuetify 3**

::: info Status Beta
Este projeto está atualmente em **Beta**. Ele está completo em recursos, mas ainda pode ter alguns bugs a corrigir.
:::

## Recursos {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Componentes Vuetify 3</h3>
    <p>Uma bela barra de ferramentas em Material Design, construída inteiramente com componentes Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Mais de 30 extensões</h3>
    <p>Formatação de rich text, incorporação de mídia, tabelas, blocos de código com destaque de sintaxe</p>
  </div>
  <div class="feature">
    <h3>Slash commands</h3>
    <p>Digite <code>/</code> para abrir o menu de inserção rápida de títulos, listas, mídia e mais</p>
  </div>
  <div class="feature">
    <h3>Internacionalização</h3>
    <p>Mais de 20 idiomas suportados via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tema escuro</h3>
    <p>Suporte automático aos modos escuro/claro, integrado ao seu tema do Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Suporte completo a TypeScript, com tipos exportados para todos os itens da barra de ferramentas e props</p>
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
O Tiptapify requer **Vue 3.x**, **Vuetify 3.x ou 4.x**, **vue-i18n 11+** e **@mdi/js** como dependências peer. Veja o [guia de Instalação](/pt-br/guide/installation) para a configuração completa.
:::

## Licença {#license}

MIT — [Repositório no GitHub](https://github.com/IVoyt/tiptapify)

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
