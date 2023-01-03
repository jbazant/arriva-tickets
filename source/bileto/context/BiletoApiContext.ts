import { createContext } from 'react';
import { BiletoApi } from '../model/BiletoApi';

export const BiletoApiContext = createContext<BiletoApi>(null);
