import { Center, Text, useToken } from 'native-base';
import { TicketAgeEnum } from '../../types';

type DepartureProps = {
  age: TicketAgeEnum;
  countdown: string;
  departure: string;
};

export function Departure({ age, countdown, departure }: DepartureProps) {
  const [colorTeen, colorAdult, colorOther] = useToken('color', [
    'textWarn',
    'textAlert',
    'textDefault',
  ]);
  let color: string;
  switch (age) {
    case TicketAgeEnum.Adult:
      color = colorAdult;
      break;

    case TicketAgeEnum.Teen:
      color = colorTeen;
      break;

    default:
      color = colorOther;
  }

  return (
    <Center>
      <Text>Odjezd:</Text>
      <Text bold>dnes v {departure}</Text>
      {countdown && (
        <Text bold color={color}>
          {countdown}
        </Text>
      )}
    </Center>
  );
}
