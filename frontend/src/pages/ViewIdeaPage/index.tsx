import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { withPageWrapper } from '../../lib/pageWrapper';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { title } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({ title });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  setProps: ({ queryResult, ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    idea: queryResult.data.idea!,
    me: ctx.me,
  }),
})(({ idea, me }) => {
  return (
    <Segment title={idea.title} description={idea.description}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument*/}
      <div className={css.createdAt}>Created at: {format(idea.createdAt, 'dd-MM-yyyy')}</div>
      <div className={css.author}>Author: {idea.user.name}</div>
      <div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      </div>
      {me?.id === idea.userId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ title: idea.title })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
});
