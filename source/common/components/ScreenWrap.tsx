import { Box, IBoxProps } from 'native-base';

export function ScreenWrap(props: IBoxProps) {
  return <Box safeArea flex={1} bg="main" {...props} />;
}
