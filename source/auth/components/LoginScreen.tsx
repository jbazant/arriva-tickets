import { Center, Divider, Heading } from 'native-base';
import { Card } from '../../common/components/Card';
import { ScreenWrap } from '../../common/components/ScreenWrap';
import { LoginForm } from './LoginForm';

export function LoginScreen() {
  return (
    <ScreenWrap>
      <Center flex={1}>
        <Card alignItems="center">
          <Heading>Jízdenky Arriva</Heading>
          <Heading size="md">Neoficiální klient</Heading>
          <Divider />
          <LoginForm />
        </Card>
      </Center>
    </ScreenWrap>
  );
}
