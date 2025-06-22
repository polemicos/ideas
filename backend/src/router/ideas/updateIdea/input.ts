import { z } from 'zod';
import { zCreateideaTrpcInput } from '../createIdea/input';

export const zUpdateIdeaTrpcInput = zCreateideaTrpcInput.extend({
  ideaId: z.string().min(1),
});
