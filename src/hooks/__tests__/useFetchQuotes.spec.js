import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchQuotes } from '../useFetchQuotes';

const mockResponse = [
  { q: 'Test Quote 1', a: 'Test Author 1' },
  { q: 'Test Quote 2', a: 'Test Author 2' }
];

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockResponse }))
}));

describe('useFetchQuotes', () => {
  it('should fetch quotes from the API', async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useFetchQuotes(), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    });

    expect(result.current.isLoading).toBe(true);

    jest.mock('@tanstack/react-query', () => {
      const original = jest.requireActual('@tanstack/react-query');
      return {
        ...original,
        useQuery: () => ({ isLoading: false, error: {}, data: [] })
      };
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockResponse);
  });
});
