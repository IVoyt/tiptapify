const azAZ09 = 'a-zA-Z0-9'

const regexMailto = `mailto:\\w+@[${azAZ09}]+(\\.[${azAZ09}]+)*`
const regexTel = 'tel:\\+?[0-9]+'

const hrefRegex = new RegExp(`^(${regexMailto}|${regexTel})$`, 'i')

const httpPrefixRegex = /^https?:\/\//i
const hostnameRegex = /^[^.]+(\.[^.]+)+$/

function isValidHttpUrl(href: string): boolean {
  if (!httpPrefixRegex.test(href) || /\s/.test(href)) {
    return false
  }

  try {
    return hostnameRegex.test(new URL(href).hostname)
  } catch {
    return false
  }
}

export function isValidHref(href: string): boolean {
  return isValidHttpUrl(href || '') || hrefRegex.test(href || '')
}
