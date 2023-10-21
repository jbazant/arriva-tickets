import { Center, Divider, VStack } from 'native-base';
import React from 'react';
import { Card } from '../../../common/components/Card';
import { ListItemDateTime } from '../../../common/components/ListItem/ListItemDateTime';
import { TicketDataExt } from '../../types';
import { BigInfo, BigInfoProps } from './BigInfo';
import { Connection } from './Connection';
import { CurrentDeparture } from './CurrentDeparture';

export type TicketFullProps = {
  ticket: TicketDataExt;
};

export const TicketFull = ({ ticket }: TicketFullProps) => {
  const { departure, arrival, seat, code, from, to } = ticket;
  const departureDiff = departure.diffNow();
  const colorVariant: BigInfoProps['variant'] =
    departureDiff.as('seconds') < 0 ? 'departed' : 'basic';

  return (
    <Center>
      <Card>
        <Connection from={from} to={to} />
        <Divider />
        <BigInfo label="Sedadlo" value={seat} variant={colorVariant} />
        <BigInfo label="Kód" value={code} variant={colorVariant} />
        <Divider />
        <VStack>
          <ListItemDateTime leftText="Odjezd" dateTime={departure} />
          <ListItemDateTime leftText="Příjezd" dateTime={arrival} />
        </VStack>
        <Divider />
        <CurrentDeparture departureInterval={departureDiff} />
      </Card>
    </Center>
  );
};
