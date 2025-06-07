import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import { z } from 'zod';

const ideas = _.times(100, (i) => ({
  id: i,
  title: `Idea ${i}`,
  description: `Description of idea ${i}`,
  text: _.times(50, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));

const trpc = initTRPC.create();
export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas: ideas.map((idea) => _.pick(idea, ['id', 'title', 'description'])) };
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.title === input.title);
      return { idea: idea || null };
    }),
});

export type TrpcRouter = typeof trpcRouter;
