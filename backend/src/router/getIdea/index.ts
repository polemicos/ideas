import { z } from 'zod';
import { trpc } from '../../lib/trpc';

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      title: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const idea = await ctx.prisma.idea.findUnique({
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
      },
    });
    return { idea };
  });
