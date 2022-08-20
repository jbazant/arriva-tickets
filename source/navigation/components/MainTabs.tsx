import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../../theme';
import { InfoTab } from '../../info/components/InfoTab';
import { ProfileTab } from '../../profile/components/ProfileTab';
import { FutureTicketsTab } from '../../tickets/components/FutureTicketsTab';
import { PastTicketsTab } from '../../tickets/components/PastTicketsTab';
import { RecentTicketsTab } from '../../tickets/components/RecentTickets/RecentTicketsTab';
import { MainTabsParamList } from '../types';
import { TabIcon } from './TabIcon';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: COLORS.tabBarInactive,
        tabBarActiveTintColor: COLORS.white,
        tabBarStyle: {
          backgroundColor: COLORS.dark,
        },
      }}
    >
      <Tab.Screen
        name={'RecentTickets'}
        component={RecentTicketsTab}
        options={{
          tabBarIcon: (props) => <TabIcon name="stopwatch" {...props} />,
          tabBarLabel: 'Aktuální',
        }}
      />
      <Tab.Screen
        name={'FutureTickets'}
        component={FutureTicketsTab}
        options={{
          tabBarIcon: (props) => <TabIcon name="documents" {...props} />,
          tabBarLabel: 'Platné',
        }}
      />
      <Tab.Screen
        name={'PastTickets'}
        component={PastTicketsTab}
        options={{
          tabBarIcon: (props) => <TabIcon name="archive" {...props} />,
          tabBarLabel: 'Projeté',
        }}
      />
      <Tab.Screen
        name={'Info'}
        component={InfoTab}
        options={{
          tabBarIcon: (props) => <TabIcon name="info" {...props} />,
          tabBarLabel: 'Info',
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileTab}
        options={{
          tabBarIcon: (props) => <TabIcon name="user" {...props} />,
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}
