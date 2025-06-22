import { trpc } from '../../../lib/trpc';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { signJWT } from '../../../utils/signJWT';
import { zSignInTrpcInput } from './input';

export const signInTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        name: input.name,
      },
    });

    if (!exUser) throw new Error('User not found');
    if (exUser.password !== getPasswordHash(input.password)) throw new Error('Wrong password');
    const token = signJWT(exUser.id);
    return { token };
  });
