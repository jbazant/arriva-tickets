import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BiletoApiProvider } from './source/bileto/components/BiletoApiProvider';
import { AppQueryClientProvider } from './source/common/components/AppQueryClientProvider';
import { UserProvider } from './source/auth/components/UserProvider';
import { UserInfoProvider } from './source/info/components/UserInfoProvider';
import { RootStack } from './source/navigation/components/RootStack';
import { theme } from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppQueryClientProvider>
          <UserProvider>
            <BiletoApiProvider>
              <UserInfoProvider>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </UserInfoProvider>
            </BiletoApiProvider>
          </UserProvider>
        </AppQueryClientProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
