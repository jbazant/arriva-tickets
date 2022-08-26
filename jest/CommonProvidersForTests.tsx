import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { UserDataContext } from '../source/auth/context/UserDataContext';

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

export function CommonProvidersForTests({ children }: { children?: React.ReactNode }) {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <UserDataContext.Provider value={userContext}>{children}</UserDataContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
