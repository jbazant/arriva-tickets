import { Button, Center, Text } from 'native-base';
import { ScreenWrap } from '../../../common/components/ScreenWrap';
import { useTickets } from '../../hooks/useTickets';

export function NoTickets() {
  const { refetch, isRefetching } = useTickets();

  return (
    <ScreenWrap>
      <Center>
        <Text textAlign="center" fontSize="lg" fontWeight="bold">
          Žádné jízdenky k zobrazení
        </Text>
        <Button
          mt={4}
          onPress={() => refetch()}
          isLoading={isRefetching}
          isLoadingText="Aktualizuji..."
        >
          Aktualizovat
        </Button>
      </Center>
    </ScreenWrap>
  );
}
