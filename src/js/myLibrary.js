import regeneratorRuntime from 'regenerator-runtime';

import nothingHereUrl from '../images/nothingHere.jpg';

import localStorageApi from './localStorageApi';
import cardFilmsTpl from '../templates/card-films.hbs';

const getMovies = async idList => {
  const key = 'd91911ebb88751cf9e5c4b8fdf4412c9';

  const promises = idList.map(id => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => ({
        ...data,
        release_date: data.release_date.split('-')[0],
      }));
  });

  return await Promise.all(promises);
};

const CHOICE_STORAGE_BTN_NAME = 'storage-btn';
const refs = {
  storageList: document.querySelector('.js-choice-storage'),
  cardLibrary: document.querySelector('.js-card-library'),
};


renderMovies();

refs.storageList.addEventListener('change', renderMovies);

function renderMovies() {

  const key = getCheckedLiblary(CHOICE_STORAGE_BTN_NAME);
  const queueIds = localStorageApi.getMovies(key);

  if (queueIds.length) {
    getMovies(queueIds).then(renderMarkup);
  } else {
    refs.cardLibrary.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
  }
}
function getCheckedLiblary(name){
 return document.querySelector(`[name=${name}]:checked`).value;
}
function renderMarkup(moviesArray) {
  refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
}