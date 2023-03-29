import { renderHook, act } from '@testing-library/react-hooks';
import { useContext } from 'react';
import { UserProvider } from '../../auth/components/UserProvider';
import { useUserControls } from '../../auth/hooks/useUserData';
import { BiletoApiContext } from '../context/BiletoApiContext';
import { BiletoApi } from '../model/BiletoApi';
import { BiletoApiProvider } from './BiletoApiProvider';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve()),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));
describe('BiletoApiProvider', () => {
  const renderBiletoHook = () =>
    renderHook(
      () => {
        const user = useUserControls();
        const biletoApi = useContext<BiletoApi>(BiletoApiContext);
        return { biletoApi, user };
      },
      {
        wrapper: ({ children }: { children: React.ReactElement }) => (
          <UserProvider>
            <BiletoApiProvider>{children}</BiletoApiProvider>
          </UserProvider>
        ),
      },
    );

  it('should retun null token on startup', () => {
    const { result } = renderBiletoHook();

    expect(result.current.biletoApi.token).toBe(null);
  });

  it('should observe for user login', async () => {
    const { result } = renderBiletoHook();

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });

    expect(result.current.biletoApi.token).toBe('TOKEN');
  });

  it('should observe for user logout', () => {
    const { result } = renderBiletoHook();

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });
    act(() => {
      result.current.user.clear();
    });

    expect(result.current.biletoApi.token).toBe(null);
  });

  it('should observe for token changes', () => {
    const { result } = renderBiletoHook();

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });
    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN2', password: 'PASSWORD' });
    });

    expect(result.current.biletoApi.token).toBe('TOKEN2');
  });
});
