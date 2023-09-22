import { DateTime } from 'luxon';
import { Box, Text } from 'native-base';
import { TicketDataExt } from '../types';

type TicketProps = {
  ticketData: TicketDataExt;
};

export function Ticket({ ticketData }: TicketProps) {
  return (
    <Box bg={'white'} p={4} m={2} rounded={5}>
      <Text>{ticketData.from}</Text>
      <Text>{ticketData.to}</Text>
      <Text>{ticketData.departure.toLocaleString(DateTime.TIME_24_SIMPLE)}</Text>
      <Text>{ticketData.seat}</Text>
      <Text>{ticketData.code}</Text>
    </Box>
  );
}
