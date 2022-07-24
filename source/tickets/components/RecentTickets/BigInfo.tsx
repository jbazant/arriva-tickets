import { Center, Text, useToken } from 'native-base';
import { TicketAgeEnum } from '../../types';

type BigInfoProps = {
  age: TicketAgeEnum;
  label: string;
  value: string;
};

export function BigInfo({ age, label, value }: BigInfoProps) {
  const [colorTeen, colorAdult] = useToken('color', ['textImportant', 'textMuted']);
  return (
    <Center>
      <Text>{label}:</Text>
      <Text fontSize="3xl" bold color={age === TicketAgeEnum.Teen ? colorTeen : colorAdult}>
        {value}
      </Text>
    </Center>
  );
}
