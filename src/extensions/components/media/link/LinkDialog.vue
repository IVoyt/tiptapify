<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { useTiptapifyLinkPreview } from '@tiptapify/composables/useTiptapifyLinkPreview'
import { useTiptapifyUpload } from '@tiptapify/composables/useTiptapifyUpload'
import { applyLinkCard, LinkCardAttrs, LinkCardDraft, LinkCardLayout } from '@tiptapify/extensions/components/media/linkCard'
import {
  isLinkCardAddress,
  LINK_CARD_LAYOUTS,
  linkCardAddressProblem,
  linkCardToLink,
} from '@tiptapify/extensions/components/media/linkCard/linkCardDialog'
import { makeLinkCard } from '@tiptapify/extensions/components/media/linkCard/makeLinkCard'
import {
  applyLink,
  formRel,
  hasAdvancedValues,
  LinkContext,
  LINK_PROTOCOLS,
  linkToCard,
  missingProtocol,
  parseRel,
  REL_SUGGESTIONS,
  withProtocol,
  removeLink,
} from '@tiptapify/extensions/components/media/link/linkDialog'
import { isValidHref } from '@tiptapify/utils/validateHref'

import { computed, inject, onMounted, onUnmounted, reactive, Ref, ref, useTemplateRef, watch } from 'vue'

import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { ComposerTranslation } from 'vue-i18n'

// The page data of a card is asked once the author stops typing the address
const FETCH_DELAY = 400

const { variantBtn } = useTiptapifyConfig()
const { available, fetchPreview, recheck } = useTiptapifyLinkPreview()
const { upload, uploadFile } = useTiptapifyUpload()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const relDelimiters = [' ', ',']

const generateForm = () => ({
  href: '',
  text: '',
  newTab: false,
  rel: [] as string[],
  cssClass: '',
  title: '',
  description: '',
  siteName: '',
  image: '',
  layout: 'compact' as LinkCardLayout,
})

const generateContext = (): LinkContext => ({ active: false, attrs: {}, text: '' })

const form = ref(generateForm())
const context = ref<LinkContext>(generateContext())
// A selected card is being edited (its texts may be the author's own: no fetch on open)
const cardEdit = ref(false)
const advancedOpen = ref(false)
const hrefError = ref('')
const fetchError = ref('')
const display = ref<'link' | 'card'>('link')
const loading = ref(false)
const image = reactive({ uploading: false, error: '' })

// The address of the page data asked last: the same address is not asked again
let fetchedHref = ''
let fetchTimer: ReturnType<typeof setTimeout> | null = null
let fetchRequest: AbortController | null = null
let imageUpload: AbortController | null = null

const dialog = useTemplateRef('dialog')
const imageInput = useTemplateRef<HTMLInputElement>('imageInput')

const isEdit = computed(() => context.value.active || cardEdit.value)
const isDisabled = computed(() => !form.value.href.trim() || loading.value || image.uploading)
// A new card only with the link preview endpoint up; a card already in the document stays editable by hand
const canShowCard = computed(() => available.value || cardEdit.value)
const isCard = computed(() => canShowCard.value && display.value === 'card')
const canRefresh = computed(() => available.value && !loading.value && isLinkCardAddress(form.value.href))

const title = computed(() => {
  if (isCard.value) {
    return t(isEdit.value ? 'dialog.linkCard.title_edit' : 'dialog.linkCard.title_insert')
  }

  return t(isEdit.value ? 'dialog.link.title_edit' : 'dialog.link.title_insert')
})

const layouts = computed(() => LINK_CARD_LAYOUTS.map(value => ({ value, label: t(`dialog.linkCard.layout_${value}`) })))

const relHint = computed(() => {
  const hint = t('dialog.link.rel_hint')

  return form.value.newTab ? `${hint} ${t('dialog.link.rel_new_tab_hint')}` : hint
})

function updateRel(value: string[]) {
  form.value.rel = parseRel(value)
}

// An address without a protocol: the author picks one of the offered protocols, the dialog never picks it
const hrefMissingProtocol = computed(() => missingProtocol(form.value.href))

const hrefField = useTemplateRef<{ focus: () => void }>('hrefField')

// Back to the address, so Enter inserts the link right away
function addProtocol(protocol: string) {
  form.value.href = withProtocol(form.value.href, protocol)
  hrefField.value?.focus()
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function cancelFetch() {
  if (fetchTimer) {
    clearTimeout(fetchTimer)
    fetchTimer = null
  }

  // An address whose request was canceled is asked again when the dialog shows a card of it again
  if (fetchRequest) {
    fetchRequest.abort()
    fetchRequest = null
    fetchedHref = ''
  }
  loading.value = false
}

// The page data into the card fields; false when it failed or another request replaced it
async function fetchCard(): Promise<boolean> {
  cancelFetch()

  const href = form.value.href.trim()

  if (!available.value || !isLinkCardAddress(href)) {
    return false
  }

  const controller = new AbortController()
  fetchRequest = controller
  fetchedHref = href
  loading.value = true
  fetchError.value = ''

  // A canceled or replaced request (another controller) leaves the form alone when it settles
  try {
    const card = await makeLinkCard(href, { fetchPreview, upload: upload.value, signal: controller.signal })

    if (fetchRequest !== controller) {
      return false
    }

    Object.assign(form.value, {
      title: card.title ?? '',
      description: card.description ?? '',
      siteName: card.siteName ?? '',
      image: card.image ?? '',
    })

    return true
  } catch (error) {
    if (fetchRequest === controller) {
      fetchError.value = t('dialog.linkCard.fetch_failed', { error: errorMessage(error) })
    }

    return false
  } finally {
    if (fetchRequest === controller) {
      fetchRequest = null
      loading.value = false
    }
  }
}

// A new card asks the data of its address; an edited card's data is asked again only by Refresh
function wantsFetch(): boolean {
  return isCard.value && !cardEdit.value && available.value && isLinkCardAddress(form.value.href)
    && form.value.href.trim() !== fetchedHref
}

function scheduleFetch() {
  cancelFetch()

  if (wantsFetch()) {
    fetchTimer = setTimeout(() => {
      fetchTimer = null
      void fetchCard()
    }, FETCH_DELAY)
  }
}

function cancelImageUpload() {
  imageUpload?.abort()
  imageUpload = null
  image.uploading = false
}

async function replaceImage(event: Event) {
  const input = event.target as HTMLInputElement
  const picked = input.files?.[0] ?? null

  // Picking the same file again must fire `change` again
  input.value = ''

  if (!picked) {
    return
  }

  cancelImageUpload()

  const controller = new AbortController()
  imageUpload = controller
  image.uploading = true
  image.error = ''

  try {
    const { url } = await uploadFile(picked, { kind: 'image', onProgress: () => {}, signal: controller.signal })

    if (imageUpload === controller) {
      form.value.image = url
    }
  } catch {
    if (imageUpload === controller) {
      image.error = t('dialog.linkCard.image_failed')
    }
  } finally {
    if (imageUpload === controller) {
      imageUpload = null
      image.uploading = false
    }
  }
}

function removeImage() {
  cancelImageUpload()
  form.value.image = ''
  image.error = ''
}

function cardAttrs(href: string): LinkCardAttrs {
  const { title: cardTitle, description, image: src, siteName, layout, newTab } = form.value

  return {
    href,
    title: cardTitle.trim() || null,
    description: description.trim() || null,
    image: src.trim() || null,
    siteName: siteName.trim() || null,
    layout,
    newTab,
  }
}

function addressError(href: string): string {
  if (hrefMissingProtocol.value) {
    return t('dialog.link.protocol_missing')
  }

  if (!isValidHref(href)) {
    return t('dialog.link.href_invalid')
  }

  // A card is made of a page: only an http(s) address
  const problem = isCard.value ? linkCardAddressProblem(href) : null

  if (!problem) {
    return ''
  }

  return problem === 'protocol' ? t('dialog.linkCard.protocol_missing') : t('dialog.linkCard.href_invalid')
}

function apply() {
  if (isDisabled.value) {
    return
  }

  const href = form.value.href.trim()

  hrefError.value = addressError(href)
  if (hrefError.value) {
    return
  }

  if (isCard.value) {
    void applyCard(href)

    return
  }

  // A card displayed as a link again: the link text, else the card's title, else the address
  const applied = cardEdit.value
    ? linkCardToLink(editor.value, {
      href,
      title: form.value.text.trim() || form.value.title,
      newTab: form.value.newTab,
      rel: form.value.rel,
      cssClass: form.value.cssClass,
    })
    : applyLink(editor.value, { ...form.value, href }, context.value)

  if (!applied) {
    hrefError.value = t('dialog.link.apply_error')

    return
  }

  close()
}

// An address typed and submitted at once is asked first; a failed preview keeps the dialog open with the
// error, and the next submit inserts the fields filled by hand
async function applyCard(href: string) {
  if (wantsFetch() && !await fetchCard()) {
    return
  }

  const attrs = cardAttrs(href)
  const applied = cardEdit.value
    ? applyLinkCard(editor.value, attrs, true)
    : linkToCard(editor.value, attrs, context.value)

  if (!applied) {
    hrefError.value = t('dialog.linkCard.apply_failed')

    return
  }

  close()
}

function remove() {
  if (cardEdit.value) {
    editor.value.chain().focus().deleteSelection().run()
  } else {
    removeLink(editor.value)
  }

  close()
}

function close() {
  dialog.value?.close()
}

function reset() {
  cancelFetch()
  cancelImageUpload()

  fetchedHref = ''
  form.value = generateForm()
  context.value = generateContext()
  cardEdit.value = false
  advancedOpen.value = false
  hrefError.value = ''
  fetchError.value = ''
  image.error = ''
  display.value = 'link'
}

type ShowLinkDetail = {
  link?: Record<string, string | null>,
  active?: boolean,
  text?: string,
  card?: LinkCardAttrs | null,
  draft?: LinkCardDraft | null,
  editorId: string,
}

function openCard(card: LinkCardAttrs) {
  cardEdit.value = true
  display.value = 'card'
  Object.assign(form.value, {
    href: card.href ?? '',
    newTab: card.newTab !== false,
    title: card.title ?? '',
    description: card.description ?? '',
    siteName: card.siteName ?? '',
    image: card.image ?? '',
    layout: LINK_CARD_LAYOUTS.includes(card.layout) ? card.layout : 'compact',
  })
  // The texts of a saved card stay as they are: they may be the author's own
  fetchedHref = form.value.href.trim()
}

const showLink = (event: CustomEvent<ShowLinkDetail>) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  reset()

  const { card, draft } = event.detail
  const link = event.detail.link ?? {}
  const newTab = link.target === '_blank'

  context.value = { active: !card && !!event.detail.active, attrs: card ? {} : link, text: card ? '' : event.detail.text ?? '' }
  Object.assign(form.value, {
    href: link.href ?? '',
    text: context.value.text,
    newTab,
    rel: formRel(link.rel, newTab),
    cssClass: link.class ?? '',
  })

  if (card) {
    openCard(card)
  } else if (draft) {
    form.value.href = draft.href ?? ''
    form.value.newTab = draft.newTab ?? false
    display.value = 'card'
  }

  advancedOpen.value = hasAdvancedValues(form.value.rel, form.value.cssClass)
  // An endpoint that failed may be up by now
  void recheck()

  dialog.value?.open()
}

watch(() => form.value.href, (href) => {
  hrefError.value = ''

  if (href.trim() === fetchedHref) {
    return
  }

  fetchedHref = ''
  fetchError.value = ''
  scheduleFetch()
})

// Switched to a card (or the endpoint came up): asked at once, without the typing delay
watch(isCard, (card) => {
  hrefError.value = ''

  if (card && wantsFetch()) {
    void fetchCard()
  } else if (!card) {
    cancelFetch()
  }
})

onMounted(() => {
  window.addEventListener('tiptapify-show-link', showLink as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-link', showLink as EventListener)

  cancelFetch()
  cancelImageUpload()
})
</script>

<template>
  <TiptapifyDialog
    ref="dialog"
    module="link"
    :title="title"
    :max-width="isCard ? 560 : 480"
    @submit="apply"
    @closed="reset"
  >
    <template #content>
      <VCardText>
        <div class="tiptapify-dialog-grid">
          <div v-if="canShowCard" class="tiptapify-dialog-col tiptapify-link-display">
            <span class="text-body-2 text-medium-emphasis">{{ t('dialog.linkCard.display') }}</span>
            <VBtnToggle
              v-model="display"
              mandatory
              density="compact"
              variant="outlined"
              divided
            >
              <VBtn value="link" :prepend-icon="`mdiSvg:${mdi.mdiLinkVariant}`">
                {{ t('dialog.linkCard.display_link') }}
              </VBtn>
              <VBtn value="card" :prepend-icon="`mdiSvg:${mdi.mdiCardTextOutline}`">
                {{ t('dialog.linkCard.display_card') }}
              </VBtn>
            </VBtnToggle>
          </div>

          <div class="tiptapify-dialog-col">
            <VTextField
              ref="hrefField"
              v-model="form.href"
              density="compact"
              variant="outlined"
              :label="t('dialog.link.href')"
              :error-messages="hrefError || fetchError"
              :hint="loading ? t('dialog.linkCard.loading') : ''"
              :loading="loading"
              persistent-hint
              hide-details="auto"
              autofocus
            >
              <template v-if="isCard && available" #append-inner>
                <VBtn
                  variant="text"
                  size="28"
                  icon
                  :disabled="!canRefresh"
                  :aria-label="t('dialog.linkCard.refresh')"
                  @click="fetchCard"
                >
                  <VIcon size="18" :icon="`mdiSvg:${mdi.mdiRefresh}`" />
                  <Tooltip :label="t('dialog.linkCard.refresh')" />
                </VBtn>
              </template>
            </VTextField>
            <div v-if="hrefMissingProtocol" class="tiptapify-link-protocols">
              <span v-if="!hrefError" class="text-caption text-medium-emphasis">{{ t('dialog.link.protocol_missing') }}</span>
              <VChip
                v-for="protocol in LINK_PROTOCOLS"
                :key="protocol"
                size="small"
                label
                variant="outlined"
                @click="addProtocol(protocol)"
              >
                {{ protocol }}://
              </VChip>
            </div>
          </div>

          <div v-if="!isCard" class="tiptapify-dialog-col">
            <VTextField
              v-model="form.text"
              density="compact"
              variant="outlined"
              :label="t('dialog.link.text')"
              :hint="context.text ? '' : t('dialog.link.text_hint')"
              persistent-hint
              hide-details="auto"
            />
          </div>

          <div v-if="isCard" class="tiptapify-dialog-col tiptapify-link-card-fields">
            <div class="tiptapify-link-card-fields__media" role="group" :aria-label="t('dialog.linkCard.image')">
              <input ref="imageInput" type="file" accept="image/*" hidden @change="replaceImage">
              <div class="tiptapify-link-card-fields__image">
                <VProgressCircular v-if="image.uploading || loading" indeterminate size="20" width="2" />
                <img v-else-if="form.image" :src="form.image" alt="">
                <VIcon v-else size="28" :icon="`mdiSvg:${mdi.mdiImageOutline}`" />
              </div>
              <div class="tiptapify-link-card-fields__image-actions">
                <VBtn size="small" variant="text" :disabled="image.uploading" @click="imageInput?.click()">
                  {{ t(form.image ? 'dialog.linkCard.image_replace' : 'dialog.linkCard.image_choose') }}
                </VBtn>
                <VBtn size="small" variant="text" :disabled="!form.image && !image.uploading" @click="removeImage">
                  {{ t('dialog.linkCard.image_remove') }}
                </VBtn>
              </div>
              <div v-if="image.error" class="text-error text-caption" role="alert">
                {{ image.error }}
              </div>
            </div>

            <div class="tiptapify-link-card-fields__texts">
              <VTextField
                v-model="form.title"
                density="compact"
                variant="outlined"
                :label="t('dialog.linkCard.page_title')"
                hide-details="auto"
              />
              <VTextarea
                v-model="form.description"
                density="compact"
                variant="outlined"
                :label="t('dialog.linkCard.description')"
                rows="2"
                max-rows="3"
                auto-grow
                hide-details="auto"
              />
              <VTextField
                v-model="form.siteName"
                density="compact"
                variant="outlined"
                :label="t('dialog.linkCard.site_name')"
                hide-details="auto"
              />
            </div>
          </div>

          <div v-if="isCard" class="tiptapify-dialog-col tiptapify-link-display" role="group" :aria-label="t('dialog.linkCard.layout')">
            <span class="text-body-2 text-medium-emphasis">{{ t('dialog.linkCard.layout') }}</span>
            <VBtnToggle
              v-model="form.layout"
              class="tiptapify-link-card-fields__layout"
              mandatory
              density="compact"
              variant="outlined"
              divided
            >
              <VBtn v-for="layout in layouts" :key="layout.value" :value="layout.value">
                {{ layout.label }}
              </VBtn>
            </VBtnToggle>
          </div>

          <div class="tiptapify-dialog-col">
            <VCheckbox v-model="form.newTab" density="compact" :label="t('dialog.link.new_tab')" hide-details />
          </div>

          <div v-if="!isCard" class="tiptapify-dialog-col">
            <VBtn
              variant="text"
              size="small"
              class="tiptapify-link-advanced-toggle"
              :aria-expanded="advancedOpen"
              :append-icon="`mdiSvg:${advancedOpen ? mdi.mdiChevronUp : mdi.mdiChevronDown}`"
              @click="advancedOpen = !advancedOpen"
            >
              {{ t('dialog.link.advanced') }}
            </VBtn>

            <VExpandTransition>
              <div v-show="advancedOpen" class="tiptapify-link-advanced">
                <VCombobox
                  :model-value="form.rel"
                  :items="REL_SUGGESTIONS"
                  :delimiters="relDelimiters"
                  :label="t('dialog.link.rel')"
                  :hint="relHint"
                  variant="outlined"
                  density="compact"
                  multiple
                  chips
                  closable-chips
                  persistent-hint
                  hide-details="auto"
                  @update:model-value="updateRel"
                />

                <VTextField
                  v-model="form.cssClass"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.link.class')"
                  hide-details
                />
              </div>
            </VExpandTransition>
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <div class="tiptapify-dialog-actions">
          <div class="tiptapify-dialog-actions__start">
            <VBtn v-if="isEdit" color="error" :variant="variantBtn" @click="remove">
              {{ t(cardEdit ? 'dialog.remove' : 'dialog.link.remove') }}
            </VBtn>
          </div>
          <div class="tiptapify-dialog-actions__end">
            <VBtn :variant="variantBtn" @click="close">
              {{ t('dialog.cancel') }}
            </VBtn>
            <VBtn type="submit" color="primary" :variant="variantBtn" :disabled="isDisabled">
              {{ isEdit ? t('dialog.save') : t('dialog.insert') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
  .tiptapify-link-advanced-toggle {
    margin-inline-start: -8px;
    letter-spacing: normal;
    text-transform: none;
  }

  .tiptapify-link-display {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .tiptapify-link-protocols {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    padding: 6px 16px 0;
  }

  .tiptapify-link-advanced {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 12px;
  }

  .tiptapify-link-card-fields {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .tiptapify-link-card-fields__media,
  .tiptapify-link-card-fields__texts {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tiptapify-link-card-fields__media {
    flex: none;
    gap: 8px;
    width: 180px;
  }

  .tiptapify-link-card-fields__texts {
    flex: 1;
    gap: 12px;
  }

  .tiptapify-link-card-fields__image {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 1.91 / 1;
    border-radius: 8px;
    background: rgba(var(--v-theme-on-surface), 0.04);
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .tiptapify-link-card-fields__image-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .v-btn {
      letter-spacing: normal;
      text-transform: none;
    }
  }

  .tiptapify-link-card-fields__layout {
    max-width: 100%;
  }

  @media (max-width: 520px) {
    .tiptapify-link-card-fields {
      flex-direction: column;
      align-items: stretch;
    }

    .tiptapify-link-card-fields__media {
      width: 100%;
    }
  }
</style>
