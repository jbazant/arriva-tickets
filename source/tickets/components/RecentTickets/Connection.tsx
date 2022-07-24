import { Center, Icon, Text } from 'native-base';

type ConnectionProps = {
  from: string;
  to: string;
};

export function Connection({ from, to }: ConnectionProps) {
  return (
    <Center>
      <Text>Spoj:</Text>
      <Text bold>{from}</Text>
      <Icon name="arrow-long-down" />
      <Text bold>{to}</Text>
    </Center>
  );
}
