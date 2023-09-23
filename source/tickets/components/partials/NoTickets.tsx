import { Center, Text } from 'native-base';
import { ScreenWrap } from '../../../common/components/ScreenWrap';

export function NoTickets() {
  return (
    <ScreenWrap>
      <Center>
        <Text textAlign="center" fontSize="lg" fontWeight="bold">
          Žádné jízdenky k zobrazení
        </Text>
      </Center>
    </ScreenWrap>
  );
}
