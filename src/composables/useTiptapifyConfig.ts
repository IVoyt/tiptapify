import { computed, ComputedRef, inject, InjectionKey, Ref } from 'vue'
import defaults from '@tiptapify/constants/defaults'
import { TiptapifyShape, TiptapifySkinInput, variantBtnTypes, variantFieldTypes } from '@tiptapify/types/editor'
// Importing the builtins registers them on load, so resolution works without consumer setup
import '@tiptapify/skins/builtins'
import { resolveSkin } from '@tiptapify/skins/registry'

export interface TiptapifyConfig {
  variantBtn: Ref<variantBtnTypes>
  variantField: Ref<variantFieldTypes>
  // the raw `skin` prop: a registered name (string) or an inline skin object
  skin: Ref<TiptapifySkinInput>
  // the resolved skin name (inline objects without a name resolve to 'inline')
  skinName: ComputedRef<string>
  // css variable name -> value; only overrides, the css fallbacks carry the base
  tokens: ComputedRef<Record<string, string>>
  shape: ComputedRef<Required<TiptapifyShape>>
}

export const TIPTAPIFY_CONFIG_KEY: InjectionKey<TiptapifyConfig> = Symbol('tiptapifyConfig')

// Components outside an editor (docs playground) resolve the default skin:
// classic shape, and no emitted tokens — the css fallbacks are the base values.
// Resolved once at module load: the fallback never changes at runtime
const defaultSkin = resolveSkin(defaults.skin)

export function useTiptapifyConfig(): TiptapifyConfig {
  return inject(TIPTAPIFY_CONFIG_KEY, {
    variantBtn: computed(() => defaults.variantBtn),
    variantField: computed(() => defaults.variantField),
    skin: computed(() => defaults.skin),
    skinName: computed(() => defaultSkin.name),
    tokens: computed(() => defaultSkin.tokens),
    shape: computed(() => defaultSkin.shape),
  })
}
