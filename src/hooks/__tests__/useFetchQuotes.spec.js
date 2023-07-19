import { renderHook } from '@testing-library/react-native';
import axios from 'axios';
import { useFetchQuotes } from '../useFetchQuotes';

jest.mock('axios');

describe('useFetchQuotes', () => {
  it('should fetch quotes from the API', async () => {
    // Set up mock response from the API
    const mockResponse = [
      { q: 'Test Quote 1', a: 'Test Author 1' },
      { q: 'Test Quote 2', a: 'Test Author 2' }
    ];
    axios.get.mockResolvedValue({ data: mockResponse });

    // Call the hook
    const { result, waitForNextUpdate } = renderHook(() => useFetchQuotes());

    // Check that isLoading is true initially
    expect(result.current.isLoading).toBe(true);

    // // // Wait for the hook to finish loading
    await waitForNextUpdate();

    // // // Check that isLoading is now false
    expect(result.current.isLoading).toBe(false);

    // // // Check that the data returned from the API is correct
    expect(result.current.data).toEqual(mockResponse);
  });
});
