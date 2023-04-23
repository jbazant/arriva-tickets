import { Entypo } from '@expo/vector-icons';
import { Icon, IconButton, Text } from 'native-base';
import React from 'react';
import { ListItemBase } from './ListItemBase';

export type FetchErrorProps = {
  onPress: () => any;
  description: string;
};

export function FetchError({ description, onPress }: FetchErrorProps) {
  return (
    <ListItemBase>
      <Text bold color="secondary.500">
        {description}
      </Text>
      <IconButton
        variant="outline"
        size="xs"
        onPress={() => onPress()}
        mx={0}
        alignSelf="center"
        icon={<Icon as={Entypo} name="cycle" />}
        accessibilityLabel="Opakovat"
      />
    </ListItemBase>
  );
}
