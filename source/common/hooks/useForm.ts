import { useState } from 'react';
import { useMountedFlag } from './useMountedFlag';

export function useForm<T, K extends keyof T>(defaultValues: T) {
  const getMounted = useMountedFlag();
  const [values, setValues] = useState(defaultValues);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (name: K) => (value: typeof values[K]) => {
    setValues((values) => ({ ...values, [name]: value }));
    setFormError(undefined);
  };

  const onSubmit = (callback: (data: T) => any) => () => {
    callback(values);
  };

  const handleSubmit = (callback: (data: T) => Promise<any>) => async () => {
    setSubmitting(true);

    try {
      await callback(values);
    } catch (e) {
      console.warn('submit callback should never throw', e.message);
    }

    if (getMounted()) {
      setSubmitting(false);
    }
  };

  return {
    formError,
    handleChange,
    onSubmit,
    handleSubmit,
    isSubmitting,
    setFormError,
    values,
  };
}
