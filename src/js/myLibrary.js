import regeneratorRuntime from 'regenerator-runtime';
import createTrailerLink from './trailers.js';
import nothingHereUrl from '../images/nothingHere.jpg';
import placeholder from './spinner';
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
const USER_POINT_STORAGE_NAME = 'user';

const refs = {
  storageList: document.querySelector('.js-choice-storage'),
  cardLibrary: document.querySelector('.js-card-library'),
};

getCurrentLibrary();
renderMovies();

refs.storageList.addEventListener('change', renderMovies);

function renderMovies() {
    
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  refs.cardLibrary.dataset.library = key;
  saveCurrentLibrary(key);

  if (idList.length) {
    placeholder.spinner.show();
    getMovies(idList).then(moviesArray => {
      renderMarkup(moviesArray);
      placeholder.spinner.close();
    });
  } else {
    refs.cardLibrary.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
  }
}
function getCheckedLiblary() {
  return document.querySelector(`[name=${CHOICE_STORAGE_BTN_NAME}]:checked`).value;
}
function renderMarkup(moviesArray) {
  refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
  createTrailerLink();
}

function getCurrentLibrary() { 
  const userPoint = localStorageApi.load(USER_POINT_STORAGE_NAME);
  if (userPoint) {
    document.querySelector(`[value="${userPoint.currentLibrary}"]`).checked = true;
   }
}
function saveCurrentLibrary(currentLibrary) { 
  localStorageApi.save(USER_POINT_STORAGE_NAME, { currentLibrary });
}
