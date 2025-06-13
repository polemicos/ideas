import type { TrpcRouterOutput } from '@devpont/backend/src/router/router';
import { createContext, useContext } from 'react';
import { trpc } from './trpc';

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me'];
};

const AppContext = createContext<AppContext>({
  me: null,
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();
  return (
    <AppContext.Provider
      value={{
        me: data?.me || null,
      }}
    >
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <p>{children}</p>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
