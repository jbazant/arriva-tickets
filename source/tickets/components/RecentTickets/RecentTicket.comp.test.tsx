import { render } from '@testing-library/react-native';
import { DateTime } from 'luxon';
import { CommonProvidersForTests } from '../../../../jest/CommonProvidersForTests';
import { createTicket } from '../../../../jest/testUtils';
import { TicketDataExt } from '../../types';
import { RecentTicket } from './RecentTicket';

let mockTickets: TicketDataExt[];

jest.mock('../../hooks/useTickets', () => ({
  useTickets: () => ({
    refetch: jest.fn(),
    isRefetching: false,
    data: mockTickets,
  }),
  useTicketsData: () => mockTickets,
}));

describe('RecentTicket', () => {
  const renderRecentTicket = () => render(<RecentTicket />, { wrapper: CommonProvidersForTests });

  beforeAll(() => {
    jest.useFakeTimers({
      now: new Date('2021-09-01T12:00:00.000Z'),
    });
  });

  it('should display No tickets info when no available tickets', () => {
    mockTickets = [];

    const { getByText } = renderRecentTicket();

    expect(getByText('Žádné jízdenky k zobrazení')).toBeTruthy();
    expect(getByText('Aktualizovat')).toBeTruthy();
  });

  it('should display no tickets for today info', () => {
    mockTickets = [createTicket('2021-09-02T11:00:00')];

    const { getByText } = renderRecentTicket();

    expect(getByText('Na dnešek nemáte zakoupenou žádnou jízdenku.')).toBeTruthy();
    expect(getByText('Nejbližší jízdenka')).toBeTruthy();
    expect(getByText('čt 2. 9. 2021 11:00')).toBeTruthy();
    expect(getByText('Brno')).toBeTruthy();
    expect(getByText('Praha')).toBeTruthy();
  });

  it('should display simplified version of ticket for tickets 120+ minutes in future', () => {
    mockTickets = [createTicket('2021-09-01T23:00:00')];

    const { getByText } = renderRecentTicket();

    expect(getByText('Brno')).toBeTruthy();
    expect(getByText('Praha')).toBeTruthy();

    expect(getByText('Odjezd:')).toBeTruthy();
    expect(getByText('Dnes v 23:00')).toBeTruthy();
    expect(getByText('Příjezd:')).toBeTruthy();
    expect(getByText('čt 2. 9. 2021 0:00')).toBeTruthy();

    expect(getByText('Sedadlo:')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });

  it('should display simplified time of arrival', () => {
    mockTickets = [
      createTicket('2021-09-01T23:00:00', { arrival: DateTime.fromISO('2021-09-01T23:30:00') }),
    ];

    const { getByText } = renderRecentTicket();

    expect(getByText('Dnes v 23:00')).toBeTruthy();
    expect(getByText('Dnes v 23:30')).toBeTruthy();
  });

  it('should display all tickets', () => {
    mockTickets = [
      createTicket('2021-09-01T23:00:00'),
      createTicket('2021-09-01T23:00:00', { from: 'Ostrava', to: 'Liberec', seat: '20' }),
    ];

    const { getByText, getAllByText } = renderRecentTicket();

    expect(getAllByText('Sedadlo:').length).toBe(2);
    expect(getAllByText('Odjezd:').length).toBe(2);
    expect(getAllByText('Dnes v 23:00').length).toBe(2);

    expect(getByText('Brno')).toBeTruthy();
    expect(getByText('Praha')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();

    expect(getByText('Ostrava')).toBeTruthy();
    expect(getByText('Liberec')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });
});
