import { z } from 'zod';
export const zCreateideaTrpcInput = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .regex(/^[a-zA-Z0-9 ]+$/, 'Only letters, numbers and spaces allowed'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  text: z.string().min(100, 'Text of an idea must be at least 100 characters long'),
});
