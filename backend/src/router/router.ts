import { initTRPC } from '@trpc/server';
import { getIdeaTrpcRoute } from './getIdea';
import { getIdeasTrpcRoute } from './getIdeas';

const trpc = initTRPC.create();
export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
