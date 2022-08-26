import { Box, Button, Input, Text } from 'native-base';
import { PasswordInput } from '../../common/components/PasswordInput';
import { useForm } from '../../common/hooks/useForm';
import { useUserControls } from '../hooks/useUserData';

const defaultFormValues = {
  login: '',
  password: '',
};

export function LoginForm() {
  const { values, isSubmitting, handleSubmit, handleChange } = useForm(defaultFormValues);
  const { persist } = useUserControls();

  const fakeSubmit = ({ login, password }: typeof defaultFormValues): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(async () => {
        await persist({ username: login, password, token: 'FAKE_TOKEN' });
        resolve();
      }, 2e3);
    });

  return (
    <Box alignSelf="stretch" alignItems="stretch">
      <Box>
        <Text mx={5}>Váš e-mail</Text>
        <Input
          value={values['login']}
          onChangeText={handleChange('login')}
          keyboardType="email-address"
        />
      </Box>
      <Box>
        <Text mx={5}>Heslo</Text>
        <PasswordInput value={values['password']} onChangeText={handleChange('password')} />
      </Box>
      <Button
        mt={5}
        mb={0}
        variant="solid"
        size="lg"
        onPress={handleSubmit(fakeSubmit)}
        isLoading={isSubmitting}
        spinnerPlacement="end"
        isLoadingText="Přihlašuji"
      >
        Přihlásit
      </Button>
    </Box>
  );
}
