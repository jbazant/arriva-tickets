import { DateTime } from 'luxon';
import { useContext } from 'react';
import { TicketsDataContext } from '../context/TicketsDataContext';
import { TicketDataExt } from '../types';

export function useTickets() {
  return useContext(TicketsDataContext);
}

export function useTicketsData(): TicketDataExt[] {
  const tickets = useTickets();

  if (!tickets?.data) {
    return [];
  }

  return tickets.data.map((ticket) => ({
    ...ticket,
    departure: DateTime.fromISO(ticket.departure),
    arrival: DateTime.fromISO(ticket.arrival),
  }));
}
