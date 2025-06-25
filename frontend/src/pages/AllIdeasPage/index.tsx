import { zGetIdeasTrpcInput } from '@devpont/backend/src/router/ideas/getIdeas/input';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { useDebounceValue } from 'usehooks-ts';
import { Alert } from '../../components/Alert';
import { Input } from '../../components/Input';
import { layoutContentRef } from '../../components/Layout';
import { Loader } from '../../components/Loader';
import { Segment } from '../../components/Segment';
import { useForm } from '../../lib/form';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const AllIdeasPages = () => {
  const { formik } = useForm({
    initialValues: {
      search: '',
    },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  });
  const [search, setSearch] = useDebounceValue('', 500);

  useEffect(() => {
    setSearch(!formik.values.search ? '' : formik.values.search);
  }, [formik.values.search]);

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
    { search },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  if (!data) return <div>No data</div>;
  return (
    <Segment title="All Ideas">
      {(isLoading || isFetching || isRefetching) && <Loader type="section" />}
      {isError && <Alert color="red">{error.message}</Alert>}
      {!data.pages[0].ideas.length && <Alert color="blue">No ideas found</Alert>}
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" formik={formik} name="search" />
      </div>
      <div className={css.ideas}>
        <InfiniteScroll
          threshold={230}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) void fetchNextPage();
          }}
          hasMore={hasNextPage}
          loader={
            <div className={css.more} key="loader">
              <Loader type="section" />
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
                >
                  Likes: {idea.likesCount}
                </Segment>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </Segment>
  );
};
