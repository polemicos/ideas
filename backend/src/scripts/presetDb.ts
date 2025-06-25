import { type AppContext } from '../lib/ctx';
import { env } from '../lib/env';
import { getPasswordHash } from '../utils/getPasswordHash';

export const presetDb = async (ctx: AppContext) => {
  await ctx.prisma.user.upsert({
    where: {
      name: 'admin',
    },
    create: {
      name: 'admin',
      password: getPasswordHash(env.ADMIN_PASSWORD),
      permissions: ['ALL'],
    },
    update: {
      permissions: ['ALL'],
    },
  });
};
