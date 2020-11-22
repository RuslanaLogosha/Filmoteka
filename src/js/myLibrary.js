import regeneratorRuntime from 'regenerator-runtime';
import createTrailerLink from './trailers.js';
import nothingHereUrl from '../images/nothingHere.jpg';
import placeholder from './spinner';
import localStorageApi from './localStorageApi';
import cardFilmsTpl from '../templates/card-films.hbs';
import { renderPagination } from './pagination';

const CHOICE_STORAGE_BTN_NAME = 'storage-btn';
const USER_POINT_STORAGE_NAME = 'user';

const idArray = localStorageApi.getMovies(getCheckedLiblary());
const totalLibPages = Math.ceil(
  localStorageApi.getMovies(getCheckedLiblary()).length / 20,
);
const libPages = [];

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

const refs = {
  storageList: document.querySelector('.js-choice-storage'),
  cardLibrary: document.querySelector('.js-card-library'),
};

getCurrentLibrary();
renderMovies();
fetchDataOfLibFilms();

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
  return document.querySelector(`[name=${CHOICE_STORAGE_BTN_NAME}]:checked`)
    .value;
}
function renderMarkup(moviesArray) {
  refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
  createTrailerLink();
}

function getCurrentLibrary() {
  const userPoint = localStorageApi.load(USER_POINT_STORAGE_NAME);
  if (userPoint) {
    document.querySelector(
      `[value="${userPoint.currentLibrary}"]`,
    ).checked = true;
  }
}
function saveCurrentLibrary(currentLibrary) {
  localStorageApi.save(USER_POINT_STORAGE_NAME, { currentLibrary });
}

// pagination

for (let i = 0; i <= totalLibPages; i += 20) {
  libPages.push(i / 20);
}

// renders main (first) page = renderMovies

// function for insertion of markup = renderMarkup(moviesArray)

// renders movies by appropriate page
function displayLibList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchLibFilmsByPage(page).catch(err => {
    console.log('error in function displayList');
    listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
  });
}

// fetches movies by appropriate page
function fetchLibFilmsByPage(page) {
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  console.log(idList);
  console.log(page);
  console.log(idList.slice(20, 40));

  const requiredPageIdList = idList.slice(
    (page - 1) * 20,
    (page - 1) * 20 + 20,
  );

  console.log(requiredPageIdList);

  placeholder.spinner.show();
  return getMovies(requiredPageIdList).then(moviesArray => {
    renderMarkup(moviesArray);
    placeholder.spinner.close();
  });
}

// renders pagination for main (first) fetch // оставить рендер пагинации
export function fetchDataOfLibFilms() {
  renderPagination(totalLibPages, null, displayLibList);
}
