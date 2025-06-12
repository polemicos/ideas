import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const ViewIdeaPage = () => {
  const { title } = useParams() as ViewIdeaRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    title,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (isLoading || isFetching || getMeResult.isLoading || getMeResult.isFetching)
    return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (getMeResult.isError) return <div>{getMeResult.error.message}</div>;
  if (!data) return <div>No data</div>;
  if (!data.idea) return <div>Idea not found</div>;

  const idea = data.idea;
  const me = getMeResult.data?.me;
  return (
    <Segment title={idea.title} description={idea.description}>
      <div className={css.createdAt}>Created at: {format(idea.createdAt, 'dd-MM-yyyy')}</div>
      <div className={css.author}>Author: {idea.user.name}</div>
      <div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
      {me?.id === idea.userId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ title: idea.title })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
};
