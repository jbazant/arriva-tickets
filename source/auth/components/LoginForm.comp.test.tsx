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
});
