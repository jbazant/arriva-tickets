import { Spinner, VStack } from 'native-base';
import React from 'react';
import { FetchError } from '../../common/components/ListItem/FetchError';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserInfoData } from './UserInfoData';

export function UserInfo() {
  const { data, isLoadingError, refetch, isSuccess, isRefetching, isRefetchError } = useUserInfo();

  return (
    <VStack alignSelf="stretch" mx={3}>
      {isLoadingError && <FetchError onPress={refetch} description="Chyba při načítání dat." />}
      {isRefetchError && !isRefetching && (
        <FetchError onPress={refetch} description="Chyba při aktualizaci dat." />
      )}
      {isRefetching && <Spinner size="sm" m={4} />}
      {!isLoadingError && <UserInfoData data={data} isLoaded={isSuccess} />}
    </VStack>
  );
}
