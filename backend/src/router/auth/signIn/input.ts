import { z } from 'zod';

export const zSignInTrpcInput = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
