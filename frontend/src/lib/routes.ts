const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({
      ...acc,
      [key]: `:${key}`,
    }),
    {}
  ) as Record<keyof T, string>;
};

// Routes
export const getAllIdeasRoute = () => '/';

// ViewIdeaPage
export const viewIdeaRouteParams = getRouteParams({ title: true });
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;
export const getViewIdeaRoute = ({ title }: ViewIdeaRouteParams) => `/ideas/${title}`;

// NewIdeaPage
export const getNewIdeaRoute = () => '/ideas/new';

// SignUp
export const getSignUpRoute = () => '/sign-up';

// SignIn
export const getSignInRoute = () => '/sign-in';
