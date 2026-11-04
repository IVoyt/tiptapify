import { describe, it, expect } from 'vitest'
import { isValidHref } from './validateHref'

describe('isValidHref', () => {
  it('accepts a URL with a path and query parameters', () => {
    expect(isValidHref('https://google.com/search?q=123&page=12')).toBe(true)
  })

  it('accepts a URL with query parameters right after the domain slash', () => {
    expect(isValidHref('https://google.com/?q=123&page=12')).toBe(true)
  })

  it('accepts a URL with only a trailing slash', () => {
    expect(isValidHref('https://google.com/')).toBe(true)
  })

  it('accepts a URL with only a domain', () => {
    expect(isValidHref('https://google.com')).toBe(true)
  })

  it('accepts http URLs', () => {
    expect(isValidHref('http://example.com')).toBe(true)
  })

  it('accepts a URL with basic auth, nested path, fragment, query and extra parameters', () => {
    expect(isValidHref('https://user:pass@example.com/a/b#frag?q=1&r=2')).toBe(true)
  })

  it('accepts a query value with dashes, underscores and percent-encoded characters', () => {
    expect(isValidHref('https://example.com/a/b?q=1-2_3%40&r=99')).toBe(true)
  })

  it('accepts facebook post, photo and permalink URLs', () => {
    expect(isValidHref('https://www.facebook.com/user.name/posts/pfbid02abcXYZ123')).toBe(true)
    expect(isValidHref('https://www.facebook.com/photo/?fbid=123456&set=a.789')).toBe(true)
    expect(isValidHref('https://m.facebook.com/permalink.php?story_fbid=pfbid0abc&id=100064')).toBe(true)
    expect(isValidHref('https://fb.watch/abc_DEF12/')).toBe(true)
  })

  it('accepts dots, underscores and other URL characters in the path', () => {
    expect(isValidHref('https://example.com/docs/file_v2.pdf')).toBe(true)
    expect(isValidHref('https://example.com/~user/a+b,c:d')).toBe(true)
  })

  it('accepts a hyphenated or non-latin domain', () => {
    expect(isValidHref('https://my-site.com')).toBe(true)
    expect(isValidHref('https://ліга.укр/новини')).toBe(true)
  })

  it('accepts mailto links', () => {
    expect(isValidHref('mailto:test@example.com')).toBe(true)
  })

  it('accepts tel links', () => {
    expect(isValidHref('tel:+79990001122')).toBe(true)
  })

  it('rejects an empty string', () => {
    expect(isValidHref('')).toBe(false)
  })

  it('rejects a protocol-only URL', () => {
    expect(isValidHref('https://')).toBe(false)
  })

  it('rejects a domain without a TLD dot', () => {
    expect(isValidHref('https://.com')).toBe(false)
  })

  it('accepts any protocol with a host: ftp, sftp, file shares', () => {
    for (const href of ['ftp://files.example.com/a.zip', 'sftp://user@host/dir', 'smb://server/share', 'ftp://192.168.0.10/']) {
      expect(isValidHref(href), href).toBe(true)
    }
  })

  it('accepts an internal host without a dot: intranet and localhost', () => {
    for (const href of ['http://intranet/wiki/page', 'http://localhost:8080/admin', 'https://jira/browse/LIGA-1']) {
      expect(isValidHref(href), href).toBe(true)
    }
  })

  it('accepts other protocols without slashes: sms, skype, magnet', () => {
    for (const href of ['sms:+380441234567', 'skype:user.name?call', 'magnet:?xt=urn:btih:abc']) {
      expect(isValidHref(href), href).toBe(true)
    }
  })

  it('rejects a host and port typed without a protocol: it is not a protocol', () => {
    expect(isValidHref('localhost:8080/admin')).toBe(false)
  })

  it('rejects a protocol with slashes but no host', () => {
    expect(isValidHref('ftp://')).toBe(false)
    expect(isValidHref('ftp:///path')).toBe(false)
  })

  it('rejects javascript pseudo-protocols', () => {
    expect(isValidHref('javascript:alert(1)')).toBe(false)
  })

  it('rejects the protocols that run code or embed content', () => {
    for (const href of ['JavaScript:alert(1)', 'vbscript:msgbox(1)', 'data:text/html;base64,PHNjcmlwdD4=']) {
      expect(isValidHref(href), href).toBe(false)
    }
  })

  it('rejects URLs containing spaces', () => {
    expect(isValidHref('https://exa mple.com')).toBe(false)
  })

  it('rejects an http URL without slashes after the protocol', () => {
    expect(isValidHref('https:example.com')).toBe(false)
  })

  it('rejects a domain with an empty label', () => {
    expect(isValidHref('https://example..com')).toBe(false)
  })

  it('rejects plain text', () => {
    expect(isValidHref('not a url')).toBe(false)
  })

  it('accepts an anchor and links relative to the site or the page', () => {
    for (const href of ['#section-2', '/news/politics?page=2', './about', '../index.html', '?tab=comments']) {
      expect(isValidHref(href), href).toBe(true)
    }
  })

  it('rejects relative links with spaces and a bare anchor or slash', () => {
    for (const href of ['#', '/', '/news/a b', '# heading']) {
      expect(isValidHref(href), href).toBe(false)
    }
  })

  it('rejects a protocol-relative link', () => {
    expect(isValidHref('//evil.example/x')).toBe(false)
  })
})