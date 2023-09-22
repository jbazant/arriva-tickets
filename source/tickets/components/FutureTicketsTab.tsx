import { SectionList } from 'native-base';
import { ScreenWrap } from '../../common/components/ScreenWrap';
import { useFutureTickets } from '../hooks/useFutureTickets';
import { DayRow } from './DayRow';
import { Ticket } from './Ticket';

export function FutureTicketsTab() {
  const futureTickets = useFutureTickets();

  return (
    <ScreenWrap>
      <SectionList
        sections={futureTickets}
        keyExtractor={(item) => item.ticketId}
        renderSectionHeader={({ section: { title } }) => <DayRow date={title} />}
        renderItem={({ item }) => <Ticket ticketData={item} />}
      />
    </ScreenWrap>
  );
}
