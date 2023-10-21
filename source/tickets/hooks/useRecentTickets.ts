import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { TicketDataExt } from '../types';
import { useTicketsData } from './useTickets';

function filterRecentTickets(tickets: TicketDataExt[]): TicketDataExt[] {
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

export function useRecentTickets(): TicketDataExt[] {
  const tickets = useTicketsData();
  const [recentTickets, setRecentTickets] = useState<TicketDataExt[]>([]);

  useEffect(() => {
    setRecentTickets(filterRecentTickets(tickets));
    const interval = setInterval(() => setRecentTickets(filterRecentTickets(tickets)), 1e4);

    return () => clearInterval(interval);
  }, [tickets]);

  return recentTickets;
}
