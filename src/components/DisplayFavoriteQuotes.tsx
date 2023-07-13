import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';

export function DisplayFavoriteQuotes() {
  const { data: favoriteQuote } = useQuery('favoriteQuote');

  if (!favoriteQuote) {
    return <Text>No Favorite Quotes yet! </Text>;
  }

  return (
    <View>
      <Text>{favoriteQuote.q}</Text>
      <Text>{favoriteQuote.a}</Text>
    </View>
  );
}
