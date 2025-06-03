import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams } from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPages } from './pages/AllIdeasPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPages />} />
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
