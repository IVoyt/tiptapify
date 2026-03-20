import punctuation from './punctuation'
import symbols from './symbols'
import math from './math'
import currency from './currency'
import greek from './greek'
import extendedLetters from './extended_letters'
import diacritics from './diacritics'
import typography from './typography'
import cyrillic from './cyrillic'
import hebrew from './hebrew'
import arrows from './arrows'
import boxDrawing from './box_drawing'

export default [
  {
    name: 'punctuation',
    items: punctuation,
    order: 1
  },
  {
    name: 'symbols',
    items: symbols,
    order: 2
  },
  {
    name: 'math',
    items: math,
    order: 3
  },
  {
    name: 'currency',
    items: currency,
    order: 4
  },
  {
    name: 'greek',
    items: greek,
    order: 5
  },
  {
    name: 'extended_letters',
    items: extendedLetters,
    order: 6
  },
  {
    name: 'diacritics',
    items: diacritics,
    order: 7
  },
  {
    name: 'typography',
    items: typography,
    order: 8
  },
  {
    name: 'cyrillic',
    items: cyrillic,
    order: 9
  },
  {
    name: 'hebrew',
    items: hebrew,
    order: 10
  },
  {
    name: 'arrows',
    items: arrows,
    order: 11
  },
  {
    name: 'box_drawing',
    items: boxDrawing,
    order: 12
  },
]
