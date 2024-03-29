const getURL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'fields=name,capital,population,flags,languages';

export async function fetchCountries(name) {
  const response = await fetch(`${getURL}${name}?${FIELDS}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Oops, there is no country with that name');
  }
}