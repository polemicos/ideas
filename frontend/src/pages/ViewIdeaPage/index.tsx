import { useParams } from 'react-router-dom';
import { ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

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
      <h1>{data.idea.title}</h1>
      <h2>{data.idea.description}</h2>
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
    </div>
  );
};
