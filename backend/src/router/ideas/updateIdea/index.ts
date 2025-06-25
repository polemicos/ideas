import { trpc } from '../../../lib/trpc';
import { canEditIdea } from '../../../utils/can';
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
    if (canEditIdea(ctx.me, idea)) throw new Error('Not your idea');
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
