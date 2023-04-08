import { QueryClient } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';
import { View as MockView } from 'native-base';
import { CommonProvidersForTests, getQueryClient } from '../../../jest/CommonProvidersForTests';
import { Profile } from './Profile';

jest.mock('./UserInfo', () => ({
  UserInfo: () => <MockView />,
}));

const mockClear = jest.fn();
jest.mock('../../auth/hooks/useUserData', () => {
  const originalModule = jest.requireActual('../../auth/hooks/useUserData');

  return {
    ...originalModule,
    useUserControls: () => ({
      ...originalModule.useUserControls,
      clear: mockClear,
    }),
  };
});

describe('Profile component', () => {
  const renderComponent = (queryClient?: QueryClient) =>
    render(<Profile />, {
      wrapper: ({ children }) => (
        <CommonProvidersForTests queryClient={queryClient}>{children}</CommonProvidersForTests>
      ),
    });

  beforeEach(() => {
    mockClear.mockClear();
  });

  it('should render header and button', () => {
    const { getByText } = renderComponent();
    expect(getByText('Účet')).toBeTruthy();
    expect(getByText('Odhlásit')).toBeTruthy();
  });

  it('should clear user and queryClient on Logout press', async () => {
    const queryClient = getQueryClient();
    const queryClientSpy = jest.spyOn(queryClient, 'clear');

    const { getByText } = renderComponent(queryClient);
    await fireEvent.press(getByText('Odhlásit'));

    expect(queryClientSpy).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();
  });
});
