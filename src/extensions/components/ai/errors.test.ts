import { describe, expect, it } from 'vitest'
import { aiErrorKind, aiErrorDetail } from '@tiptapify/extensions/components/ai/errors'

const withStatus = (status: number, message = '') => Object.assign(new Error(message), { status })

describe('AI errors', () => {
  it.each([
    ['Chrome', new TypeError('Failed to fetch')],
    ['Firefox', new TypeError('NetworkError when attempting to fetch resource.')],
    ['Safari', new TypeError('Load failed')],
    ['Node', new TypeError('fetch failed')],
  ])('reads a failed fetch (%s) as the service being unreachable or blocked by CORS', (_, error) => {
    expect(aiErrorKind(error)).toBe('network')
    expect(aiErrorDetail(error)).toBe('')
  })

  it.each([
    [401, 'auth'],
    [403, 'auth'],
    [404, 'not_found'],
    [408, 'timeout'],
    [429, 'rate_limit'],
    [500, 'unavailable'],
    [503, 'unavailable'],
    [504, 'timeout'],
    [400, 'request'],
  ])('reads status %i as %s', (status, kind) => {
    expect(aiErrorKind(withStatus(status as number))).toBe(kind)
  })

  it('reads a timeout of the request', () => {
    expect(aiErrorKind(new DOMException('The operation timed out.', 'TimeoutError'))).toBe('timeout')
  })

  it('keeps the message of the service as the detail, not the generic status text', () => {
    expect(aiErrorDetail(withStatus(401, 'missing or wrong API key'))).toBe('missing or wrong API key')
    expect(aiErrorDetail(withStatus(503, 'Request failed with status 503'))).toBe('')
  })

  it('shows any other error of a custom provider as it is', () => {
    expect(aiErrorKind(new Error('Quota of the project is used up'))).toBe('other')
    expect(aiErrorDetail(new Error('Quota of the project is used up'))).toBe('Quota of the project is used up')
    expect(aiErrorKind('weird')).toBe('other')
  })
})
