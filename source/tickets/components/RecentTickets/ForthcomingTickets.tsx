import { DateTime } from 'luxon';
import { Center, Divider, Heading, Text } from 'native-base';
import React from 'react';
import { Card } from '../../../common/components/Card';
import { TicketDataExt } from '../../types';
import { Connection } from './Connection';

export type ForthcomingTicketsProps = {
  tickets: TicketDataExt[];
};

export const ForthcomingTickets = ({ tickets }: ForthcomingTicketsProps) => {
  const { departure, from, to } = tickets[0];
  return (
    <>
      <Center p={4} pt={10}>
        <Heading size="md" textAlign="center">
          Na dnešek nemáte zakoupenou žádnou jízdenku.
        </Heading>
      </Center>
      <Center>
        <Card>
          <Heading size="sm">Nejbližší jízdenka</Heading>
          <Divider />
          <Center>
            <Text>{departure.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</Text>
          </Center>
          <Divider />
          <Connection from={from} to={to} />
        </Card>
      </Center>
    </>
  );
};
