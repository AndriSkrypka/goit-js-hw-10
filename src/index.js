import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const refsAll = {
  input: document.querySelector('#search-box'),
  DEBOUNCE_DELAY: 300,
  list: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};
refsAll.input.addEventListener(
  'input',
  debounce(onInput, refsAll.DEBOUNCE_DELAY)
);

function onInput(elem) {
  const quary = elem.target.value.trim();
  refsAll.box.innerHTML = '';
  refsAll.list.innerHTML = '';
  if (quary === '') {
    return;
  }

  fetchCountries(quary)
    .then(createMakpUp)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createList(array) {
  return array
    .map(item => {
      return `<li class="country-item"><img class="country-img" src="${item.flags.svg}" alt="${item.name}" width="60"> <p class="country-title">${item.name}</pc></li>`;
    })
    .join('');
}

function createCountyCard(array) {
  return `<h2 class="title">
            <img class="box-img" src="${array[0].flags.svg}" alt="${
    array[0].name
  }" width="60">${array[0].name}
          </h2>
          <p class="text"> <span class="forhand">Capital: </span>${
            array[0].capital
          }</p>
          <p class="text"> <span class="forhand">Population: </span>${
            array[0].population
          }</p>
            <p class="text"> <span class="forhand">Languages: </span>${array[0].languages
              .map(item => item.name)
              .join(' ,')}</p>`;
}

function createMakpUp(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2 && data.length <= 10) {
    refsAll.box.innerHTML = '';
    refsAll.list.innerHTML = createList(data);
  } else {
    refsAll.list.innerHTML = '';
    refsAll.box.innerHTML = createCountyCard(data);
  }
}
