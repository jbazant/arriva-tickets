import { useMutation } from '@tanstack/react-query';
import { Box, Button, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { useRef } from 'react';
import { useBiletoApi } from '../../bileto/hooks/useBiletoApi';
import { PasswordInput } from '../../common/components/PasswordInput';
import { UsernameInput } from '../../common/components/UsernameInput';
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
  const passRef = useRef<typeof Input>();

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

  const submitForm = onSubmit(authMutation.mutate);
  const isButtonDisabled = !(values.username && values.password);

  return (
    <Box alignSelf="stretch" alignItems="stretch">
      <FormControl isRequired isInvalid={!!formError}>
        <Stack>
          <FormControl.Label mx={5}>Váš e-mail</FormControl.Label>
          <UsernameInput
            value={values.username}
            onChangeText={handleChange('username')}
            isDisabled={authMutation.isLoading}
            testID="Login-Username"
            onSubmitEditing={() => {
              // @ts-ignore - focus() doesn't exist on the new TS type of TextInput, but I guess it works....
              passRef.current?.focus();
            }}
          />
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={!!formError}>
        <Stack>
          <FormControl.Label mx={5}>Heslo</FormControl.Label>
          <PasswordInput
            ref={passRef}
            value={values.password}
            onChangeText={handleChange('password')}
            isDisabled={authMutation.isLoading}
            testID="Login-Password"
            onSubmitEditing={() => {
              if (values.username && values.password) {
                submitForm();
              }
            }}
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
        onPress={submitForm}
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
