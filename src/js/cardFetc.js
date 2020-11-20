import filmsCardTpl from '../templates/card-films.hbs';
import NewApiService from './apiServis';
import { renderPagination } from './pagination';
import createTrailerLink from './trailers.js';
import errorUrl from '../images/catch-error-pagination.jpg';

const listElement = document.querySelector('.js-card');
const logoEl = document.querySelector('.js-main-logo');
const newApiService = new NewApiService();

render();
fetchDataOfPopularFilms();

logoEl.addEventListener('click', onLogoClick);

// page set to default with click on logotype without page refresh
function onLogoClick(e) {
  e.preventDefault();
  render();
  fetchDataOfPopularFilms();
}

// renders main (first) page
export function render() {
  newApiService.page = 1;
  newApiService
    .insertGenresToMovieObj()
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function render');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// function for insertion of markup
function renderFilmsCard(articles) {
  listElement.innerHTML = filmsCardTpl(articles);
  createTrailerLink();
}

// renders movies by appropriate page
function displayList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchPopularFilmsByPage(page)
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function displayList');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// renders pagination for main (first) fetch
export function fetchDataOfPopularFilms() {
  newApiService
    .fetchPopularArticlesPages()
    .then(results => {
      renderPagination(results.total_pages, results.results, displayList);
    })
    .catch(err => {
      console.log('error in function fetchDataOfPopularFilms');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// fetches popular movies by appropriate page
function fetchPopularFilmsByPage(page) {
  newApiService.pageNum = page;
  return newApiService.insertGenresToMovieObj();
}
