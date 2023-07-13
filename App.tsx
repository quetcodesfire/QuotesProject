import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DisplayQuote } from './src/components/DisplayQuote';
import { DisplayFavoriteQuotes } from './src/components/DisplayFavoriteQuotes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DisplayQuote />
      <DisplayFavoriteQuotes />
    </QueryClientProvider>
  );
};

export default App;
