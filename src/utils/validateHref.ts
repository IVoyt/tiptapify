const azAZ09 = 'a-zA-Z0-9'

const regexHrefProto = 'https?:\\/\\/'
const regexHrefAuth = `([${azAZ09}]+(:[${azAZ09}]+)?@)?`
const regexHrefDomain = `[${azAZ09}]+(\\.[${azAZ09}]+(-?[${azAZ09}]+)?)+`
const regexHrefPath = `(\\/[${azAZ09}\\-]+)*\\/?`
const regexHrefFragment = '(#[^\\s]*)?'
const regexHrefQueryParam = `(\\?[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)?`
const regexHrefQueryParamExtra = `(&[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)*`
const regexHref = `${regexHrefProto}${regexHrefAuth}${regexHrefDomain}${regexHrefPath}${regexHrefFragment}${regexHrefQueryParam}${regexHrefQueryParamExtra}`

const regexMailto = `mailto:\\w+@[${azAZ09}]+(\\.[${azAZ09}]+)*`
const regexTel = 'tel:\\+?[0-9]+'

const regexAll = [regexHref, regexMailto, regexTel].join('|')

const hrefRegex = new RegExp(`^(${regexAll})$`, 'i')

export function isValidHref(href: string): boolean {
  return hrefRegex.test(href || '')
}