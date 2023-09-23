import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Settings } from 'luxon';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BiletoApiProvider } from './source/bileto/components/BiletoApiProvider';
import { AppQueryClientProvider } from './source/common/components/AppQueryClientProvider';
import { UserProvider } from './source/auth/components/UserProvider';
import { config } from './source/config';
import { UserInfoProvider } from './source/info/components/UserInfoProvider';
import { RootStack } from './source/navigation/components/RootStack';
import { TicketsDataProvider } from './source/tickets/components/TicketsDataProvider';
import { theme } from './theme';

Settings.defaultLocale = config.locale;

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppQueryClientProvider>
          <UserProvider>
            <BiletoApiProvider>
              <UserInfoProvider>
                <TicketsDataProvider>
                  <NavigationContainer>
                    <RootStack />
                  </NavigationContainer>
                </TicketsDataProvider>
              </UserInfoProvider>
            </BiletoApiProvider>
          </UserProvider>
        </AppQueryClientProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
