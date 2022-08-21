import { useCallback, useState } from 'react';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { useAsyncEffect } from '../../common/hooks/useAsyncEffect';

export type UserDataJson = { username: string; password: string; token: string };

export type CurrentUserControls = {
  isFetching: boolean;
  persist: (userData: UserDataJson) => Promise<void>;
  clear: () => Promise<void>;
};

const STORED_ITEM_KEY = 'user';

export function useCurrentUser(): CurrentUserControls | (UserDataJson & CurrentUserControls) {
  const [isFetching, setFetching] = useState(true);
  const [userData, setUserData] = useState({});

  useAsyncEffect(
    async (getMounted) => {
      let parsedData;
      try {
        const userData = await getItemAsync(STORED_ITEM_KEY);
        parsedData = JSON.parse(userData);
      } catch (e) {
        // do nothing?
      }
      if (getMounted()) {
        if (parsedData) {
          setUserData(parsedData);
        }
        setFetching(false);
      }
    },
    undefined,
    [],
  );

  const persist = useCallback(async (userData: UserDataJson) => {
    const serializedData = JSON.stringify(userData);
    setUserData(userData);
    await setItemAsync(STORED_ITEM_KEY, serializedData);
  }, []);

  const clear = useCallback(async () => {
    setUserData({});
    await deleteItemAsync(STORED_ITEM_KEY);
  }, []);

  return { isFetching, persist, clear, ...userData };
}
