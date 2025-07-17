import { ref } from "vue";

export const defaultFontSize = 12
export const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 48, 64, 96]

export const defaultLineHeight = 1
export const lineHeights = [1, 1.5, 2, 3, 4]

export const headingLevels = ref([1, 2, 3, 4, 5, 6])
export function setHeadingLevels(customHeadingLevels: number[]) {
  if (customHeadingLevels.length) {
    customHeadingLevels.forEach(level => {
      if (level < 1 || level > 6) {
        throw new Error('customHeadingLevels must be between 1 and 6')
      }
    })

    headingLevels.value = customHeadingLevels
  }
}

export const fonts = [
  {
    name: 'Arial',
    fontFamily: 'arial'
  },
  {
    name: 'Arial Black',
    fontFamily: 'arial black'
  },
  {
    name: 'Baskerville',
    fontFamily: 'baskerville'
  },
  {
    name: 'Bodoni MT',
    fontFamily: 'bodoni mt'
  },
  {
    name: 'Brush Script MT',
    fontFamily: 'brush script mt'
  },
  {
    name: 'Calibri',
    fontFamily: 'calibri'
  },
  {
    name: 'Calisto MT',
    fontFamily: 'calisto mt'
  },
  {
    name: 'Cambria',
    fontFamily: 'cambria'
  },
  {
    name: 'Century Gothic',
    fontFamily: 'century gothic'
  },
  {
    name: 'Consolas',
    fontFamily: 'consolas'
  },
  {
    name: 'Comic Sans',
    fontFamily: 'comic sans ms, comic sans'
  },
  {
    name: 'Courier',
    fontFamily: 'Courier'
  },
  {
    name: 'Courier New',
    fontFamily: 'courier new'
  },
  {
    name: 'Cursive',
    fontFamily: 'cursive'
  },
  {
    name: 'Dejavu Sans',
    fontFamily: 'dejavu sans'
  },
  {
    name: 'Franklin Gothic',
    fontFamily: 'franklin gothic'
  },
  {
    name: 'Garamond',
    fontFamily: 'garamond'
  },
  {
    name: 'Georgia',
    fontFamily: 'georgia'
  },
  {
    name: 'Helvetica',
    fontFamily: 'helvetica'
  },
  {
    name: 'Impact',
    fontFamily: 'impact'
  },
  {
    name: 'Inter',
    fontFamily: 'inter'
  },
  {
    name: 'Monospace',
    fontFamily: 'monospace'
  },
  {
    name: 'Optima',
    fontFamily: 'optima'
  },
  {
    name: 'Segoe UI',
    fontFamily: 'segoe ui'
  },
  {
    name: 'Serif',
    fontFamily: 'serif'
  },
  {
    name: 'Tahoma',
    fontFamily: 'tahoma'
  },
  {
    name: 'Time New Roman',
    fontFamily: 'times new roman'
  },
  {
    name: 'Trebuchet MS',
    fontFamily: 'trebuchet ms'
  },
  {
    name: 'Verdana',
    fontFamily: 'verdana'
  },
]
