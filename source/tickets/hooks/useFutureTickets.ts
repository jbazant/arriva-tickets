import { DateTime } from 'luxon';
import { groupTicketsByDay, ticketEntriesToSections } from '../utils';
import { useTicketsData } from './useTickets';

export function useFutureTickets() {
  const now = DateTime.now();
  const tickets = useTicketsData();

  const futureTickets = tickets
    .filter((ticket) => ticket.departure.diff(now).as('minutes') >= 0)
    .sort((a, b) => (a.departure.diff(b.departure).valueOf() >= 0 ? 1 : -1));

  const groupedFutureTickets = groupTicketsByDay(futureTickets);
  return ticketEntriesToSections(groupedFutureTickets);
}
