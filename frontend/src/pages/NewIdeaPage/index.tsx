import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values);
    },

    validate: withZodSchema(
      z.object({
        title: z
          .string()
          .min(5, 'Title must be at least 5 characters long')
          .regex(/^[a-zA-Z0-9 ]+$/, 'Only letters, numbers and spaces allowed'),
        description: z
          .string()
          .min(10, 'Description must be at least 10 characters long'),
        text: z
          .string()
          .min(100, 'Text of an idea must be at least 100 characters long'),
      })
    ),

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
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Form is not valid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
};
