import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../../auth/components/LoginScreen';
import { AppNavigatorParamList } from '../types';
import { MainTabs } from './MainTabs';

const Stack = createStackNavigator<AppNavigatorParamList>();

export function RootStack() {
  const hasUser = false;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {hasUser ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
