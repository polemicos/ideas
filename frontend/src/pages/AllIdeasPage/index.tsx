import { Link } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const AllIdeasPages = () => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getIdeas.useInfiniteQuery(
    {
      limit: 3,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  if (!data) return <div>No data</div>;
  return (
    <Segment title="All Ideas">
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.ideas}>
          {data.pages
            .flatMap((page) => page.ideas)
            .map((idea) => (
              <div className={css.idea} key={idea.id}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.ideaLink} to={getViewIdeaRoute({ title: idea.title })}>
                      {idea.title}
                    </Link>
                  }
                  description={idea.description}
                />
              </div>
            ))}
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <Button
                loading={isFetchingNextPage || isRefetching}
                onClick={() => {
                  void fetchNextPage();
                }}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
      )}
    </Segment>
  );
};
