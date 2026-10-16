import { describe, expect, it } from 'vitest'
import { editorExtensions } from '@tiptapify/components/editorExtensions'

describe('editor extensions', () => {
  it('selects a link on click instead of opening it', () => {
    const link = editorExtensions('', false, []).find(extension => extension.name === 'link')

    expect(link?.options).toMatchObject({ openOnClick: false, enableClickSelection: true })
  })
})
