import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export function CommonProvidersForTests({ children }: { children?: React.ReactNode }) {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider>
  );
}
