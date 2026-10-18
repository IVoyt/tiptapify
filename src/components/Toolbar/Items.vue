<script setup lang="ts">

import { PropType } from 'vue'

import { toolbarSections } from '@tiptapify/types/toolbarTypes'

import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

defineProps({
  items: { type: Array as PropType<toolbarSections>, default() { return {} } },
})

// The section markup follows the `groups` shape flag: 'box' renders the 0.3.2 VBtnGroup
// (joined buttons in a raised box, the tokens below paint it), 'flat' keeps the plain div.
// `variantBtn` carries the 0.3.2 elevation-override class onto the group.
const { shape, variantBtn } = useTiptapifyConfig()

</script>

<template>
  <VToolbarItems class="tiptapify-toolbar-items">
    <template v-for="item in items" :key="item.section">
      <template v-if="item.section === '__separator__'">
        <div class="menu-divider" />
      </template>
      <template v-else-if="item.section === '__spacer__'">
        <div class="tiptapify-toolbar-spacer" />
      </template>
      <template v-else>
        <VBtnGroup
          v-if="item.group && shape.groups === 'box'"
          class="tiptapify-toolbar-group"
          elevation="4"
          :class="{ 'tiptapify-btn-group--elevated': variantBtn === 'elevated' }"
        >
          <template v-for="sectionItem in item.components" :key="sectionItem.name">
            <component :is="sectionItem.component" v-bind="sectionItem.props ?? {}" />
          </template>
        </VBtnGroup>
        <div v-else-if="item.group" class="tiptapify-toolbar-group">
          <template v-for="sectionItem in item.components" :key="sectionItem.name">
            <component :is="sectionItem.component" v-bind="sectionItem.props ?? {}" />
          </template>
        </div>
        <template v-else>
          <component
            :is="sectionItem.component"
            v-for="sectionItem in item.components"
            :key="sectionItem.name"
            v-bind="sectionItem.props ?? {}"
          />
        </template>
        <div class="menu-divider" />
      </template>
    </template>
  </VToolbarItems>
</template>

<style lang="scss" scoped>
/*
 * Skin rules for the bar, the group boxes and the dividers (spec 2026-10-18: single rules
 * reading `var(--tf-*)`). Base = the classic look, the fixture-canonical fallbacks; the
 * shape gates (`toolbar: flat`, `groups: flat`) carry the same tokens with the shape's
 * own base as fallback, so a shape flag without tokens paints the 0.3.3 look.
 */
.tiptapify-toolbar-items {
  /* Vuetify sizes .v-toolbar-items to its content; grow it to the full toolbar width,
   * otherwise the `~` spacer has no free space to expand into. */
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  row-gap: var(--tf-items-row-gap, 5px);
  /* Classic: no column gap (Vuetify's `normal`); the flat gate sets the token's own base */
  column-gap: var(--tf-items-gap, normal);
  padding: var(--tf-items-padding, 12px 16px);
}

.tiptapify-toolbar-group {
  display: flex;
  align-items: center;

  /* The classic group: a raised box around the section's buttons, Vuetify elevation 2 (fixture-canonical) */
  height: var(--tf-group-height, 32px);
  border-radius: var(--tf-group-radius, 4px);
  background: var(--tf-group-bg, rgb(var(--v-theme-surface)));
  box-shadow:
    var(--tf-group-shadow,
      0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0 1px 5px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12)));
}

.menu-divider {
  margin: 0 4px;
  width: var(--tf-divider-width, 0px);
  height: var(--tf-divider-height, 0px);
  background: var(--tf-divider-color, transparent);
}

.menu-divider:nth-last-child(1),
.menu-divider:has(+ .tiptapify-toolbar-spacer) {
  display: none;
}

.tiptapify-toolbar-spacer {
  flex: 1 0 0;
}

/* Flat toolbar: compact padding and tighter gaps in the flat bar */
.tiptapify-shape-toolbar-flat {
  .tiptapify-toolbar-items {
    column-gap: var(--tf-items-gap, 6px);
    row-gap: var(--tf-items-row-gap, 4px);
    padding: var(--tf-items-padding, 6px 8px);
  }
}

/* Box groups: the section is a VBtnGroup (0.3.2 structure restored). The base token rules
 * above keep painting the box: the scoped `.tiptapify-toolbar-group` (class + scope
 * attribute) out-specifies Vuetify's single-class `.v-btn-group` background, radius and
 * zero-shadow rules, and `.elevation-4`. Two 0.3.2 pieces are what its own CSS fights:
 * - `.v-btn-group--density-default.v-btn-group` pins 48px at equal specificity, decided by
 *   stylesheet order — 0.3.2 needed `:deep(.v-btn-group){ height: 32px !important }`, kept
 *   here as the tokenized `--tf-group-height` consumer (the 0.3.2 set demands the
 *   !important; the token contract stays honest, no new tokens);
 * - `.menu-button { margin: 0 1px }` re-added for CSS-set parity with 0.3.2: inert there
 *   too (no toolbar element carries the class), and the buttons joining inside the box is
 *   native VBtnGroup (`border-radius: 0` + corner `inherit`), needing no rule of ours.
 * The 0.3.2 `.tiptapify-btn-group--elevated` shadow override is NOT re-added: the token
 * fallback is exactly that elevation-2 triple, and the scoped base rule beats elevation-4. */
.tiptapify-shape-groups-box {
  .tiptapify-toolbar-group {
    height: var(--tf-group-height, 32px) !important;
  }

  .menu-button {
    margin: 0 1px;
  }
}

/* Flat groups: sections become plain runs of buttons with hairline dividers between them;
 * the box shape keeps the raised group defaults above untouched. */
.tiptapify-shape-groups-flat {
  .tiptapify-toolbar-group {
    gap: var(--tf-group-gap, 2px);
    height: var(--tf-group-height, auto);
    border-radius: var(--tf-group-radius, 0px);
    background: var(--tf-group-bg, transparent);
    box-shadow: var(--tf-group-shadow, none);
  }

  .menu-divider {
    margin: 0;
    width: var(--tf-divider-width, 1px);
    height: var(--tf-divider-height, 20px);
    background: var(--tf-divider-color, rgba(var(--v-border-color), var(--v-border-opacity)));
  }
}
</style>
