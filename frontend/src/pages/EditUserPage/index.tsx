import { TrpcRouterOutput } from '@devpont/backend/src/router/router';
import { zUpdatePasswordTrpcInput } from '@devpont/backend/src/router/updatePassword/input';
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

const ProfileSettings = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils();
  const updateUser = trpc.updateUser.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: me.name,
      fullName: me.fullName,
    },
    validationSchema: zUpdateUserTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateUser.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
      console.info('Submitted', values);
    },
    successMessage: 'Profile updated successfully',
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Full Name" name="fullName" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  );
};

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      password: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z
          .string()
          .min(8, 'New password again must be at least 8 characters long'),
      })
      .superRefine((val, ctx) => {
        if (val.password === val.newPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'New password should be different from the old one',
            path: ['newPassword'],
          });
        }
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'New password and new password again should be the same',
            path: ['newPasswordAgain'],
          });
        }
      }),
    onSubmit: async (values) => {
      await updatePassword.mutateAsync({
        password: values.password,
        newPassword: values.newPassword,
      });
      console.info('New password submitted successfully');
    },
    successMessage: 'Password updated successfully',
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Password" name="password" type="password" formik={formik} />
        <Input label="New Password" name="newPassword" type="password" formik={formik} />
        <Input label="New Password again" name="newPasswordAgain" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  );
};

export const EditUserPage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <Segment title={`Edit Profile: ${me?.name}`}>
      <Segment title="Global:" size={2}>
        <ProfileSettings me={me} />
      </Segment>

      <Segment title="Password:" size={2}>
        <Password />
      </Segment>
    </Segment>
  );
});
