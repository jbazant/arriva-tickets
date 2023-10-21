import { render } from '@testing-library/react-native';
import { Duration } from 'luxon';
import { CommonProvidersForTests } from '../../../../jest/CommonProvidersForTests';
import { CurrentDeparture } from './CurrentDeparture';

describe('CurrentDeparture', () => {
  const renderCurrentDeparture = (departureInterval: Duration) =>
    render(<CurrentDeparture departureInterval={departureInterval} />, {
      wrapper: CommonProvidersForTests,
    });

  it('should render departure in minutes for 20 minutes duration', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ minutes: 20 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjíždí za 20 min');
  });

  it('should render departure in minutes for 4 minutes duration', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ minutes: 4 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjíždí za 4 min');
  });

  it('should render departure in minutes for 1 minute duration', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ minutes: 1 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjíždí za 1 min');
  });

  it('should render departure in whole minutesd', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ minutes: 1.4 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjíždí za 1 min');
  });

  it('should render "right now" for 59 seconds duration', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ seconds: 29 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjíždí právě teď');
  });

  it('should render "departed" for negative intervals', () => {
    const { getByTestId } = renderCurrentDeparture(Duration.fromObject({ minutes: -1.4 }));

    expect(getByTestId('CurrentDeparture')).toHaveTextContent('Odjel před 1 min');
  });
});
