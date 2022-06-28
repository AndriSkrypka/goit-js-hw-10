export function fetchCountries(name) {
  const options = '?fields=name,capital,flags,languages,population';
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const itemToFind = `${BASE_URL}${name}${options}`;
  return fetch(itemToFind).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
