import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { FavoriteButton } from '../FavoriteButton';

const onPress = jest.fn();

describe('<FavoriteButton />', () => {
  test('the button should have text Favorite', () => {
    render(<FavoriteButton type="Favorite" disabled={false} onPress={onPress} />);

    expect(screen.getByText('Favorite')).toBeTruthy();
  });

  test('onPress function should run when clicked', () => {
    render(<FavoriteButton type="Favorite" disabled={false} onPress={onPress} />);

    fireEvent.press(screen.getByText('Favorite'));

    expect(onPress).toBeCalledTimes(1);
  });
});
