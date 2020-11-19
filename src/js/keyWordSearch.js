import filmsCardTpl from '../templates/card-films.hbs';
import { renderPagination } from './pagination';
import ApiService from './apiServis';
import placeholder from './spinner';
import createTrailerLink from './trailers.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.js-card'),
};
const filmApiService = new ApiService();
const listElement = document.querySelector('.js-card');

refs.searchForm.addEventListener('submit', onKeyWordSearch);

function onKeyWordSearch(e) {
  placeholder.spinner.show();
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.query.value;
  if (filmApiService.query === '') {
    placeholder.spinner.close();
    return;
  }

  render(filmApiService.query);
  fetchDataOfSearchFilms(filmApiService.query);
  e.currentTarget.elements.query.value = '';
}

// renders main (first) page after search *on submit*
function render(searchQuery) {
  filmApiService.query = searchQuery;
  filmApiService.insertGenresToSearchObj().then(renderFilmsCard);
}

// function for insertion of markup
function renderFilmsCard(articles) {
  listElement.innerHTML = filmsCardTpl(articles);
  createTrailerLink();
}

// renders movies by appropriate page & search query
function displaySearchListByPage(wrapper, page, searchQuery) {
  wrapper.innerHTML = '';
  fetchSearchFilmsByPage(page, searchQuery).then(renderFilmsCard);
}

// renders pagination for main (first) fetch
function fetchDataOfSearchFilms(searchQuery) {
  filmApiService.query = searchQuery;
  filmApiService.fetchSearchArticlesPages().then((results) => {
    renderPagination(
      results.total_pages,
      results.results,
      displaySearchListByPage,
      searchQuery
    );
  });
}

// fetches search queries by appropriate page & search query
function fetchSearchFilmsByPage(page, searchQuery) {
  filmApiService.pageNum = page;
  filmApiService.query = searchQuery;
  return filmApiService.insertGenresToSearchObj();
}
