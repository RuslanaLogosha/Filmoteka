import regeneratorRuntime from 'regenerator-runtime';
import createTrailerLink from './trailers.js';
import nothingHereUrl from '../images/nothingHere.jpg';
import placeholder from './spinner';
import localStorageApi from './localStorageApi';
import userPoint from './userPoint';
import cardFilmsTpl from '../templates/card-films.hbs';
import { renderPagination } from './pagination';



const CHOICE_STORAGE_BTN_NAME = 'storage-btn';

const refs = {
  storageList: document.querySelector('.js-choice-storage'),
  cardLibrary: document.querySelector('.js-card'),
  paginationContainer: document.querySelector('.pagination__container'),
};

//
const currentLibrary = userPoint.getCurrentLibrary();
if(currentLibrary) document.querySelector(`[value="${currentLibrary}"]`).checked = true;

renderMovies();

refs.storageList.addEventListener('change', renderMovies);
//

function renderMovies() {
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  refs.cardLibrary.dataset.library = key;
  userPoint.saveCurrentLibrary(key);

  if (idList.length) {
    placeholder.spinner.show();
    fetchMoviesById(idList.slice(0, 20)).then(moviesArray => {
      renderMarkup(moviesArray);
      refs.paginationContainer.style.display = 'block';
      fetchDataOfLibFilms();
      placeholder.spinner.close();
    });
  } else {
    refs.cardLibrary.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
    refs.paginationContainer.style.display = 'none';
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


//возвращает промис с массивом объектов фильмов <-- принимает массив Айдишников
async function fetchMoviesById(idList) { 
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
}

// pagination

// renders main (first) page = renderMovies

// function for insertion of markup = renderMarkup(moviesArray)

// renders movies by appropriate page
function displayLibList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchLibFilmsByPage(page).catch(err => {
    console.log('error in function displayList');
  });
}

// fetches movies by appropriate page
function fetchLibFilmsByPage(page) {
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  const requiredPageIdList = idList.slice(
    (page - 1) * 20,
    (page - 1) * 20 + 20,
  );

  placeholder.spinner.show();
  return fetchMoviesById(requiredPageIdList).then(moviesArray => {
    renderMarkup(moviesArray);
    placeholder.spinner.close();
  });
}

// renders pagination for main (first) fetch // оставить рендер пагинации
function fetchDataOfLibFilms() {
  const totalLibPages = Math.ceil(
    localStorageApi.getMovies(getCheckedLiblary()).length / 20,
  );

  renderPagination(totalLibPages, null, displayLibList);
}
