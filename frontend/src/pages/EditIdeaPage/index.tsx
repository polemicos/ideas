import { zUpdateIdeaTrpcInput } from '@devpont/backend/src/router/ideas/updateIdea/input';
import pick from 'lodash/pick';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Buttons';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { useForm } from '../../lib/form';
import { withPageWrapper } from '../../lib/pageWrapper';
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { title } = useParams() as EditIdeaRouteParams;
    return trpc.getIdea.useQuery({ title });
  },
  setProps: ({ queryResult, ctx, checkAccess, checkExists }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found');
    checkAccess(ctx.me?.id === idea.userId, 'You are not the author of this idea');
    return { idea };
  },
})(({ idea }) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['title', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      void navigate(getViewIdeaRoute({ title: values.title }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Idea: ${idea.title}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Title" name="title" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
