import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DisplayQuote } from '../DisplayQuote';

describe('<DisplayQuote />', () => {
  test('should display the quote and author', () => {
    render(<DisplayQuote />);

    expect(screen.getByText('With great power comes great responsibility')).toBeTruthy();
    expect(screen.getByText('Ben Parker')).toBeTruthy();
  });
});
