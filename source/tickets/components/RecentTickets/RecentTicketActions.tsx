import { Box, HStack, Icon, IconButton } from 'native-base';

export function RecentTicketActions() {
  return (
    <HStack space={4} justifyContent="space-around" bgColor="red">
      <Box>
        <IconButton
          m={3}
          icon={<Icon name="trash" color="textAlert" />}
          variant="outline"
          borderColor="white"
        />
      </Box>
      <Box>
        <IconButton
          m={3}
          icon={<Icon name="cw" color="white" />}
          variant="outline"
          borderColor="white"
        />
      </Box>
    </HStack>
  );
}
