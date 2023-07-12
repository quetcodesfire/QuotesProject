import AsyncStorage from '@react-native-async-storage/async-storage';
import { getQuotes, storeOriginalQuotes } from '../caching'

jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        { quote: 'First Quote', author: 'First author' },
        { quote: 'Second Quote', author: 'Second author' }
      ]
    })
  )
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  multiSet: jest.fn(),
  getItem: jest.fn()
}));

describe('getQuotes', () => {
  test('should return an array of quotes', async () => {
    const response = await getQuotes();
    expect(response).toEqual([
      { quote: 'First Quote', author: 'First author' },
      { quote: 'Second Quote', author: 'Second author' }
    ]);
  });
});

describe('storeOriginalQuotes', () => {
  test.skip('quotes can be saved to cache', async () => {
    await storeOriginalQuotes();

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      ['quotes-0', JSON.stringify({ quote: 'First Quote', author: 'First author' })],
      ['quotes-1', JSON.stringify({ quote: 'Second Quote', author: 'Second author' })]
    ]);
  });

});
