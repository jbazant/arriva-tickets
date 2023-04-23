import { HStack } from 'native-base';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import React from 'react';

export function ListItemBase(props: IHStackProps) {
  return <HStack alignItems="center" justifyContent="space-between" space={4} {...props} />;
}
