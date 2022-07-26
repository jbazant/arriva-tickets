import { Center, Divider } from 'native-base';
import { Card } from '../../../common/components/Card';
import { TicketAgeEnum } from '../../types';
import { BigInfo } from './BigInfo';
import { Connection } from './Connection';
import { Departure } from './Departure';

export function RecentTicket() {
  const age = TicketAgeEnum.Teen;
  const from = 'Teplice, halelujah jedu pryc';
  const to = 'Praha, ahch jo';
  const countdown = 'final countdown';
  const seats = '42';
  const codes = 'ABC';
  const departure = '13:30';

  return (
    <Center flex={1}>
      <Card>
        <Connection from={from} to={to} />
        <Divider />
        <BigInfo age={age} label="Sedadlo" value={seats} />
        <BigInfo age={age} label="Kód" value={codes} />
        <Divider />
        <Departure age={age} countdown={countdown} departure={departure} />
      </Card>
    </Center>
  );
}
