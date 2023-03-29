import { Box, Center, Heading, Text } from 'native-base';
import { Card } from '../../common/components/Card';
import { ScreenWrap } from '../../common/components/ScreenWrap';

export function FutureTicketsTab() {
  return (
    <ScreenWrap>
      <Center flex={1}>
        <Box alignSelf="stretch" alignItems="stretch">
          <Card alignItems="center">
            <Heading>Platné jízdenky</Heading>
            <Text>TBD</Text>
          </Card>
        </Box>
      </Center>
    </ScreenWrap>
  );
}
