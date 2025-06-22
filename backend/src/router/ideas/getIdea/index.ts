import _ from 'lodash';
import { z } from 'zod';
import { trpc } from '../../../lib/trpc';

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      title: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
      where: {
        title: input.title,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        IdeasToLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            IdeasToLikes: true,
          },
        },
      },
    });

    const isLikedByMe = !!rawIdea?.IdeasToLikes.length;
    const likesCount = rawIdea?._count.IdeasToLikes || 0;
    const idea = rawIdea && {
      ..._.omit(rawIdea, ['IdeasToLikes', '_count']),
      isLikedByMe,
      likesCount,
    };

    return { idea };
  });
