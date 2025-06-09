<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import helpers from '@tiptapify/utils/helpers'
import { useI18n } from 'vue-i18n'

import { inject, Ref, ref } from 'vue'

const { t } = useI18n()

const { ucFirst } = helpers

defineExpose({ open })

defineProps({
  show: { type: Boolean, default: false },
  maxCols: { type: Number, default: 10 },
  maxRows: { type: Number, default: 10 },
})

const emit = defineEmits(['close'])

const editor = inject('tiptapifyEditor') as Ref<Editor>

const withHeaderRow = ref(false)

const colHover = ref(0)
const rowHover = ref(0)

function hoverCell(elm: Element, row: number, col: number) {
  rowHover.value = row
  colHover.value = col
  elm.classList.add('tiptapify-insert-table-col-hover')
}

function leaveCell(elm: Element) {
  rowHover.value = 0
  colHover.value = 0
  elm.classList.remove('tiptapify-insert-table-col-hover')
}

function insertTable(rows: number, cols: number) {
  editor.value.chain().focus().insertTable({ rows, cols, withHeaderRow: withHeaderRow.value }).run()

  emit('close')
}

function printSelection() {
  return rowHover.value && colHover.value ? `${rowHover.value} x ${colHover.value}` : ''
}
</script>

<template>
  <VSheet class="pa-2">
    <VCheckbox
        v-model="withHeaderRow"
        density="compact"
        color="primary"
        :label="ucFirst(t('media.tables.insertWithHeaderRow'))" hide-details
    />

    <div v-for="rowNum in maxRows" :key="`row-${rowNum}`" class="tiptapify-insert-table-row">
      <div
          v-for="colNum in maxCols"
          class="tiptapify-insert-table-col"
          :class="{'tiptapify-insert-table-col-hovered': rowNum <= rowHover && colNum <= colHover}"
          @click="insertTable(rowNum, colNum)"
          @mouseover="hoverCell($el.querySelector('.tiptapify-insert-table-col'), rowNum, colNum)"
          @mouseout="leaveCell($el.querySelector('.tiptapify-insert-table-col'))"
      >
        <div class="tiptapify-insert-table-col-button"></div>
      </div>
    </div>

    <div class="tiptapify-table-builder-info">
      <span>
        {{ ucFirst(t('media.tables.rows')) }}: {{ rowHover }}
        {{ ucFirst(t('media.tables.cols')) }}: {{ colHover }}
      </span>
      <span>
        {{ printSelection() }}
      </span>
    </div>
  </VSheet>
</template>

<style lang="scss">
:root {
  --tiptapify-table-builder-col-hover: #5454ff88;
}

$primaryColor: var(--v-theme-primary-color, var(--tiptapify-table-builder-col-hover));
$mutedColor: var(--v-theme-muted-color, #888888);

.tiptapify-insert-table-row {
  display: flex;
  justify-content: center;
}

.tiptapify-insert-table-col {
  width: 30px;
  height: 30px;
  background: #fff;
  padding: 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiptapify-insert-table-col-button {
  margin: 2px;
  width: 100%;
  height: 100%;
  border: 1px solid #888;
  background: #fff;
  border-radius: 4px;
  filter: drop-shadow(2px 2px 4px #88888888);
}

.tiptapify-insert-table-col-hovered {
  cursor: pointer;
}

.tiptapify-insert-table-col-hovered > .tiptapify-insert-table-col-button, .tiptapify-insert-table-col-button:hover {
  background: $primaryColor;
  border: 1px solid $primaryColor;
  filter: drop-shadow(2px 2px 4px $primaryColor);
  cursor: pointer;
}

.tiptapify-table-builder-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: $mutedColor;
}
</style>