import { z } from 'zod';
import { zSignUpTrpcInput } from '../signUp/input';

export const zUpdateUserTrpcInput = zSignUpTrpcInput.extend({
  fullName: z.string().min(2).max(50).default(''),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
});
