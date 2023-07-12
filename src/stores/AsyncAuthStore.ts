import { BaseAuthStore } from 'pocketbase'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AsyncAuthStore extends BaseAuthStore {
  private storageKey: string
  private queue: Array<() => Promise<void>>

  constructor(storageKey: string = 'pb_auth') {
    super()

    this.storageKey = storageKey
    this.queue = []

    this._enqueue(async () => {
      const raw = await AsyncStorage.getItem(this.storageKey)
      if (raw) {
        const decoded = JSON.parse(raw)
        this.save(decoded.token, decoded.model)
      }
    })
  }

  save(token: string, model: any): void {
    super.save(token, model)

    this._enqueue(() => {
      return AsyncStorage.setItem(
        this.storageKey,
        JSON.stringify({ token, model }),
      )
    })
  }

  clear(): void {
    super.clear()

    this._enqueue(() => {
      return AsyncStorage.removeItem(this.storageKey)
    })
  }

  private _enqueue(asyncCallback: () => Promise<void>): void {
    this.queue.push(asyncCallback)

    if (this.queue.length === 1) {
      this._dequeue()
    }
  }

  private _dequeue(): void {
    if (!this.queue.length) {
      return
    }

    this.queue[0]().finally(() => {
      this.queue.shift()

      if (this.queue.length > 0) {
        this._dequeue()
      }
    })
  }
}

export default AsyncAuthStore
