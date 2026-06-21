import { describe, it, expect } from 'vitest'
import helpers from './helpers'

describe('ucFirst', () => {
  it('capitalizes the first character of a string', () => {
    expect(helpers.ucFirst('hello')).toBe('Hello')
  })

  it('returns empty string for empty input', () => {
    expect(helpers.ucFirst('')).toBe('')
  })

  it('converts snake_case to words and capitalizes', () => {
    expect(helpers.ucFirst('hello_world', true)).toBe('Hello world')
  })

  it('converts kebab-case to words and capitalizes', () => {
    expect(helpers.ucFirst('hello-world', false, true)).toBe('Hello world')
  })

  it('converts both snake_case and kebab-case', () => {
    expect(helpers.ucFirst('hello_world-test', true, true)).toBe('Hello world test')
  })

  it('handles already capitalized string', () => {
    expect(helpers.ucFirst('Hello')).toBe('Hello')
  })

  it('handles single character', () => {
    expect(helpers.ucFirst('a')).toBe('A')
  })
})
