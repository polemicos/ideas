import cn from 'classnames';
import { Link } from 'react-router-dom';
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

export const LinkButton = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link className={css.button} to={to}>
    {children}
  </Link>
);
