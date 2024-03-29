import { Box, Icon, Text } from 'native-base';

type TicketRowProps = {
  icon: string;
  text: string;
};

export function TicketRow({ icon, text }: TicketRowProps) {
  return (
    // @ts-ignore
    <Box flexDirection="row" justifyContent="flex-start" gap={1}>
      <Icon name={icon} />
      <Text>{text}</Text>
    </Box>
  );
}
