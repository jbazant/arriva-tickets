import { Center, Heading } from 'native-base';

type DayRowProps = {
  date: string;
  color: string;
};

export function DayRow({ date, color }: DayRowProps) {
  return (
    <Center bg={color} p={0} m={1} mt={2} mb={1} rounded={4} shadow={5}>
      <Heading size="sm" color="textLight">
        {date}
      </Heading>
    </Center>
  );
}
