import React from 'react';
import { Button } from 'react-native';
import { BUTTONS } from '../constants/constants';

type QuoteNavigationButtonProps = {
  type: string;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
};

export function QuoteNavigationButton({ type, disabled = false, onPress }: QuoteNavigationButtonProps) {
  let titleText = '';
  let accessibilityLabelText = '';

  if (type === 'next') {
    titleText = `${BUTTONS.NEXT}`;
    accessibilityLabelText = `${BUTTONS.NEXT_BUTTON}`;
  } else if (type === 'back') {
    titleText = `${BUTTONS.PREVIOUS}`;
    accessibilityLabelText = `${BUTTONS.BACK_BUTTON}`;
  }

  return <Button title={titleText} disabled={disabled} onPress={onPress} accessibilityLabel={accessibilityLabelText} />;
}
