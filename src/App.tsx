import React from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';
import Main from './pages/Main';
import Style from './styles/styles';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
    <Style />
  </QueryClientProvider>
);

export default App;
