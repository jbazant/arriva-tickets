import { DateTime } from 'luxon';
import { useRecentTickets } from '../../hooks/useRecentTickets';
import { NoTickets } from '../partials/NoTickets';
import { TicketsFull } from './TicketsFull';
import { TicketsSimplified } from './TicketsSimplified';
import { ForthcomingTickets } from './ForthcomingTickets';

export function RecentTicket() {
  const recentTickets = useRecentTickets();

  if (recentTickets.length === 0) {
    return <NoTickets />;
  }

  const { departure } = recentTickets[0];
  const minutes = departure.diffNow().as('minutes');

  if (minutes > 120) {
    return departure.day !== DateTime.now().day ? (
      <ForthcomingTickets tickets={recentTickets} />
    ) : (
      <TicketsSimplified tickets={recentTickets} />
    );
  }

  return <TicketsFull tickets={recentTickets} />;
}
