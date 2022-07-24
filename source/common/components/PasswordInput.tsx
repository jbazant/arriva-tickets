import { Entypo } from '@native-base/icons';
import { Icon, Input, Pressable } from 'native-base';
import { useState } from 'react';

export function PasswordInput() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Input
      type={passwordVisible ? 'text' : 'password'}
      InputRightElement={
        <Pressable
          onPress={() => setPasswordVisible((isVisible) => !isVisible)}
          mr={1}
          p={2}
          accessibilityLabel={passwordVisible ? 'Skrýt heslo' : 'Zobrazit heslo'}>
          <Icon name={passwordVisible ? 'eye-with-line' : 'eye'} />
        </Pressable>
      }
    />
  );
}
