import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { useCallback, useState } from 'react';
import { useAsyncEffect } from '../../common/hooks/useAsyncEffect';
import { CurrentUserData, NoUserData, UserDataJson } from '../types/UserData';

const STORED_ITEM_KEY = 'user';

function hasUserData(data: Record<string, any>): data is UserDataJson {
  return 'token' in data;
}

export function useCurrentUser(): NoUserData | CurrentUserData {
  const [isFetching, setFetching] = useState(true);
  const [userData, setUserData] = useState<UserDataJson | Record<string, never>>({});

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

  if (hasUserData(userData)) {
    return { isFetching, persist, clear, hasUser: true, ...userData };
  }

  return { isFetching, persist, clear, hasUser: false };
}
