<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import {
  resetChanges,
  resetConfirmationOff,
  turnOffResetConfirmation,
} from '@tiptapify/extensions/components/actions/reset/resetChanges'
import { inject, Ref, ref, useTemplateRef } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')
const dontAskAgain = ref(false)

function requestReset() {
  if (resetConfirmationOff()) {
    reset()

    return
  }

  dontAskAgain.value = false
  dialog.value?.open()
}

function confirmReset() {
  if (dontAskAgain.value) {
    turnOffResetConfirmation()
  }

  dialog.value?.close()
  reset()
}

function reset() {
  resetChanges(editor.value)
  editor.value.commands.focus()
}

</script>

<template>
  <VBtn
    :disabled="!editor.can().undo() && !editor.can().redo()"
    size="32"
    color=""
    :variant="variantBtn"
    @click="requestReset"
  >
    <Tooltip :label="t('action.reset_changes')" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiRestore}`" />
  </VBtn>

  <TiptapifyDialog
    ref="dialog"
    module="resetChanges"
    :title="t('action.reset_changes')"
    :max-width="440"
    @submit="confirmReset"
  >
    <template #content>
      <VCardText>
        <p>{{ t('action.reset_changes_confirm') }}</p>
        <VCheckbox
          v-model="dontAskAgain"
          class="tiptapify-reset-changes__dont-ask"
          :label="t('action.reset_changes_dont_ask')"
          density="compact"
          hide-details
        />
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <div class="tiptapify-dialog-actions">
          <div class="tiptapify-dialog-actions__start" />
          <div class="tiptapify-dialog-actions__end">
            <VBtn :variant="variantBtn" @click="dialog?.close()">
              {{ t('dialog.cancel') }}
            </VBtn>
            <VBtn type="submit" color="error" :variant="variantBtn">
              {{ t('action.reset') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.tiptapify-reset-changes__dont-ask {
  margin-top: 12px;
}
</style>
