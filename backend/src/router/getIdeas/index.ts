import { trpc } from '../../lib/trpc';
import { zGetIdeasTrpcInput } from './input';

export const getIdeasTrpcRoute = trpc.procedure
  .input(zGetIdeasTrpcInput)
  .query(async ({ ctx, input }) => {
    const ideas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        serial: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serial: 'desc',
        },
      ],
      cursor: input.cursor ? { serial: input.cursor } : undefined,
      take: input.limit + 1,
    });
    const nextIdea = ideas.at(input.limit);
    const nextCursor = nextIdea?.serial;
    const ideasExceptNext = ideas.slice(0, input.limit);

    return { ideas: ideasExceptNext, nextCursor };
  });
