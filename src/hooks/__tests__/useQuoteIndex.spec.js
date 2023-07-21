import { act, renderHook } from '@testing-library/react-native';
import { useQuoteIndex } from '../useQuoteIndex';

describe('useQuoteIndex', () => {
  const mockQuotes = [
    { q: 'Test Quote 1', a: 'Test Author 1' },
    { q: 'Test Quote 2', a: 'Test Author 2' },
    { q: 'Test Quote 3', a: 'Test Author 3' }
  ];

  it('should return initial quote index and disabled states', () => {
    const { result } = renderHook(() => useQuoteIndex(mockQuotes));

    expect(result.current.quoteIndex).toBe(0);
    expect(result.current.isPrevDisabled).toBe(true);
    expect(result.current.isNextDisabled).toBe(false);
  });

  it('should update quote index and disabled states on nextQuote and prevQuote', () => {
    const { result } = renderHook(() => useQuoteIndex(mockQuotes));

    act(() => {
      result.current.nextQuote();
    });

    expect(result.current.quoteIndex).toBe(1);
    expect(result.current.isPrevDisabled).toBe(false);
    expect(result.current.isNextDisabled).toBe(false);

    act(() => {
      result.current.nextQuote();
    });

    expect(result.current.quoteIndex).toBe(2);
    expect(result.current.isPrevDisabled).toBe(false);
    expect(result.current.isNextDisabled).toBe(true);

    act(() => {
      result.current.prevQuote();
      result.current.prevQuote();
    });

    expect(result.current.quoteIndex).toBe(0);
    expect(result.current.isPrevDisabled).toBe(true);
    expect(result.current.isNextDisabled).toBe(false);
  });
});
