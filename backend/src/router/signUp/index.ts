import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJWT } from '../../utils/signJWT';
import { zSignUpTrpcInput } from './input';

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        name: input.name,
      },
    });
    if (exUser) throw new Error('Idea with such title already exists');

    const user = await ctx.prisma.user.create({
      data: {
        name: input.name,
        password: getPasswordHash(input.password),
      },
    });
    const token = signJWT(user.id);
    return { token };
  });
