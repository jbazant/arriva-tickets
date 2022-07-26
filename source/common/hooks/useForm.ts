import { useState } from 'react';

export function useForm<T, K extends keyof T>(defaultValues: T) {
  const [values, setValues] = useState(defaultValues);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (name: K) => (value: typeof values[K]) => {
    setValues((values) => ({ ...values, [name]: value }));
    setFormError(undefined);
  };

  const handleSubmit = (callback: (data: T) => Promise<void>) => async () => {
    setSubmitting(true);
    try {
      await callback(values);
    } catch (e) {
      console.warn('submit callback should never throw', e.message);
    }
    setSubmitting(false);
  };

  return {
    formError,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFormError,
    values,
  };
}
