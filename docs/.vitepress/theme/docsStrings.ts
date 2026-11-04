import { computed, ComputedRef } from 'vue'
import { useData } from 'vitepress'
import en from '../locales/en.json'

export type DocsStrings = typeof en

// The strings of the docs site, one file per language next to the config (not the editor's translations)
const files = import.meta.glob<DocsStrings>('../locales/*.json', { eager: true, import: 'default' })

export const docsLocales: Record<string, DocsStrings> = Object.fromEntries(
  Object.entries(files).map(([path, strings]) => [path.replace(/^.*\/|\.json$/g, ''), strings]),
)

// A string missing in a language falls back to English
function withFallback(strings: DocsStrings | undefined): DocsStrings {
  if (!strings) {
    return en
  }

  return Object.fromEntries(Object.entries(en).map(([key, value]) => [
    key,
    value && typeof value === 'object' ? { ...value, ...(strings as Record<string, unknown>)[key] as object } : (strings as Record<string, unknown>)[key] ?? value,
  ])) as DocsStrings
}

/** The docs strings of the page's language */
export function useDocsStrings(): ComputedRef<DocsStrings> {
  const { localeIndex } = useData()

  return computed(() => withFallback(docsLocales[localeIndex.value === 'root' ? 'en' : localeIndex.value]))
}
