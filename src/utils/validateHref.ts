const azAZ09 = 'a-zA-Z0-9'

const regexMailto = `mailto:\\w+@[${azAZ09}]+(\\.[${azAZ09}]+)*`
const regexTel = 'tel:\\+?[0-9]+'

const hrefRegex = new RegExp(`^(${regexMailto}|${regexTel})$`, 'i')

// An anchor (#id) or a link relative to the site (/path) or the page (./, ../, ?query); not a
// protocol-relative //host, which points to another site
const relativeHrefRegex = /^(#|\/(?!\/)|\.{1,2}\/|\?)\S+$/

const schemeRegex = /^([a-z][a-z0-9+.-]*):(.*)$/i

// Schemes that run code or embed content instead of pointing to it
const blockedSchemes = new Set(['javascript', 'vbscript', 'data'])

// Schemes of addresses on a host: without `//` (`http:example.com`) they are a typo, not another kind of link
const hostSchemes = new Set(['http', 'https', 'ftp', 'ftps', 'sftp'])

// Host labels without empty ones (`example..com`, `.com`); a single label is an internal host (intranet, localhost)
const hostnameRegex = /^[^.]+(\.[^.]+)*$/

// `localhost:8080/admin` typed without a protocol: a host and a port, not a scheme `localhost:`
const portRegex = /^\d+([/?#]|$)/

function isValidHostUrl(href: string): boolean {
  try {
    return hostnameRegex.test(new URL(href).hostname)
  } catch {
    return false
  }
}

/**
 * A link address: any protocol with a host (`https://`, `ftp://`, `smb://`, internal hosts without a dot
 * included), other protocols (`mailto:`, `tel:`, `sms:`, `magnet:`…), anchors and relative links. Protocols
 * that run code (`javascript:`, `vbscript:`, `data:`) are rejected.
 */
export function isValidHref(href: string): boolean {
  const value = href || ''
  if (relativeHrefRegex.test(value)) {
    return true
  }

  const match = schemeRegex.exec(value)
  if (!match || /\s/.test(value)) {
    return false
  }

  const scheme = match[1].toLowerCase()
  const rest = match[2]
  if (blockedSchemes.has(scheme)) {
    return false
  }

  if (rest.startsWith('//')) {
    return !rest.startsWith('///') && isValidHostUrl(value)
  }

  if (scheme === 'mailto' || scheme === 'tel') {
    return hrefRegex.test(value)
  }

  return !hostSchemes.has(scheme) && rest !== '' && !portRegex.test(rest)
}
