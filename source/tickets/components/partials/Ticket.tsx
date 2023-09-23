import { DateTime } from 'luxon';
import { Box } from 'native-base';
import { TicketDataExt } from '../../types';
import { TicketRow } from './TicketRow';

type TicketProps = {
  ticketData: TicketDataExt;
};

export function Ticket({ ticketData }: TicketProps) {
  const { departure, to, from, seat, code } = ticketData;

  return (
    <Box
      bg={'white'}
      p={4}
      m={1}
      mt={0}
      rounded={4}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box>
        <TicketRow icon="aircraft-take-off" text={from} />
        <TicketRow icon="arrow-down" text="" />
        <TicketRow icon="aircraft-landing" text={to} />
      </Box>
      <Box textAlign={'right'}>
        <TicketRow icon="clock" text={departure.toLocaleString(DateTime.TIME_24_SIMPLE)} />
        <TicketRow icon="ticket" text={seat} />
        <TicketRow icon="key" text={code} />
      </Box>
    </Box>
  );
}
