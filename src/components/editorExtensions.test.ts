import { describe, expect, it } from 'vitest'
import { editorExtensions } from '@tiptapify/components/editorExtensions'

describe('editor extensions', () => {
  it('selects a link on click instead of opening it', () => {
    const link = editorExtensions('', false, []).find(extension => extension.name === 'link')

    expect(link?.options).toMatchObject({ openOnClick: false, enableClickSelection: true })
  })

  it('keeps base64 images unless the host uploads images to its own server', () => {
    const image = (allowBase64?: boolean) => editorExtensions('', false, [], null, { captionPlaceholder: '', sliderMinImages: 0, sliderLabel: '', allowBase64 })
      .find(extension => extension.name === 'image')

    expect(image()?.options.allowBase64).toBe(true)
    expect(image(false)?.options.allowBase64).toBe(false)
  })

})
