import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
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

    await ctx.prisma.user.create({
      data: {
        name: input.name,
        password: getPasswordHash(input.password),
      },
    });
    return true;
  });
