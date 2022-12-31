import { EventEmitter } from './model/EventEmitter';
import { prepareEventHooks } from './prepareEventHooks';

describe('prepareEventHooks unit', () => {
  it('should create new EventEmitter', () => {
    const { eventEmitter } = prepareEventHooks();
    expect(eventEmitter).toBeInstanceOf(EventEmitter);
  });

  it('should use given EventEmitter instance', () => {
    const originalEventEmitter = new EventEmitter();
    const { eventEmitter } = prepareEventHooks(originalEventEmitter);

    expect(eventEmitter).toBe(originalEventEmitter);
  });
});
