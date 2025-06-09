import crypto from 'crypto';
import { trpc } from '../../lib/trpc';
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
        password: crypto.createHash('sha256').update(input.password).digest('hex'),
      },
    });
    return true;
  });
