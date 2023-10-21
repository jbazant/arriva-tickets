import { act } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import { CommonProvidersForTests } from '../../../jest/CommonProvidersForTests';
import { nockToBileto } from '../../../jest/testUtils';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  const renderComponent = () => render(<UserInfo />, { wrapper: CommonProvidersForTests });

  // eslint-disable-next-line jest/expect-expect
  it('should render labels immediately', async () => {
    const scope = nockToBileto().get('/users/current').reply(200, {
      Id: 'USER_ID',
      Email: 'joe.doe@example.com',
      Firstname: 'FIRSTNAME',
      Lastname: 'LASTNAME',
      CreditBalance: '111',
    });
    const { getByText, findByText } = renderComponent();

    expect(getByText('E-mail:')).toBeTruthy();
    expect(getByText('Jméno:')).toBeTruthy();
    expect(getByText('Kredity:')).toBeTruthy();

    await findByText('joe.doe@example.com');
    scope.done();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should display values when requests resolves', async () => {
    const scope = nockToBileto().get('/users/current').reply(200, {
      Id: 'USER_ID',
      Email: 'joe.doe@example.com',
      Firstname: 'FIRSTNAME',
      Lastname: 'LASTNAME',
      CreditBalance: '111',
    });

    const { findByText, getByText } = renderComponent();
    await findByText('joe.doe@example.com');

    getByText('FIRSTNAME LASTNAME');
    getByText('111 Kč');
    getByText('E-mail:');
    getByText('Jméno:');
    getByText('Kredity:');
    scope.done();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should display empty name when no name is returned', async () => {
    const scope = nockToBileto().get('/users/current').reply(200, {
      Id: 'USER_ID',
      Email: 'joe.doe@example.com',
      Firstname: null,
      CreditBalance: '111',
    });

    const { findByText, getByText } = renderComponent();
    await findByText('joe.doe@example.com');

    getByText('-');
    getByText('111 Kč');
    getByText('E-mail:');
    getByText('Jméno:');
    getByText('Kredity:');
    scope.done();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should properly format numbers', async () => {
    const scope = nockToBileto().get('/users/current').reply(200, {
      Id: 'USER_ID',
      Email: 'joe.doe@example.com',
      Firstname: null,
      CreditBalance: '1234.5',
    });

    const { findByText } = renderComponent();
    await findByText('joe.doe@example.com');
    await findByText('1 234 Kč');
    scope.done();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should display error info and allow to reload data on http error', async () => {
    const scope = nockToBileto()
      .get('/users/current')
      .once()
      .reply(400, {})
      .get('/users/current')
      .reply(200, {
        Id: 'USER_ID',
        Email: 'joe.doe@example.com',
        Firstname: null,
        CreditBalance: '111',
      });
    const { findByText, getByLabelText } = renderComponent();

    await findByText('Chyba při načítání dat.');
    await act(async () => {
      const reloadButton = getByLabelText('Opakovat');
      fireEvent.press(reloadButton);
      await findByText('joe.doe@example.com');
    });
    scope.done();
  });
});
