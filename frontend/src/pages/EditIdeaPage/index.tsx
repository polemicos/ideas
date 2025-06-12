/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises */
import type { TrpcRouterOutput } from '@devpont/backend/src/router/router';
import { zUpdateIdeaTrpcInput } from '@devpont/backend/src/router/updateIdea/input';
import { useFormik } from 'formik';
/* eslint-disable-next-line import/no-unresolved */
import { withZodSchema } from 'formik-validator-zod';
import pick from 'lodash/pick';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const updateIdea = trpc.updateIdea.useMutation();
  const formik = useFormik({
    initialValues: pick(idea, ['title', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      await updateIdea
        .mutateAsync({ ideaId: idea.id, ...values })
        .then(() => {
          setErrorMessage(null);
          navigate(getViewIdeaRoute({ title: values.title }));
        })
        .catch((e) => {
          console.error(e);
          setErrorMessage(String(e.message));
        });
    },
  });

  return (
    <Segment title={`Edit Idea: ${idea.title}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Title" name="title" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {errorMessage && <Alert color="red">{errorMessage}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditIdeaPage = () => {
  const { title } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    title,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data?.idea;
  const me = getMeResult.data?.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== idea.userId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};
