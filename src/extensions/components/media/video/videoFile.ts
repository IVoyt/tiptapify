import { Node } from '@tiptap/core'

export type VideoFileAttrs = {
  src: string,
  poster?: string | null,
  controls?: boolean,
  // Autoplay renders `autoplay muted`: browsers only autoplay muted videos
  autoplay?: boolean,
  loop?: boolean,
  // Seconds, 0 for none; stored on the src as the `#t=` media fragment
  start?: number,
  // null for a responsive (full width, 16:9) video
  width?: number | null,
  height?: number | null,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideoFile: (attrs: VideoFileAttrs) => ReturnType
    }
  }
}

function sourceOf(element: HTMLElement): string | null {
  return element.getAttribute('src') ?? element.querySelector('source[src]')?.getAttribute('src') ?? null
}

/**
 * Splits a `#t=<seconds>` media fragment off a video URL.
 */
export function splitStartFragment(url: string | null): { src: string | null, start: number } {
  const match = url?.match(/^(.*?)#t=(?:npt:)?(\d+(?:\.\d+)?)(?:,[\d.]*)?$/)

  if (!url || !match) {
    return { src: url, start: 0 }
  }

  return { src: match[1], start: Math.floor(Number(match[2])) }
}

function parseDimension(element: HTMLElement, name: string): number | null {
  const value = Number.parseInt(element.getAttribute(name) ?? '', 10)

  return value > 0 ? value : null
}

/**
 * An uploaded (or linked) video file, played by the browser's own `<video>` player.
 */
export const VideoFile = Node.create({
  name: 'video',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => splitStartFragment(sourceOf(element)).src,
        renderHTML: attributes => ({
          src: attributes.start ? `${attributes.src}#t=${attributes.start}` : attributes.src,
        }),
      },
      start: {
        default: 0,
        parseHTML: element => splitStartFragment(sourceOf(element)).start,
        rendered: false,
      },
      poster: {
        default: null,
      },
      controls: {
        default: true,
        parseHTML: element => element.hasAttribute('controls'),
        renderHTML: attributes => (attributes.controls ? { controls: '' } : {}),
      },
      autoplay: {
        default: false,
        parseHTML: element => element.hasAttribute('autoplay'),
        renderHTML: attributes => (attributes.autoplay ? { autoplay: '', muted: '' } : {}),
      },
      loop: {
        default: false,
        parseHTML: element => element.hasAttribute('loop'),
        renderHTML: attributes => (attributes.loop ? { loop: '' } : {}),
      },
      width: {
        default: null,
        parseHTML: element => parseDimension(element, 'width'),
      },
      height: {
        default: null,
        parseHTML: element => parseDimension(element, 'height'),
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'video[src]' },
      // A video with its file in a <source> child
      { tag: 'video', getAttrs: element => (element.querySelector('source[src]') ? null : false) },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', { ...HTMLAttributes, playsinline: '', preload: 'metadata' }]
  },

  // In the editor the video never starts by itself (autoplay is for the published page), and its block
  // takes the clicks to be selected while the player takes none (see the editor styles)
  addNodeView() {
    return ({ HTMLAttributes }) => {
      const dom = document.createElement('div')
      dom.className = 'tiptapify-video'

      const video = document.createElement('video')
      const attributes = { ...HTMLAttributes, playsinline: '', preload: 'metadata' }

      for (const [name, value] of Object.entries(attributes)) {
        if (name !== 'autoplay' && value !== null && value !== undefined) {
          video.setAttribute(name, String(value))
        }
      }

      dom.append(video)

      return { dom }
    }
  },

  addCommands() {
    return {
      setVideoFile: attrs => ({ commands }) => commands.insertContent({ type: this.name, attrs }),
    }
  },
})
