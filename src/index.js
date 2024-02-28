import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');
const countryInfo = document.getElementById('country-info');

searchBox.addEventListener('input', debounce(handleSearch, 300));

function handleSearch() {
    const searchTerm = searchBox.value.trim();

    if (searchTerm === '') {
        clearResults();
        return;
    }

    fetchCountries(searchTerm)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } if (data.length >= 2 && data.length <= 10) {
                return displayCountryList(data);
            } if (data.length === 1) {
               return displayCountryInfo(data[0]);
            } if(data.status === 404){
                Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
            }
        })
    }
function clearResults() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function displayCountryList(countries) {
    clearResults();

    countries.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.classList.add('country-item');
        countryItem.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}"/>${country.name.official}`;
        
        countryList.appendChild(countryItem);
    });
}

function displayCountryInfo(country) {
    console.log(`Displaying country info:`, country);
    clearResults();
    const countryCard = document.createElement('div');
    countryCard.innerHTML = `
        <h1><img src="${country.flags.svg}" alt="${country.name.official}" width="24px"/><h1>
        <h2>${country.name.official}</h2>
        <div><p>Capital: ${country.capital}</p></div>
        <div><p>Population: ${country.population}</p></div>
        <div><p>Languages: ${Array.isArray(country.languages) ? country.languages.join(', ') : JSON.stringify(country.languages)}</p></div>
    `;
    countryInfo.appendChild(countryCard);
}