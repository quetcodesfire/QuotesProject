import { useState } from 'react';

type Quote = {
  a: string;
  c: string;
  h: string;
  q: string;
};

export const useQuoteIndex = (quotes: Quote[] | undefined) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex(prevIndex => prevIndex + 1);
  };

  const prevQuote = () => {
    setQuoteIndex(prevIndex => prevIndex - 1);
  };

  const isPrevDisabled = quoteIndex === 0 ? true : false;
  const isNextDisabled = quoteIndex === (quotes?.length ?? 0) - 1 ? true : false;

  return { quoteIndex, nextQuote, prevQuote, isPrevDisabled, isNextDisabled };
};
