import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { layoutContentRef } from '../../components/Layout';
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
    {},
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  if (!data) return <div>No data</div>;
  return (
    <Segment title="All Ideas">
      <div className={css.ideas}>
        {isError && <Alert color="red">{error.message}</Alert>}
        {(isLoading || isFetching || isRefetching) && <p>Loading...</p>}
        <InfiniteScroll
          threshold={230}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) void fetchNextPage();
          }}
          hasMore={hasNextPage}
          loader={
            <div className={css.more} key="loader">
              <p>Loading...</p>
            </div>
          }
          getScrollParent={() => layoutContentRef.current}
          useWindow={false}
        >
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
        </InfiniteScroll>
      </div>
    </Segment>
  );
};
