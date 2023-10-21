import { Center, Text, useToken } from 'native-base';

export type BigInfoProps = {
  label: string;
  value: string;
  variant: 'basic' | 'departed';
};

export function BigInfo({ variant, label, value }: BigInfoProps) {
  const [colorImportant, colorMuted] = useToken('color', ['textImportant', 'textMuted']);

  return (
    <Center>
      <Text>{label}:</Text>
      <Text fontSize="3xl" bold color={variant === 'basic' ? colorImportant : colorMuted}>
        {value}
      </Text>
    </Center>
  );
}
