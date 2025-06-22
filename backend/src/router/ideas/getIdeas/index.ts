import _ from 'lodash';
import { trpc } from '../../../lib/trpc';
import { zGetIdeasTrpcInput } from './input';

export const getIdeasTrpcRoute = trpc.procedure
  .input(zGetIdeasTrpcInput)
  .query(async ({ ctx, input }) => {
    const rawIdeas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        serial: true,
        _count: {
          select: {
            IdeasToLikes: true,
          },
        },
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
    const nextIdea = rawIdeas.at(input.limit);
    const nextCursor = nextIdea?.serial;
    const rawIdeasExceptNext = rawIdeas.slice(0, input.limit);

    const ideas = rawIdeasExceptNext.map((idea) => {
      return {
        ..._.omit(idea, ['_count']),
        likesCount: idea._count.IdeasToLikes,
      };
    });

    return { ideas, nextCursor };
  });
