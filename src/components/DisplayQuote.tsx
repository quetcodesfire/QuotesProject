import React from 'react';
import { Text, View } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';
import { useFetchQuotes } from '../hooks/useFetchQuotes';

const Container = styled(View)`mt7 mh2 ba`;
const Quote = styled(Text)`mt3 ml3`;
const Author = styled(Text)`mt2 ml7`;

export function DisplayQuote() {
  const { data: quotes, isLoading } = useFetchQuotes();
  console.log(quotes);

  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  return quotes?.map(quote => (
    <Container>
      <Quote>{quote.q}</Quote>
      <Author>- {quote.a}</Author>
      <QuoteNavigationButton type="next" onPress={() => console.log('pressed next')} />
    </Container>
  ));
}
