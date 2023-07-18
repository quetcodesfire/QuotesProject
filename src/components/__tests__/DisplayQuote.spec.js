import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DisplayQuote } from '../DisplayQuote';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query/';
import { useFetchQuotes } from '../../hooks/useFetchQuotes';

jest.mock('../../hooks/useFetchQuotes', () => ({
  useFetchQuotes: () => ({
    data: [
      { q: 'Test Quote 1', a: 'Test Author 1' },
      { q: 'Test Quote 2', a: 'Test Author 2' }
    ],
    isLoading: false
  })
}));

jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: () => ({ isLoading: false, error: {}, data: [] })
  };
});

const queryClient = new QueryClient();

describe('<DisplayQuote />', () => {
  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DisplayQuote />
      </QueryClientProvider>
    );
  };

  test('should display the quote and author', () => {
    renderComponent();

    expect(screen.getByText('Test Quote 1')).toBeTruthy();
    expect(screen.getByText('- Test Author 1')).toBeTruthy();
  });
  test('should return an array with one quote if existingFavorites is undefined', () => {});
  test('should add new quote to existing favorite quotes', () => {});
  test('should display loading text if quotes are loading', () => {});
  test('should move to the next quote if the  next button is pressed', () => {});
  test('should move to the previous quote if the previous button is pressed', () => {});
  test('should add a quote to favorites if the favorite button is pressed', () => {});
});
