import { render } from '@testing-library/react-native';
import { CommonProvidersForTests } from '../../../jest/CommonProvidersForTests';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should render correct labels', () => {
    const { getByText } = render(<LoginForm />, { wrapper: CommonProvidersForTests });

    expect(getByText('Váš e-mail')).toBeTruthy();
    expect(getByText('Heslo')).toBeTruthy();
    expect(getByText('Přihlásit')).toBeTruthy();
  });

  it('submit button should be disabled by default', () => {
    const { getByText } = render(<LoginForm />, { wrapper: CommonProvidersForTests });

    expect(getByText('Přihlásit')).toBeDisabled();
  });

  it.todo('should make a post request on form submit', () => {});

  it.todo('should display error on wrong credentials', () => {});
});
