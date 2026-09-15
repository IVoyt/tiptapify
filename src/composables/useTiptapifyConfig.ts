import { computed, inject, InjectionKey, Ref } from 'vue'
import defaults from '@tiptapify/constants/defaults'
import { variantBtnTypes, variantFieldTypes } from '@tiptapify/types/editor'

export interface TiptapifyConfig {
  variantBtn: Ref<variantBtnTypes>
  variantField: Ref<variantFieldTypes>
}

export const TIPTAPIFY_CONFIG_KEY: InjectionKey<TiptapifyConfig> = Symbol('tiptapifyConfig')

export function useTiptapifyConfig(): TiptapifyConfig {
  return inject(TIPTAPIFY_CONFIG_KEY, {
    variantBtn: computed(() => defaults.variantBtn),
    variantField: computed(() => defaults.variantField),
  })
}
