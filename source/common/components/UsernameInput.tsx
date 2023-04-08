import { Input, IInputProps } from 'native-base';
import React, { forwardRef } from 'react';

export const UsernameInput = forwardRef<typeof Input, IInputProps>(function (props, ref) {
  return (
    <Input
      ref={ref}
      keyboardType="email-address"
      placeholder="joe.doe@example.com"
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      autoFocus={true}
      {...props}
    />
  );
});
