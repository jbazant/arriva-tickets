import { useQuery } from '@tanstack/react-query';
import { Spinner, VStack } from 'native-base';
import React from 'react';
import { useBiletoApi } from '../../bileto/hooks/useBiletoApi';
import { FetchError } from '../../common/components/ListItem/FetchError';
import { UserInfoData } from './UserInfoData';

export function UserInfo() {
  const biletoApi = useBiletoApi();
  const { data, isLoadingError, refetch, isSuccess, isRefetching, isRefetchError } = useQuery({
    queryKey: ['profile'],
    queryFn: biletoApi.loadUser,
  });

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
