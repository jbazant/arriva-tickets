import { act, renderHook } from '@testing-library/react-hooks';
import * as SecureStore from 'expo-secure-store';
import { useCurrentUser } from './useCurrentUser';
import Mock = jest.Mock;

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve()),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

describe('useCurrentuser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('data loading', () => {
    it('should load data from securestore on mount', () => {
      renderHook(useCurrentUser);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('user');
    });

    it('should return fetching state on mount', () => {
      const {
        result: { current },
      } = renderHook(useCurrentUser);

      expect(current).toStrictEqual({
        isFetching: true,
        persist: expect.any(Function),
        clear: expect.any(Function),
      });
    });

    it('should return user data once getItemAsync is resolved', async () => {
      (SecureStore.getItemAsync as Mock).mockResolvedValueOnce(
        '{"username":"USERNAME","password":"PASSWORD","token":"TOKEN"}',
      );
      const { waitForNextUpdate, result } = renderHook(useCurrentUser);
      await waitForNextUpdate();

      expect(result.current).toStrictEqual({
        isFetching: false,
        persist: expect.any(Function),
        clear: expect.any(Function),
        username: 'USERNAME',
        password: 'PASSWORD',
        token: 'TOKEN',
      });
    });

    it('should recover from data loading error', async () => {
      (SecureStore.getItemAsync as Mock).mockResolvedValueOnce({ not: 'json' });
      const { waitForNextUpdate, result } = renderHook(useCurrentUser);
      await waitForNextUpdate();

      expect(result.current).toStrictEqual({
        isFetching: false,
        persist: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });

  describe('data saving', () => {
    let hookResult;

    beforeEach(async () => {
      const { result, waitForNextUpdate } = renderHook(useCurrentUser);
      hookResult = result;
      await waitForNextUpdate();
    });

    it('should try to persist given json', () => {
      act(() => {
        hookResult.current.persist({
          username: 'USERNAME',
          password: 'PASSWORD',
          token: 'TOKEN',
        });
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'user',
        '{"username":"USERNAME","password":"PASSWORD","token":"TOKEN"}',
      );
    });

    it('should return persisted data immediately', () => {
      act(() => {
        hookResult.current.persist({
          username: 'USERNAME',
          password: 'PASSWORD',
          token: 'TOKEN',
        });
      });

      expect(hookResult.current).toStrictEqual({
        isFetching: false,
        persist: expect.any(Function),
        clear: expect.any(Function),
        username: 'USERNAME',
        password: 'PASSWORD',
        token: 'TOKEN',
      });
    });
  });

  describe('data clear', () => {
    let hookResult;

    beforeEach(async () => {
      const { result, waitForNextUpdate } = renderHook(useCurrentUser);
      hookResult = result;
      await waitForNextUpdate();
    });

    it('should try to clear data', () => {
      act(() => {
        hookResult.current.clear();
      });

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('user');
    });

    it('should return persisted data immediately', () => {
      act(() => {
        hookResult.current.clear();
      });

      expect(hookResult.current).toStrictEqual({
        isFetching: false,
        persist: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });
});
