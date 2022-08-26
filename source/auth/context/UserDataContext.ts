import { createContext } from 'react';
import { CurrentUserData, NoUserData } from '../types/UserData';

export const UserDataContext = createContext<NoUserData | CurrentUserData | null>(null);
