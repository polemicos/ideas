import { useParams } from 'react-router-dom';
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
    <div>
      <h1 className={css.title}>{data.idea.title}</h1>
      <h2 className={css.description}>{data.idea.description}</h2>
      <div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
    </div>
  );
};
