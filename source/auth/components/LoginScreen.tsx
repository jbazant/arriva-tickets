import { Box, Button, Center, Divider, Heading, Input, Text } from 'native-base';
import { Card } from '../../common/components/Card';
import { PasswordInput } from '../../common/components/PasswordInput';
import { ScreenWrap } from '../../common/components/ScreenWrap';

export function LoginScreen() {
  return (
    <ScreenWrap>
      <Center flex={1}>
        <Card>
          <Heading>Jízdenky Arriva</Heading>
          <Heading size="md">Neoficiální klient</Heading>
          <Divider />
          <Box>
            <Text mx={5}>Váš e-mail</Text>
            <Input />
          </Box>
          <Box>
            <Text mx={5}>Heslo</Text>
            <PasswordInput />
          </Box>
          <Button mt={5} mx={0} variant="solid" size="lg">
            Přihlásit
          </Button>
        </Card>
      </Center>
    </ScreenWrap>
  );
}
