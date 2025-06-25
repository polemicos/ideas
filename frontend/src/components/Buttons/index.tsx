import type { TrpcRouterOutput } from '@devpont/backend/src/router/router';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

type ButtonColor = 'red' | 'blue' | 'green';

export type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button';
  color?: ButtonColor;
  onClick?: () => void;
};
export const Button = ({
  children,
  loading,
  type = 'submit',
  onClick,
  color = 'green',
}: ButtonProps) => (
  <button
    className={cn({
      [css.button]: true,
      [css.disabled]: loading,
      [css.loading]: loading,
      [css[`color-${color}`]]: true,
    })}
    type={type}
    disabled={loading}
    onClick={onClick}
  >
    <span className={css.text}>{children}</span>
  </button>
);

export const LinkButton = ({ children, to, color = 'green' }: ButtonProps & { to: string }) => (
  <Link className={cn({ [css.button]: true, [css[`color-${color}`]]: true })} to={to}>
    {children}
  </Link>
);

export const LikeButton = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const trpcUtils = trpc.useUtils();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData();
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getIdea.setData({ title: idea.title }, newGetIdeaData);
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ title: idea.title });
    },
  });

  return (
    <Button
      onClick={() =>
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
      }
    >
      {idea.isLikedByMe ? 'Unlike' : 'Like'}
    </Button>
  );
};
