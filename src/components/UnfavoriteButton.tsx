import React from 'react';
import { Button } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UnfavoriteButtonProps = {
  id: number;
};
// Takes in ID to find quote
export function UnfavoriteButton({ id }: UnfavoriteButtonProps) {
  // const queryClient = useQueryClient();
  // use mutation to find quote by ID /api/favoriteQuote/${id}

  function handlePress() {
    console.log('unfavorite');
    console.log(`/api/favoriteQuote/${id}`);
    // run mutation
  }

  return <Button title="Unfavorite" onPress={handlePress} />;
}
