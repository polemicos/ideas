import _ from 'lodash';
import { trpc } from '../../lib/trpc';

export const getMeTrpcRoute = trpc.procedure.query(
  ({ ctx }): { me: { id: string; name: string } | null } => {
    if (!ctx.me) return { me: null };
    return { me: _.pick(ctx.me, ['id', 'name']) };
  }
);
