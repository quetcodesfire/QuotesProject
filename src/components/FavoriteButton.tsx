import React from 'react';
import { Button } from 'react-native';

type FavoriteButtonProps = {
  type: string;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
};
export function FavoriteButton({ type = 'favorite', disabled = false, onPress }: FavoriteButtonProps) {
  const accessibilityLabelText = 'Favorite Button';
  return <Button title={type} disabled={disabled} onPress={onPress} accessibilityLabel={accessibilityLabelText} />;
}
