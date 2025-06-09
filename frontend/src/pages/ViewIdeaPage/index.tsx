import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { Segment } from '../../components/Segment';
import { ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const ViewIdeaPage = () => {
  const { title } = useParams() as ViewIdeaRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    title,
  });

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;
  if (!data.idea) return <div>Idea not found</div>;
  return (
    <Segment title={data.idea.title} description={data.idea.description}>
      <div className={css.createdAt}>Created at: {format(data.idea.createdAt, 'dd-MM-yyyy')}</div>
      <div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
    </Segment>
  );
};
