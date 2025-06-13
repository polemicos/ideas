import { zCreateideaTrpcInput } from '@devpont/backend/src/router/createIdea/input';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { useForm } from '../../lib/form';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
  const navigate = useNavigate();
  const createIdea = trpc.createIdea.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      title: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateideaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      console.info('Submitted', values);
      void navigate(getViewIdeaRoute({ title: values.title }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input name={'title'} label={'Title for your idea'} formik={formik} />
          <Input name={'description'} label={'Describe your idea'} formik={formik} maxWidth={500} />
          <Textarea name={'text'} label={'Write your idea'} formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
