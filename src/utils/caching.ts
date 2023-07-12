import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function getQuotes() {
  return await axios.get('https://zenquotes.io/api/quotes').then(response => {
    return response.data;
  });
}

// I only want to call this one time and not every time the app is ran
// look into using useEffect and having it only run if the cache is updated
export async function storeOriginalQuotes() {
  const originalQuotes = await getQuotes();
  // every quote gets a key of {quote-{i}} with i being index
  const keyValuePairs = originalQuotes.map((quote: Object, index: Number) => [
    `quotes-${index}`,
    JSON.stringify(quote)
  ]);
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (e) {
    console.log(e);
  }
}

// convert this to store one quote and call it storeNewQuote
export async function storeNewQuote() {
  const originalQuotes = await getQuotes();
  const JSONOriginalQuotes = JSON.stringify(originalQuotes);
  try {
    await AsyncStorage.setItem('originalQuotes', JSONOriginalQuotes);
  } catch (e) {
    console.log(e);
  }
}

// need to add function to grab all quotes from AsyncStorage
// also need to see if it's possible to create multiple cache's
// if not I could differentiate by keys
