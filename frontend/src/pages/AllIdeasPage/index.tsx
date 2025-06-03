import { Link } from 'react-router-dom';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const AllIdeasPages = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <h1 className={css.title}>All Ideas</h1>
      <div className={css.ideas}>
        {data.ideas.map((idea) => (
          <div className={css.idea} key={idea.id}>
            <h2 className={css.ideaTitle}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ title: idea.title })}>{idea.title}</Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
