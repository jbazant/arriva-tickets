import { ScreenWrap } from '../../common/components/ScreenWrap';
import { usePastTickets } from '../hooks/usePastTickets';
import { TicketsByDayList } from './partials/TicketsByDayList';

export function PastTicketsTab() {
  const pastTickets = usePastTickets();

  return (
    <ScreenWrap>
      <TicketsByDayList tickets={pastTickets} headerColor="dark" />
    </ScreenWrap>
  );
}
