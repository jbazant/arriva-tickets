import { UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';
import { TicketData } from '../../bileto/types';

export const TicketsDataContext = createContext<UseQueryResult<TicketData[]>>(null);
