<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { computed, inject, ref, Ref, watch } from "vue";

import defaults from '@tiptapify/constants/defaults'

const props = defineProps({
  variantBtn: { type: String, default: defaults.variantBtn },
  withDisc: { type: Boolean, default: true },
  withCircle: { type: Boolean, default: true },
  withSquare: { type: Boolean, default: true }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const disc = computed(() => props.withDisc)
const circle = computed(() => props.withCircle)
const square = computed(() => props.withSquare)

const iconDisc = '<svg width="48" height="48" focusable="false" viewBox="5 5 32 32"><g fill-rule="evenodd"><circle cx="11" cy="14" r="3"></circle><circle cx="11" cy="24" r="3"></circle><circle cx="11" cy="34" r="3"></circle><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"></path></g></svg>'
const iconCircle = '<svg width="48" height="48" focusable="false" viewBox="5 5 32 32"><g fill-rule="evenodd"><path d="M11 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM11 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill-rule="nonzero"></path><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"></path></g></svg>'
const iconSquare = '<svg width="48" height="48" focusable="false" viewBox="5 5 32 32"><g fill-rule="evenodd"><path d="M8 11h6v6H8zM8 21h6v6H8zM8 31h6v6H8z"></path><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"></path>'

const bulletLists = ref({
  disc: {
    name: 'bulletList',
    enabled: disc.value,
    icon: iconDisc
  },
  circle: {
    name: 'bulletListCircle',
    enabled: circle.value,
    icon: iconCircle
  },
  square: {
    name: 'bulletListSquare',
    enabled: square.value,
    icon: iconSquare
  }
})
const menuItems = ref({})
const isMenu = ref(false)

function checkButtonOrMenu() {
  menuItems.value = Object.values(bulletLists.value).filter(item => item.enabled)
  isMenu.value = menuItems.value.length > 1
}
checkButtonOrMenu()

function toggleList(listType: string) {
  switch(listType) {
    case 'bulletList': editor.value.commands.toggleBulletList(); break;
    case 'bulletListCircle': editor.value.commands.toggleBulletListCircle(); break;
    case 'bulletListSquare': editor.value.commands.toggleBulletListSquare(); break;
  }
}

const buttonActive = computed(() => {
  return editor.value.isActive('bulletList') ||
      editor.value.isActive('bulletListCircle') ||
      editor.value.isActive('bulletListSquare')
})

const buttonDisabled = computed(() => {
  return !editor.value.can().chain().focus().toggleBulletList().run() &&
    !editor.value.can().chain().focus().toggleBulletListCircle().run() &&
    !editor.value.can().chain().focus().toggleBulletListSquare().run()
})

watch(() => bulletLists.value, () => {
  checkButtonOrMenu()
}, { deep: true, immediate: true })
</script>

<template>
  <VMenu v-if="isMenu">
    <template #activator="{ props: menuProps }">
      <VBtn
          :color="buttonActive ? 'primary' : ''"
          :disabled="buttonDisabled"
          :variant="variantBtn"
          v-bind="menuProps"
          size="32"
      >
        <VTooltip activator="parent">
          {{ t('lists.bullet') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatListBulleted}`" />
      </VBtn>
    </template>

    <VList>
      <VListItem
        v-for="(bulletList, key) in menuItems"
        :key="key"
        link
        :active="editor.isActive(bulletList.name)"
        @click="toggleList(bulletList.name)"
      >
        <VTooltip activator="parent">
          {{ t('lists.bullet') }}
        </VTooltip>
        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="bulletList.icon" />
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>

  <VBtn
      v-else
      :color="editor.isActive('bulletList') ? 'primary' : ''"
      :disabled="!editor.can().chain().focus().toggleBulletList().run()"
      :variant="variantBtn"
      @click="editor.commands.toggleBulletList()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('lists.bullet') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatListBulleted}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>