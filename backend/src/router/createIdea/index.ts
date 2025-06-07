import { z } from 'zod';
import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      title: z
        .string()
        .min(5, 'Title must be at least 5 characters long')
        .regex(/^[a-zA-Z0-9 ]+$/, 'Only letters, numbers and spaces allowed'),
      description: z.string().min(10, 'Description must be at least 10 characters long'),
      text: z.string().min(100, 'Text of an idea must be at least 100 characters long'),
    })
  )
  .mutation(({ input }) => {
    const newIdea = {
      ...input,
      id: ideas.length + 1,
    };
    ideas.unshift(newIdea);
    return true;
  });
