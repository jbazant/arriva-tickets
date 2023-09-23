import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useCurrentUserContext } from '../../auth/hooks/useUserData';
import { useBiletoApi } from '../../bileto/hooks/useBiletoApi';
import { UserInfoContext } from '../context/UserInfoContext';

export type InfoDataProviderProps = {
  children: React.ReactElement;
};

export const UserInfoProvider = ({ children }: InfoDataProviderProps) => {
  const userData = useCurrentUserContext();
  const biletoApi = useBiletoApi();
  const userInfoQueryResult = useQuery({
    queryKey: ['profile', userData],
    queryFn: () => (userData.hasUser ? biletoApi.loadUser() : null),
  });

  return (
    <UserInfoContext.Provider value={userInfoQueryResult}>{children}</UserInfoContext.Provider>
  );
};
