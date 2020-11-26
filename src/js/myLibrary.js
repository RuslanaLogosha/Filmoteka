import regeneratorRuntime from 'regenerator-runtime';
// import createTrailerLink from './trailers.js';
// import nothingHereUrl from '../images/nothingHere.jpg';
import placeholder from './spinner';

import localStorageApi from './localStorageApi';
import apiServiceLibrary from './apiServisLibrary';
import myLibraryMarkup from './myLibraryMarkup';
import userPoint from './userPoint';
import getCheckedLiblary from './getCheckedLiblary';

import { renderPagination } from './pagination';


const refs = {
  storageList: document.querySelector('.js-choice-storage'),
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
    apiServiceLibrary.fetchMoviesById(idList.slice(0, 20)).then(moviesArray => {
      myLibraryMarkup.renderCardList(moviesArray);
      myLibraryMarkup.showPagination();
      apiServiceLibrary.fetchDataOfLibFilms();
      placeholder.spinner.close();
    });
  } else {
    myLibraryMarkup.renderEmtyCardList();
  }
}



