import { DateTime } from 'luxon';
import { TicketDataExt } from '../types';
import { useTicketsData } from './useTickets';

export function useRecentTickets(): TicketDataExt[] {
  const tickets = useTicketsData();
  const from = DateTime.now().minus({ minutes: 10 });

  return tickets.reduce((acc, ticket) => {
    if (ticket.departure.diff(from).as('seconds') < 0) {
      return acc;
    }

    if (!acc.length) {
      return [ticket];
    }

    const timeDiff = ticket.departure.diff(acc[0].departure).as('seconds');
    if (timeDiff < 0) {
      return [ticket];
    }

    if (timeDiff === 0) {
      acc.push(ticket);
    }

    return acc;
  }, [] as typeof tickets);
}
