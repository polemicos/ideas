import { zSignUpTrpcInput } from '@devpont/backend/src/router/signUp/input';
import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            });
          }
        })
    ),
    onSubmit: async (values) => {
      await signUp
        .mutateAsync(values)
        .then(() => {
          console.info('Submitted', values);
          formik.resetForm();
          setSuccessMessageVisible(true);
          setTimeout(() => {
            setSuccessMessageVisible(false);
          }, 3000);
        })
        .catch((e) => {
          console.error(e);
          setErrorMessage(String(e.message));
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    },
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {errorMessage && <Alert color="red">{errorMessage}</Alert>}
          {successMessageVisible && <Alert color="green">Thanks for sign up!</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
