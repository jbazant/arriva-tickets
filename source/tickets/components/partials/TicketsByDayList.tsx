import { SectionList } from 'native-base';
import { useTickets } from '../../hooks/useTickets';
import { TicketsByDay } from '../../types';
import { DayRow } from './DayRow';
import { NoTickets } from './NoTickets';
import { Ticket } from './Ticket';

type TicketsByDayListProps = {
  tickets: TicketsByDay;
  headerColor: string;
};

export function TicketsByDayList({ tickets, headerColor }: TicketsByDayListProps) {
  const { refetch, isRefetching } = useTickets();

  return (
    <SectionList
      sections={tickets}
      keyExtractor={(item) => item.ticketId}
      renderSectionHeader={({ section: { title } }) => <DayRow date={title} color={headerColor} />}
      renderItem={({ item }) => <Ticket ticketData={item} />}
      ListEmptyComponent={NoTickets}
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  );
}
