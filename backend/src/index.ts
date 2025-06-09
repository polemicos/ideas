import cors from 'cors';
import express from 'express';
import { AppContext, createAppContext } from './lib/ctx';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router/router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const app = express();

    app.use(cors());

    applyTrpcToExpressApp(app, ctx, trpcRouter);

    app.listen(3000, () => {
      console.info('listening on http://localhost:3000');
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
