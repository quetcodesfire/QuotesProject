import React from 'react';
import { Button } from 'react-native';
import { BUTTONS } from '../constants/constants';

type FavoriteButtonProps = {
  type: string;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
};

export function FavoriteButton({ type = BUTTONS.FAVORITE, disabled = false, onPress }: FavoriteButtonProps) {
  const accessibilityLabelText = BUTTONS.FAVORITE_BUTTON;
  return <Button title={type} disabled={disabled} onPress={onPress} accessibilityLabel={accessibilityLabelText} />;
}
