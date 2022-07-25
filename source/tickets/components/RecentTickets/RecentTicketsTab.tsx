import { ScreenWrap } from '../../../common/components/ScreenWrap';
import { RecentTicket } from './RecentTicket';
import { RecentTicketActions } from './RecentTicketActions';

export function RecentTicketsTab() {
  return (
    <ScreenWrap>
      <RecentTicketActions />
      <RecentTicket />
    </ScreenWrap>
  );
}
