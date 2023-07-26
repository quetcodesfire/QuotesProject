import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { useQuoteIndex } from '../hooks/useQuoteIndex';
import { DISPLAY_FAVORITE_QUOTES } from '../constants/constants';
import { Quote } from '../types/models';
import { FavoriteButton } from './FavoriteButton';

const Container = styled(View, { height: 288 })`mt5 mh2 ba`;
const Title = styled(Text)`flx-row asc mt4 f3`;
const QuoteText = styled(Text)`mt5 ml3`;
const AuthorText = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

export function DisplayFavoriteQuotes() {
  const { data: favoriteQuote } = useQuery(['favoriteQuote'], () => {
    return fetch('/api/favoriteQuote')
      .then(res => res.json())
      .then(data => data.favoriteQuote);
  });
  const { quoteIndex, nextQuote, prevQuote, isPrevDisabled, isNextDisabled } = useQuoteIndex(favoriteQuote);
  const queryClient = useQueryClient();

  const unFavoriteQuote = async () => {
    const existingFavorites: Quote[] | undefined = favoriteQuote;
    let updatedFavorites: Quote[];
    if (existingFavorites !== undefined) {
      const filteredFavorites = existingFavorites.filter(quote => quote.q !== favoriteQuote[quoteIndex].q);
      updatedFavorites = filteredFavorites;
      console.log('updatedFavorites', updatedFavorites);
      await queryClient.setQueryData(['favoriteQuote'], updatedFavorites);
    }
  };

  return (
    <Container>
      <Title>{DISPLAY_FAVORITE_QUOTES.TITLE}</Title>
      {!favoriteQuote && <Text>{DISPLAY_FAVORITE_QUOTES.NO_FAVORITES}</Text>}
      {favoriteQuote && (
        <>
          <QuoteText>{favoriteQuote[quoteIndex].q}</QuoteText>
          <AuthorText>- {favoriteQuote[quoteIndex].a}</AuthorText>
          <ButtonsContainer>
            <QuoteNavigationButton type="back" onPress={prevQuote} disabled={isPrevDisabled} />
            <QuoteNavigationButton type="next" onPress={nextQuote} disabled={isNextDisabled} />
            <FavoriteButton type="Unfavorite" onPress={unFavoriteQuote} disabled={false} />
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
}
