import { createI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('./locales/*.json', { eager: true }))
    .map(([key, value]) => [key.slice(10, -5), value.default]),
)

export function useLocale(initialLocale: string = 'en') {
  const currentLocale = ref(initialLocale)

  const i18n = createI18n({
    legacy: false,
    locale: currentLocale.value,
    fallbackLocale: 'en',
    messages
  })

  const { t, locale } = i18n.global

  const setLocale = (newLocale: string) => {
    if (messages[newLocale]) {
      currentLocale.value = newLocale
      locale.value = newLocale
    }
  }

  return {
    i18n,
    t,
    locale: computed(() => currentLocale.value),
    setLocale
  }
}