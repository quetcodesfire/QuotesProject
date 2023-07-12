import React from 'react';
import { Button } from 'react-native';
// import { styled } from '@shipt/react-native-tachyons';

type QuoteNavigationButtonProps = {
  type: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export function QuoteNavigationButton({ type, disabled = false, onPress }: QuoteNavigationButtonProps) {
  let titleText = '';
  let accessibilityLabelText = '';

  // add functionality to move to the next/previous quote in the array
  if (type === 'next') {
    titleText = 'Next';
    accessibilityLabelText = 'Next Button';
  } else if (type === 'back') {
    titleText = 'Previous';
    accessibilityLabelText = 'Back Button';
  }

  return <Button title={titleText} disabled={disabled} onPress={onPress} accessibilityLabel={accessibilityLabelText} />;
}
