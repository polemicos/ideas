import { trpc } from '../../lib/trpc';
import { zCreateideaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateideaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        title: input.title,
      },
    });
    if (exIdea) throw new Error('Idea with such title already exists');

    await ctx.prisma.idea.create({
      data: {
        title: input.title,
        description: input.description,
        text: input.text,
      },
    });
    return true;
  });
