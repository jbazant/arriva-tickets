import { DateTime } from 'luxon';
import { TicketDataExt } from './types';

export function groupTicketsByDay(tickets: TicketDataExt[]): [DateTime, TicketDataExt[]][] {
  const ticketsMap = tickets.reduce((byDays, ticket) => {
    const day = ticket.departure.startOf('day').toISO();
    const ticketsAtDay = byDays.get(day);

    ticketsAtDay ? ticketsAtDay.push(ticket) : byDays.set(day, [ticket]);

    return byDays;
  }, new Map<string, TicketDataExt[]>());

  return [...ticketsMap.entries()].map(([day, tickets]) => [DateTime.fromISO(day), tickets]);
}

export function ticketEntriesToSections(entries: [DateTime, TicketDataExt[]][]) {
  return entries.map(([day, tickets]) => ({
    title: day.toLocaleString(DateTime.DATE_HUGE),
    data: tickets,
  }));
}
