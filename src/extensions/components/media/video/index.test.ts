import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Youtube } from '@tiptap/extension-youtube'
import Iframe from '@tiptapify/extensions/components/media/iframe'
import { applyVideoNode, selectedVideoNode, TiptapifyVideo } from '@tiptapify/extensions/components/media/video'
import { videoProviders } from '@tiptapify/extensions/components/media/video/providers'
import { VideoFile } from '@tiptapify/extensions/components/media/video/videoFile'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [
      Document,
      Paragraph,
      Text,
      Youtube.configure({ nocookie: true, controls: true }),
      Iframe,
      VideoFile,
      TiptapifyVideo,
    ],
  })

  return editor
}

function selectFirstNode() {
  editor!.commands.setNodeSelection(0)
}

const [youtube, vimeo] = videoProviders

describe('video dialog apply', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('finds no video to edit when none is selected', () => {
    createEditor('<p>Text</p>')

    expect(selectedVideoNode(editor!)).toBeNull()
  })

  it('does not edit an iframe of another site', () => {
    createEditor('<iframe src="https://maps.example.com/embed"></iframe>')
    selectFirstNode()

    expect(selectedVideoNode(editor!)).toBeNull()
  })

  it('finds the selected Vimeo iframe', () => {
    createEditor('<iframe src="https://player.vimeo.com/video/123#t=5s" width="640" height="360"></iframe>')
    selectFirstNode()

    expect(selectedVideoNode(editor!)).toMatchObject({
      type: 'iframe',
      attrs: { src: 'https://player.vimeo.com/video/123#t=5s', width: 640, height: 360 },
    })
  })

  it('inserts a responsive YouTube video without a size', () => {
    createEditor('<p></p>')

    applyVideoNode(editor!, youtube.toNode('dQw4w9WgXcQ', 42, { width: null, height: null }), null)

    const html = editor!.getHTML()
    expect(html).toContain('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=42&amp;rel=1"')
    expect(html).not.toContain('width=')
    expect(html).not.toContain('height=')
  })

  it('updates the selected video and keeps the attributes the dialog does not know', () => {
    createEditor('<video src="/a.mp4" controls loop></video>')
    selectFirstNode()
    const edited = selectedVideoNode(editor!)

    applyVideoNode(editor!, { type: 'video', attrs: { poster: '/a.jpg', loop: false } }, edited)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ src: '/a.mp4', poster: '/a.jpg', controls: true, loop: false })
  })

  it('replaces the selected video when the provider changes', () => {
    createEditor('<div data-youtube-video><iframe src="https://www.youtube-nocookie.com/embed/abc"></iframe></div>')
    selectFirstNode()
    const edited = selectedVideoNode(editor!)

    expect(edited?.type).toBe('youtube')

    applyVideoNode(editor!, vimeo.toNode('123', 0, { width: null, height: null }), edited)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.type.name).toBe('iframe')
    expect(editor!.state.doc.firstChild!.attrs.src).toBe('https://player.vimeo.com/video/123')
  })
})

describe('a video block in the editor', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  // A double click on the block (its player does not take clicks while editing) opens the dialog for it
  function doubleClickNode(pos: number) {
    const { view } = editor!
    const node = view.state.doc.nodeAt(pos)!

    return view.someProp('handleDoubleClickOn', handle => handle(view, pos, node, pos, new MouseEvent('dblclick'), true))
  }

  it.each([
    ['an uploaded video', '<video src="https://cdn.example.com/a.mp4" controls></video>', 'video'],
    ['a YouTube video', '<div data-youtube-video><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe></div>', 'youtube'],
    ['a Vimeo video', '<iframe src="https://player.vimeo.com/video/76979871"></iframe>', 'iframe'],
  ])('%s is selected and opens the video dialog on double click', (_, content, type) => {
    createEditor(content)
    const listener = vi.fn()
    window.addEventListener('tiptapify-show-tiptapifyVideo', listener)

    const handled = doubleClickNode(0)

    window.removeEventListener('tiptapify-show-tiptapifyVideo', listener)
    expect(handled).toBe(true)
    expect(editor!.state.selection.from).toBe(0)
    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0].detail.node.type).toBe(type)
  })

  it('leaves other iframes to the embed dialog', () => {
    createEditor('<iframe src="https://maps.example.com/embed"></iframe>')
    const listener = vi.fn()
    window.addEventListener('tiptapify-show-tiptapifyVideo', listener)

    doubleClickNode(0)

    window.removeEventListener('tiptapify-show-tiptapifyVideo', listener)
    expect(listener).not.toHaveBeenCalled()
  })

  it('wraps the player of an uploaded video in a block that takes the clicks', () => {
    createEditor('<video src="https://cdn.example.com/a.mp4" controls></video>')

    const block = editor!.view.nodeDOM(0) as HTMLElement
    expect(block.classList.contains('tiptapify-video')).toBe(true)
    expect(block.querySelector('video')!.getAttribute('src')).toBe('https://cdn.example.com/a.mp4')
  })
})
