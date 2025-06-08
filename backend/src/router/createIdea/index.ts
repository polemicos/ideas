import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';
import { zCreateideaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateideaTrpcInput)
  .mutation(({ input }) => {
    if (ideas.find((idea) => idea.title === input.title))
      throw new Error('Idea with such title already exists');
    const newIdea = {
      ...input,
      id: ideas.length + 1,
    };
    ideas.unshift(newIdea);
    return true;
  });
