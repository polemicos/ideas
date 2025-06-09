import cn from 'classnames';
import { type FormikProps } from 'formik';
import css from './index.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Input = ({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: number;
  type?: 'text' | 'password';
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const invalid = !!touched && !!error;
  const isSubmitting = formik.isSubmitting;

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: isSubmitting })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        style={{ maxWidth }}
        disabled={isSubmitting}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name, true);
        }}
        value={value}
        name={name}
        id={name}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
