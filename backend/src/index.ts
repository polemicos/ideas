import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { trpcRouter } from './trpc';
const app = express();

app.use(cors());

app.listen(3000, () => {
  console.info('listening on http://localhost:3000');
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);
