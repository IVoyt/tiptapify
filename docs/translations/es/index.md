<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor de texto enriquecido Tiptap 3 para Vue 3 con barra de herramientas implementada en Vuetify 3**

::: info Estado Beta
Este proyecto se encuentra actualmente en **Beta**. Tiene todas las funciones previstas, pero aún puede tener algunos errores por corregir.
:::

## Características {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Componentes de Vuetify 3</h3>
    <p>Una elegante barra de herramientas Material Design construida íntegramente con componentes de Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Más de 30 extensiones</h3>
    <p>Formato de texto enriquecido, incrustación de multimedia, tablas y bloques de código con resaltado de sintaxis</p>
  </div>
  <div class="feature">
    <h3>Comandos con barra</h3>
    <p>Escribe <code>/</code> para abrir el menú de inserción rápida de encabezados, listas, multimedia y más</p>
  </div>
  <div class="feature">
    <h3>Internacionalización</h3>
    <p>Más de 20 idiomas disponibles mediante vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tema oscuro</h3>
    <p>Modo oscuro y claro automático, integrado con el tema de Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Compatibilidad total con TypeScript y tipos exportados para todos los elementos de la barra de herramientas y las props</p>
  </div>
</div>

## Inicio rápido {#quick-start}

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

::: tip Dependencias peer
Tiptapify requiere **Vue 3.x**, **Vuetify 3.x o 4.x**, **vue-i18n 11+** y **@mdi/js** como dependencias peer. Consulta la [guía de instalación](/es/guide/installation) para ver la configuración completa.
:::

## Licencia {#license}

MIT — [Repositorio de GitHub](https://github.com/IVoyt/tiptapify)

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
