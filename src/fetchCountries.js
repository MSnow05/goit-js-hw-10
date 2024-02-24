export default function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const FIELDS = 'fields=name,capital,population,flags,languages';

  return fetch(url)
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching data:', error);
          throw error;
      });
}