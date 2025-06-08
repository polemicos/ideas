import cn from 'classnames';
import css from './index.module.scss';

export const Button = ({ children, loading }: { children: React.ReactNode; loading?: boolean }) => (
  <button
    className={cn({ [css.button]: true, [css.disabled]: loading })}
    type="submit"
    disabled={loading}
  >
    {loading ? 'Submitting...' : children}
  </button>
);
