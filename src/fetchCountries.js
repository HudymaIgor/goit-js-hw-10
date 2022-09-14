'use strict'

const BASE_URL = 'https://restcountries.com/v3.1/name';
  
export function fetchCountries(countryQuery) {

  return fetch(`${BASE_URL}/${countryQuery}?fields=name.official,capital,population,flags.svg,languages/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}
