import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoScreen } from './InfoScreen';

const Stack = createNativeStackNavigator();

export function InfoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
