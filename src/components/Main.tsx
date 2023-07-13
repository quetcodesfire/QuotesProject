import React from 'react';
import { AddQuoteForm } from './AddQuote';
import { DisplayQuote } from './DisplayQuote';

export function Main() {
  return (
    <>
      <DisplayQuote />
      <AddQuoteForm />
    </>
  );
}