import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { QuoteNavigationButton } from '../QuoteNavigationButton';

const onPress = jest.fn();

describe('<QuoteNavigationButton />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('the button should have text Next', () => {
    render(<QuoteNavigationButton type="next" onPress={onPress} />);

    expect(screen.getByText('Next')).toBeTruthy();
  });

  test('the button should have text Previous', () => {
    render(<QuoteNavigationButton type="back" onPress={onPress} />);

    expect(screen.getByText('Previous')).toBeTruthy();
  });

  test('the onPress function should run when the next button is clicked', () => {
    render(<QuoteNavigationButton type="next" onPress={onPress} />);

    fireEvent.press(screen.getByText('Next'));

    expect(onPress).toBeCalledTimes(1);
  });

  test('the onPress function should run when the previous button is clicked', () => {
    render(<QuoteNavigationButton type="back" onPress={onPress} />);

    fireEvent.press(screen.getByText('Previous'));

    expect(onPress).toBeCalledTimes(1);
  });
});
