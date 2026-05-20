<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  height: { type: [Number,String], default() { return 400 }},
  items: { type: Array<string>, default() { return [] }},
  itemsExclude: { type: Boolean, default() { return false }},
  toolbar: { type: Boolean, default() { return true }},
  bubbleMenu: { type: Boolean, default() { return false }},
  floatingMenu: { type: Boolean, default() { return false }},
  slashCommands: { type: [Boolean,Array<string>], default() { return true }},
  placeholder: { type: String, default() { return "Start typing..." }},
  variantBtn: { type: String, default() { return "solo" }},
})

const content = ref('')
const theme = useTheme()

function syncTheme() {
  const isDark = document.documentElement.classList.contains('dark')
  const newTheme = isDark ? 'dark' : 'light'
  console.log('isDark', isDark)
  console.log('newTheme', newTheme)
  theme.change(newTheme)
  // if (theme.global.name.value !== newTheme) {
  //   theme.global.name.value = newTheme
  //
  //   theme.change(newTheme)
  // }
}

onMounted(() => {
  syncTheme()
  const observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div class="interactive-editor">
    <Tiptapify
      v-model="content"
      locale="en"
      :height="height"
      :placeholder="placeholder"
      font-measure="pt"
      :items="items || []"
      :items-exclude="itemsExclude"
      :toolbar="toolbar"
      :bubble-menu="bubbleMenu"
      :floating-menu="floatingMenu"
      :slash-commands="slashCommands"
      :interactive-styles="true"
      :variant-btn="variantBtn"
    />
  </div>
</template>

<style scoped>
.interactive-editor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
  min-height: 320px;
}
</style>
