import { describe, expect, it } from 'vitest'
import { TiptapifyAiReasoningEffort, TiptapifyAiRequest } from '@tiptapify/types/editor'
import { applyThinking, initialThinkingChoice, thinkingChoices } from './thinking'

function request(extra: Partial<TiptapifyAiRequest> = {}): TiptapifyAiRequest {
  return { messages: [], ...extra }
}

describe('thinking choices', () => {
  it('offers nothing when thinking is not configured, even with effort options', () => {
    expect(thinkingChoices({ reasoningEffort: { options: ['low'] } })).toEqual([])
    expect(initialThinkingChoice({})).toBeNull()
  })

  it('offers off and on for plain thinking', () => {
    expect(thinkingChoices({ thinking: true })).toEqual(['off', 'on'])
    expect(initialThinkingChoice({ thinking: true })).toBe('on')
  })

  it('adds the effort options without the "default" entry', () => {
    const config = { thinking: true, reasoningEffort: { options: ['default', 'low', 'high'] as TiptapifyAiReasoningEffort[] } }

    expect(thinkingChoices(config)).toEqual(['off', 'on', 'low', 'high'])
  })

  it('starts at the configured default effort only when it is an option', () => {
    expect(initialThinkingChoice({ thinking: true, reasoningEffort: { options: ['low', 'high'], default: 'high' } })).toBe('high')
    expect(initialThinkingChoice({ thinking: true, reasoningEffort: { options: ['low'], default: 'high' } })).toBe('on')
  })
})

describe('applyThinking', () => {
  it('sends an explicit effort instead of enable_thinking', () => {
    expect(applyThinking(request({ enable_thinking: true }), 'medium')).toEqual({ messages: [], reasoning_effort: 'medium' })
  })

  it('sends enable_thinking for on and off, dropping a configured effort', () => {
    expect(applyThinking(request({ reasoning_effort: 'low' }), 'on')).toEqual({ messages: [], enable_thinking: true })
    expect(applyThinking(request(), 'off')).toEqual({ messages: [], enable_thinking: false })
  })

  it('turns thinking off when it is not supported', () => {
    expect(applyThinking(request({ enable_thinking: true }), null)).toEqual({ messages: [], enable_thinking: false })
  })
})
