import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { UserDataContext } from '../source/auth/context/UserDataContext';
import { BiletoApiProvider } from '../source/bileto/components/BiletoApiProvider';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const userContext = {
  hasUser: true,
  clear: jest.fn(),
  persist: jest.fn(),
  isFetching: false,
  password: 'PASS',
  username: 'USER',
  token: 'TOKEN',
};

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
        keepPreviousData: true,
      },
      mutations: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
}

type CommonProvidersForTestsProps = {
  children?: React.ReactElement;
  queryClient?: QueryClient;
};

export function CommonProvidersForTests({ children, queryClient }: CommonProvidersForTestsProps) {
  const [queryClientLocal] = useState(() => queryClient ?? getQueryClient());

  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <QueryClientProvider client={queryClientLocal}>
        <UserDataContext.Provider value={userContext}>
          <BiletoApiProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </BiletoApiProvider>
        </UserDataContext.Provider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
