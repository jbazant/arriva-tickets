import { useContext } from 'react';
import invariant from 'ts-invariant';
import { UserInfoContext } from '../context/UserInfoContext';

export function useUserInfo() {
  const userInfo = useContext(UserInfoContext);
  invariant(userInfo, 'No user info provided');

  return userInfo;
}
