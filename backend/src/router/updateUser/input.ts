import { z } from 'zod';
import { zSignUpTrpcInput } from '../signUp/input';

export const zUpdateUserTrpcInput = z.object({
  name: zSignUpTrpcInput.shape.name,
  fullName: z.string().min(2).max(50).default(''),
});
