import { act } from '@testing-library/react-native';
import { DateTime } from 'luxon';
import { nockToBileto } from '../../../jest/testUtils';
import { LoginFormPageObject } from './LoginForm.pageObject';

describe('LoginForm', () => {
  let pageObject: LoginFormPageObject;

  beforeEach(() => {
    pageObject = new LoginFormPageObject();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should render correct labels', () => {
    pageObject.render();

    pageObject.expectAllItemsRendered();
  });

  it('submit button should be disabled by default', () => {
    const { getByText } = pageObject.render();

    expect(getByText('Přihlásit')).toBeDisabled();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should make a post request on form submit', async () => {
    const scope = nockToBileto()
      .filteringRequestBody(/"(client_[a-z]+)":"[^"]+"/g, '"$1":"ANY"')
      .post('/oauth/auth', {
        client_id: 'ANY',
        client_secret: 'ANY',
        grant_type: 'password',
        username: 'LOGIN',
        password: 'PASSWORD',
      })
      .reply(200, {
        username: 'LOGIN',
        password: 'PASSWORD',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN',
        expiresAt: DateTime.now().plus({ second: 1e3 }),
      });

    pageObject.render();
    pageObject.fillAndSubmit();
    await act(async () => {
      await pageObject.waitForFormToResolve();
    });

    scope.done();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should display error on wrong credentials', async () => {
    const scope = nockToBileto()
      .filteringRequestBody(/"(client_[a-z]+)":"[^"]+"/g, '"$1":"ANY"')
      .post('/oauth/auth', {
        client_id: 'ANY',
        client_secret: 'ANY',
        grant_type: 'password',
        username: 'LOGIN',
        password: 'PASSWORD',
      })
      .reply(401, {
        code: 'ERR_BAD_REQUEST',
      });

    pageObject.render();
    pageObject.fillAndSubmit();

    await act(async () => {
      await pageObject.expectInvalidCredentialsErrorDisplayed();
    });
    scope.done();
  });
});
