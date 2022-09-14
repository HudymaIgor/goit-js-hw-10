import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryInfo from './templates/countryInfo.hbs';
import countryList from './templates/countryList.hbs';

import { create } from 'handlebars';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryLst = document.querySelector('.country-list');
const countryInf = document.querySelector('.country-info');

const onInputEl = debounce(() => {
    const countryQuery = inputEl.value.trim();
    
    if (countryQuery === "") {
        countryInf.innerHTML = '';
        countryLst.innerHTML = '';
        return
    }
 fetchCountries(countryQuery)
     .then(data => {
                if (data.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
                } else if (data.length >=2) { 
                    countryLst.innerHTML = countryList(data);
                    countryInf.innerHTML = '';

                } else {        
   data[0].languages = Object.values(data[0].languages).join(', ');
                    countryInf.innerHTML = countryInfo(data);
                    countryLst.innerHTML = '';
                }
        })
        .catch(err => {
            if (err.message === '404') {
                Notiflix.Notify.failure("Oops, there is no country with that name");
            } 
        });
    }, DEBOUNCE_DELAY);

inputEl.addEventListener('input', onInputEl);



