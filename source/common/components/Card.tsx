import { Center, ICenterProps } from 'native-base';

export function Card(props: ICenterProps) {
  return <Center bg="white" p={4} m={3} pt={5} rounded={15} shadow={5} {...props} />;
}
