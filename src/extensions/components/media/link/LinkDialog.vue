<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";

import { computed, inject, onMounted, onUnmounted, Ref, ref, watch } from 'vue'

import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue"

defineProps({
  variantBtn: { type: String, default() { return 'elevated' }},
  variantField: { type: String, default() { return 'outlined' }}
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

const generateLinkAttrs = () => ({
  href: '',
  target: targetAttrs.value[0],
  cssClass: '',
  rel: ''
})

const relAttrs = ['alternate', 'author', 'bookmark', 'external', 'help', 'license', 'me', 'next', 'nofollow', 'noopener', 'noreferrer', 'opener', 'prev', 'privacy-policy', 'search', 'tag', 'terms-of-service']

const targetAttrs = computed(() => [
  { value: '_blank', title: t('dialog.link.target_blank') },
  { value: '_self', title: t('dialog.link.target_self') }
])

const attrs = ref(generateLinkAttrs())
const hrefInvalid = ref(false)

const dialog = ref(null)

const isDisabled = computed(() => {
  const { href } = attrs.value
  return !href
})

function apply() {
  let { href, target, rel, cssClass } = attrs.value
  rel = rel?.length ? rel.join(' ') : null

  if (href) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href, target: target.value, rel, class: cssClass }).run()
  }

  close()
}

function clear() {
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

  close()
}

function close() {
  attrs.value = generateLinkAttrs()

  dialog.value.close()
}

const showLink = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  attrs.value.href = event.detail.link?.href ?? ''
  attrs.value.target = targetAttrs.value.find(item => item.value === event.detail.link?.target) ?? targetAttrs[0]
  attrs.value.rel = event.detail.link?.rel?.split(' ')
  attrs.value.cssClass = event.detail.link?.class

  dialog.value.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-link', showLink as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-link', showLink as EventListener)
})

watch(() => attrs.value.href, () => {
  const azAZ09 = 'a-zA-Z0-9'

  const regexHrefProto = 'https?:\\/\\/'
  const regexHrefAuth = `([${azAZ09}]+(:[${azAZ09}]+)?@)?`
  const regexHrefDomain = `[${azAZ09}]+(\\.[${azAZ09}]+(-?[${azAZ09}]+)?)+`
  const regexHrefPath = `(\\/[${azAZ09}\\-]+)*`
  const regexHrefFragment = '(#[^\\s]*)?'
  const regexHrefQueryParam = `(\\?[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)?`
  const regexHrefQueryParamExtra = `(&[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)*`
  const regexHref = `${regexHrefProto}${regexHrefAuth}${regexHrefDomain}${regexHrefPath}${regexHrefFragment}${regexHrefQueryParam}${regexHrefQueryParamExtra}`

  const regexMailto = `mailto:\\w+@[${azAZ09}]+(\\.[${azAZ09}]+)*`
  const regexTel = 'tel:\\+?[0-9]+'

  const regexAll = [regexHref, regexMailto, regexTel].join('|')

  const regex = new RegExp(`^(${regexAll})$`, 'i')

  hrefInvalid.value = attrs.value.href !== '' && !regex.test(attrs.value.href)
})
</script>

<template>
  <TiptapifyDialog ref="dialog" module="link">
    <template #content>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField
                v-model="attrs.href"
                density="compact"
                variant="outlined"
                :label="t('dialog.link.href')"
                :error-messages="hrefInvalid ? t('dialog.link.href_error') : ''"
                autofocus
            />
          </VCol>

          <VCol cols="12" md="4">
            <VSelect
                v-model="attrs.target"
                :items="targetAttrs"
                :label="t('dialog.link.target')"
                variant="outlined"
                return-object
                density="compact"
            />
          </VCol>

          <VCol cols="12" md="8">
            <VTextField v-model="attrs.cssClass" density="compact" variant="outlined" :label="t('dialog.link.class')" />
          </VCol>

          <VCol cols="12">
            <VSelect
                v-model="attrs.rel"
                :items="relAttrs"
                :label="t('dialog.link.rel')"
                variant="outlined"
                multiple
                chips
                closable-chips
                clearable
                density="compact"
            />
          </VCol>
        </VRow>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <VRow>
          <VCol class="d-flex justify-start">
            <VBtn color="warning" v-if="editor.isActive('link')" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ t('dialog.clear') }}
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn :variant="variantBtn" @click="close" class="mr-2">
              {{ t('dialog.close') }}
            </VBtn>
            <VBtn color="primary" :variant="variantBtn" :disabled="isDisabled || hrefInvalid" @click="apply">
              {{ t('dialog.apply') }}
            </VBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>