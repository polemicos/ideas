import { zUpdateUserTrpcInput } from '@devpont/backend/src/router/updateUser/input';
import { z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { useForm } from '../../lib/form';
import { withPageWrapper } from '../../lib/pageWrapper';
import { trpc } from '../../lib/trpc';

export const EditUserPage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({
    me: ctx.me!,
  }),
})(({ me }) => {
  const trpcUtils = trpc.useUtils();
  const updateUser = trpc.updateUser.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: me.name,
      fullName: me.fullName,
      password: '',
      newPassword: '',
    },
    validationSchema: zUpdateUserTrpcInput.superRefine((val, ctx) => {
      if (val.password === val.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'New password should be different from the old one',
          path: ['newPassword'],
        });
      }
    }),
    onSubmit: async (values) => {
      const updatedMe = await updateUser.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
      console.info('Submitted', values);
    },
    successMessage: 'Profile updated successfully',
    resetOnSuccess: false,
  });

  return (
    <Segment title={`Edit Profile: ${me?.name}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Full Name" name="fullName" formik={formik} />
          <Input label="Old Password" name="password" type="password" formik={formik} />
          <Input label="New Password" name="newPassword" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Profile</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
