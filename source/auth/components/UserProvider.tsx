import React from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { useCurrentUser } from '../hooks/useCurrentUser';

export type UserProviderProps = {
  children: React.ReactElement;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const userData = useCurrentUser();

  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};
