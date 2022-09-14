import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryInfo from './countryInfo.hbs';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInf = document.querySelector('.country-info');

const onInputEl = debounce(() => {
    const countryQuery = inputEl.value.trim();
    if (countryQuery === "") {
        return
    }

 fetchCountries(countryQuery)
     .then(data => {

//    countryInf.innerHTML = countryInfo(data)
         
            console.log(data);
                if (data.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
                }
        })
        .catch(err => {
            // console.log(err)
            if (err.message === '404') {
                Notiflix.Notify.info("Oops, there is no country with that name");
            }
        });
        console.log(countryQuery)
    }, DEBOUNCE_DELAY);

inputEl.addEventListener('input', onInputEl);



