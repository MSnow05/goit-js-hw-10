import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notflix from 'notiflix';

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
                showNotification('Too many matches found. Please enter a more specific name.');
            } else if (data.length >= 2 && data.length <= 10) {
                displayCountryList(data);
            } else if (data.length === 1) {
                displayCountryInfo(data[0]);
            } else {
                showNotification('Oops, there is no country with that name');
            }
        })
        .catch(error => {
            showNotification('Error fetching data. Please try again.');
            console.error('Error handling search:', error);
        });
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
        <img src="${country.flags.svg}" alt="${country.name.official}"/>
        <h2>${country.name.official}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages.join(', ')}</p>
    `;
    countryInfo.appendChild(countryCard);
}

function showNotification(message) {
    Notiflix.Notify.Failure(message);
}