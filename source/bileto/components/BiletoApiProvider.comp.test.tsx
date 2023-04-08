import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
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

  it('should return null token on startup', async () => {
    const { result } = renderBiletoHook();
    await waitFor(() => expect(result.current.user.isFetching).toBe(false));

    expect(result.current.biletoApi.token).toBe(null);
  });

  it('should observe for user login', async () => {
    const { result } = renderBiletoHook();
    await waitFor(() => expect(result.current.user.isFetching).toBe(false));

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });

    expect(result.current.biletoApi.token).toBe('TOKEN');
  });

  it('should observe for user logout', async () => {
    const { result } = renderBiletoHook();
    await waitFor(() => expect(result.current.user.isFetching).toBe(false));

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });
    act(() => {
      result.current.user.clear();
    });

    expect(result.current.biletoApi.token).toBe(null);
  });

  it('should observe for token changes', async () => {
    const { result } = renderBiletoHook();
    await waitFor(() => expect(result.current.user.isFetching).toBe(false));

    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN', password: 'PASSWORD' });
    });
    act(() => {
      result.current.user.persist({ username: 'USERNAME', token: 'TOKEN2', password: 'PASSWORD' });
    });

    expect(result.current.biletoApi.token).toBe('TOKEN2');
  });
});
