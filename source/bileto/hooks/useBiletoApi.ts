import { useContext } from 'react';
import { BiletoApiContext } from '../context/BiletoApiContext';

export function useBiletoApi() {
  return useContext(BiletoApiContext);
}
