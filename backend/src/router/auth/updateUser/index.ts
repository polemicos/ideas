import { toClientMe } from '../../../lib/models';
import { trpc } from '../../../lib/trpc';
import { zUpdateUserTrpcInput } from './input';

export const updateUserTrpcRoute = trpc.procedure
  .input(zUpdateUserTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) throw new Error('Unauthorized');
    if (ctx.me.name !== input.name) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          name: input.name,
        },
      });
      if (exUser) throw new Error('User with such name already exists');
    }

    const updatedUser = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        name: input.name,
        fullName: input.fullName,
      },
    });
    ctx.me = updatedUser;
    return toClientMe(updatedUser);
  });
