import { Icon, IInputProps, Input, Pressable } from 'native-base';
import { useState } from 'react';

export function PasswordInput(props: Omit<IInputProps, 'type' | 'InputRightElement'>) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Input
      type={passwordVisible ? 'text' : 'password'}
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
}
