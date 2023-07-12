import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DisplayQuote } from './src/components/DisplayQuote';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DisplayQuote />
    </QueryClientProvider>
  );
};

export default App;
