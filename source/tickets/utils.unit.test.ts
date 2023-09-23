import { DateTime } from 'luxon';
import { TicketDataExt } from './types';
import { groupTicketsByDay, ticketEntriesToSections } from './utils';

describe('utils', () => {
  const getTicket = (departure: string, arrival: string) => ({
    code: '123',
    seat: '1',
    from: 'Prague',
    to: 'Brno',
    ticketId: '1',
    orderId: '1',
    valid: true,
    departure: DateTime.fromISO(departure),
    arrival: DateTime.fromISO(arrival),
  });

  const getTicketEntries = (): [DateTime, TicketDataExt[]][] => [
    [
      DateTime.fromISO('2020-01-01T00:00:00.000+0100'),
      [
        getTicket('2020-01-01T10:00:00+0100', '2020-01-01T11:00:00+0100'),
        getTicket('2020-01-01T12:00:00+0100', '2020-01-01T13:00:00+0100'),
      ],
    ],
    [
      DateTime.fromISO('2020-01-02T00:00:00.000+0100'),
      [getTicket('2020-01-02T10:00:00+0100', '2020-01-02T11:00:00+0100')],
    ],
  ];

  describe('groupTicketsByDay', () => {
    it('should group tickets by days', () => {
      const ticketsData: TicketDataExt[] = [
        getTicket('2020-01-01T10:00:00+0100', '2020-01-01T11:00:00+0100'),
        getTicket('2020-01-01T12:00:00+0100', '2020-01-01T13:00:00+0100'),
        getTicket('2020-01-02T10:00:00+0100', '2020-01-02T11:00:00+0100'),
      ];

      expect(groupTicketsByDay(ticketsData)).toEqual(getTicketEntries());
    });
  });

  describe('ticketEntriesToSections', () => {
    it('should transform entries correctly', () => {
      expect(ticketEntriesToSections(getTicketEntries())).toEqual([
        {
          title: 'Wednesday, January 1, 2020',
          data: [
            getTicket('2020-01-01T10:00:00+0100', '2020-01-01T11:00:00+0100'),
            getTicket('2020-01-01T12:00:00+0100', '2020-01-01T13:00:00+0100'),
          ],
        },
        {
          title: 'Thursday, January 2, 2020',
          data: [getTicket('2020-01-02T10:00:00+0100', '2020-01-02T11:00:00+0100')],
        },
      ]);
    });
  });
});
