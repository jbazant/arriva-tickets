import { UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';
import { UserInfoResult } from '../../bileto/types';

export const UserInfoContext = createContext<UseQueryResult<UserInfoResult>>(null);
