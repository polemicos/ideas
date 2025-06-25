import { Idea, Permissions, User } from '@prisma/client';

type MaybeUser = Pick<User, 'permissions' | 'id'> | null;
type MaybeIdea = Pick<Idea, 'userId'> | null;

const hasPermission = (user: MaybeUser, permission: Permissions) => {
  return (
    user?.permissions.includes(permission) || user?.permissions.includes(Permissions.ALL) || false
  );
};

export const canBlockIdeas = (user: MaybeUser) => {
  return hasPermission(user, Permissions.BLOCK_IDEAS);
};

export const canEditIdea = (user: MaybeUser, idea: MaybeIdea) => {
  return !!user && !!idea && user?.id === idea?.userId;
};
