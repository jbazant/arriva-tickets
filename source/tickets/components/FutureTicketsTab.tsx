import { ScreenWrap } from '../../common/components/ScreenWrap';
import { useFutureTickets } from '../hooks/useFutureTickets';
import { TicketsByDayList } from './partials/TicketsByDayList';

export function FutureTicketsTab() {
  const futureTickets = useFutureTickets();

  return (
    <ScreenWrap>
      <TicketsByDayList tickets={futureTickets} headerColor="textEmphatized" />
    </ScreenWrap>
  );
}
