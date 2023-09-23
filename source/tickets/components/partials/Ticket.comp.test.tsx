import { render } from '@testing-library/react-native';
import { DateTime } from 'luxon';
import { CommonProvidersForTests } from '../../../../jest/CommonProvidersForTests';
import { TicketDataExt } from '../../types';
import { Ticket } from './Ticket';

describe('Ticket', () => {
  it('should render correct ticket values', () => {
    const ticketData: TicketDataExt = {
      departure: DateTime.fromISO('2021-01-01T12:00:00'),
      arrival: DateTime.fromISO('2021-01-01T13:00:00'),
      to: 'Moscow',
      from: 'London',
      seat: '10',
      code: 'KEY',
      ticketId: 'TICKET_ID',
      valid: true,
      orderId: 'ORDER_ID',
    };

    const { getByText } = render(<Ticket ticketData={ticketData} />, {
      wrapper: CommonProvidersForTests,
    });

    expect(getByText('Moscow')).toBeTruthy();
    expect(getByText('London')).toBeTruthy();
    expect(getByText('12:00')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('KEY')).toBeTruthy();
  });
});
