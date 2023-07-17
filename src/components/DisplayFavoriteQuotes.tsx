import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { useQuoteIndex } from '../hooks/useQuoteIndex';

const Container = styled(View, { height: 288 })`mt5 mh2 ba`;
const Title = styled(Text)`flx-row asc mt4 f3`;
const Quote = styled(Text)`mt5 ml3`;
const Author = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

export function DisplayFavoriteQuotes() {
  const { data: favoriteQuote, isLoading } = useQuery(['favoriteQuote'], () => {
    // perform query to retrieve favorite quote
    return fetch('/api/favoriteQuote')
      .then(res => res.json())
      .then(data => data.favoriteQuote);
  });
  const { quoteIndex, nextQuote, prevQuote, isPrevDisabled, isNextDisabled } = useQuoteIndex(favoriteQuote);

  if (!favoriteQuote) {
    return <Text>No Favorite Quotes yet! </Text>;
  }

  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  return (
    <>
      {favoriteQuote && (
        <Container>
          <Title>Favorite Quotes</Title>
          <Quote>{favoriteQuote[quoteIndex].q}</Quote>
          <Author>- {favoriteQuote[quoteIndex].a}</Author>
          <ButtonsContainer>
            <QuoteNavigationButton type="back" onPress={prevQuote} disabled={isPrevDisabled} />
            <QuoteNavigationButton type="next" onPress={nextQuote} disabled={isNextDisabled} />
          </ButtonsContainer>
        </Container>
      )}
    </>
  );
}
