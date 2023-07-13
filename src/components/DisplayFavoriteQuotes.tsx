import React from 'react';
import { Text, View } from 'react-native';
// import { useQuery } from '@tanstack/react-query';

export function DisplayFavoriteQuotes() {
  // const { data: favoriteQuote } = useQuery(['favoriteQuote']);
  const favoriteQuote = true;
  if (!favoriteQuote) {
    return <Text>No Favorite Quotes yet! </Text>;
  }

  return (
    <View>
      <Text>Quotes will be here soon!</Text>
      {/* <Text>{favoriteQuote.q}</Text>
      <Text>{favoriteQuote.a}</Text> */}
    </View>
  );
}
