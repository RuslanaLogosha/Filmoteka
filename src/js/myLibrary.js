import regeneratorRuntime from 'regenerator-runtime';
// import createTrailerLink from './trailers.js';
// import nothingHereUrl from '../images/nothingHere.jpg';
import placeholder from './spinner';

import localStorageApi from './localStorageApi';
import myLibraryMarkup from './myLibraryMarkup';
import userPoint from './userPoint';
import getCheckedLiblary from './getCheckedLiblary';

import { renderPagination } from './pagination';


// const myLibraryMarkup = {

//   cardsContainer : document.querySelector('.js-card'),
//   paginationContainer: document.querySelector('.pagination__container'),
  
//   renderCardList(moviesArray) {
//     this.cardsContainer.innerHTML = cardFilmsTpl(moviesArray);
//     createTrailerLink();
//   },

//   renderEmtyCardList() { 
//     this.cardsContainer.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
//     this.paginationContainer.style.display = 'none';
//   }
// } 


const refs = {
  storageList: document.querySelector('.js-choice-storage'),
  // cardLibrary: document.querySelector('.js-card'),
  // paginationContainer: document.querySelector('.pagination__container'),
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

  myLibraryMarkup.cardsContainer.dataset.library = key;
  userPoint.saveCurrentLibrary(key);

  if (idList.length) {
    placeholder.spinner.show();
    fetchMoviesById(idList.slice(0, 20)).then(moviesArray => {
      myLibraryMarkup.renderCardList(moviesArray);
      myLibraryMarkup.showPagination();
      fetchDataOfLibFilms();
      placeholder.spinner.close();
    });
  } else {
    // myLibraryMarkup.cardsContainer.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
    // myLibraryMarkup.paginationContainer.style.display = 'none';
    myLibraryMarkup.renderEmtyCardList();
  }
}

// function myLibraryMarkup.renderCardList(moviesArray) {
//   refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
//   createTrailerLink();
// }


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

// function for insertion of markup = myLibraryMarkup.renderCardList(moviesArray)

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
    myLibraryMarkup.renderCardList(moviesArray);
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
