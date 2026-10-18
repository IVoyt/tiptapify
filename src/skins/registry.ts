import { TiptapifyShape, TiptapifySkinConfig, TiptapifySkinInput } from '@tiptapify/types/editor'
import { baseColors, baseMetrics, skinColorKeys, skinMetricKeys, cssVarName } from './tokens'

export type ResolvedSkin = {
  name: string
  // root class for the escape hatch: `tiptapify-skin-{name}`
  className: string
  shape: Required<TiptapifyShape>
  // css variable name -> value; only overrides, base values are the css fallbacks
  tokens: Record<string, string>
}

// The classic structure: every skin resolves over it (base tokens → extends chain → own)
export const CLASSIC_SHAPE: Required<TiptapifyShape> = {
  toolbar: 'raised',
  groups: 'box',
  buttons: 'vuetify',
  bubble: 'card',
  dialog: 'classic',
  menu: 'vuetify',
}

const registry = new Map<string, TiptapifySkinConfig>()

export function registerSkin(name: string, skin: TiptapifySkinConfig): void {
  registry.set(name, { ...skin, name })
}

// Identity for typed const definitions; the object never enters the registry
export function defineSkin(skin: TiptapifySkinConfig): TiptapifySkinConfig {
  return skin
}

export function registeredSkins(): string[] {
  return [...registry.keys()]
}

// Dev/test isolation: drop all registrations
export function resetSkins(): void {
  registry.clear()
}

const devWarn = (msg: string) => {
  if (import.meta.env.DEV) console.warn(`[tiptapify] ${msg}`)
}

const isConfig = (skin: TiptapifySkinInput): skin is TiptapifySkinConfig => typeof skin === 'object' && skin !== null

const SHAPE_KEYS = ['toolbar', 'groups', 'buttons', 'bubble', 'dialog', 'menu'] as const

// Walk the extends chain root-first: [default, base…, self]. A missing link
// resolves to the accumulated chain (warn); a cycle resolves to classic (warn).
// 'default' is the implicit root of every chain: a bare registry without the
// builtins must not warn about walking to it.
function chainOf(config: TiptapifySkinConfig): { chain: TiptapifySkinConfig[], cyclic: boolean } {
  const chain: TiptapifySkinConfig[] = []
  const visited = new Set<string>()
  let link: string | undefined = config.extends ?? 'default'
  while (link) {
    if (visited.has(link)) return { chain, cyclic: true }
    visited.add(link)
    const registered = registry.get(link)
    if (!registered) {
      if (link !== 'default') devWarn(`skin extends "${link}" is not registered; resolving without it`)
      break
    }
    chain.unshift(registered)
    link = registered.extends ?? 'default'
    if (link === 'default' && registered.name === 'default') break
  }
  return { chain, cyclic: false }
}

export function resolveSkin(skin?: TiptapifySkinInput): ResolvedSkin {
  let config: TiptapifySkinConfig
  let name: string

  if (skin === undefined || skin === null || skin === '') {
    config = {}
    name = 'default'
  } else if (typeof skin === 'string') {
    const registered = registry.get(skin)
    if (!registered) {
      devWarn(`unknown skin "${skin}"; falling back to "default"`)
      config = {}
      name = 'default'
    } else {
      config = registered
      name = skin
    }
  } else {
    config = skin
    name = config.name ?? 'inline'
  }

  const { chain, cyclic } = chainOf(config)
  if (cyclic) devWarn(`circular "extends" in skin "${name}"; falling back to classic`)

  // base: classic shape + classic tokens (not emitted — they are the css fallbacks)
  const shape: Required<TiptapifyShape> = { ...CLASSIC_SHAPE }
  const colors: Record<string, string> = {}
  const metrics: Record<string, string> = {}
  const sources = cyclic ? [] : [...chain, config]
  for (const source of sources) {
    for (const key of SHAPE_KEYS) {
      const value = source[key]
      if (value) shape[key] = value as never
    }
    for (const [key, value] of Object.entries(source.colors ?? {})) {
      if (!skinColorKeys.includes(key as never)) {
        devWarn(`unknown skin color token "${key}" on skin "${name}"; ignored`)
        continue
      }
      if (value !== undefined) colors[key] = value
    }
    for (const [key, value] of Object.entries(source.metrics ?? {})) {
      if (!skinMetricKeys.includes(key as never)) {
        devWarn(`unknown skin metric token "${key}" on skin "${name}"; ignored`)
        continue
      }
      if (value !== undefined) metrics[key] = value
    }
  }

  const tokens: Record<string, string> = {}
  for (const [key, value] of Object.entries({ ...colors, ...metrics })) {
    const base = (baseColors as Record<string, string>)[key] ?? (baseMetrics as Record<string, string>)[key]
    if (value !== base) tokens[cssVarName(key)] = value
  }

  return { name, className: `tiptapify-skin-${name}`, shape, tokens }
}
