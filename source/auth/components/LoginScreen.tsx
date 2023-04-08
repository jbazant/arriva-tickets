import { Center, Divider, Heading, KeyboardAvoidingView } from 'native-base';
import { Card } from '../../common/components/Card';
import { ScreenWrap } from '../../common/components/ScreenWrap';
import { LoginForm } from './LoginForm';

export function LoginScreen() {
  return (
    <ScreenWrap>
      <KeyboardAvoidingView>
        <Card alignItems="center" mt={20}>
          <Heading>Jízdenky Arriva</Heading>
          <Heading size="md">Neoficiální klient</Heading>
          <Divider />
          <LoginForm />
        </Card>
      </KeyboardAvoidingView>
    </ScreenWrap>
  );
}
