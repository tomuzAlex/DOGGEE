/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

interface useFormParams<Values> {
  initialValue: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => string | null;
  };
  validateOnChange?: boolean;
  validate?: (values: Values) => void;
  onSubmit?: (value: Values) => void;
}

export const useForm = <Values>({
  initialValue,
  validateSchema,
  validateOnChange = true,
  onSubmit,
}: useFormParams<Values>) => {
  const [values, setValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Pick<Values, K>[K]) => {
    setValues({ ...values, [field]: value });
    const validateSchemaExistForField = !!validateSchema && !!validateSchema[field];
    if (!validateSchemaExistForField && validateOnChange) return;
    else {
      //@ts-expect-error
      const error = validateSchema[field](value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return !!onSubmit && onSubmit(values);
  };

  return { values, errors, setFieldValue, handleSubmit };
};
