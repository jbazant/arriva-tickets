import { Center, Divider, VStack } from 'native-base';
import React from 'react';
import { Card } from '../../../common/components/Card';
import { ListItemDateTime } from '../../../common/components/ListItem/ListItemDateTime';
import { ListItemText } from '../../../common/components/ListItem/ListItemText';
import { TicketDataExt } from '../../types';
import { Connection } from './Connection';

export type TicketSimplifiedProps = {
  ticket: TicketDataExt;
};

export const TicketSimplified = ({ ticket }: TicketSimplifiedProps) => {
  const { from, to, departure, arrival, seat } = ticket;

  return (
    <Center>
      <Card alignItems="stretch">
        <Connection from={from} to={to} />
        <Divider />
        <VStack>
          <ListItemDateTime leftText="Odjezd" dateTime={departure} />
          <ListItemDateTime leftText="Příjezd" dateTime={arrival} />
          <ListItemText leftText="Sedadlo" rightText={seat} />
        </VStack>
      </Card>
    </Center>
  );
};
