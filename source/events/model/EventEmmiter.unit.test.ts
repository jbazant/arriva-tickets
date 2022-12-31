import { EventEmitter } from './EventEmitter';

describe('EventRegister unit', () => {
  it('should call all registered callbacks on emitEvent call', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const eventEmitter = new EventEmitter();
    eventEmitter.addListener('a', listener1);
    eventEmitter.addListener('a', listener2);

    eventEmitter.emit('a', 'DATA1', 'DATA2');
    eventEmitter.emit('b', 'DATA');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener1).toHaveBeenCalledWith('DATA1', 'DATA2');
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it('should not call callbacks that are already unregistered', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const eventEmitter = new EventEmitter();
    const disposer1 = eventEmitter.addListener('a', listener1);
    eventEmitter.addListener('a', listener2);

    disposer1();
    eventEmitter.emit('a', 'DATA');

    expect(listener1).toHaveBeenCalledTimes(0);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  describe('listenerCount', () => {
    it('should return zero when no listener is subscribed yet', () => {
      const eventEmitter = new EventEmitter();
      expect(eventEmitter.listenerCount('ANY')).toBe(0);
    });

    it('should return correct count', () => {
      const eventEmitter = new EventEmitter();

      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('A', () => {});

      expect(eventEmitter.listenerCount('A')).toBe(3);
    });
  });

  describe('removeListener', () => {
    it('should remove registered listener', () => {
      const eventEmitter = new EventEmitter();
      const listener = jest.fn();

      eventEmitter.addListener('A', listener);
      eventEmitter.removeListener('A', listener);

      expect(eventEmitter.listenerCount('A')).toBe(0);
    });

    it('should ignore unregistered events', () => {
      const eventEmitter = new EventEmitter();

      eventEmitter.addListener('A', () => {});
      eventEmitter.removeListener('A', () => {});

      expect(eventEmitter.listenerCount('A')).toBe(1);
    });
  });

  describe('removeAllListeners', () => {
    it('should remove all registered listeners', () => {
      const eventEmitter = new EventEmitter();
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('B', () => {});

      eventEmitter.removeAllListeners();

      expect(eventEmitter.listenerCount('A')).toBe(0);
      expect(eventEmitter.listenerCount('B')).toBe(0);
    });

    it('should remove all registered listeners for given eventType only', () => {
      const eventEmitter = new EventEmitter();
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('B', () => {});

      eventEmitter.removeAllListeners('A');

      expect(eventEmitter.listenerCount('A')).toBe(0);
      expect(eventEmitter.listenerCount('B')).toBe(1);
    });

    it('should ignore empty eventType sets', () => {
      const eventEmitter = new EventEmitter();
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('A', () => {});
      eventEmitter.addListener('B', () => {});

      eventEmitter.removeAllListeners('C');

      expect(eventEmitter.listenerCount('A')).toBe(2);
      expect(eventEmitter.listenerCount('B')).toBe(1);
    });
  });

  describe('internals', () => {
    it('should delete disposed listeners and empty listeners sets', () => {
      const eventEmitter = new EventEmitter();

      const disposer1 = eventEmitter.addListener('a', jest.fn());
      const disposer2 = eventEmitter.addListener('a', jest.fn());
      expect(eventEmitter.listenersMap.size).toBe(1);
      expect(eventEmitter.listenersMap.get('a').size).toBe(2);

      disposer1();
      expect(eventEmitter.listenersMap.size).toBe(1);
      expect(eventEmitter.listenersMap.get('a').size).toBe(1);

      disposer2();
      expect(eventEmitter.listenersMap.size).toBe(0);
    });
  });
});
