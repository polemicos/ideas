import { trpc } from '../../../lib/trpc';
import { zCreateideaTrpcInput as zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) throw new Error('Unauthorized');
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        title: input.title,
      },
    });
    if (exIdea) throw new Error('Idea with such title already exists');

    await ctx.prisma.idea.create({
      data: {
        userId: ctx.me.id,
        title: input.title,
        description: input.description,
        text: input.text,
      },
    });
    return true;
  });
