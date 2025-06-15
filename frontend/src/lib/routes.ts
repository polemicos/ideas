const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({
      ...acc,
      [key]: `:${key}`,
    }),
    {}
  ) as Record<keyof T, string>;
};

//                Routes

// AllIdeasPage
export const getAllIdeasRoute = () => '/';

// ViewIdeaPage
export const viewIdeaRouteParams = getRouteParams({ title: true });
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;
export const getViewIdeaRoute = ({ title }: ViewIdeaRouteParams) => `/ideas/${title}`;

// EditIdeaPage
export const editIdeaRouteParams = getRouteParams({ title: true });
export type EditIdeaRouteParams = typeof editIdeaRouteParams;
export const getEditIdeaRoute = ({ title }: EditIdeaRouteParams) => `/ideas/${title}/edit`;

// NewIdeaPage
export const getNewIdeaRoute = () => '/ideas/new';

// SignUp
export const getSignUpRoute = () => '/sign-up';

// SignIn
export const getSignInRoute = () => '/sign-in';

// SignOut
export const getSignOutRoute = () => '/sign-out';

// EditUserPage
export const getEditUserRoute = () => '/edit-user';

// Not Found
export const getNotFoundRoute = () => '*';
