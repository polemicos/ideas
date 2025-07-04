import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppContextProvider } from './lib/ctx';
import * as r from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPages } from './pages/AllIdeasPage';
import { EditIdeaPage } from './pages/EditIdeaPage';
import { EditUserPage } from './pages/EditUserPage';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { SignUpPage } from './pages/SignUpPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={r.getSignOutRoute()} element={<SignOutPage />} />
              <Route path={r.getAllIdeasRoute()} element={<AllIdeasPages />} />
              <Route path={r.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={r.getEditIdeaRoute(r.editIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path={r.getViewIdeaRoute(r.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={r.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={r.getSignInRoute()} element={<SignInPage />} />
              <Route path={r.getEditUserRoute()} element={<EditUserPage />} />
              <Route path={r.getNotFoundRoute()} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
