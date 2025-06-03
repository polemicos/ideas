import { Link } from 'react-router-dom';
import { getViewIdeaRoute } from '../lib/routes';
import { trpc } from '../lib/trpc';

export const AllIdeasPages = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <h1>IdeaNick</h1>
      <div className="ideas">
        {data.ideas.map((idea) => (
          <div key={idea.id}>
            <h2>
              <Link to={getViewIdeaRoute({ title: idea.title })}>{idea.title}</Link>
            </h2>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
