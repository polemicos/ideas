import { zSignInTrpcInput } from '@devpont/backend/src/router/signIn/input';
import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

export const SignInPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      await signIn
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
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {errorMessage && <Alert color="red">{errorMessage}</Alert>}
          {successMessageVisible && <Alert color="green">Thanks for signing in!</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
