import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// type FetchedQuotes = Promise<Quote[]>;

export const useFetchQuotes = () => {
  return useQuery(['originalQuotes'], async () => {
    const response = await axios.get('https://zenquotes.io/api/quotes');
    return response.data;
  });
};
