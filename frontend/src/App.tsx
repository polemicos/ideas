import { TrpcProvider } from './lib/trpc';
import { AllIdeasPages } from './pages/AllIdeasPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPages />
    </TrpcProvider>
  );
};
