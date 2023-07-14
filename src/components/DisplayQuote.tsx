import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { FavoriteButton } from './FavoriteButton';
import { useFetchQuotes } from '../hooks/useFetchQuotes';
import { useQueryClient } from '@tanstack/react-query';

const Container = styled(View, { height: 256 })`mt6 mh2 ba`;
const QuoteText = styled(Text)`mt5 ml3`;
const Author = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

type Quote = {
  a: string;
  c: string;
  h: string;
  q: string;
};

export function DisplayQuote() {
  const { data: quotes, isLoading } = useFetchQuotes();
  const [quoteIndex, setQuoteIndex] = useState(0);
  // const [favorite, setFavorite] = useState(false);
  const queryClient = useQueryClient();

  const nextQuote = () => {
    setQuoteIndex(prevIndex => prevIndex + 1);
  };

  const prevQuote = () => {
    setQuoteIndex(prevIndex => prevIndex - 1);
  };

  const favoriteQuote = () => {
    console.log('clicked');
    // first run will be undefined, need to return quotes[quoteIndex] instead of adding it
    const existingFavorites: Quote[] | undefined = queryClient.getQueryData(['favoriteQuote']);
    console.log(existingFavorites);
    // if existingFavorites is undefined make updatedFavorites
    // an array with the quote that was favorited
    // if existingFavorites is Quote[] then add the new quote
    let updatedFavorites: Quote[];
    if (existingFavorites === undefined) {
      updatedFavorites = [quotes[quoteIndex]];
      console.log('updatedFavorites', updatedFavorites);
    } else {
      updatedFavorites = [...existingFavorites, quotes[quoteIndex]];
      console.log('else updatedFavorites', updatedFavorites);
    }
    // const updatedFavorites = existingFavorites ? existingFavorites.concat([quotes[quoteIndex]]) : [quotes[quoteIndex]];
    // console.log(updatedFavorites);
    queryClient.setQueryData(['favoriteQuote'], updatedFavorites);
  };

  const isPrevDisabled = quoteIndex === 0 ? true : false;
  // const isNextDisabled = quoteIndex === quotes.length - 1 ? true : false;
  const isNextDisabled = false;
  const isFavoriteDisabled = isLoading;

  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  return (
    <Container>
      <QuoteText>{quotes[quoteIndex].q}</QuoteText>
      <Author>- {quotes[quoteIndex].a}</Author>
      <ButtonsContainer>
        <QuoteNavigationButton type="back" onPress={prevQuote} disabled={isPrevDisabled} />
        <QuoteNavigationButton type="next" onPress={nextQuote} disabled={isNextDisabled} />
        <FavoriteButton type="Favorite" onPress={favoriteQuote} disabled={isFavoriteDisabled} />
      </ButtonsContainer>
    </Container>
  );
}
