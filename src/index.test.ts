import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { registerSkin, defineSkin } from '@tiptapify/index'
import { registerSkin as fromRegistry, defineSkin as defineFromRegistry } from '@tiptapify/skins/registry'

describe('package entry exports', () => {
  it('exports registerSkin and defineSkin as functions', () => {
    expect(typeof registerSkin).toBe('function')
    expect(typeof defineSkin).toBe('function')
  })

  it('re-exports the registry functions, not copies', () => {
    expect(registerSkin).toBe(fromRegistry)
    expect(defineSkin).toBe(defineFromRegistry)
  })

  it('defineSkin is identity: the same object comes back', () => {
    const skin = { extends: 'pastel', colors: { toolbarBg: 'rebeccapurple' } }

    expect(defineSkin(skin)).toBe(skin)
  })
})

describe('index.d.ts skin-type parity with src/types/editor.ts', () => {
  // index.d.ts is hand-mirrored from the source types; this guard compares the
  // exported skin-type declarations member-for-member (declared shape, not
  // comments/formatting), ending the silent-drift risk of the hand mirror.
  const SKIN_TYPES = [
    'TiptapifySkin',
    'TiptapifyShape',
    'ResolvedShape',
    'TiptapifySkinColors',
    'TiptapifySkinMetrics',
    'TiptapifySkinConfig',
    'TiptapifySkinInput',
  ]

  // cwd is the vitest root (the repo): the guard pins files of the package root
  const dts = readFileSync(path.resolve(process.cwd(), 'index.d.ts'), 'utf8')
  const source = readFileSync(path.resolve(process.cwd(), 'src/types/editor.ts'), 'utf8')

  // The declaration block of `name`: a brace body to its closing brace,
  // an alias body (no `{` on the header line) to the end of its line.
  // Constraints of this extractor, adequate for the skin blocks it pins:
  // declarations must be single-line aliases or brace-bodied types (the
  // index.d.ts mirror style); the `//`-stripping in normalize treats any
  // `//` as a comment start, so these blocks must contain no URLs in strings.
  function declaration (file: string, name: string): string {
    const lines = file.split('\n')
    const start = lines.findIndex((line) => new RegExp(`^export (interface|type) ${name}\\b`).test(line))
    if (start < 0) return ''
    if (lines[start].indexOf('{') < 0) return lines[start]
    let depth = 0
    for (let i = start; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++
        if (ch === '}') depth--
      }
      if (depth === 0) return lines.slice(start, i + 1).join('\n')
    }
    return ''
  }

  // Tolerant to the formatting freedom of a hand-written mirror: interface vs type
  // literal, comments, indentation, line breaks inside the body
  function normalize (block: string, name: string): string {
    return block
      .split('\n')
      .map((line) => line.replace(/\/\/.*$/, ''))
      .join(' ')
      .replace(new RegExp(`interface ${name} \\{`), `${name} {`)
      .replace(new RegExp(`type ${name} = \\{`), `${name} {`)
      .replace(/\s+/g, ' ')
      .trim()
  }

  for (const name of SKIN_TYPES) {
    it(`${name} is mirrored member-for-member`, () => {
      const inDts = declaration(dts, name)
      const inSource = declaration(source, name)

      expect(inDts, `${name} missing from index.d.ts`).not.toBe('')
      expect(inSource, `${name} missing from src/types/editor.ts`).not.toBe('')
      expect(normalize(inDts, name)).toBe(normalize(inSource, name))
    })
  }
})
