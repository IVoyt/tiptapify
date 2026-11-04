import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { VideoFile } from '@tiptapify/extensions/components/media/video/videoFile'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, VideoFile],
  })

  return editor
}

function videoAttrs() {
  return editor!.state.doc.firstChild!.attrs
}

describe('video file node', () => {
  afterEach(() => {
    editor?.destroy()
    editor = null
  })

  it('renders a responsive video with controls by default', () => {
    createEditor('')
    editor!.commands.setContent('')
    editor!.commands.setVideoFile({ src: 'https://cdn.example.com/a.mp4' })

    expect(editor!.getHTML()).toContain(
      '<video src="https://cdn.example.com/a.mp4" controls="" playsinline="" preload="metadata"></video>',
    )
  })

  it('does not play by itself in the editor, while the saved video keeps autoplay', () => {
    createEditor('<video src="https://cdn.example.com/a.mp4" autoplay muted controls></video>')

    const video = editor!.view.dom.querySelector('video')!
    expect(video.hasAttribute('autoplay')).toBe(false)
    expect(video.getAttribute('src')).toBe('https://cdn.example.com/a.mp4')
    expect(editor!.getHTML()).toContain('autoplay=""')
  })

  it('renders every option and parses it back', () => {
    createEditor('')
    editor!.commands.setVideoFile({
      src: 'https://cdn.example.com/a.mp4',
      poster: 'https://cdn.example.com/a.jpg',
      controls: false,
      autoplay: true,
      loop: true,
      start: 42,
      width: 640,
      height: 360,
    })

    const html = editor!.getHTML()

    expect(html).toContain('src="https://cdn.example.com/a.mp4#t=42"')
    expect(html).toContain('poster="https://cdn.example.com/a.jpg"')
    expect(html).toContain('autoplay="" muted=""')
    expect(html).toContain('loop=""')
    expect(html).toContain('width="640" height="360"')
    expect(html).not.toContain('controls')

    editor!.destroy()
    createEditor(html)

    expect(videoAttrs()).toEqual({
      src: 'https://cdn.example.com/a.mp4',
      poster: 'https://cdn.example.com/a.jpg',
      controls: false,
      autoplay: true,
      loop: true,
      start: 42,
      width: 640,
      height: 360,
    })
    expect(editor!.getHTML()).toBe(html)
  })

  it('parses a video without options', () => {
    createEditor('<video src="/a.mp4"></video>')

    expect(videoAttrs()).toMatchObject({ src: '/a.mp4', controls: false, autoplay: false, loop: false, start: 0, width: null })
  })

  it('reads the file from a <source> child', () => {
    createEditor('<video controls><source src="/a.webm#t=7" type="video/webm"></video>')

    expect(videoAttrs()).toMatchObject({ src: '/a.webm', start: 7, controls: true })
  })
})
