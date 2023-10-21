import { renderHook } from '@testing-library/react-hooks';
import { createTicket } from '../../../jest/testUtils';
import { useRecentTickets } from './useRecentTickets';
import { type useTicketsData } from './useTickets';

let mockTicketsData: ReturnType<typeof useTicketsData>;

jest.mock('./useTickets', () => ({
  useTicketsData: () => mockTicketsData,
}));

describe('useRecentTickets', () => {
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
