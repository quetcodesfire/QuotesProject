import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { FavoriteButton } from './FavoriteButton';
import { useFetchQuotes } from '../hooks/useFetchQuotes';
import { useQueryClient } from '@tanstack/react-query';

const Container = styled(View, { height: 256 })`mt7 mh2 ba`;
const Quote = styled(Text)`mt5 ml3`;
const Author = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

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
    // setFavorite(true);
    queryClient.setQueryData(['favoriteQuote'], quotes[quoteIndex]);
    console.log('this quote is a favorite');
  };

  const isPrevDisabled = quoteIndex === 0 ? true : false;
  const isNextDisabled = quoteIndex === quotes.length - 1 ? true : false;
  // const isNextDisabled = false;
  const isFavoriteDisabled = isLoading;
  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  return (
    <Container>
      <Quote>{quotes[quoteIndex].q}</Quote>
      <Author>- {quotes[quoteIndex].a}</Author>
      <ButtonsContainer>
        <QuoteNavigationButton type="back" onPress={prevQuote} disabled={isPrevDisabled} />
        <QuoteNavigationButton type="next" onPress={nextQuote} disabled={isNextDisabled} />
        <FavoriteButton type="Favorite" onPress={favoriteQuote} disabled={isFavoriteDisabled} />
      </ButtonsContainer>
    </Container>
  );
}
