import { trpc } from '../../../lib/trpc';
import { zSetIdeaLikeTrpcInput } from './input';

export const setIdeaLikeTrpcRoute = trpc.procedure
  .input(zSetIdeaLikeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { ideaId, isLikedByMe } = input;
    if (!ctx.me) throw new Error('Unauthorized');
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    });
    if (!idea) throw new Error('Not Found');
    if (isLikedByMe) {
      await ctx.prisma.ideasToLikes.upsert({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          ideaId,
        },
        update: {},
      });
    } else {
      await ctx.prisma.ideasToLikes.delete({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
      });
    }
    const likesCount = await ctx.prisma.ideasToLikes.count({
      where: {
        ideaId,
      },
    });

    return {
      idea: {
        id: idea.id,
        likesCount,
        isLikedByMe,
      },
    };
  });
