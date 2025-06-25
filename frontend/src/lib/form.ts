/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FormikHelpers, useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { type AlertProps } from '../components/Alert';
import { type ButtonProps } from '../components/Buttons';

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues = {},
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit?: (
    values: z.infer<TZodSchema>,
    actions: FormikHelpers<z.infer<TZodSchema>>
  ) => Promise<any> | any;
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, FormikHelpers) => {
      if (!onSubmit) {
        return;
      }
      try {
        setErrorMessageVisible(null);
        await onSubmit(values, FormikHelpers);
        if (resetOnSuccess) {
          formik.resetForm();
        }
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        console.error(error);
        setErrorMessageVisible(error);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (errorMessageVisible) {
      return {
        hidden: false,
        children: errorMessageVisible.message,
        color: 'red',
      };
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some form fields are invalid',
        color: 'red',
      };
    }

    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      };
    }

    return {
      color: 'red',
      hidden: true,
      children: null,
    };
  }, [
    errorMessageVisible,
    formik.isValid,
    formik.submitCount,
    showValidationAlert,
    successMessage,
    successMessageVisible,
  ]);

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    };
  }, [formik.isSubmitting]);

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
