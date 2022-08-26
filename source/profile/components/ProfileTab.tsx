import { Box, Button, Center, Heading, Text } from 'native-base';
import { useCurrentUserData } from '../../auth/hooks/useUserData';
import { Card } from '../../common/components/Card';
import { ScreenWrap } from '../../common/components/ScreenWrap';

export function ProfileTab() {
  const { username, clear } = useCurrentUserData();
  return (
    <ScreenWrap>
      <Center flex={1}>
        <Box alignSelf="stretch" alignItems="stretch">
          <Card alignItems="center">
            <Heading>Profil</Heading>
            <Text>Přihlášen jako: {username}</Text>
            <Button onPress={clear}>Odhlásit</Button>
          </Card>
        </Box>
      </Center>
    </ScreenWrap>
  );
}
