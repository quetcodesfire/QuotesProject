import React from 'react';
import { Text, View } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { QuoteNavigationButton } from './QuoteNavigationButton';

const Container = styled(View)``;
const Quote = styled(Text)``;
const Author = styled(Text)``;

export function DisplayQuote() {
  const testQuotes = [
    {
      q: 'Lack of emotion causes lack of progress and lack of motivation.',
      a: 'Tony Robbins',
      i: 'https://zenquotes.io/img/tony-robbins.jpg',
      c: '63',
      h: '<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>'
    },
    {
      q: 'With great power comes great responsibility',
      a: 'Ben Parker',
      i: 'https://zenquotes.io/img/tony-robbins.jpg',
      c: '38',
      h: '<blockquote>&ldquo;With great power comes great responsibility&rdquo; &mdash; <footer>Ben Parker</footer></blockquote>'
    }
  ];

  return (
    <Container>
      <Quote>{testQuotes[1].q}</Quote>
      <Author>{testQuotes[1].a}</Author>
      <QuoteNavigationButton type="next" onPress={() => console.log('pressed')} />
    </Container>
  );
}
