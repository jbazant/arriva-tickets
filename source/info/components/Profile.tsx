import { useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Heading } from 'native-base';
import { useCallback } from 'react';
import { useUserControls } from '../../auth/hooks/useUserData';
import { RoundedBox } from '../../common/components/RoundedBox';
import { UserInfo } from './UserInfo';

export function Profile() {
  const { clear } = useUserControls();
  const queryClient = useQueryClient();

  const clearCallback = useCallback(async () => {
    queryClient.clear();
    await clear();
  }, [clear, queryClient]);

  return (
    <RoundedBox alignItems="center" bgColor="white">
      <Heading>Účet</Heading>
      <Divider />
      <UserInfo />
      <Divider />
      <Button onPress={clearCallback} colorScheme="secondary" alignSelf="stretch">
        Odhlásit
      </Button>
    </RoundedBox>
  );
}
