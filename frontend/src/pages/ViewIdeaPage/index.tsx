import { TrpcRouterOutput } from '@devpont/backend/src/router/router';
import { canEditIdea, canBlockIdeas } from '@devpont/backend/src/utils/can';
import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button, LikeButton, LinkButton } from '../../components/Buttons';
import { FormItems } from '../../components/FormItems';
import { Segment } from '../../components/Segment';
import { useForm } from '../../lib/form';
import { withPageWrapper } from '../../lib/pageWrapper';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useUtils();
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id });
      await trpcUtils.getIdea.refetch({ title: idea.title });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  );
};

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { title } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({ title });
  },
  setProps: ({ queryResult, ctx, checkExists }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found');
    return { idea, me: ctx.me };
  },
  showLoaderOnFetching: false,
})(({ idea, me }) => {
  return (
    <Segment title={idea.title} description={idea.description}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument*/}
      <div className={css.createdAt}>Created at: {format(idea.createdAt, 'dd-MM-yyyy')}</div>
      <div className={css.author}>Author: {idea.user.name}</div>
      <div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      </div>
      <div className={css.likes}>
        Likes: {idea.likesCount}
        {me && (
          <>
            <br />
            <LikeButton idea={idea} />
          </>
        )}
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      {canEditIdea(me, idea) && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ title: idea.title })}>Edit Idea</LinkButton>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      {canBlockIdeas(me) && (
        <div className={css.blockIdea}>
          <BlockIdea idea={idea} />
        </div>
      )}
    </Segment>
  );
});
