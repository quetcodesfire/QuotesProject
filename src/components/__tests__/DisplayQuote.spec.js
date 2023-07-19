import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { DisplayQuote } from '../DisplayQuote';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query/';
import { BUTTONS } from '../../constants/constants';

jest.mock('../../hooks/useFetchQuotes', () => ({
  useFetchQuotes: () => ({
    data: [
      { q: 'Test Quote 1', a: 'Test Author 1' },
      { q: 'Test Quote 2', a: 'Test Author 2' }
    ]
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

  test('should display a quote and author when the page is rendered', () => {
    renderComponent();

    expect(screen.getByText('Test Quote 1')).toBeTruthy();
    expect(screen.getByText('- Test Author 1')).toBeTruthy();
  });

  test('the next and previous quote button should navigate correctly', async () => {
    renderComponent();

    await fireEvent.press(screen.getByText(BUTTONS.NEXT));

    expect(screen.getByText('Test Quote 2')).toBeTruthy();
    expect(screen.getByText('- Test Author 2')).toBeTruthy();

    await fireEvent.press(screen.getByText(BUTTONS.PREVIOUS));

    expect(screen.getByText('Test Quote 1')).toBeTruthy();
    expect(screen.getByText('- Test Author 1')).toBeTruthy();
  });
  test('should add a quote to favorites if the favorite button is pressed', async () => {
    renderComponent();

    await fireEvent.press(screen.getByText(BUTTONS.FAVORITE));
    const favoriteQuotes = await queryClient.getQueryData(['favoriteQuote']);

    expect(favoriteQuotes).toHaveLength(1);
    expect(favoriteQuotes[0].q).toEqual('Test Quote 1');
    expect(favoriteQuotes[0].a).toEqual('Test Author 1');
    console.log('favoriteQuotes', favoriteQuotes);
    await fireEvent.press(screen.getByText(BUTTONS.NEXT));

    await fireEvent.press(screen.getByText(BUTTONS.FAVORITE));
    // need to figure out a way to update favoriteQuotes to update when a new quote is added
    const favoriteQuotes2 = await queryClient.getQueryData(['favoriteQuote']);
    screen.debug(null, Number.MAX_SAFE_INTEGER);
    expect(favoriteQuotes2).toHaveLength(2);
    console.log('favoriteQuotes2', favoriteQuotes2);
    expect(favoriteQuotes2[1].q).toEqual('Test Quote 2');
    expect(favoriteQuotes2[1].a).toEqual('Test Author 2');
  });
});
