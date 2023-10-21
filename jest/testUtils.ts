import { DateTime } from 'luxon';
import nock from 'nock';
import { config } from '../source/config';
import { TicketDataExt } from '../source/tickets/types';

export const nockToBileto = (options?: nock.Options) => nock(config.api.baseUrl, options);

export const createTicket = (departure: string, otherProps: Partial<TicketDataExt> = {}) => ({
  departure: DateTime.fromISO(departure),
  arrival: DateTime.fromISO(departure).plus({ hours: 1 }),
  seat: '10',
  from: 'Praha',
  to: 'Brno',
  ticketId: '1',
  orderId: '1',
  valid: true,
  code: 'AAA',
  ...otherProps,
});
