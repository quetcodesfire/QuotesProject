import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { DisplayFavoriteQuotes } from '../DisplayFavoriteQuotes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BUTTONS, DISPLAY_FAVORITE_QUOTES } from '../../constants/constants';

const mockUseQuery = jest.spyOn(require('@tanstack/react-query'), 'useQuery').mockReturnValue({
  isLoading: false,
  error: {},
  data: [
    { q: 'Test Quote 1', a: 'Test Author 1' },
    { q: 'Test Quote 2', a: 'Test Author 2' }
  ]
});

const queryClient = new QueryClient();
describe('<DisplayFavoriteQuotes />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DisplayFavoriteQuotes />
      </QueryClientProvider>
    );
  };

  test('it should display favorite quotes', () => {
    renderComponent();

    expect(screen.getByText(DISPLAY_FAVORITE_QUOTES.TITLE)).toBeTruthy();
    expect(screen.getByText('Test Quote 1')).toBeTruthy();
    expect(screen.getByText('- Test Author 1')).toBeTruthy();
  });

  test('it should be able to navigate between quotes', () => {
    renderComponent();

    fireEvent.press(screen.getByText(BUTTONS.NEXT));

    expect(screen.getByText('Test Quote 2')).toBeTruthy();
    expect(screen.getByText('- Test Author 2')).toBeTruthy();

    fireEvent.press(screen.getByText(BUTTONS.PREVIOUS));

    expect(screen.getByText('Test Quote 1')).toBeTruthy();
    expect(screen.getByText('- Test Author 1')).toBeTruthy();
  });

  test('it should display a message if there are no favorite quotes', () => {
    mockUseQuery.mockReturnValueOnce({
      isLoading: true,
      error: {}
    });
    renderComponent();

    expect(screen.getByText(DISPLAY_FAVORITE_QUOTES.TITLE)).toBeTruthy();
    expect(screen.getByText(DISPLAY_FAVORITE_QUOTES.NO_FAVORITES)).toBeTruthy();
  });
});
