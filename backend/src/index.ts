import cors from 'cors';
import express from 'express';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router/router';
const app = express();

app.use(cors());

applyTrpcToExpressApp(app, trpcRouter);

app.listen(3000, () => {
  console.info('listening on http://localhost:3000');
});
