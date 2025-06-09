import cors from 'cors';
import express from 'express';
import { AppContext, createAppContext } from './lib/ctx';
import { env } from './lib/env';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router/router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const app = express();

    app.use(cors());

    applyPassportToExpressApp(app, ctx);
    applyTrpcToExpressApp(app, ctx, trpcRouter);

    app.listen(env.PORT, () => {
      console.info('listening on http://localhost:3000');
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
