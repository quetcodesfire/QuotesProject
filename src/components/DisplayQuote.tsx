import React from 'react';
import { Text, View } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { FavoriteButton } from './FavoriteButton';
import { useFetchQuotes } from '../hooks/useFetchQuotes';
import { useQueryClient } from '@tanstack/react-query';
import { useQuoteIndex } from '../hooks/useQuoteIndex';
import { DISPLAY_QUOTES } from '../constants/constants';
import { Quote } from '../types/models';

const Container = styled(View, { height: 288 })`mt6 mh2 ba`;
const Title = styled(Text)`flx-row asc mt4 f3`;
const QuoteText = styled(Text)`mt5 ml3`;
const Author = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

export function DisplayQuote() {
  const queryClient = useQueryClient();
  const { data: quotes, isLoading } = useFetchQuotes();
  const { quoteIndex, nextQuote, prevQuote, isPrevDisabled, isNextDisabled } = useQuoteIndex(quotes);

  const favoriteQuote = () => {
    const existingFavorites: Quote[] | undefined = queryClient.getQueryData(['favoriteQuote']);
    let updatedFavorites: Quote[];
    if (existingFavorites === undefined) {
      updatedFavorites = [quotes[quoteIndex]];
    } else {
      updatedFavorites = [...existingFavorites, quotes[quoteIndex]];
    }
    queryClient.setQueryData(['favoriteQuote'], updatedFavorites);
  };

  const isFavoriteDisabled = isLoading;

  return (
    <Container>
      <Title>{DISPLAY_QUOTES.TITLE}</Title>
      {isLoading && <Text>{DISPLAY_QUOTES.LOADING}</Text>}
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
