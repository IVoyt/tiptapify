import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Iframe, { selectedIframe } from '@tiptapify/extensions/components/media/iframe'
import { TiptapifyVideo } from '@tiptapify/extensions/components/media/video'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Iframe, TiptapifyVideo],
  })

  return editor
}

function iframeAttrs() {
  return editor!.state.doc.firstChild!.attrs
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

describe('iframe node', () => {
  it('renders a responsive embed that a site shows without the editor', () => {
    createEditor('<p></p>')
    editor!.commands.setIframe({ src: 'https://a.example/x', title: 'Map', ratio: 'auto', width: 600, height: 450, loading: 'lazy' })

    const html = editor!.getHTML()
    expect(html).toContain('<div class="iframe-wrapper"><iframe')
    expect(html).toContain('data-ratio="auto"')
    // jsdom writes the style back normalized (`0px`)
    expect(html).toMatch(/style="width: 100%; height: auto; aspect-ratio: 600 \/ 450; border: 0(px)?;"/)
    expect(html).toContain('loading="lazy"')
    expect(html).not.toContain('frameborder')
  })

  it.each([
    ['responsive', { ratio: 'auto', width: 600, height: 450 }],
    ['a ratio preset', { ratio: '4:3', width: null, height: null }],
    ['a custom size with a border', { ratio: null, width: 640, height: 360, border: true }],
    ['the advanced options', { allow: 'autoplay; fullscreen', sandbox: '', name: 'frame', loading: 'lazy', allowfullscreen: true }],
  ])('reads back %s from its HTML', (_, attrs) => {
    createEditor('<p></p>')
    editor!.commands.setIframe({ src: 'https://a.example/x', ...attrs })
    const stored = { ...iframeAttrs() }

    editor!.commands.setContent(editor!.getHTML())

    expect(iframeAttrs()).toEqual(stored)
  })

  it('keeps fullscreen of old embeds saved without the attribute, as before', () => {
    createEditor('<iframe src="https://a.example/x" width="640" height="360"></iframe>')

    expect(iframeAttrs().allowfullscreen).toBe(true)
  })

  it('loads old content: the size as custom, frameborder as the border', () => {
    createEditor('<iframe src="https://a.example/x" width="640" height="360" frameborder="1" allowfullscreen="true"></iframe>')

    expect(iframeAttrs()).toMatchObject({ width: 640, height: 360, ratio: null, border: true, allowfullscreen: true })
    expect(editor!.getHTML()).toContain('style="border: 1px solid rgba(128, 128, 128, 0.5);"')
  })
})

describe('an embed block in the editor', () => {
  function doubleClickNode(pos: number) {
    const { view } = editor!
    const node = view.state.doc.nodeAt(pos)!

    return view.someProp('handleDoubleClickOn', handle => handle(view, pos, node, pos, new MouseEvent('dblclick'), true))
  }

  function listen(name: string) {
    const listener = vi.fn()
    window.addEventListener(name, listener)

    return { listener, stop: () => window.removeEventListener(name, listener) }
  }

  it('opens the embed dialog for the iframe on double click', () => {
    createEditor('<iframe src="https://maps.example.com/embed" title="Map"></iframe>')
    const { listener, stop } = listen('tiptapify-show-iframe')

    expect(doubleClickNode(0)).toBe(true)
    stop()

    expect(selectedIframe(editor!)).toMatchObject({ src: 'https://maps.example.com/embed', title: 'Map' })
    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0].detail.node).toMatchObject({ src: 'https://maps.example.com/embed' })
  })

  it('leaves a Vimeo player to the video dialog', () => {
    createEditor('<iframe src="https://player.vimeo.com/video/76979871"></iframe>')
    const iframe = listen('tiptapify-show-iframe')
    const video = listen('tiptapify-show-tiptapifyVideo')

    doubleClickNode(0)
    iframe.stop()
    video.stop()

    expect(iframe.listener).not.toHaveBeenCalled()
    expect(video.listener).toHaveBeenCalledOnce()
    expect(selectedIframe(editor!)).toBeNull()
  })

  it('opens the dialog to insert when no embed is selected', () => {
    createEditor('<p>Text</p>')
    const { listener, stop } = listen('tiptapify-show-iframe')

    editor!.commands.showIframe()
    stop()

    expect(listener.mock.calls[0][0].detail.node).toBeNull()
  })
})
