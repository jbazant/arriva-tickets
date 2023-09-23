import { Box, IBoxProps } from 'native-base';

export function ScreenWrap(props: IBoxProps) {
  return <Box safeAreaX safeAreaTop flex={1} bg="main" {...props} />;
}
