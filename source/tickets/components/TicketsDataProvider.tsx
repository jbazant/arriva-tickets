import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useBiletoApi } from '../../bileto/hooks/useBiletoApi';
import { useUserInfo } from '../../info/hooks/useUserInfo';
import { TicketsDataContext } from '../context/TicketsDataContext';

export type TicketsDataProviderProps = {
  children: React.ReactElement;
};

export const TicketsDataProvider = ({ children }: TicketsDataProviderProps) => {
  const bileto = useBiletoApi();
  const { data } = useUserInfo();

  const { userId } = data ?? {};
  const ticketsQueryResult = useQuery({
    queryKey: ['tickets', userId],
    queryFn: () => (userId ? bileto.loadTickets(userId) : null),
  });

  return (
    <TicketsDataContext.Provider value={ticketsQueryResult}>{children}</TicketsDataContext.Provider>
  );
};
