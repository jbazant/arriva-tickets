import { useMutation } from '@tanstack/react-query';
import { Box, Button, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { useBiletoApi } from '../../bileto/hooks/useBiletoApi';
import { PasswordInput } from '../../common/components/PasswordInput';
import { useForm } from '../../common/hooks/useForm';
import { useUserControls } from '../hooks/useUserData';

const defaultFormValues = {
  username: '',
  password: '',
};

export function LoginForm() {
  const { values, onSubmit, handleChange, formError, setFormError } = useForm(defaultFormValues);

  const biletoApi = useBiletoApi();
  const { persist } = useUserControls();

  const authMutation = useMutation({
    mutationFn: biletoApi.authUser,
    onSuccess: ({ accessToken, username, password }) => {
      persist({
        username,
        password,
        token: accessToken,
      });
    },
    onError: (error: any) => {
      if (error?.code === 'ERR_BAD_REQUEST') {
        handleChange('password')('');
        setFormError('Neplatné přihlašovací údaje');
        return;
      }

      setFormError('Chyba při komunikaci se serverem. Zkontrolujte své připojení.');
    },
  });

  const isButtonDisabled = !(values.username && values.password);

  return (
    <Box alignSelf="stretch" alignItems="stretch">
      <FormControl isRequired isInvalid={!!formError}>
        <Stack>
          <FormControl.Label mx={5}>Váš e-mail</FormControl.Label>
          <Input
            value={values.username}
            onChangeText={handleChange('username')}
            keyboardType="email-address"
            isDisabled={authMutation.isLoading}
          />
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={!!formError}>
        <Stack>
          <FormControl.Label mx={5}>Heslo</FormControl.Label>
          <PasswordInput
            value={values.password}
            onChangeText={handleChange('password')}
            isDisabled={authMutation.isLoading}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} mx={5}>
            {formError}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <Button
        mt={5}
        mb={0}
        variant="solid"
        size="lg"
        onPress={onSubmit(authMutation.mutate)}
        isLoading={authMutation.isLoading}
        spinnerPlacement="end"
        isLoadingText="Přihlašuji"
        disabled={authMutation.isLoading || isButtonDisabled}
      >
        Přihlásit
      </Button>
    </Box>
  );
}
