import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { editorExtensions } from '@tiptapify/components/editorExtensions'
import { contentCss, contentHTML, inlineContentStyles } from '@tiptapify/utils/contentStyles'

let editor: Editor | null = null

function editorWith(content: string): Editor {
  editor = new Editor({ extensions: editorExtensions('', false, []), content })

  return editor
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

function element(html: string, selector: string): HTMLElement {
  const template = document.createElement('template')
  template.innerHTML = html

  return template.content.querySelector<HTMLElement>(selector)!
}

const card = (layout: string) => `<a class="tiptapify-link-card" data-link-card="${layout}" href="https://example.com">`
  + '<img class="tiptapify-link-card__image" src="/i.png" alt=""><span class="tiptapify-link-card__body">'
  + '<span class="tiptapify-link-card__site">Example</span><span class="tiptapify-link-card__title">Title</span>'
  + '<span class="tiptapify-link-card__description">Text</span></span></a>'

describe('content styles', () => {
  it('make a stylesheet for a site, weightless under :where(), and one for the editor', () => {
    expect(contentCss()).toContain(':where(.tiptapify-content) .tiptapify-link-card { display: flex;')
    expect(contentCss('.tiptap', { weightless: false })).toContain('.tiptap .tiptapify-link-card { display: flex;')
    expect(contentCss('.tiptap', { weightless: false })).not.toContain(':where(')
  })

  it('write the look of a link card into its elements, per layout', () => {
    const compact = inlineContentStyles(card('compact'))
    expect(element(compact, 'a').style.display).toBe('flex')
    expect(element(compact, 'a').style.flexWrap).toBe('wrap')
    expect(element(compact, 'a').style.color).toBe('inherit')
    expect(element(compact, 'img').style.objectFit).toBe('cover')
    expect(element(compact, '.tiptapify-link-card__title').style.fontWeight).toBe('600')
    expect(element(compact, '.tiptapify-link-card__description').getAttribute('style')).toContain('-webkit-line-clamp: 3;')

    const large = inlineContentStyles(card('large'))
    expect(element(large, 'a').style.flexDirection).toBe('column')
    expect(element(large, 'a').style.maxWidth).toBe('520px')
    expect(element(large, 'img').getAttribute('style')).toContain('aspect-ratio: 1.91 / 1;')
  })

  it('keep the styles an element has and change nothing when applied twice', () => {
    const html = '<figure data-align="left"><img src="/a.png" style="float: left;"><figcaption>Caption</figcaption></figure>'
    const once = inlineContentStyles(html)

    expect(element(once, 'img').style.float).toBe('left')
    expect(element(once, 'img').style.display).toBe('block')
    expect(element(once, 'figure').style.float).toBe('left')
    expect(element(once, 'figure').style.maxWidth).toBe('50%')
    expect(element(once, 'figcaption').style.textAlign).toBe('start')
    expect(inlineContentStyles(once)).toBe(once)
  })

  it('size videos and embeds, and lay out task lists', () => {
    const html = '<video src="/a.mp4"></video><video src="/b.mp4" width="320"></video>'
      + '<div data-youtube-video=""><iframe src="https://www.youtube-nocookie.com/embed/x"></iframe></div>'
      + '<ul data-type="taskList"><li data-type="taskItem"><label><input type="checkbox"></label><div><p>Task</p></div></li></ul>'
      + '<p>Text</p>'
    const styled = inlineContentStyles(html)

    expect(element(styled, 'video[src="/a.mp4"]').getAttribute('style')).toContain('aspect-ratio: 16 / 9;')
    expect(element(styled, 'video[src="/b.mp4"]').getAttribute('style')).toBe('display: block; max-width: 100%;')
    expect(element(styled, 'iframe').getAttribute('style')).toContain('aspect-ratio: 16 / 9;')
    expect(element(styled, 'ul').style.listStyle).toBe('none')
    expect(element(styled, 'li').style.display).toBe('flex')
    expect(element(styled, 'li p').style.margin).toBe('0px')
    expect(element(styled, 'ul ~ p').hasAttribute('style')).toBe(false)
  })

  it('leave the HTML as it is for a site with content.css', () => {
    expect(contentHTML(card('compact'), 'classes')).toBe(card('compact'))
  })
})

describe('content styles in the editor', () => {
  const content = `<p>Text</p>${card('compact')}`
    + '<figure data-align="right"><img src="/a.png" style="float: right;"><figcaption>Caption</figcaption></figure>'
    + '<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe></div>'
    + '<video src="/a.mp4" controls=""></video>'
    + '<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>Done</p></li></ul>'

  it('are ignored when HTML with them loads again: it saves the same content', () => {
    const clean = editorWith(content).getHTML()
    editor!.destroy()

    const styled = inlineContentStyles(clean)
    const reloaded = editorWith(styled).getHTML()

    expect(reloaded).toBe(clean)
    expect(inlineContentStyles(reloaded)).toBe(styled)
  })

  it('keep a floated image as a figure with its float', () => {
    const html = editorWith(content).getHTML()

    expect(html).toContain('<figure data-align="right"><img src="/a.png" style="float: right;">')
  })

  it('keep a responsive YouTube video without a size when it loads again', () => {
    const html = editorWith(content).getHTML()

    expect(element(html, 'div[data-youtube-video] iframe').hasAttribute('width')).toBe(false)
    expect(editor!.state.doc.child(3).attrs).toMatchObject({ width: null, height: null })
  })
})
