import { describe, expect, it } from 'vitest'
import Tiptapify from '@tiptapify/components/Tiptapify.vue'

describe('Tiptapify upload prop', () => {
  it('defaults to no upload endpoint', () => {
    const props = (Tiptapify as unknown as { props: Record<string, { default: unknown }> }).props

    expect(props.upload.default).toBeNull()
  })
})
