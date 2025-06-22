import { trpc } from '../../../lib/trpc';
import { zUpdateIdeaTrpcInput } from './input';

export const updateIdeaTrpcRoute = trpc.procedure
  .input(zUpdateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) throw new Error('Unauthorized');
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: input.ideaId,
      },
    });
    if (!idea) throw new Error('Idea not found');
    if (ctx.me.id !== idea.userId) throw new Error('Not your idea');
    if (idea.title !== input.title) {
      const exIdea = await ctx.prisma.idea.findUnique({
        where: {
          title: input.title,
        },
      });
      if (exIdea) throw new Error('Idea with such title already exists');
    }

    await ctx.prisma.idea.update({
      where: {
        id: input.ideaId,
      },
      data: {
        title: input.title,
        description: input.description,
        text: input.text,
      },
    });
    return true;
  });
