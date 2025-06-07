import { z } from 'zod';
import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      title: z.string(),
    })
  )
  .query(({ input }) => {
    const idea = ideas.find((idea) => idea.title === input.title);
    return { idea: idea || null };
  });
