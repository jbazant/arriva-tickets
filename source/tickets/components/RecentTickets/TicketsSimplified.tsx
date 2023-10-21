import React from 'react';
import { TicketDataExt } from '../../types';
import { TicketSimplified } from './TicketSimplified';

export type TicketsSimplifiedProps = {
  tickets: TicketDataExt[];
};

export const TicketsSimplified = ({ tickets }: TicketsSimplifiedProps) => {
  return (
    <>
      {tickets.map((ticket) => (
        <TicketSimplified ticket={ticket} key={ticket.ticketId} />
      ))}
    </>
  );
};
