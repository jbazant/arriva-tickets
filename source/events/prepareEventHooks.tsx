import { useEffect } from 'react';
import { EventEmitter, EventListener, EventType } from './model/EventEmitter';

export function prepareEventHooks<T extends Record<string, any[]>>(
  inputEventEmitter?: EventEmitter<T>,
) {
  const eventEmitter = inputEventEmitter ?? new EventEmitter<T>();

  const useListenerEffect = <K extends EventType<T>>(
    eventType: K,
    callback: EventListener<T, K>,
    callbackDeps: unknown[],
  ) => {
    useEffect(
      () => eventEmitter.addListener(eventType, callback),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [eventType, ...callbackDeps],
    );
  };

  const useEmitEvent =
    <K extends EventType<T>>(eventType: K) =>
    (...data: T[K]) =>
      eventEmitter.emit(eventType, ...data);

  return { eventEmitter, useListenerEffect, useEmitEvent };
}
