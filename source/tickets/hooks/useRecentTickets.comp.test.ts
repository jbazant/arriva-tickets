import { renderHook } from '@testing-library/react-hooks';
import { DateTime } from 'luxon';
import { useRecentTickets } from './useRecentTickets';
import { type useTicketsData } from './useTickets';

let mockTicketsData: ReturnType<typeof useTicketsData>;

jest.mock('./useTickets', () => ({
  useTicketsData: () => mockTicketsData,
}));

describe('useRecentTickets', () => {
  const createTicket = (departure: string, seat = '1') => ({
    departure: DateTime.fromISO(departure),
    arrival: DateTime.fromISO(departure).plus({ hours: 1 }),
    seat,
    from: 'Praha',
    to: 'Brno',
    ticketId: '1',
    orderId: '1',
    valid: true,
    code: 'AAA',
  });

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-11T12:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return only most recent ticket', () => {
    mockTicketsData = [
      createTicket('2020-01-10T10:00:00'),
      createTicket('2020-01-10T11:00:00'),
      createTicket('2020-01-11T12:30:00'),
      createTicket('2020-01-11T13:00:00'),
    ];

    const { result } = renderHook(() => useRecentTickets());

    expect(result.current).toEqual([createTicket('2020-01-11T12:30:00')]);
  });

  it('should return all most recent tickets', () => {
    mockTicketsData = [
      createTicket('2020-01-11T13:00:00'),
      createTicket('2020-01-10T11:00:00'),
      createTicket('2020-01-11T12:30:00'),
      createTicket('2020-01-10T10:00:00'),
      createTicket('2020-01-11T12:30:00'),
    ];

    const { result } = renderHook(() => useRecentTickets());

    expect(result.current).toEqual([
      createTicket('2020-01-11T12:30:00'),
      createTicket('2020-01-11T12:30:00'),
    ]);
  });

  it('should return empty array if there are no tickets', () => {
    mockTicketsData = [];

    const { result } = renderHook(() => useRecentTickets());

    expect(result.current).toEqual([]);
  });

  it('should return tickets up to ten minutes from the past', () => {
    mockTicketsData = [
      createTicket('2020-01-11T11:50:00'),
      createTicket('2020-01-11T11:49:59'),
      createTicket('2020-01-11T12:00:00'),
      createTicket('2020-01-11T12:00:01'),
      createTicket('2020-01-11T12:10:00'),
    ];

    const { result } = renderHook(() => useRecentTickets());

    expect(result.current).toEqual([createTicket('2020-01-11T11:50:00')]);
  });
});
