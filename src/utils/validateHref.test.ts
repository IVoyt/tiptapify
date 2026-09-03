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

  it('rejects unsupported protocols', () => {
    expect(isValidHref('ftp://example.com')).toBe(false)
  })

  it('rejects javascript pseudo-protocols', () => {
    expect(isValidHref('javascript:alert(1)')).toBe(false)
  })

  it('rejects URLs containing spaces', () => {
    expect(isValidHref('https://exa mple.com')).toBe(false)
  })

  it('rejects plain text', () => {
    expect(isValidHref('not a url')).toBe(false)
  })
})