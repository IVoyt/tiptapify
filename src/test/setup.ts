import type { JSDOM } from 'jsdom'

// Node 25+ exposes its own localStorage, and the Vitest jsdom environment keeps it, hiding jsdom's.
// jsdom's descriptor goes back in its place: a getter, so a test can still spy on `window.localStorage`.
const jsdomWindow = (globalThis as unknown as { jsdom: JSDOM }).jsdom.window

Object.defineProperty(globalThis, 'localStorage', Object.getOwnPropertyDescriptor(jsdomWindow, 'localStorage')!)
