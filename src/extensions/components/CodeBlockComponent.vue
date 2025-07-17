<script setup lang="ts">
import { computed } from 'vue'
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  ...nodeViewProps
})

const languages = props.extension.options.lowlight.listLanguages()

const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language) {
    props.updateAttributes({ language })
  }
})
</script>

<template>
  <NodeViewWrapper class="code-block">
    <select contenteditable="false" v-model="selectedLanguage">
      <option :value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      <option v-for="(language, index) in languages" :value="language" :key="index">
        {{ language }}
      </option>
    </select>
    <pre><code><NodeViewContent /></code></pre>
  </NodeViewWrapper>
</template>

<style scoped lang="scss">
.tiptap {
  .code-block {
    position: relative;

    select {
      position: absolute;
      background-color: var(--white);
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="Black" d="M7 10l5 5 5-5z"/></svg>');
      right: 0.5rem;
      top: 0.5rem;
    }
  }
}
</style>