import { Icon, IInputProps, Input, Pressable } from 'native-base';
import { forwardRef, useState } from 'react';

export const PasswordInput = forwardRef<
  typeof Input,
  Omit<IInputProps, 'type' | 'InputRightElement'>
>(function (props, ref) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={passwordVisible ? 'text' : 'password'}
      placeholder="Heslo"
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect={false}
      InputRightElement={
        <Pressable
          onPress={() => setPasswordVisible((isVisible) => !isVisible)}
          mr={1}
          p={2}
          accessibilityHint={'Přepne způsob zobrazení hesla'}
          accessibilityLabel={passwordVisible ? 'Skrýt heslo' : 'Zobrazit heslo'}
        >
          <Icon name={passwordVisible ? 'eye-with-line' : 'eye'} />
        </Pressable>
      }
      {...props}
    />
  );
});
