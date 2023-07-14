import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';

const Container = styled(View, { height: 256 })`mt5 mh2 ba`;
const Quote = styled(Text)`mt5 ml3`;
const Author = styled(Text)`mt2 ml7`;
const ButtonsContainer = styled(View)`flx-row jcc mt4`;

export function DisplayFavoriteQuotes() {
  // const { data: favoriteQuote } = useQuery(['favoriteQuote']);
  // const favoriteQuote = true;
  const { data: favoriteQuote } = useQuery(['favoriteQuote'], () => {
    // perform query to retrieve favorite quote
    return fetch('/api/favoriteQuote')
      .then(res => res.json())
      .then(data => data.favoriteQuote);
  });
  const [quoteIndex, setQuoteIndex] = useState(0);
  console.log('favoriteQuote component', favoriteQuote);
  // console.log('0', favoriteQuote[0]);
  // console.log('0 filter', favoriteQuote[0].splice(0, 1));
  // console.log('1', favoriteQuote[1]);

  if (!favoriteQuote) {
    return <Text>No Favorite Quotes yet! </Text>;
  }

  // if (favoriteQuote[0].length > 1) {
  //   favoriteQuote[0].splice(0, 1);
  // }

  const nextQuote = () => {
    setQuoteIndex(prevIndex => prevIndex + 1);
  };

  const prevQuote = () => {
    setQuoteIndex(prevIndex => prevIndex - 1);
  };

  const isPrevDisabled = quoteIndex === 0 ? true : false;
  const isNextDisabled = false;

  return (
    <>
      {favoriteQuote && (
        <Container>
          <Quote>{favoriteQuote[quoteIndex].q}</Quote>
          <Author>{favoriteQuote[quoteIndex].a}</Author>
          <Text>test</Text>
          {/* bring in navigation buttons here */}
          <ButtonsContainer>
            <QuoteNavigationButton type="back" onPress={prevQuote} disabled={isPrevDisabled} />
            <QuoteNavigationButton type="next" onPress={nextQuote} disabled={isNextDisabled} />
          </ButtonsContainer>
        </Container>
      )}
    </>
  );
}
