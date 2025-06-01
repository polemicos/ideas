import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPages } from './pages/AllIdeasPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPages/>}/>
          <Route path={getViewIdeaRoute({ideaNick: ':ideaNick'})} element={<ViewIdeaPage/>}/>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
