import React from 'react'
import { render, screen } from '@testing-library/react-native';
import { QuoteNavigationButton } from '../QuoteNavigationButton';

const onPress = jest.fn();

describe('<QuoteNavigationButton />', () => {
  test('the button should have text Next', () => {
    render(<QuoteNavigationButton type="next" onPress={onPress} />);

    expect(screen.getByText('Next')).toBeTruthy();
  });

  test('the button should have text Previous', () => {
    render(<QuoteNavigationButton type="back" onPress={onPress} />);

    expect(screen.getByText('Previous')).toBeTruthy();
  });
});
