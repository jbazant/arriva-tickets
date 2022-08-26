import { LoginScreen } from '../../auth/components/LoginScreen';
import { useUserControls } from '../../auth/hooks/useUserData';
import { ScreenWrap } from '../../common/components/ScreenWrap';
import { MainTabs } from './MainTabs';

export function RootStack() {
  const { hasUser, isFetching } = useUserControls();

  if (isFetching) {
    return <ScreenWrap />;
  }

  if (hasUser) {
    return <MainTabs />;
  }

  return <LoginScreen />;
}
