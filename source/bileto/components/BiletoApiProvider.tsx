import React, { useEffect } from 'react';
import { useCurrentUserContext } from '../../auth/hooks/useUserData';
import { config } from '../../config';
import { BiletoApiContext } from '../context/BiletoApiContext';
import { BiletoApi } from '../model/BiletoApi';

const biletoApi = new BiletoApi(config.api);

export type BiletoApiProviderProps = {
  children: React.ReactElement;
};

export function BiletoApiProvider({ children }: BiletoApiProviderProps) {
  const user = useCurrentUserContext();
  const maybeToken = user.hasUser ? user.token : null;

  useEffect(() => {
    biletoApi.setToken(maybeToken);
  }, [maybeToken]);

  return <BiletoApiContext.Provider value={biletoApi}>{children}</BiletoApiContext.Provider>;
}
