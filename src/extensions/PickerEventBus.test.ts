import { describe, it, expect, vi } from 'vitest'
import { PickerEventBus } from './PickerEventBus'

describe('PickerEventBus', () => {
  it('calls registered callback on emit', () => {
    const callback = vi.fn()
    PickerEventBus.on('close', callback)
    PickerEventBus.emit('close', { type: 'emoji' })
    expect(callback).toHaveBeenCalledWith({ type: 'emoji' })
  })

  it('does not call callback after off', () => {
    const callback = vi.fn()
    PickerEventBus.on('close', callback)
    PickerEventBus.off('close', callback)
    PickerEventBus.emit('close', { type: 'charmap' })
    expect(callback).not.toHaveBeenCalled()
  })

  it('supports multiple listeners', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    PickerEventBus.on('close', callback1)
    PickerEventBus.on('close', callback2)
    PickerEventBus.emit('close', { type: 'emoji' })
    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  it('does not throw when emitting with no listeners', () => {
    expect(() => PickerEventBus.emit('close', { type: 'emoji' })).not.toThrow()
  })

  it('does not throw when removing unregistered listener', () => {
    const callback = vi.fn()
    expect(() => PickerEventBus.off('close', callback)).not.toThrow()
  })
})
