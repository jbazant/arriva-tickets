import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './source/auth/components/UserProvider';
import { RootStack } from './source/navigation/components/RootStack';
import { theme } from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <UserProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </UserProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
