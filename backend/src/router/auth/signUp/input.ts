import { z } from 'zod';

export const zSignUpTrpcInput = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .regex(/^[a-zA-Z-]+$/, 'Only letters and dashes allowed'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
