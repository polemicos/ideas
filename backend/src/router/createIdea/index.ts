import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';
import { zCreateideaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateideaTrpcInput)
  .mutation(({ input }) => {
    const newIdea = {
      ...input,
      id: ideas.length + 1,
    };
    ideas.unshift(newIdea);
    return true;
  });
