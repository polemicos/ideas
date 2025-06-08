import { zCreateideaTrpcInput } from '@devpont/backend/src/router/createIdea/input';
import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const createIdea = trpc.createIdea.useMutation();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      text: '',
    },
    onSubmit: async (values) => {
      await createIdea
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

    validate: withZodSchema(zCreateideaTrpcInput),
  });
  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name={'title'} label={'Title for your idea'} formik={formik} />

        <Input name={'description'} label={'Describe your idea'} formik={formik} maxWidth={500} />

        <Textarea name={'text'} label={'Write your idea'} formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Form is not valid</div>
        )}
        {successMessageVisible && <div style={{ color: 'green' }}>Idea created</div>}
        {!!errorMessage && <div style={{ color: 'red' }}>Error creating idea: {errorMessage}</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  );
};
