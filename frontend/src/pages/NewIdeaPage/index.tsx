import { zCreateideaTrpcInput } from '@devpont/backend/src/router/createIdea/input';
import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      text: '',
    },
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      console.info('Submitted', values);
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

        <Input name={'description'} label={'Describe your idea'} formik={formik} />

        <Textarea name={'text'} label={'Write your idea'} formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Form is not valid</div>
        )}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
};
