
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

export function renderNotification(message, priority) {
    notiflix.Notify.failure(message);
    if (message.includes('404')) {
        notiflix.Notify.failure('Oops, there is no country with that name');
    }
}
function renderCountries(countries) {
  if (countries.length > 100) {
      renderNotification('Too many matches found. Please enter a more specific name.', 'info');
  } else if (countries.length >= 2) {
      list.innerHTML = '';
      renderCountries(countries);
  } else if (countries.length === 1) {
      renderCountryInfo(countries[0]);
      list.innerHTML = '';
  } else if (countries.length === 0) {
      renderNotification('Oops, there is no country with that name', 'warning');
  } else {
      list.innerHTML = '';
      renderCountries(countries);
  }
}
function renderCountryInfo(country) {
  const infoContainer = document.createElement('div');
  infoContainer.className = 'country-info';
  
  const flag = document.createElement('img');
  flag.src = `${country.flags.svg}?width=30`;
  flag.alt = `${country.name.official} flag`;
  
  const name = document.createElement('h2');
  name.textContent = `Name: ${country.name.official}`;
  
  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital}`;
  
  const population = document.createElement('p');
  population.textContent = `Population: ${country.population.toLocaleString()}`;
  
  const languages = document.createElement('p');
  languages.textContent = `Languages: ${country.languages.join(', ')}`;
  
  infoContainer.appendChild(flag);
  infoContainer.appendChild(name);
  infoContainer.appendChild(capital);
  infoContainer.appendChild(population);
  infoContainer.appendChild(languages);
  document.body.appendChild(infoContainer);
}
