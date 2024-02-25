const getURL = 'https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages';

export async function fetchCountries(name) {
  const response = await fetch(`${getURL}${name}?${FIELDS}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Country not found');
  }
}