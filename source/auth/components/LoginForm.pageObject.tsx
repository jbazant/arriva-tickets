import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { RenderResult } from '@testing-library/react-native/build/render';
import { CommonProvidersForTests } from '../../../jest/CommonProvidersForTests';
import { LoginForm } from './LoginForm';

export class LoginFormPageObject {
  form: RenderResult;

  render() {
    this.form = render(<LoginForm />, { wrapper: CommonProvidersForTests });
    return this.form;
  }

  getSubmitButton() {
    const { getByText } = this.form;
    return getByText('Přihlásit');
  }

  getPasswordField() {
    const { getByTestId } = this.form;
    return getByTestId('Login-Password');
  }

  getUsernameField() {
    const { getByTestId } = this.form;
    return getByTestId('Login-Username');
  }

  fillAndSubmit() {
    fireEvent.changeText(this.getUsernameField(), 'LOGIN');
    fireEvent.changeText(this.getPasswordField(), 'PASSWORD');
    fireEvent.press(this.getSubmitButton());
  }

  expectAllItemsRendered() {
    expect(this.getUsernameField()).toBeTruthy();
    expect(this.getPasswordField()).toBeTruthy();
    expect(this.getSubmitButton()).toBeTruthy();
  }

  expectInvalidCredentialsErrorDisplayed() {
    const { findByText } = this.form;
    return findByText('Neplatné přihlašovací údaje');
  }

  waitForFormToResolve() {
    const { queryByText } = this.form;
    return waitFor(() => {
      expect(queryByText('Přihlašuji')).toBeNull();
    });
  }
}
