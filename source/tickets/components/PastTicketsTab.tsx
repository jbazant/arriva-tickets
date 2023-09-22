import { SectionList } from 'native-base';
import { ScreenWrap } from '../../common/components/ScreenWrap';
import { usePastTickets } from '../hooks/usePastTickets';
import { DayRow } from './DayRow';
import { Ticket } from './Ticket';

export function PastTicketsTab() {
  const pastTickets = usePastTickets();

  return (
    <ScreenWrap>
      <SectionList
        sections={pastTickets}
        keyExtractor={(item) => item.ticketId}
        renderSectionHeader={({ section: { title } }) => <DayRow date={title} />}
        renderItem={({ item }) => <Ticket ticketData={item} />}
      />
    </ScreenWrap>
  );
}
