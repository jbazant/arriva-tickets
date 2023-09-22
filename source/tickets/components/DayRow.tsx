import { Heading } from 'native-base';

type DayRowProps = {
  date: string;
};
export function DayRow({ date }: DayRowProps) {
  return <Heading>{date}</Heading>;
}
