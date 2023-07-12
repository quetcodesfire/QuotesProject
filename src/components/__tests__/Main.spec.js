import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Main } from '../Main';

describe('<Main />', () => {
  test('should render', () => {
    render(<Main />);

    expect(screen.getByText('quotes')).toBeTruthy();
  });
});
