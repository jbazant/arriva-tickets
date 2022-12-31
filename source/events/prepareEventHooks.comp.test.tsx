import { renderHook } from '@testing-library/react-hooks';
import { prepareEventHooks } from './prepareEventHooks';

type Events = {
  eventA: [string];
};
describe('prepareEventHooks', () => {
  describe('useListenerEffect', () => {
    it('should subscribe to events', () => {
      const listener = jest.fn();
      const { useListenerEffect, eventEmitter } = prepareEventHooks<Events>();

      const { unmount } = renderHook(() => useListenerEffect('eventA', listener, []));
      eventEmitter.emit('eventA', 'DATA');
      unmount();

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith('DATA');
    });

    it('should remove listener on unmount', () => {
      const listener = jest.fn();
      const { useListenerEffect, eventEmitter } = prepareEventHooks<Events>();

      const { unmount } = renderHook(() => useListenerEffect('eventA', listener, []));
      unmount();
      eventEmitter.emit('eventA', 'DATA');

      expect(listener).toHaveBeenCalledTimes(0);
    });
  });

  describe('useEmitEvent', () => {
    it('should return emit function', () => {
      const listener = jest.fn();
      const { useEmitEvent, eventEmitter } = prepareEventHooks<Events>();
      eventEmitter.addListener('eventA', listener);

      const { unmount, result } = renderHook(() => useEmitEvent('eventA'));
      result.current('DATA');
      unmount();

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith('DATA');
    });
  });
});
