import React from 'react';
import { TicketDataExt } from '../../types';
import { TicketFull } from './TicketFull';

export type TicketsFullProps = {
  tickets: TicketDataExt[];
};

export const TicketsFull = ({ tickets }: TicketsFullProps) => {
  return (
    <>
      {tickets.map((ticket) => (
        <TicketFull ticket={ticket} key={ticket.ticketId} />
      ))}
    </>
  );
};
