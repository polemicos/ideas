import cn from 'classnames';
import { Link } from 'react-router-dom';
import css from './index.module.scss';

export type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
};
export const Button = ({ children, loading, type = 'submit', onClick }: ButtonProps) => (
  <button
    className={cn({ [css.button]: true, [css.disabled]: loading })}
    type={type}
    disabled={loading}
    onClick={onClick}
  >
    {loading ? 'Processing...' : children}
  </button>
);

export const LinkButton = ({ children, to }: ButtonProps & { to: string }) => (
  <Link className={css.button} to={to}>
    {children}
  </Link>
);
