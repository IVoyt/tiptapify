import { reactive } from 'vue'

type PickerCloseEvent = {
  type: 'emoji' | 'charmap'
}

type PickerEvents = {
  close: PickerCloseEvent
}

type EventCallback<T> = (data: T) => void

class PickerEventBusClass {
  private listeners: Map<keyof PickerEvents, Set<EventCallback<any>>> = new Map()

  on<K extends keyof PickerEvents>(event: K, callback: EventCallback<PickerEvents[K]>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
  }

  off<K extends keyof PickerEvents>(event: K, callback: EventCallback<PickerEvents[K]>) {
    this.listeners.get(event)?.delete(callback)
  }

  emit<K extends keyof PickerEvents>(event: K, data: PickerEvents[K]) {
    this.listeners.get(event)?.forEach(callback => callback(data))
  }
}

export const PickerEventBus = reactive(new PickerEventBusClass())
