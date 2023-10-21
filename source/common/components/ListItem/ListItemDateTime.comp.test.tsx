import { render } from '@testing-library/react-native';
import { DateTime } from 'luxon';
import { CommonProvidersForTests } from '../../../../jest/CommonProvidersForTests';
import { ListItemDateTime } from './ListItemDateTime';

describe('ListItemDateTime', () => {
  const renderListItem = (dateTime: DateTime) =>
    render(<ListItemDateTime leftText="LEFT_TEXT…}" dateTime={dateTime} />, {
      wrapper: CommonProvidersForTests,
    });

  beforeAll(() => {
    jest.useFakeTimers({
      now: new Date('2021-09-01T12:00:00'),
    });
  });

  it.each([
    ['2021-09-01T12:00:00', 'Dnes v 12:00'],
    ['2021-09-01T13:31:59', 'Dnes v 13:31'],
    ['2021-09-01T00:00:00', 'Dnes v 0:00'],
    ['2021-09-01T01:00:00', 'Dnes v 1:00'],
    ['2021-09-01T23:59:00', 'Dnes v 23:59'],
  ])('should display correct day for today dateTimes %#', (inputValue, expectedValue) => {
    const dateTime = DateTime.fromISO(inputValue);

    const { getByText } = renderListItem(dateTime);

    expect(getByText(expectedValue)).toBeTruthy();
  });

  it.each([
    ['2021-09-02T13:00:00', 'čt 2. 9. 2021 13:00'],
    ['2021-08-30T01:00:00', 'po 30. 8. 2021 1:00'],
  ])('should display full local date otherwise %#', (inputValue, expectedValue) => {
    const dateTime = DateTime.fromISO(inputValue);

    const { getByText } = renderListItem(dateTime);

    expect(getByText(expectedValue)).toBeTruthy();
  });
});
