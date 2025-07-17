import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('./locales/*.json', { eager: true }))
    .map(([key, value]) => [key.slice(10, -5), value.default]),
)

let _i18n: any = null

export const getI18n = (locale: string) => {
  if (_i18n === null) {
    _i18n = createI18n({
      locale: locale,
      fallbackLocale: 'en',
      messages
    })
  }

  return _i18n
}