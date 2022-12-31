export type EventType<T extends Record<string, any[]>> = Extract<keyof T, string>;

export type EventListener<T extends Record<string, any[]>, K extends EventType<T>> = (
  ...data: T[K]
) => any;

export type Disposer = () => void;

export class EventEmitter<T extends Record<string, any[]>> {
  listenersMap: Map<EventType<T>, Set<EventListener<T, EventType<T>>>> = new Map();

  addListener<K extends EventType<T>>(eventType: K, listener: EventListener<T, K>): Disposer {
    if (!this.listenersMap.has(eventType)) {
      this.listenersMap.set(eventType, new Set<typeof listener>());
    }
    this.listenersMap.get(eventType).add(listener);

    return () => {
      this.removeListener(eventType, listener);
    };
  }

  emit<K extends EventType<T>>(eventType: K, ...data: T[K]): void {
    const listenersSet = this.listenersMap.get(eventType);

    if (listenersSet) {
      listenersSet.forEach((listener) => listener(...data));
    }
  }

  listenerCount<K extends EventType<T>>(eventType: K): number {
    const listenersSet = this.listenersMap.get(eventType);
    if (!listenersSet) {
      return 0;
    }

    return listenersSet.size;
  }

  removeListener<K extends EventType<T>>(eventType: K, listener: EventListener<T, K>): void {
    const listenersSet = this.listenersMap.get(eventType);
    if (!listenersSet) {
      return;
    }

    listenersSet.delete(listener);
    if (listenersSet.size === 0) {
      this.listenersMap.delete(eventType);
    }
  }

  removeAllListeners<K extends EventType<T>>(eventType?: K): void {
    if (eventType != undefined) {
      this.listenersMap.delete(eventType);
    } else {
      this.listenersMap = new Map();
    }
  }
}
