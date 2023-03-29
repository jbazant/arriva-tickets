import { useContext } from 'react';
import invariant from 'ts-invariant';
import { UserDataContext } from '../context/UserDataContext';
import { CurrentUserData, UserDataControls } from '../types/UserData';

export function useCurrentUserContext() {
  return useContext(UserDataContext);
}

export function useCurrentUserData(): CurrentUserData {
  const data = useCurrentUserContext();

  invariant(data?.hasUser, 'No user is logged in!');

  return data;
}

export function useUserControls(): UserDataControls & { hasUser: boolean } {
  const data = useCurrentUserContext();

  invariant(data, 'No userData initialized!');

  return data;
}
