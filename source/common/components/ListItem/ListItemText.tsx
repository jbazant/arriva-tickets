import { Skeleton, Text } from 'native-base';
import React from 'react';
import { ListItemBase } from './ListItemBase';

export type ListItemProps = {
  isLoaded?: boolean;
  skeletonWidth?: number | string;
  leftText: string;
  rightText?: string;
};

export function ListItemText({
  leftText,
  rightText,
  isLoaded = true,
  skeletonWidth = '30%',
}: ListItemProps) {
  return (
    <ListItemBase h={8}>
      <Text>{leftText}:</Text>
      <Skeleton isLoaded={isLoaded} h={5} w={skeletonWidth}>
        <Text fontWeight="medium">{rightText}</Text>
      </Skeleton>
    </ListItemBase>
  );
}
