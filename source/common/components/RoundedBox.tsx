import { Box, IBoxProps } from 'native-base';
import React from 'react';

export function RoundedBox(props: IBoxProps) {
  return <Box bg="white" p={4} m={3} pt={5} rounded={15} {...props} />;
}
