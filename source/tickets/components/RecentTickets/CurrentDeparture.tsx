import { Duration } from 'luxon';
import { Text, useToken } from 'native-base';
import React from 'react';

type CurrentDepartureProps = {
  departureInterval: Duration;
};

function useDepartureText(departureInterval: Duration) {
  const minutes = Math.round(departureInterval.as('minutes'));
  // TODO See https://github.com/moment/luxon/issues/1189
  // const departureInMinLocalized = departureInterval.toHuman({unit: 'minutes', maximumFractionDigits: 0, signDisplay: 'never' })}

  if (minutes >= 1) {
    return `Odjíždí za ${minutes} min`;
  }

  if (minutes === 0) {
    return 'Odjíždí právě teď';
  }

  return `Odjel před ${-minutes} min`;
}

function useDepartureColor(departureInterval: Duration) {
  const [colorDefault, colorWarn, colorAlert] = useToken('color', [
    'textDefault',
    'textWarn',
    'textAlert',
  ]);
  const seconds = departureInterval.as('seconds');

  if (seconds >= 300) {
    return colorDefault;
  }

  if (seconds >= 0) {
    return colorWarn;
  }

  return colorAlert;
}

export function CurrentDeparture({ departureInterval }: CurrentDepartureProps) {
  const color = useDepartureColor(departureInterval);
  const text = useDepartureText(departureInterval);

  return (
    <Text bold color={color} testID="CurrentDeparture">
      {text}
    </Text>
  );
}
